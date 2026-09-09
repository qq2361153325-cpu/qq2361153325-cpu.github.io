const projects = {
  nike:{kicker:'01 · B2B SaaS / Dashboard',title:'Nike 多品牌数据监控系统',summary:'整合品牌、价格、SKU、渠道与用户数据，为运营和管理层提供统一、实时、可操作的数据决策界面。',tags:['UX Strategy','Dashboard','Data Visualization','Design System'],images:['assets/nike-cover.webp','assets/nike-detail.webp','assets/nike-system.webp'],focus:'通过层级清晰的 KPI、趋势分析、渠道对比和完整组件规范，降低复杂数据的理解成本，并提升关键决策效率。'},
  geely:{kicker:'02 · Enterprise SaaS / CEM',title:'吉利客户体验管理系统',summary:'围绕品牌、产品、渠道和区域数据，构建统一的汽车客户体验管理平台，帮助团队快速发现问题并追踪变化。',tags:['Enterprise SaaS','CEM','Automotive','Data Product'],images:['assets/geely-cover.webp','assets/geely-detail.webp','assets/geely-channel.webp'],focus:'将分散的信息组织为 Overview、Detail、Product 与 Channel 等关键模块，兼顾企业级信息密度与操作效率。'},
  quqinghui:{kicker:'03 · Mobile App / Education',title:'趣青汇亲子教育平台',summary:'围绕发现、报名、学习、付费与分享，重构亲子教育和活动平台的内容结构与全链路体验。',tags:['Mobile App','Education','Community','Growth'],images:['assets/quqinghui-cover.webp','assets/quqinghui-detail.webp','assets/quqinghui-flow.webp'],focus:'通过兴趣频道、活动卡片、课程付费和社区发现模块，缩短用户查找路径，建立“发现—参与—分享”的体验闭环。'},
  doudou:{kicker:'04 · Fintech / Conversion',title:'豆豆钱金融服务 App 2.0',summary:'优化授信、借款、风险评估、会员权益与付费路径，在专业可信的基础上降低金融流程的理解和操作成本。',tags:['Fintech','Mobile App','Conversion','Membership'],images:['assets/doudou-cover-new.webp','assets/doudou-case-new/home.webp','assets/doudou-case-new/membership.webp'],focus:'以清晰的风险信息、分步授信流程和多场景会员权益，提升用户信任感、路径完成率与 VIP 价值感知。'},
  dashboard:{kicker:'05 · Data Visualization',title:'维信金科数据可视化中心',summary:'面向金融业务的实时数据监控与管理驾驶舱，通过多屏协同呈现核心指标、趋势、地图和业务状态。',tags:['Dashboard','Fintech','Big Screen','Visualization'],images:['assets/dashboard-cover.webp','assets/dashboard-detail.webp'],focus:'使用深色高对比视觉体系组织大量业务指标，在大屏展示距离下保持数据识别度和信息层级。'},
  aigc:{kicker:'06 · Visual / AIGC Lab',title:'品牌视觉与 AIGC 探索',summary:'围绕金融品牌运营、IP 形象、节日活动和场景化视觉，探索 AIGC 在创意发散与设计效率中的应用。',tags:['Visual Design','Campaign','AIGC','IP Design'],images:['assets/aigc-cover.webp','assets/aigc-detail.webp','assets/aigc-ip.webp'],focus:'保持品牌角色一致性的同时扩展服装、动作和场景，并将生成结果落地到活动海报、运营页面与营销素材。'}
};

const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>24),{passive:true});
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const hero=document.querySelector('.hero-visual');
if(matchMedia('(pointer:fine)').matches){
  hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hero.querySelectorAll('[data-depth]').forEach(card=>{const d=Number(card.dataset.depth);card.style.translate=`${x*d}px ${y*d}px`})});
  hero.addEventListener('mouseleave',()=>hero.querySelectorAll('[data-depth]').forEach(card=>card.style.translate='0 0'));
}

const cursor=document.querySelector('.cursor');
if(matchMedia('(pointer:fine)').matches){
  addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
  document.querySelectorAll('.work-card').forEach(card=>{card.addEventListener('mouseenter',()=>cursor.classList.add('active'));card.addEventListener('mouseleave',()=>cursor.classList.remove('active'))});
}

