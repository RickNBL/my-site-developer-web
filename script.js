(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('#menu-toggle');
  const menu = document.querySelector('#main-nav');
  const progress = document.querySelector('#reading-progress');
  const video = document.querySelector('#identity-video');
  const heroFilm = document.querySelector('.hero-film');
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  function closeMenu() {
    header?.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Open menu' : 'Abrir menu');
  }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    header?.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', document.documentElement.lang === 'en' ? (open ? 'Close menu' : 'Open menu') : (open ? 'Fechar menu' : 'Abrir menu'));
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMenu(); }, { passive:true });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .065, rootMargin: '0px 0px -22px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
  }



  const counters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.getAttribute('data-counter')) || 0;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = String(target);
          observer.unobserve(el);
          return;
        }
        const duration = 1400;
        el.textContent = '0';
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = String(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = String(target);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: .5 });
    counters.forEach(el => counterObserver.observe(el));
  } else {
    counters.forEach(el => { el.textContent = el.getAttribute('data-counter') || '0'; });
  }

  // The branded film is deliberately silent, without controls or any click-to-pause behavior.
  // Restart after a scroll gesture finishes while visible and each time it re-enters the screen.
  // Scrolling dozens of pixels emits many events; debounce to avoid trapping the film on frame 1.
  let filmVisible = true;
  let wasVisible = false;
  let scrollRestartTimer;
  let lastReset = 0;
  let lastScrollY = window.scrollY;
  if (video) {
    video.muted = true;
    video.volume = 0;
    video.defaultMuted = true;
    video.controls = false;
    video.loop = true;
    const safePlay = () => video.play().catch(() => { /* Some browsers defer autoplay until interaction. */ });
    video.addEventListener('volumechange', () => {
      if (!video.muted || video.volume !== 0) { video.muted = true; video.volume = 0; }
    });
    const restartVideo = () => {
      if (!filmVisible || document.hidden || !video.duration || Date.now() - lastReset < 350) return;
      lastReset = Date.now();
      try { video.currentTime = 0; } catch(_) { /* Film not ready yet. */ }
      safePlay();
    };
    if ('IntersectionObserver' in window && heroFilm) {
      const filmObserver = new IntersectionObserver(entries => {
        filmVisible = entries[0].isIntersecting;
        if (filmVisible && !wasVisible) restartVideo();
        wasVisible = filmVisible;
      }, { threshold: .12 });
      filmObserver.observe(heroFilm);
    }
    video.addEventListener('loadedmetadata', safePlay, {once:true});
    document.addEventListener('visibilitychange', () => { if (!document.hidden) { lastReset = 0; restartVideo(); } });
    window.addEventListener('pageshow', safePlay);
    safePlay();
    function handleScrollVideo() {
      const y = window.scrollY;
      if (Math.abs(y - lastScrollY) > 8) {
        lastScrollY = y;
        clearTimeout(scrollRestartTimer);
        scrollRestartTimer = window.setTimeout(restartVideo, 130);
      }
    }
    window.addEventListener('scroll', handleScrollVideo, { passive:true });
  }

  let scheduled = false;
  function updateScroll() {
    header?.classList.toggle('scrolled', window.scrollY > 14);
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    if (progress) progress.style.width = `${Math.min(100, window.scrollY / max * 100)}%`;
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); }
  }, { passive:true });
  updateScroll();
})();


