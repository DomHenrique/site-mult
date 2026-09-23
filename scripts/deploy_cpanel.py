#!/usr/bin/env python3
"""
Deploy Script for Mult Serviços de Engenharia
Target: cPanel Hospedagem Web (griddmkt360.com.br)
"""

import os
import sys
import ftplib
import urllib.request
import ssl

FTP_HOST = "187.33.241.43"
FTP_USER = "DomHenriqueCarvalho@griddmkt360.com.br"
FTP_PASS = "ga6LgzD4wfKk2Qm"

TARGET_DIRS = ["site/multi-engenharia", "site/mult-engenharia", "site/mul-engenharia"]

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

EXCLUDE_DIRS = {
    ".git", ".agent", "openspec", "node_modules", "scripts", 
    "MULT_PROJETO LP", ".venv", ".gemini", "uploads", "data"
}

EXCLUDE_FILES = {
    "server.js", "package.json", "package-lock.json", 
    "IDENTIDADE_VISUAL_E_ARQUITETURA.md", "README.md",
    "GUIA_INVENTARIO_E_ESPECIFICACAO_IMAGENS.md",
    "deploy_cpanel.py", "test-projetos-preview.html", "mult.db"
}

EXCLUDE_EXTENSIONS = {
    ".py", ".pyc", ".log", ".tmp", ".swp", ".md", ".db", ".sqlite", ".sqlite3"
}

def ensure_remote_dir(ftp, remote_path):
    ftp.cwd("/")
    parts = [p for p in remote_path.replace("\\", "/").split("/") if p]
    for part in parts:
        try:
            ftp.cwd(part)
        except ftplib.error_perm:
            try:
                ftp.mkd(part)
                print(f"  [+] Criado diretório remoto: {part}")
            except Exception:
                pass
            ftp.cwd(part)

def upload_file(ftp, local_file_path, remote_file_name):
    with open(local_file_path, "rb") as f:
        ftp.storbinary(f"STOR {remote_file_name}", f)

def collect_files():
    files_to_upload = []
    for root, dirs, files in os.walk(ROOT_DIR):
        # Exclude unwanted directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith(".")]
        
        rel_dir = os.path.relpath(root, ROOT_DIR)
        if rel_dir == ".":
            rel_dir = ""
            
        for f in files:
            if f in EXCLUDE_FILES:
                continue
            ext = os.path.splitext(f)[1].lower()
            if ext in EXCLUDE_EXTENSIONS:
                continue
            if f.startswith("."):
                if f not in [".htaccess"]:
                    continue
                    
            local_full = os.path.join(root, f)
            rel_path = os.path.join(rel_dir, f).replace("\\", "/")
            files_to_upload.append((local_full, rel_path))
            
    return files_to_upload

def sync_data_and_uploads(ftp, target_dir):
    print(f"\n📂 Verificando data/ e uploads/ para: /{target_dir}...")
    # 1. Banco SQLite
    ensure_remote_dir(ftp, f"{target_dir}/data")
    try:
        remote_data_files = ftp.nlst()
    except Exception:
        remote_data_files = []
    
    if "mult.db" not in remote_data_files:
        local_db = os.path.join(ROOT_DIR, "data", "mult.db")
        if os.path.exists(local_db):
            print(f"  [+] Inicializando banco SQLite em /{target_dir}/data/mult.db...")
            upload_file(ftp, local_db, "mult.db")
            
    if ".htaccess" not in remote_data_files:
        local_ht = os.path.join(ROOT_DIR, "data", ".htaccess")
        if os.path.exists(local_ht):
            upload_file(ftp, local_ht, ".htaccess")
            
    # 2. Imagens de uploads
    ensure_remote_dir(ftp, f"{target_dir}/uploads")
    try:
        remote_uploads = ftp.nlst()
    except Exception:
        remote_uploads = []
        
    local_uploads_dir = os.path.join(ROOT_DIR, "uploads")
    if os.path.isdir(local_uploads_dir):
        for up_file in os.listdir(local_uploads_dir):
            if up_file not in remote_uploads:
                up_full = os.path.join(local_uploads_dir, up_file)
                if os.path.isfile(up_full):
                    print(f"  [+] Sincronizando upload: /{target_dir}/uploads/{up_file}...")
                    upload_file(ftp, up_full, up_file)

def deploy_to_target(ftp, target_dir, files):
    print(f"\n🚀 Iniciando deploy para: /{target_dir}...")
    ftp.cwd("/")
    ensure_remote_dir(ftp, target_dir)
    
    # Group files by directory for faster batch uploads
    grouped = {}
    for local_path, rel_path in files:
        remote_dir_part = os.path.dirname(rel_path)
        grouped.setdefault(remote_dir_part, []).append((local_path, rel_path))

    total = len(files)
    count = 0
    for remote_dir_part, dir_files in grouped.items():
        target_remote_dir = f"{target_dir}/{remote_dir_part}".rstrip("/") if remote_dir_part else target_dir
        ftp.cwd("/")
        ensure_remote_dir(ftp, target_remote_dir)

        for local_path, rel_path in dir_files:
            count += 1
            file_name = os.path.basename(rel_path)
            try:
                upload_file(ftp, local_path, file_name)
                size_kb = os.path.getsize(local_path) / 1024
                print(f"  [{count}/{total}] Upload: {rel_path} ({size_kb:.1f} KB)")
            except Exception as e:
                print(f"  [!] ERRO no arquivo {rel_path}: {e}")

def verify_http(url):
    print(f"\n🔍 Verificando integridade pública HTTP: {url}")
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    req = urllib.request.Request(
        url, 
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AntigravityDeployVerifier/1.0"}
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            status = resp.status
            content = resp.read().decode("utf-8", errors="ignore")
            title_found = "<title>" in content.lower()
            is_json = content.strip().startswith("{")
            print(f"  ✓ Resposta HTTP: {status} OK (Tamanho: {len(content)} bytes, Title: {title_found}, JSON: {is_json})")
            return status == 200
    except Exception as e:
        print(f"  [!] Erro no teste HTTP: {e}")
        return False

def main():
    print("=" * 70)
    print("  DEPLOY CPANEL: MULT ENGENHARIA")
    print(f"  Host: {FTP_HOST} | Usuário: {FTP_USER}")
    print("=" * 70)
    
    files = collect_files()
    print(f"📦 Total de arquivos selecionados para upload: {len(files)}")
    
    print("\n🔌 Conectando ao FTP cPanel...")
    ftp = ftplib.FTP(FTP_HOST, timeout=60)
    ftp.login(FTP_USER, FTP_PASS)
    print("✓ Conexão FTP estabelecida com sucesso!")
    
    for target in TARGET_DIRS:
        deploy_to_target(ftp, target, files)
        sync_data_and_uploads(ftp, target)
        
    ftp.quit()
    print("\n✓ Deploy FTP finalizado com sucesso!")
    
    # Test public endpoints
    for target in TARGET_DIRS:
        url = f"https://griddmkt360.com.br/{target}/"
        verify_http(url)
        
    # Test API endpoints
    verify_http("https://griddmkt360.com.br/site/multi-engenharia/api/projetos.php")
    verify_http("https://griddmkt360.com.br/site/multi-engenharia/api/hero.php")
    verify_http("https://griddmkt360.com.br/site/multi-engenharia/api/banners.php")
    verify_http("https://griddmkt360.com.br/site/mult-engenharia/api/projetos.php")

if __name__ == "__main__":
    main()
