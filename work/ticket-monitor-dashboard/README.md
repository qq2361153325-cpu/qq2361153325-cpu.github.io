# 检票监控看板

固定尺寸大屏页面，画布为 `2304 × 1280`，使用 HTML + TailwindCSS CDN + ECharts CDN。

## 项目结构

```text
.
├── index.html
├── package.json
├── README.md
├── assets
│   ├── female-icon.png
│   ├── gauge-arc.png
│   ├── gauge-pointer.png
│   ├── kpi-entered-icon.png
│   ├── kpi-not-entered-icon.png
│   ├── kpi-sold-icon.png
│   ├── kpi-verified-icon.png
│   ├── male-icon.png
│   ├── refresh-icon.png
│   ├── seat-icon-active.png
│   └── seat-icon.png
└── src
    ├── app.js
    └── styles.css
```

## 运行

```bash
npm run start
```

然后访问 `http://localhost:4173`。

## 交互

- KPI 卡片支持 hover 高亮。
- 数字首次加载滚动。
- 区域柱状图、趋势图、环图均由 ECharts 渲染。
- 点击「查看入座实况」打开座位 Popover，座位由 JS 动态生成。
- 趋势图支持「按分钟 / 按10分钟」切换。
- 文字内容均在 HTML/JS 数据区中可编辑。
