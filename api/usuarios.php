<?php
require_once __DIR__ . '/config.php';

// Restricted strictly to SuperAdmin!
$currentUser = verifyAuthToken($pdo, 'superadmin');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT id, name, email, role, is_active, created_at, updated_at FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $u = $stmt->fetch();
        if (!$u) {
            jsonResponse(['error' => 'Usuário não encontrado.'], 404);
        }
        jsonResponse(['data' => $u]);
    } else {
        $stmt = $pdo->query("SELECT id, name, email, role, is_active, created_at, updated_at FROM users ORDER BY id ASC");
        $users = $stmt->fetchAll();
        jsonResponse(['data' => $users]);
    }
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';
    $role = $input['role'] === 'superadmin' ? 'superadmin' : 'user';
    $isActive = isset($input['is_active']) ? intval($input['is_active']) : 1;

    if (empty($name) || empty($email) || empty($password)) {
        jsonResponse(['error' => 'Nome, e-mail e senha são obrigatórios.'], 400);
    }

    if (strlen($password) < 6) {
        jsonResponse(['error' => 'A senha deve ter pelo menos 6 caracteres.'], 400);
    }

    // Check email uniqueness
    $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$email]);
    if ($check->fetch()) {
        jsonResponse(['error' => 'Este e-mail já está cadastrado para outro usuário.'], 400);
    }

    $hash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$name, $email, $hash, $role, $isActive]);

    jsonResponse(['message' => 'Usuário cadastrado com sucesso!', 'id' => $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    if (!$id) {
        jsonResponse(['error' => 'ID do usuário não informado.'], 400);
    }

    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $role = ($input['role'] ?? '') === 'superadmin' ? 'superadmin' : 'user';
    $isActive = isset($input['is_active']) ? intval($input['is_active']) : 1;
    $password = trim($input['password'] ?? '');

    if (empty($name) || empty($email)) {
        jsonResponse(['error' => 'Nome e e-mail são obrigatórios.'], 400);
    }

    // Check email collision
    $check = $pdo->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
    $check->execute([$email, $id]);
    if ($check->fetch()) {
        jsonResponse(['error' => 'Este e-mail já está em uso por outro usuário.'], 400);
    }

    if (!empty($password)) {
        if (strlen($password) < 6) {
            jsonResponse(['error' => 'A nova senha deve ter no mínimo 6 caracteres.'], 400);
        }
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("
            UPDATE users SET name = ?, email = ?, password_hash = ?, role = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ");
        $stmt->execute([$name, $email, $hash, $role, $isActive, $id]);
    } else {
        $stmt = $pdo->prepare("
            UPDATE users SET name = ?, email = ?, role = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ");
        $stmt->execute([$name, $email, $role, $isActive, $id]);
    }

    jsonResponse(['message' => 'Dados do usuário atualizados com sucesso!']);
}

if ($method === 'DELETE') {
    if (!$id) {
        jsonResponse(['error' => 'ID não informado.'], 400);
    }

    if ($id == $currentUser['id']) {
        jsonResponse(['error' => 'Você não pode excluir sua própria conta de SuperAdmin em uso.'], 400);
    }

    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(['message' => 'Usuário removido com sucesso!']);
}

jsonResponse(['error' => 'Método não permitido.'], 405);
