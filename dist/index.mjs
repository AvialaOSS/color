import w from "color";
function O(t) {
  return w(t).rgb().round().color.join(",");
}
const L = ["hex", "rgb", "hsl"];
function k(t) {
  return !t || L.indexOf(t) < 0 ? "hex" : t;
}
function H(t, n) {
  const s = k(n);
  return s === "hex" ? t[s]().toLowerCase() : t[s]().round().string();
}
function D(t, n, s) {
  const r = w(t), a = r.hue(), o = r.saturationv(), e = r.value(), c = ((b) => b >= 60 && b <= 240 ? 2.5 : b >= 0 && b < 60 || b > 300 && b <= 360 ? 1.5 : 2)(a), l = 100, u = 9, h = 100, f = 30;
  function M(b, p) {
    let x;
    return a >= 60 && a <= 240 ? x = b ? a - c * p : a + c * p : x = b ? a + c * p : a - c * p, x < 0 ? x += 360 : x >= 360 && (x -= 360), Math.round(x);
  }
  function d(b, p) {
    let x;
    if (b)
      x = o <= u ? o : o - (o - u) / 5.5 * Math.pow(p, 1.05);
    else {
      const A = Math.min(l, o + 30);
      x = o + (A - o) / 4.2 * Math.pow(p, 0.95);
    }
    return Math.max(0, Math.min(100, x));
  }
  function g(b, p) {
    return b ? Math.min(h, e + (h - e) / 5.2 * Math.pow(p, 0.9)) : e <= f ? e : Math.max(f, e - (e - f) / 4.2 * Math.pow(p, 1.05));
  }
  const m = n < 6, y = m ? 6 - n : n - 6, E = n === 6 ? r : w({
    h: M(m, y),
    s: d(m, y),
    v: g(m, y)
  });
  return H(E, s);
}
function v(t, n, s) {
  const r = w(D(t, 10 - n + 1)), a = w(t), o = a.hue(), e = a.saturationv(), c = w({
    h: a.hue(),
    s: h(6),
    v: a.value()
  }).saturationv(), l = Math.ceil((c - 9) / 4), u = Math.ceil((100 - c) / 5);
  function h(M) {
    if (M < 6)
      return c + (6 - M) * u;
    if (M === 6) {
      if (o >= 0 && o < 50)
        return e - 15;
      if (o >= 50 && o < 191)
        return e - 20;
      if (o >= 191 && o <= 360)
        return e - 15;
    }
    return c - l * (M - 6);
  }
  const f = w({
    h: r.hue(),
    s: h(n),
    v: r.value()
  });
  return H(f, s);
}
function $(t, n = {}) {
  const { dark: s, list: r, index: a = 6, format: o = "hex" } = n;
  if (r) {
    const e = [], i = s ? v : D;
    for (let c = 1; c <= 10; c++)
      e.push(i(t, c, o));
    return e;
  }
  return s ? v(t, a, o) : D(t, a, o);
}
async function z(t) {
  try {
    const n = await P(t), s = G(n);
    return V(s);
  } catch (n) {
    throw console.error("提取图片颜色失败:", n), n;
  }
}
async function P(t) {
  return new Promise((n, s) => {
    try {
      if (typeof document > "u") {
        s(new Error("图像颜色提取功能仅在浏览器环境中可用"));
        return;
      }
      const r = document.createElement("canvas"), a = r.getContext("2d"), o = Math.min(t.width, 100), e = Math.min(t.height, 100), i = Math.min(o / t.width, e / t.height);
      r.width = t.width * i, r.height = t.height * i, a.drawImage(t, 0, 0, r.width, r.height);
      const c = a.getImageData(0, 0, r.width, r.height);
      n(c);
    } catch (r) {
      s(r);
    }
  });
}
function G(t) {
  const n = t.data, s = /* @__PURE__ */ new Map();
  for (let a = 0; a < n.length; a += 4) {
    const o = n[a], e = n[a + 1], i = n[a + 2];
    if (n[a + 3] < 128) continue;
    const l = Math.round(o / 16) * 16, u = Math.round(e / 16) * 16, h = Math.round(i / 16) * 16, f = `${l},${u},${h}`;
    s.has(f) ? s.set(f, s.get(f) + 1) : s.set(f, 1);
  }
  const r = [];
  return s.forEach((a, o) => {
    const [e, i, c] = o.split(",").map(Number);
    r.push({ r: e, g: i, b: c, count: a });
  }), r;
}
function V(t) {
  t.sort((a, o) => o.count - a.count);
  const n = t.filter((a) => {
    const { r: o, g: e, b: i } = a, c = Math.max(o, e, i), l = Math.min(o, e, i), u = c - l, h = c === 0 ? 0 : u / c, f = c / 255;
    return h > 0.15 && f > 0.2 && f < 0.8;
  }), s = n.length > 0 ? n[0] : t[0];
  return w({ r: s.r, g: s.g, b: s.b }).hex();
}
function U(t) {
  return new Promise((n, s) => {
    if (typeof FileReader > "u" || typeof Image > "u") {
      s(new Error("文件读取功能仅在浏览器环境中可用"));
      return;
    }
    if (!t.type.startsWith("image/")) {
      s(new Error("请选择图片文件"));
      return;
    }
    const r = new FileReader();
    r.onload = async (a) => {
      try {
        const o = new Image();
        o.onload = async () => {
          try {
            const e = await z(o);
            n(e);
          } catch (e) {
            s(e);
          }
        }, o.onerror = () => s(new Error("图片加载失败")), o.src = a.target.result;
      } catch (o) {
        s(o);
      }
    }, r.onerror = () => s(new Error("文件读取失败")), r.readAsDataURL(t);
  });
}
function B(t, n, s = {}) {
  const { steps: r = 10, format: a = "hex", includeEnds: o = !0 } = s;
  if (r < 2)
    throw new Error("步数必须至少为2");
  const e = w(t), i = w(n), c = [], l = o ? r : r + 2, u = 1 / (l - 1);
  for (let h = 0; h < l; h++) {
    const f = h * u, M = Math.round(e.red() + (i.red() - e.red()) * f), d = Math.round(e.green() + (i.green() - e.green()) * f), g = Math.round(e.blue() + (i.blue() - e.blue()) * f), m = w({ r: M, g: d, b: g });
    !o && (h === 0 || h === l - 1) || c.push(H(m, a));
  }
  return c;
}
function K(t = {}) {
  const {
    startGray: n = "#ffffff",
    endGray: s = "#000000",
    steps: r = 10,
    format: a = "hex"
  } = t;
  return B(n, s, { steps: r, format: a, includeEnds: !0 });
}
function W(t, n = {}) {
  const { steps: s = 10, format: r = "hex", lightnessRange: a = 80 } = n, o = w(t), e = o.hsl(), i = o.lightness(), c = Math.min(95, i + a / 2), l = Math.max(5, i - a / 2), u = w({
    h: e.color[0],
    s: e.color[1],
    l: c
  }), h = w({
    h: e.color[0],
    s: e.color[1],
    l
  });
  return B(u.hex(), h.hex(), { steps: s, format: r, includeEnds: !0 });
}
function J(t, n, s = {}) {
  const { steps: r = 10, format: a = "hex", includeEnds: o = !0 } = s;
  if (r < 2)
    throw new Error("步数必须至少为2");
  const e = w(t).hsl(), i = w(n).hsl(), c = [], l = o ? r : r + 2, u = 1 / (l - 1);
  let h = e.color[0] || 0, f = i.color[0] || 0;
  const M = f - h;
  Math.abs(M) > 180 && (M > 0 ? h += 360 : f += 360);
  for (let d = 0; d < l; d++) {
    const g = d * u;
    let m = h + (f - h) * g;
    const y = e.color[1] + (i.color[1] - e.color[1]) * g, E = e.color[2] + (i.color[2] - e.color[2]) * g;
    m = m % 360, m < 0 && (m += 360);
    const b = w({ h: m, s: y, l: E });
    !o && (d === 0 || d === l - 1) || c.push(H(b, a));
  }
  return c;
}
function S(t) {
  if (!t || typeof t != "string")
    throw new Error("Invalid RGB color: must be a string");
  const n = t.replace("#", "");
  if (!/^[0-9A-Fa-f]{6}$/.test(n))
    throw new Error("Invalid RGB color format: must be #rrggbb or rrggbb");
  const s = parseInt(n.slice(0, 2), 16) / 255, r = parseInt(n.slice(2, 4), 16) / 255, a = parseInt(n.slice(4, 6), 16) / 255, o = Math.max(s, r, a), e = Math.min(s, r, a), i = o - e;
  let c = 0;
  i !== 0 && (o === s ? c = (r - a) / i % 6 : o === r ? c = (a - s) / i + 2 : c = (s - r) / i + 4), c = Math.round(c * 60), c < 0 && (c += 360);
  const l = Math.round((0.299 * s + 0.587 * r + 0.114 * a) * 100), u = (o + e) / 2;
  let h = 0;
  i !== 0 && u !== 0 && u !== 1 && (h = i / (1 - Math.abs(2 * u - 1)));
  let f = 0;
  return l > 0 && l < 100 && (f = Math.round(h * Math.min(l, 100 - l))), { h: c, c: Math.max(0, f), t: Math.max(0, Math.min(100, l)) };
}
function R(t, n = {}) {
  if (!t || typeof t != "object" || t.h === void 0 || t.c === void 0 || t.t === void 0)
    throw new Error("Invalid HCT color: must be an object with h, c, t properties");
  const { h: s, c: r, t: a } = t, { maxChroma: o = 200 } = n, e = (s % 360 + 360) % 360, i = Math.max(0, Math.min(o, r)), c = Math.max(0, Math.min(100, a)), l = c / 100;
  let u = 0;
  if (c > 0 && c < 100 && i > 0) {
    const E = Math.min(c, 100 - c);
    u = E > 0 ? i / E : 0;
  }
  const h = (1 - Math.abs(2 * l - 1)) * Math.min(1, u), f = h * (1 - Math.abs(e / 60 % 2 - 1)), M = l - h / 2;
  let d, g, m;
  e >= 0 && e < 60 ? [d, g, m] = [h, f, 0] : e >= 60 && e < 120 ? [d, g, m] = [f, h, 0] : e >= 120 && e < 180 ? [d, g, m] = [0, h, f] : e >= 180 && e < 240 ? [d, g, m] = [0, f, h] : e >= 240 && e < 300 ? [d, g, m] = [f, 0, h] : [d, g, m] = [h, 0, f];
  const y = (E) => {
    const b = Math.max(0, Math.min(1, E + M)), p = Math.round(b * 255).toString(16);
    return p.length === 1 ? "0" + p : p;
  };
  return `#${y(d)}${y(g)}${y(m)}`;
}
function F(t, n, s = 0.5) {
  if (!t || !n)
    throw new Error("Both colors are required for blending");
  const r = Math.max(0, Math.min(1, s)), a = S(t), o = S(n);
  let e = a.h, i = o.h, c = i - e;
  Math.abs(c) > 180 && (c > 0 ? e += 360 : i += 360, c = i - e);
  const l = (e + c * r) % 360, u = a.c + (o.c - a.c) * r, h = a.t + (o.t - a.t) * r;
  return R({
    h: l < 0 ? l + 360 : l,
    c: Math.max(0, Math.round(u)),
    t: Math.max(0, Math.min(100, Math.round(h)))
  });
}
function Q(t, n, s = 0.15) {
  if (!t || !n)
    throw new Error("Both theme color and target color are required");
  const r = Math.max(0, Math.min(1, s)), a = S(t), o = S(n);
  let e = o.h, i = a.h, c = i - e;
  Math.abs(c) > 180 && (c > 0 ? e += 360 : i += 360, c = i - e);
  const l = (e + c * r) % 360;
  return R({
    h: l < 0 ? l + 360 : l,
    c: o.c,
    // 保持原有色度
    t: o.t
    // 保持原有色调
  });
}
function X(t, n = [10, 20, 30, 40, 50, 60, 70, 80, 90]) {
  if (!t)
    throw new Error("Theme color is required");
  const s = S(t);
  let r;
  if (Array.isArray(n) ? r = n : n && n.tones && Array.isArray(n.tones) ? r = n.tones : r = [10, 20, 30, 40, 50, 60, 70, 80, 90], !Array.isArray(r) || r.length === 0)
    throw new Error("Tone steps must be a non-empty array");
  const a = r.filter((o) => typeof o == "number" && o >= 0 && o <= 100);
  if (a.length === 0)
    throw new Error("No valid tone values found (must be numbers between 0-100)");
  return a.map((o) => R({
    h: s.h,
    c: s.c,
    t: o
  }));
}
function j(t, n, s = 0.2) {
  if (!t)
    throw new Error("Theme color is required");
  if (!n || typeof n != "object")
    throw new Error("UI colors must be an object");
  const r = Math.max(0, Math.min(1, s)), a = {};
  for (const [o, e] of Object.entries(n))
    try {
      a[o] = F(t, e, r);
    } catch (i) {
      console.warn(`Failed to blend color for key "${o}": ${i.message}`), a[o] = e;
    }
  return a;
}
function I(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    baseGray: s = "#666666",
    blendRatio: r = 0.08,
    isDark: a = !1
  } = n, o = Math.max(0, Math.min(1, r)), e = S(s), i = {};
  return (a ? [95, 90, 85, 80, 70, 60, 50, 40, 30, 20, 15, 10] : [10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95]).forEach((l, u) => {
    const h = { h: e.h, c: e.c, t: l }, f = F(R(h), t, o);
    i[`gray-${u + 1}`] = f;
  }), i;
}
function T(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    semanticColors: s = {
      success: "#52c41a",
      warning: "#faad14",
      error: "#ff4d4f",
      info: "#1890ff"
    },
    blendRatio: r = 0,
    isDark: a = !1
  } = n;
  if (!s || typeof s != "object")
    throw new Error("Semantic colors must be an object");
  const o = Math.max(0, Math.min(1, r)), e = {};
  return Object.entries(s).forEach(([i, c]) => {
    if (!c || typeof c != "string") {
      console.warn(`Invalid color for semantic color "${i}": ${c}`);
      return;
    }
    try {
      const l = {}, u = S(c);
      (a ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]).forEach((f, M) => {
        const d = { h: u.h, c: u.c, t: f }, g = F(R(d), t, o);
        l[`${i}-${M + 1}`] = g;
      }), Object.assign(e, l);
    } catch (l) {
      console.warn(`Failed to generate variants for semantic color "${i}": ${l.message}`);
    }
  }), e;
}
function q(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const { isDark: s = !1 } = n, r = S(t), a = {};
  return (s ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]).forEach((e, i) => {
    const c = { h: r.h, c: r.c, t: e };
    a[`theme-${i + 1}`] = R(c);
  }), a;
}
function Y(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    baseGray: s = "#666666",
    isDark: r = !1,
    semanticColors: a,
    controlBlendRatio: o = 0.08,
    semanticBlendRatio: e = 0.12
  } = n, i = Math.max(0, Math.min(1, o)), c = Math.max(0, Math.min(1, e));
  return {
    // 1. 基础控件颜色（灰色系1-12）
    controls: I(t, {
      baseGray: s,
      blendRatio: i,
      isDark: r
    }),
    // 2. 表意色（1-10）
    semantic: T(t, {
      semanticColors: a,
      blendRatio: c,
      isDark: r
    }),
    // 3. 主题色（1-10）
    theme: q(t, { isDark: r })
  };
}
function Z(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    semanticColors: s = {
      success: "#52c41a",
      warning: "#faad14",
      error: "#ff4d4f",
      info: "#1890ff"
    },
    uiColors: r = {
      background: "#ffffff",
      surface: "#fafafa",
      border: "#d9d9d9",
      disabled: "#f5f5f5"
    },
    harmonizeRatio: a = 0.15,
    blendRatio: o = 0.12,
    isDark: e = !1
  } = n, i = Math.max(0, Math.min(1, a)), c = Math.max(0, Math.min(1, o)), l = q(t, { isDark: e }), u = I(t, {
    blendRatio: c * 0.5,
    // 中性色混合比例稍低
    isDark: e
  }), h = T(t, {
    semanticColors: s,
    blendRatio: i,
    isDark: e
  }), f = {};
  return Object.entries(s).forEach(([d]) => {
    f[d] = {};
    for (let g = 1; g <= 10; g++) {
      const m = `${d}-${g}`;
      h[m] && (f[d][g] = h[m]);
    }
  }), {
    theme: l,
    // 主题色阶 theme-1 到 theme-10
    controls: u,
    // 中性色阶 gray-1 到 gray-12
    semantic: f,
    // 功能色系
    ui: j(t, r, c)
  };
}
const C = {
  red: "#F53F3F",
  orangered: "#F77234",
  orange: "#FF7D00",
  gold: "#F7BA1E",
  yellow: "#FADC19",
  lime: "#9FDB1D",
  green: "#00B42A",
  cyan: "#14C9C9",
  blue: "#3491FA",
  arcoblue: "#165DFF",
  purple: "#722ED1",
  pinkpurple: "#D91AD9",
  magenta: "#F5319D"
};
function _() {
  const t = {};
  return Object.keys(C).forEach((n) => {
    t[n] = {}, t[n].light = $(C[n], { list: !0 }), t[n].dark = $(C[n], { list: !0, dark: !0 }), t[n].primary = C[n];
  }), t.gray = {}, t.gray.light = [
    "#f7f8fa",
    "#f2f3f5",
    "#e5e6eb",
    "#c9cdd4",
    "#a9aeb8",
    "#86909c",
    "#6b7785",
    "#4e5969",
    "#272e3b",
    "#1d2129"
  ], t.gray.dark = [
    "#17171a",
    "#2e2e30",
    "#484849",
    "#5f5f60",
    "#78787a",
    "#929293",
    "#ababac",
    "#c5c5c5",
    "#dfdfdf",
    "#f6f6f6"
  ], t.gray.primary = t.gray.light[6], t;
}
export {
  F as blendInHct,
  j as blendUIColors,
  C as colorList,
  U as extractColorFromFile,
  z as extractColorFromImage,
  $ as generate,
  I as generateControlColors,
  K as generateGrayLinear,
  Y as generateInterfaceColorSystem,
  B as generateLinear,
  J as generateLinearHSL,
  W as generateMonochromeLinear,
  T as generateSemanticColors,
  q as generateThemeColors,
  Z as generateThemePalette,
  X as generateThemeVariants,
  _ as getPresetColors,
  O as getRgbStr,
  Q as harmonizeColor,
  R as hctToRgb,
  S as rgbToHct
};
