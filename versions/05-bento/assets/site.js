/* Revolutain | Bento (version 05)
   Shared by every page. Additive only: pages read and navigate without it. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supports = (decl) => window.CSS && CSS.supports && CSS.supports(decl);

  /* ---------- "More" sheet (mobile tab bar) ---------- */
  const moreBtn = document.getElementById('moreBtn');
  const sheet = document.getElementById('sheet');
  if (moreBtn && sheet) {
    const setSheet = (open) => {
      moreBtn.setAttribute('aria-expanded', String(open));
      sheet.hidden = !open;
      document.body.classList.toggle('sheet-open', open);
    };
    moreBtn.addEventListener('click', () => setSheet(moreBtn.getAttribute('aria-expanded') !== 'true'));
    sheet.addEventListener('click', (e) => { if (e.target === sheet || e.target.closest('.sheet-close')) setSheet(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) { setSheet(false); moreBtn.focus(); } });
    window.matchMedia('(min-width: 64em)').addEventListener('change', (e) => { if (e.matches) setSheet(false); });
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

  /* ---------- Approach stepper: scroll-snap track, prev/next buttons, dot indicators ---------- */
  const track = document.getElementById('stepTrack');
  if (track) {
    const cards = Array.from(track.children);
    const dots = Array.from(document.querySelectorAll('#stepDots button'));
    const prev = document.getElementById('stepPrev');
    const next = document.getElementById('stepNext');
    let current = 0;
    const setCurrent = (i) => {
      current = i;
      dots.forEach((d, j) => { if (j === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === cards.length - 1;
    };
    const leftOf = (card) => card.offsetLeft - track.offsetLeft;
    const goTo = (i) => {
      const index = Math.max(0, Math.min(cards.length - 1, i));
      const smooth = !reduceMotion && !document.hidden;
      setCurrent(index);
      track.scrollTo({ left: leftOf(cards[index]), behavior: smooth ? 'smooth' : 'auto' });
    };
    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    // The current step is the card whose left edge is nearest the track's scroll position
    // (the one the snap point has settled on), which stays unambiguous when two cards are visible.
    const update = () => {
      const x = track.scrollLeft;
      let best = 0, bestDist = Infinity;
      cards.forEach((c, i) => { const d = Math.abs(leftOf(c) - x); if (d < bestDist) { bestDist = d; best = i; } });
      setCurrent(best);
    };
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    });
    setCurrent(0);
  }

  /* ---------- Count-up for real metrics.
     Activate by giving a .stat .big element data-count="<number>" and optional data-suffix.
     The placeholder stats intentionally carry no data-count: nothing is counted until a real figure exists. ---------- */
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
