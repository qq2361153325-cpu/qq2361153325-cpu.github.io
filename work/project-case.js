
const header = document.querySelector('.case-header');
const progress = document.querySelector('.page-progress span');
const menuToggle = document.querySelector('.menu-toggle');
const headerNav = document.querySelector('.case-header-nav');
function updateScrollUI(){
  if(header) header.classList.toggle('scrolled', window.scrollY > 24);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if(progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
updateScrollUI();
window.addEventListener('scroll', updateScrollUI, {passive:true});
if(menuToggle && headerNav){
  menuToggle.addEventListener('click',()=>{
    const open = headerNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  headerNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    headerNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
  }));
}
const revealItems=[...document.querySelectorAll('.reveal')];
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
let revealObserver={observe(el){el.classList.add('visible')}};
if(!reducedMotion&&'IntersectionObserver' in window){
  revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}
    });
  },{rootMargin:'120px 0px',threshold:.01});
}
revealItems.forEach(el=>revealObserver.observe(el));
setTimeout(()=>revealItems.forEach(el=>el.classList.add('visible')),1400);
const cover = document.querySelector('[data-parallax]');
if(cover && matchMedia('(pointer:fine)').matches){
  cover.addEventListener('mousemove',e=>{
    const r=cover.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    cover.style.transform=`perspective(1400px) rotateX(${-y*2.1}deg) rotateY(${x*2.1}deg)`;
  });
  cover.addEventListener('mouseleave',()=>cover.style.transform='');
}
const lightbox=document.querySelector('.lightbox');
if(lightbox){
  const img=lightbox.querySelector('img');
  const close=()=>lightbox.classList.remove('open');
  document.querySelectorAll('.gallery-item, .zoomable').forEach(btn=>btn.addEventListener('click',()=>{
    img.src=btn.dataset.src || btn.dataset.full;
    img.alt=btn.querySelector('img')?.alt || '';
    lightbox.classList.add('open');
  }));
  lightbox.addEventListener('click',e=>{ if(e.target===lightbox || e.target.closest('.lightbox-close')) close(); });
  window.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
}
