const areaData = [
  { name: "H区", in: 314, out: 907 },
  { name: "D区", in: 424, out: 807 },
  { name: "F区", in: 142, out: 629 },
  { name: "B区", in: 822, out: 576 },
  { name: "C区", in: 732, out: 377 },
  { name: "A1区", in: 372, out: 215 },
  { name: "A2区", in: 315, out: 192 },
  { name: "G区", in: 272, out: 94 }
];

const areaColors = {
  "H区": "#367cff",
  "B区": "#ffd32e",
  "C区": "#ff7a1d",
  "D区": "#f65ed1",
  "F区": "#ff4138",
  "A1区": "#27c585",
  "A2区": "#22e6c0",
  "G区": "#66718a"
};

const chartText = {
  color: "rgba(203, 215, 239, .78)",
  fontFamily: "PingFang SC, Microsoft YaHei, Arial"
};

const matchStartTime = new Date("2026-05-31T18:58:29");
let statusTimer;

function resizeScreen() {
  const designWidth = 2304;
  const designHeight = 1280;
  const scaleX = window.innerWidth / designWidth;
  const scaleY = window.innerHeight / designHeight;
  const scale = Math.min(scaleX, scaleY);
  document.getElementById("dashboard").style.transform = `scale(${scale})`;
}

function padTime(value) {
  return String(value).padStart(2, "0");
}

function formatDateTime(date) {
  return [
    date.getFullYear(),
    padTime(date.getMonth() + 1),
    padTime(date.getDate())
  ].join("-") + " " + [
    padTime(date.getHours()),
    padTime(date.getMinutes()),
    padTime(date.getSeconds())
  ].join(":");
}

