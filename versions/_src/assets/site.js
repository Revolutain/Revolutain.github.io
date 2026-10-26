/* RevolutAIn design versions, shared script.
   Additive only: every page reads and navigates without it. */
(() => {
  'use strict';

  const html = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supports = (decl) => window.CSS && CSS.supports && CSS.supports(decl);
  const EASE = 'cubic-bezier(.2,.7,.2,1)';

  // Tells the stylesheet that the script is in charge of the intro (disables the CSS failsafe).
  html.classList.add('intro-js');

  /* ---------- Hero intro: full-screen headline that hands off to the hero card ---------- */
  const intro = document.getElementById('intro');
  const heroTitle = document.getElementById('heroTitle');
  const variant = html.getAttribute('data-intro');

  const finishIntro = () => {
    html.classList.remove('intro-on');
    if (intro) intro.remove();
    try { sessionStorage.setItem('revolutAIn:intro-seen', '1'); } catch (e) { /* storage unavailable */ }
  };

  if (html.classList.contains('intro-on') && intro && heroTitle && variant !== 'none' && typeof Element.prototype.animate === 'function') {
    const type = intro.querySelector('.intro-type');
    const lines = Array.from(intro.querySelectorAll('.intro-line > span'));
    const markWrap = intro.querySelector('.intro-mark');
    const markSvg = markWrap ? markWrap.querySelector('svg') : null;
    const headerMark = document.querySelector('.site-header .brand .mark');
    const fadeTargets = ['.site-header', '#main', '.site-footer', '.tabbar'].map((s) => document.querySelector(s)).filter(Boolean);
    const running = [];
    let done = false;
    let started = false;
    let safety = 0;

    const play = (el, frames, opts) => { const a = el.animate(frames, Object.assign({ easing: EASE, fill: 'forwards' }, opts)); running.push(a); return a; };

    const settle = (reason) => {
      if (done) return;
      done = true;
      html.dataset.introEnd = typeof reason === 'string' ? reason : (reason && reason.type) || 'unknown';
      clearTimeout(safety);
      running.forEach((a) => { try { a.cancel(); } catch (e) { /* already finished */ } });
      html.classList.add('intro-done');
      finishIntro();
      heroTitle.style.opacity = '';
      fadeTargets.forEach((el) => { el.style.opacity = ''; });
    };

    const handoff = () => {
      if (done) return;
      const from = type.getBoundingClientRect();
      const to = heroTitle.getBoundingClientRect();
      const scale = to.width / from.width;
      const dx = to.left - from.left;
      const dy = to.top - from.top;
      const move = 800;

      // Cards and page come up while the headline travels.
      html.classList.add('intro-done');
      play(intro, [{ backgroundColor: getComputedStyle(intro).backgroundColor }, { backgroundColor: 'rgba(0,0,0,0)' }], { duration: 600, delay: 150 });
      fadeTargets.forEach((el) => play(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: 150 }));
      const travel = play(type, [{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${dx}px, ${dy}px) scale(${scale})` }], { duration: move });
      play(type, [{ opacity: 1 }, { opacity: 0 }], { duration: move * 0.4, delay: move * 0.6 });
      play(heroTitle, [{ opacity: 0 }, { opacity: 1 }], { duration: move * 0.4, delay: move * 0.6 });
      if (markSvg && headerMark) {
        const mFrom = markSvg.getBoundingClientRect();
        const mTo = headerMark.getBoundingClientRect();
        markWrap.style.transformOrigin = 'top left';
        play(markWrap, [{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${mTo.left - mFrom.left}px, ${mTo.top - mFrom.top}px) scale(${mTo.width / mFrom.width})` }], { duration: move });
        play(markWrap, [{ opacity: 1 }, { opacity: 0 }], { duration: move * 0.3, delay: move * 0.7 });
      }
      travel.addEventListener('finish', () => setTimeout(() => settle('complete'), 20));
    };

    const start = () => {
      if (started || done) return;
      started = true;
      intro.hidden = false;
      let t = 0;
      if (variant === 'rings' && markSvg) {
        const draw = (el, duration, delay) => {
          const len = el.getTotalLength();
          el.style.strokeDasharray = String(len);
          el.style.strokeDashoffset = String(len);
          play(el, [{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration, delay, easing: 'cubic-bezier(.4,0,.2,1)' });
        };
        // The inner ring is a stroke and draws directly. The outer arc is a filled, tapered
        // shape, so it is revealed through a mask whose stroked centreline is what gets drawn.
        const ring = markSvg.querySelector('.ring');
        const arc = markSvg.querySelector('.arc');
        if (ring) draw(ring, 600, 0);
        if (arc && arc.dataset.guide) {
          const NS = 'http://www.w3.org/2000/svg';
          const defs = document.createElementNS(NS, 'defs');
          const mask = document.createElementNS(NS, 'mask');
          const guide = document.createElementNS(NS, 'path');
          mask.setAttribute('id', 'intro-arc-mask');
          mask.setAttribute('maskUnits', 'userSpaceOnUse');
          mask.setAttribute('x', '0'); mask.setAttribute('y', '0'); mask.setAttribute('width', '120'); mask.setAttribute('height', '120');
          guide.setAttribute('d', arc.dataset.guide);
          guide.setAttribute('fill', 'none');
          guide.setAttribute('stroke', '#fff');
          guide.setAttribute('stroke-width', '8');
          guide.setAttribute('stroke-linecap', 'round');
          mask.appendChild(guide);
          defs.appendChild(mask);
          markSvg.insertBefore(defs, markSvg.firstChild);
          arc.setAttribute('mask', 'url(#intro-arc-mask)');
          draw(guide, 800, 250);
        }
        t = 650;
      }
      lines.forEach((span, i) => {
        play(span, [{ transform: 'translateY(115%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 800, delay: t + i * 400 });
      });
      const hold = t + 1900;
      setTimeout(handoff, hold);
      safety = setTimeout(() => settle('safety'), 4000 + t);
    };

    // Any input skips to the final state.
    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((ev) => window.addEventListener(ev, settle, { once: true, passive: true }));

    const begin = () => {
      const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      Promise.race([fontsReady, new Promise((r) => setTimeout(r, 800))]).then(start);
    };
    if (document.hidden) {
      const onVisible = () => { if (!document.hidden) { document.removeEventListener('visibilitychange', onVisible); clearTimeout(cap); begin(); } };
      const cap = setTimeout(() => { document.removeEventListener('visibilitychange', onVisible); begin(); }, 60000);
      document.addEventListener('visibilitychange', onVisible);
    } else {
      begin();
    }
  } else if (html.classList.contains('intro-on')) {
    finishIntro();
  } else if (intro) {
    intro.remove();
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

  /* ---------- Contact form: browser-only validation, then a note. Nothing is sent. ---------- */
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
