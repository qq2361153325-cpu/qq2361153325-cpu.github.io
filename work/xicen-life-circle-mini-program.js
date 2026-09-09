const header=document.querySelector('.case-header');
const progress=document.querySelector('.page-progress span');
const menuToggle=document.querySelector('.menu-toggle');
const headerNav=document.querySelector('.case-header-nav');

function updateScrollUI(){
  if(header) header.classList.toggle('scrolled',window.scrollY>24);
  const max=document.documentElement.scrollHeight-window.innerHeight;
  if(progress) progress.style.width=`${max>0?(window.scrollY/max)*100:0}%`;
}
updateScrollUI();
window.addEventListener('scroll',updateScrollUI,{passive:true});

if(menuToggle&&headerNav){
  menuToggle.addEventListener('click',()=>{
    const open=headerNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded',String(open));
  });
  headerNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    headerNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
  }));
}

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}
  });
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const heroStage=document.querySelector('[data-parallax]');
if(heroStage&&matchMedia('(pointer:fine)').matches){
  heroStage.addEventListener('mousemove',e=>{
    const r=heroStage.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    heroStage.style.transform=`perspective(1400px) rotateX(${-y*1.8}deg) rotateY(${x*1.8}deg)`;
  });
  heroStage.addEventListener('mouseleave',()=>heroStage.style.transform='');
}

const journeyLinks=[...document.querySelectorAll('.journey-nav a')];
const journeyTargets=journeyLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      journeyLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));
    }
  });
},{rootMargin:'-32% 0px -56% 0px',threshold:0});
journeyTargets.forEach(target=>sectionObserver.observe(target));

const gallery=document.querySelector('#gallery');
if(gallery){
  const items=[...gallery.querySelectorAll('.gallery-item')];
  const filters=[...gallery.querySelectorAll('[data-gallery-filter]')];
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    const category=btn.dataset.galleryFilter;
    filters.forEach(item=>item.classList.toggle('active',item===btn));
    items.forEach(item=>{
      const show=category==='all'||item.dataset.galleryCategory===category;
      item.hidden=!show;
      if(show&&!item.classList.contains('visible')) revealObserver.observe(item);
    });
  }));
}

const lightbox=document.querySelector('.lightbox');
if(lightbox){
  const image=lightbox.querySelector('img');
  const caption=lightbox.querySelector('figcaption');
  const zoomables=[...document.querySelectorAll('.zoomable')];
  let currentIndex=0;
  function open(index){
    currentIndex=index;
    const item=zoomables[index];
    image.src=item.dataset.src;
    image.alt=item.querySelector('img')?.alt||'完整设计稿';
    caption.textContent=item.dataset.caption||image.alt;
    if(!lightbox.open) lightbox.showModal();
    document.body.classList.add('modal-open');
    lightbox.querySelector('figure').scrollTop=0;
  }
  function close(){lightbox.close();document.body.classList.remove('modal-open')}
  function step(n){open((currentIndex+n+zoomables.length)%zoomables.length)}
  zoomables.forEach((item,index)=>item.addEventListener('click',()=>open(index)));
  lightbox.querySelector('.lightbox-close').addEventListener('click',close);
  lightbox.querySelector('.prev').addEventListener('click',()=>step(-1));
  lightbox.querySelector('.next').addEventListener('click',()=>step(1));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox) close()});
  lightbox.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  window.addEventListener('keydown',e=>{
    if(!lightbox.open) return;
    if(e.key==='ArrowLeft') step(-1);
    if(e.key==='ArrowRight') step(1);
    if(e.key==='Escape') close();
  });
}
