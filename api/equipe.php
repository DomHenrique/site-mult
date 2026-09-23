<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM team_members WHERE id = ?");
        $stmt->execute([$id]);
        $member = $stmt->fetch();
        if (!$member) {
            jsonResponse(['error' => 'Membro da equipe não encontrado.'], 404);
        }
        jsonResponse(['data' => $member]);
    } else {
        $all = isset($_GET['all']) && $_GET['all'] == '1';
        $sql = "SELECT * FROM team_members";
        if (!$all) {
            $sql .= " WHERE is_active = 1";
        }
        $sql .= " ORDER BY display_order ASC, id ASC";
        $stmt = $pdo->query($sql);
        $members = $stmt->fetchAll();
        jsonResponse(['data' => $members]);
    }
}

// Write actions require authenticated user
$user = verifyAuthToken($pdo);

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $name = trim($input['name'] ?? '');
    $role = trim($input['role'] ?? '');
    $bio = trim($input['bio'] ?? '');
    $photoUrl = trim($input['photo_url'] ?? '');
    $linkedinUrl = trim($input['linkedin_url'] ?? '');
    $displayOrder = isset($input['display_order']) ? intval($input['display_order']) : 0;
    $isActive = isset($input['is_active']) ? intval($input['is_active']) : 1;

    if (empty($name) || empty($role)) {
        jsonResponse(['error' => 'Nome e cargo/especialidade são obrigatórios.'], 400);
    }

    $stmt = $pdo->prepare("
        INSERT INTO team_members (name, role, bio, photo_url, linkedin_url, display_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([$name, $role, $bio, $photoUrl, $linkedinUrl, $displayOrder, $isActive]);

    jsonResponse(['message' => 'Membro cadastrado com sucesso!', 'id' => $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    if (!$id) {
        jsonResponse(['error' => 'ID não informado.'], 400);
    }

    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    $name = trim($input['name'] ?? '');
    $role = trim($input['role'] ?? '');
    $bio = trim($input['bio'] ?? '');
    $photoUrl = trim($input['photo_url'] ?? '');
    $linkedinUrl = trim($input['linkedin_url'] ?? '');
    $displayOrder = isset($input['display_order']) ? intval($input['display_order']) : 0;
    $isActive = isset($input['is_active']) ? intval($input['is_active']) : 1;

    if (empty($name) || empty($role)) {
        jsonResponse(['error' => 'Nome e cargo são obrigatórios.'], 400);
    }

    $stmt = $pdo->prepare("
        UPDATE team_members SET
            name = ?, role = ?, bio = ?,
            photo_url = CASE WHEN ? != '' THEN ? ELSE photo_url END,
            linkedin_url = ?, display_order = ?, is_active = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    ");

    $stmt->execute([$name, $role, $bio, $photoUrl, $photoUrl, $linkedinUrl, $displayOrder, $isActive, $id]);

    jsonResponse(['message' => 'Membro da equipe atualizado com sucesso!']);
}

if ($method === 'DELETE') {
    if (!$id) {
        jsonResponse(['error' => 'ID não informado.'], 400);
    }

    $stmt = $pdo->prepare("DELETE FROM team_members WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(['message' => 'Membro da equipe removido com sucesso!']);
}

jsonResponse(['error' => 'Método não permitido.'], 405);