function formatElapsed(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}天${hours}小时${minutes}分钟${seconds}秒`;
}

function startStatusClock() {
  const currentTime = document.getElementById("currentTime");
  const elapsed = document.getElementById("elapsed");
  const update = () => {
    const now = new Date();
    currentTime.textContent = formatDateTime(now);
    elapsed.textContent = formatElapsed(now - matchStartTime);
  };
  clearInterval(statusTimer);
  update();
  statusTimer = setInterval(update, 1000);
}

function animateNumbers() {
  document.querySelectorAll(".roll-number").forEach((node) => {
    const target = Number(node.dataset.value);
    const started = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function initGauge() {
  const chart = echarts.init(document.getElementById("gaugeChart"));
  chart.setOption({
    animationDuration: 900,
    series: [
      {
        type: "gauge",
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 100,
        radius: "100%",
        center: ["50%", "58%"],
        splitNumber: 4,
        axisLine: {
          lineStyle: {
            width: 0,
            color: [[1, "rgba(0,0,0,0)"]]
          }
        },
        pointer: {
          show: false
        },
        anchor: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          show: true,
          valueAnimation: true,
          formatter: "{value}%",
          offsetCenter: [0, "18%"],
          color: "#FFFFFF",
          fontSize: 60,
          fontWeight: 700,
          fontFamily: "DIN Alternate, PingFang SC, Microsoft YaHei, Arial"
        },
        data: [{ value: 28 }]
      }
    ]
  });
}

function initBarChart() {
  const chart = echarts.init(document.getElementById("barChart"));
  chart.setOption({
    animationDuration: 900,
    grid: { left: 28, right: 8, top: 38, bottom: 8, containLabel: true },
    legend: {
      top: 0,
      left: "center",
      itemWidth: 25,
      itemHeight: 18,
      itemGap: 42,
      textStyle: { ...chartText, color: "#e6eefc", fontSize: 18, fontWeight: 600 },
      data: ["已入场票数", "已实名未入场票数"]
    },
    tooltip: { trigger: "axis", backgroundColor: "rgba(22,29,55,.95)", borderColor: "rgba(255,255,255,.14)", textStyle: { color: "#fff" } },
    xAxis: {
      type: "category",
      data: areaData.map((item) => item.name),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: "rgba(98,125,184,.48)" } },
      axisLabel: { color: "rgba(229,236,255,.82)", fontSize: 18, margin: 14 }
    },
    yAxis: {
      type: "value",
      max: 1200,
      interval: 300,
      splitLine: { lineStyle: { color: "rgba(82,114,170,.32)" } },
      axisLabel: { color: "rgba(151,164,194,.72)", fontSize: 18 },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: "已入场票数",
        type: "bar",
        barWidth: 48,
        barGap: "28%",
        data: areaData.map((item) => item.in),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#63d39f" },
            { offset: 1, color: "#45a783" }
          ]),
          borderRadius: [2, 2, 0, 0]
        },
        label: { show: true, position: "top", color: "#e6ecf8", fontSize: 20 }
      },
      {
        name: "已实名未入场票数",
        type: "bar",
        barWidth: 48,
        data: areaData.map((item) => item.out),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#3f83ff" },
            { offset: 1, color: "#2362dc" }
          ]),
          borderRadius: [2, 2, 0, 0]
        },
        label: { show: true, position: "top", color: "#e6ecf8", fontSize: 20 }
      }
    ]
  });
}

function initDonut(id, values, names, counts) {
  echarts.init(document.getElementById(id)).setOption({
    animationDuration: 850,
    animationDurationUpdate: 200,
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(20,29,58,.96)",
      borderColor: "rgba(91,231,179,.42)",
      borderWidth: 1,
      padding: [10, 14],
      textStyle: { color: "#fff", fontSize: 16, fontFamily: "PingFang SC, Microsoft YaHei, Arial" },
      formatter: (params) => `${params.name}<br/>${Number(params.value).toFixed(2)}%<br/>${params.data.count}人`
    },
    series: [{
      type: "pie",
      radius: ["48%", "78%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      label: { show: false },
      labelLine: { show: false },
      selectedMode: false,
      emphasis: {
        scale: true,
        scaleSize: 4,
        itemStyle: {
          shadowBlur: 16,
          shadowColor: "rgba(91,231,179,.36)"
        }
      },
      data: [
        { name: names[0], value: values[0], count: counts[0], itemStyle: { color: "#36efbd" } },
        { name: names[1], value: values[1], count: counts[1], itemStyle: { color: "#2d74ff" } }
      ]
    }]
  });
}

function trendData(mode = "minute") {
  const anchors = [
    [0, 10], [8, 11], [16, 12], [24, 14], [32, 18], [40, 24],
    [48, 42], [52, 27], [56, 50], [60, 74], [64, 62], [68, 82],
    [72, 68], [76, 86], [80, 78], [84, 99], [88, 86], [92, 76],
    [96, 100], [100, 79], [102, 106], [103, 14]
  ];
  const offsets = [0, 2, -2, 1, -1, 3, -3, 2];
  const values = Array.from({ length: 104 }, (_, index) => {
    const nextAnchorIndex = anchors.findIndex(([point]) => point >= index);
    if (nextAnchorIndex === 0) return anchors[0][1];
    const currentAnchorIndex = nextAnchorIndex < 0 ? anchors.length - 1 : nextAnchorIndex;
    const [rightIndex, rightValue] = anchors[currentAnchorIndex];
    const [leftIndex, leftValue] = anchors[currentAnchorIndex - 1];
    const progress = (index - leftIndex) / (rightIndex - leftIndex);
    const value = leftValue + (rightValue - leftValue) * progress + offsets[index % offsets.length];
    return Math.max(8, Math.round(value));
  });
  values[103] = 14;
  const times = values.map((_, index) => {
    const minutes = 14 * 60 + index;
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    return `${h}:${m}`;
  });
  if (mode === "ten") {
    const tenTimes = ["14:00", "14:10", "14:20", "14:30", "14:40", "14:50", "15:00", "15:10", "15:20", "15:30", "15:40", "15:43"];
    const tenValues = tenTimes.map((label) => {
      const index = times.indexOf(label);
      if (index < 0) return values[values.length - 1];
      const start = Math.max(0, index - 9);
      const slice = values.slice(start, index + 1);
      return Math.round(slice.reduce((sum, value) => sum + value, 0) / slice.length);
    });
    return {
      times: tenTimes,
      values: tenValues
    };
  }
  return { times, values };
}

let trendChart;

function renderTrend(mode = "minute") {
  const { times, values } = trendData(mode);
  const averageValues = values.map(() => 39.45);
  trendChart ||= echarts.init(document.getElementById("trendChart"));
  trendChart.setOption({
    animationDuration: 700,
    grid: { left: 62, right: 30, top: 58, bottom: 78 },
    legend: {
      top: 6,
      left: 16,
      itemWidth: 26,
      textStyle: { ...chartText, color: "rgba(230,238,255,.86)", fontSize: 18 },
      data: ["已入场票数", "已入场票数均值39.45"]
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(36,39,63,.96)",
      borderColor: "rgba(255,255,255,.18)",
      textStyle: { color: "#f2f6ff", fontSize: 16 },
      formatter: () => "2026-06-06 15:22<br/>● 已入场票数&nbsp;&nbsp;78"
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: times,
      axisLine: { lineStyle: { color: "rgba(99,125,181,.42)" } },
      axisTick: { show: false },
      axisLabel: {
        color: "rgba(151,164,194,.72)",
        fontSize: 16,
        interval: mode === "minute"
          ? (index) => index % 10 === 0 || index === times.length - 1
          : 0,
        hideOverlap: false,
        margin: 14
      },
      name: "入场时间",
      nameLocation: "middle",
      nameGap: 52,
      nameTextStyle: { color: "rgba(230,238,255,.9)", fontSize: 18, fontWeight: 600 }
    },
    yAxis: {
      type: "value",
      max: 125,
      interval: 25,
      splitLine: { lineStyle: { color: "rgba(82,114,170,.26)" } },
      axisLabel: { color: "rgba(151,164,194,.72)", fontSize: 16 },
      axisLine: { show: true, lineStyle: { color: "rgba(99,125,181,.42)" } },
      axisTick: { show: false },
      name: "已入场票数",
      nameLocation: "middle",
      nameGap: 48,
      nameTextStyle: { color: "rgba(230,238,255,.88)", fontSize: 18, fontWeight: 600 }
    },
    series: [
      {
        name: "已入场票数",
        type: "line",
        smooth: false,
        symbol: "circle",
        symbolSize: 7,
        data: values,
        lineStyle: { width: 3, color: "#4bdc83" },
        itemStyle: { color: "#55f097" },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(67, 221, 132, .38)" },
            { offset: 1, color: "rgba(67, 221, 132, .04)" }
          ])
        },
        markLine: {
          symbol: "none",
          label: {
            show: true,
            position: "insideEndTop",
            formatter: "每分钟\n入场票数39.45",
            color: "#ff2a3c",
            fontSize: 16,
            lineHeight: 20,
            align: "right",
            distance: [0, 10]
          },
          lineStyle: { color: "#ff2a3c", width: 2, type: "dashed" },
          data: [{ yAxis: 39.45 }]
        }
      },
      {
        name: "已入场票数均值39.45",
        type: "line",
        data: averageValues,
        symbol: "circle",
        symbolSize: 7,
        showSymbol: false,
        lineStyle: { color: "#ff2a3c", width: 2, type: "dashed" },
        itemStyle: { color: "#ff2a3c" },
        emphasis: { disabled: true }
      }
    ]
  }, true);
}

function createSeat(area, state, selected = false) {
  const seat = document.createElement("button");
  seat.type = "button";
  seat.className = `seat ${state}${selected ? " selected" : ""}`;
  seat.setAttribute("aria-label", `${area}座位 ${state}`);
  seat.addEventListener("click", () => {
    document.querySelectorAll(".seat.selected").forEach((item) => item.classList.remove("selected"));
    seat.classList.add("selected");
  });
  return seat;
}

function createSection(config) {
  const section = document.createElement("div");
  section.className = "seat-section";
  section.style.left = `${config.x}px`;
  section.style.top = `${config.y}px`;
  section.style.setProperty("--area-color", areaColors[config.area]);

  const label = document.createElement("div");
  label.className = "section-label";
  label.textContent = config.area;
  label.style.left = `${config.labelX ?? Math.max(20, (config.cols * 18) / 2 - 28)}px`;
  label.style.top = `${config.labelY ?? -34}px`;
  section.appendChild(label);

  const grid = document.createElement("div");
  grid.className = "seat-grid";
  grid.style.setProperty("--cols", config.cols);

  for (let r = 0; r < config.rows; r += 1) {
    const rowLabel = document.createElement("span");
    rowLabel.className = "seat-row-label";
    rowLabel.style.top = `${r * 17}px`;
    rowLabel.textContent = String(r + 1);
    section.appendChild(rowLabel);

    for (let c = 0; c < config.cols; c += 1) {
      const edge = config.shape === "left" ? c < r : config.shape === "right" ? c >= config.cols - r : false;
      const empty = config.holes?.some(([hr, hc]) => hr === r && hc === c) || edge;
      if (empty) {
        const blank = document.createElement("span");
        grid.appendChild(blank);
        continue;
      }
      const hash = (r * config.cols + c + config.seed) % 13;
      const state = hash === 0 ? "alert" : hash < config.entered ? "entered" : "empty";
      grid.appendChild(createSeat(config.area, state, r === 2 && c === 4 && config.area === "H区"));
    }
  }
  section.appendChild(grid);
  return section;
}

function buildSeatMap() {
  const map = document.getElementById("seatMap");
  const sections = [
    { area: "D区", rows: 8, cols: 13, x: 74, y: 54, seed: 2, entered: 9, shape: "left", labelX: 58 },
    { area: "F区", rows: 8, cols: 30, x: 246, y: 54, seed: 5, entered: 8, labelX: 190 },
    { area: "C区", rows: 8, cols: 13, x: 600, y: 54, seed: 3, entered: 10, shape: "right", labelX: 58 },
    { area: "H区", rows: 6, cols: 14, x: 38, y: 306, seed: 1, entered: 4, shape: "left", labelX: 76 },
    { area: "A1区", rows: 8, cols: 31, x: 248, y: 316, seed: 7, entered: 4, labelX: 190 },
    { area: "A2区", rows: 6, cols: 14, x: 636, y: 306, seed: 8, entered: 5, shape: "right", labelX: 78 }
  ];
  sections.forEach((config) => map.appendChild(createSection(config)));

  const legend = document.createElement("div");
  legend.className = "legend";
  legend.innerHTML = ["H区", "B区", "C区", "D区", "F区", "A1区", "A2区"]
    .map((area) => `<span style="--area-color:${areaColors[area]}"><i></i>${area}</span>`)
    .join("");
  map.appendChild(legend);
}

function bindInteractions() {
  const popover = document.getElementById("seatPopover");
  const seatButton = document.getElementById("seatBtn");
  const title = document.getElementById("pageTitle");
  const defaultTitle = "票务平台实时监测系统";
  const liveTitle = "2026浙商银行浙江省城市足球联赛舟山赛区（舟山VS台州）";
  seatButton.addEventListener("click", (event) => {
    event.stopPropagation();
    popover.classList.toggle("open");
    const isOpen = popover.classList.contains("open");
    popover.setAttribute("aria-hidden", String(!isOpen));
    seatButton.classList.toggle("active", isOpen);
    title.textContent = isOpen ? liveTitle : defaultTitle;
  });
  popover.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("click", () => {
    popover.classList.remove("open");
    popover.setAttribute("aria-hidden", "true");
    seatButton.classList.remove("active");
    title.textContent = defaultTitle;
  });

  document.querySelectorAll(".switcher button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".switcher button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderTrend(button.dataset.mode);
    });
  });

  document.getElementById("refreshBtn").addEventListener("click", animateNumbers);
}

function boot() {
  resizeScreen();
  startStatusClock();
  animateNumbers();
  initGauge();
  initBarChart();
  initDonut("provinceChart", [29.89, 70.11], ["省内", "省外"], [3588, 8415]);
  initDonut("cityChart", [50.99, 49.01], ["市内", "市外"], [6121, 5882]);
  renderTrend();
  buildSeatMap();
  bindInteractions();
}

window.addEventListener("DOMContentLoaded", boot);
window.addEventListener("resize", resizeScreen);
