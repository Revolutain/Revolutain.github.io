/* Revolutain | Slate (version 03)
   Shared by every page. Additive only: pages read and navigate without it. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supports = (decl) => window.CSS && CSS.supports && CSS.supports(decl);

  /* ---------- Overlay menu ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.getElementById('overlay');
  if (toggle && overlay) {
    const setMenu = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      overlay.hidden = !open;
      document.body.classList.toggle('menu-open', open);
    };
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) { setMenu(false); toggle.focus(); } });
    window.matchMedia('(min-width: 64em)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* ---------- Reveal fallback (only when CSS scroll-driven animations are unavailable) ---------- */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in'));
  } else if (!supports('animation-timeline: view()')) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Count-up for real metrics.
     Activate by giving a .stat .big element data-count="<number>" and optional data-suffix.
     The placeholder stats row intentionally carries no data-count: nothing is counted until a real figure exists. ---------- */
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  if (counters.length) {
    const run = (el) => {
      const target = Number(el.dataset.count), suffix = el.dataset.suffix || '';
      if (reduceMotion || !Number.isFinite(target)) { el.textContent = target.toLocaleString() + suffix; return; }
      const start = performance.now(), dur = 1400;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.4 });
      counters.forEach((el) => io.observe(el));
    } else {
      counters.forEach(run);
    }
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
      if (note) note.hidden = false;
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