const dialog=document.querySelector('.project-dialog');
const closeBtn=dialog.querySelector('.dialog-close');
let currentKey='nike';
function openProject(key){
  currentKey=key;const p=projects[key];
  dialog.querySelector('.dialog-kicker').textContent=p.kicker;
  dialog.querySelector('.dialog-title').textContent=p.title;
  dialog.querySelector('.dialog-summary').textContent=p.summary;
  dialog.querySelector('.dialog-tags').innerHTML=p.tags.map(t=>`<span>${t}</span>`).join('');
  dialog.querySelector('.dialog-gallery').innerHTML=p.images.map((src,i)=>`<img src="${src}" alt="${p.title} 项目展示 ${i+1}">`).join('');
  dialog.querySelector('.dialog-focus').textContent=p.focus;
  if(!dialog.open) dialog.showModal();document.body.classList.add('dialog-open');cursor.classList.remove('active');
  dialog.querySelector('.dialog-scroll').scrollTop=0;
}
function closeProject(){dialog.close();document.body.classList.remove('dialog-open')}
document.querySelectorAll('.work-card[data-project]').forEach(card=>{
  card.addEventListener('click',()=>openProject(card.dataset.project));
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(card.dataset.project)}})
});
closeBtn.addEventListener('click',closeProject);
dialog.addEventListener('click',e=>{if(e.target===dialog)closeProject()});
dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
dialog.querySelector('.dialog-next').addEventListener('click',()=>{const keys=Object.keys(projects);openProject(keys[(keys.indexOf(currentKey)+1)%keys.length])});


const contactWrap=document.querySelector('[data-contact-wrap]');
const contactTrigger=document.querySelector('[data-contact-trigger]');
const contactPopover=document.querySelector('[data-contact-popover]');
if(contactWrap&&contactTrigger&&contactPopover){
  let contactPinned=false;
  const setContactOpen=open=>{contactWrap.classList.toggle('is-open',open);contactTrigger.setAttribute('aria-expanded',String(open));};
  if(matchMedia('(pointer:fine)').matches){
    contactWrap.addEventListener('mouseenter',()=>{if(!contactPinned)setContactOpen(true)});
    contactWrap.addEventListener('mouseleave',()=>{if(!contactPinned)setContactOpen(false)});
  }
  contactTrigger.addEventListener('click',e=>{
    e.preventDefault();e.stopPropagation();
    contactPinned=!contactPinned;
    setContactOpen(contactPinned);
  });
  document.addEventListener('click',e=>{
    if(!contactWrap.contains(e.target)){contactPinned=false;setContactOpen(false);}
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){contactPinned=false;setContactOpen(false);}
  });
}


const workGrid=document.querySelector('[data-work-grid]');
const layoutOptions=[...document.querySelectorAll('[data-work-layout]')];
if(workGrid&&layoutOptions.length){
  const validLayouts=['large','medium','small'];
  let savedLayout='medium';

  const setWorkLayout=(layout,persist=true)=>{
    const next=validLayouts.includes(layout)?layout:'large';
    workGrid.classList.remove(...validLayouts.map(item=>`layout-${item}`));
    workGrid.classList.add(`layout-${next}`);
    workGrid.dataset.layout=next;
    layoutOptions.forEach(option=>{
      const active=option.dataset.workLayout===next;
      option.classList.toggle('is-active',active);
      option.setAttribute('aria-pressed',String(active));
    });
  };

  setWorkLayout(savedLayout,false);

  layoutOptions.forEach((option,index)=>{
    option.addEventListener('click',()=>setWorkLayout(option.dataset.workLayout));
    option.addEventListener('keydown',event=>{
      if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight') return;
      event.preventDefault();
      const direction=event.key==='ArrowRight'?1:-1;
      const target=layoutOptions[(index+direction+layoutOptions.length)%layoutOptions.length];
      target.focus();
      setWorkLayout(target.dataset.workLayout);
    });
  });
}

