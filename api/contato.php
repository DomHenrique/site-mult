<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $company = trim($input['company'] ?? '');
    $projectMoment = trim($input['project_moment'] ?? '');
    $message = trim($input['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        jsonResponse(['error' => 'Por favor, preencha seu nome, e-mail e uma breve descrição do projeto.'], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['error' => 'Por favor, informe um endereço de e-mail válido.'], 400);
    }

    $stmt = $pdo->prepare("
        INSERT INTO leads_contact (name, email, phone, company, project_moment, message, status)
        VALUES (?, ?, ?, ?, ?, ?, 'novo')
    ");

    $stmt->execute([$name, $email, $phone, $company, $projectMoment, $message]);

    jsonResponse([
        'message' => 'Mensagem enviada com sucesso! Nossa equipe técnica retornará em breve.',
        'id' => $pdo->lastInsertId()
    ], 201);
}

// GET and PUT for leads require admin authentication
$user = verifyAuthToken($pdo);

if ($method === 'GET') {
    $status = $_GET['status'] ?? null;
    $sql = "SELECT * FROM leads_contact";
    $params = [];

    if ($status) {
        $sql .= " WHERE status = ?";
        $params[] = $status;
    }
    $sql .= " ORDER BY id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $leads = $stmt->fetchAll();

    jsonResponse(['data' => $leads]);
}

if ($method === 'PUT') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    if (!$id) {
        jsonResponse(['error' => 'ID do lead não informado.'], 400);
    }

    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $status = $input['status'] ?? 'em_atendimento';

    $stmt = $pdo->prepare("UPDATE leads_contact SET status = ? WHERE id = ?");
    $stmt->execute([$status, $id]);

    jsonResponse(['message' => 'Status do contato atualizado com sucesso!']);
}

jsonResponse(['error' => 'Método não permitido.'], 405);
