const header = document.querySelector('.case-header');
const progress = document.querySelector('.page-progress span');
const menuToggle = document.querySelector('.menu-toggle');
const headerNav = document.querySelector('.case-header-nav');

function updateScrollUI(){
  header.classList.toggle('scrolled', window.scrollY > 24);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
updateScrollUI();
window.addEventListener('scroll', updateScrollUI, {passive:true});

menuToggle.addEventListener('click',()=>{
  const open = headerNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
headerNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  headerNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));

const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const cover = document.querySelector('[data-parallax]');
if(cover && matchMedia('(pointer:fine)').matches){
  cover.addEventListener('mousemove',e=>{
    const r=cover.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    cover.style.transform=`perspective(1400px) rotateX(${-y*2.2}deg) rotateY(${x*2.2}deg) translateY(-2px)`;
  });
  cover.addEventListener('mouseleave',()=>cover.style.transform='');
}

// Desktop / mobile homepage switcher
const switcher=document.querySelector('[data-switcher]');
if(switcher){
  const buttons=[...switcher.querySelectorAll('[data-view]')];
  const desktop=switcher.querySelector('.desktop-view');
  const mobile=switcher.querySelector('.mobile-view');
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.toggle('active',b===btn));
    const isDesktop=btn.dataset.view==='desktop';
    desktop.hidden=!isDesktop;
    mobile.hidden=isDesktop;
  }));
}

// Journey navigation active state
const journeyLinks=[...document.querySelectorAll('.journey-nav a')];
const targets=journeyLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      journeyLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));
    }
  });
},{rootMargin:'-32% 0px -55% 0px',threshold:0});
targets.forEach(t=>sectionObserver.observe(t));

// Selected core screen filters
const gallerySection=document.querySelector('#gallery');
if(gallerySection){
  const galleryItems=[...gallerySection.querySelectorAll('.gallery-item')];
  const galleryFilters=[...gallerySection.querySelectorAll('[data-gallery-filter]')];
  let currentFilter='all';

  function applyGallery(){
    galleryItems.forEach(item=>{
      const show=currentFilter==='all'||item.dataset.galleryCategory===currentFilter;
      item.hidden=!show;
      if(show&&!item.classList.contains('visible')) revealObserver.observe(item);
    });
  }

  galleryFilters.forEach(button=>button.addEventListener('click',()=>{
    currentFilter=button.dataset.galleryFilter;
    galleryFilters.forEach(item=>item.classList.toggle('active',item===button));
    applyGallery();
  }));
  applyGallery();
}

// Full-screen gallery
const lightbox=document.querySelector('.lightbox');
const lightboxImg=lightbox.querySelector('img');
const lightboxCaption=lightbox.querySelector('figcaption');
const zoomables=[...document.querySelectorAll('.zoomable')];
let currentIndex=0;

function openLightbox(index){
  currentIndex=index;
  const item=zoomables[currentIndex];
  lightboxImg.src=item.dataset.src;
  lightboxImg.alt=item.querySelector('img')?.alt || '完整设计稿';
  lightboxCaption.textContent=item.dataset.caption || lightboxImg.alt;
  if(!lightbox.open) lightbox.showModal();
  document.body.classList.add('modal-open');
  lightbox.querySelector('figure').scrollTop=0;
}
function closeLightbox(){
  lightbox.close();
  document.body.classList.remove('modal-open');
}
function stepLightbox(step){
  openLightbox((currentIndex+step+zoomables.length)%zoomables.length);
}
zoomables.forEach((el,index)=>el.addEventListener('click',()=>openLightbox(index)));
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.querySelector('.prev').addEventListener('click',()=>stepLightbox(-1));
lightbox.querySelector('.next').addEventListener('click',()=>stepLightbox(1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox) closeLightbox()});
lightbox.addEventListener('close',()=>document.body.classList.remove('modal-open'));
window.addEventListener('keydown',e=>{
  if(!lightbox.open) return;
  if(e.key==='ArrowLeft') stepLightbox(-1);
  if(e.key==='ArrowRight') stepLightbox(1);
  if(e.key==='Escape') closeLightbox();
});
