const hmiIcons = [
  ['导航', '<path d="M11 35 22 8l6 14 13 5-30 8Z"/><path d="m22 8 6 14-7 5Z"/>'],
  ['越野', '<path d="M7 34h34M10 34l5-17h18l5 17M15 17l6 8 6-8 6 8"/>'],
  ['影像', '<rect x="7" y="12" width="34" height="25" rx="7"/><path d="m18 12 3-5h6l3 5"/><circle cx="24" cy="25" r="7"/>'],
  ['车辆', '<path d="m9 29 4-11h22l4 11v8H9Z"/><path d="M14 29h20M14 37v4M34 37v4"/><circle cx="15" cy="31" r="2"/><circle cx="33" cy="31" r="2"/>'],
  ['音乐', '<path d="M19 35V13l19-4v22"/><circle cx="14" cy="35" r="5"/><circle cx="33" cy="31" r="5"/>'],
  ['通话', '<path d="M12 8h7l3 10-5 4c4 7 7 10 14 14l4-5 10 3v7c-1 3-5 4-8 3C20 39 9 28 5 12c0-3 3-4 7-4Z"/>'],
  ['天气', '<path d="M15 34h23a7 7 0 0 0 0-14 12 12 0 0 0-23-2 8 8 0 0 0 0 16Z"/><path d="M12 12V6M6 15l-4-3M18 10l3-4"/>'],
  ['空调', '<path d="M24 7v34M9 15l30 18M39 15 9 33"/><circle cx="24" cy="24" r="5"/>'],
  ['座椅', '<path d="M13 8v18c0 7 5 12 12 12h15M18 20h14v10H20"/><path d="M36 29v12"/>'],
  ['能量', '<path d="M27 4 12 27h12l-3 17 15-24H24Z"/>'],
  ['设置', '<circle cx="24" cy="24" r="6"/><path d="M24 5v6M24 37v6M5 24h6M37 24h6M10.5 10.5l4.5 4.5M33 33l4.5 4.5M37.5 10.5 33 15M15 33l-4.5 4.5"/>'],
  ['助手', '<circle cx="24" cy="19" r="10"/><path d="M8 43c2-9 8-13 16-13s14 4 16 13M18 18h.1M30 18h.1M19 24c3 2 7 2 10 0"/>']
];

const renderIconSystem = base => `
  <div class="shell desktop-stage">
    <div class="icon-board" aria-label="桌面图标系统">
      ${hmiIcons.map(([name, paths], index) => `
        <div class="app-icon">
          <span class="app-icon-mark"><svg viewBox="0 0 48 48" aria-hidden="true">${paths}</svg></span>
          <b>${name}</b><small>${String(index + 1).padStart(2, '0')}</small>
        </div>`).join('')}
    </div>
    <figure class="desktop-preview"><img src="${base}/center.jpg" alt="中控桌面界面应用效果" loading="lazy" /></figure>
  </div>`;

document.querySelectorAll('.case-native').forEach(root => {
  const caseId = root.dataset.case;
  const base = `../assets/gwm-hmi/${caseId}`;
  const sections = [
    {
      index: '01', eyebrow: 'DESIGN DNA', title: '视觉基因与座舱基线',
      description: '以统一材质、色彩和主动光语言建立仪表与中控的视觉基线，让两块屏幕拥有一致的识别节奏。',
      layout: 'dna', images: [
        { src: `${base}/cluster.jpg`, alt: '数字仪表主界面' },
        { src: `${base}/center.jpg`, alt: '智能座舱中控首页' }
      ]
    },
    {
      index: '02', eyebrow: 'COCKPIT INTEGRATION', title: '界面进入真实座舱',
      description: '将仪表和中控放回高端皮卡的真实空间，检验屏幕比例、环境光与驾驶视距下的整体关系。',
      layout: 'cockpit', images: [{ src: `${base}/editorial/cockpit.jpg`, alt: 'HMI实车座舱效果图' }]
    },
    {
      index: '03', eyebrow: 'DESKTOP & ICON SYSTEM', title: '桌面与图标语言',
      description: '图标保持统一线宽与几何骨架，以主题主动光建立层级；桌面则控制信息密度，让常用功能一步可达。',
      layout: 'icons', kind: 'icons'
    },
    {
      index: '04', eyebrow: 'DRIVER FOCUS', title: '驾驶信息，一眼完成识别',
      description: '车速、转速、挡位和转向提示保持最高优先级，装饰信息后退，复杂路况中仍能快速获取关键状态。',
      layout: 'wide', images: [{ src: `${base}/cluster.jpg`, alt: '驾驶聚焦仪表界面' }]
    },
    {
      index: '05', eyebrow: 'IMMERSIVE NAVIGATION', title: '让路线成为视觉中心',
      description: '导航独立成完整画布，地图、路线和车辆状态保持连续，并为下一步转向提供稳定的视觉锚点。',
      layout: 'wide', images: [{ src: `${base}/screens/03-nav.jpg`, alt: '沉浸式全屏导航界面' }]
    },
    {
      index: '06', eyebrow: 'OFF-ROAD PERCEPTION', title: '地形、车辆与传感器协作',
      description: '越野中心与 360° 全景影像并列，四驱控制、透明底盘和环境影像之间形成清晰的任务分工。',
      layout: 'pair', images: [
        { src: `${base}/screens/04-offroad.jpg`, alt: '越野中心车辆与地形信息界面' },
        { src: `${base}/screens/05-camera.jpg`, alt: '360度全景影像与透明底盘界面' }
      ]
    },
    {
      index: '07', eyebrow: 'DIGITAL TWIN & WELLNESS', title: '车外可控，座舱可感',
      description: '一致的页面骨架承载底盘、ADAS、座椅、空调与环境设置，在复杂功能中维持可预期的操作路径。',
      layout: 'pair', images: [
        { src: `${base}/screens/06-adas.jpg`, alt: '车辆控制与ADAS界面' },
        { src: `${base}/screens/07-comfort.jpg`, alt: '座舱舒适控制界面' }
      ]
    },
    {
      index: '08', eyebrow: 'IMMERSIVE SOUND', title: '把座舱变成聆听空间',
      description: '影音页面以更安静的结构突出内容与播放状态，并让空调、座椅等常驻控制保持稳定位置。',
      layout: 'wide', images: [{ src: `${base}/screens/08-media.jpg`, alt: '沉浸式影音娱乐界面' }]
    },
    {
      index: '09', eyebrow: 'VISUAL DIRECTION', title: '把设计概念转化为情绪',
      description: '以原创三维视觉收束整套方案，将机械、豪华或感知等抽象关键词转化为可被记住的空间氛围。',
      layout: 'mood', images: [{ src: `${base}/editorial/visual-atmosphere.jpg`, alt: 'HMI方案原创视觉氛围图' }]
    }
  ];

  root.innerHTML = sections.map(section => `
    <article class="story-section story-${section.layout}">
      <div class="shell story-copy">
        <span class="story-index">${section.index}</span>
        <div><small>${section.eyebrow}</small><h3>${section.title}</h3></div>
        <p>${section.description}</p>
      </div>
      ${section.kind === 'icons' ? renderIconSystem(base) : `
        <div class="story-visuals ${section.images.length > 1 ? 'is-pair' : ''}">
          ${section.images.map(image => `<figure><img src="${image.src}" alt="${image.alt}" loading="lazy" /></figure>`).join('')}
        </div>`}
    </article>`).join('');
});
