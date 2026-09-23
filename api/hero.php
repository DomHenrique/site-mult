<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM hero_content WHERE id = 1");
    $hero = $stmt->fetch();
    if (!$hero) {
        $hero = [
            'eyebrow' => 'ENGENHARIA • CIÊNCIA • INOVAÇÃO • SUSTENTABILIDADE',
            'title' => 'Soluções técnicas para um futuro mais saudável.',
            'subtitle' => 'Conectamos empresas aos melhores especialistas do mercado para transformar desafios complexos em produtos inovadores, seguros e sustentáveis.',
            'button_text' => 'FALE SOBRE SEU PROJETO',
            'button_link' => '#contato',
            'image_url' => 'assets/img/hero-taiana.jpg',
            'image_mobile_url' => '',
            'script_accent' => 'Conhecimento que multiplica RESULTADOS',
            'author_name' => 'Taiana Franco',
            'author_role' => 'Fundadora da Mult',
            'badge_1_text' => 'QUALIDADE & INOVAÇÃO',
            'badge_2_text' => 'SEGURANÇA DO TRABALHO',
            'badge_3_text' => 'MEIO AMBIENTE & ESG',
            'badge_4_text' => 'RESPONSABILIDADE SOCIAL'
        ];
    }
    jsonResponse(['data' => $hero]);
}

if ($method === 'POST' || $method === 'PUT') {
    $user = verifyAuthToken($pdo); // Requires any authenticated admin/user

    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $eyebrow = trim($input['eyebrow'] ?? 'ENGENHARIA • CIÊNCIA • INOVAÇÃO • SUSTENTABILIDADE');
    $title = trim($input['title'] ?? '');
    $subtitle = trim($input['subtitle'] ?? '');
    $buttonText = trim($input['button_text'] ?? 'FALE SOBRE SEU PROJETO');
    $buttonLink = trim($input['button_link'] ?? '#contato');
    $imageUrl = trim($input['image_url'] ?? '');
    $imageMobileUrl = trim($input['image_mobile_url'] ?? '');
    $scriptAccent = trim($input['script_accent'] ?? 'Conhecimento que multiplica RESULTADOS');
    $authorName = trim($input['author_name'] ?? 'Taiana Franco');
    $authorRole = trim($input['author_role'] ?? 'Fundadora da Mult');
    $badge1 = trim($input['badge_1_text'] ?? 'QUALIDADE & INOVAÇÃO');
    $badge2 = trim($input['badge_2_text'] ?? 'SEGURANÇA DO TRABALHO');
    $badge3 = trim($input['badge_3_text'] ?? 'MEIO AMBIENTE & ESG');
    $badge4 = trim($input['badge_4_text'] ?? 'RESPONSABILIDADE SOCIAL');

    if (empty($title)) {
        jsonResponse(['error' => 'O título principal do Hero é obrigatório.'], 400);
    }

    $stmt = $pdo->prepare("
        INSERT INTO hero_content (
            id, eyebrow, title, subtitle, button_text, button_link, image_url, image_mobile_url, script_accent, author_name, author_role,
            badge_1_text, badge_2_text, badge_3_text, badge_4_text, updated_at
        ) VALUES (
            1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP
        )
        ON CONFLICT(id) DO UPDATE SET
            eyebrow = excluded.eyebrow,
            title = excluded.title,
            subtitle = excluded.subtitle,
            button_text = excluded.button_text,
            button_link = excluded.button_link,
            image_url = CASE WHEN excluded.image_url != '' THEN excluded.image_url ELSE hero_content.image_url END,
            image_mobile_url = CASE WHEN excluded.image_mobile_url != '' THEN excluded.image_mobile_url ELSE hero_content.image_mobile_url END,
            script_accent = excluded.script_accent,
            author_name = excluded.author_name,
            author_role = excluded.author_role,
            badge_1_text = excluded.badge_1_text,
            badge_2_text = excluded.badge_2_text,
            badge_3_text = excluded.badge_3_text,
            badge_4_text = excluded.badge_4_text,
            updated_at = CURRENT_TIMESTAMP
    ");

    $stmt->execute([
        $eyebrow, $title, $subtitle, $buttonText, $buttonLink, $imageUrl, $imageMobileUrl, $scriptAccent, $authorName, $authorRole,
        $badge1, $badge2, $badge3, $badge4
    ]);

    jsonResponse(['message' => 'Seção Hero atualizada com sucesso!']);
}

jsonResponse(['error' => 'Método não permitido.'], 405);