const workFilters=[...document.querySelectorAll('[data-work-filter]')];
if(workGrid&&workFilters.length){
  const workItems=[...workGrid.children];
  const categoryBase={vibe:100,mobile:200,desktop:300,dashboard:400,visual:500};
  const setWorkFilter=(category,shouldScroll=false)=>{
    workItems.forEach(item=>{
      if(item.dataset.category){
        item.hidden=false;
        item.style.order=String(categoryBase[item.dataset.category]+Number(item.dataset.order||0));
        requestAnimationFrame(()=>item.classList.add('visible'));
      }else if(item.dataset.categoryAnchor){
        item.hidden=false;
        item.style.order=String(categoryBase[item.dataset.categoryAnchor]);
      }else{
        item.hidden=true;
      }
    });
    workFilters.forEach(button=>{
      const active=button.dataset.workFilter===category;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    workGrid.dataset.category=category;
    const target=category==='all'?workGrid:workGrid.querySelector(`[data-category-anchor="${category}"]`);
    if(target&&category==='all'&&shouldScroll){
      const headerOffset=document.querySelector('.site-header')?.offsetHeight||72;
      const top=workGrid.getBoundingClientRect().top+window.scrollY-headerOffset-70;
      window.scrollTo({top,behavior:'smooth'});
    }else if(target&&category!=='all'){
      const headerOffset=document.querySelector('.site-header')?.offsetHeight||72;
      const top=target.getBoundingClientRect().top+window.scrollY-headerOffset-22;
      window.scrollTo({top,behavior:'smooth'});
    }
  };
  workFilters.forEach(button=>button.addEventListener('click',()=>setWorkFilter(button.dataset.workFilter,true)));
  setWorkFilter('all');
}

const heroWorkbench=document.querySelector('[data-hero-workbench]');
if(heroWorkbench&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const workbenchStage=heroWorkbench.querySelector('.workbench-stage');
  const depthLayers=[...heroWorkbench.querySelectorAll('[data-depth]')];
  heroWorkbench.addEventListener('pointermove',event=>{
    const rect=heroWorkbench.getBoundingClientRect();
    const x=((event.clientX-rect.left)/rect.width-.5)*2;
    const y=((event.clientY-rect.top)/rect.height-.5)*2;
    workbenchStage.style.setProperty('--hero-rx',`${y*-2.2}deg`);
    workbenchStage.style.setProperty('--hero-ry',`${x*3.2}deg`);
    depthLayers.forEach(layer=>{
      const depth=Number(layer.dataset.depth||1);
      layer.style.setProperty('--depth-x',`${x*depth*5}px`);
      layer.style.setProperty('--depth-y',`${y*depth*4}px`);
    });
  });
  heroWorkbench.addEventListener('pointerleave',()=>{
    workbenchStage.style.setProperty('--hero-rx','0deg');
    workbenchStage.style.setProperty('--hero-ry','0deg');
    depthLayers.forEach(layer=>{
      layer.style.setProperty('--depth-x','0px');
      layer.style.setProperty('--depth-y','0px');
    });
  });
}

const liquidStage=document.querySelector('[data-liquid-stage]');
if(liquidStage&&matchMedia('(pointer:fine)').matches){
  liquidStage.addEventListener('pointermove',event=>{
    const rect=liquidStage.getBoundingClientRect();
    liquidStage.style.setProperty('--liquid-x',`${((event.clientX-rect.left)/rect.width-.5)*2}`);
    liquidStage.style.setProperty('--liquid-y',`${((event.clientY-rect.top)/rect.height-.5)*2}`);
  });
  liquidStage.addEventListener('pointerleave',()=>{
    liquidStage.style.setProperty('--liquid-x','0');
    liquidStage.style.setProperty('--liquid-y','0');
  });
}

const liquidCanvas=document.querySelector('[data-liquid-canvas]');
if(liquidCanvas&&getComputedStyle(liquidCanvas).display!=='none'){
  const gl=liquidCanvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:true});
  if(gl){
    const vertexSource=`
      attribute vec2 a_position;
      void main(){gl_Position=vec4(a_position,0.0,1.0);}
    `;
    const fragmentSource=`
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_pointer;

      float smin(float a,float b,float k){
        float h=clamp(.5+.5*(b-a)/k,0.,1.);
        return mix(b,a,h)-k*h*(1.-h);
      }
      float sphere(vec3 p,vec3 c,float r){return length(p-c)-r;}
      float map(vec3 p){
        float t=u_time*.62;
        vec3 c1=vec3(sin(t*.91)*.34,cos(t*.73)*.30,sin(t*.51)*.12);
        vec3 c2=vec3(cos(t*.64+1.8)*.47,sin(t*.82+1.2)*.38,cos(t*.58)*.10);
        vec3 c3=vec3(sin(t*.52+3.4)*.42,cos(t*.69+2.1)*.42,sin(t*.77)*.14);
        vec3 c4=vec3(cos(t*.87+4.2)*.30,sin(t*.57+4.8)*.47,cos(t*.42)*.16);
        c1.xy+=u_pointer*.10;c2.xy-=u_pointer*.08;
        float d=sphere(p,c1,.67);
        d=smin(d,sphere(p,c2,.56),.48);
        d=smin(d,sphere(p,c3,.52),.44);
        d=smin(d,sphere(p,c4,.46),.42);
        p.xy*=mat2(cos(t*.18),-sin(t*.18),sin(t*.18),cos(t*.18));
        d=smin(d,length(vec3(p.x*.72,p.y*1.28,p.z)-vec3(0.,0.,.05))-.76,.30);
        return d;
      }
      vec3 normal(vec3 p){
        vec2 e=vec2(.002,0.);
        return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));
      }
      vec3 environment(vec3 r){
        float sky=.5+.5*r.y;
        vec3 cool=mix(vec3(.08,.10,.13),vec3(.92,.96,1.),pow(sky,1.3));
        float band=pow(max(0.,1.-abs(r.y+.12)*4.),5.);
        cool+=vec3(.72,.86,1.)*band*.85;
        float acid=pow(max(0.,dot(r,normalize(vec3(-.7,.35,.5)))),18.);
        cool+=vec3(.72,1.,.18)*acid*.62;
        return cool;
      }
      void main(){
        vec2 uv=(gl_FragCoord.xy*2.-u_resolution.xy)/min(u_resolution.x,u_resolution.y);
        uv.x-=.08;
        vec3 ro=vec3(0.,0.,3.15);
        vec3 rd=normalize(vec3(uv,-2.15));
        float total=0.;float hit=0.;
        vec3 p;
        for(int i=0;i<92;i++){
          p=ro+rd*total;
          float d=map(p);
          if(d<.0015){hit=1.;break;}
          if(total>6.)break;
          total+=d*.72;
        }
        if(hit<.5){gl_FragColor=vec4(0.);return;}
        vec3 n=normal(p);
        vec3 r=reflect(rd,n);
        vec3 v=normalize(ro-p);
        vec3 light=normalize(vec3(-.6,.8,1.));
        float fres=pow(1.-max(0.,dot(n,v)),3.);
        float diff=max(0.,dot(n,light));
        float spec=pow(max(0.,dot(reflect(-light,n),v)),70.);
        vec3 metal=environment(r);
        metal=mix(metal,vec3(.72,.76,.80),.20);
        metal+=vec3(1.)*spec*1.15+vec3(.74,1.,.22)*diff*.08;
        metal+=fres*vec3(.55,.68,.82)*.55;
        float alpha=smoothstep(0.,.018,.022-map(p));
        gl_FragColor=vec4(metal,alpha);
      }
    `;
    const fragmentSource2=`
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_pointer;
      float field(vec2 p){
        float t=u_time*.58;
        vec2 c1=vec2(sin(t*.91)*.30,cos(t*.73)*.24)+u_pointer*.05;
        vec2 c2=vec2(cos(t*.64+1.8)*.38,sin(t*.82+1.2)*.29)-u_pointer*.04;
        vec2 c3=vec2(sin(t*.52+3.4)*.33,cos(t*.69+2.1)*.31);
        vec2 c4=vec2(cos(t*.87+4.2)*.25,sin(t*.57+4.8)*.36);
        float f=.46/dot(p-c1,p-c1)+.34/dot(p-c2,p-c2)+.31/dot(p-c3,p-c3)+.27/dot(p-c4,p-c4);
        f+=.42/dot(p*vec2(.72,1.28),p*vec2(.72,1.28));
        return f;
      }
      void main(){
        vec2 uv=(gl_FragCoord.xy*2.-u_resolution.xy)/min(u_resolution.x,u_resolution.y);
        uv.x-=.04;
        float f=field(uv);
        float edge=smoothstep(3.45,3.78,f);
        if(edge<.002){gl_FragColor=vec4(0.);return;}
        float e=.006;
        vec2 grad=vec2(field(uv+vec2(e,0.))-field(uv-vec2(e,0.)),field(uv+vec2(0.,e))-field(uv-vec2(0.,e)));
        vec3 n=normalize(vec3(-grad*.055,1.));
        vec3 light=normalize(vec3(-.55,.72,.85));
        float diffuse=max(0.,dot(n,light));
        float rim=pow(1.-max(0.,n.z),2.4);
        float stripe=.5+.5*sin((uv.x*.72-uv.y*.34+n.x*.42)*13.+u_time*.17);
        vec3 silver=vec3(.16,.20,.24)+vec3(.34,.38,.42)*diffuse;
        silver=mix(silver,vec3(.82,.88,.93),stripe*.28);
        silver+=pow(diffuse,18.)*vec3(1.)*1.25;
        silver+=rim*vec3(.48,.62,.74)*.7;
        float acid=pow(max(0.,dot(n,normalize(vec3(-.7,.25,.65)))),25.);
        silver+=vec3(.72,1.,.20)*acid*.72;
        silver*=mix(.24,1.,smoothstep(3.58,4.65,f));
        float alpha=edge*smoothstep(.0,.15,edge);
        gl_FragColor=vec4(silver,alpha);
      }
    `;
    const compile=(type,source)=>{
      const shader=gl.createShader(type);
      gl.shaderSource(shader,source);gl.compileShader(shader);
      return shader;
    };
    const program=gl.createProgram();
    gl.attachShader(program,compile(gl.VERTEX_SHADER,vertexSource));
    gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragmentSource2));
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) console.warn('Liquid shader unavailable');
    gl.useProgram(program);
    const buffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const position=gl.getAttribLocation(program,'a_position');
    gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    const resolution=gl.getUniformLocation(program,'u_resolution');
    const time=gl.getUniformLocation(program,'u_time');
    const pointer=gl.getUniformLocation(program,'u_pointer');
    let pointerX=0,pointerY=0,frame=0;
    liquidStage?.addEventListener('pointermove',event=>{
      const rect=liquidStage.getBoundingClientRect();
      pointerX=((event.clientX-rect.left)/rect.width-.5)*2;
      pointerY=-((event.clientY-rect.top)/rect.height-.5)*2;
    });
    const resize=()=>{
      const ratio=Math.min(devicePixelRatio||1,1.6);
      const width=Math.round(liquidCanvas.clientWidth*ratio);
      const height=Math.round(liquidCanvas.clientHeight*ratio);
      if(liquidCanvas.width!==width||liquidCanvas.height!==height){
        liquidCanvas.width=width;liquidCanvas.height=height;gl.viewport(0,0,width,height);
      }
    };
    const render=stamp=>{
      resize();
      gl.uniform2f(resolution,liquidCanvas.width,liquidCanvas.height);
      gl.uniform1f(time,stamp*.001);
      gl.uniform2f(pointer,pointerX,pointerY);
      gl.drawArrays(gl.TRIANGLES,0,6);
      frame=requestAnimationFrame(render);
    };
    liquidStage.classList.add('webgl-ready');
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){
      resize();gl.uniform2f(resolution,liquidCanvas.width,liquidCanvas.height);gl.uniform1f(time,0);gl.uniform2f(pointer,0,0);gl.drawArrays(gl.TRIANGLES,0,6);
    }else frame=requestAnimationFrame(render);
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}
      else if(!document.hidden&&!frame)frame=requestAnimationFrame(render);
    });
  }
}

