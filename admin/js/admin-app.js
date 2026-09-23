/**
 * MULT ENGENHARIA - MASTER ADMIN APPLICATION
 * Orchestrates modules, routing, and dashboard KPI views
 */

window.AdminApp = {
  currentModule: 'dashboard',

  async init() {
    const isAuth = await window.AdminAuth.checkAuth();
    if (!isAuth) return;

    this.bindEvents();
    this.navigate('dashboard');
  },

  bindEvents() {
    // Navigation items
    document.querySelectorAll('.admin-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const mod = btn.getAttribute('data-module');
        if (mod) this.navigate(mod);
      });
    });

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      if (confirm('Deseja realmente sair do painel?')) {
        window.AdminAuth.logout();
      }
    });

    // Mobile Advisory Banner Dismissal
    const mobileBanner = document.getElementById('mobileAdvisoryBanner');
    const dismissBtn = document.getElementById('dismissMobileBannerBtn');
    if (sessionStorage.getItem('mult_dismiss_mobile_banner') === 'true') {
      mobileBanner?.classList.add('!hidden');
    }
    dismissBtn?.addEventListener('click', () => {
      mobileBanner?.classList.add('!hidden');
      sessionStorage.setItem('mult_dismiss_mobile_banner', 'true');
    });
  },

  navigate(moduleName) {
    this.currentModule = moduleName;

    // Update active nav state
    document.querySelectorAll('.admin-nav-item').forEach(btn => {
      if (btn.getAttribute('data-module') === moduleName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const pageTitle = document.getElementById('pageTitle');
    const container = document.getElementById('mainContainer');
    if (!container) return;

    switch (moduleName) {
      case 'dashboard':
        if (pageTitle) pageTitle.textContent = 'Dashboard Geral';
        this.renderDashboard(container);
        break;

      case 'banners':
        if (pageTitle) pageTitle.textContent = 'Banners do Hero (Carrossel)';
        window.AdminBanners.render(container);
        break;

      case 'hero':
        if (pageTitle) pageTitle.textContent = 'Editar Seção Hero';
        window.AdminHero.render(container);
        break;

      case 'projetos':
        if (pageTitle) pageTitle.textContent = 'Projetos em Destaque';
        window.AdminProjetos.render(container);
        break;

      case 'equipe':
        if (pageTitle) pageTitle.textContent = 'Equipe Mult';
        window.AdminEquipe.render(container);
        break;

      case 'leads':
        if (pageTitle) pageTitle.textContent = 'Leads & Contatos Recebidos';
        this.renderLeads(container);
        break;

      case 'usuarios':
        if (pageTitle) pageTitle.textContent = 'Gestão de Usuários (SuperAdmin)';
        window.AdminUsuarios.render(container);
        break;

      default:
        this.renderDashboard(container);
    }
  },

  async renderDashboard(container) {
    container.innerHTML = `
      <div class="space-y-8">
        
        <!-- Welcome Banner -->
        <div class="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/60 via-mult-dark to-indigo-950/60 border border-purple-500/20 shadow-xl">
          <div class="relative z-10 max-w-2xl space-y-2">
            <span class="text-xs font-extrabold uppercase tracking-widest text-purple-300">
              Painel de Controle Institucional
            </span>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
              Bem-vindo, ${window.AdminAuth.currentUser?.name || 'Administrador'}!
            </h3>
            <p class="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Aqui você gerencia o conteúdo vital do site da Mult Engenharia, acompanha novos leads comerciais e gerencia a equipe de especialistas.
            </p>
          </div>
        </div>

        <!-- 4 KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div class="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total de Leads</span>
              <h4 id="kpiLeads" class="text-3xl font-extrabold text-white mt-1">0</h4>
              <span class="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">Novas oportunidades</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl font-bold">
              <i class="ri-mail-unread-line"></i>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Projetos Ativos</span>
              <h4 id="kpiProjects" class="text-3xl font-extrabold text-white mt-1">0</h4>
              <span class="text-[11px] text-purple-300 font-semibold mt-1 inline-block">Casos de sucesso</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl font-bold">
              <i class="ri-briefcase-line"></i>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Especialistas</span>
              <h4 id="kpiTeam" class="text-3xl font-extrabold text-white mt-1">0</h4>
              <span class="text-[11px] text-sky-400 font-semibold mt-1 inline-block">Rede consultiva</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-2xl font-bold">
              <i class="ri-team-line"></i>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Banco de Dados</span>
              <h4 class="text-lg font-extrabold text-emerald-400 mt-2">Local SQLite</h4>
              <span class="text-[11px] text-slate-400 font-mono mt-1 inline-block">mult.db (OK)</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold">
              <i class="ri-database-2-line"></i>
            </div>
          </div>

        </div>

        <!-- Recent Leads & Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Recent Leads Card -->
          <div class="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <h4 class="text-base font-bold text-white flex items-center gap-2">
                <i class="ri-history-line text-purple-400"></i> Últimos Leads Recebidos
              </h4>
              <button onclick="AdminApp.navigate('leads')" class="text-xs text-purple-400 hover:text-purple-300 font-bold">
                Ver todos →
              </button>
            </div>
            <div id="dashboardLeadsList" class="divide-y divide-white/5 space-y-3">
              <div class="text-center py-6 text-slate-500 text-xs">
                Carregando leads...
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="space-y-4">
            <div class="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
              <h4 class="text-base font-bold text-white flex items-center gap-2">
                <i class="ri-flashlight-line text-amber-400"></i> Ações Rápidas
              </h4>
              <div class="space-y-2.5">
                <button onclick="AdminApp.navigate('banners')" class="w-full px-4 py-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 text-white text-xs font-bold text-left flex items-center justify-between transition border border-purple-500/40">
                  <span class="flex items-center gap-2"><i class="ri-slideshow-3-line text-purple-300"></i> Banners do Hero (Carrossel)</span>
                  <i class="ri-arrow-right-s-line"></i>
                </button>
                <button onclick="AdminApp.navigate('projetos')" class="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold text-left flex items-center justify-between transition">
                  <span class="flex items-center gap-2"><i class="ri-add-circle-line text-purple-400"></i> Adicionar Projeto</span>
                  <i class="ri-arrow-right-s-line"></i>
                </button>
                <button onclick="AdminApp.navigate('equipe')" class="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold text-left flex items-center justify-between transition">
                  <span class="flex items-center gap-2"><i class="ri-user-add-line text-purple-400"></i> Cadastrar Especialista</span>
                  <i class="ri-arrow-right-s-line"></i>
                </button>
                <a href="../index.html" target="_blank" class="w-full px-4 py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 text-xs font-bold text-left flex items-center justify-between transition border border-purple-500/30">
                  <span class="flex items-center gap-2"><i class="ri-eye-line text-purple-400"></i> Visualizar Site ao Vivo</span>
                  <i class="ri-external-link-line"></i>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    // Fetch and populate KPI counts
    try {
      const [leadsRes, projRes, teamRes] = await Promise.all([
        ApiClient.getLeads().catch(() => ({ data: [] })),
        ApiClient.getProjects(false).catch(() => ({ data: [] })),
        ApiClient.getTeam().catch(() => ({ data: [] }))
      ]);

      const leads = leadsRes.data || [];
      const projs = projRes.data || [];
      const team = teamRes.data || [];

      document.getElementById('kpiLeads').textContent = leads.length;
      document.getElementById('kpiProjects').textContent = projs.length;
      document.getElementById('kpiTeam').textContent = team.length;

      const leadsListEl = document.getElementById('dashboardLeadsList');
      if (leads.length === 0) {
        leadsListEl.innerHTML = '<p class="text-xs text-slate-500 py-4 text-center">Nenhum contato recebido ainda.</p>';
      } else {
        leadsListEl.innerHTML = leads.slice(0, 4).map(l => `
          <div class="pt-3 flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-bold text-white">${escapeHtml(l.name)}</p>
              <p class="text-xs text-slate-400">${escapeHtml(l.company || 'Empresa não informada')} • <span class="font-mono">${escapeHtml(l.email)}</span></p>
              <p class="text-xs text-purple-300 mt-1">Momento: ${escapeHtml(l.project_moment || 'Geral')}</p>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${l.status === 'novo' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}">
              ${escapeHtml(l.status)}
            </span>
          </div>
        `).join('');
      }
    } catch (e) {
      console.log('[Dashboard] Erro ao carregar métricas:', e);
    }
  },

  async renderLeads(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.03] p-6 rounded-2xl border border-white/10">
          <div>
            <h3 class="text-xl font-extrabold text-white flex items-center gap-2">
              <i class="ri-mail-unread-line text-purple-400"></i> Contatos e Oportunidades Comerciais
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Mensagens enviadas através do formulário institucional da página inicial.
            </p>
          </div>
          <button onclick="AdminApp.renderLeads(document.getElementById('mainContainer'))" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 flex items-center gap-2 transition">
            <i class="ri-refresh-line"></i> Atualizar
          </button>
        </div>

        <div class="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-300">
              <thead class="bg-white/[0.02] text-[11px] uppercase tracking-wider font-extrabold text-purple-300 border-b border-white/10">
                <tr>
                  <th class="px-6 py-4">Data</th>
                  <th class="px-6 py-4">Nome / Empresa</th>
                  <th class="px-6 py-4">Contatos</th>
                  <th class="px-6 py-4">Momento</th>
                  <th class="px-6 py-4">Mensagem</th>
                  <th class="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody id="leadsTableBody" class="divide-y divide-white/5">
                <tr>
                  <td colspan="6" class="px-6 py-8 text-center text-slate-500">
                    <i class="ri-loader-4-line animate-spin text-2xl text-purple-400 block mb-2"></i>
                    Carregando leads...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    try {
      const res = await ApiClient.getLeads();
      const leads = res.data || [];
      const tbody = document.getElementById('leadsTableBody');

      if (leads.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="px-6 py-8 text-center text-slate-400">
              Nenhum contato registrado no momento.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = leads.map(l => `
        <tr class="hover:bg-white/[0.02] transition text-xs">
          <td class="px-6 py-4 text-slate-400 font-mono whitespace-nowrap">
            ${l.created_at ? new Date(l.created_at).toLocaleDateString('pt-BR') : 'Hoje'}
          </td>
          <td class="px-6 py-4 font-bold text-white">
            ${escapeHtml(l.name)}
            <span class="block text-slate-400 font-normal">${escapeHtml(l.company || 'Pessoa Física')}</span>
          </td>
          <td class="px-6 py-4 space-y-0.5">
            <a href="mailto:${escapeHtml(l.email)}" class="text-purple-300 hover:underline block">${escapeHtml(l.email)}</a>
            ${l.phone ? `<a href="https://wa.me/55${l.phone.replace(/\D/g, '')}" target="_blank" class="text-emerald-400 hover:underline block">${escapeHtml(l.phone)}</a>` : ''}
          </td>
          <td class="px-6 py-4 font-semibold text-purple-200">
            ${escapeHtml(l.project_moment || 'Geral')}
          </td>
          <td class="px-6 py-4 text-slate-300 max-w-xs truncate" title="${escapeHtml(l.message)}">
            ${escapeHtml(l.message)}
          </td>
          <td class="px-6 py-4">
            <select onchange="AdminApp.changeLeadStatus(${l.id}, this.value)" class="bg-slate-900 border border-white/10 text-[11px] rounded-lg px-2 py-1 text-slate-200 outline-none">
              <option value="novo" ${l.status === 'novo' ? 'selected' : ''}>Novo</option>
              <option value="em_atendimento" ${l.status === 'em_atendimento' ? 'selected' : ''}>Em Atendimento</option>
              <option value="concluido" ${l.status === 'concluido' ? 'selected' : ''}>Concluído</option>
            </select>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.error('[AdminLeads] Erro:', e);
    }
  },

  async changeLeadStatus(id, status) {
    try {
      await ApiClient.updateLeadStatus(id, status);
      this.showToast('Status do lead atualizado!');
    } catch (err) {
      alert('Erro ao atualizar status: ' + err.message);
    }
  },

  setupImageUploader({
    previewImgId,
    fileInputId,
    urlInputId,
    statusBadgeId,
    specs = {}
  }) {
    const previewImg = document.getElementById(previewImgId);
    const fileInput = document.getElementById(fileInputId);
    const urlInput = document.getElementById(urlInputId);
    const statusBadge = document.getElementById(statusBadgeId);

    if (!previewImg || !urlInput) return null;

    const maxMB = specs.maxWeightMB || 3;

    const updateBadge = (width, height, sizeBytes = null) => {
      if (!statusBadge) return;
      let text = `${width} x ${height} px`;
      let warnings = [];

      if (sizeBytes !== null) {
        const sizeKB = (sizeBytes / 1024).toFixed(0);
        const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);
        const displayWeight = sizeBytes > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;
        text += ` • ${displayWeight}`;

        if (sizeBytes > maxMB * 1024 * 1024) {
          warnings.push(`Peso acima do recomendado (máx ${maxMB} MB)`);
        }
      }

      if (specs.type === 'equipe' && width > height * 1.05) {
        warnings.push('Recomendamos foto vertical (3:4) para especialistas');
      } else if ((specs.type === 'hero-desktop' || specs.aspectRatio === '16:9') && width < height * 1.2) {
        warnings.push('Recomendamos foto horizontal (16:9) para visualização desktop');
      } else if ((specs.type === 'hero-mobile' || specs.aspectRatio === '4:5') && width > height * 1.1) {
        warnings.push('Recomendamos foto vertical (4:5 ou 1:1) para smartphones');
      } else if (specs.type === 'projeto-desktop' && width > height * 1.4) {
        warnings.push('Recomendamos proporção de coluna (~4:5 ou 1:1) para desktop');
      } else if (specs.type === 'projeto-mobile' && height > width * 1.05) {
        warnings.push('Recomendamos foto horizontal (16:9) para card empilhado no mobile');
      } else if (specs.type === 'projeto' && height > width * 1.05) {
        warnings.push('Recomendamos foto horizontal (16:9) para projetos');
      }

      if (warnings.length > 0) {
        statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30';
        statusBadge.innerHTML = `<i class="ri-alert-line text-xs"></i> <span>${text} — ${warnings[0]}</span>`;
      } else {
        statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
        statusBadge.innerHTML = `<i class="ri-checkbox-circle-line text-xs"></i> <span>${text} (Ideal ✓)</span>`;
      }
      statusBadge.classList.remove('hidden');
    };

    const resolveAdminUrl = (url) => {
      if (!url || !url.trim()) return '';
      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('/')) {
        return url;
      }
      return '../' + url;
    };

    const inspectUrl = (url) => {
      if (!url || !url.trim()) {
        if (statusBadge) statusBadge.classList.add('hidden');
        previewImg.src = '';
        previewImg.classList.add('opacity-0');
        return;
      }

      const resolved = resolveAdminUrl(url);
      previewImg.src = resolved;
      previewImg.classList.remove('opacity-0');

      const img = new Image();
      img.onload = () => {
        updateBadge(img.naturalWidth, img.naturalHeight);
      };
      img.onerror = () => {
        if (statusBadge) {
          statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold bg-red-500/20 text-red-300 border border-red-500/30';
          statusBadge.innerHTML = `<i class="ri-close-circle-line text-xs"></i> <span>Não foi possível carregar a imagem deste endereço</span>`;
          statusBadge.classList.remove('hidden');
        }
      };
      img.src = resolved;
    };

    urlInput.addEventListener('input', () => {
      inspectUrl(urlInput.value);
    });

    if (fileInput) {
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Instant local live preview
        const localBlobUrl = URL.createObjectURL(file);
        previewImg.src = localBlobUrl;
        previewImg.classList.remove('opacity-0');

        const tempImg = new Image();
        tempImg.onload = () => {
          updateBadge(tempImg.naturalWidth, tempImg.naturalHeight, file.size);
        };
        tempImg.src = localBlobUrl;

        // Upload to server
        try {
          if (statusBadge) {
            statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30';
            statusBadge.innerHTML = `<i class="ri-loader-4-line animate-spin text-xs"></i> <span>Enviando arquivo para o servidor...</span>`;
            statusBadge.classList.remove('hidden');
          }

          const uploadRes = await window.ApiClient.uploadImage(file);
          urlInput.value = uploadRes.url;
          window.AdminApp.showToast('Imagem enviada com sucesso!');

          const resolved = resolveAdminUrl(uploadRes.url);
          previewImg.src = resolved;
          const uploadedImg = new Image();
          uploadedImg.onload = () => {
            updateBadge(uploadedImg.naturalWidth, uploadedImg.naturalHeight, file.size);
          };
          uploadedImg.src = resolved;
        } catch (err) {
          alert('Erro ao enviar imagem: ' + err.message);
          if (statusBadge) {
            statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold bg-red-500/20 text-red-300 border border-red-500/30';
            statusBadge.innerHTML = `<i class="ri-error-warning-line text-xs"></i> <span>Falha no upload: ${err.message}</span>`;
          }
        }
      });
    }

    return {
      setInitialUrl(url) {
        urlInput.value = url || '';
        inspectUrl(url);
      }
    };
  },

  showToast(message) {
    let toast = document.getElementById('adminToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'adminToast';
      toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-purple-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2.5 transition-all duration-300 transform translate-y-20 opacity-0';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="ri-checkbox-circle-fill text-lg"></i> <span>${message}</span>`;
    toast.classList.remove('translate-y-20', 'opacity-0');

    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.AdminApp.init();
});

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[m]);
}
