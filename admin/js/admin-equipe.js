/**
 * MULT ENGENHARIA - ADMIN EQUIPE MULT MODULE
 */

window.AdminEquipe = {
  teamList: [],

  async render(container) {
    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Top Action Bar -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.03] p-6 rounded-2xl border border-white/10">
          <div>
            <h3 class="text-xl font-extrabold text-white flex items-center gap-2">
              <i class="ri-team-line text-purple-400"></i> Gestão da Equipe Mult
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Cadastre as consultoras e especialistas da rede exibidas na seção Nossas Multiplicadoras.
            </p>
          </div>
          <button id="addMemberBtn" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-sm text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition">
            <i class="ri-user-add-line text-lg"></i> Nova Especialista
          </button>
        </div>

        <!-- Table Card -->
        <div class="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div class="p-4 border-b border-white/10 flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Especialistas Cadastradas</span>
            <span id="teamCountBadge" class="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30 font-bold">Carregando...</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-300">
              <thead class="bg-white/[0.02] text-[11px] uppercase tracking-wider font-extrabold text-purple-300 border-b border-white/10">
                <tr>
                  <th class="px-6 py-4">Membro</th>
                  <th class="px-6 py-4">Cargo / Especialidade</th>
                  <th class="px-6 py-4">LinkedIn</th>
                  <th class="px-6 py-4">Ordem</th>
                  <th class="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody id="teamTableBody" class="divide-y divide-white/5">
                <tr>
                  <td colspan="5" class="px-6 py-8 text-center text-slate-500">
                    <i class="ri-loader-4-line animate-spin text-2xl text-purple-400 block mb-2"></i>
                    Carregando membros da equipe...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Member Modal -->
      <div id="memberModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <div class="bg-[#12052c] border border-white/15 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6 my-8">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 id="memberModalTitle" class="text-lg font-extrabold text-white">Adicionar Especialista</h4>
            <button id="closeMemberModalBtn" class="text-slate-400 hover:text-white p-2 text-xl">
              <i class="ri-close-line"></i>
            </button>
          </div>

          <form id="memberForm" class="space-y-4">
            <input type="hidden" id="memberId" />

            <div>
              <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Nome Completo *</label>
              <input type="text" id="memberName" required class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Cargo / Especialidade *</label>
              <input type="text" id="memberRole" required placeholder="Ex: Eng. Química, Meio Ambiente & ESG..." class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Breve Descrição / Bio</label>
              <textarea id="memberBio" rows="2" class="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500"></textarea>
            </div>

            <!-- Photo Upload Component with Live Portrait Thumbnail & Guidelines -->
            <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                  Foto da Especialista *
                </label>
                <div id="memberPhotoBadge" class="hidden"></div>
              </div>

              <div class="flex flex-col sm:flex-row items-center gap-5">
                <!-- Miniatura Visual com Proporção de Retrato (3:4) -->
                <div class="relative w-28 h-36 rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group">
                  <div class="absolute inset-0 flex flex-col items-center justify-center text-slate-500 text-xs text-center p-2 pointer-events-none">
                    <i class="ri-user-smile-line text-2xl text-purple-400/50 mb-1"></i>
                    <span class="text-[10px]">Sem foto</span>
                  </div>
                  <img id="memberPhotoPreview" src="" alt="Foto da Especialista" class="relative z-10 w-full h-full object-cover transition duration-300 group-hover:scale-105 opacity-0" />
                </div>

                <!-- Inputs de Arquivo e URL -->
                <div class="space-y-3 flex-1 w-full">
                  <input type="file" id="memberFileInput" accept="image/*" class="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer" />
                  <input type="text" id="memberPhotoUrl" placeholder="Ou informe a URL/caminho (ex: assets/img/especialista.jpg)" class="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500" />
                </div>
              </div>

              <!-- Card de Instruções & Diretrizes Técnicas -->
              <div class="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs space-y-1.5">
                <div class="flex items-center gap-2 text-purple-300 font-bold text-[11px] uppercase tracking-wider">
                  <i class="ri-lightbulb-line text-purple-400 text-sm"></i>
                  <span>Diretrizes para Fotos de Especialistas</span>
                </div>
                <ul class="text-[11px] text-purple-200/80 space-y-1 list-disc list-inside leading-relaxed">
                  <li><strong>Proporção recomendada:</strong> Retrato vertical <strong>3:4</strong> ou <strong>4:5</strong> (ideal: <code>800 x 1060 px</code>).</li>
                  <li><strong>Formatos & Tamanho:</strong> JPG, PNG ou WebP com no máximo <strong>2 MB</strong>.</li>
                  <li><strong>Composição:</strong> Retrato corporativo do busto para cima, rosto nítido e fundo neutro ou recortado.</li>
                </ul>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Link do LinkedIn</label>
                <input type="url" id="memberLinkedin" placeholder="https://linkedin.com/in/..." class="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Ordem de Exibição</label>
                <input type="number" id="memberOrder" value="1" class="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none" />
              </div>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
              <button type="button" id="cancelMemberBtn" class="px-5 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-bold">Cancelar</button>
              <button type="submit" id="saveMemberSubmitBtn" class="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30">Salvar</button>
            </div>
          </form>

        </div>
      </div>
    `;

    document.getElementById('addMemberBtn')?.addEventListener('click', () => this.openModal());
    document.getElementById('closeMemberModalBtn')?.addEventListener('click', () => this.closeModal());
    document.getElementById('cancelMemberBtn')?.addEventListener('click', () => this.closeModal());

    // Setup Smart Image Uploader
    this.imageUploader = window.AdminApp.setupImageUploader({
      previewImgId: 'memberPhotoPreview',
      fileInputId: 'memberFileInput',
      urlInputId: 'memberPhotoUrl',
      statusBadgeId: 'memberPhotoBadge',
      specs: {
        type: 'equipe',
        aspectRatio: '3:4',
        maxWeightMB: 2
      }
    });

    document.getElementById('memberForm')?.addEventListener('submit', (e) => this.handleSubmit(e));

    await this.loadTeam();
  },

  async loadTeam() {
    const tbody = document.getElementById('teamTableBody');
    const badge = document.getElementById('teamCountBadge');

    try {
      const res = await ApiClient.getTeam();
      this.teamList = res.data || [];

      if (badge) badge.textContent = `${this.teamList.length} Especialista(s)`;

      if (this.teamList.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" class="px-6 py-8 text-center text-slate-400">
              Nenhuma especialista cadastrada ainda.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = this.teamList.map(m => `
        <tr class="hover:bg-white/[0.02] transition">
          <td class="px-6 py-4 flex items-center gap-3">
            <img src="${m.photo_url || 'assets/img/taiana-franco.jpg'}" class="w-10 h-10 rounded-xl object-cover border border-white/10 bg-slate-900" onerror="this.src='../assets/logo/mult-icon-color.png'" />
            <div>
              <p class="font-bold text-white text-sm">${escapeHtml(m.name)}</p>
              <span class="text-xs text-slate-500 line-clamp-1">${escapeHtml(m.bio || '')}</span>
            </div>
          </td>
          <td class="px-6 py-4 text-xs font-semibold text-purple-300">${escapeHtml(m.role)}</td>
          <td class="px-6 py-4 text-xs">
            ${m.linkedin_url ? `
              <a href="${escapeHtml(m.linkedin_url)}" target="_blank" class="text-sky-400 hover:underline flex items-center gap-1">
                <i class="ri-linkedin-box-line text-sm"></i> Perfil
              </a>
            ` : '<span class="text-slate-600">-</span>'}
          </td>
          <td class="px-6 py-4 text-xs font-mono text-slate-400">#${m.display_order}</td>
          <td class="px-6 py-4 text-right space-x-2">
            <button onclick="AdminEquipe.editMember('${m.id}')" class="p-2 rounded-lg bg-white/5 hover:bg-purple-600/30 text-purple-300 hover:text-white transition" title="Editar">
              <i class="ri-edit-line"></i>
            </button>
            <button onclick="AdminEquipe.deleteMember('${m.id}')" class="p-2 rounded-lg bg-white/5 hover:bg-rose-600/30 text-rose-300 hover:text-white transition" title="Excluir">
              <i class="ri-delete-bin-line"></i>
            </button>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.error('[AdminEquipe] Erro ao listar equipe:', e);
    }
  },

  openModal(member = null) {
    const modal = document.getElementById('memberModal');
    if (!modal) return;

    if (member) {
      document.getElementById('memberModalTitle').textContent = 'Editar Especialista';
      document.getElementById('memberId').value = member.id;
      document.getElementById('memberName').value = member.name || '';
      document.getElementById('memberRole').value = member.role || '';
      document.getElementById('memberBio').value = member.bio || '';
      document.getElementById('memberPhotoUrl').value = member.photo_url || '';
      document.getElementById('memberLinkedin').value = member.linkedin_url || '';
      document.getElementById('memberOrder').value = member.display_order ?? 0;
      this.imageUploader?.setInitialUrl(member.photo_url || '');
    } else {
      document.getElementById('memberModalTitle').textContent = 'Nova Especialista';
      document.getElementById('memberId').value = '';
      document.getElementById('memberName').value = '';
      document.getElementById('memberRole').value = '';
      document.getElementById('memberBio').value = '';
      document.getElementById('memberLinkedin').value = '';
      document.getElementById('memberOrder').value = (this.teamList.length + 1) * 10;
      document.getElementById('memberPhotoUrl').value = '';
      this.imageUploader?.setInitialUrl('');
    }

    modal.classList.remove('hidden');
  },

  closeModal() {
    document.getElementById('memberModal')?.classList.add('hidden');
  },

  editMember(id) {
    const m = this.teamList.find(x => String(x.id) === String(id));
    if (m) this.openModal(m);
  },

  async deleteMember(id) {
    if (!confirm('Deseja realmente remover esta especialista?')) return;
    try {
      await ApiClient.deleteTeamMember(id);
      window.AdminApp.showToast('Especialista removida com sucesso!');
      await this.loadTeam();
    } catch (err) {
      alert('Erro ao excluir membro: ' + err.message);
    }
  },

  async handleSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('memberId').value;
    const payload = {
      name: document.getElementById('memberName').value.trim(),
      role: document.getElementById('memberRole').value.trim(),
      bio: document.getElementById('memberBio').value.trim(),
      photo_url: document.getElementById('memberPhotoUrl').value.trim(),
      linkedin_url: document.getElementById('memberLinkedin').value.trim(),
      display_order: Number(document.getElementById('memberOrder').value) || 0,
      is_active: 1
    };

    try {
      await ApiClient.saveTeamMember(payload, id || null);
      this.closeModal();
      window.AdminApp.showToast(id ? 'Especialista atualizada!' : 'Especialista cadastrada com sucesso!');
      await this.loadTeam();
    } catch (err) {
      alert('Erro ao salvar especialista: ' + err.message);
    }
  }
};
