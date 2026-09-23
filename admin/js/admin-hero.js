/**
 * MULT ENGENHARIA - ADMIN HERO EDITOR MODULE
 */

window.AdminHero = {
  async render(container) {
    container.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.03] p-6 rounded-2xl border border-white/10">
          <div>
            <h3 class="text-xl font-extrabold text-white flex items-center gap-2">
              <i class="ri-layout-top-line text-purple-400"></i> Edição da Seção Hero
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Atualize os títulos principais, chamadas de ação, foto de destaque e os badges dos 4 pilares.
            </p>
          </div>
          <button id="saveHeroBtn" class="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-sm text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition">
            <i class="ri-save-line text-lg"></i> Salvar Alterações
          </button>
        </div>

        <div id="heroAlert" class="hidden p-4 rounded-xl text-xs font-semibold"></div>

        <!-- Form Card -->
        <div class="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          
          <!-- Eyebrow & Main Title -->
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Tagline Superior (Eyebrow)
              </label>
              <input type="text" id="editHeroEyebrow" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 text-white text-sm outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Título Principal (H1) *
              </label>
              <input type="text" id="editHeroTitle" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 text-white text-base font-bold outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Subtítulo / Descrição da Mult
              </label>
              <textarea id="editHeroSubtitle" rows="3" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 text-white text-sm outline-none"></textarea>
            </div>
          </div>

          <!-- CTAs -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Texto do Botão Primário
              </label>
              <input type="text" id="editHeroButtonText" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 text-white text-sm outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Link do Botão Primário
              </label>
              <input type="text" id="editHeroButtonLink" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 text-white text-sm outline-none" />
            </div>
          </div>

          <!-- Visual Showcase & Dual Image Upload (Comparação Visual) -->
          <div class="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                  Fotos de Destaque do Hero (Comparação Visual Multi-Dispositivo)
                </label>
                <p class="text-xs text-slate-400 mt-0.5">
                  Gerencie versões específicas para garantir enquadramento impecável no desktop e no celular.
                </p>
              </div>
              <span class="text-[11px] font-bold text-purple-400 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30 shrink-0">
                <i class="ri-aspect-ratio-line mr-1"></i> Multi-Device Sync
              </span>
            </div>

            <!-- Grid Duplo Lado a Lado -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- SLOT 1: DESKTOP (Widescreen 16:9) -->
              <div class="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3.5 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="text-xs font-bold text-purple-200 flex items-center gap-1.5">
                      <i class="ri-computer-line text-purple-400"></i> Versão Desktop (Principal)
                    </span>
                    <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      16:9 Panorâmica
                    </span>
                  </div>

                  <!-- Miniatura 16:9 -->
                  <div class="relative w-full h-44 rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center shadow-inner group">
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-slate-500 text-xs text-center p-2 pointer-events-none">
                      <i class="ri-image-2-line text-3xl text-purple-400/40 mb-1"></i>
                      <span>Sem imagem desktop</span>
                    </div>
                    <img id="heroImagePreview" src="" alt="Preview Hero Desktop" class="relative z-10 w-full h-full object-cover transition duration-300 group-hover:scale-105 opacity-0" />
                  </div>
                  
                  <div id="heroImageBadge" class="hidden mt-2"></div>
                </div>

                <div class="space-y-2 pt-2 border-t border-white/5">
                  <input type="file" id="heroImageFileInput" accept="image/*" class="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer" />
                  <input type="text" id="editHeroImageUrl" placeholder="URL Desktop (ex: assets/img/hero-founder-clean.png)" class="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500" />
                  <p class="text-[11px] text-slate-400">
                    <i class="ri-information-line text-purple-400"></i> Ideal: <code>1920x1080px</code> (PNG, JPG ou WebP).
                  </p>
                </div>
              </div>

              <!-- SLOT 2: MOBILE (Vertical 4:5 ou 1:1) -->
              <div class="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3.5 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="text-xs font-bold text-purple-200 flex items-center gap-1.5">
                      <i class="ri-smartphone-line text-purple-400"></i> Versão Mobile (Smartphone)
                    </span>
                    <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      4:5 ou 1:1 Vertical
                    </span>
                  </div>

                  <!-- Miniatura 4:5 / Smartphone -->
                  <div class="relative w-full h-44 rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center shadow-inner group">
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-slate-500 text-xs text-center p-2 pointer-events-none">
                      <i class="ri-smartphone-line text-3xl text-amber-400/40 mb-1"></i>
                      <span>Sem imagem mobile (usa fallback)</span>
                    </div>
                    <img id="heroImageMobilePreview" src="" alt="Preview Hero Mobile" class="relative z-10 w-full h-full object-contain transition duration-300 group-hover:scale-105 opacity-0" />
                  </div>
                  
                  <div id="heroImageMobileBadge" class="hidden mt-2"></div>
                </div>

                <div class="space-y-2 pt-2 border-t border-white/5">
                  <input type="file" id="heroImageMobileFileInput" accept="image/*" class="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-600 file:text-white hover:file:bg-amber-500 cursor-pointer" />
                  <input type="text" id="editHeroImageMobileUrl" placeholder="URL Mobile (opcional: assets/img/hero-mobile.png)" class="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500" />
                  <p class="text-[11px] text-slate-400">
                    <i class="ri-shield-check-line text-emerald-400"></i> Opcional: Se vazia, o site utiliza a imagem Desktop como fallback.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <!-- Signature & Script Accent -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Texto em Destaque (Script)
              </label>
              <input type="text" id="editHeroScriptAccent" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 text-white text-sm outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Nome da Fundadora/Autora
              </label>
              <input type="text" id="editHeroAuthorName" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 text-white text-sm outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Cargo / Assinatura
              </label>
              <input type="text" id="editHeroAuthorRole" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 text-white text-sm outline-none" />
            </div>
          </div>

          <!-- Pillars Badges (4) -->
          <div class="pt-4 border-t border-white/10 space-y-3">
            <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
              Pilares Centrais (Faixa do Hero)
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] text-slate-400 mb-1">Pilar 1 (Inovação)</label>
                <input type="text" id="editHeroBadge1" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none" />
              </div>
              <div>
                <label class="block text-[11px] text-slate-400 mb-1">Pilar 2 (Segurança)</label>
                <input type="text" id="editHeroBadge2" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none" />
              </div>
              <div>
                <label class="block text-[11px] text-slate-400 mb-1">Pilar 3 (Meio Ambiente)</label>
                <input type="text" id="editHeroBadge3" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none" />
              </div>
              <div>
                <label class="block text-[11px] text-slate-400 mb-1">Pilar 4 (Social)</label>
                <input type="text" id="editHeroBadge4" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none" />
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    // Setup Dual Smart Image Uploaders (Desktop & Mobile)
    this.desktopUploader = window.AdminApp.setupImageUploader({
      previewImgId: 'heroImagePreview',
      fileInputId: 'heroImageFileInput',
      urlInputId: 'editHeroImageUrl',
      statusBadgeId: 'heroImageBadge',
      specs: {
        type: 'hero-desktop',
        aspectRatio: '16:9',
        maxWeightMB: 5
      }
    });

    this.mobileUploader = window.AdminApp.setupImageUploader({
      previewImgId: 'heroImageMobilePreview',
      fileInputId: 'heroImageMobileFileInput',
      urlInputId: 'editHeroImageMobileUrl',
      statusBadgeId: 'heroImageMobileBadge',
      specs: {
        type: 'hero-mobile',
        aspectRatio: '4:5',
        maxWeightMB: 5
      }
    });

    // Load initial values
    await this.loadHeroData();

    // Save button
    document.getElementById('saveHeroBtn')?.addEventListener('click', () => this.saveHero());
  },

  async loadHeroData() {
    try {
      const res = await ApiClient.getHero();
      const h = res.data || {};

      document.getElementById('editHeroEyebrow').value = h.eyebrow || '';
      document.getElementById('editHeroTitle').value = h.title || '';
      document.getElementById('editHeroSubtitle').value = h.subtitle || '';
      document.getElementById('editHeroButtonText').value = h.button_text || '';
      document.getElementById('editHeroButtonLink').value = h.button_link || '';
      document.getElementById('editHeroImageUrl').value = h.image_url || '';
      document.getElementById('editHeroImageMobileUrl').value = h.image_mobile_url || '';
      document.getElementById('editHeroScriptAccent').value = h.script_accent || '';
      document.getElementById('editHeroAuthorName').value = h.author_name || '';
      document.getElementById('editHeroAuthorRole').value = h.author_role || '';
      document.getElementById('editHeroBadge1').value = h.badge_1_text || '';
      document.getElementById('editHeroBadge2').value = h.badge_2_text || '';
      document.getElementById('editHeroBadge3').value = h.badge_3_text || '';
      document.getElementById('editHeroBadge4').value = h.badge_4_text || '';

      this.desktopUploader?.setInitialUrl(h.image_url || '');
      this.mobileUploader?.setInitialUrl(h.image_mobile_url || '');
    } catch (e) {
      console.error('[AdminHero] Erro ao carregar dados:', e);
    }
  },

  async saveHero() {
    const btn = document.getElementById('saveHeroBtn');
    const alertBox = document.getElementById('heroAlert');

    const payload = {
      eyebrow: document.getElementById('editHeroEyebrow').value.trim(),
      title: document.getElementById('editHeroTitle').value.trim(),
      subtitle: document.getElementById('editHeroSubtitle').value.trim(),
      button_text: document.getElementById('editHeroButtonText').value.trim(),
      button_link: document.getElementById('editHeroButtonLink').value.trim(),
      image_url: document.getElementById('editHeroImageUrl').value.trim(),
      image_mobile_url: document.getElementById('editHeroImageMobileUrl').value.trim(),
      script_accent: document.getElementById('editHeroScriptAccent').value.trim(),
      author_name: document.getElementById('editHeroAuthorName').value.trim(),
      author_role: document.getElementById('editHeroAuthorRole').value.trim(),
      badge_1_text: document.getElementById('editHeroBadge1').value.trim(),
      badge_2_text: document.getElementById('editHeroBadge2').value.trim(),
      badge_3_text: document.getElementById('editHeroBadge3').value.trim(),
      badge_4_text: document.getElementById('editHeroBadge4').value.trim()
    };

    if (!payload.title) {
      alert('O título do Hero é obrigatório.');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Salvando...';

    try {
      await ApiClient.saveHero(payload);
      window.AdminApp.showToast('Seção Hero atualizada com sucesso!');
    } catch (err) {
      alert('Erro ao salvar: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="ri-save-line text-lg"></i> Salvar Alterações';
    }
  }
};
