/**
 * MULT ENGENHARIA - ADMIN AUTHENTICATION CONTROLLER
 */

window.AdminAuth = {
  currentUser: null,

  async checkAuth() {
    const token = localStorage.getItem('mult_auth_token');
    if (!token) {
      this.redirectToLogin();
      return false;
    }

    try {
      const res = await ApiClient.getMe();
      if (!res || !res.authenticated || !res.user) {
        throw new Error('Sessão expirada');
      }

      this.currentUser = res.user;
      this.updateUserUI(res.user);
      return true;
    } catch (err) {
      console.warn('[AdminAuth] Falha na verificação de sessão:', err.message);
      this.redirectToLogin();
      return false;
    }
  },

  updateUserUI(user) {
    const nameEl = document.getElementById('userNameDisplay');
    const roleEl = document.getElementById('userRoleBadge');
    const superadminMenu = document.getElementById('superadminMenuSection');

    if (nameEl) nameEl.textContent = user.name || user.email;

    if (roleEl) {
      if (user.role === 'superadmin') {
        roleEl.textContent = 'SuperAdmin';
        roleEl.className = 'text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block';
      } else {
        roleEl.textContent = 'Editor';
        roleEl.className = 'text-[10px] font-semibold text-purple-300 uppercase tracking-wider block';
      }
    }

    // Hide or show SuperAdmin exclusive module
    if (superadminMenu) {
      if (user.role === 'superadmin') {
        superadminMenu.classList.remove('hidden');
      } else {
        superadminMenu.classList.add('hidden');
      }
    }
  },

  logout() {
    localStorage.removeItem('mult_auth_token');
    localStorage.removeItem('mult_user');
    this.redirectToLogin();
  },

  redirectToLogin() {
    window.location.href = 'login.html';
  }
};
