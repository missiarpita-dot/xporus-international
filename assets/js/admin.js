/**
 * Xporus International — Enterprise Admin Panel & CMS Controller
 * Provides full CRUD for:
 * - Buyer Quote Requests & Leads CRM (Status updates, Delete, CSV Export)
 * - Hero, 4 Impact Metrics & Jodhpur Corporate Contact Details
 * - 6 Core Services (Title, Icon, Short/Full Desc, Case Study, Deliverables)
 * - Product Categories (Medoc 3D Flip-Cards, Image, Group, Featured, Subcategories)
 * - Leadership Team (4 Co-Founders, Portraits, Specialties, Bios)
 * - Client Testimonials Carousel (Reviews, 5-Star Ratings, Avatars)
 * - Newsletter Subscribers & JSON Backup / Factory Reset
 */

document.addEventListener('DOMContentLoaded', () => {
  const AUTH_KEY = 'xporus_admin_authenticated';
  let cmsData = window.XporusStore.getData();

  const loginScreen = document.getElementById('admin-login-screen');
  const appShell = document.getElementById('admin-app-shell');
  const loginForm = document.getElementById('admin-login-form');
  const loginError = document.getElementById('login-error');

  // Check Session Authentication
  if (sessionStorage.getItem(AUTH_KEY) === 'true') {
    unlockAdmin();
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const pass = document.getElementById('login-password').value.trim();
      if (email === 'admin@xporusinternational.com' && pass === 'xporus2026') {
        sessionStorage.setItem(AUTH_KEY, 'true');
        loginError.classList.add('hidden');
        unlockAdmin();
      } else {
        loginError.classList.remove('hidden');
      }
    });
  }

  document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY);
    appShell.classList.add('hidden');
    loginScreen.classList.remove('hidden');
  });

  function unlockAdmin() {
    loginScreen.classList.add('hidden');
    appShell.classList.remove('hidden');
    renderAllAdminViews();
  }

  // Listen for live frontend inquiries while Admin Panel is open
  window.addEventListener('storage', (e) => {
    if (e.key === 'xporus_international_cms_v1') {
      cmsData = window.XporusStore.getData();
      renderAllAdminViews();
    }
  });

  /* ==========================================================================
     Tab Navigation Switching
     ========================================================================== */
  const tabTitles = {
    dashboard: 'Dashboard Overview',
    inquiries: 'Quote & Leads CRM',
    hero: 'Hero, Stats & Corporate Contact Settings',
    services: 'Services Section Manager (6 Core Services)',
    categories: 'Product Categories Manager (Medoc 3D Flip-Cards)',
    team: 'Leadership & Co-Founders Team Manager',
    testimonials: 'Client Testimonials Carousel Manager',
    settings: 'Newsletter Subscribers & Database Backup'
  };

  document.querySelectorAll('.admin-nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      document.querySelectorAll('.admin-nav-btn').forEach((b) => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('text-slate-300');
      });
      btn.classList.remove('text-slate-300');
      btn.classList.add('bg-blue-600', 'text-white');

      document.querySelectorAll('.admin-tab-panel').forEach((panel) => panel.classList.add('hidden'));
      document.getElementById(`tab-${target}`)?.classList.remove('hidden');
      document.getElementById('admin-page-title').textContent = tabTitles[target] || 'Admin Panel';
    });
  });

  function showSaveToast() {
    const badge = document.getElementById('admin-save-indicator');
    if (!badge) return;
    badge.classList.remove('hidden');
    badge.classList.add('inline-flex');
    setTimeout(() => {
      badge.classList.add('hidden');
      badge.classList.remove('inline-flex');
    }, 3000);
  }

  function renderAllAdminViews() {
    cmsData = window.XporusStore.getData();
    renderDashboard();
    renderInquiriesCRM();
    renderHeroAndSettingsForm();
    renderServicesManager();
    renderCategoriesManager();
    renderTeamManager();
    renderTestimonialsManager();
    renderSubscribersAndBackup();
    if (window.lucide) window.lucide.createIcons();
  }

  /* ==========================================================================
     1. Dashboard Overview
     ========================================================================== */
  function renderDashboard() {
    const inq = cmsData.inquiries || [];
    const newCount = inq.filter((i) => i.status === 'New').length;

    document.getElementById('kpi-inquiries').textContent = inq.length;
    document.getElementById('kpi-new-inquiries').textContent = `${newCount} New Unread`;
    document.getElementById('sidebar-leads-badge').textContent = inq.length;
    document.getElementById('kpi-services').textContent = (cmsData.services || []).length;
    document.getElementById('kpi-categories').textContent = (cmsData.categories || []).length;
    document.getElementById('kpi-testimonials').textContent = (cmsData.testimonials || []).length;

    const tbody = document.getElementById('dashboard-recent-inquiries');
    if (!tbody) return;

    tbody.innerHTML = inq
      .slice(0, 5)
      .map(
        (item) => `
      <tr class="hover:bg-slate-50/80">
        <td class="py-3.5 px-4 font-semibold text-slate-900">
          <div>${escapeHtml(item.id)}</div>
          <div class="text-[11px] font-normal text-slate-400">${escapeHtml(item.createdAt)}</div>
        </td>
        <td class="py-3.5 px-4">
          <div class="font-bold text-slate-900">${escapeHtml(item.name)}</div>
          <div class="text-slate-500">${escapeHtml(item.company)} • ${escapeHtml(item.email)}</div>
        </td>
        <td class="py-3.5 px-4">
          <span class="font-semibold text-blue-700">${escapeHtml(item.interest)}</span>
          <p class="text-slate-500 truncate max-w-xs mt-0.5">${escapeHtml(item.message)}</p>
        </td>
        <td class="py-3.5 px-4">${renderStatusBadge(item.status)}</td>
      </tr>
    `
      )
      .join('');
  }

  function renderStatusBadge(status) {
    const map = {
      New: 'bg-blue-50 text-blue-700 border-blue-200',
      'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
      Quoted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      Closed: 'bg-slate-100 text-slate-600 border-slate-200'
    };
    const cls = map[status] || map.New;
    return `<span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${cls}">${escapeHtml(
      status
    )}</span>`;
  }

  /* ==========================================================================
     2. Quote & Leads CRM
     ========================================================================== */
  function renderInquiriesCRM() {
    const tbody = document.getElementById('crm-inquiries-tbody');
    if (!tbody) return;

    const list = cmsData.inquiries || [];
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-slate-400">No inquiries recorded yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = list
      .map(
        (item, idx) => `
      <tr class="hover:bg-slate-50/80 align-top">
        <td class="py-4 px-4 whitespace-nowrap">
          <div class="font-bold text-slate-900">${escapeHtml(item.id)}</div>
          <div class="text-[11px] text-slate-400">${escapeHtml(item.createdAt)}</div>
        </td>
        <td class="py-4 px-4">
          <div class="font-bold text-slate-900 text-sm">${escapeHtml(item.name)}</div>
          <div class="text-xs font-semibold text-blue-600">${escapeHtml(item.company)}</div>
          <div class="text-slate-500 mt-1">${escapeHtml(item.email)}</div>
          <div class="text-slate-500">${escapeHtml(item.phone)}</div>
        </td>
        <td class="py-4 px-4 max-w-md">
          <span class="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[11px] mb-1">
            ${escapeHtml(item.interest)}
          </span>
          <p class="text-slate-700 leading-relaxed whitespace-pre-line">${escapeHtml(item.message)}</p>
        </td>
        <td class="py-4 px-4">
          <select
            data-inq-idx="${idx}"
            class="crm-status-select px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
          >
            ${['New', 'In Progress', 'Quoted', 'Closed']
              .map(
                (st) =>
                  `<option value="${st}" ${item.status === st ? 'selected' : ''}>${st}</option>`
              )
              .join('')}
          </select>
        </td>
        <td class="py-4 px-4 text-right">
          <button
            type="button"
            data-del-inq="${idx}"
            class="del-inq-btn text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
          >
            Delete
          </button>
        </td>
      </tr>
    `
      )
      .join('');

    tbody.querySelectorAll('.crm-status-select').forEach((sel) => {
      sel.addEventListener('change', () => {
        const i = Number(sel.getAttribute('data-inq-idx'));
        cmsData.inquiries[i].status = sel.value;
        window.XporusStore.saveData(cmsData);
        showSaveToast();
        renderDashboard();
      });
    });

    tbody.querySelectorAll('.del-inq-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = Number(btn.getAttribute('data-del-inq'));
        cmsData.inquiries.splice(i, 1);
        window.XporusStore.saveData(cmsData);
        showSaveToast();
        renderAllAdminViews();
      });
    });
  }

  // Export CSV
  document.getElementById('export-inquiries-csv')?.addEventListener('click', () => {
    const rows = [
      ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Interest', 'Status', 'Message'],
      ...(cmsData.inquiries || []).map((i) => [
        i.id,
        i.createdAt,
        i.name,
        i.company,
        i.email,
        i.phone,
        i.interest,
        i.status,
        (i.message || '').replace(/"/g, '""')
      ])
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Xporus_International_Leads.csv';
    a.click();
  });

  /* ==========================================================================
     3. Hero, Metrics & Contact Editor
     ========================================================================== */
  function renderHeroAndSettingsForm() {
    const s = cmsData.settings;
    document.getElementById('set-heroBadge').value = s.heroBadge || '';
    document.getElementById('set-heroHeadline').value = s.heroHeadline || '';
    document.getElementById('set-heroSubtext').value = s.heroSubtext || '';
    document.getElementById('set-heroPrimaryCta').value = s.heroPrimaryCta || '';
    document.getElementById('set-heroSecondaryCta').value = s.heroSecondaryCta || '';
    document.getElementById('set-address').value = s.address || '';
    document.getElementById('set-phone').value = s.phone || '';
    document.getElementById('set-email').value = s.email || '';

    const metricsWrap = document.getElementById('admin-metrics-inputs');
    if (metricsWrap) {
      metricsWrap.innerHTML = (cmsData.metrics || [])
        .map(
          (m, i) => `
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <label class="block text-[11px] font-bold uppercase text-slate-500">Metric Counter #${i + 1}</label>
          <input
            type="text"
            data-metric-val="${i}"
            value="${escapeHtml(m.value)}"
            placeholder="e.g. 10+"
            class="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-bold text-blue-600"
          />
          <input
            type="text"
            data-metric-lbl="${i}"
            value="${escapeHtml(m.label)}"
            placeholder="e.g. Years Experience"
            class="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
          />
        </div>
      `
        )
        .join('');
    }
  }

  document.getElementById('admin-hero-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    cmsData.settings.heroBadge = document.getElementById('set-heroBadge').value.trim();
    cmsData.settings.heroHeadline = document.getElementById('set-heroHeadline').value.trim();
    cmsData.settings.heroSubtext = document.getElementById('set-heroSubtext').value.trim();
    cmsData.settings.heroPrimaryCta = document.getElementById('set-heroPrimaryCta').value.trim();
    cmsData.settings.heroSecondaryCta = document.getElementById('set-heroSecondaryCta').value.trim();
    cmsData.settings.address = document.getElementById('set-address').value.trim();
    cmsData.settings.phone = document.getElementById('set-phone').value.trim();
    cmsData.settings.email = document.getElementById('set-email').value.trim();

    document.querySelectorAll('[data-metric-val]').forEach((inp) => {
      const idx = Number(inp.getAttribute('data-metric-val'));
      if (cmsData.metrics[idx]) cmsData.metrics[idx].value = inp.value.trim();
    });
    document.querySelectorAll('[data-metric-lbl]').forEach((inp) => {
      const idx = Number(inp.getAttribute('data-metric-lbl'));
      if (cmsData.metrics[idx]) cmsData.metrics[idx].label = inp.value.trim();
    });

    window.XporusStore.saveData(cmsData);
    showSaveToast();
  });

  /* ==========================================================================
     4. Services Manager (6 Core Services)
     ========================================================================== */
  function renderServicesManager() {
    const list = document.getElementById('admin-services-list');
    if (!list) return;

    list.innerHTML = (cmsData.services || [])
      .map(
        (srv, idx) => `
      <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between gap-4">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
              Service #${idx + 1} • Icon: ${escapeHtml(srv.icon)}
            </span>
            <div class="flex items-center gap-2">
              <button type="button" data-edit-srv="${idx}" class="edit-srv-btn text-xs font-bold text-blue-600 hover:underline">Edit</button>
              <button type="button" data-del-srv="${idx}" class="del-srv-btn text-xs font-semibold text-red-600 hover:underline">Delete</button>
            </div>
          </div>
          <h4 class="text-base font-bold text-slate-900 font-heading">${escapeHtml(srv.title)}</h4>
          <p class="text-xs text-slate-600 mt-1">${escapeHtml(srv.shortDesc)}</p>
          <p class="text-[11px] text-slate-500 mt-2 bg-white p-2.5 rounded-lg border border-slate-200/80">
            <strong>Case Study:</strong> ${escapeHtml(srv.caseStudy || 'N/A')}
          </p>
        </div>
      </div>
    `
      )
      .join('');

    list.querySelectorAll('.edit-srv-btn').forEach((btn) => {
      btn.addEventListener('click', () => openServiceEditor(Number(btn.getAttribute('data-edit-srv'))));
    });
    list.querySelectorAll('.del-srv-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-del-srv'));
        cmsData.services.splice(idx, 1);
        window.XporusStore.saveData(cmsData);
        showSaveToast();
        renderAllAdminViews();
      });
    });
  }

  document.getElementById('add-service-btn')?.addEventListener('click', () => openServiceEditor(-1));

  function openServiceEditor(idx) {
    const isNew = idx === -1;
    const srv = isNew
      ? {
          id: 'srv-' + Date.now(),
          title: '',
          shortDesc: '',
          fullDesc: '',
          icon: 'briefcase',
          caseStudy: '',
          deliverables: ['Strategic Planning', 'Compliance Audit']
        }
      : cmsData.services[idx];

    openUniversalModal(
      isNew ? 'Add New Service' : `Edit Service: ${srv.title}`,
      `
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Service Title *</label>
        <input name="title" required value="${escapeHtml(srv.title)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Lucide Icon Name (briefcase, trending-up, globe, search, shield-check, truck)</label>
        <input name="icon" required value="${escapeHtml(srv.icon)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Card Short Description *</label>
        <input name="shortDesc" required value="${escapeHtml(srv.shortDesc)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Detailed Modal Description</label>
        <textarea name="fullDesc" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(srv.fullDesc)}</textarea>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Case Study Highlight</label>
        <textarea name="caseStudy" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(srv.caseStudy)}</textarea>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Key Deliverables (Comma-separated)</label>
        <input name="deliverables" value="${escapeHtml((srv.deliverables || []).join(', '))}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
      </div>
    `,
      (formData) => {
        const updated = {
          ...srv,
          title: formData.get('title').trim(),
          icon: formData.get('icon').trim() || 'briefcase',
          shortDesc: formData.get('shortDesc').trim(),
          fullDesc: formData.get('fullDesc').trim(),
          caseStudy: formData.get('caseStudy').trim(),
          deliverables: formData
            .get('deliverables')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        };
        if (isNew) cmsData.services.push(updated);
        else cmsData.services[idx] = updated;
        window.XporusStore.saveData(cmsData);
        showSaveToast();
        renderAllAdminViews();
      }
    );
  }

  /* ==========================================================================
     5. Product Categories Manager (Medoc 3D Flip-Cards)
     ========================================================================== */
  function renderCategoriesManager() {
    const list = document.getElementById('admin-categories-list');
    if (!list) return;

    list.innerHTML = (cmsData.categories || [])
      .map(
        (cat, idx) => `
      <div class="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between">
        <div>
          <div class="h-32 bg-slate-900 relative">
            <img src="${escapeHtml(cat.image)}" alt="${escapeHtml(cat.title)}" class="w-full h-full object-cover opacity-70" />
            <div class="absolute inset-0 bg-blue-900/50 flex items-center justify-center p-3 text-center">
              <h4 class="text-sm font-extrabold uppercase tracking-wider text-white font-heading">${escapeHtml(cat.title)}</h4>
            </div>
            ${
              cat.featured
                ? `<span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">Core 8 Grid</span>`
                : ''
            }
          </div>
          <div class="p-4">
            <p class="text-[11px] font-bold uppercase text-slate-400 mb-1.5">Flipped Back Subcategories:</p>
            <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml((cat.subcategories || []).join(' • '))}</p>
          </div>
        </div>
        <div class="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[11px] font-semibold text-slate-500 uppercase">Group: ${escapeHtml(cat.group)}</span>
          <div class="flex items-center gap-2.5">
            <button type="button" data-edit-cat="${idx}" class="edit-cat-btn text-xs font-bold text-blue-600 hover:underline">Edit</button>
            <button type="button" data-del-cat="${idx}" class="del-cat-btn text-xs font-semibold text-red-600 hover:underline">Delete</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    list.querySelectorAll('.edit-cat-btn').forEach((btn) => {
      btn.addEventListener('click', () => openCategoryEditor(Number(btn.getAttribute('data-edit-cat'))));
    });
    list.querySelectorAll('.del-cat-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-del-cat'));
        cmsData.categories.splice(idx, 1);
        window.XporusStore.saveData(cmsData);
        showSaveToast();
        renderAllAdminViews();
      });
    });
  }

  document.getElementById('add-category-btn')?.addEventListener('click', () => openCategoryEditor(-1));

  function openCategoryEditor(idx) {
    const isNew = idx === -1;
    const cat = isNew
      ? {
          id: 'cat-' + Date.now(),
          title: '',
          group: 'furniture',
          featured: true,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
          subcategories: ['Custom Design', 'Private Label', 'Export Grade']
        }
      : cmsData.categories[idx];

    openUniversalModal(
      isNew ? 'Add Product Category Flip-Card' : `Edit Category: ${cat.title}`,
      `
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Category Uppercase Title *</label>
        <input name="title" required value="${escapeHtml(cat.title)}" placeholder="e.g. FURNITURE" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm uppercase font-bold" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Filter Group</label>
          <select name="group" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white">
            ${['furniture', 'lighting', 'textiles', 'kitchen', 'decor', 'fashion']
              .map((g) => `<option value="${g}" ${cat.group === g ? 'selected' : ''}>${g}</option>`)
              .join('')}
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Show in Core 8 Grid?</label>
          <select name="featured" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white">
            <option value="true" ${cat.featured ? 'selected' : ''}>Yes (Featured Core 8)</option>
            <option value="false" ${!cat.featured ? 'selected' : ''}>Show in All Tab Only</option>
          </select>
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Background Image URL *</label>
        <input name="image" required value="${escapeHtml(cat.image)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Subcategories on Flipped Back Panel (Comma-separated) *</label>
        <textarea name="subcategories" rows="3" required class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(
          (cat.subcategories || []).join(', ')
        )}</textarea>
      </div>
    `,
      (formData) => {
        const updated = {
          ...cat,
          title: formData.get('title').trim().toUpperCase(),
          group: formData.get('group'),
          featured: formData.get('featured') === 'true',
          image: formData.get('image').trim(),
          subcategories: formData
            .get('subcategories')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        };
        if (isNew) cmsData.categories.push(updated);
        else cmsData.categories[idx] = updated;
        window.XporusStore.saveData(cmsData);
        showSaveToast();
        renderAllAdminViews();
      }
    );
  }

  /* ==========================================================================
     6. Leadership Team Manager (4 Co-Founders)
     ========================================================================== */
  function renderTeamManager() {
    const list = document.getElementById('admin-team-list');
    if (!list) return;

    list.innerHTML = (cmsData.team || [])
      .map(
        (m, idx) => `
      <div class="p-4 rounded-2xl border border-slate-200 bg-white flex items-start gap-4">
        <img src="${escapeHtml(m.image)}" alt="${escapeHtml(m.name)}" class="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-slate-900 font-heading">${escapeHtml(m.name)}</h4>
            <div class="flex items-center gap-2">
              <button type="button" data-edit-team="${idx}" class="edit-team-btn text-xs font-bold text-blue-600 hover:underline">Edit</button>
              <button type="button" data-del-team="${idx}" class="del-team-btn text-xs font-semibold text-red-600 hover:underline">Delete</button>
            </div>
          </div>
          <p class="text-xs font-semibold text-blue-600">${escapeHtml(m.role)} • ${escapeHtml(m.specialty)}</p>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed">${escapeHtml(m.bio)}</p>
        </div>
      </div>
    `
      )
      .join('');

    list.querySelectorAll('.edit-team-btn').forEach((btn) => {
      btn.addEventListener('click', () => openTeamEditor(Number(btn.getAttribute('data-edit-team'))));
    });
    list.querySelectorAll('.del-team-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-del-team'));
        cmsData.team.splice(idx, 1);
        window.XporusStore.saveData(cmsData);
        showSaveToast();
        renderAllAdminViews();
      });
    });
  }

  document.getElementById('add-team-btn')?.addEventListener('click', () => openTeamEditor(-1));

  function openTeamEditor(idx) {
    const isNew = idx === -1;
    const member = isNew
      ? {
          id: 'tm-' + Date.now(),
          name: '',
          role: 'Co-Founder',
          badge: 'Executive',
          specialty: '',
          bio: '',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80'
        }
      : cmsData.team[idx];

    openUniversalModal(
      isNew ? 'Add Leadership Member' : `Edit Leader: ${member.name}`,
      `
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
          <input name="name" required value="${escapeHtml(member.name)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Title / Role *</label>
          <input name="role" required value="${escapeHtml(member.role)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Blue Pill Badge</label>
          <input name="badge" value="${escapeHtml(member.badge || 'Executive')}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Specialty Focus</label>
          <input name="specialty" value="${escapeHtml(member.specialty)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Portrait Photo URL *</label>
        <input name="image" required value="${escapeHtml(member.image)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Executive Bio</label>
        <textarea name="bio" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(member.bio)}</textarea>
      </div>
    `,
      (formData) => {
        const updated = {
          ...member,
          name: formData.get('name').trim(),
          role: formData.get('role').trim(),
          badge: formData.get('badge').trim() || 'Executive',
          specialty: formData.get('specialty').trim(),
          image: formData.get('image').trim(),
          bio: formData.get('bio').trim()
        };
        if (isNew) cmsData.team.push(updated);
        else cmsData.team[idx] = updated;
        window.XporusStore.saveData(cmsData);
        showSaveToast();
        renderAllAdminViews();
      }
    );
  }

  /* ==========================================================================
     7. Client Testimonials Manager
     ========================================================================== */
  function renderTestimonialsManager() {
    const list = document.getElementById('admin-testimonials-list');
    if (!list) return;

    list.innerHTML = (cmsData.testimonials || [])
      .map(
        (t, idx) => `
      <div class="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between gap-3">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-amber-500 font-bold text-xs">${'★'.repeat(Number(t.rating) || 5)} (${t.country})</span>
            <div class="flex items-center gap-2">
              <button type="button" data-edit-tst="${idx}" class="edit-tst-btn text-xs font-bold text-blue-600 hover:underline">Edit</button>
              <button type="button" data-del-tst="${idx}" class="del-tst-btn text-xs font-semibold text-red-600 hover:underline">Delete</button>
            </div>
          </div>
          <p class="text-xs text-slate-700 italic leading-relaxed mb-3">“${escapeHtml(t.quote)}”</p>
        </div>
        <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
          <img src="${escapeHtml(t.avatar)}" alt="${escapeHtml(t.clientName)}" class="w-10 h-10 rounded-full object-cover" />
          <div>
            <h4 class="text-xs font-bold text-slate-900">${escapeHtml(t.clientName)}</h4>
            <p class="text-[11px] text-slate-500">${escapeHtml(t.clientRole)} • ${escapeHtml(t.company)}</p>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    list.querySelectorAll('.edit-tst-btn').forEach((btn) => {
      btn.addEventListener('click', () => openTestimonialEditor(Number(btn.getAttribute('data-edit-tst'))));
    });
    list.querySelectorAll('.del-tst-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-del-tst'));
        cmsData.testimonials.splice(idx, 1);
        window.XporusStore.saveData(cmsData);
        showSaveToast();
        renderAllAdminViews();
      });
    });
  }

  document.getElementById('add-testimonial-btn')?.addEventListener('click', () => openTestimonialEditor(-1));

  function openTestimonialEditor(idx) {
    const isNew = idx === -1;
    const tst = isNew
      ? {
          id: 'tst-' + Date.now(),
          clientName: '',
          clientRole: '',
          company: '',
          country: 'USA',
          rating: 5,
          quote: '',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        }
      : cmsData.testimonials[idx];

    openUniversalModal(
      isNew ? 'Add Client Testimonial' : `Edit Review: ${tst.clientName}`,
      `
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Client Name *</label>
          <input name="clientName" required value="${escapeHtml(tst.clientName)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Role / Title *</label>
          <input name="clientRole" required value="${escapeHtml(tst.clientRole)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Company &amp; Location *</label>
          <input name="company" required value="${escapeHtml(tst.company)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Country Badge</label>
          <input name="country" value="${escapeHtml(tst.country)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Client Avatar URL</label>
        <input name="avatar" value="${escapeHtml(tst.avatar)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Client Review Quote *</label>
        <textarea name="quote" rows="3" required class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(tst.quote)}</textarea>
      </div>
    `,
      (formData) => {
        const updated = {
          ...tst,
          clientName: formData.get('clientName').trim(),
          clientRole: formData.get('clientRole').trim(),
          company: formData.get('company').trim(),
          country: formData.get('country').trim() || 'Global',
          avatar: formData.get('avatar').trim(),
          quote: formData.get('quote').trim(),
          rating: 5
        };
        if (isNew) cmsData.testimonials.push(updated);
        else cmsData.testimonials[idx] = updated;
        window.XporusStore.saveData(cmsData);
        showSaveToast();
        renderAllAdminViews();
      }
    );
  }

  /* ==========================================================================
     8. Subscribers & JSON Backup / Factory Reset
     ========================================================================== */
  function renderSubscribersAndBackup() {
    const ul = document.getElementById('admin-subscribers-list');
    if (!ul) return;
    const subs = cmsData.subscribers || [];
    ul.innerHTML = subs.length
      ? subs
          .map(
            (s) => `
        <li class="py-2.5 flex items-center justify-between">
          <span class="font-semibold text-slate-800">${escapeHtml(s.email)}</span>
          <span class="text-slate-400">${escapeHtml(s.date)}</span>
        </li>
      `
          )
          .join('')
      : `<li class="py-4 text-slate-400">No subscribers yet.</li>`;
  }

  document.getElementById('export-json-btn')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(cmsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Xporus_International_CMS_Backup.json';
    a.click();
  });

  document.getElementById('reset-defaults-btn')?.addEventListener('click', () => {
    cmsData = window.XporusStore.resetToDefault();
    showSaveToast();
    renderAllAdminViews();
  });

  /* ==========================================================================
     Universal Modal Helper
     ========================================================================== */
  let currentModalSubmitHandler = null;
  const editorModal = document.getElementById('admin-editor-modal');
  const editorForm = document.getElementById('admin-editor-form');

  function openUniversalModal(title, fieldsHtml, onSubmit) {
    document.getElementById('editor-modal-title').textContent = title;
    document.getElementById('editor-modal-fields').innerHTML = fieldsHtml;
    currentModalSubmitHandler = onSubmit;
    editorModal.classList.remove('hidden');
  }

  function closeUniversalModal() {
    editorModal.classList.add('hidden');
    currentModalSubmitHandler = null;
  }

  document.getElementById('close-editor-modal')?.addEventListener('click', closeUniversalModal);
  document.getElementById('cancel-editor-modal')?.addEventListener('click', closeUniversalModal);

  editorForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (currentModalSubmitHandler) {
      currentModalSubmitHandler(new FormData(editorForm));
    }
    closeUniversalModal();
  });

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