/* Bilingual content and fixed regional pricing. No live exchange-rate conversion. */
(() => {
  'use strict';
  const english = {"txt_001":"Skip to content","txt_002":"WEB DEVELOPMENT","txt_003":"ABOUT","txt_004":"PORTFOLIO","txt_005":"PROCESS","txt_006":"PRICING","txt_007":"CHAT ON WHATSAPP ↗","txt_008":"LET’S TALK <span aria-hidden=\"true\">↗</span>","txt_009":"<span class=\"eyebrow-line\"></span> PROFESSIONAL WEBSITE DEVELOPMENT","txt_010":"Websites<br/><em>done right.</em>","txt_011":"I design and develop professional, responsive websites tailored to your business. From visual design to code, every detail is built to showcase your services and make it easy for customers to reach you.","txt_012":"START YOUR PROJECT <span aria-hidden=\"true\">↗</span>","txt_013":"EXPLORE MY WORK <span aria-hidden=\"true\">↓</span>","txt_014":"<i></i> ABOUT MY WORK","txt_015":"A website that reflects<br/><em>your business.</em>","txt_016":"I’m <strong>Henrique Silva</strong>. I have 9 years of experience in web development and also work in Information Technology (IT). I build websites for businesses and professionals, handling design, coding, mobile responsiveness and launch.","txt_017":"VIEW MY PROJECTS <span aria-hidden=\"true\">↗</span>","txt_018":"Design that fits<br/><em>your brand.</em>","txt_019":"Fast and<br/><em>responsive.</em>","txt_020":"Built to<br/><em>bring customers.</em>","txt_021":"Custom layouts with your brand’s colors, typography and visual identity — without relying on generic templates.","txt_022":"Your website works smoothly on phones, tablets and desktops, with easy navigation and a focus on loading speed.","txt_023":"I structure the content so visitors understand your services and can quickly contact your business on WhatsApp.","txt_024":"<i></i> WEBSITES I’VE BUILT","txt_025":"Real projects.<br/><em>Live websites.</em>","txt_026":"Explore a selection of websites I’ve developed for businesses in technology, services and healthcare. Open each project to see the live site.","txt_027":"INFORMATION TECHNOLOGY","txt_028":"OUTSOURCED SERVICES","txt_029":"PILATES & PHYSIOTHERAPY","txt_030":"INFORMATION TECHNOLOGY","txt_031":"Business website showcasing Sitcon’s IT services, equipment management and printing solutions.","txt_032":"Corporate website presenting outsourced services and making it easy to request commercial proposals.","txt_033":"Custom website introducing Pilates and physiotherapy services, with quick access to appointment booking.","txt_034":"Corporate website presenting technical support, IT management and business technology solutions.","txt_035":"VISIT WEBSITE <b>↗</b>","txt_036":"VISIT WEBSITE <b>↗</b>","txt_037":"VISIT WEBSITE <b>↗</b>","txt_038":"VISIT WEBSITE <b>↗</b>","txt_039":"Visit website <span aria-hidden=\"true\">↗</span>","txt_040":"Visit website <span aria-hidden=\"true\">↗</span>","txt_041":"Visit website <span aria-hidden=\"true\">↗</span>","txt_042":"Visit website <span aria-hidden=\"true\">↗</span>","txt_043":"LIVE WEBSITES — CLICK TO EXPLORE.","txt_044":"I WANT A WEBSITE FOR MY BUSINESS <span aria-hidden=\"true\">↗</span>","txt_045":"<i></i> HOW I BUILD YOUR WEBSITE","txt_046":"From the first conversation<br/>to <em>launch day.</em>","txt_047":"You stay involved in the key decisions while I take care of structure, design, development, testing and launch.","txt_048":"Understanding your needs","txt_049":"Custom design","txt_050":"Web development","txt_051":"Launch & maintenance","txt_052":"We discuss your business, the pages you need and what visitors should be able to do on your website.","txt_053":"I organize the content and create a visual design aligned with your brand identity.","txt_054":"I build the pages and test navigation across phones, tablets and computers.","txt_055":"Once approved, your website goes live, followed by the maintenance included in your chosen plan.","txt_056":"<i></i> WEBSITE PACKAGES","txt_057":"The right website<br/><em>for your business.</em>","txt_058":"Compare the features of each package. Every option includes responsive development and 12 months of maintenance.","txt_059":"Basic Website","txt_060":"Professional Website","txt_061":"Business Website","txt_062":"A clear, professional way to present your services and connect with customers.","txt_063":"More pages and a custom design for growing businesses.","txt_064":"Fully tailored development with advanced features and integrations.","txt_065":"WHAT’S INCLUDED","txt_066":"WHAT’S INCLUDED","txt_067":"WHAT’S INCLUDED","txt_068":"1 to 3 pages","txt_069":"Responsive design","txt_070":"WhatsApp button","txt_071":"Hosting included","txt_072":"12 months of maintenance","txt_073":"4 to 8 pages","txt_074":"Design tailored to your brand identity","txt_075":"Animations and SEO","txt_076":"Hosting + backups","txt_077":"12 months of maintenance","txt_078":"Custom-built project","txt_079":"Advanced integrations and features","txt_080":"Performance optimization","txt_081":"Priority support","txt_082":"12 months of maintenance","txt_083":"CHOOSE THIS PACKAGE <span aria-hidden=\"true\">↗</span>","txt_084":"CHOOSE THIS PACKAGE <span aria-hidden=\"true\">↗</span>","txt_085":"CHOOSE THIS PACKAGE <span aria-hidden=\"true\">↗</span>","txt_086":"Not sure which package fits? <a href=\"https://wa.me/5511996388468\" target=\"_blank\" rel=\"noopener noreferrer\" data-wa=\"guidance\">Let’s find the right option on WhatsApp ↗</a>","txt_087":"<i></i> GET A QUOTE ON WHATSAPP","txt_088":"Ready to build<br/><em>your business website?</em>","txt_089":"Tell me about the website you need.<br/>I’ll reply to you personally on WhatsApp.","txt_090":"CHAT ON WHATSAPP","txt_091":"BACK TO TOP ↑","txt_092":"WEB DEVELOPMENT","txt_093":"© <span id=\"year\">2026</span> HENRIQUE SILVA. ALL RIGHTS RESERVED.","txt_094":"WEBSITE DESIGN & DEVELOPMENT.","txt_095":"WHATSAPP ↗","txt_096":"<i></i> DEVELOPMENT EXPERIENCE","txt_097":"9 years of experience<br/><em>in web development.</em>","txt_098":"I have 9 years of experience in web development, along with experience in Information Technology (IT). This background helps me combine strong visual design with the technical aspects of each project, focusing on usability, responsiveness and performance.","txt_099":"Hands-on experience","txt_100":"Web development & IT","txt_101":"Results-focused","txt_102":"Ongoing work with design, coding, responsiveness and website publishing.","txt_103":"My background in Information Technology complements my work in design, development and website launch.","txt_104":"Every website is built to inspire trust, strengthen your brand and make it easier for new clients to contact you.","txt_105":"YEARS","txt_106":"building professional websites"};
  const localized = [...document.querySelectorAll('[data-i18n]')];
  const original = new Map(localized.map(el => [el, el.innerHTML]));
  const switchButtons = [...document.querySelectorAll('.language-option')];
  const plans = [...document.querySelectorAll('.plans .plan')];
  const prices = {
    pt: [ {name:'Site Básico', number:'1.499', label:'R$ 1.499'}, {name:'Site Profissional', number:'2.999', label:'R$ 2.999'}, {name:'Site Empresarial', number:'4.999', label:'R$ 4.999'} ],
    en: [ {name:'Basic Website', number:'399', label:'€399'}, {name:'Professional Website', number:'699', label:'€699'}, {name:'Business Website', number:'999', label:'€999'} ]
  };
  const copy = {
    pt: {
      title:'Henrique Silva — Design & Desenvolvimento Web',
      description:'Criação de sites profissionais e responsivos por Henrique Silva. Desenvolvimento web personalizado, portfólio de projetos reais e planos a partir de R$ 1.499.',
      ogTitle:'Henrique Silva — Criação de Sites Profissionais',
      ogDescription:'Sites empresariais personalizados, rápidos e responsivos. Conheça projetos reais e solicite um orçamento pelo WhatsApp.',
      wa: {
        nav:'Olá, Henrique! Quero conversar sobre a criação de um site.',
        hero:'Olá, Henrique! Vi seu site e quero falar sobre um projeto.',
        portfolio:'Olá, Henrique! Gostei dos projetos do seu portfólio. Quero criar um site.',
        guidance:'Olá, Henrique! Gostaria de ajuda para escolher o plano ideal para o meu site.',
        contact:'Olá, Henrique! Quero conversar sobre a criação do meu site.',
        footer:'Olá, Henrique!',
        floating:'Olá, Henrique! Gostaria de um orçamento para meu site.'
      }
    },
    en: {
      title:'Henrique Silva — Professional Website Design & Development',
      description:'Professional websites and custom web development by Henrique Silva. Explore real projects and website packages starting at €399.',
      ogTitle:'Henrique Silva — Professional Website Development',
      ogDescription:'Custom, responsive business websites. Explore real projects and request a quote directly on WhatsApp.',
      wa: {
        nav:'Hi Henrique! I’d like to talk about building a website.',
        hero:'Hi Henrique! I saw your portfolio and would like to discuss a website project.',
        portfolio:'Hi Henrique! I liked the projects in your portfolio and would like a website for my business.',
        guidance:'Hi Henrique! Could you help me choose the right website package?',
        contact:'Hi Henrique! I’d like to discuss building my website.',
        footer:'Hi Henrique!',
        floating:'Hi Henrique! I’d like a quote for a new website.'
      }
    }
  };
  const setMeta = (key, value) => {
    const selector = key === 'description' ? 'meta[name="description"]' : `meta[property="${key}"]`;
    document.querySelector(selector)?.setAttribute('content', value);
  };
  const setWhatsApp = (locale) => {
    document.querySelectorAll('[data-wa]').forEach(link => {
      const key = link.getAttribute('data-wa');
      let message = copy[locale].wa[key];
      if (['basic','professional','business'].includes(key)) {
        const i = {basic:0,professional:1,business:2}[key];
        const {name, label} = prices[locale][i];
        message = locale === 'en'
          ? `Hi Henrique! I’m interested in the ${name} package priced at ${label}. Can we talk?`
          : `Olá, Henrique! Tenho interesse no ${name} de ${label}. Podemos conversar?`;
      }
      if (message) link.href = 'https://wa.me/5511996388468?text=' + encodeURIComponent(message);
    });
  };
  const applyLanguage = (locale, shouldSave = true) => {
    const lang = locale === 'en' ? 'en' : 'pt';
    localized.forEach(el => { el.innerHTML = lang === 'en' ? english[el.dataset.i18n] : original.get(el); });
    // Some pricing-note HTML is re-created on each switch; refresh its WhatsApp link after translation.
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = copy[lang].title;
    setMeta('description', copy[lang].description);
    setMeta('og:title', copy[lang].ogTitle);
    setMeta('og:description', copy[lang].ogDescription);
    setMeta('og:locale', lang === 'en' ? 'en_US' : 'pt_BR');
    plans.forEach((plan, i) => {
      plan.querySelector('.plan-price small').textContent = lang === 'en' ? '€' : 'R$';
      plan.querySelector('.plan-price strong').textContent = prices[lang][i].number;
    });
    document.querySelectorAll('[data-i18n-aria-label], [data-i18n-title]').forEach(el => {
      for (const attr of ['aria-label','title']) {
        if (el.hasAttribute('data-i18n-' + attr)) {
          el.setAttribute(attr, el.getAttribute('data-' + (lang === 'en' ? 'i18n' : 'pt') + '-' + attr));
        }
      }
    });
    document.querySelector('.language-switch')?.setAttribute('aria-label',lang === 'en' ? 'Select language' : 'Selecionar idioma');
    const toggle = document.getElementById('menu-toggle');
    if (toggle) toggle.setAttribute('aria-label', toggle.getAttribute('aria-expanded') === 'true' ? (lang === 'en' ? 'Close menu' : 'Fechar menu') : (lang === 'en' ? 'Open menu' : 'Abrir menu'));
    for (const button of switchButtons) {
      const active = button.dataset.lang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
    setWhatsApp(lang);
    if (shouldSave) { try { localStorage.setItem('hs-site-language', lang); } catch (_) { /* Private mode */ } }
  };
  switchButtons.forEach(btn => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));
  let saved = 'pt';
  try { saved = localStorage.getItem('hs-site-language') === 'en' ? 'en' : 'pt'; } catch (_) { /* Storage unavailable */ }
  applyLanguage(saved, false);
})();
