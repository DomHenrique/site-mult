/**
 * MULT ENGENHARIA - MAIN SITE CONTROLLER
 * Loads dynamic content from local SQLite API and manages interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroCarousel();
  initDynamicProjects();
  initDynamicTeam();
  initContactForm();
  initDiagnosticoNavigation();
});

// 1. Mobile Menu and Scroll Spy
function initNavbar() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link-item');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Header background on scroll
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
      header.classList.remove('bg-white');
    } else {
      header.classList.add('bg-white');
      header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
    }
  });
}

// 2. Dynamic Hero Carousel (Padrão Moraris & Kastelo - Modo Híbrido)
async function initHeroCarousel() {
  const carouselEl = document.getElementById('heroCarousel');
  const slidesWrapper = document.getElementById('heroSlidesWrapper');
  const indicatorsEl = document.getElementById('heroIndicators');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');

  if (!carouselEl || !slidesWrapper) return;

  // Carregar dados de badges dos pilares (se cadastrados)
  try {
    const resHero = await ApiClient.getHero();
    if (resHero && resHero.data) {
      const h = resHero.data;
      const b1 = document.getElementById('heroBadge1');
      const b2 = document.getElementById('heroBadge2');
      const b3 = document.getElementById('heroBadge3');
      const b4 = document.getElementById('heroBadge4');
      if (b1 && h.badge_1_text) b1.textContent = h.badge_1_text;
      if (b2 && h.badge_2_text) b2.textContent = h.badge_2_text;
      if (b3 && h.badge_3_text) b3.textContent = h.badge_3_text;
      if (b4 && h.badge_4_text) b4.textContent = h.badge_4_text;
    }
  } catch (e) {
    // Graceful fallback
  }

  // Carregar banners dinâmicos da API
  try {
    const res = await ApiClient.getBanners();
    if (res && res.data && res.data.length > 0) {
      const banners = res.data;

      // Renderizar slides
      slidesWrapper.innerHTML = banners.map((b, i) => {
        const desktopUrl = b.image_url || '';
        const mobileUrl = b.image_mobile_url || desktopUrl;
        const isActive = i === 0;
        const showOverlay = b.show_text_overlay == 1;

        if (showOverlay) {
          return `
            <div class="hero-slide ${isActive ? 'active' : ''}" data-slide-index="${i}">
              <picture>
                ${mobileUrl ? `<source media="(max-width: 768px)" srcset="${escapeHtml(mobileUrl)}" />` : ''}
                <img src="${escapeHtml(desktopUrl)}" alt="${escapeHtml(b.title || 'Banner Mult')}" ${isActive ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} />
              </picture>
              <div class="hero-overlay" aria-hidden="true"></div>
              <div class="hero-content">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div class="hero-text text-left" style="color: ${escapeHtml(b.text_color || '#FFFFFF')};">
                    ${b.eyebrow ? `
                      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-purple-200 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-4">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>${escapeHtml(b.eyebrow)}</span>
                      </div>
                    ` : ''}
                    ${b.title ? `
                      <h${i === 0 ? '1' : '2'} class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
                        ${escapeHtml(b.title)}
                      </h${i === 0 ? '1' : '2'}>
                    ` : ''}
                    ${b.subtitle ? `
                      <p class="text-base sm:text-lg text-purple-100/90 leading-relaxed mb-6 max-w-2xl">
                        ${escapeHtml(b.subtitle)}
                      </p>
                    ` : ''}
                    ${b.button_text && b.button_link ? `
                      <div class="flex items-center gap-4 pt-1">
                        <a href="${escapeHtml(b.button_link)}" class="btn-mult-primary text-base px-7 py-3.5 shadow-xl bg-purple-600 hover:bg-purple-500 text-white">
                          <span>${escapeHtml(b.button_text)}</span>
                          <i class="ri-arrow-right-line"></i>
                        </a>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>
          `;
        } else {
          // Modo Criativo Puro (Full Bleed com link direto)
          return `
            <div class="hero-slide ${isActive ? 'active' : ''}" data-slide-index="${i}">
              ${b.button_link ? `<a href="${escapeHtml(b.button_link)}" class="hero-slide-link" aria-label="${escapeHtml(b.title || 'Banner')}">` : ''}
                <picture>
                  ${mobileUrl ? `<source media="(max-width: 768px)" srcset="${escapeHtml(mobileUrl)}" />` : ''}
                  <img src="${escapeHtml(desktopUrl)}" alt="${escapeHtml(b.title || 'Banner Mult')}" ${isActive ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} />
                </picture>
              ${b.button_link ? `</a>` : ''}
            </div>
          `;
        }
      }).join('');

      // Renderizar indicadores
      if (indicatorsEl) {
        indicatorsEl.innerHTML = banners.map((_, i) => `
          <button type="button" class="hero-dot ${i === 0 ? 'active' : ''}" data-slide-to="${i}" aria-label="Slide ${i + 1}"></button>
        `).join('');
      }
    }
  } catch (e) {
    console.log('[Site] Usando banners estáticos pré-renderizados do Hero.');
  }

  // Motor de animação e transições do carrossel
  const slides = slidesWrapper.querySelectorAll('.hero-slide');
  const dots = indicatorsEl ? indicatorsEl.querySelectorAll('.hero-dot') : [];
  const totalSlides = slides.length;
  if (totalSlides <= 1) {
    if (indicatorsEl) indicatorsEl.style.display = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 5500;

  function goToSlide(newIndex) {
    if (newIndex === currentIndex) return;
    slides[currentIndex].classList.remove('active');
    if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

    currentIndex = (newIndex + totalSlides) % totalSlides;

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Controles
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (indicatorsEl) {
    indicatorsEl.addEventListener('click', (e) => {
      const dot = e.target.closest('.hero-dot');
      if (dot && dot.dataset.slideTo !== undefined) {
        goToSlide(Number(dot.dataset.slideTo));
        startAutoplay();
      }
    });
  }

  // Pausa no Hover
  carouselEl.addEventListener('mouseenter', stopAutoplay);
  carouselEl.addEventListener('mouseleave', startAutoplay);

  // Gestos de toque (Touch Swipe) para Mobile
  let touchStartX = 0;
  let touchStartY = 0;

  carouselEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    stopAutoplay();
  }, { passive: true });

  carouselEl.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoplay();
  }, { passive: true });

  // Iniciar autoplay
  startAutoplay();
}

// 3. Dynamic Projects in Highlight (Carrossel Horizontal com Loop Infinito e Dots Abaixo)
async function initDynamicProjects() {
  const track = document.getElementById('projectsTrack');
  const carouselEl = document.getElementById('projectsCarousel');
  const controlsEl = document.getElementById('projectsControls');
  const prevBtn = document.getElementById('projectsPrevBtn');
  const nextBtn = document.getElementById('projectsNextBtn');
  const dotsContainer = document.getElementById('projectsDots');

  if (!track) return;

  const fallbackProject = {
    title: 'Conheça uma nova categoria de alimento funcional',
    category: 'Alimentos & Biotecnologia',
    description: 'A Mult atua no desenvolvimento de alimentos inovadores, unindo ciência rigorosa, saúde preventiva e sustentabilidade de processos.',
    image_url: 'assets/img/engenharia-de-alimentos.jpeg',
    tag_1_title: 'DESENVOLVIMENTO',
    tag_1_desc: 'Alimentos inovadores com sólida base científica e validação técnica.',
    tag_2_title: 'SAÚDE PREVENTIVA',
    tag_2_desc: 'Mais qualidade de vida, bem-estar e nutrição equilibrada para as pessoas.',
    tag_3_title: 'SUSTENTABILIDADE',
    tag_3_desc: 'Ingredientes conscientes e processos que respeitam os recursos do planeta.',
    action_button_text: 'FALE SOBRE SEU PROJETO',
    action_button_link: '#contato'
  };

  const renderProjectSlide = (p, isClone = false, realIndex = 0) => `
    <div class="projects-slide ${isClone ? 'is-clone' : ''}" data-real-index="${realIndex}" ${isClone ? 'aria-hidden="true"' : `aria-label="Case ${realIndex + 1}: ${escapeHtml(p.title)}"`}>
      <div class="mult-card overflow-hidden bg-white p-6 sm:p-8 lg:p-10 transition duration-300">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          <!-- Text & Highlights (Coluna Esquerda Equilibrada) -->
          <div class="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100/70 border border-purple-200/80 px-3.5 py-1 rounded-full shadow-xs">
                  <i class="ri-sparkling-fill text-purple-600 text-xs"></i>
                  ${escapeHtml(p.category || 'Inovação Mult')}
                </span>
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline-block">• Case Homologado</span>
              </div>

              <h3 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                ${escapeHtml(p.title)}
              </h3>
              
              <p class="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed font-normal">
                ${escapeHtml(p.description)}
              </p>
            </div>

            <!-- 3 Pillars List -->
            ${(p.tag_1_title || p.tag_2_title || p.tag_3_title) ? `
            <div class="space-y-3.5 py-4 border-y border-purple-100/80">
              ${p.tag_1_title ? `
                <div class="p-3.5 sm:p-4 rounded-2xl bg-purple-50/50 border border-purple-100/70 flex items-start gap-4 transition hover:bg-purple-50">
                  <div class="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <i class="ri-flask-line text-xl font-bold"></i>
                  </div>
                  <div>
                    <h4 class="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900">${escapeHtml(p.tag_1_title)}</h4>
                    <p class="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">${escapeHtml(p.tag_1_desc || '')}</p>
                  </div>
                </div>` : ''}

              ${p.tag_2_title ? `
                <div class="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/70 flex items-start gap-4 transition hover:bg-emerald-50">
                  <div class="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <i class="ri-heart-pulse-line text-xl font-bold"></i>
                  </div>
                  <div>
                    <h4 class="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900">${escapeHtml(p.tag_2_title)}</h4>
                    <p class="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">${escapeHtml(p.tag_2_desc || '')}</p>
                  </div>
                </div>` : ''}

              ${p.tag_3_title ? `
                <div class="p-3.5 sm:p-4 rounded-2xl bg-sky-50/50 border border-sky-100/70 flex items-start gap-4 transition hover:bg-sky-50">
                  <div class="w-11 h-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <i class="ri-leaf-line text-xl font-bold"></i>
                  </div>
                  <div>
                    <h4 class="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900">${escapeHtml(p.tag_3_title)}</h4>
                    <p class="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">${escapeHtml(p.tag_3_desc || '')}</p>
                  </div>
                </div>` : ''}
            </div>` : ''}

            <!-- Action Button Bar -->
            <div class="pt-2 flex flex-wrap items-center gap-4">
              <a href="${p.action_button_link || '#contato'}" class="btn-mult-primary text-sm px-6 py-3.5 shadow-md hover:shadow-xl transition">
                <span>${escapeHtml(p.action_button_text || 'SAIBA MAIS SOBRE O PROJETO')}</span>
                <i class="ri-arrow-right-line text-base"></i>
              </a>
              <span class="text-xs font-extrabold text-purple-700/80 uppercase tracking-widest hidden sm:inline-flex items-center gap-1.5">
                <i class="ri-checkbox-circle-fill text-emerald-600 text-sm"></i>
                Solução Técnica Aplicada
              </span>
            </div>
          </div>

          <!-- Visual Showcase: Silhueta Orgânica Fluida & Integração Ambiental -->
          <div class="lg:col-span-5 relative flex items-center justify-center py-4 lg:py-0">
            
            <!-- Halo de Luz Difusa Ambiente -->
            <div class="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-sky-400/20 to-emerald-400/10 rounded-full blur-2xl scale-105 pointer-events-none animate-ambient-glow"></div>

            <!-- Container Orgânico Fluido (Identidade Visual Mult) -->
            <div class="relative w-full max-w-[420px] aspect-[4/5] shape-mult-organic shadow-2xl shadow-purple-900/15 border-2 border-white group">
              <picture class="w-full h-full">
                <source 
                  media="(max-width: 768px)" 
                  srcset="${escapeHtml(p.image_mobile_url || p.image_url || 'assets/img/engenharia-de-alimentos.jpeg')}" 
                />
                <img 
                  src="${escapeHtml(p.image_url || 'assets/img/engenharia-de-alimentos.jpeg')}" 
                  alt="${escapeHtml(p.title)}" 
                  class="w-full h-full object-cover object-center scale-105 transition duration-700 group-hover:scale-110"
                  onerror="this.src='assets/img/engenharia-de-alimentos.jpeg'"
                />
              </picture>
              <div class="absolute inset-0 bg-gradient-to-t from-purple-950/35 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <!-- Badge Flutuante em Glassmorphism de Autoridade Científica -->
            <div class="absolute -bottom-2 right-2 sm:right-6 z-10">
              <span class="px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider text-purple-950 shadow-xl border border-purple-100/90 flex items-center gap-2">
                <i class="ri-sparkling-fill text-purple-600"></i>
                P&amp;D Inovação Mult
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  `;

  let projects = [];
  try {
    const res = await ApiClient.getProjects(true);
    if (res && res.data && res.data.length > 0) {
      projects = res.data;
    } else {
      projects = [fallbackProject];
    }
  } catch (e) {
    console.log('[Site] Using fallback project view.');
    projects = [fallbackProject];
  }

  const N = projects.length;

  // Se houver apenas 1 projeto, exibir estático e ocultar controles
  if (N <= 1) {
    track.innerHTML = renderProjectSlide(projects[0], false, 0);
    track.style.transform = 'none';
    if (controlsEl) controlsEl.style.display = 'none';
    return;
  }

  // Se houver múltiplos projetos (N >= 2), configurar Carrossel com Loop Infinito
  // Estrutura de Slides com Clones: [Clone do último (N-1), Slide 0, Slide 1, ..., Slide N-1, Clone do primeiro (0)]
  const slidesHtml = [
    renderProjectSlide(projects[N - 1], true, N - 1),
    ...projects.map((p, i) => renderProjectSlide(p, false, i)),
    renderProjectSlide(projects[0], true, 0)
  ].join('');

  track.innerHTML = slidesHtml;

  // Renderizar Dots Indicadores
  if (dotsContainer) {
    dotsContainer.innerHTML = projects.map((_, i) => `
      <button type="button" class="projects-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Ir para projeto ${i + 1}" role="tab" aria-selected="${i === 0}"></button>
    `).join('');
  }

  if (controlsEl) {
    controlsEl.style.display = 'flex';
  }

  let currentTrackIndex = 1; // Começa no primeiro slide real (índice 1 no track)
  let isTransitioning = false;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 7500; // 7.5 segundos para leitura calma
  const TRANSITION_STYLE = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';

  function updateDots() {
    if (!dotsContainer) return;
    const realIndex = (currentTrackIndex - 1 + N) % N;
    const dots = dotsContainer.querySelectorAll('.projects-dot');
    dots.forEach((d, idx) => {
      if (idx === realIndex) {
        d.classList.add('active');
        d.setAttribute('aria-selected', 'true');
      } else {
        d.classList.remove('active');
        d.setAttribute('aria-selected', 'false');
      }
    });
  }

  function setTrackPosition(animate = true) {
    if (animate) {
      track.style.transition = TRANSITION_STYLE;
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${currentTrackIndex * 100}%)`;
    updateDots();
  }

  // Posição inicial sem animação
  setTrackPosition(false);

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentTrackIndex++;
    setTrackPosition(true);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentTrackIndex--;
    setTrackPosition(true);
  }

  function goToIndex(targetRealIndex) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentTrackIndex = targetRealIndex + 1;
    setTrackPosition(true);
    restartAutoplay();
  }

  // Evento ao término da transição: gerencia o Loop Infinito Silencioso
  track.addEventListener('transitionend', (e) => {
    if (e.target !== track) return;
    isTransitioning = false;

    // Se passou do último e está no clone do primeiro (índice N + 1)
    if (currentTrackIndex === N + 1) {
      currentTrackIndex = 1;
      setTrackPosition(false);
    }
    // Se recuou do primeiro e está no clone do último (índice 0)
    else if (currentTrackIndex === 0) {
      currentTrackIndex = N;
      setTrackPosition(false);
    }
  });

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Eventos de clique nos controles
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.projects-dot');
      if (dot && dot.dataset.index !== undefined) {
        goToIndex(Number(dot.dataset.index));
      }
    });
  }

  // Pausa no Hover do mouse
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', startAutoplay);
  }
  if (controlsEl) {
    controlsEl.addEventListener('mouseenter', stopAutoplay);
    controlsEl.addEventListener('mouseleave', startAutoplay);
  }

  // Suporte a gestos touch swipe no mobile
  let touchStartX = 0;
  let touchStartY = 0;

  if (carouselEl) {
    carouselEl.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      stopAutoplay();
    }, { passive: true });

    carouselEl.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoplay();
    }, { passive: true });
  }

  // Reposicionamento seguro ao redimensionar tela
  window.addEventListener('resize', () => {
    setTrackPosition(false);
  });

  // Iniciar autoplay
  startAutoplay();
}

// 4. Dynamic Team Members (Nossas Multiplicadoras - Carrossel 3D Imersivo)
async function initDynamicTeam() {
  const track = document.getElementById('carouselTrack');
  const container = document.getElementById('team3DCarouselContainer');
  if (!track) return;

  const fallbackMembers = [
    { name: 'Taiana Franco', role: 'Fundadora & Eng. Química', bio: 'Especialista em formulações técnicas, inovação em produtos e liderança do hub Mult.', photo_url: 'assets/img/taiana-franco.jpg', linkedin_url: 'https://www.linkedin.com/in/taiana-franco-mult' },
    { name: 'Cristina Pereira', role: 'Seleção de Especialistas', bio: 'Head de recrutamento técnico e governança da rede de consultores parceiros.', photo_url: 'assets/img/cristina-pereira.jpg', linkedin_url: 'https://www.linkedin.com/company/mult-engenharia' },
    { name: 'Juliana Martins', role: 'Construção da Solução', bio: 'Gerente técnica de projetos de engenharia e sustentabilidade industrial.', photo_url: 'assets/img/juliana-martins.jpg', linkedin_url: 'https://www.linkedin.com/company/mult-engenharia' },
    { name: 'Fernanda Alves', role: 'Meio Ambiente & ESG', bio: 'Consultora sênior em conformidade ambiental, licenciamento e governança ESG.', photo_url: 'assets/img/fernanda-alves.jpg', linkedin_url: 'https://www.linkedin.com/company/mult-engenharia' },
    { name: 'Renata Souza', role: 'SST & Gestão de Riscos', bio: 'Especialista em Saúde e Segurança do Trabalho, adequação a NRs e prevenção.', photo_url: 'assets/img/renata-souza.jpg', linkedin_url: 'https://www.linkedin.com/company/mult-engenharia' },
    { name: 'Carla Mendes', role: 'Tecnologia & Inovação', bio: 'Líder em transformação digital, engenharia de dados e soluções inovadoras.', photo_url: 'assets/img/carla-mendes.jpg', linkedin_url: 'https://www.linkedin.com/company/mult-engenharia' }
  ];

  let members = fallbackMembers;

  try {
    const res = await ApiClient.getTeam();
    if (res && res.data && res.data.length > 0) {
      members = res.data;
    }
  } catch (e) {
    console.log('[Site] Usando fallback local para equipe.');
  }

  // Renderizar os cards imersivos
  track.innerHTML = members.map((m, idx) => {
    const nameClean = (m.name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const roleClean = (m.role || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const isFounder = nameClean.includes('taiana') || roleClean.includes('fundad') || roleClean.includes('founder');

    return `
    <div class="carousel-card ${isFounder ? 'is-founder' : ''} bg-[#120428] ring-1 ${isFounder ? 'ring-orange-500/40' : 'ring-white/10'}" data-index="${idx}">
      <!-- Imagem de Fundo de Alta Definição -->
      <img 
        src="${m.photo_url || 'assets/img/taiana-franco.jpg'}" 
        alt="${escapeHtml(m.name)}" 
        class="absolute inset-0 w-full h-full object-cover object-top sm:object-center select-none"
        onerror="this.src='assets/logo/mult-icon-color.png'"
        loading="lazy"
      />
      
      <!-- Degradê Escuro Sobreposto para Legibilidade Imersiva -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#0b021a] via-[#0b021a]/50 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>

      <!-- Selo Superior Flutuante de Multiplicadora / Fundadora -->
      <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${isFounder ? 'bg-orange-950/85 border border-orange-500/60 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.3)]' : 'bg-[#1D0B44]/80 border border-purple-500/30 text-purple-200'} backdrop-blur-md text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
          <span class="w-1.5 h-1.5 rounded-full ${isFounder ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,1)]' : 'bg-emerald-400'} animate-pulse"></span>
          <span class="${isFounder ? 'text-orange-400 font-black' : 'text-purple-200'}">${isFounder ? 'Fundadora Mult' : 'Multiplicadora Mult'}</span>
        </span>
        <span class="w-7 h-7 rounded-full ${isFounder ? 'bg-orange-950/80 border border-orange-500/60 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.4)]' : 'bg-black/40 border border-white/10 text-purple-300'} backdrop-blur-md flex items-center justify-center text-xs">
          <i class="${isFounder ? 'ri-vip-crown-2-fill' : 'ri-award-line'}"></i>
        </span>
      </div>

      <!-- Conteúdo do Card (Inferior) -->
      <div class="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end z-10 text-left">
        <!-- Pílula Especialidade / Cargo -->
        <span class="inline-block self-start text-[11px] font-extrabold uppercase tracking-wider ${isFounder ? 'text-amber-200 bg-orange-950/90 border border-orange-500/50 shadow-[0_0_12px_rgba(249,115,22,0.25)]' : 'text-purple-200 bg-purple-900/80 border border-purple-400/30'} backdrop-blur-md px-3 py-1 rounded-lg mb-2 shadow-sm">
          ${escapeHtml(m.role)}
        </span>

        <!-- Nome da Especialista -->
        <h3 class="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-md">
          ${escapeHtml(m.name)}
        </h3>

        <!-- Bio Resumida -->
        <p class="text-xs text-purple-100/90 mt-2 line-clamp-2 leading-relaxed">
          ${escapeHtml(m.bio || '')}
        </p>

        <!-- Botão Oficial com Logo LinkedIn -->
        <div class="pt-4 mt-3 border-t border-white/15 flex items-center justify-between">
          ${m.linkedin_url ? `
            <a href="${escapeHtml(m.linkedin_url)}" target="_blank" rel="noopener noreferrer" 
               class="linkedin-btn-card group/btn" onclick="event.stopPropagation();">
              <i class="ri-linkedin-box-fill text-base text-[#0077B5] group-hover/btn:scale-110 transition"></i>
              <span>Ver LinkedIn</span>
              <i class="ri-arrow-right-up-line text-xs text-purple-300"></i>
            </a>
          ` : `
            <span class="linkedin-btn-card opacity-60 cursor-default">
              <i class="ri-linkedin-box-fill text-base text-[#0077B5]"></i>
              <span>Rede Mult</span>
            </span>
          `}
          <span class="text-[10px] font-extrabold uppercase tracking-widest text-purple-300/70">
            HUB MULT
          </span>
        </div>
      </div>
    </div>
    `;
  }).join('');

  const cards = track.querySelectorAll('.carousel-card');
  const total = cards.length;
  if (total === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  function updateCarousel() {
    const isMobile = window.innerWidth < 640;

    cards.forEach((card, index) => {
      let relativePos = (index - currentIndex) % total;
      if (relativePos < -Math.floor(total / 2)) relativePos += total;
      if (relativePos > Math.floor(total / 2)) relativePos -= total;

      let transform = '';
      let opacity = 0;
      let zIndex = 1;
      let pointerEvents = 'none';
      let isCenter = false;

      if (relativePos === 0) {
        // Centro (Card em Foco Ativo)
        transform = 'translateX(0px) scale(1) rotateY(0deg)';
        opacity = 1;
        zIndex = 10;
        pointerEvents = 'auto';
        isCenter = true;
      } else if (relativePos === 1) {
        // Direita Imediata
        const x = isMobile ? '110px' : '190px';
        const scale = isMobile ? '0.82' : '0.88';
        transform = `translateX(${x}) scale(${scale}) rotateY(-12deg)`;
        opacity = 0.7;
        zIndex = 5;
        pointerEvents = 'auto';
      } else if (relativePos === -1) {
        // Esquerda Imediata
        const x = isMobile ? '-110px' : '-190px';
        const scale = isMobile ? '0.82' : '0.88';
        transform = `translateX(${x}) scale(${scale}) rotateY(12deg)`;
        opacity = 0.7;
        zIndex = 5;
        pointerEvents = 'auto';
      } else if (relativePos === 2) {
        // Direita Externa
        const x = isMobile ? '180px' : '370px';
        const scale = isMobile ? '0.7' : '0.8';
        transform = `translateX(${x}) scale(${scale}) rotateY(-22deg)`;
        opacity = isMobile ? 0 : 0.4;
        zIndex = 2;
        pointerEvents = isMobile ? 'none' : 'auto';
      } else if (relativePos === -2) {
        // Esquerda Externa
        const x = isMobile ? '-180px' : '-370px';
        const scale = isMobile ? '0.7' : '0.8';
        transform = `translateX(${x}) scale(${scale}) rotateY(22deg)`;
        opacity = isMobile ? 0 : 0.4;
        zIndex = 2;
        pointerEvents = isMobile ? 'none' : 'auto';
      } else {
        // Demais Cards Ocultos na Rotação
        const dir = relativePos > 0 ? 1 : -1;
        const x = dir * (isMobile ? 220 : 500);
        transform = `translateX(${x}px) scale(0.7) rotateY(${dir * -30}deg)`;
        opacity = 0;
        zIndex = 1;
        pointerEvents = 'none';
      }

      card.style.transform = transform;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.pointerEvents = pointerEvents;
      card.style.filter = isCenter ? 'none' : 'brightness(0.75)';

      if (isCenter) {
        card.classList.add('ring-2', 'ring-purple-500/80', 'active-card');
        card.classList.remove('ring-1', 'ring-white/10');
      } else {
        card.classList.remove('ring-2', 'ring-purple-500/80', 'active-card');
        card.classList.add('ring-1', 'ring-white/10');
      }
    });
  }

  // Interação de Clique nos Cards
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      if (currentIndex !== idx) {
        currentIndex = idx;
        updateCarousel();
        restartAutoplay();
      }
    });
  });

  // Auto-rotação contínua (a cada 3.5s)
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % total;
      updateCarousel();
    }, 3500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pausa no Hover do Mouse
  if (container) {
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
  }

  // Suporte a Redimensionamento de Tela (Mobile / Desktop)
  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Execução Inicial
  updateCarousel();
  startAutoplay();
}

// 5. Contact Form Handler with Validation
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('formName')?.value.trim();
    const email = document.getElementById('formEmail')?.value.trim();
    const phone = document.getElementById('formPhone')?.value.trim();
    const company = document.getElementById('formCompany')?.value.trim();
    const projectMoment = document.getElementById('formMoment')?.value;
    const message = document.getElementById('formMessage')?.value.trim();

    if (!name || !email || !message) {
      showAlert('Por favor, preencha os campos obrigatórios (Nome, E-mail e Mensagem).', 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Enviando mensagem...';
    }

    try {
      await ApiClient.sendContact({
        name,
        email,
        phone,
        company,
        project_moment: projectMoment,
        message
      });

      showAlert('Sua mensagem foi enviada com sucesso! Nossa equipe entrará em contato em breve.', 'success');
      form.reset();
    } catch (err) {
      showAlert(err.message || 'Erro ao enviar mensagem. Tente novamente mais tarde.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'FALE COM UMA ESPECIALISTA →';
      }
    }
  });

  function showAlert(text, type) {
    if (!alertBox) return;
    alertBox.className = `p-4 rounded-xl text-sm font-semibold mb-6 flex items-center gap-3 ${
      type === 'success' 
        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
        : 'bg-rose-50 text-rose-800 border border-rose-200'
    }`;
    alertBox.innerHTML = `
      <i class="${type === 'success' ? 'ri-checkbox-circle-fill text-emerald-600' : 'ri-error-warning-fill text-rose-600'} text-lg"></i>
      <span>${text}</span>
    `;
    alertBox.classList.remove('hidden');
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// 6. Interactive Diagnóstico Routing
function initDiagnosticoNavigation() {
  const diagButtons = document.querySelectorAll('.diagnostico-action-btn');
  const momentSelect = document.getElementById('formMoment');

  diagButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetMoment = btn.getAttribute('data-moment');
      if (momentSelect && targetMoment) {
        momentSelect.value = targetMoment;
      }
      const contactSection = document.getElementById('contato');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[m]);
}
