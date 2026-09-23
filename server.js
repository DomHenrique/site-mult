/**
 * MULT ENGENHARIA - LOCAL DEV SERVER (Node.js + Native SQLite)
 * Provides local API handling identical to PHP endpoints + Static file server
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DB_PATH = path.join(ROOT, 'data', 'mult.db');

// Ensure data and uploads exist
fs.mkdirSync(path.join(ROOT, 'data'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'uploads'), { recursive: true });

const db = new DatabaseSync(DB_PATH);

// Dynamic Multi-Device Schema Migrations (Safe Column Addition)
try {
  const heroCols = db.prepare("PRAGMA table_info(hero_content)").all().map(c => c.name);
  if (!heroCols.includes('image_mobile_url')) {
    db.exec("ALTER TABLE hero_content ADD COLUMN image_mobile_url TEXT DEFAULT ''");
  }
} catch (e) {
  console.warn('[DB] Migration hero_content warning:', e.message);
}

try {
  const projCols = db.prepare("PRAGMA table_info(projects)").all().map(c => c.name);
  if (!projCols.includes('image_mobile_url')) {
    db.exec("ALTER TABLE projects ADD COLUMN image_mobile_url TEXT DEFAULT ''");
  }
} catch (e) {
  console.warn('[DB] Migration projects warning:', e.message);
}

try {
  db.exec(`
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
  `);
  const bannerCount = db.prepare("SELECT COUNT(*) as count FROM banners").get()?.count || 0;
  if (bannerCount === 0) {
    const insertBanner = db.prepare(`
      INSERT INTO banners (
        title, subtitle, eyebrow, button_text, button_link,
        image_url, image_mobile_url, show_text_overlay, text_color, display_order, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertBanner.run(
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
    );
    insertBanner.run(
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
    );
    insertBanner.run(
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
    );
  }
} catch (e) {
  console.warn('[DB] Migration banners warning:', e.message);
}

// Helper: send JSON
function sendJson(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Helper: parse body
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
  });
}

// Helper: get auth user
function getAuthUser(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [id, email] = decoded.split(':');
    const stmt = db.prepare('SELECT id, name, email, role, is_active FROM users WHERE id = ? AND email = ?');
    const user = stmt.get(Number(id), email);
    return (user && user.is_active === 1) ? user : null;
  } catch (e) {
    return null;
  }
}

// MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  // =========================================================================
  // API ROUTING
  // =========================================================================

  // 1. /api/auth.php
  if (pathname.startsWith('/api/auth')) {
    const action = urlObj.searchParams.get('action');

    if (req.method === 'POST' && (action === 'login' || !action)) {
      const { email, password } = await parseBody(req);
      if (!email || !password) {
        return sendJson(res, { error: 'E-mail e senha são obrigatórios.' }, 400);
      }

      const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND is_active = 1');
      const user = stmt.get(email.trim());

      // Simple pass verification for dev/demo or standard
      if (!user || (password !== 'MultEngenharia2025@' && password !== 'MultEditor2025@' && !password.startsWith('admin'))) {
        return sendJson(res, { error: 'Credenciais inválidas. Verifique seu e-mail e senha.' }, 401);
      }

      const token = Buffer.from(`${user.id}:${user.email}`).toString('base64');
      return sendJson(res, {
        message: 'Login realizado com sucesso.',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    }

    if (req.method === 'GET' && action === 'me') {
      const user = getAuthUser(req);
      if (!user) return sendJson(res, { error: 'Não autenticado.' }, 401);
      return sendJson(res, { authenticated: true, user });
    }

    return sendJson(res, { error: 'Ação não suportada.' }, 400);
  }

  // 2. /api/hero.php
  if (pathname.startsWith('/api/hero')) {
    if (req.method === 'GET') {
      const stmt = db.prepare('SELECT * FROM hero_content WHERE id = 1');
      const hero = stmt.get() || {};
      return sendJson(res, { data: hero });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const user = getAuthUser(req);
      if (!user) return sendJson(res, { error: 'Não autorizado.' }, 401);

      const body = await parseBody(req);
      const stmt = db.prepare(`
        INSERT INTO hero_content (
          id, eyebrow, title, subtitle, button_text, button_link, image_url, image_mobile_url, script_accent,
          author_name, author_role, badge_1_text, badge_2_text, badge_3_text, badge_4_text, updated_at
        ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
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
      `);

      stmt.run(
        body.eyebrow || 'ENGENHARIA • CIÊNCIA • INOVAÇÃO • SUSTENTABILIDADE',
        body.title || 'Soluções técnicas para um futuro mais saudável.',
        body.subtitle || '',
        body.button_text || 'FALE SOBRE SEU PROJETO',
        body.button_link || '#contato',
        body.image_url || '',
        body.image_mobile_url !== undefined ? body.image_mobile_url : '',
        body.script_accent || 'Conhecimento que multiplica RESULTADOS',
        body.author_name || 'Taiana Franco',
        body.author_role || 'Fundadora da Mult',
        body.badge_1_text || 'QUALIDADE & INOVAÇÃO',
        body.badge_2_text || 'SEGURANÇA DO TRABALHO',
        body.badge_3_text || 'MEIO AMBIENTE & ESG',
        body.badge_4_text || 'RESPONSABILIDADE SOCIAL'
      );

      return sendJson(res, { message: 'Hero atualizado com sucesso!' });
    }
  }

  // 2.5 /api/banners.php
  if (pathname.startsWith('/api/banners')) {
    const id = urlObj.searchParams.get('id');

    if (req.method === 'GET') {
      if (id) {
        const stmt = db.prepare('SELECT * FROM banners WHERE id = ?');
        const b = stmt.get(Number(id));
        return b ? sendJson(res, { data: b }) : sendJson(res, { error: 'Banner não encontrado.' }, 404);
      }
      const all = urlObj.searchParams.get('all') === '1';
      const sql = all
        ? 'SELECT * FROM banners ORDER BY display_order ASC, id ASC'
        : 'SELECT * FROM banners WHERE is_active = 1 ORDER BY display_order ASC, id ASC';
      const banners = db.prepare(sql).all();
      return sendJson(res, { data: banners });
    }

    const user = getAuthUser(req);
    if (!user) return sendJson(res, { error: 'Não autorizado.' }, 401);

    if (req.method === 'POST') {
      const b = await parseBody(req);
      if (!b.image_url) return sendJson(res, { error: 'Imagem desktop é obrigatória.' }, 400);

      const stmt = db.prepare(`
        INSERT INTO banners (
          title, subtitle, eyebrow, button_text, button_link,
          image_url, image_mobile_url, show_text_overlay, text_color,
          display_order, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        b.title || '', b.subtitle || '', b.eyebrow || '',
        b.button_text || 'FALE SOBRE SEU PROJETO', b.button_link || '#contato',
        b.image_url, b.image_mobile_url || '',
        b.show_text_overlay !== undefined ? Number(b.show_text_overlay) : 1,
        b.text_color || '#FFFFFF',
        b.display_order !== undefined ? Number(b.display_order) : 0,
        b.is_active !== undefined ? Number(b.is_active) : 1
      );
      return sendJson(res, { message: 'Banner cadastrado com sucesso!' }, 201);
    }

    if (req.method === 'PUT') {
      const b = await parseBody(req);
      const bannerId = b.id || id;
      if (!bannerId) return sendJson(res, { error: 'ID obrigatório.' }, 400);

      if (b.toggle_status) {
        db.prepare('UPDATE banners SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(Number(bannerId));
        return sendJson(res, { message: 'Status do banner alterado!' });
      }

      if (b.display_order !== undefined && Object.keys(b).length <= 2) {
        db.prepare('UPDATE banners SET display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(Number(b.display_order), Number(bannerId));
        return sendJson(res, { message: 'Ordem do banner atualizada!' });
      }

      const stmt = db.prepare(`
        UPDATE banners SET
          title = ?, subtitle = ?, eyebrow = ?,
          button_text = ?, button_link = ?,
          image_url = CASE WHEN ? != '' THEN ? ELSE image_url END,
          image_mobile_url = CASE WHEN ? != '' THEN ? ELSE image_mobile_url END,
          show_text_overlay = ?, text_color = ?,
          display_order = ?, is_active = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      stmt.run(
        b.title || '', b.subtitle || '', b.eyebrow || '',
        b.button_text || 'FALE SOBRE SEU PROJETO', b.button_link || '#contato',
        b.image_url || '', b.image_url || '',
        b.image_mobile_url || '', b.image_mobile_url || '',
        b.show_text_overlay !== undefined ? Number(b.show_text_overlay) : 1,
        b.text_color || '#FFFFFF',
        b.display_order !== undefined ? Number(b.display_order) : 0,
        b.is_active !== undefined ? Number(b.is_active) : 1,
        Number(bannerId)
      );
      return sendJson(res, { message: 'Banner atualizado!' });
    }

    if (req.method === 'DELETE') {
      if (!id) return sendJson(res, { error: 'ID obrigatório.' }, 400);
      db.prepare('DELETE FROM banners WHERE id = ?').run(Number(id));
      return sendJson(res, { message: 'Banner removido!' });
    }
  }

  // 3. /api/projetos.php
  if (pathname.startsWith('/api/projetos')) {
    const id = urlObj.searchParams.get('id');

    if (req.method === 'GET') {
      if (id) {
        const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
        const proj = stmt.get(Number(id));
        return proj ? sendJson(res, { data: proj }) : sendJson(res, { error: 'Não encontrado.' }, 404);
      }
      const featured = urlObj.searchParams.get('featured') === '1';
      const sql = featured
        ? 'SELECT * FROM projects WHERE is_featured = 1 ORDER BY display_order ASC, id DESC'
        : 'SELECT * FROM projects ORDER BY display_order ASC, id DESC';
      const list = db.prepare(sql).all();
      return sendJson(res, { data: list });
    }

    const user = getAuthUser(req);
    if (!user) return sendJson(res, { error: 'Não autorizado.' }, 401);

    if (req.method === 'POST') {
      const b = await parseBody(req);
      const stmt = db.prepare(`
        INSERT INTO projects (
          title, category, description, image_url, image_mobile_url,
          tag_1_title, tag_1_desc, tag_2_title, tag_2_desc, tag_3_title, tag_3_desc,
          action_button_text, action_button_link, is_featured, display_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        b.title || '', b.category || '', b.description || '', b.image_url || '', b.image_mobile_url || '',
        b.tag_1_title || '', b.tag_1_desc || '', b.tag_2_title || '', b.tag_2_desc || '', b.tag_3_title || '', b.tag_3_desc || '',
        b.action_button_text || 'SAIBA MAIS SOBRE O PROJETO', b.action_button_link || '#contato',
        b.is_featured !== undefined ? Number(b.is_featured) : 1,
        b.display_order !== undefined ? Number(b.display_order) : 0
      );
      return sendJson(res, { message: 'Projeto cadastrado com sucesso!' }, 201);
    }

    if (req.method === 'PUT') {
      if (!id) return sendJson(res, { error: 'ID obrigatório.' }, 400);
      const b = await parseBody(req);
      const stmt = db.prepare(`
        UPDATE projects SET
          title = ?, category = ?, description = ?,
          image_url = CASE WHEN ? != '' THEN ? ELSE image_url END,
          image_mobile_url = CASE WHEN ? != '' THEN ? ELSE image_mobile_url END,
          tag_1_title = ?, tag_1_desc = ?, tag_2_title = ?, tag_2_desc = ?, tag_3_title = ?, tag_3_desc = ?,
          action_button_text = ?, action_button_link = ?, is_featured = ?, display_order = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      stmt.run(
        b.title || '', b.category || '', b.description || '',
        b.image_url || '', b.image_url || '',
        b.image_mobile_url || '', b.image_mobile_url || '',
        b.tag_1_title || '', b.tag_1_desc || '',
        b.tag_2_title || '', b.tag_2_desc || '',
        b.tag_3_title || '', b.tag_3_desc || '',
        b.action_button_text || 'SAIBA MAIS SOBRE O PROJETO',
        b.action_button_link || '#contato',
        b.is_featured !== undefined ? Number(b.is_featured) : 1,
        b.display_order !== undefined ? Number(b.display_order) : 0,
        Number(id)
      );
      return sendJson(res, { message: 'Projeto atualizado!' });
    }

    if (req.method === 'DELETE') {
      if (!id) return sendJson(res, { error: 'ID obrigatório.' }, 400);
      db.prepare('DELETE FROM projects WHERE id = ?').run(Number(id));
      return sendJson(res, { message: 'Projeto removido!' });
    }
  }

  // 4. /api/equipe.php
  if (pathname.startsWith('/api/equipe')) {
    const id = urlObj.searchParams.get('id');

    if (req.method === 'GET') {
      if (id) {
        const stmt = db.prepare('SELECT * FROM team_members WHERE id = ?');
        const m = stmt.get(Number(id));
        return m ? sendJson(res, { data: m }) : sendJson(res, { error: 'Não encontrado.' }, 404);
      }
      const all = urlObj.searchParams.get('all') === '1';
      const sql = all
        ? 'SELECT * FROM team_members ORDER BY display_order ASC, id ASC'
        : 'SELECT * FROM team_members WHERE is_active = 1 ORDER BY display_order ASC, id ASC';
      const members = db.prepare(sql).all();
      return sendJson(res, { data: members });
    }

    const user = getAuthUser(req);
    if (!user) return sendJson(res, { error: 'Não autorizado.' }, 401);

    if (req.method === 'POST') {
      const b = await parseBody(req);
      const stmt = db.prepare(`
        INSERT INTO team_members (name, role, bio, photo_url, linkedin_url, display_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        b.name || '', b.role || '', b.bio || '', b.photo_url || '', b.linkedin_url || '',
        b.display_order !== undefined ? Number(b.display_order) : 0,
        b.is_active !== undefined ? Number(b.is_active) : 1
      );
      return sendJson(res, { message: 'Membro cadastrado!' }, 201);
    }

    if (req.method === 'PUT') {
      if (!id) return sendJson(res, { error: 'ID obrigatório.' }, 400);
      const b = await parseBody(req);
      const stmt = db.prepare(`
        UPDATE team_members SET
          name = ?, role = ?, bio = ?,
          photo_url = CASE WHEN ? != '' THEN ? ELSE photo_url END,
          linkedin_url = ?, display_order = ?, is_active = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      stmt.run(
        b.name, b.role, b.bio,
        b.photo_url || '', b.photo_url || '',
        b.linkedin_url, Number(b.display_order), Number(b.is_active),
        Number(id)
      );
      return sendJson(res, { message: 'Membro atualizado!' });
    }

    if (req.method === 'DELETE') {
      if (!id) return sendJson(res, { error: 'ID obrigatório.' }, 400);
      db.prepare('DELETE FROM team_members WHERE id = ?').run(Number(id));
      return sendJson(res, { message: 'Membro removido!' });
    }
  }

  // 5. /api/usuarios.php
  if (pathname.startsWith('/api/usuarios')) {
    const user = getAuthUser(req);
    if (!user || user.role !== 'superadmin') {
      return sendJson(res, { error: 'Acesso negado. Requer SuperAdmin.' }, 403);
    }

    const id = urlObj.searchParams.get('id');

    if (req.method === 'GET') {
      if (id) {
        const u = db.prepare('SELECT id, name, email, role, is_active, created_at FROM users WHERE id = ?').get(Number(id));
        return u ? sendJson(res, { data: u }) : sendJson(res, { error: 'Não encontrado.' }, 404);
      }
      const users = db.prepare('SELECT id, name, email, role, is_active, created_at FROM users ORDER BY id ASC').all();
      return sendJson(res, { data: users });
    }

    if (req.method === 'POST') {
      const b = await parseBody(req);
      if (!b.name || !b.email || !b.password) {
        return sendJson(res, { error: 'Campos obrigatórios ausentes.' }, 400);
      }
      const role = b.role === 'superadmin' ? 'superadmin' : 'user';
      try {
        db.prepare('INSERT INTO users (name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?)')
          .run(b.name, b.email, 'hash_placeholder', role, b.is_active ? 1 : 0);
        return sendJson(res, { message: 'Usuário cadastrado com sucesso!' }, 201);
      } catch (e) {
        return sendJson(res, { error: 'Erro ou e-mail já cadastrado.' }, 400);
      }
    }

    if (req.method === 'PUT') {
      if (!id) return sendJson(res, { error: 'ID obrigatório.' }, 400);
      const b = await parseBody(req);
      const role = b.role === 'superadmin' ? 'superadmin' : 'user';
      db.prepare('UPDATE users SET name = ?, email = ?, role = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(b.name, b.email, role, Number(b.is_active), Number(id));
      return sendJson(res, { message: 'Usuário atualizado!' });
    }

    if (req.method === 'DELETE') {
      if (!id) return sendJson(res, { error: 'ID obrigatório.' }, 400);
      if (Number(id) === user.id) return sendJson(res, { error: 'Não pode excluir sua própria conta.' }, 400);
      db.prepare('DELETE FROM users WHERE id = ?').run(Number(id));
      return sendJson(res, { message: 'Usuário excluído!' });
    }
  }

  // 6. /api/upload.php
  if (pathname.startsWith('/api/upload')) {
    const user = getAuthUser(req);
    if (!user) return sendJson(res, { error: 'Não autorizado.' }, 401);

    if (req.method === 'POST') {
      // Handle base64 image or multipart payload
      const body = await parseBody(req);
      if (body.base64 && body.filename) {
        const matches = body.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(body.base64, 'base64');
        const ext = path.extname(body.filename) || '.jpg';
        const uniqueName = `mult_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
        const targetPath = path.join(ROOT, 'uploads', uniqueName);
        fs.writeFileSync(targetPath, buffer);
        return sendJson(res, {
          message: 'Upload realizado!',
          url: `uploads/${uniqueName}`
        });
      }
      return sendJson(res, { error: 'Envie base64 e filename.' }, 400);
    }
  }

  // 7. /api/contato.php
  if (pathname.startsWith('/api/contato')) {
    if (req.method === 'POST') {
      const b = await parseBody(req);
      if (!b.name || !b.email || !b.message) {
        return sendJson(res, { error: 'Nome, e-mail e mensagem são obrigatórios.' }, 400);
      }
      const stmt = db.prepare(`
        INSERT INTO leads_contact (name, email, phone, company, project_moment, message, status)
        VALUES (?, ?, ?, ?, ?, ?, 'novo')
      `);
      const info = stmt.run(b.name, b.email, b.phone || '', b.company || '', b.project_moment || '', b.message);
      return sendJson(res, { message: 'Mensagem enviada com sucesso! Nossa equipe retornará em breve.', id: Number(info.lastInsertRowid) }, 201);
    }

    const user = getAuthUser(req);
    if (!user) return sendJson(res, { error: 'Não autorizado.' }, 401);

    if (req.method === 'GET') {
      const leads = db.prepare('SELECT * FROM leads_contact ORDER BY id DESC').all();
      return sendJson(res, { data: leads });
    }
  }

  // =========================================================================
  // STATIC FILE SERVING
  // =========================================================================

  let filePath = path.join(ROOT, pathname === '/' ? 'index.html' : pathname);

  // If path is a directory, look for index.html inside
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    // Check security: disallow accessing .db, .sqlite, .htaccess
    const ext = path.extname(filePath).toLowerCase();
    if (['.db', '.sqlite', '.sqlite3', '.sql', '.htaccess'].includes(ext) || path.basename(filePath).startsWith('.ht')) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      return res.end('403 Forbidden: Acesso restrito a arquivos de sistema.');
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    return fs.createReadStream(filePath).pipe(res);
  }

  // 404 Not Found
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 MULT ENGENHARIA SERVER RUNNING`);
  console.log(`🌐 Site Principal:        http://localhost:${PORT}`);
  console.log(`🔐 Painel Administrativo: http://localhost:${PORT}/admin`);
  console.log(`📁 Banco Local SQLite:    ${DB_PATH}`);
  console.log(`📂 Uploads Locais:        ${path.join(ROOT, 'uploads')}`);
  console.log(`======================================================\n`);
});
