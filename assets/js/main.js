/**
 * Xporus International — UI/UX Pro Max Frontend Interactive Controller
 * Connects with XporusStore to render CMS data and execute Pro Max interactions:
 * - Sticky Glassmorphic Navbar with Scroll-Spy Active Section Highlighting
 * - Dynamic Hero & Animated 4 Impact Metrics Counter (IntersectionObserver)
 * - 6 Core Services Grid (01-06 Indexed Cards + Deliverable Chips + Case Study Modal)
 * - Medoc Sourcing Style 3D Flip-Box Product Categories + Live Instant Search + Filter Pills
 * - 4 Co-Founders Leadership Team Grid
 * - Verified Client Testimonials Carousel Slider (Keyboard + Touch + Dots)
 * - Quote Request Modal & Contact Form -> Saves directly to Admin CRM
 */

document.addEventListener('DOMContentLoaded', () => {
  let cmsData = window.XporusStore.getData();
  const defaultCatFilter =
    document.getElementById('categories-grid')?.getAttribute('data-default-filter') || 'featured';
  let currentCategoryFilter = defaultCatFilter;
  let currentCategorySearch = '';
  let currentProductFilter = 'all';
  let currentProductSearch = '';
  let currentTestimonialSlide = 0;
  let metricsAnimated = false;

  // Initialize All Sections & Interactions
  renderAllSections();
  initNavbarAndScrollSpy();
  initCategorySearchAndFilters();
  initAllProductsSearchAndFilters();
  initModalsAndForms();
  initMetricsCounterObserver();

  // Listen for real-time updates from Admin Panel across tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'xporus_international_cms_v2') {
      cmsData = window.XporusStore.getData();
      renderAllSections();
    }
  });

  window.addEventListener('xporus-cms-updated', () => {
    cmsData = window.XporusStore.getData();
    renderAllSections();
  });

  function renderAllSections() {
    renderHeroAndSettings();
    renderMetricsBar();
    renderServicesGrid();
    renderProductCategories();
    renderAllProductsCatalog();
    renderLeadershipTeam();
    renderTestimonialsCarousel();
    populateInquiryCategoryDropdowns();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /* ==========================================================================
     1. Render Hero & Global Contact Settings
     ========================================================================== */
  function renderHeroAndSettings() {
    const s = cmsData.settings;
    const setEl = (id, text) => {
      const el = document.getElementById(id);
      if (el && text) el.textContent = text;
    };

    setEl('hero-badge-text', s.heroBadge);
    const heroHeadlineEl = document.getElementById('hero-headline-text');
    if (heroHeadlineEl && s.heroHeadline) {
      if (s.heroHeadline.includes('Sourcing From India')) {
        heroHeadlineEl.innerHTML = escapeHtml(s.heroHeadline).replace(
          'Sourcing From India',
          '<span class="heading-accent">Sourcing From India</span>'
        );
      } else {
        heroHeadlineEl.textContent = s.heroHeadline;
      }
    }
    setEl('hero-subtext-text', s.heroSubtext);
    setEl('hero-primary-cta-text', s.heroPrimaryCta);
    setEl('hero-secondary-cta-text', s.heroSecondaryCta);

    setEl('contact-address-text', s.address);
    setEl('contact-phone-text', s.phone);
    setEl('contact-email-text', s.email);
    setEl('footer-address-text', s.address);
    setEl('footer-phone-text', s.phone);
    setEl('footer-email-text', s.email);
  }

  /* ==========================================================================
     2. Render Floating Metrics Bar + Animated Count-Up (UI/UX Pro Max)
     ========================================================================== */
  function renderMetricsBar() {
    const container = document.getElementById('metrics-grid');
    if (!container) return;

    container.innerHTML = cmsData.metrics
      .map(
        (m, idx) => `
      <div class="px-6 py-4 text-center ${
        idx < cmsData.metrics.length - 1 ? 'md:border-r md:border-slate-200/80' : ''
      }">
        <div
          class="metric-counter text-3xl sm:text-4xl font-extrabold text-blue-600 font-heading tracking-tight tabular-nums mb-1"
          data-target="${escapeHtml(m.value)}"
        >
          ${escapeHtml(m.value)}
        </div>
        <div class="text-xs sm:text-sm font-semibold text-slate-600 tracking-wide">${escapeHtml(
          m.label
        )}</div>
      </div>
    `
      )
      .join('');
  }

  function initMetricsCounterObserver() {
    const grid = document.getElementById('metrics-grid');
    if (!grid || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !metricsAnimated) {
            metricsAnimated = true;
            animateMetricCounters();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(grid);
  }

  function animateMetricCounters() {
    document.querySelectorAll('.metric-counter').forEach((el) => {
      const raw = el.getAttribute('data-target') || '';
      const match = raw.match(/^(\d+)(.*)$/);
      if (!match) return;
      const targetNum = parseInt(match[1], 10);
      const suffix = match[2] || '';
      const duration = 1100;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * targetNum);
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = raw;
        }
      }
      requestAnimationFrame(tick);
    });
  }

  /* ==========================================================================
     3. Render 6 Core Services Grid (3x2 Layout — Pro Max Indexed Cards)
     ========================================================================== */
  function renderServicesGrid() {
    const container = document.getElementById('services-grid');
    if (!container) return;

    container.innerHTML = cmsData.services
      .map((srv, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const deliverables = Array.isArray(srv.deliverables) ? srv.deliverables.slice(0, 2) : [];
        return `
      <div class="service-card bg-white rounded-2xl border border-slate-200/90 p-7 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-5">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-sm">
              <i data-lucide="${escapeHtml(srv.icon || 'briefcase')}" class="w-6 h-6"></i>
            </div>
            <span class="text-xs font-extrabold text-slate-300 group-hover:text-blue-600/70 font-heading tabular-nums tracking-widest transition-colors">
              /${num}
            </span>
          </div>

          <h3 class="text-xl font-bold text-slate-900 font-heading mb-2.5 group-hover:text-blue-600 transition-colors">
            <a href="services.html#service-${idx + 1}" class="hover:underline">${escapeHtml(srv.title)}</a>
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">
            ${escapeHtml(srv.shortDesc)}
          </p>

          ${
            deliverables.length
              ? `<div class="flex flex-wrap gap-1.5 mb-5">
                  ${deliverables
                    .map(
                      (d) =>
                        `<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 group-hover:bg-blue-50/80 group-hover:text-blue-700 transition-colors">${escapeHtml(
                          d
                        )}</span>`
                    )
                    .join('')}
                </div>`
              : ''
          }
        </div>

        <div class="pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <a
            href="services.html#service-${idx + 1}"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Learn More</span>
            <i data-lucide="arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1"></i>
          </a>
          <button
            type="button"
            data-inquire-interest="Service: ${escapeHtml(srv.title)}"
            class="open-quote-with-interest inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors"
          >
            <span>Request Quote</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
      })
      .join('');

    container.querySelectorAll('.open-service-modal').forEach((btn) => {
      btn.addEventListener('click', () => {
        const srvId = btn.getAttribute('data-service-id');
        const srv = cmsData.services.find((s) => s.id === srvId);
        if (srv) openServiceDetailModal(srv);
      });
    });

    container.querySelectorAll('.open-quote-with-interest').forEach((btn) => {
      btn.addEventListener('click', () => {
        openQuoteModal(btn.getAttribute('data-inquire-interest'));
      });
    });
  }

  /* ==========================================================================
     4. Render Medoc Sourcing Style 3D Flip-Box Product Categories + Live Search
     ========================================================================== */
  function renderProductCategories() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;

    let filtered = cmsData.categories || [];

    // Apply Search Query Filter if present
    if (currentCategorySearch.trim() !== '') {
      const q = currentCategorySearch.trim().toLowerCase();
      filtered = filtered.filter((cat) => {
        const inTitle = (cat.title || '').toLowerCase().includes(q);
        const inSubs = (cat.subcategories || []).some((s) => s.toLowerCase().includes(q));
        return inTitle || inSubs;
      });
    } else if (currentCategoryFilter === 'featured') {
      filtered = filtered.filter((c) => c.featured);
      if (filtered.length === 0) filtered = (cmsData.categories || []).slice(0, 8);
    } else if (currentCategoryFilter !== 'all') {
      filtered = filtered.filter((c) => c.group === currentCategoryFilter);
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
          <p class="text-sm font-bold text-slate-700 mb-1">No matching product categories found for "${escapeHtml(
            currentCategorySearch
          )}"</p>
          <p class="text-xs text-slate-500 mb-4">We source 50+ custom product categories across India. Send us your custom product brief!</p>
          <button type="button" id="reset-cat-search-btn" class="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">
            Show All Categories
          </button>
        </div>
      `;
      document.getElementById('reset-cat-search-btn')?.addEventListener('click', () => {
        currentCategorySearch = '';
        const searchInput = document.getElementById('category-search-input');
        if (searchInput) searchInput.value = '';
        renderProductCategories();
      });
      return;
    }

    grid.innerHTML = filtered
      .map((cat) => {
        const subs = Array.isArray(cat.subcategories) ? cat.subcategories : [];
        return `
        <div class="flip-card" tabindex="0" aria-label="${escapeHtml(cat.title)} Category Card">
          <div class="flip-card-inner">
            <!-- FRONT PANEL (Photographic Background + Sapphire Overlay + Bold Title) -->
            <div class="flip-card-front">
              <img
                src="${escapeHtml(cat.image)}"
                alt="${escapeHtml(cat.title)} — Xporus International Export Category"
                loading="lazy"
                width="400"
                height="280"
              />
              <div class="flip-card-front-overlay"></div>
              <div class="relative z-10 px-3 text-center">
                <span class="inline-block w-8 h-0.5 bg-blue-300/90 mb-2.5 rounded-full"></span>
                <h3 class="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-white font-heading drop-shadow-sm">
                  ${escapeHtml(cat.title)}
                </h3>
                <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-100/95 mt-2 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs">
                  <span>${subs.length} Subcategories</span>
                  <span>• Flip</span>
                </span>
              </div>
            </div>

            <!-- BACK PANEL (Medoc Style Subcategory Checklist + Quick Inquiry) -->
            <div class="flip-card-back">
              <div>
                <div class="flex items-center justify-between border-b border-white/20 pb-2.5 mb-3">
                  <h4 class="text-sm font-extrabold uppercase tracking-wider text-white font-heading truncate pr-2">
                    ${escapeHtml(cat.title)}
                  </h4>
                  <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/15 text-blue-100 shrink-0">
                    Export Ready
                  </span>
                </div>
                <ul class="space-y-1.5 text-xs text-blue-50 font-medium">
                  ${subs
                    .slice(0, 5)
                    .map(
                      (sub) => `
                    <li class="flex items-start gap-2">
                      <span class="text-blue-200 mt-0.5">•</span>
                      <span>${escapeHtml(sub)}</span>
                    </li>
                  `
                    )
                    .join('')}
                </ul>
              </div>

              <button
                type="button"
                data-cat-title="Category: ${escapeHtml(cat.title)}"
                class="cat-inquire-btn w-full mt-3 py-2 px-3 rounded-lg bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Request Catalog &amp; Quote</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      })
      .join('');

    // Support tap-to-flip on touch devices & keyboard Enter/Space
    grid.querySelectorAll('.flip-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.cat-inquire-btn')) return;
        card.classList.toggle('is-flipped');
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('is-flipped');
        }
      });
    });

    grid.querySelectorAll('.cat-inquire-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openQuoteModal(btn.getAttribute('data-cat-title'));
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function initCategorySearchAndFilters() {
    document.querySelectorAll('.cat-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        currentCategoryFilter = btn.getAttribute('data-filter');
        currentCategorySearch = '';
        const searchInput = document.getElementById('category-search-input');
        if (searchInput) searchInput.value = '';

        document.querySelectorAll('.cat-filter-btn').forEach((b) => {
          b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
          b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
        });
        btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
        renderProductCategories();
      });
    });

    const searchInput = document.getElementById('category-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentCategorySearch = e.target.value;
        renderProductCategories();
      });
    }
  }

  /* ==========================================================================
     4B. Render Unified All Individual Products Catalog (products.html)
     ========================================================================== */
  function renderAllProductsCatalog() {
    const grid = document.getElementById('all-products-grid');
    if (!grid) return;

    const allProducts = cmsData.products || [];
    let filtered = allProducts;

    if (currentProductFilter !== 'all') {
      filtered = filtered.filter((p) => p.categoryKey === currentProductFilter);
    }

    if (currentProductSearch.trim() !== '') {
      const q = currentProductSearch.trim().toLowerCase();
      filtered = filtered.filter((p) => {
        return (
          (p.title || '').toLowerCase().includes(q) ||
          (p.sku || '').toLowerCase().includes(q) ||
          (p.category || '').toLowerCase().includes(q) ||
          (p.material || '').toLowerCase().includes(q) ||
          (p.origin || '').toLowerCase().includes(q) ||
          (p.shortDesc || '').toLowerCase().includes(q)
        );
      });
    }

    const countEl = document.getElementById('all-products-count-text');
    if (countEl) {
      countEl.textContent =
        filtered.length === allProducts.length
          ? `Showing all ${allProducts.length} export products across 12 categories (3 products per category)`
          : `Showing ${filtered.length} of ${allProducts.length} export products`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-14 px-6 text-center bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <p class="text-base font-semibold text-slate-800 mb-1">No matching products found for "${escapeHtml(
            currentProductSearch
          )}"</p>
          <p class="text-xs text-slate-500 mb-4 max-w-md mx-auto">We manufacture 1,000+ custom SKUs across 50+ partner factories. Reset filters or send us your custom product brief.</p>
          <button
            type="button"
            id="reset-all-products-btn"
            class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
          >
            Show All ${allProducts.length} Products
          </button>
        </div>
      `;
      document.getElementById('reset-all-products-btn')?.addEventListener('click', () => {
        currentProductFilter = 'all';
        currentProductSearch = '';
        const searchInput = document.getElementById('all-products-search-input');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.prod-filter-btn').forEach((b) => {
          const isAll = b.getAttribute('data-prod-filter') === 'all';
          b.className = isAll
            ? 'prod-filter-btn px-4 py-2 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-xs border border-transparent transition-all'
            : 'prod-filter-btn px-3.5 py-2 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 hover:border-blue-300 transition-all';
        });
        renderAllProductsCatalog();
      });
      return;
    }

    const categoryOrder = [
      { key: 'furniture', num: '01', label: 'Furniture', desc: 'Solid wood dining, living, and bedroom furniture crafted in our Jodhpur manufacturing clusters.' },
      { key: 'lighting', num: '02', label: 'Lamps & Lighting', desc: 'Hand-spun brass pendants, marble table lamps, and woven coastal chandeliers.' },
      { key: 'textiles', num: '03', label: 'Home Textiles', desc: 'Organic percale bedding, waffle throws, and hand-block printed table linens.' },
      { key: 'kitchen', num: '04', label: 'Kitchen & Dining', desc: 'Marble & acacia charcuterie boards, PVD forged flatware, and reactive glaze stoneware.' },
      { key: 'decor', num: '05', label: 'Home Décor & Accessories', desc: 'Architectural brass mirrors, recycled glass hurricanes, and artisanal ceramic vessels.' },
      { key: 'bath', num: '06', label: 'Bath Collection', desc: 'Solid marble vanity sets, 650 GSM zero-twist bath sheets, and woven seagrass hampers.' },
      { key: 'fashion', num: '07', label: 'Bags & Accessories', desc: 'Full-grain vegetable-tanned leather travel bags, heavyweight canvas totes, and raffia resort bags.' },
      { key: 'outdoor', num: '08', label: 'Outdoor Living', desc: 'All-weather plantation teak lounge sets, galvanized metal planters, and outdoor lanterns.' },
      { key: 'rugs', num: '09', label: 'Cushions & Rugs', desc: 'Hand-tufted New Zealand wool area rugs, crewel embroidered cushions, and braided poufs.' },
      { key: 'seasonal', num: '10', label: 'Seasonal & Christmas', desc: 'Zardozi beaded ornaments, carved mango wood candle holders, and mercury glass holiday candles.' },
      { key: 'kids', num: '11', label: 'Kids & Nursery', desc: 'Rattan & solid wood nursery cribs, organic muslin playmats, and braided cotton toy storage.' },
      { key: 'hardware', num: '12', label: 'Home Improvement & DIY', desc: 'Knurled solid brass cabinet hardware, Jaipur blue pottery knobs, and cast-iron shelf kits.' }
    ];

    const renderProductCard = (prd) => `
      <article
        id="${escapeHtml(prd.id)}"
        class="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300/90 transition-all duration-200 overflow-hidden flex flex-col justify-between group"
      >
        <div>
          <!-- Product Image + SKU & Category Badges -->
          <div
            class="relative h-60 overflow-hidden bg-slate-100 cursor-pointer open-prd-spec-btn"
            data-product-id="${escapeHtml(prd.id)}"
          >
            <img
              src="${escapeHtml(prd.image)}"
              alt="${escapeHtml(prd.title)} — ${escapeHtml(prd.sku)}"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              width="420"
              height="260"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent opacity-80"></div>
            <div class="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-blue-700 shadow-xs">
                ${escapeHtml(prd.category)}
              </span>
              <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900/85 text-white tracking-wider uppercase">
                ${escapeHtml(prd.sku)}
              </span>
            </div>
            <div class="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-white font-medium">
              <span class="inline-flex items-center gap-1 bg-slate-900/70 backdrop-blur-xs px-2.5 py-1 rounded-full">
                <i data-lucide="map-pin" class="w-3 h-3 text-blue-300"></i>
                <span>${escapeHtml(prd.origin)}</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-blue-600/90 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                Export Ready
              </span>
            </div>
          </div>

          <!-- Product Info & Technical Specs -->
          <div class="p-6">
            <h3 class="text-lg font-semibold text-slate-900 font-heading mb-2 group-hover:text-blue-600 transition-colors leading-snug">
              ${escapeHtml(prd.title)}
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              ${escapeHtml(prd.shortDesc)}
            </p>

            <!-- Structured Specification Table -->
            <div class="bg-slate-50/90 rounded-xl p-3.5 border border-slate-200/70 space-y-2 text-xs">
              <div class="flex items-start justify-between gap-2 border-b border-slate-200/60 pb-1.5">
                <span class="text-slate-500 font-medium shrink-0">Material:</span>
                <span class="text-slate-800 font-medium text-right">${escapeHtml(prd.material)}</span>
              </div>
              <div class="flex items-start justify-between gap-2 border-b border-slate-200/60 pb-1.5">
                <span class="text-slate-500 font-medium shrink-0">Specs / Size:</span>
                <span class="text-slate-800 font-medium text-right">${escapeHtml(prd.dimensions)}</span>
              </div>
              <div class="flex items-center justify-between gap-2">
                <span class="text-slate-500 font-medium shrink-0">MOQ:</span>
                <span class="text-blue-700 font-semibold text-right">${escapeHtml(prd.moq)}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Card Action Footer -->
        <div class="px-6 pb-6 pt-1 flex items-center gap-2.5">
          <button
            type="button"
            data-product-id="${escapeHtml(prd.id)}"
            class="open-prd-spec-btn flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
          >
            <i data-lucide="eye" class="w-3.5 h-3.5 text-blue-600"></i>
            <span>Quick Specs</span>
          </button>
          <button
            type="button"
            data-prd-interest="Product: ${escapeHtml(prd.title)} (${escapeHtml(prd.sku)})"
            class="inquire-prd-btn flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>Request Quote</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </article>
    `;

    grid.innerHTML = categoryOrder
      .map((catMeta) => {
        const items = filtered.filter((p) => p.categoryKey === catMeta.key);
        if (items.length === 0) return '';
        return `
          <div id="cat-${escapeHtml(catMeta.key)}" class="scroll-mt-28 space-y-6">
            <!-- Category Section Header Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div class="flex items-start sm:items-center gap-3.5">
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white text-sm font-semibold tabular-nums shrink-0 shadow-xs">
                  ${escapeHtml(catMeta.num)}
                </span>
                <div>
                  <div class="flex items-center gap-2.5">
                    <h2 class="text-xl sm:text-2xl font-semibold text-slate-900 font-heading tracking-tight">
                      ${escapeHtml(catMeta.label)}
                    </h2>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                      ${items.length} ${items.length === 1 ? 'Product' : 'Products'}
                    </span>
                  </div>
                  <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
                    ${escapeHtml(catMeta.desc)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                data-prd-interest="Category: ${escapeHtml(catMeta.label)}"
                class="inquire-prd-btn self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 text-xs font-semibold transition-colors shrink-0"
              >
                <span>Request Full ${escapeHtml(catMeta.label)} Catalog</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>

            <!-- 3 Individual Products Grid for This Category -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              ${items.map(renderProductCard).join('')}
            </div>
          </div>
        `;
      })
      .join('');

    grid.querySelectorAll('.open-prd-spec-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const prdId = btn.getAttribute('data-product-id');
        const prd = (cmsData.products || []).find((p) => p.id === prdId);
        if (prd) openProductDetailModal(prd);
      });
    });

    grid.querySelectorAll('.inquire-prd-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        openQuoteModal(btn.getAttribute('data-prd-interest'));
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function initAllProductsSearchAndFilters() {
    document.querySelectorAll('.prod-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        currentProductFilter = btn.getAttribute('data-prod-filter') || 'all';
        document.querySelectorAll('.prod-filter-btn').forEach((b) => {
          b.className =
            'prod-filter-btn px-3.5 py-2 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 hover:border-blue-300 transition-all';
        });
        btn.className =
          'prod-filter-btn px-4 py-2 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-xs border border-transparent transition-all';
        renderAllProductsCatalog();
      });
    });

    const searchInput = document.getElementById('all-products-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentProductSearch = e.target.value;
        renderAllProductsCatalog();
      });
    }
  }

  function openProductDetailModal(prd) {
    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;

    const imgEl = document.getElementById('prd-modal-image');
    if (imgEl) {
      imgEl.src = prd.image;
      imgEl.alt = prd.title;
    }
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val || '';
    };
    setTxt('prd-modal-sku', prd.sku);
    setTxt('prd-modal-category', prd.category);
    setTxt('prd-modal-origin', prd.origin);
    setTxt('prd-modal-title', prd.title);
    setTxt('prd-modal-desc', prd.shortDesc);
    setTxt('prd-modal-material', prd.material);
    setTxt('prd-modal-dimensions', prd.dimensions);
    setTxt('prd-modal-moq', prd.moq);

    const inquireBtn = document.getElementById('prd-modal-inquire-btn');
    if (inquireBtn) {
      inquireBtn.onclick = () => {
        modal.classList.add('hidden');
        openQuoteModal(`Product: ${prd.title} (${prd.sku})`);
      };
    }

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  /* ==========================================================================
     5. Render 4 Co-Founders Leadership Team
     ========================================================================== */
  function renderLeadershipTeam() {
    const container = document.getElementById('team-grid');
    if (!container) return;

    container.innerHTML = cmsData.team
      .map(
        (member) => `
      <div class="team-card bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between group">
        <div>
          <div class="relative rounded-xl overflow-hidden aspect-[4/3] mb-4 bg-slate-100">
            <img
              src="${escapeHtml(member.image)}"
              alt="${escapeHtml(member.name)} — ${escapeHtml(member.role)} at Xporus International"
              class="w-full h-full object-cover object-top"
              loading="lazy"
              width="320"
              height="240"
            />
          </div>
          <div class="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <h3 class="text-base font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors">${escapeHtml(
                member.name
              )}</h3>
              <p class="text-xs font-semibold text-slate-500">${escapeHtml(member.role)}</p>
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-600 text-white shrink-0">
              ${escapeHtml(member.badge || 'Executive')}
            </span>
          </div>
          <p class="text-xs font-semibold text-blue-600 mb-2">${escapeHtml(member.specialty || '')}</p>
          <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(member.bio || '')}</p>
        </div>
      </div>
    `
      )
      .join('');
  }

  /* ==========================================================================
     6. Render Client Testimonials Carousel Slider (Verified Buyer Pro Max UI)
     ========================================================================== */
  function renderTestimonialsCarousel() {
    const track = document.getElementById('testimonials-grid');
    const dotsContainer = document.getElementById('testimonial-dots');
    if (!track || !dotsContainer) return;

    const list = cmsData.testimonials || [];
    if (list.length === 0) return;

    const pairs = [];
    for (let i = 0; i < list.length; i += 2) {
      pairs.push(list.slice(i, i + 2));
    }

    if (currentTestimonialSlide >= pairs.length) {
      currentTestimonialSlide = 0;
    }

    const activePair = pairs[currentTestimonialSlide] || pairs[0];

    track.innerHTML = activePair
      .map(
        (t) => `
      <div class="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative">
        <div>
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-0.5 text-amber-400" aria-label="${t.rating} out of 5 stars">
                ${Array.from({ length: Number(t.rating) || 5 })
                  .map(
                    () =>
                      `<svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
                  )
                  .join('')}
              </div>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                ✓ Verified Partner
              </span>
            </div>
            <span class="text-4xl font-serif text-blue-600/80 leading-none select-none">”</span>
          </div>

          <p class="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            “${escapeHtml(t.quote)}”
          </p>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-slate-100">
          <div class="flex items-center gap-3.5">
            <img
              src="${escapeHtml(t.avatar)}"
              alt="${escapeHtml(t.clientName)}"
              class="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
              loading="lazy"
              width="48"
              height="48"
            />
            <div>
              <h4 class="text-sm font-bold text-slate-900 font-heading">${escapeHtml(t.clientName)}</h4>
              <p class="text-xs text-slate-500">${escapeHtml(t.clientRole)}</p>
              <p class="text-xs font-semibold text-blue-600">${escapeHtml(t.company)}</p>
            </div>
          </div>
          <span class="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-800 uppercase tracking-wider">
            ${escapeHtml(t.country || 'Global')}
          </span>
        </div>
      </div>
    `
      )
      .join('');

    dotsContainer.innerHTML = pairs
      .map(
        (_, idx) => `
      <button
        type="button"
        data-slide="${idx}"
        aria-label="Go to testimonial slide ${idx + 1}"
        class="testimonial-dot h-2.5 rounded-full transition-all ${
          idx === currentTestimonialSlide ? 'w-7 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
        }"
      ></button>
    `
      )
      .join('');

    dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        currentTestimonialSlide = Number(dot.getAttribute('data-slide'));
        renderTestimonialsCarousel();
      });
    });

    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    if (prevBtn) {
      prevBtn.onclick = () => {
        currentTestimonialSlide = (currentTestimonialSlide - 1 + pairs.length) % pairs.length;
        renderTestimonialsCarousel();
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        currentTestimonialSlide = (currentTestimonialSlide + 1) % pairs.length;
        renderTestimonialsCarousel();
      };
    }
  }

  /* ==========================================================================
     7. Navbar Scroll-Spy, Back-to-Top & Mobile Drawer
     ========================================================================== */
  function initNavbarAndScrollSpy() {
    const header = document.getElementById('site-header');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    const sections = ['home', 'about', 'services', 'products', 'team', 'testimonials', 'contact'];

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (header) {
        if (y > 16) header.classList.add('navbar-scrolled');
        else header.classList.remove('navbar-scrolled');
      }

      if (backToTopBtn) {
        if (y > 500) backToTopBtn.classList.remove('hidden');
        else backToTopBtn.classList.add('hidden');
      }

      // Scroll-spy active link highlight
      let currentSec = 'home';
      for (const id of sections) {
        const secEl = document.getElementById(id);
        if (secEl && y >= secEl.offsetTop - 140) {
          currentSec = id;
        }
      }
      navLinks.forEach((link) => {
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentSec) {
          link.classList.add('text-blue-600', 'font-semibold', 'border-b-2', 'border-blue-600');
        } else {
          link.classList.remove('text-blue-600', 'font-semibold', 'border-b-2', 'border-blue-600');
        }
      });
    });

    backToTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
      });
    }
  }

  /* ==========================================================================
     8. Modals (Service Case Study & Quote Request) & Form Submissions
     ========================================================================== */
  function populateInquiryCategoryDropdowns() {
    const selects = document.querySelectorAll('.inquiry-interest-select');
    const options = [
      'General Sourcing & Business Consultation',
      ...cmsData.services.map((s) => `Service: ${s.title}`),
      ...cmsData.categories.map((c) => `Category: ${c.title}`)
    ];

    selects.forEach((sel) => {
      const currentVal = sel.value;
      sel.innerHTML = options
        .map((opt) => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`)
        .join('');
      if (currentVal && options.includes(currentVal)) {
        sel.value = currentVal;
      }
    });
  }

  function openServiceDetailModal(srv) {
    const modal = document.getElementById('service-detail-modal');
    if (!modal) return;

    document.getElementById('srv-modal-title').textContent = srv.title;
    document.getElementById('srv-modal-desc').textContent = srv.fullDesc || srv.shortDesc;
    document.getElementById('srv-modal-case').textContent =
      srv.caseStudy || 'Contact our consulting desk for tailored regional case studies.';

    const delivContainer = document.getElementById('srv-modal-deliverables');
    const deliverables = Array.isArray(srv.deliverables) ? srv.deliverables : [];
    delivContainer.innerHTML = deliverables
      .map(
        (d) => `
      <li class="flex items-center gap-2 text-sm text-slate-700">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-blue-600 shrink-0"></i>
        <span>${escapeHtml(d)}</span>
      </li>
    `
      )
      .join('');

    const inquireBtn = document.getElementById('srv-modal-inquire-btn');
    inquireBtn.onclick = () => {
      modal.classList.add('hidden');
      openQuoteModal(`Service: ${srv.title}`);
    };

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function openQuoteModal(preselectedInterest) {
    const modal = document.getElementById('quote-modal');
    if (!modal) return;

    const select = document.getElementById('modal-interest-select');
    if (select && preselectedInterest) {
      const exists = Array.from(select.options).some((o) => o.value === preselectedInterest);
      if (!exists) {
        const opt = document.createElement('option');
        opt.value = preselectedInterest;
        opt.textContent = preselectedInterest;
        select.prepend(opt);
      }
      select.value = preselectedInterest;
    }

    document.getElementById('quote-modal-form-wrap').classList.remove('hidden');
    document.getElementById('quote-modal-success').classList.add('hidden');
    modal.classList.remove('hidden');
  }

  function initModalsAndForms() {
    document.querySelectorAll('.open-quote-modal-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        openQuoteModal(btn.getAttribute('data-interest') || '');
      });
    });

    document.querySelectorAll('.close-modal-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.closest('.modal-backdrop').classList.add('hidden');
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.add('hidden');
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop').forEach((m) => m.classList.add('hidden'));
      }
    });

    const modalForm = document.getElementById('quote-modal-form');
    if (modalForm) {
      modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(modalForm);
        window.XporusStore.addInquiry({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          company: formData.get('company'),
          interest: formData.get('interest'),
          message: formData.get('message')
        });
        modalForm.reset();
        document.getElementById('quote-modal-form-wrap').classList.add('hidden');
        document.getElementById('quote-modal-success').classList.remove('hidden');
      });
    }

    const contactForm = document.getElementById('page-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        window.XporusStore.addInquiry({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          company: formData.get('company'),
          interest: formData.get('interest'),
          message: formData.get('message')
        });
        contactForm.reset();
        const toast = document.getElementById('contact-form-toast');
        if (toast) {
          toast.classList.remove('hidden');
          setTimeout(() => toast.classList.add('hidden'), 6000);
        }
      });
    }

    const newsForm = document.getElementById('newsletter-form');
    if (newsForm) {
      newsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter-email');
        if (emailInput && emailInput.value.trim()) {
          window.XporusStore.addSubscriber(emailInput.value.trim());
          emailInput.value = '';
          const msg = document.getElementById('newsletter-msg');
          if (msg) {
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 4500);
          }
        }
      });
    }
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
