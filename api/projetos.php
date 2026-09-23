<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        $project = $stmt->fetch();
        if (!$project) {
            jsonResponse(['error' => 'Projeto não encontrado.'], 404);
        }
        jsonResponse(['data' => $project]);
    } else {
        $featuredOnly = isset($_GET['featured']) && $_GET['featured'] == '1';
        $sql = "SELECT * FROM projects";
        if ($featuredOnly) {
            $sql .= " WHERE is_featured = 1";
        }
        $sql .= " ORDER BY display_order ASC, id DESC";
        $stmt = $pdo->query($sql);
        $projects = $stmt->fetchAll();
        jsonResponse(['data' => $projects]);
    }
}

// Write actions require authenticated user
$user = verifyAuthToken($pdo);

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $title = trim($input['title'] ?? '');
    $category = trim($input['category'] ?? '');
    $description = trim($input['description'] ?? '');
    $imageUrl = trim($input['image_url'] ?? '');
    $imageMobileUrl = trim($input['image_mobile_url'] ?? '');
    $tag1Title = trim($input['tag_1_title'] ?? '');
    $tag1Desc = trim($input['tag_1_desc'] ?? '');
    $tag2Title = trim($input['tag_2_title'] ?? '');
    $tag2Desc = trim($input['tag_2_desc'] ?? '');
    $tag3Title = trim($input['tag_3_title'] ?? '');
    $tag3Desc = trim($input['tag_3_desc'] ?? '');
    $actionBtnText = trim($input['action_button_text'] ?? 'SAIBA MAIS SOBRE O PROJETO');
    $actionBtnLink = trim($input['action_button_link'] ?? '#contato');
    $isFeatured = isset($input['is_featured']) ? intval($input['is_featured']) : 1;
    $displayOrder = isset($input['display_order']) ? intval($input['display_order']) : 0;

    if (empty($title) || empty($description)) {
        jsonResponse(['error' => 'Título e descrição são obrigatórios.'], 400);
    }

    $stmt = $pdo->prepare("
        INSERT INTO projects (
            title, category, description, image_url, image_mobile_url,
            tag_1_title, tag_1_desc, tag_2_title, tag_2_desc, tag_3_title, tag_3_desc,
            action_button_text, action_button_link, is_featured, display_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $title, $category, $description, $imageUrl, $imageMobileUrl,
        $tag1Title, $tag1Desc, $tag2Title, $tag2Desc, $tag3Title, $tag3Desc,
        $actionBtnText, $actionBtnLink, $isFeatured, $displayOrder
    ]);

    jsonResponse(['message' => 'Projeto cadastrado com sucesso!', 'id' => $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    if (!$id) {
        jsonResponse(['error' => 'ID do projeto não fornecido.'], 400);
    }

    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    $title = trim($input['title'] ?? '');
    $category = trim($input['category'] ?? '');
    $description = trim($input['description'] ?? '');
    $imageUrl = trim($input['image_url'] ?? '');
    $imageMobileUrl = trim($input['image_mobile_url'] ?? '');
    $tag1Title = trim($input['tag_1_title'] ?? '');
    $tag1Desc = trim($input['tag_1_desc'] ?? '');
    $tag2Title = trim($input['tag_2_title'] ?? '');
    $tag2Desc = trim($input['tag_2_desc'] ?? '');
    $tag3Title = trim($input['tag_3_title'] ?? '');
    $tag3Desc = trim($input['tag_3_desc'] ?? '');
    $actionBtnText = trim($input['action_button_text'] ?? 'SAIBA MAIS SOBRE O PROJETO');
    $actionBtnLink = trim($input['action_button_link'] ?? '#contato');
    $isFeatured = isset($input['is_featured']) ? intval($input['is_featured']) : 1;
    $displayOrder = isset($input['display_order']) ? intval($input['display_order']) : 0;

    if (empty($title) || empty($description)) {
        jsonResponse(['error' => 'Título e descrição são obrigatórios.'], 400);
    }

    $stmt = $pdo->prepare("
        UPDATE projects SET
            title = ?, category = ?, description = ?,
            image_url = CASE WHEN ? != '' THEN ? ELSE image_url END,
            image_mobile_url = CASE WHEN ? != '' THEN ? ELSE image_mobile_url END,
            tag_1_title = ?, tag_1_desc = ?, tag_2_title = ?, tag_2_desc = ?, tag_3_title = ?, tag_3_desc = ?,
            action_button_text = ?, action_button_link = ?, is_featured = ?, display_order = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    ");

    $stmt->execute([
        $title, $category, $description,
        $imageUrl, $imageUrl,
        $imageMobileUrl, $imageMobileUrl,
        $tag1Title, $tag1Desc, $tag2Title, $tag2Desc, $tag3Title, $tag3Desc,
        $actionBtnText, $actionBtnLink, $isFeatured, $displayOrder,
        $id
    ]);

    jsonResponse(['message' => 'Projeto atualizado com sucesso!']);
}

if ($method === 'DELETE') {
    if (!$id) {
        jsonResponse(['error' => 'ID do projeto não fornecido.'], 400);
    }

    $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(['message' => 'Projeto excluído com sucesso!']);
}

jsonResponse(['error' => 'Método não suportado.'], 405);
