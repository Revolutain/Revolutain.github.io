/* Revolutain | Grid (version 04)
   Shared by every page. Additive only: pages read and navigate without it. */
(() => {
  'use strict';

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
