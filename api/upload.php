<?php
require_once __DIR__ . '/config.php';

// Requires authenticated admin
$user = verifyAuthToken($pdo);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Método não permitido.'], 405);
}

$uploadDir = __DIR__ . '/../uploads';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}
@chmod($uploadDir, 0755);

$allowedMimes = [
    'image/jpeg'    => 'jpg',
    'image/pjpeg'   => 'jpg',
    'image/png'     => 'png',
    'image/x-png'   => 'png',
    'image/webp'    => 'webp',
    'image/svg+xml' => 'svg',
    'image/gif'     => 'gif'
];
$validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'];

// ============================================================================
// 1. JSON Payload with Base64 (Sent by ApiClient.uploadImage)
// ============================================================================
$rawInput = file_get_contents('php://input');
$jsonInput = !empty($rawInput) ? json_decode($rawInput, true) : null;

if (is_array($jsonInput) && !empty($jsonInput['base64'])) {
    $filename = !empty($jsonInput['filename']) ? trim($jsonInput['filename']) : 'upload.jpg';
    $base64Data = $jsonInput['base64'];

    $mimeType = 'image/jpeg';
    if (preg_match('/^data:([^;]+);base64,(.+)$/', $base64Data, $matches)) {
        $mimeType = strtolower(trim($matches[1]));
        $binaryData = base64_decode($matches[2]);
    } else {
        $binaryData = base64_decode($base64Data);
    }

    if ($binaryData === false || empty($binaryData)) {
        jsonResponse(['error' => 'Dados base64 inválidos ou arquivo vazio.'], 400);
    }

    $fileSize = strlen($binaryData);
    if ($fileSize > 10 * 1024 * 1024) {
        jsonResponse(['error' => 'O arquivo excede o limite máximo permitido de 10MB.'], 400);
    }

    // Verify detected MIME from binary buffer if finfo is available
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        if ($finfo) {
            $detected = finfo_buffer($finfo, $binaryData);
            finfo_close($finfo);
            if (!empty($detected) && $detected !== 'application/octet-stream') {
                $mimeType = $detected;
            }
        }
    }

    // Determine extension
    if (isset($allowedMimes[$mimeType])) {
        $ext = $allowedMimes[$mimeType];
    } else {
        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        if ($ext === 'jpeg') $ext = 'jpg';
        if (!in_array($ext, $validExtensions)) {
            jsonResponse(['error' => 'Tipo de arquivo não permitido (' . $mimeType . '). Envie JPG, PNG, WEBP ou SVG.'], 400);
        }
    }

    $uniqueName = 'mult_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
    $destination = $uploadDir . '/' . $uniqueName;

    if (file_put_contents($destination, $binaryData) !== false) {
        @chmod($destination, 0644);
        jsonResponse([
            'message' => 'Upload realizado com sucesso!',
            'url' => 'uploads/' . $uniqueName,
            'filename' => $uniqueName,
            'size' => $fileSize,
            'mime' => $mimeType
        ]);
    } else {
        jsonResponse(['error' => 'Falha ao gravar arquivo no servidor. Verifique as permissões da pasta uploads/.'], 500);
    }
}

// ============================================================================
// 2. Standard Multipart / FormData ($_FILES['file'] or $_FILES['image'])
// ============================================================================
$file = $_FILES['file'] ?? $_FILES['image'] ?? null;

if ($file) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errors = [
            UPLOAD_ERR_INI_SIZE   => 'O arquivo excede a diretiva upload_max_filesize do PHP.',
            UPLOAD_ERR_FORM_SIZE  => 'O arquivo excede o limite especificado no formulário.',
            UPLOAD_ERR_PARTIAL    => 'O upload foi feito parcialmente.',
            UPLOAD_ERR_NO_FILE    => 'Nenhum arquivo enviado.',
            UPLOAD_ERR_NO_TMP_DIR => 'Pasta temporária ausente.',
            UPLOAD_ERR_CANT_WRITE => 'Falha ao escrever arquivo no disco.',
            UPLOAD_ERR_EXTENSION  => 'Upload bloqueado por extensão do servidor.'
        ];
        $msg = $errors[$file['error']] ?? ('Erro no upload (código ' . $file['error'] . ')');
        jsonResponse(['error' => $msg], 400);
    }

    if ($file['size'] > 10 * 1024 * 1024) {
        jsonResponse(['error' => 'O arquivo excede o limite máximo permitido de 10MB.'], 400);
    }

    $mimeType = 'image/jpeg';
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        if ($finfo) {
            $mimeType = finfo_file($finfo, $file['tmp_name']);
            finfo_close($finfo);
        }
    }

    if (isset($allowedMimes[$mimeType])) {
        $ext = $allowedMimes[$mimeType];
    } else {
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if ($ext === 'jpeg') $ext = 'jpg';
        if (!in_array($ext, $validExtensions)) {
            jsonResponse(['error' => 'Tipo de arquivo não permitido (' . $mimeType . '). Envie JPG, PNG, WEBP ou SVG.'], 400);
        }
    }

    $uniqueName = 'mult_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
    $destination = $uploadDir . '/' . $uniqueName;

    if (move_uploaded_file($file['tmp_name'], $destination)) {
        @chmod($destination, 0644);
        jsonResponse([
            'message' => 'Upload realizado com sucesso!',
            'url' => 'uploads/' . $uniqueName,
            'filename' => $uniqueName,
            'size' => $file['size'],
            'mime' => $mimeType
        ]);
    } else {
        jsonResponse(['error' => 'Falha ao mover arquivo enviado. Verifique permissões da pasta uploads/.'], 500);
    }
}

// ============================================================================
// 3. Fallback Error
// ============================================================================
jsonResponse(['error' => 'Nenhum arquivo enviado ou erro no upload: Sem arquivo enviado'], 400);
