/* Henrique Silva — interactions
   1. Menu + header state
   2. Hero stage: wireframe → real screenshot, cycling through the live projects
   3. Scroll-linked pieces: 9-year ruler, process line, headline widening
   4. Layer stack and portfolio preview (respond to the visitor's pointer/focus)
   5. Bilingual content (PT / EN) with fixed regional pricing */

(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const isEN = () => document.documentElement.lang === 'en';

  /* ---------- menu ---------- */
  const header = $('.site-header');
  const toggle = $('#menu-toggle');
  const menu = $('#main-nav');
  const setToggleLabel = (open) => toggle?.setAttribute('aria-label', isEN() ? (open ? 'Close menu' : 'Open menu') : (open ? 'Fechar menu' : 'Abrir menu'));
  function closeMenu() {
    header?.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
    setToggleLabel(false);
  }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    header?.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    setToggleLabel(open);
  });
  $$('a', menu).forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); }, { passive: true });

  /* ---------- hero stage ---------- */
  const rows = $$('.work-row');
  const projects = rows.map(row => ({
    row,
    img: row.dataset.img,
    host: row.dataset.host,
    href: row.href,
    name: $('.work-name', row).textContent.trim()
  }));
  // Warm the cache so swaps never flash.
  projects.forEach(p => { const i = new Image(); i.src = p.img; });

  const stageView = $('.stage-view');
  const stageImg = $('#stage-img');
  const stageUrl = $('#stage-url');
  const stageName = $('#stage-name');
  const stageSector = $('#stage-sector');
  const stageLink = $('#stage-link');
  const ticks = $('#stage-ticks');
  const stage = $('.hero-stage');
  let current = 0, timer, typing, paused = false;

  projects.forEach((p, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', p.name);
    b.addEventListener('click', () => { show(i); restart(); });
    ticks?.appendChild(b);
  });

  function typeUrl(text) {
    clearInterval(typing);
    if (reduce) { stageUrl.textContent = text; return; }
    let n = 0; stageUrl.textContent = '';
    typing = setInterval(() => {
      stageUrl.textContent = text.slice(0, ++n);
      if (n >= text.length) clearInterval(typing);
    }, 28);
  }
  function updateCaption() {
    const p = projects[current];
    stageName.textContent = p.name;
    stageSector.textContent = $('.work-sector', p.row).textContent.trim();
    stageLink.href = p.href;
  }
  function show(i, first = false) {
    current = (i + projects.length) % projects.length;
    const p = projects[current];
    $$('button', ticks).forEach((b, k) => b.setAttribute('aria-current', String(k === current)));
    updateCaption();
    stageImg.alt = $('.work-thumb', p.row)?.alt || '';
    if (reduce) { stageImg.src = p.img; stageUrl.textContent = p.host; return; }
    stageView.classList.add('building');
    typeUrl(p.host);
    setTimeout(() => {
      stageImg.src = p.img;
      const reveal = () => stageView.classList.remove('building');
      (stageImg.decode ? stageImg.decode() : Promise.resolve()).then(reveal, reveal);
    }, first ? 1200 : 750);
  }
  function restart() {
    clearInterval(timer);
    if (reduce) return;
    timer = setInterval(() => { if (!paused && !document.hidden) show(current + 1); }, 5200);
  }
  if (stageView && projects.length) {
    show(0, true);
    restart();
    stage.addEventListener('pointerenter', () => { paused = true; });
    stage.addEventListener('pointerleave', () => { paused = false; });
    stage.addEventListener('focusin', () => { paused = true; });
    stage.addEventListener('focusout', () => { paused = false; });
  }

  /* ---------- orbit dots (the HS monogram's orbit) ---------- */
  const dots = $$('[data-orbit]').map(dot => {
    const e = $(dot.dataset.orbit);
    return { dot, cx: +e.getAttribute('cx'), cy: +e.getAttribute('cy'), rx: +e.getAttribute('rx'), ry: +e.getAttribute('ry'), period: (+dot.dataset.period || 14) * 1000 };
  });
  if (dots.length && !reduce) {
    const spin = (now) => {
      dots.forEach(o => {
        const t = Math.PI + (now / o.period) * Math.PI * 2;
        o.dot.setAttribute('cx', (o.cx + o.rx * Math.cos(t)).toFixed(1));
        o.dot.setAttribute('cy', (o.cy + o.ry * Math.sin(t)).toFixed(1));
      });
      requestAnimationFrame(spin);
    };
    requestAnimationFrame(spin);
  }

  /* ---------- headlines widen as they enter ---------- */
  const widen = $$('.h2, .contact-title');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .15 });
    widen.forEach(el => io.observe(el));
  } else widen.forEach(el => el.classList.add('in'));

  /* ---------- layer stack ---------- */
  const stack = $('#stack');
  const plates = $$('.plate', stack || document);
  const layerButtons = $$('#layers-list button');
  function activateLayer(i) {
    layerButtons.forEach((b, k) => { b.classList.toggle('active', k === i); b.setAttribute('aria-pressed', String(k === i)); });
    plates.forEach((p, k) => p.classList.toggle('active', k === i));
  }
  layerButtons.forEach((b, i) => {
    b.addEventListener('mouseenter', () => activateLayer(i));
    b.addEventListener('focus', () => activateLayer(i));
    b.addEventListener('click', () => activateLayer(i));
  });
  if (stack) {
    if ('IntersectionObserver' in window && !reduce) {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        stack.classList.add('in');
        setTimeout(() => { stack.classList.add('settled'); activateLayer(0); }, 1100);
        io.disconnect();
      }, { threshold: .35 });
      io.observe(stack);
    } else { stack.classList.add('in', 'settled'); activateLayer(0); }
  }

  /* ---------- portfolio preview ---------- */
  const imgA = $('#preview-a'), imgB = $('#preview-b'), previewUrl = $('#preview-url');
  let front = imgA, back = imgB, activeRow = null;
  function preview(row) {
    if (row === activeRow) return;
    activeRow?.classList.remove('active');
    activeRow = row;
    row.classList.add('active');
    if (!imgA) return;
    previewUrl.textContent = row.dataset.host;
    if (front.getAttribute('src') === row.dataset.img) return;
    back.src = row.dataset.img;
    front.classList.remove('is-on'); front.classList.add('is-leaving');
    back.classList.remove('is-leaving');
    void back.offsetWidth; // restart the wipe
    back.classList.add('is-on');
    [front, back] = [back, front];
  }
  rows.forEach(r => {
    r.addEventListener('mouseenter', () => preview(r));
    r.addEventListener('focus', () => preview(r));
  });
  if (rows[0]) preview(rows[0]);

  /* ---------- scroll-linked: header, ruler, process line, nav ---------- */
  const ruler = $('#ruler');
  const years = $$('.ruler-years li');
  const steps = $('#steps');
  const stepItems = $$('.step');
  const wa = $('.floating-whatsapp');
  const contact = $('#contato');
  const navLinks = $$('#main-nav a[href^="#"]');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const progressOf = (el, start = .85, end = .35) => {
    const r = el.getBoundingClientRect();
    return clamp((innerHeight * start - r.top) / (innerHeight * (start - end) || 1));
  };
  let ticking = false;
  function onScroll() {
    ticking = false;
    header?.classList.toggle('scrolled', scrollY > 12);
    if (ruler) {
      const p = reduce ? 1 : progressOf(ruler, .9, .45);
      ruler.style.setProperty('--p', p.toFixed(3));
      years.forEach((y, i) => y.classList.toggle('lit', p >= i / (years.length - 1) - .001));
    }
    if (steps) {
      const p = reduce ? 1 : progressOf(steps, .8, .4);
      steps.style.setProperty('--p', p.toFixed(3));
      stepItems.forEach((s, i) => s.classList.toggle('lit', p >= i / Math.max(1, stepItems.length - 1) - .02));
    }
    if (wa && contact) {
      const r = contact.getBoundingClientRect();
      wa.classList.toggle('hidden', r.top < innerHeight * .7 && r.bottom > 0);
    }
    let currentSection = null;
    sections.forEach(sec => { if (sec.getBoundingClientRect().top < innerHeight * .4) currentSection = sec; });
    navLinks.forEach(a => a.classList.toggle('current', currentSection && a.getAttribute('href') === '#' + currentSection.id));
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------- bilingual ---------- */
  const english = {
    'skip': 'Skip to content',
    'brand.role': 'Web development',
    'nav.exp': 'Experience', 'nav.work': 'Work', 'nav.process': 'Process', 'nav.plans': 'Pricing', 'nav.cta': 'Chat on WhatsApp',
    'hero.title': 'I’ve been building business websites for 9&nbsp;years.',
    'hero.lede': 'Design, development, hosting and maintenance handled by the same person from start to finish. Since I also work in IT, the technical side of your website is never an afterthought.',
    'hero.cta': 'Get a quote on WhatsApp',
    'hero.secondary': 'See live websites',
    'fact.years': 'years in web development',
    'fact.sites': 'live websites in this portfolio',
    'fact.care': 'months of maintenance on every plan',
    'exp.title': 'Nine years of launching, refining and maintaining websites.',
    'exp.text': 'I started in web development in 2017 and also work in Information Technology. That means I take care of what visitors see and what happens behind the scenes: domain, hosting, setup and maintenance.',
    'ruler.start': 'First websites',
    'ruler.end': 'Today: 7 live projects',
    'layers.title': 'Everything a website needs, from one person.',
    'layers.intro': 'Hover or tap each layer. The ones marked in blue are where my IT background makes a difference.',
    'l0.name': 'Content and structure', 'l0.desc': 'I organize the pages so visitors understand what you do within seconds.',
    'l1.name': 'Design that fits your brand', 'l1.desc': 'Your colors, typography and imagery. No off-the-shelf templates.',
    'l2.name': 'Phone, tablet and desktop', 'l2.desc': 'Every page is tested on all three sizes before it goes live.',
    'l3.name': 'Development', 'l3.desc': 'Code written for your project, lightweight and easy to update.',
    'l4.name': 'Speed and Google', 'l4.desc': 'Optimized images, fast loading and a structure search engines understand.',
    'l5.name': 'Domain and hosting', 'l5.desc': 'Registration, setup and launch. You never have to deal with a technical dashboard.',
    'l6.name': 'Maintenance', 'l6.desc': 'Adjustments, updates and support for 12 months after delivery.',
    'work.title': 'Websites I built that are live right now.',
    'work.text': 'Technology companies, healthcare, services and communities. Hover to preview each one and click to open the live site.',
    'p1.sector': 'Motorcycle club', 'p1.desc': 'Black and red identity with the club’s history, rides, merchandise and community access.',
    'p2.sector': 'Information technology', 'p2.desc': 'IT services, equipment management and printing solutions.',
    'p3.sector': 'Outsourced services', 'p3.desc': 'Corporate website with service pages and commercial proposal requests.',
    'p4.sector': 'Pilates and physiotherapy', 'p4.desc': 'Treatments overview with direct access to booking.',
    'p5.sector': 'Information technology', 'p5.desc': 'Technical support, IT management and business solutions.',
    'p6.sector': 'Pilates and wellness', 'p6.desc': 'Studio in Alphaville, with classes and quick booking.',
    'p7.sector': 'Healthcare workers’ union', 'p7.desc': 'Services, documents and contact channels for healthcare workers.',
    'process.title': 'From the first WhatsApp message to a live website.',
    's1.t': 'Conversation', 's1.p': 'I learn about your business, your customers and which pages the site needs.',
    's2.t': 'Layout', 's2.p': 'I design the look around your brand and you approve it before I start coding.',
    's3.t': 'Development', 's3.p': 'I build the pages and test them on phones, tablets and computers.',
    's4.t': 'Launch', 's4.p': 'I publish it on your domain and keep handling the maintenance in your plan.',
    'pricing.title': 'Three formats, the same level of care.',
    'pricing.text': 'All of them include a responsive website, hosting and 12 months of maintenance.',
    'plan1.name': 'Basic Website', 'plan1.sub': 'To present your services and receive enquiries.',
    'plan1.f1': '1 to 3 pages', 'plan1.f2': 'Responsive design', 'plan1.f3': 'WhatsApp button', 'plan1.f4': 'Hosting included', 'plan1.f5': '12 months of maintenance',
    'plan2.flag': 'Most requested', 'plan2.name': 'Professional Website', 'plan2.sub': 'More pages and customization for growing businesses.',
    'plan2.f1': '4 to 8 pages', 'plan2.f2': 'Design built on your brand identity', 'plan2.f3': 'Animations and SEO', 'plan2.f4': 'Hosting and backups', 'plan2.f5': '12 months of maintenance',
    'plan3.name': 'Business Website', 'plan3.sub': 'Fully tailored project with integrations and advanced features.',
    'plan3.f1': 'Custom-built project', 'plan3.f2': 'Advanced integrations and features', 'plan3.f3': 'Performance optimization', 'plan3.f4': 'Priority support', 'plan3.f5': '12 months of maintenance',
    'plan.cta': 'Choose this plan',
    'pricing.note': 'Not sure which one fits?', 'pricing.noteLink': 'Tell me what you need and I’ll recommend one.',
    'contact.title': 'Shall we put your business online?',
    'contact.text': 'Send me a message about what you do and what you expect from the website. I reply personally, usually the same day.',
    'contact.cta': 'Chat on WhatsApp',
    'footer.top': 'Back to top'
  };
  const localized = $$('[data-i18n]');
  const original = new Map(localized.map(el => [el, el.innerHTML]));
  const switchButtons = $$('.lang-option');
  const plans = $$('.plans .plan');
  const prices = {
    pt: [{ name: 'Site Básico', number: '1.499', label: 'R$ 1.499' }, { name: 'Site Profissional', number: '2.999', label: 'R$ 2.999' }, { name: 'Site Empresarial', number: '4.999', label: 'R$ 4.999' }],
    en: [{ name: 'Basic Website', number: '399', label: '€399' }, { name: 'Professional Website', number: '699', label: '€699' }, { name: 'Business Website', number: '999', label: '€999' }]
  };
  const copy = {
    pt: {
      title: 'Henrique Silva — Sites para empresas',
      description: 'Criação de sites profissionais por Henrique Silva: 9 anos em desenvolvimento web e experiência em TI. Veja sites publicados e peça um orçamento pelo WhatsApp.',
      ogTitle: 'Henrique Silva — Criação de Sites Profissionais',
      ogDescription: '9 anos fazendo sites para empresas. Design, programação, hospedagem e manutenção com a mesma pessoa.',
      wa: {
        nav: 'Olá, Henrique! Quero conversar sobre a criação de um site.',
        hero: 'Olá, Henrique! Vi seu portfólio e quero um orçamento para um site.',
        guidance: 'Olá, Henrique! Gostaria de ajuda para escolher o plano ideal para o meu site.',
        contact: 'Olá, Henrique! Quero conversar sobre a criação do meu site.',
        floating: 'Olá, Henrique! Gostaria de um orçamento para meu site.'
      }
    },
    en: {
      title: 'Henrique Silva — Websites for businesses',
      description: 'Professional websites by Henrique Silva: 9 years in web development plus IT experience. See live projects and get a quote on WhatsApp.',
      ogTitle: 'Henrique Silva — Professional Website Development',
      ogDescription: '9 years building business websites. Design, development, hosting and maintenance from one person.',
      wa: {
        nav: 'Hi Henrique! I’d like to talk about building a website.',
        hero: 'Hi Henrique! I saw your portfolio and would like a quote for a website.',
        guidance: 'Hi Henrique! Could you help me choose the right website package?',
        contact: 'Hi Henrique! I’d like to discuss building my website.',
        floating: 'Hi Henrique! I’d like a quote for a new website.'
      }
    }
  };
  const setMeta = (key, value) => {
    const sel = key === 'description' ? 'meta[name="description"]' : `meta[property="${key}"]`;
    $(sel)?.setAttribute('content', value);
  };
  const setWhatsApp = (lang) => {
    $$('[data-wa]').forEach(link => {
      const key = link.dataset.wa;
      let message = copy[lang].wa[key];
      const planIndex = { basic: 0, professional: 1, business: 2 }[key];
      if (planIndex !== undefined) {
        const { name, label } = prices[lang][planIndex];
        message = lang === 'en'
          ? `Hi Henrique! I’m interested in the ${name} package priced at ${label}. Can we talk?`
          : `Olá, Henrique! Tenho interesse no ${name} de ${label}. Podemos conversar?`;
      }
      if (message) link.href = 'https://wa.me/5511996388468?text=' + encodeURIComponent(message);
    });
  };
  function applyLanguage(locale, save = true) {
    const lang = locale === 'en' ? 'en' : 'pt';
    localized.forEach(el => { el.innerHTML = lang === 'en' ? (english[el.dataset.i18n] ?? original.get(el)) : original.get(el); });
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = copy[lang].title;
    setMeta('description', copy[lang].description);
    setMeta('og:title', copy[lang].ogTitle);
    setMeta('og:description', copy[lang].ogDescription);
    setMeta('og:locale', lang === 'en' ? 'en_US' : 'pt_BR');
    plans.forEach((plan, i) => {
      $('.plan-price small', plan).textContent = lang === 'en' ? '€' : 'R$';
      $('.plan-price strong', plan).textContent = prices[lang][i].number;
    });
    for (const attr of ['aria-label', 'title', 'alt']) {
      $$(`[data-i18n-${attr}]`).forEach(el => el.setAttribute(attr, el.getAttribute(`data-${lang === 'en' ? 'i18n' : 'pt'}-${attr}`)));
    }
    $('.lang')?.setAttribute('aria-label', lang === 'en' ? 'Select language' : 'Selecionar idioma');
    setToggleLabel(toggle?.getAttribute('aria-expanded') === 'true');
    switchButtons.forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
    setWhatsApp(lang);
    if (stageSector && projects.length) updateCaption();
    if (save) { try { localStorage.setItem('hs-site-language', lang); } catch (_) { /* storage unavailable */ } }
  }
  switchButtons.forEach(b => b.addEventListener('click', () => applyLanguage(b.dataset.lang)));
  let saved = 'pt';
  try { saved = localStorage.getItem('hs-site-language') === 'en' ? 'en' : 'pt'; } catch (_) { /* storage unavailable */ }
  applyLanguage(saved, false);
})();
