(() => {
  let active = null;
  let motion = null;
  function stop() { if (motion) motion.cancel(); motion = null; active = null; }
  function start(event) {
    const row = event.target.closest?.('.creation-row');
    if (!row || row === active || !matchMedia('(min-width: 761px)').matches) return;
    stop();
    const title = row.querySelector('strong');
    if (!title) return;
    title.title = title.textContent || '';
    const distance = title.scrollWidth - title.clientWidth;
    if (distance <= 1 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    active = row;
    const travel = Math.max(1800, distance / 36 * 1000);
    const duration = travel + 1800;
    motion = title.animate([
      { textIndent: '0px', offset: 0 },
      { textIndent: '0px', offset: 700 / duration },
      { textIndent: -distance + 'px', offset: (700 + travel) / duration },
      { textIndent: -distance + 'px', offset: 1 }
    ], { duration, iterations: Infinity, direction: 'alternate', easing: 'linear' });
  }
  document.addEventListener('pointerover', start);
  document.addEventListener('pointerout', event => {
    if (active && !active.contains(event.relatedTarget)) stop();
  });
  document.addEventListener('focusin', start);
  document.addEventListener('focusout', event => {
    if (active && !active.contains(event.relatedTarget)) stop();
  });
  window.addEventListener('resize', stop);
})();
