<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM banners WHERE id = ?");
        $stmt->execute([$id]);
        $banner = $stmt->fetch();
        if (!$banner) {
            jsonResponse(['error' => 'Banner não encontrado.'], 404);
        }
        jsonResponse(['data' => $banner]);
    } else {
        $all = isset($_GET['all']) && $_GET['all'] == '1';
        $sql = "SELECT * FROM banners";
        if (!$all) {
            $sql .= " WHERE is_active = 1";
        }
        $sql .= " ORDER BY display_order ASC, id ASC";
        $stmt = $pdo->query($sql);
        $banners = $stmt->fetchAll();
        jsonResponse(['data' => $banners]);
    }
}

// Operações de escrita exigem autenticação
$user = verifyAuthToken($pdo);

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $title = trim($input['title'] ?? '');
    $subtitle = trim($input['subtitle'] ?? '');
    $eyebrow = trim($input['eyebrow'] ?? '');
    $buttonText = trim($input['button_text'] ?? 'FALE SOBRE SEU PROJETO');
    $buttonLink = trim($input['button_link'] ?? '#contato');
    $imageUrl = trim($input['image_url'] ?? '');
    $imageMobileUrl = trim($input['image_mobile_url'] ?? '');
    $showTextOverlay = isset($input['show_text_overlay']) ? intval($input['show_text_overlay']) : 1;
    $textColor = trim($input['text_color'] ?? '#FFFFFF');
    $displayOrder = isset($input['display_order']) ? intval($input['display_order']) : 0;
    $isActive = isset($input['is_active']) ? intval($input['is_active']) : 1;

    if (empty($imageUrl)) {
        jsonResponse(['error' => 'A imagem do banner (Desktop) é obrigatória.'], 400);
    }

    $stmt = $pdo->prepare("
        INSERT INTO banners (
            title, subtitle, eyebrow, button_text, button_link,
            image_url, image_mobile_url, show_text_overlay, text_color,
            display_order, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $title, $subtitle, $eyebrow, $buttonText, $buttonLink,
        $imageUrl, $imageMobileUrl, $showTextOverlay, $textColor,
        $displayOrder, $isActive
    ]);

    jsonResponse(['message' => 'Banner cadastrado com sucesso!', 'id' => $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $bannerId = isset($input['id']) ? intval($input['id']) : $id;

    if (!$bannerId) {
        jsonResponse(['error' => 'ID do banner não fornecido.'], 400);
    }

    // Toggle status rápido
    if (isset($input['toggle_status'])) {
        $stmt = $pdo->prepare("UPDATE banners SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([$bannerId]);
        jsonResponse(['message' => 'Status do banner alterado com sucesso!']);
    }

    // Reordenação
    if (isset($input['display_order']) && count($input) === 2 && isset($input['id'])) {
        $stmt = $pdo->prepare("UPDATE banners SET display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([intval($input['display_order']), $bannerId]);
        jsonResponse(['message' => 'Ordem do banner atualizada com sucesso!']);
    }

    $title = trim($input['title'] ?? '');
    $subtitle = trim($input['subtitle'] ?? '');
    $eyebrow = trim($input['eyebrow'] ?? '');
    $buttonText = trim($input['button_text'] ?? 'FALE SOBRE SEU PROJETO');
    $buttonLink = trim($input['button_link'] ?? '#contato');
    $imageUrl = trim($input['image_url'] ?? '');
    $imageMobileUrl = trim($input['image_mobile_url'] ?? '');
    $showTextOverlay = isset($input['show_text_overlay']) ? intval($input['show_text_overlay']) : 1;
    $textColor = trim($input['text_color'] ?? '#FFFFFF');
    $displayOrder = isset($input['display_order']) ? intval($input['display_order']) : 0;
    $isActive = isset($input['is_active']) ? intval($input['is_active']) : 1;

    if (empty($imageUrl)) {
        jsonResponse(['error' => 'A imagem do banner (Desktop) é obrigatória.'], 400);
    }

    $stmt = $pdo->prepare("
        UPDATE banners SET
            title = ?,
            subtitle = ?,
            eyebrow = ?,
            button_text = ?,
            button_link = ?,
            image_url = ?,
            image_mobile_url = ?,
            show_text_overlay = ?,
            text_color = ?,
            display_order = ?,
            is_active = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    ");

    $stmt->execute([
        $title, $subtitle, $eyebrow, $buttonText, $buttonLink,
        $imageUrl, $imageMobileUrl, $showTextOverlay, $textColor,
        $displayOrder, $isActive, $bannerId
    ]);

    jsonResponse(['message' => 'Banner atualizado com sucesso!']);
}

if ($method === 'DELETE') {
    if (!$id) {
        jsonResponse(['error' => 'ID do banner não fornecido.'], 400);
    }

    $stmt = $pdo->prepare("DELETE FROM banners WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(['message' => 'Banner excluído com sucesso!']);
}

jsonResponse(['error' => 'Método não suportado.'], 405);
