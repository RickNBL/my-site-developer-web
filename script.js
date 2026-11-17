/* Henrique Silva — interactions, motion and bilingual content */
(() => {
  'use strict';
  const doc = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  if (reduce) doc.classList.add('no-motion');

  /* ---------------------------------------------------------
     Bilingual content (PT lives in the HTML, EN here)
     --------------------------------------------------------- */
  const english = {
    skip:'Skip to content',
    nav_work:'Work', nav_exp:'Experience', nav_process:'Process', nav_plans:'Pricing',
    nav_mobile_cta:'Chat on WhatsApp ↗', nav_cta:'Let’s talk',
    hero_role:'Website design and development for businesses.',
    hero_lede:'From layout to code, from hosting to maintenance. Nine years of web development, backed by hands-on experience in IT.',
    fact_years:'years in web development', fact_sites:'live websites in this portfolio', fact_lang:'clients in Brazil and abroad',
    hero_cta:'Start my project', hero_link:'See live websites',
    about_title:'About my work',
    manifesto:'Every business has its own way of serving, selling and talking to customers. My job is to turn that into a fast, clear and easy-to-use website, built from scratch for your brand.',
    reel_caption:'I’m Henrique Silva. I’ve been building websites for 9 years and also work in Information Technology. I handle design, code, mobile responsiveness and launch.',
    q1_title:'Design made for your brand', q1_text:'Layouts built from scratch with your company’s colors, fonts and identity. No ready-made templates.',
    q2_title:'Fast on every screen', q2_text:'Your website adapts to phones, tablets and computers, with simple navigation and light loading.',
    q3_title:'Built to bring in contacts', q3_text:'Content is organized so visitors understand your services and reach your WhatsApp in a few taps.',
    exp_title:'Nine years building websites that work.',
    exp_lede:'I’ve been developing for the web since 2017. My IT background completes the work: beyond the visuals, I take care of domain, hosting, performance and everything that keeps a website online.',
    exp_unit:'years', exp_sr:'Timeline from 2017 to 2026: nine years of web development.',
    skills_title:'What I deliver on every project',
    s1:'Interface design', s1d:'Layout, typography and hierarchy designed around your brand.',
    s2:'Front-end development', s2d:'Clean, semantic code with no unnecessary dependencies.',
    s3:'Responsive websites', s3d:'Tested on phones, tablets and computers.',
    s4:'Technical SEO', s4d:'Structure and metadata that help Google understand your website.',
    s5:'Performance', s5d:'Optimized images and fast loading.',
    s6:'Domain and hosting', s6d:'Setup, launch and security certificate.',
    s7:'IT support', s7d:'The technical view of someone who also works with infrastructure.',
    s8:'Maintenance', s8d:'12 months of updates and adjustments on every plan.',
    work_title:'Websites that are live.',
    work_lede:'Real projects for businesses, professionals, organizations and communities. Click any of them to open the live website.',
    w1k:'Motorcycle club', w1d:'A bold black and red identity, with history, rides, merchandise and community access.',
    w2k:'Information technology', w2d:'Business website for IT services, equipment management and printing solutions.',
    w3k:'Outsourced services', w3d:'Corporate website with service pages and a clear path to request proposals.',
    w4k:'Pilates & physiotherapy', w4d:'Pilates and physiotherapy services, with direct access to booking.',
    w5k:'Information technology', w5d:'Corporate website for technical support, IT management and business solutions.',
    w6k:'Pilates & wellness', w6d:'A Pilates studio in Alphaville, presenting classes with quick booking.',
    w7k:'Labor union', w7d:'Website for a healthcare workers’ union, with services, documents and contact channels.',
    work_foot:'Want the next website on this list to be yours?', work_foot_cta:'Request a quote ↗',
    process_title:'From first conversation to launch.',
    process_lede:'You stay involved in the key decisions. I take care of structure, design, code, testing and launch.',
    p1:'Discovery', p1d:'We talk about your business, the pages you need and what visitors should find.',
    p2:'Layout', p2d:'I organize the content and design visuals aligned with your brand identity.',
    p3:'Development', p3d:'I build the pages and test navigation on phones, tablets and computers.',
    p4:'Launch', p4d:'Once approved, your website goes live, followed by the maintenance in your plan.',
    pricing_title:'Packages for every stage of your business.',
    pricing_lede:'Every package includes responsive development, hosting and 12 months of maintenance.',
    plan1:'Basic Website', plan1s:'A clear, professional way to present your services and connect with customers.',
    plan1a:'1 to 3 pages', plan1b:'Responsive design', plan1c:'WhatsApp button', plan1d:'Hosting included', plan1e:'12 months of maintenance',
    plan_flag:'Recommended',
    plan2:'Professional Website', plan2s:'More pages and a custom design for growing businesses.',
    plan2a:'4 to 8 pages', plan2b:'Design tailored to your brand identity', plan2c:'Animations and SEO', plan2d:'Hosting + backups', plan2e:'12 months of maintenance',
    plan3:'Business Website', plan3s:'Fully tailored development with advanced features and integrations.',
    plan3a:'Custom-built project', plan3b:'Advanced integrations and features', plan3c:'Performance optimization', plan3d:'Priority support', plan3e:'12 months of maintenance',
    plan_cta1:'I want this package', plan_cta2:'I want this package', plan_cta3:'I want this package',
    pricing_note:'Not sure which one fits?', pricing_note_cta:'Get advice on WhatsApp ↗',
    contact_title:'Have a project in mind? Let’s talk.',
    contact_text:'Tell me what you need. I reply personally on WhatsApp.',
    contact_cta:'Chat on WhatsApp',
    footer_copy:'© <span class="year">2026</span> Henrique Silva. Website design and development.',
    footer_top:'Back to top ↑'
  };
  const prices = {
    pt:[{name:'Site Básico',number:'1.499',label:'R$ 1.499'},{name:'Site Profissional',number:'2.999',label:'R$ 2.999'},{name:'Site Empresarial',number:'4.999',label:'R$ 4.999'}],
    en:[{name:'Basic Website',number:'399',label:'€399'},{name:'Professional Website',number:'699',label:'€699'},{name:'Business Website',number:'999',label:'€999'}]
  };
  const copy = {
    pt:{
      title:'Henrique Silva — Design & Desenvolvimento Web',
      description:'Criação de sites profissionais e responsivos por Henrique Silva. 9 anos de desenvolvimento web, experiência em TI, portfólio de projetos reais e planos a partir de R$ 1.499.',
      ogTitle:'Henrique Silva — Criação de Sites Profissionais',
      ogDescription:'Sites empresariais personalizados, rápidos e responsivos. Conheça projetos reais e solicite um orçamento pelo WhatsApp.',
      cursorOpen:'Abrir',
      wa:{nav:'Olá, Henrique! Quero conversar sobre a criação de um site.',hero:'Olá, Henrique! Vi seu site e quero falar sobre um projeto.',portfolio:'Olá, Henrique! Gostei dos projetos do seu portfólio. Quero criar um site.',guidance:'Olá, Henrique! Gostaria de ajuda para escolher o plano ideal para o meu site.',contact:'Olá, Henrique! Quero conversar sobre a criação do meu site.',footer:'Olá, Henrique!',floating:'Olá, Henrique! Gostaria de um orçamento para meu site.'}
    },
    en:{
      title:'Henrique Silva — Professional Website Design & Development',
      description:'Professional websites and custom web development by Henrique Silva. 9 years of web development, IT experience, real projects and packages starting at €399.',
      ogTitle:'Henrique Silva — Professional Website Development',
      ogDescription:'Custom, responsive business websites. Explore real projects and request a quote directly on WhatsApp.',
      cursorOpen:'Open',
      wa:{nav:'Hi Henrique! I’d like to talk about building a website.',hero:'Hi Henrique! I saw your portfolio and would like to discuss a website project.',portfolio:'Hi Henrique! I liked the projects in your portfolio and would like a website for my business.',guidance:'Hi Henrique! Could you help me choose the right website package?',contact:'Hi Henrique! I’d like to discuss building my website.',footer:'Hi Henrique!',floating:'Hi Henrique! I’d like a quote for a new website.'}
    }
  };

  const localized = $$('[data-i18n]');
  const original = new Map(localized.map(el => [el, el.innerHTML]));
  const langButtons = $$('.lang-btn');
  const plans = $$('.plans .plan');
  let lang = 'pt';

  const setMeta = (key, value) => {
    const sel = key === 'description' ? 'meta[name="description"]' : `meta[property="${key}"]`;
    $(sel)?.setAttribute('content', value);
  };
  const setWhatsApp = () => {
    $$('[data-wa]').forEach(link => {
      const key = link.dataset.wa;
      let msg = copy[lang].wa[key];
      const planIndex = {basic:0, professional:1, business:2}[key];
      if (planIndex !== undefined) {
        const {name, label} = prices[lang][planIndex];
        msg = lang === 'en'
          ? `Hi Henrique! I’m interested in the ${name} package priced at ${label}. Can we talk?`
          : `Olá, Henrique! Tenho interesse no ${name} de ${label}. Podemos conversar?`;
      }
      if (msg) link.href = 'https://wa.me/5511996388468?text=' + encodeURIComponent(msg);
    });
  };
  const applyLanguage = (next, save = true) => {
    lang = next === 'en' ? 'en' : 'pt';
    localized.forEach(el => {
      const html = lang === 'en' ? english[el.dataset.i18n] : original.get(el);
      if (html !== undefined) el.innerHTML = html;
    });
    doc.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = copy[lang].title;
    setMeta('description', copy[lang].description);
    setMeta('og:title', copy[lang].ogTitle);
    setMeta('og:description', copy[lang].ogDescription);
    setMeta('og:locale', lang === 'en' ? 'en_US' : 'pt_BR');
    plans.forEach((plan, i) => {
      plan.querySelector('.plan-price small').textContent = lang === 'en' ? '€' : 'R$';
      plan.querySelector('.plan-price strong').textContent = prices[lang][i].number;
    });
    $$('[data-i18n-aria-label], [data-i18n-title]').forEach(el => {
      for (const attr of ['aria-label', 'title']) {
        if (el.hasAttribute('data-i18n-' + attr)) el.setAttribute(attr, el.getAttribute('data-' + (lang === 'en' ? 'i18n' : 'pt') + '-' + attr));
      }
    });
    $('.lang')?.setAttribute('aria-label', lang === 'en' ? 'Select language' : 'Selecionar idioma');
    $('#main-nav')?.setAttribute('aria-label', lang === 'en' ? 'Main navigation' : 'Navegação principal');
    langButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$('[data-cursor="Abrir"], [data-cursor="Open"]').forEach(el => { el.dataset.cursor = copy[lang].cursorOpen; });
    $$('.year').forEach(y => { y.textContent = String(new Date().getFullYear()); });
    setMenuLabel();
    setWhatsApp();
    splitManifesto();
    if (save) { try { localStorage.setItem('hs-site-language', lang); } catch (_) { /* storage unavailable */ } }
  };

  /* ---------------------------------------------------------
     Menu & header
     --------------------------------------------------------- */
  const header = $('.site-header');
  const toggle = $('#menu-toggle');
  const nav = $('#main-nav');
  function setMenuLabel() {
    if (!toggle) return;
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-label', lang === 'en' ? (open ? 'Close menu' : 'Open menu') : (open ? 'Fechar menu' : 'Abrir menu'));
  }
  const setMenu = open => {
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    setMenuLabel();
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (innerWidth > 900) setMenu(false); }, {passive:true});

  /* ---------------------------------------------------------
     Text splitting
     --------------------------------------------------------- */
  $$('[data-split]').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((c, i) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.style.setProperty('--i', i + (el.classList.contains('hero-line-2') ? 5 : 0));
      s.textContent = c;
      el.appendChild(s);
    });
  });
  const manifesto = $('#manifesto');
  let manifestoWords = [];
  function splitManifesto() {
    if (!manifesto) return;
    const words = manifesto.textContent.trim().split(/\s+/);
    manifesto.innerHTML = words.map(w => `<span class="w">${w.replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))}</span>`).join(' ');
    manifestoWords = $$('.w', manifesto);
    lastLit = -1;
  }
  let lastLit = -1;

  /* ---------------------------------------------------------
     Language init
     --------------------------------------------------------- */
  langButtons.forEach(b => b.addEventListener('click', () => applyLanguage(b.dataset.lang)));
  let saved = 'pt';
  try { saved = localStorage.getItem('hs-site-language') === 'en' ? 'en' : 'pt'; } catch (_) { /* storage unavailable */ }
  applyLanguage(saved, false);

  /* page-load sequence */
  requestAnimationFrame(() => requestAnimationFrame(() => doc.classList.add('is-loaded')));

  /* ---------------------------------------------------------
     Reveal observers
     --------------------------------------------------------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, {threshold:.2, rootMargin:'0px 0px -8% 0px'}) : null;
  $$('.draw, .contact, .reveal').forEach((el, i) => {
    if (el.classList.contains('draw')) el.style.transitionDelay = ((i % 4) * 0.08) + 's';
    io ? io.observe(el) : el.classList.add('in');
  });

  /* ---------------------------------------------------------
     Hero orbit: a ring that passes behind and in front of the name
     --------------------------------------------------------- */
  const stage = $('#hero-stage');
  const groups = $$('.orbit-g');
  const ringBack = $('.ring-back');
  const ringFront = $('.ring-front');
  const spheres = $$('.sphere');
  const orbit = {cx:500, cy:300, rx:470, ry:120, rot:-11, theta:-0.6, tRot:-11, tRy:120, mouseX:0, mouseY:0};
  function drawOrbit() {
    const {cx, cy, rx, ry} = orbit;
    ringBack.setAttribute('d', `M${cx - rx},${cy} A${rx},${ry} 0 0 1 ${cx + rx},${cy}`);
    ringFront.setAttribute('d', `M${cx + rx},${cy} A${rx},${ry} 0 0 1 ${cx - rx},${cy}`);
    groups.forEach(g => g.setAttribute('transform', `rotate(${orbit.rot.toFixed(2)} ${cx} ${cy})`));
    const x = cx + rx * Math.cos(orbit.theta);
    const y = cy + ry * Math.sin(orbit.theta);
    const depth = Math.sin(orbit.theta); // >0 front, <0 back
    const r = 13 + depth * 5;
    spheres.forEach((s, i) => {
      const isFront = i === 1;
      const visible = isFront ? depth >= 0 : depth < 0;
      s.setAttribute('cx', x.toFixed(1));
      s.setAttribute('cy', y.toFixed(1));
      s.setAttribute('r', visible ? r.toFixed(1) : 0);
    });
  }
  let heroVisible = true;
  let sphereIn = 0;
  if (stage && ringBack) {
    drawOrbit();
    if (!reduce) {
      stage.closest('.hero').addEventListener('pointermove', e => {
        const rect = stage.getBoundingClientRect();
        orbit.mouseX = ((e.clientX - rect.left) / rect.width - .5) * 2;
        orbit.mouseY = ((e.clientY - rect.top) / rect.height - .5) * 2;
      });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(stage);
      }
      const start = performance.now();
      const loop = now => {
        if (heroVisible) {
          const scrollFactor = clamp(scrollY / innerHeight);
          orbit.tRot = -11 + orbit.mouseY * -6 + orbit.mouseX * 4 + scrollFactor * 14;
          orbit.tRy = 120 + orbit.mouseY * 55 - scrollFactor * 60;
          orbit.rot = lerp(orbit.rot, orbit.tRot, .06);
          orbit.ry = lerp(orbit.ry, orbit.tRy, .06);
          sphereIn = clamp((now - start - 1500) / 900);
          orbit.theta += 0.0065 + scrollFactor * 0.02;
          drawOrbit();
          if (sphereIn < 1) spheres.forEach(s => { const r = +s.getAttribute('r'); s.setAttribute('r', (r * sphereIn).toFixed(1)); });
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }

  /* ---------------------------------------------------------
     Custom cursor + magnetic elements
     --------------------------------------------------------- */
  const cursor = $('.cursor');
  if (finePointer && !reduce && cursor) {
    doc.classList.add('has-cursor');
    const dot = $('.cursor-dot', cursor);
    const ring = $('.cursor-ring', cursor);
    const label = $('.cursor-label', cursor);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('pointermove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px)`;
      cursor.classList.remove('is-hidden');
    }, {passive:true});
    document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
    const follow = () => {
      rx = lerp(rx, mx, .18); ry = lerp(ry, my, .18);
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(follow);
    };
    follow();
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('a, button, [data-cursor]');
      const text = t?.dataset.cursor || '';
      cursor.classList.toggle('is-link', !!t);
      cursor.classList.toggle('has-label', !!text);
      label.textContent = text;
      cursor.classList.toggle('on-dark', !!e.target.closest('.experience, .contact, .site-footer, .marquee'));
    });

    $$('.magnetic').forEach(el => {
      const strength = el.classList.contains('contact-btn') ? .35 : .25;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 600);
      });
    });

    $$('.plan.spot').forEach(p => p.addEventListener('pointermove', e => {
      const r = p.getBoundingClientRect();
      p.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      p.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }));
  }

  /* ---------------------------------------------------------
     Work list ↔ browser preview
     --------------------------------------------------------- */
  const rows = $$('.work-row');
  const previewImgs = $$('.browser-view img');
  const browserUrl = $('#browser-url');
  const previewIndex = $('#preview-index');
  const browser = $('#browser');
  let activeWork = -1;
  const setWork = i => {
    if (i === activeWork || i < 0) return;
    rows.forEach((r, j) => r.classList.toggle('is-active', j === i));
    previewImgs.forEach((img, j) => {
      img.classList.toggle('was-active', j === activeWork);
      img.classList.toggle('is-active', j === i);
      if (j !== i && j !== activeWork) img.classList.remove('was-active');
    });
    if (previewImgs[i]) previewImgs[i].loading = 'eager';
    if (browserUrl) browserUrl.textContent = rows[i].dataset.url;
    if (previewIndex) previewIndex.textContent = String(i + 1);
    activeWork = i;
  };
  setWork(0);
  rows.forEach((row, i) => {
    row.addEventListener('pointerenter', () => setWork(i));
    row.addEventListener('focus', () => setWork(i));
  });
  // Preload preview images after page load so hover swaps are instant.
  window.addEventListener('load', () => setTimeout(() => previewImgs.forEach(img => { img.loading = 'eager'; }), 1200));
  if (browser && finePointer && !reduce) {
    const list = $('#work-list');
    list?.addEventListener('pointermove', e => {
      const r = list.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      browser.style.setProperty('--ry', (x * -6).toFixed(2) + 'deg');
      browser.style.setProperty('--rx', (y * 4).toFixed(2) + 'deg');
    });
    list?.addEventListener('pointerleave', () => { browser.style.setProperty('--ry', '0deg'); browser.style.setProperty('--rx', '0deg'); });
  }

  /* ---------------------------------------------------------
     Video: silent brand film that plays only while visible
     --------------------------------------------------------- */
  const video = $('#identity-video');
  if (video) {
    video.muted = true; video.defaultMuted = true; video.controls = false;
    const play = () => video.play().catch(() => { /* autoplay deferred by browser */ });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { e.isIntersecting ? play() : video.pause(); }, {threshold:.15}).observe(video);
    } else play();
  }

  /* ---------------------------------------------------------
     Scroll-driven motion (single rAF loop)
     --------------------------------------------------------- */
  const marquee = $('#marquee-track');
  if (marquee) marquee.innerHTML += marquee.innerHTML; // seamless loop
  const timeline = $('#timeline');
  const rulerFill = $('#ruler-fill');
  const rulerSphere = $('#ruler-sphere');
  const years = $$('#ruler-years li');
  const count = $('#year-count');
  const steps = $('#steps');
  const stepsFill = $('#steps-fill');
  const stepsSphere = $('#steps-sphere');
  const stepItems = $$('.step');
  const floating = $('.floating-wa');
  const navLinks = $$('.nav a[href^="#"]');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);

  let lastY = scrollY, marqueeX = 0, velocity = 0, ticking = false;

  const progressOf = (el, startAt = .85, endAt = .35) => {
    const r = el.getBoundingClientRect();
    const start = innerHeight * startAt;
    const end = innerHeight * endAt;
    return clamp((start - r.top) / (start - end + r.height * 0));
  };

  function onScroll() {
    const y = scrollY;
    const dy = y - lastY;
    // header: hide on scroll down, show on scroll up
    header.classList.toggle('scrolled', y > 20);
    if (!document.body.classList.contains('menu-open')) header.classList.toggle('hidden', dy > 4 && y > innerHeight * .6);
    if (dy < -4) header.classList.remove('hidden');
    velocity = dy;
    lastY = y;

    floating?.classList.toggle('show', y > innerHeight * .8);

    // manifesto words light up as it crosses the viewport
    if (manifesto && manifestoWords.length) {
      const p = reduce ? 1 : progressOf(manifesto, .85, .3);
      const lit = Math.round(p * manifestoWords.length);
      if (lit !== lastLit) {
        manifestoWords.forEach((w, i) => w.classList.toggle('lit', i < lit));
        lastLit = lit;
      }
    }

    // experience ruler + counter
    if (timeline) {
      const p = reduce ? 1 : progressOf(timeline, .9, .45);
      rulerFill?.style.setProperty('--p', p.toFixed(4));
      rulerSphere?.style.setProperty('--p', p.toFixed(4));
      const passed = Math.round(p * (years.length - 1));
      years.forEach((li, i) => li.classList.toggle('on', i <= passed && p > 0));
      if (count) count.textContent = String(Math.round(p * 9));
    }

    // process line
    if (steps) {
      const p = reduce ? 1 : progressOf(steps, .8, .35);
      stepsFill?.style.setProperty('--p', p.toFixed(4));
      stepsSphere?.style.setProperty('--p', p.toFixed(4));
      stepItems.forEach((s, i) => s.classList.toggle('on', p >= i / stepItems.length + .02 || p === 1));
    }

    // touch screens: the work row nearest the middle becomes active
    if (!finePointer && rows.length) {
      let best = 0, bestD = Infinity;
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); const d = Math.abs(b.top + b.height / 2 - innerHeight / 2); if (d < bestD) { bestD = d; best = i; } });
      setWork(best);
    }

    // current nav item
    let current = -1;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * .4) current = i; });
    navLinks.forEach((a, i) => a.classList.toggle('is-current', i === current));

    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, {passive:true});
  onScroll();

  // marquee runs continuously; scrolling speeds it up and reverses direction
  if (marquee && !reduce) {
    let dir = -1, boost = 0;
    const run = () => {
      if (Math.abs(velocity) > 0.5) dir = velocity > 0 ? -1 : 1;
      boost = lerp(boost, Math.min(Math.abs(velocity), 60) * .35, .1);
      velocity *= .9;
      marqueeX += dir * (0.6 + boost);
      const half = marquee.scrollWidth / 2;
      if (marqueeX <= -half) marqueeX += half;
      if (marqueeX > 0) marqueeX -= half;
      marquee.style.transform = `translate3d(${marqueeX}px,0,0)`;
      requestAnimationFrame(run);
    };
    run();
  }
})();