const particleCanvas=document.querySelector('[data-particle-canvas]');
const particleDom=document.querySelector('[data-particle-dom]');
if(particleDom){
  let seed=94821;
  const random=()=>{
    seed=(seed*16807)%2147483647;
    return(seed-1)/2147483646;
  };
  const fragment=document.createDocumentFragment();
  for(let index=0;index<220;index++){
    const dot=document.createElement('i');
    const angle=random()*Math.PI*2;
    const radius=Math.pow(random(),.58);
    const x=50+Math.cos(angle)*radius*(38+random()*8)+Math.sin(angle*2.4)*5*(1-radius);
    const y=50+Math.sin(angle)*radius*(34+random()*7)+Math.cos(angle*1.8)*6*(1-radius);
    dot.style.setProperty('--x',`${x}%`);
    dot.style.setProperty('--y',`${y}%`);
    dot.style.setProperty('--size',`${3.5+random()*7.5}px`);
    dot.style.setProperty('--delay',`${-random()*12}s`);
    dot.style.setProperty('--duration',`${5+random()*9}s`);
    dot.style.setProperty('--dx',`${-24+random()*48}px`);
    dot.style.setProperty('--dy',`${-20+random()*40}px`);
    if(index%27===0) dot.classList.add('is-acid');
    if(index%5===0) dot.classList.add('is-bright');
    fragment.appendChild(dot);
  }
  particleDom.appendChild(fragment);
}
if(particleCanvas){
  const context=particleCanvas.getContext('2d');
  const particleStage=particleCanvas.closest('[data-liquid-stage]');
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let particles=[];
  let particleFrame=0;
  let particlePointer={x:0,y:0,active:false};
  const particleCount=260;

  const resizeParticles=()=>{
    const rect=particleCanvas.getBoundingClientRect();
    const ratio=Math.min(devicePixelRatio||1,1.7);
    const nextWidth=Math.max(1,Math.round(rect.width*ratio));
    const nextHeight=Math.max(1,Math.round(rect.height*ratio));
    if(particleCanvas.width!==nextWidth||particleCanvas.height!==nextHeight){
      particleCanvas.width=nextWidth;
      particleCanvas.height=nextHeight;
      context.setTransform(ratio,0,0,ratio,0,0);
    }
    if(!particles.length){
      particles=Array.from({length:particleCount},(_,index)=>{
        const angle=Math.random()*Math.PI*2;
        const radius=Math.pow(Math.random(),.62);
        return{
          angle,
          radius,
          phase:Math.random()*Math.PI*2,
          speed:.0014+Math.random()*.0022,
          size:.8+Math.random()*2.4,
          depth:.28+Math.random()*.72,
          green:index%31===0
        };
      });
    }
  };

  particleStage?.addEventListener('pointermove',event=>{
    const rect=particleCanvas.getBoundingClientRect();
    particlePointer.x=event.clientX-rect.left;
    particlePointer.y=event.clientY-rect.top;
    particlePointer.active=true;
  });
  particleStage?.addEventListener('pointerleave',()=>particlePointer.active=false);

  const drawParticles=stamp=>{
    resizeParticles();
    const width=particleCanvas.clientWidth;
    const height=particleCanvas.clientHeight;
    const centerX=width*.54;
    const centerY=height*.49;
    const scale=Math.min(width,height)*.43;
    const time=stamp*.001;
    context.clearRect(0,0,width,height);

    const rendered=particles.map((particle,index)=>{
      const motion=reduceMotion?0:time;
      const theta=particle.angle+motion*(.13+particle.speed*28)*(.55+particle.depth);
      const pulse=1+Math.sin(motion*.72+particle.phase)*.085;
      const waveX=Math.sin(theta*2.2+motion*.46+particle.phase)*scale*.13*(1-particle.radius);
      const waveY=Math.cos(theta*1.7-motion*.38+particle.phase)*scale*.15*(1-particle.radius);
      const flatten=.72+particle.depth*.26;
      let x=centerX+Math.cos(theta)*particle.radius*scale*pulse+waveX;
      let y=centerY+Math.sin(theta)*particle.radius*scale*flatten*pulse+waveY;
      const dx=x-particlePointer.x;
      const dy=y-particlePointer.y;
      const distance=Math.hypot(dx,dy);
      if(particlePointer.active&&distance<145){
        const force=(145-distance)/145;
        x+=dx/(distance||1)*force*25;
        y+=dy/(distance||1)*force*25;
      }
      return{x,y,size:particle.size*(.62+particle.depth*.7),depth:particle.depth,green:particle.green,index};
    });

    context.globalCompositeOperation='source-over';
    for(let i=0;i<rendered.length;i++){
      const a=rendered[i];
      for(let j=i+1;j<rendered.length;j++){
        const b=rendered[j];
        const dx=a.x-b.x,dy=a.y-b.y;
        const distance=Math.hypot(dx,dy);
        if(distance<54&&Math.abs(a.depth-b.depth)<.22){
          const alpha=(1-distance/54)*.16*Math.min(a.depth,b.depth);
          context.strokeStyle=`rgba(198,211,223,${alpha*1.45})`;
          context.lineWidth=.55;
          context.beginPath();context.moveTo(a.x,a.y);context.lineTo(b.x,b.y);context.stroke();
        }
      }
    }

    rendered.sort((a,b)=>a.depth-b.depth).forEach(particle=>{
      const glow=particle.size*3.5;
      const gradient=context.createRadialGradient(particle.x,particle.y,0,particle.x,particle.y,glow);
      if(particle.green){
        gradient.addColorStop(0,'rgba(190,255,64,.95)');
        gradient.addColorStop(.35,'rgba(190,255,64,.32)');
      }else{
        gradient.addColorStop(0,`rgba(255,255,255,${.95*particle.depth})`);
        gradient.addColorStop(.28,`rgba(181,197,211,${.72*particle.depth})`);
      }
      gradient.addColorStop(1,'rgba(110,125,138,0)');
      context.fillStyle=gradient;
      context.beginPath();context.arc(particle.x,particle.y,glow,0,Math.PI*2);context.fill();
      context.fillStyle=particle.green?'#c1ff43':`rgba(214,225,234,${.56+.4*particle.depth})`;
      context.beginPath();context.arc(particle.x,particle.y,particle.size*.62,0,Math.PI*2);context.fill();
    });

    const core=context.createRadialGradient(centerX,centerY,0,centerX,centerY,scale*.78);
    core.addColorStop(0,'rgba(226,236,244,.17)');
    core.addColorStop(.42,'rgba(170,189,205,.06)');
    core.addColorStop(1,'rgba(170,182,193,0)');
    context.fillStyle=core;
    context.beginPath();context.ellipse(centerX,centerY,scale*.88,scale*.68,Math.sin(time*.13)*.12,0,Math.PI*2);context.fill();

    if(!reduceMotion) particleFrame=requestAnimationFrame(drawParticles);
  };
  resizeParticles();
  particleFrame=requestAnimationFrame(drawParticles);
  addEventListener('resize',resizeParticles,{passive:true});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&particleFrame){cancelAnimationFrame(particleFrame);particleFrame=0;}
    else if(!document.hidden&&!particleFrame)particleFrame=requestAnimationFrame(drawParticles);
  });
}
document.querySelectorAll('.dashboard-live-cover').forEach(dashboardLiveCover => {
  const dashboardFrame = dashboardLiveCover.querySelector('iframe');
  const frameWidth = Number(dashboardLiveCover.dataset.frameWidth) || 1920;
  const frameHeight = Number(dashboardLiveCover.dataset.frameHeight) || 996;
  dashboardLiveCover.style.aspectRatio = `${frameWidth} / ${frameHeight}`;
  dashboardFrame.style.width = `${frameWidth}px`;
  dashboardFrame.style.height = `${frameHeight}px`;
  const resizeDashboardCover = () => {
    const scale = dashboardLiveCover.clientWidth / frameWidth;
    dashboardFrame.style.transform = `scale(${scale})`;
  };
  resizeDashboardCover();
  new ResizeObserver(resizeDashboardCover).observe(dashboardLiveCover);
});
