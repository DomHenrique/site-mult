/**
 * MULT ENGENHARIA - ADMIN GESTÃO DE USUÁRIOS MODULE (SUPERADMIN ONLY)
 */

window.AdminUsuarios = {
  usersList: [],

  async render(container) {
    // Permission guard
    if (window.AdminAuth.currentUser?.role !== 'superadmin') {
      container.innerHTML = `
        <div class="max-w-md mx-auto my-12 bg-rose-500/10 border border-rose-500/30 rounded-3xl p-8 text-center space-y-4">
          <div class="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mx-auto">
            <i class="ri-shield-cross-line"></i>
          </div>
          <h3 class="text-lg font-bold text-white">Acesso Restrito ao SuperAdmin</h3>
          <p class="text-xs text-rose-200/80">
            Seu perfil atual de usuário não possui permissão para gerenciar contas e credenciais do sistema.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Top Action Bar -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.03] p-6 rounded-2xl border border-white/10">
          <div>
            <h3 class="text-xl font-extrabold text-white flex items-center gap-2">
              <i class="ri-shield-user-line text-amber-400"></i> Gestão de Usuários e Permissões
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Controle de contas com diferenciação entre <strong>SuperAdmin</strong> e <strong>Editor</strong>.
            </p>
          </div>
          <button id="addUserBtn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 font-bold text-sm text-white shadow-lg shadow-amber-600/20 flex items-center gap-2 transition">
            <i class="ri-user-add-line text-lg"></i> Novo Usuário
          </button>
        </div>

        <!-- Users Table Card -->
        <div class="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div class="p-4 border-b border-white/10 flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Usuários do Sistema</span>
            <span id="usersCountBadge" class="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-bold">Carregando...</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-300">
              <thead class="bg-white/[0.02] text-[11px] uppercase tracking-wider font-extrabold text-amber-300 border-b border-white/10">
                <tr>
                  <th class="px-6 py-4">Usuário</th>
                  <th class="px-6 py-4">E-mail</th>
                  <th class="px-6 py-4">Cargo / Nível</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody id="usersTableBody" class="divide-y divide-white/5">
                <tr>
                  <td colspan="5" class="px-6 py-8 text-center text-slate-500">
                    <i class="ri-loader-4-line animate-spin text-2xl text-amber-400 block mb-2"></i>
                    Carregando contas de usuários...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- User Modal -->
      <div id="userModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <div class="bg-[#12052c] border border-white/15 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-6 my-8">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 id="userModalTitle" class="text-lg font-extrabold text-white">Adicionar Usuário</h4>
            <button id="closeUserModalBtn" class="text-slate-400 hover:text-white p-2 text-xl">
              <i class="ri-close-line"></i>
            </button>
          </div>

          <form id="userForm" class="space-y-4">
            <input type="hidden" id="usrId" />

            <div>
              <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Nome Completo *</label>
              <input type="text" id="usrName" required class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-purple-300 mb-1">E-mail *</label>
              <input type="email" id="usrEmail" required class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Nível de Acesso (Cargo)</label>
              <select id="usrRole" class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm outline-none focus:border-purple-500">
                <option value="user">Usuário / Editor (Gestão de conteúdo)</option>
                <option value="superadmin">SuperAdmin (Acesso total)</option>
              </select>
            </div>

            <div id="usrPasswordContainer">
              <label class="block text-xs font-bold uppercase text-purple-300 mb-1">
                Senha de Acesso <span id="pwdRequiredTag">*</span>
              </label>
              <input type="password" id="usrPassword" placeholder="Mínimo 6 caracteres" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
              <p id="pwdHint" class="text-[11px] text-slate-400 mt-1 hidden">Deixe em branco caso não queira alterar a senha.</p>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Status da Conta</label>
              <select id="usrActive" class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm outline-none focus:border-purple-500">
                <option value="1">Ativo (Permitir login)</option>
                <option value="0">Inativo (Bloquear acesso)</option>
              </select>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
              <button type="button" id="cancelUserBtn" class="px-5 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-bold">Cancelar</button>
              <button type="submit" id="saveUserSubmitBtn" class="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30">Salvar Conta</button>
            </div>
          </form>

        </div>
      </div>
    `;

    document.getElementById('addUserBtn')?.addEventListener('click', () => this.openModal());
    document.getElementById('closeUserModalBtn')?.addEventListener('click', () => this.closeModal());
    document.getElementById('cancelUserBtn')?.addEventListener('click', () => this.closeModal());
    document.getElementById('userForm')?.addEventListener('submit', (e) => this.handleSubmit(e));

    await this.loadUsers();
  },

  async loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    const badge = document.getElementById('usersCountBadge');

    try {
      const res = await ApiClient.getUsers();
      this.usersList = res.data || [];

      if (badge) badge.textContent = `${this.usersList.length} Usuário(s)`;

      tbody.innerHTML = this.usersList.map(u => {
        const isSuper = u.role === 'superadmin';
        const roleBadge = isSuper
          ? `<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 w-max">
              <i class="ri-shield-star-line"></i> SuperAdmin
             </span>`
          : `<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1 w-max">
              <i class="ri-edit-2-line"></i> Editor
             </span>`;

        const isMe = window.AdminAuth.currentUser?.email === u.email;

        return `
          <tr class="hover:bg-white/[0.02] transition">
            <td class="px-6 py-4 flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl ${isSuper ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'} flex items-center justify-center font-bold text-sm shrink-0">
                <i class="${isSuper ? 'ri-user-star-line' : 'ri-user-line'}"></i>
              </div>
              <div>
                <p class="font-bold text-white text-sm">
                  ${escapeHtml(u.name)}
                  ${isMe ? '<span class="ml-1 text-[10px] text-emerald-400 font-bold">(Você)</span>' : ''}
                </p>
              </div>
            </td>
            <td class="px-6 py-4 font-mono text-xs text-slate-300">${escapeHtml(u.email)}</td>
            <td class="px-6 py-4">${roleBadge}</td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                Number(u.is_active) === 1 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
              }">
                ● ${Number(u.is_active) === 1 ? 'Ativo' : 'Desativado'}
              </span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <button onclick="AdminUsuarios.editUser('${u.id}')" class="p-2 rounded-lg bg-white/5 hover:bg-purple-600/30 text-purple-300 hover:text-white transition" title="Editar">
                <i class="ri-edit-line"></i>
              </button>
              ${!isMe ? `
                <button onclick="AdminUsuarios.deleteUser('${u.id}')" class="p-2 rounded-lg bg-white/5 hover:bg-rose-600/30 text-rose-300 hover:text-white transition" title="Excluir">
                  <i class="ri-delete-bin-line"></i>
                </button>
              ` : ''}
            </td>
          </tr>
        `;
      }).join('');
    } catch (e) {
      console.error('[AdminUsuarios] Erro ao carregar usuários:', e);
    }
  },

  openModal(user = null) {
    const modal = document.getElementById('userModal');
    const title = document.getElementById('userModalTitle');
    const form = document.getElementById('userForm');
    const pwdInput = document.getElementById('usrPassword');
    const pwdReq = document.getElementById('pwdRequiredTag');
    const pwdHint = document.getElementById('pwdHint');
    form.reset();

    if (user) {
      title.textContent = 'Editar Usuário';
      document.getElementById('usrId').value = user.id;
      document.getElementById('usrName').value = user.name || '';
      document.getElementById('usrEmail').value = user.email || '';
      document.getElementById('usrRole').value = user.role || 'user';
      document.getElementById('usrActive').value = Number(user.is_active) === 1 ? '1' : '0';
      pwdInput.required = false;
      pwdReq.textContent = '(Opcional)';
      pwdHint.classList.remove('hidden');
    } else {
      title.textContent = 'Cadastrar Novo Usuário';
      document.getElementById('usrId').value = '';
      pwdInput.required = true;
      pwdReq.textContent = '*';
      pwdHint.classList.add('hidden');
    }

    modal.classList.remove('hidden');
  },

  closeModal() {
    document.getElementById('userModal')?.classList.add('hidden');
  },

  editUser(id) {
    const u = this.usersList.find(x => String(x.id) === String(id));
    if (u) this.openModal(u);
  },

  async deleteUser(id) {
    if (!confirm('Deseja realmente remover este usuário do sistema?')) return;
    try {
      await ApiClient.deleteUser(id);
      window.AdminApp.showToast('Usuário excluído com sucesso!');
      await this.loadUsers();
    } catch (err) {
      alert('Erro ao excluir usuário: ' + err.message);
    }
  },

  async handleSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('usrId').value;
    const password = document.getElementById('usrPassword').value;

    const payload = {
      name: document.getElementById('usrName').value.trim(),
      email: document.getElementById('usrEmail').value.trim(),
      role: document.getElementById('usrRole').value,
      is_active: Number(document.getElementById('usrActive').value)
    };

    if (password) {
      payload.password = password;
    }

    try {
      await ApiClient.saveUser(payload, id || null);
      this.closeModal();
      window.AdminApp.showToast(id ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!');
      await this.loadUsers();
    } catch (err) {
      alert('Erro ao salvar usuário: ' + err.message);
    }
  }
};
