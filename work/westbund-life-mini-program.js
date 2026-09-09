document.body.classList.add('js-enabled');

const header = document.querySelector('.case-header');
const progress = document.querySelector('.page-progress span');
const menuToggle = document.querySelector('.menu-toggle');
const headerNav = document.querySelector('.case-header-nav');

function updateScrollUI() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}

updateScrollUI();
window.addEventListener('scroll', updateScrollUI, { passive: true });

if (menuToggle && headerNav) {
  menuToggle.addEventListener('click', () => {
    const open = headerNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  headerNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      headerNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = [...document.querySelectorAll('.reveal')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let revealObserver = null;

if (!reducedMotion && 'IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '120px 0px', threshold: 0.01 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

window.setTimeout(() => {
  revealItems.forEach((item) => item.classList.add('visible'));
}, 1400);

const heroStage = document.querySelector('[data-parallax]');
if (heroStage && matchMedia('(pointer:fine)').matches && !reducedMotion) {
  heroStage.addEventListener('mousemove', (event) => {
    const rect = heroStage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroStage.style.transform = `perspective(1400px) rotateX(${-y * 1.25}deg) rotateY(${x * 1.25}deg)`;
  });
  heroStage.addEventListener('mouseleave', () => {
    heroStage.style.transform = '';
  });
}

const journeyLinks = [...document.querySelectorAll('.journey-nav a')];
const journeyTargets = journeyLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      journeyLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-32% 0px -56% 0px', threshold: 0 });
  journeyTargets.forEach((target) => sectionObserver.observe(target));
}

const gallery = document.querySelector('#gallery');
if (gallery) {
  const items = [...gallery.querySelectorAll('.gallery-item')];
  const filters = [...gallery.querySelectorAll('[data-gallery-filter]')];
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.galleryFilter;
      filters.forEach((item) => item.classList.toggle('active', item === button));
      items.forEach((item) => {
        const show = category === 'all' || item.dataset.galleryCategory === category;
        item.hidden = !show;
        if (show) item.classList.add('visible');
      });
    });
  });
}

const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('figcaption');
  const figure = lightbox.querySelector('figure');
  const zoomables = [...document.querySelectorAll('.zoomable')];
  let currentIndex = 0;

  function open(index) {
    currentIndex = index;
    const item = zoomables[index];
    image.src = item.dataset.src;
    image.alt = item.querySelector('img')?.alt || '完整设计稿';
    caption.textContent = item.dataset.caption || image.alt;
    if (!lightbox.open) lightbox.showModal();
    document.body.classList.add('modal-open');
    figure.scrollTop = 0;
  }

  function close() {
    if (lightbox.open) lightbox.close();
    document.body.classList.remove('modal-open');
  }

  function step(direction) {
    open((currentIndex + direction + zoomables.length) % zoomables.length);
  }

  zoomables.forEach((item, index) => item.addEventListener('click', () => open(index)));
  lightbox.querySelector('.lightbox-close').addEventListener('click', close);
  lightbox.querySelector('.prev').addEventListener('click', () => step(-1));
  lightbox.querySelector('.next').addEventListener('click', () => step(1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });
  lightbox.addEventListener('close', () => document.body.classList.remove('modal-open'));
  window.addEventListener('keydown', (event) => {
    if (!lightbox.open) return;
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'Escape') close();
  });
}
