/**
 * MULT ENGENHARIA - ADMIN BANNERS HERO MODULE
 * Padrão Moraris & Kastelo: Até 3 Banners, Modo Híbrido e Dual-Upload (Desktop & Mobile)
 */

window.AdminBanners = {
  bannersList: [],
  desktopUploader: null,
  mobileUploader: null,

  async render(container) {
    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Top Action Bar -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.03] p-6 rounded-2xl border border-white/10">
          <div>
            <h3 class="text-xl font-extrabold text-white flex items-center gap-2">
              <i class="ri-slideshow-3-line text-purple-400"></i> Banners do Hero (Carrossel)
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Gerencie os banners principais da página inicial. Recomendamos manter até <strong>3 banners ativos</strong> com imagens panorâmicas para desktop e quadradas/verticais para smartphones.
            </p>
          </div>
          <button id="addBannerBtn" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-sm text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition">
            <i class="ri-add-circle-line text-lg"></i> Novo Banner
          </button>
        </div>

        <!-- Table / Cards List -->
        <div class="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div class="p-4 border-b border-white/10 flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Banners Cadastrados</span>
            <span id="bannersCountBadge" class="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30 font-bold">Carregando...</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-300">
              <thead class="bg-white/[0.02] text-[11px] uppercase tracking-wider font-extrabold text-purple-300 border-b border-white/10">
                <tr>
                  <th class="px-6 py-4">Banner & Imagens</th>
                  <th class="px-6 py-4">Conteúdo / Título</th>
                  <th class="px-6 py-4">Modo</th>
                  <th class="px-6 py-4">Ordem</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody id="bannersTableBody" class="divide-y divide-white/5">
                <tr>
                  <td colspan="6" class="px-6 py-8 text-center text-slate-500">
                    <i class="ri-loader-4-line animate-spin text-2xl text-purple-400 block mb-2"></i>
                    Carregando banners...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Banner Modal (Create / Edit) -->
      <div id="bannerModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <div class="bg-[#12052c] border border-white/15 rounded-3xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 id="bannerModalTitle" class="text-lg font-extrabold text-white">Adicionar Banner</h4>
            <button id="closeBannerModalBtn" class="text-slate-400 hover:text-white p-2 text-xl">
              <i class="ri-close-line"></i>
            </button>
          </div>

          <form id="bannerForm" class="space-y-5">
            <input type="hidden" id="bannerId" />

            <!-- Modo Híbrido Toggle -->
            <div class="bg-purple-950/40 p-4 rounded-2xl border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span class="block text-sm font-bold text-white">Modo de Exibição</span>
                <span class="text-xs text-purple-300/80">Escolha entre imagem com textos sobrepostos ou criativo com arte completa.</span>
              </div>
              <div class="flex items-center gap-3">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="bannerShowTextOverlay" class="sr-only peer" checked />
                  <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
                <span id="bannerOverlayLabel" class="text-xs font-extrabold text-purple-200">Overlay de Textos Dinâmico</span>
              </div>
            </div>

            <!-- Campos de Texto Dinâmico (Exibidos apenas no modo Overlay) -->
            <div id="bannerTextFieldsWrap" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="sm:col-span-2">
                  <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Eyebrow / Badge Superior</label>
                  <input type="text" id="bannerEyebrow" placeholder="Ex: ENGENHARIA • CIÊNCIA • INOVAÇÃO" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Cor do Texto</label>
                  <input type="text" id="bannerTextColor" value="#FFFFFF" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Título Principal *</label>
                <input type="text" id="bannerTitle" placeholder="Ex: Soluções técnicas para um futuro mais saudável." class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Subtítulo Descritivo</label>
                <textarea id="bannerSubtitle" rows="2" placeholder="Breve parágrafo explicativo da frente técnica..." class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500"></textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Texto do Botão (CTA)</label>
                  <input type="text" id="bannerBtnText" value="FALE SOBRE SEU PROJETO" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Link de Destino</label>
                  <input type="text" id="bannerBtnLink" value="#contato" placeholder="Ex: #contato, #solucoes ou https://wa.me/..." class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
                </div>
              </div>
            </div>

            <!-- Aviso do Modo Criativo Puro (Exibido quando show_text_overlay = false) -->
            <div id="bannerPureCreativeNotice" class="hidden p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
              <i class="ri-information-line text-sm"></i>
              <strong>Modo Arte Completa:</strong> A imagem será exibida em sangria total sem textos por cima. Se preencher o link abaixo, todo o banner será clicável.
              <div class="mt-3">
                <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Link de Redirecionamento (Opcional)</label>
                <input type="text" id="bannerPureLink" placeholder="Ex: #contato ou link externo" class="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500" />
              </div>
            </div>

            <!-- Dual Image Uploaders (Desktop + Mobile) -->
            <div class="pt-4 border-t border-white/10 space-y-4">
              <label class="block text-xs font-bold uppercase text-purple-300">
                Imagens Responsivas do Banner (Desktop & Mobile) *
              </label>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <!-- Desktop Box (1920x580) -->
                <div class="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-white flex items-center gap-1.5">
                      <i class="ri-computer-line text-purple-400"></i> Versão Desktop *
                    </span>
                    <span class="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">1920 × 580 px</span>
                  </div>

                  <div class="h-32 bg-black/40 rounded-xl overflow-hidden flex items-center justify-center border border-white/5 relative">
                    <img id="bannerImagePreview" src="" alt="Preview Desktop" class="w-full h-full object-cover hidden" />
                    <span id="bannerImagePlaceholder" class="text-xs text-slate-500 flex flex-col items-center gap-1">
                      <i class="ri-image-line text-2xl"></i> Sem imagem
                    </span>
                  </div>

                  <span id="bannerImageBadge" class="hidden"></span>

                  <input type="file" id="bannerImageFileInput" accept="image/*" class="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer" />
                  <input type="text" id="bannerImageUrl" placeholder="assets/img/... ou URL externa" class="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500" />
                </div>

                <!-- Mobile Box (1080x1350) -->
                <div class="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-white flex items-center gap-1.5">
                      <i class="ri-smartphone-line text-purple-400"></i> Versão Mobile
                    </span>
                    <span class="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">1080 × 1350 px (4:5)</span>
                  </div>

                  <div class="h-32 bg-black/40 rounded-xl overflow-hidden flex items-center justify-center border border-white/5 relative">
                    <img id="bannerMobilePreview" src="" alt="Preview Mobile" class="w-full h-full object-cover hidden" />
                    <span id="bannerMobilePlaceholder" class="text-xs text-slate-500 flex flex-col items-center gap-1">
                      <i class="ri-image-line text-2xl"></i> Fallback Desktop
                    </span>
                  </div>

                  <span id="bannerMobileBadge" class="hidden"></span>

                  <input type="file" id="bannerMobileFileInput" accept="image/*" class="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-600 file:text-white hover:file:bg-amber-500 cursor-pointer" />
                  <input type="text" id="bannerMobileUrl" placeholder="Opcional: URL Mobile" class="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500" />
                </div>

              </div>
            </div>

            <!-- Ordem e Ativo -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
              <div>
                <label class="block text-xs font-bold uppercase text-purple-300 mb-1">Ordem de Exibição (1 a 99)</label>
                <input type="number" id="bannerOrder" value="0" min="0" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" />
              </div>
              <div class="flex items-center sm:pt-6 gap-3">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="bannerIsActive" class="sr-only peer" checked />
                  <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
                <span class="text-xs font-bold text-white">Banner Ativo no Site</span>
              </div>
            </div>

            <!-- Modal Action Buttons -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button type="button" id="cancelBannerBtn" class="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition">
                Cancelar
              </button>
              <button type="submit" id="saveBannerSubmitBtn" class="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition">
                <i class="ri-save-line text-sm"></i> Salvar Banner
              </button>
            </div>

          </form>

        </div>
      </div>
    `;

    // Inicializar Uploaders Inteligentes
    this.desktopUploader = window.AdminApp.setupImageUploader({
      previewImgId: 'bannerImagePreview',
      fileInputId: 'bannerImageFileInput',
      urlInputId: 'bannerImageUrl',
      statusBadgeId: 'bannerImageBadge',
      specs: {
        type: 'hero-desktop',
        aspectRatio: '16:9',
        maxWeightMB: 5
      }
    });

    this.mobileUploader = window.AdminApp.setupImageUploader({
      previewImgId: 'bannerMobilePreview',
      fileInputId: 'bannerMobileFileInput',
      urlInputId: 'bannerMobileUrl',
      statusBadgeId: 'bannerMobileBadge',
      specs: {
        type: 'hero-mobile',
        aspectRatio: '4:5',
        maxWeightMB: 5
      }
    });

    this.bindEvents();
    await this.loadBanners();
  },

  bindEvents() {
    // Abrir Modal de Novo Banner
    document.getElementById('addBannerBtn')?.addEventListener('click', () => {
      this.openModal();
    });

    // Fechar Modal
    document.getElementById('closeBannerModalBtn')?.addEventListener('click', () => this.closeModal());
    document.getElementById('cancelBannerBtn')?.addEventListener('click', () => this.closeModal());

    // Toggle Modo Híbrido
    const toggleOverlay = document.getElementById('bannerShowTextOverlay');
    const overlayLabel = document.getElementById('bannerOverlayLabel');
    const textFields = document.getElementById('bannerTextFieldsWrap');
    const pureNotice = document.getElementById('bannerPureCreativeNotice');

    toggleOverlay?.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      if (isChecked) {
        overlayLabel.textContent = 'Overlay de Textos Dinâmico';
        textFields.classList.remove('hidden');
        pureNotice.classList.add('hidden');
      } else {
        overlayLabel.textContent = 'Arte Gráfica Completa (Full-Bleed)';
        textFields.classList.add('hidden');
        pureNotice.classList.remove('hidden');
      }
    });

    // Form Submit
    document.getElementById('bannerForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveBanner();
    });
  },

  async loadBanners() {
    const tbody = document.getElementById('bannersTableBody');
    const badge = document.getElementById('bannersCountBadge');
    if (!tbody) return;

    try {
      const res = await ApiClient.getBanners(true); // all=1
      this.bannersList = res.data || [];

      if (badge) {
        badge.textContent = `${this.bannersList.length} cadastrado(s)`;
      }

      if (this.bannersList.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="px-6 py-8 text-center text-slate-500">
              Nenhum banner cadastrado no momento. Clique em "Novo Banner" para começar.
            </td>
          </tr>
        `;
        return;
      }

      const resolveImg = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('/')) return url;
        return '../' + url;
      };

      tbody.innerHTML = this.bannersList.map(b => {
        const desktopImg = b.image_url ? resolveImg(b.image_url) : '';
        const mobileImg = b.image_mobile_url ? resolveImg(b.image_mobile_url) : desktopImg;
        const isOverlay = b.show_text_overlay == 1;

        return `
          <tr class="hover:bg-white/[0.02] transition">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-20 h-11 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                  <img src="${desktopImg}" alt="${escapeHtml(b.title || 'Desktop')}" class="w-full h-full object-cover" />
                </div>
                <div>
                  <span class="text-xs font-bold text-white block">Desktop: ${b.image_url ? '✓ Carregado' : 'Pendente'}</span>
                  <span class="text-[10px] text-purple-300 block font-mono">
                    Mobile: ${b.image_mobile_url ? '✓ Personalizado' : 'Fallback Desktop'}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="max-w-xs">
                ${b.eyebrow ? `<span class="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">${escapeHtml(b.eyebrow)}</span>` : ''}
                <strong class="text-white text-xs block truncate">${escapeHtml(b.title || 'Sem título')}</strong>
                <p class="text-[11px] text-slate-400 truncate">${escapeHtml(b.subtitle || '')}</p>
              </div>
            </td>
            <td class="px-6 py-4">
              ${isOverlay 
                ? '<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">Overlay Texto</span>' 
                : '<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Arte Completa</span>'}
            </td>
            <td class="px-6 py-4 font-mono text-xs font-bold text-slate-300">
              ${b.display_order || 0}
            </td>
            <td class="px-6 py-4">
              <button onclick="window.AdminBanners.toggleStatus('${b.id}')" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
                Number(b.is_active) === 1 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30' 
                  : 'bg-slate-700 text-slate-400 border border-slate-600 hover:bg-slate-600'
              }">
                <span class="w-1.5 h-1.5 rounded-full ${Number(b.is_active) === 1 ? 'bg-emerald-400' : 'bg-slate-400'}"></span>
                <span>${Number(b.is_active) === 1 ? 'Ativo' : 'Pausado'}</span>
              </button>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <button onclick="window.AdminBanners.editBanner('${b.id}')" class="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white transition" title="Editar Banner">
                <i class="ri-edit-line"></i>
              </button>
              <button onclick="window.AdminBanners.deleteBanner('${b.id}')" class="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition" title="Excluir Banner">
                <i class="ri-delete-bin-line"></i>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    } catch (err) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-rose-400 text-xs">
            Erro ao carregar banners: ${escapeHtml(err.message)}
          </td>
        </tr>
      `;
    }
  },

  openModal(banner = null) {
    const modal = document.getElementById('bannerModal');
    const modalTitle = document.getElementById('bannerModalTitle');
    const toggleOverlay = document.getElementById('bannerShowTextOverlay');
    const textFields = document.getElementById('bannerTextFieldsWrap');
    const pureNotice = document.getElementById('bannerPureCreativeNotice');
    const overlayLabel = document.getElementById('bannerOverlayLabel');

    if (!modal) return;

    if (banner) {
      modalTitle.textContent = `Editar Banner #${banner.id}`;
      document.getElementById('bannerId').value = banner.id;
      document.getElementById('bannerTitle').value = banner.title || '';
      document.getElementById('bannerSubtitle').value = banner.subtitle || '';
      document.getElementById('bannerEyebrow').value = banner.eyebrow || '';
      document.getElementById('bannerBtnText').value = banner.button_text || 'FALE SOBRE SEU PROJETO';
      document.getElementById('bannerBtnLink').value = banner.button_link || '#contato';
      document.getElementById('bannerPureLink').value = banner.button_link || '';
      document.getElementById('bannerImageUrl').value = banner.image_url || '';
      document.getElementById('bannerMobileUrl').value = banner.image_mobile_url || '';
      document.getElementById('bannerTextColor').value = banner.text_color || '#FFFFFF';
      document.getElementById('bannerOrder').value = banner.display_order || 0;
      document.getElementById('bannerIsActive').checked = banner.is_active == 1;

      const isOverlay = banner.show_text_overlay == 1;
      toggleOverlay.checked = isOverlay;
      if (isOverlay) {
        overlayLabel.textContent = 'Overlay de Textos Dinâmico';
        textFields.classList.remove('hidden');
        pureNotice.classList.add('hidden');
      } else {
        overlayLabel.textContent = 'Arte Gráfica Completa (Full-Bleed)';
        textFields.classList.add('hidden');
        pureNotice.classList.remove('hidden');
      }

      this.desktopUploader?.setInitialUrl(banner.image_url || '');
      this.mobileUploader?.setInitialUrl(banner.image_mobile_url || '');
    } else {
      modalTitle.textContent = 'Novo Banner para o Hero';
      document.getElementById('bannerId').value = '';
      document.getElementById('bannerTitle').value = '';
      document.getElementById('bannerSubtitle').value = '';
      document.getElementById('bannerEyebrow').value = '';
      document.getElementById('bannerBtnText').value = 'FALE SOBRE SEU PROJETO';
      document.getElementById('bannerBtnLink').value = '#contato';
      document.getElementById('bannerPureLink').value = '#contato';
      document.getElementById('bannerImageUrl').value = '';
      document.getElementById('bannerMobileUrl').value = '';
      document.getElementById('bannerTextColor').value = '#FFFFFF';
      document.getElementById('bannerOrder').value = (this.bannersList.length + 1);
      document.getElementById('bannerIsActive').checked = true;

      toggleOverlay.checked = true;
      overlayLabel.textContent = 'Overlay de Textos Dinâmico';
      textFields.classList.remove('hidden');
      pureNotice.classList.add('hidden');

      this.desktopUploader?.setInitialUrl('');
      this.mobileUploader?.setInitialUrl('');
    }

    modal.classList.remove('hidden');
  },

  closeModal() {
    const modal = document.getElementById('bannerModal');
    modal?.classList.add('hidden');
  },

  editBanner(id) {
    const banner = this.bannersList.find(b => String(b.id) === String(id));
    if (banner) {
      this.openModal(banner);
    }
  },

  async saveBanner() {
    const btn = document.getElementById('saveBannerSubmitBtn');
    const bannerId = document.getElementById('bannerId').value;
    const isOverlay = document.getElementById('bannerShowTextOverlay').checked;

    const desktopUrl = document.getElementById('bannerImageUrl').value.trim();
    const mobileUrl = document.getElementById('bannerMobileUrl').value.trim();

    if (!desktopUrl) {
      alert('A imagem do banner para Desktop é obrigatória.');
      return;
    }

    const payload = {
      title: document.getElementById('bannerTitle').value.trim(),
      subtitle: document.getElementById('bannerSubtitle').value.trim(),
      eyebrow: document.getElementById('bannerEyebrow').value.trim(),
      button_text: document.getElementById('bannerBtnText').value.trim() || 'FALE SOBRE SEU PROJETO',
      button_link: isOverlay 
        ? (document.getElementById('bannerBtnLink').value.trim() || '#contato')
        : (document.getElementById('bannerPureLink').value.trim() || ''),
      image_url: desktopUrl,
      image_mobile_url: mobileUrl,
      show_text_overlay: isOverlay ? 1 : 0,
      text_color: document.getElementById('bannerTextColor').value.trim() || '#FFFFFF',
      display_order: parseInt(document.getElementById('bannerOrder').value, 10) || 0,
      is_active: document.getElementById('bannerIsActive').checked ? 1 : 0
    };

    if (bannerId) {
      payload.id = bannerId;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Salvando...';

    try {
      await ApiClient.saveBanner(payload, bannerId || null);
      window.AdminApp.showToast(bannerId ? 'Banner atualizado com sucesso!' : 'Banner cadastrado com sucesso!');
      this.closeModal();
      await this.loadBanners();
    } catch (err) {
      alert('Erro ao salvar banner: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="ri-save-line text-sm"></i> Salvar Banner';
    }
  },

  async toggleStatus(id) {
    try {
      await ApiClient.toggleBannerStatus(id);
      window.AdminApp.showToast('Status do banner atualizado!');
      await this.loadBanners();
    } catch (err) {
      alert('Erro ao alterar status: ' + err.message);
    }
  },

  async deleteBanner(id) {
    if (!confirm('Deseja realmente excluir este banner do carrossel?')) return;

    try {
      await ApiClient.deleteBanner(id);
      window.AdminApp.showToast('Banner excluído com sucesso!');
      await this.loadBanners();
    } catch (err) {
      alert('Erro ao excluir: ' + err.message);
    }
  }
};
