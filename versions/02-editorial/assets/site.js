/* Revolutain | Editorial (version 02)
   Vanilla JS. Everything here is additive: the page reads fine without it. */
(() => {
  'use strict';

  const doc = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supports = (decl) => window.CSS && CSS.supports && CSS.supports(decl);

  /* ---------- Header tint and scroll progress ---------- */
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('progress');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || doc.scrollTop;
      header.classList.toggle('scrolled', y > 12);
      if (progress) {
        const max = doc.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
      }
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.getElementById('drawer');
  const setDrawer = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    drawer.hidden = !open;
    body.classList.toggle('drawer-open', open);
  };
  toggle.addEventListener('click', () => setDrawer(toggle.getAttribute('aria-expanded') !== 'true'));
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) { setDrawer(false); toggle.focus(); } });
  window.matchMedia('(min-width: 64em)').addEventListener('change', (e) => { if (e.matches) setDrawer(false); });

  /* ---------- Scrollspy: rail, drawer, primary nav, mobile section bar ---------- */
  const sections = Array.from(document.querySelectorAll('[data-section]'));
  const spyLinks = Array.from(document.querySelectorAll('.rail ol a[href^="#"], .drawer a[href^="#"], .primary-nav a[href^="#"]'));
  const barLabel = document.getElementById('sectionBarLabel');
  let currentId = null;

  // The URL hash is only rewritten after the page has settled or the user has interacted,
  // so the browser's own scroll to a fragment on load is never interrupted.
  let spyArmed = false;
  const arm = () => { spyArmed = true; };
  window.addEventListener('load', () => setTimeout(arm, 800), { once: true });
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((t) => window.addEventListener(t, arm, { once: true, passive: true }));

  const setCurrent = (section) => {
    const id = section.id;
    if (id === currentId) return;
    currentId = id;
    spyLinks.forEach((a) => {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    if (barLabel) {
      barLabel.textContent = section.dataset.num ? section.dataset.num + '  ' + section.dataset.section : section.dataset.section;
    }
    if (!spyArmed) return;
    const wanted = id === 'top' ? '' : '#' + id;
    if (window.location.hash !== wanted) {
      history.replaceState(null, '', wanted || window.location.pathname + window.location.search);
    }
  };

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target); });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll (fallback when CSS scroll-driven animations are unavailable) ---------- */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in'));
  } else if (!supports('animation-timeline: view()')) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Hero parallax fallback ---------- */
  const art = document.querySelector('.hero-art');
  if (art && !reduceMotion && !supports('animation-timeline: scroll()')) {
    const drift = () => { art.style.transform = 'translateY(' + Math.min(window.scrollY * -0.08, 0) + 'px)'; };
    window.addEventListener('scroll', () => requestAnimationFrame(drift), { passive: true });
  }

  /* ---------- Approach tabs (WAI-ARIA tabs pattern) ---------- */
  const tabsRoot = document.getElementById('approachTabs');
  if (tabsRoot) {
    const tabs = Array.from(tabsRoot.querySelectorAll('[role="tab"]'));
    const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    const select = (index, focus) => {
      tabs.forEach((t, i) => {
        const on = i === index;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
      tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i, false));
      t.addEventListener('keydown', (e) => {
        let next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });
  }

  /* ---------- Contact form: browser-only validation, then a thank-you note ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
      form.classList.remove('was-validated');
      form.reset();
      note.hidden = false;
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
