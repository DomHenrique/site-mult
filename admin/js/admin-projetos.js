/**
 * MULT ENGENHARIA - ADMIN PROJETOS EM DESTAQUE MODULE
 */

window.AdminProjetos = {
  projectsList: [],

  async render(container) {
    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Top Action Bar -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.03] p-6 rounded-2xl border border-white/10">
          <div>
            <h3 class="text-xl font-extrabold text-white flex items-center gap-2">
              <i class="ri-briefcase-4-line text-purple-400"></i> Gestão de Projetos em Destaque
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Cadastre e gerencie os casos de sucesso técnicos exibidos na página inicial.
            </p>
          </div>
          <button id="addProjectBtn" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-sm text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition">
            <i class="ri-add-circle-line text-lg"></i> Novo Projeto
          </button>
        </div>

        <!-- Table / Cards List -->
        <div class="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div class="p-4 border-b border-white/10 flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Projetos Cadastrados</span>
            <span id="projectsCountBadge" class="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30 font-bold">Carregando...</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-300">
              <thead class="bg-white/[0.02] text-[11px] uppercase tracking-wider font-extrabold text-purple-300 border-b border-white/10">
                <tr>
                  <th class="px-6 py-4">Projeto</th>
                  <th class="px-6 py-4">Categoria</th>
                  <th class="px-6 py-4">Destaque</th>
                  <th class="px-6 py-4">Ordem</th>
                  <th class="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody id="projectsTableBody" class="divide-y divide-white/5">
                <tr>
                  <td colspan="5" class="px-6 py-8 text-center text-slate-500">
                    <i class="ri-loader-4-line animate-spin text-2xl text-purple-400 block mb-2"></i>
                    Carregando lista de projetos...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Project Modal (Create / Edit) -->
      <div id="projectModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <div class="bg-[#12052c] border border-white/15 rounded-3xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 id="projectModalTitle" class="text-lg font-extrabold text-white">Adicionar Projeto</h4>
            <button id="closeProjectModalBtn" class="text-slate-400 hover:text-white p-2 text-xl">
              <i class="ri-close-line"></i>
            </button>
          </div>

          <form id="projectForm" class="space-y-4">
            <input type="hidden" id="projId" />

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Título do Projeto *</label>
                <input type="text" id="projTitle" required class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Categoria</label>
                <input type="text" id="projCategory" placeholder="Ex: Alimentos" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Descrição Resumida *</label>
              <textarea id="projDescription" rows="3" required class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500"></textarea>
            </div>

            <!-- Dual Image Upload Component (Comparação Visual Desktop vs Mobile) -->
            <div class="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                  Fotos do Projeto (Comparação Visual Multi-Dispositivo)
                </label>
                <span class="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Enquadramento Sob Medida
                </span>
              </div>

              <!-- Grid Duplo Lado a Lado -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <!-- SLOT 1: DESKTOP (Coluna Vertical do Card ~4:5 / 1:1) -->
                <div class="p-3.5 rounded-xl bg-black/30 border border-white/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-1 mb-2">
                      <span class="text-xs font-bold text-purple-200 flex items-center gap-1">
                        <i class="ri-computer-line text-purple-400"></i> Versão Desktop
                      </span>
                      <span class="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Vertical (~4:5)
                      </span>
                    </div>

                    <div class="relative w-full h-36 rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center shadow-inner group">
                      <div class="absolute inset-0 flex flex-col items-center justify-center text-slate-500 text-xs text-center p-2 pointer-events-none">
                        <i class="ri-image-2-line text-2xl text-purple-400/40 mb-1"></i>
                        <span>Sem imagem desktop</span>
                      </div>
                      <img id="projImagePreview" src="" alt="Miniatura do Projeto Desktop" class="relative z-10 w-full h-full object-cover transition duration-300 group-hover:scale-105 opacity-0" />
                    </div>
                    
                    <div id="projImageBadge" class="hidden mt-2"></div>
                  </div>

                  <div class="space-y-2 pt-2 border-t border-white/5">
                    <input type="file" id="projFileInput" accept="image/*" class="block w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer" />
                    <input type="text" id="projImageUrl" placeholder="URL Desktop (assets/img/projeto.jpg)" class="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500" />
                    <p class="text-[10px] text-slate-400">
                      <i class="ri-information-line text-purple-400"></i> Usada na coluna lateral do card no desktop.
                    </p>
                  </div>
                </div>

                <!-- SLOT 2: MOBILE (Banner Horizontal ~16:9) -->
                <div class="p-3.5 rounded-xl bg-black/30 border border-white/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-1 mb-2">
                      <span class="text-xs font-bold text-purple-200 flex items-center gap-1">
                        <i class="ri-smartphone-line text-purple-400"></i> Versão Mobile
                      </span>
                      <span class="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Horizontal (~16:9)
                      </span>
                    </div>

                    <div class="relative w-full h-36 rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center shadow-inner group">
                      <div class="absolute inset-0 flex flex-col items-center justify-center text-slate-500 text-xs text-center p-2 pointer-events-none">
                        <i class="ri-smartphone-line text-2xl text-amber-400/40 mb-1"></i>
                        <span>Sem imagem mobile (usa desktop)</span>
                      </div>
                      <img id="projImageMobilePreview" src="" alt="Miniatura do Projeto Mobile" class="relative z-10 w-full h-full object-cover transition duration-300 group-hover:scale-105 opacity-0" />
                    </div>
                    
                    <div id="projImageMobileBadge" class="hidden mt-2"></div>
                  </div>

                  <div class="space-y-2 pt-2 border-t border-white/5">
                    <input type="file" id="projMobileFileInput" accept="image/*" class="block w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-amber-600 file:text-white hover:file:bg-amber-500 cursor-pointer" />
                    <input type="text" id="projImageMobileUrl" placeholder="URL Mobile (opcional: assets/img/projeto-mobile.jpg)" class="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500" />
                    <p class="text-[10px] text-slate-400">
                      <i class="ri-shield-check-line text-emerald-400"></i> Opcional: Usada em celulares quando o card se empilha.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <!-- Tags de Pilares -->
            <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
              <span class="text-xs font-bold text-purple-300 uppercase block">Pilares Técnicos em Destaque</span>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input type="text" id="projTag1Title" placeholder="Pilar 1 (Ex: DESENVOLVIMENTO)" class="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white" />
                  <input type="text" id="projTag1Desc" placeholder="Descrição curta" class="w-full px-3 py-2 mt-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300" />
                </div>
                <div>
                  <input type="text" id="projTag2Title" placeholder="Pilar 2 (Ex: SAÚDE)" class="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white" />
                  <input type="text" id="projTag2Desc" placeholder="Descrição curta" class="w-full px-3 py-2 mt-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300" />
                </div>
                <div>
                  <input type="text" id="projTag3Title" placeholder="Pilar 3 (Ex: SUSTENTABILIDADE)" class="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white" />
                  <input type="text" id="projTag3Desc" placeholder="Descrição curta" class="w-full px-3 py-2 mt-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300" />
                </div>
              </div>
            </div>

            <!-- Action Button Settings -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Texto do Botão de Ação</label>
                <input type="text" id="projBtnText" placeholder="Ex: SAIBA MAIS SOBRE O PROJETO" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Link de Destino</label>
                <input type="text" id="projBtnLink" placeholder="Ex: #contato" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
              </div>
            </div>

            <!-- Display Order -->
            <div>
              <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Ordem de Exibição</label>
              <input type="number" id="projOrder" min="0" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
            </div>

            <!-- Modal Actions -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button type="button" id="cancelProjectBtn" class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold transition">
                Cancelar
              </button>
              <button type="submit" id="saveProjectBtn" class="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-sm text-white shadow-lg shadow-purple-600/30 transition flex items-center gap-2">
                <i class="ri-save-line"></i> Salvar Projeto
              </button>
            </div>

          </form>

        </div>
      </div>
    `;

    document.getElementById('addProjectBtn')?.addEventListener('click', () => this.openModal());
    document.getElementById('closeProjectModalBtn')?.addEventListener('click', () => this.closeModal());
    document.getElementById('cancelProjectBtn')?.addEventListener('click', () => this.closeModal());

    // Setup Dual Smart Image Uploaders (Desktop & Mobile)
    this.desktopUploader = window.AdminApp.setupImageUploader({
      previewImgId: 'projImagePreview',
      fileInputId: 'projFileInput',
      urlInputId: 'projImageUrl',
      statusBadgeId: 'projImageBadge',
      specs: {
        type: 'projeto-desktop',
        aspectRatio: '4:5',
        maxWeightMB: 4
      }
    });

    this.mobileUploader = window.AdminApp.setupImageUploader({
      previewImgId: 'projImageMobilePreview',
      fileInputId: 'projMobileFileInput',
      urlInputId: 'projImageMobileUrl',
      statusBadgeId: 'projImageMobileBadge',
      specs: {
        type: 'projeto-mobile',
        aspectRatio: '16:9',
        maxWeightMB: 4
      }
    });

    // Form submit
    document.getElementById('projectForm')?.addEventListener('submit', (e) => this.handleSubmit(e));

    await this.loadProjects();
  },

  async loadProjects() {
    const tbody = document.getElementById('projectsTableBody');
    const badge = document.getElementById('projectsCountBadge');

    try {
      const res = await ApiClient.getProjects(false);
      this.projectsList = res.data || [];

      if (badge) badge.textContent = `${this.projectsList.length} Projeto(s)`;

      if (this.projectsList.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" class="px-6 py-8 text-center text-slate-400">
              Nenhum projeto cadastrado ainda. Clique em "Novo Projeto" para começar.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = this.projectsList.map(p => `
        <tr class="hover:bg-white/[0.02] transition">
          <td class="px-6 py-4 flex items-center gap-3">
            <img src="${(p.image_url && (p.image_url.startsWith('http') || p.image_url.startsWith('/'))) ? p.image_url : (p.image_url ? '../' + p.image_url : '../assets/img/engenharia-de-alimentos.jpeg')}" class="w-12 h-12 rounded-xl object-cover border border-white/10 bg-slate-900" onerror="this.src='../assets/logo/mult-icon-color.png'" />
            <div>
              <p class="font-bold text-white text-sm">${escapeHtml(p.title)}</p>
              <span class="text-xs text-slate-500 line-clamp-1">${escapeHtml(p.description)}</span>
            </div>
          </td>
          <td class="px-6 py-4 text-xs font-semibold text-purple-300">${escapeHtml(p.category || 'Geral')}</td>
          <td class="px-6 py-4">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${p.is_featured ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-400'}">
              ${p.is_featured ? 'Ativo' : 'Oculto'}
            </span>
          </td>
          <td class="px-6 py-4 text-xs font-mono text-slate-400">#${p.display_order}</td>
          <td class="px-6 py-4 text-right space-x-2">
            <button onclick="window.AdminProjetos.editProject('${p.id}')" class="p-2 rounded-lg bg-white/5 hover:bg-purple-600/30 text-purple-300 hover:text-white transition" title="Editar">
              <i class="ri-edit-line"></i>
            </button>
            <button onclick="window.AdminProjetos.deleteProject('${p.id}')" class="p-2 rounded-lg bg-white/5 hover:bg-rose-600/30 text-rose-300 hover:text-white transition" title="Excluir">
              <i class="ri-delete-bin-line"></i>
            </button>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.error('[AdminProjetos] Erro ao listar projetos:', e);
    }
  },

  openModal(project = null) {
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('projectModalTitle');
    const form = document.getElementById('projectForm');
    form.reset();

    if (project) {
      title.textContent = 'Editar Projeto';
      document.getElementById('projId').value = project.id;
      document.getElementById('projTitle').value = project.title || '';
      document.getElementById('projCategory').value = project.category || '';
      document.getElementById('projDescription').value = project.description || '';
      document.getElementById('projImageUrl').value = project.image_url || '';
      document.getElementById('projImageMobileUrl').value = project.image_mobile_url || '';
      document.getElementById('projTag1Title').value = project.tag_1_title || '';
      document.getElementById('projTag1Desc').value = project.tag_1_desc || '';
      document.getElementById('projTag2Title').value = project.tag_2_title || '';
      document.getElementById('projTag2Desc').value = project.tag_2_desc || '';
      document.getElementById('projTag3Title').value = project.tag_3_title || '';
      document.getElementById('projTag3Desc').value = project.tag_3_desc || '';
      document.getElementById('projBtnText').value = project.action_button_text || '';
      document.getElementById('projBtnLink').value = project.action_button_link || '';
      document.getElementById('projOrder').value = project.display_order || 0;
      this.desktopUploader?.setInitialUrl(project.image_url || '');
      this.mobileUploader?.setInitialUrl(project.image_mobile_url || '');
    } else {
      title.textContent = 'Adicionar Novo Projeto';
      document.getElementById('projId').value = '';
      document.getElementById('projImageUrl').value = '';
      document.getElementById('projImageMobileUrl').value = '';
      document.getElementById('projBtnText').value = 'SAIBA MAIS SOBRE O PROJETO';
      document.getElementById('projBtnLink').value = '#contato';
      document.getElementById('projOrder').value = this.projectsList.length + 1;
      this.desktopUploader?.setInitialUrl('');
      this.mobileUploader?.setInitialUrl('');
    }

    modal.classList.remove('hidden');
  },

  closeModal() {
    document.getElementById('projectModal')?.classList.add('hidden');
  },

  editProject(id) {
    const p = this.projectsList.find(x => String(x.id) === String(id));
    if (p) {
      this.openModal(p);
    } else {
      console.warn('[AdminProjetos] Projeto não encontrado com ID:', id);
    }
  },

  async deleteProject(id) {
    const p = this.projectsList.find(x => String(x.id) === String(id));
    const title = p ? `"${p.title}"` : 'este projeto em destaque';
    if (!confirm(`Deseja realmente excluir ${title}?`)) return;
    try {
      await ApiClient.deleteProject(id);
      window.AdminApp.showToast('Projeto excluído com sucesso!');
      await this.loadProjects();
    } catch (err) {
      alert('Erro ao excluir projeto: ' + err.message);
    }
  },

  async handleSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('projId').value;
    const payload = {
      title: document.getElementById('projTitle').value.trim(),
      category: document.getElementById('projCategory').value.trim(),
      description: document.getElementById('projDescription').value.trim(),
      image_url: document.getElementById('projImageUrl').value.trim(),
      image_mobile_url: document.getElementById('projImageMobileUrl').value.trim(),
      tag_1_title: document.getElementById('projTag1Title').value.trim(),
      tag_1_desc: document.getElementById('projTag1Desc').value.trim(),
      tag_2_title: document.getElementById('projTag2Title').value.trim(),
      tag_2_desc: document.getElementById('projTag2Desc').value.trim(),
      tag_3_title: document.getElementById('projTag3Title').value.trim(),
      tag_3_desc: document.getElementById('projTag3Desc').value.trim(),
      action_button_text: document.getElementById('projBtnText').value.trim(),
      action_button_link: document.getElementById('projBtnLink').value.trim(),
      display_order: Number(document.getElementById('projOrder').value) || 0,
      is_featured: 1
    };

    try {
      await ApiClient.saveProject(payload, id || null);
      this.closeModal();
      window.AdminApp.showToast(id ? 'Projeto atualizado com sucesso!' : 'Projeto criado com sucesso!');
      await this.loadProjects();
    } catch (err) {
      alert('Erro ao salvar projeto: ' + err.message);
    }
  }
};
