/**
 * MULT ENGENHARIA - API CLIENT
 * Handles requests to the local backend endpoints with automatic base URL detection
 */

const ApiClient = (() => {
  // Determine base path (e.g. '/' or '/site/' or '/mult/')
  const getBasePath = () => {
    const path = window.location.pathname;
    if (path.includes('/admin')) {
      return path.substring(0, path.indexOf('/admin'));
    }
    const lastSlash = path.lastIndexOf('/');
    return path.substring(0, lastSlash + 1);
  };

  const API_BASE = getBasePath().replace(/\/$/, '') + '/api';

  const getHeaders = (isJson = true) => {
    const headers = {};
    if (isJson) headers['Content-Type'] = 'application/json';
    const token = localStorage.getItem('mult_auth_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  };

  const request = async (endpoint, options = {}) => {
    const url = `${API_BASE}/${endpoint}`;
    try {
      const response = await fetch(url, options);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `Erro HTTP ${response.status}`);
      }
      return data;
    } catch (err) {
      console.warn(`[ApiClient] Request to ${endpoint} failed:`, err.message);
      throw err;
    }
  };

  return {
    // Public Endpoints
    getBanners: (all = false) => request(`banners.php${all ? '?all=1' : ''}`),
    getHero: () => request('hero.php'),
    getProjects: (featuredOnly = true) => request(`projetos.php${featuredOnly ? '?featured=1' : ''}`),
    getTeam: () => request('equipe.php'),
    sendContact: (payload) => request('contato.php', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(payload)
    }),

    // Admin Auth Endpoints
    login: (email, password) => request('auth.php?action=login', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ email, password })
    }),
    getMe: () => request('auth.php?action=me', {
      headers: getHeaders(false)
    }),
    updatePassword: (new_password) => request('auth.php?action=update_password', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ new_password })
    }),

    // Admin Content Endpoints
    saveBanner: (data, id = null) => request(id ? `banners.php?id=${id}` : 'banners.php', {
      method: id ? 'PUT' : 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    }),
    deleteBanner: (id) => request(`banners.php?id=${id}`, {
      method: 'DELETE',
      headers: getHeaders(false)
    }),
    toggleBannerStatus: (id) => request(`banners.php?id=${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ id, toggle_status: true })
    }),
    reorderBanner: (id, display_order) => request(`banners.php?id=${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ id, display_order })
    }),
    saveHero: (data) => request('hero.php', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    }),
    saveProject: (data, id = null) => request(id ? `projetos.php?id=${id}` : 'projetos.php', {
      method: id ? 'PUT' : 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    }),
    deleteProject: (id) => request(`projetos.php?id=${id}`, {
      method: 'DELETE',
      headers: getHeaders(false)
    }),
    saveTeamMember: (data, id = null) => request(id ? `equipe.php?id=${id}` : 'equipe.php', {
      method: id ? 'PUT' : 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    }),
    deleteTeamMember: (id) => request(`equipe.php?id=${id}`, {
      method: 'DELETE',
      headers: getHeaders(false)
    }),

    // Admin Users Endpoints (SuperAdmin only)
    getUsers: () => request('usuarios.php', { headers: getHeaders(false) }),
    saveUser: (data, id = null) => request(id ? `usuarios.php?id=${id}` : 'usuarios.php', {
      method: id ? 'PUT' : 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    }),
    deleteUser: (id) => request(`usuarios.php?id=${id}`, {
      method: 'DELETE',
      headers: getHeaders(false)
    }),

    // Admin Leads
    getLeads: () => request('contato.php', { headers: getHeaders(false) }),
    updateLeadStatus: (id, status) => request(`contato.php?id=${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ status })
    }),

    // Upload Handler (Supports Base64 or FormData)
    uploadImage: async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const res = await request('upload.php', {
              method: 'POST',
              headers: getHeaders(true),
              body: JSON.stringify({
                filename: file.name,
                base64: reader.result
              })
            });
            resolve(res);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  };
})();

if (typeof window !== 'undefined') {
  window.ApiClient = ApiClient;
}
