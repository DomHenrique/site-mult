<?php
/**
 * MULT ENGENHARIA - API CONFIG & DATABASE CONNECTION (SQLite PDO)
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Error handling & Polyfills for PHP 7.x / 8.x compatibility
ini_set('display_errors', '0');
error_reporting(E_ALL);

if (!function_exists('str_contains')) {
    function str_contains($haystack, $needle) {
        return $needle !== '' && mb_strpos($haystack, $needle) !== false;
    }
}
if (!function_exists('str_starts_with')) {
    function str_starts_with($haystack, $needle) {
        return (string)$needle !== '' && strncmp($haystack, $needle, strlen($needle)) === 0;
    }
}
if (!function_exists('str_ends_with')) {
    function str_ends_with($haystack, $needle) {
        return $needle !== '' && substr($haystack, -strlen($needle)) === (string)$needle;
    }
}

$dbDir = __DIR__ . '/../data';
$dbFile = $dbDir . '/mult.db';

if (!is_dir($dbDir)) {
    mkdir($dbDir, 0755, true);
}

try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Initial Schema Definition
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('superadmin', 'user')),
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS hero_content (
            id INTEGER PRIMARY KEY DEFAULT 1,
            eyebrow TEXT DEFAULT 'ENGENHARIA • CIÊNCIA • INOVAÇÃO • SUSTENTABILIDADE',
            title TEXT NOT NULL,
            subtitle TEXT,
            button_text TEXT DEFAULT 'FALE SOBRE SEU PROJETO',
            button_link TEXT DEFAULT '#contato',
            image_url TEXT,
            image_mobile_url TEXT DEFAULT '',
            script_accent TEXT DEFAULT 'Conhecimento que multiplica RESULTADOS',
            author_name TEXT DEFAULT 'Taiana Franco',
            author_role TEXT DEFAULT 'Fundadora da Mult',
            badge_1_text TEXT DEFAULT 'QUALIDADE & INOVAÇÃO',
            badge_2_text TEXT DEFAULT 'SEGURANÇA DO TRABALHO',
            badge_3_text TEXT DEFAULT 'MEIO AMBIENTE & ESG',
            badge_4_text TEXT DEFAULT 'RESPONSABILIDADE SOCIAL',
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT,
            description TEXT NOT NULL,
            image_url TEXT,
            image_mobile_url TEXT DEFAULT '',
            tag_1_title TEXT,
            tag_1_desc TEXT,
            tag_2_title TEXT,
            tag_2_desc TEXT,
            tag_3_title TEXT,
            tag_3_desc TEXT,
            action_button_text TEXT DEFAULT 'SAIBA MAIS SOBRE O PROJETO',
            action_button_link TEXT,
            is_featured INTEGER DEFAULT 1,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS team_members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            bio TEXT,
            photo_url TEXT,
            linkedin_url TEXT,
            display_order INTEGER DEFAULT 0,
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS leads_contact (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            company TEXT,
            project_moment TEXT,
            message TEXT,
            status TEXT DEFAULT 'novo' CHECK(status IN ('novo', 'em_atendimento', 'concluido')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS banners (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            subtitle TEXT,
            eyebrow TEXT,
            button_text TEXT DEFAULT 'FALE SOBRE SEU PROJETO',
            button_link TEXT DEFAULT '#contato',
            image_url TEXT NOT NULL,
            image_mobile_url TEXT DEFAULT '',
            show_text_overlay INTEGER DEFAULT 1,
            text_color TEXT DEFAULT '#FFFFFF',
            display_order INTEGER DEFAULT 0,
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // Dynamic Multi-Device Schema Migrations (Safe Column Addition)
    $colsHero = $pdo->query("PRAGMA table_info(hero_content)")->fetchAll(PDO::FETCH_COLUMN, 1);
    if (!in_array('image_mobile_url', $colsHero)) {
        $pdo->exec("ALTER TABLE hero_content ADD COLUMN image_mobile_url TEXT DEFAULT ''");
    }

    $colsProjects = $pdo->query("PRAGMA table_info(projects)")->fetchAll(PDO::FETCH_COLUMN, 1);
    if (!in_array('image_mobile_url', $colsProjects)) {
        $pdo->exec("ALTER TABLE projects ADD COLUMN image_mobile_url TEXT DEFAULT ''");
    }

    $colsBanners = $pdo->query("PRAGMA table_info(banners)")->fetchAll(PDO::FETCH_COLUMN, 1);
    if (!in_array('image_mobile_url', $colsBanners)) {
        $pdo->exec("ALTER TABLE banners ADD COLUMN image_mobile_url TEXT DEFAULT ''");
    }

    // Seeds Check & Execution
    $stmtBanners = $pdo->query("SELECT COUNT(*) as count FROM banners");
    if ($stmtBanners->fetch()['count'] == 0) {
        $insertBanner = $pdo->prepare("
            INSERT INTO banners (
                title, subtitle, eyebrow, button_text, button_link,
                image_url, image_mobile_url, show_text_overlay, text_color, display_order, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $insertBanner->execute([
            'Soluções técnicas para um futuro mais saudável.',
            'Um hub multidisciplinar de especialistas que conecta conhecimento, engenharia e inovação para desenvolver produtos, solucionar desafios e impulsionar negócios.',
            'ENGENHARIA • CIÊNCIA • INOVAÇÃO • SUSTENTABILIDADE',
            'FALE SOBRE SEU PROJETO',
            '#contato',
            'assets/img/hero-founder-clean.png',
            'assets/img/hero-founder-clean.png',
            1,
            '#FFFFFF',
            1,
            1
        ]);
        $insertBanner->execute([
            'Engenharia de Alimentos & Inovação Industrial',
            'Desenvolvimento de formulações funcionais, rotulagem regulatória, shelf-life e otimização de processos produtivos com rigor científico.',
            'P&D • FORMULAÇÕES • QUALIDADE TÉCNICA',
            'CONHEÇA NOSSAS SOLUÇÕES',
            '#solucoes',
            'assets/img/engenharia-de-alimentos.jpeg',
            'assets/img/engenharia-de-alimentos.jpeg',
            1,
            '#FFFFFF',
            2,
            1
        ]);
        $insertBanner->execute([
            'Segurança do Trabalho, Meio Ambiente & ESG',
            'Adequação técnica a Normas Regulamentadoras, laudos periciais, ergonomia e soluções sustentáveis que protegem vidas e valorizam sua indústria.',
            'SST • CONFORMIDADE NR • SUSTENTABILIDADE',
            'SOLICITAR DIAGNÓSTICO',
            '#contato',
            'assets/img/multiplicadoras-banner-clean.jpg',
            'assets/img/multiplicadoras-banner-clean.jpg',
            1,
            '#FFFFFF',
            3,
            1
        ]);
    }

    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $userCount = $stmt->fetch()['count'];

    if ($userCount == 0) {
        // Default SuperAdmin: admin@mult.eng.br / MultEngenharia2025@
        $passHash = password_hash('MultEngenharia2025@', PASSWORD_BCRYPT);
        $insertUser = $pdo->prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)");
        $insertUser->execute(['Super Administrador', 'admin@mult.eng.br', $passHash, 'superadmin']);

        // Default Editor: contato@mult.eng.br / MultEditor2025@
        $editorHash = password_hash('MultEditor2025@', PASSWORD_BCRYPT);
        $insertUser->execute(['Taiana Franco', 'taiana@mult.eng.br', $editorHash, 'user']);
    }

    $stmtHero = $pdo->query("SELECT COUNT(*) as count FROM hero_content");
    if ($stmtHero->fetch()['count'] == 0) {
        $pdo->exec("INSERT INTO hero_content (
            id, eyebrow, title, subtitle, button_text, button_link, image_url, script_accent, author_name, author_role,
            badge_1_text, badge_2_text, badge_3_text, badge_4_text
        ) VALUES (
            1,
            'ENGENHARIA • CIÊNCIA • INOVAÇÃO • SUSTENTABILIDADE',
            'Soluções técnicas para um futuro mais saudável.',
            'Um hub multidisciplinar de especialistas que conecta conhecimento, engenharia e inovação para desenvolver produtos, solucionar desafios e impulsionar negócios.',
            'FALE SOBRE SEU PROJETO',
            '#contato',
            'assets/img/hero-founder-clean.png',
            'Conhecimento que multiplica RESULTADOS',
            'Taiana Franco',
            'Fundadora da Mult',
            'QUALIDADE & INOVAÇÃO',
            'SEGURANÇA DO TRABALHO',
            'MEIO AMBIENTE & ESG',
            'RESPONSABILIDADE SOCIAL'
        )");
    }

    $stmtProjects = $pdo->query("SELECT COUNT(*) as count FROM projects");
    if ($stmtProjects->fetch()['count'] == 0) {
        $pdo->exec("INSERT INTO projects (
            title, category, description, image_url,
            tag_1_title, tag_1_desc,
            tag_2_title, tag_2_desc,
            tag_3_title, tag_3_desc,
            action_button_text, action_button_link, is_featured, display_order
        ) VALUES (
            'Conheça uma nova categoria de alimento funcional',
            'Alimentos & Biotecnologia',
            'A Mult atua no desenvolvimento de alimentos inovadores, unindo ciência rigorosa, saúde preventiva e sustentabilidade de processos.',
            'assets/img/projeto-alimento-funcional.jpg',
            'DESENVOLVIMENTO', 'Alimentos inovadores com sólida base científica.',
            'SAÚDE', 'Mais qualidade de vida e nutrição equilibrada para as pessoas.',
            'SUSTENTABILIDADE', 'Soluções e ingredientes que respeitam os recursos do planeta.',
            'SAIBA MAIS SOBRE O PROJETO',
            '#contato',
            1,
            1
        )");
    }

    $stmtTeam = $pdo->query("SELECT COUNT(*) as count FROM team_members");
    if ($stmtTeam->fetch()['count'] == 0) {
        $pdo->exec("INSERT INTO team_members (name, role, bio, photo_url, linkedin_url, display_order, is_active) VALUES
            ('Taiana Franco', 'Fundadora & Eng. Química', 'Especialista em formulações técnicas, inovação em produtos e liderança do hub Mult.', 'assets/img/taiana-franco.jpg', 'https://www.linkedin.com/in/taiana-franco-mult', 1, 1),
            ('Cristina Pereira', 'Seleção de Especialistas', 'Head de recrutamento técnico e governança da rede de consultores parceiros.', 'assets/img/cristina-pereira.jpg', 'https://www.linkedin.com/company/mult-engenharia', 2, 1),
            ('Juliana Martins', 'Construção da Solução', 'Gerente técnica de projetos de engenharia e sustentabilidade industrial.', 'assets/img/juliana-martins.jpg', 'https://www.linkedin.com/company/mult-engenharia', 3, 1),
            ('Fernanda Alves', 'Meio Ambiente & ESG', 'Consultora sênior em conformidade ambiental, licenciamento e governança ESG.', 'assets/img/fernanda-alves.jpg', 'https://www.linkedin.com/company/mult-engenharia', 4, 1),
            ('Renata Souza', 'SST & Gestão de Riscos', 'Especialista em Saúde e Segurança do Trabalho, adequação a NRs e prevenção.', 'assets/img/renata-souza.jpg', 'https://www.linkedin.com/company/mult-engenharia', 5, 1),
            ('Carla Mendes', 'Tecnologia & Inovação', 'Líder em transformação digital, engenharia de dados e soluções inovadoras.', 'assets/img/carla-mendes.jpg', 'https://www.linkedin.com/company/mult-engenharia', 6, 1)
        ");
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function getBearerToken() {
    $headers = null;
    if (!empty($_SERVER['Authorization'])) {
        $headers = trim($_SERVER['Authorization']);
    } elseif (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
    } elseif (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        if (!empty($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        } elseif (!empty($requestHeaders['authorization'])) {
            $headers = trim($requestHeaders['authorization']);
        }
    }
    if (!empty($headers) && preg_match('/Bearer\s+(\S+)/i', $headers, $matches)) {
        return $matches[1];
    }
    return null;
}

function verifyAuthToken($pdo, $requiredRole = null) {
    $token = getBearerToken();
    if (!$token) {
        jsonResponse(['error' => 'Não autenticado. Token ausente.'], 401);
    }
    
    // In our lightweight system, token encodes user_id:user_email in base64
    $decoded = base64_decode($token, true);
    if (!$decoded || strpos($decoded, ':') === false) {
        jsonResponse(['error' => 'Token inválido ou expirado.'], 401);
    }
    
    list($userId, $userEmail) = explode(':', $decoded, 2);
    $stmt = $pdo->prepare("SELECT id, name, email, role, is_active FROM users WHERE id = ? AND email = ?");
    $stmt->execute([$userId, $userEmail]);
    $user = $stmt->fetch();
    
    if (!$user || $user['is_active'] != 1) {
        jsonResponse(['error' => 'Sessão inválida ou usuário inativo.'], 401);
    }
    
    if ($requiredRole === 'superadmin' && $user['role'] !== 'superadmin') {
        jsonResponse(['error' => 'Acesso negado. Requer privilégios de SuperAdmin.'], 403);
    }
    
    return $user;
}
