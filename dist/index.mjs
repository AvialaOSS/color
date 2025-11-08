import w from "color";
function K(t) {
  return w(t).rgb().round().color.join(",");
}
const k = ["hex", "rgb", "hsl"];
function z(t) {
  return !t || !k.includes(
    /** @type {any} */
    t
  ) ? "hex" : (
    /** @type {'hex' | 'rgb' | 'hsl'} */
    t
  );
}
function L(t, n) {
  const c = z(n);
  return c === "hex" ? t[c]().toLowerCase() : t[c]().round().string();
}
function D(t, n, c) {
  const r = w(t), o = r.hue(), s = r.saturationv(), e = r.value(), a = ((p) => p >= 60 && p <= 240 ? 2.5 : p >= 0 && p < 60 || p > 300 && p <= 360 ? 1.5 : 2)(o), l = 100, f = 9, u = 100, h = 30;
  function d(p, b) {
    let x;
    return o >= 60 && o <= 240 ? x = p ? o - a * b : o + a * b : x = p ? o + a * b : o - a * b, x < 0 ? x += 360 : x >= 360 && (x -= 360), Math.round(x);
  }
  function M(p, b) {
    let x;
    if (p)
      x = s <= f ? s : s - (s - f) / 5.5 * Math.pow(b, 1.05);
    else {
      const v = Math.min(l, s + 30);
      x = s + (v - s) / 4.2 * Math.pow(b, 0.95);
    }
    return Math.max(0, Math.min(100, x));
  }
  function g(p, b) {
    return p ? Math.min(u, e + (u - e) / 5.2 * Math.pow(b, 0.9)) : e <= h ? e : Math.max(h, e - (e - h) / 4.2 * Math.pow(b, 1.05));
  }
  const m = n < 6, E = m ? 6 - n : n - 6, y = n === 6 ? r : w({
    h: d(m, E),
    s: M(m, E),
    v: g(m, E)
  });
  return L(y, c);
}
function H(t, n, c) {
  const r = w(D(t, 10 - n + 1, "hex")), o = w(t), s = o.hue(), e = o.saturationv();
  function i(d) {
    if (d < 6)
      return l + (6 - d) * u;
    if (d === 6) {
      if (s >= 0 && s < 50)
        return e - 15;
      if (s >= 50 && s < 191)
        return e - 20;
      if (s >= 191 && s <= 360)
        return e - 15;
    }
    return l - f * (d - 6);
  }
  const l = w({
    h: o.hue(),
    s: i(6),
    v: o.value()
  }).saturationv(), f = Math.ceil((l - 9) / 4), u = Math.ceil((100 - l) / 5), h = w({
    h: r.hue(),
    s: i(n),
    v: r.value()
  });
  return L(h, c);
}
function B(t, n = {}) {
  const { dark: c, list: r, index: o = 6, format: s = "hex" } = n;
  if (r) {
    const e = [], i = c ? H : D;
    for (let a = 1; a <= 10; a++)
      e.push(i(t, a, s));
    return e;
  }
  return c ? H(t, o, s) : D(t, o, s);
}
async function P(t) {
  try {
    const n = await O(t), c = G(n);
    return V(c);
  } catch (n) {
    throw console.error("提取图片颜色失败:", n), n;
  }
}
async function O(t) {
  return new Promise((n, c) => {
    try {
      if (typeof document > "u") {
        c(new Error("图像颜色提取功能仅在浏览器环境中可用"));
        return;
      }
      const r = document.createElement("canvas"), o = r.getContext("2d");
      if (!o) {
        c(new Error("无法获取canvas 2d context"));
        return;
      }
      const s = Math.min(t.width, 100), e = Math.min(t.height, 100), i = Math.min(s / t.width, e / t.height);
      r.width = t.width * i, r.height = t.height * i, o.drawImage(t, 0, 0, r.width, r.height);
      const a = o.getImageData(0, 0, r.width, r.height);
      n(a);
    } catch (r) {
      c(r);
    }
  });
}
function G(t) {
  const n = t.data, c = /* @__PURE__ */ new Map();
  for (let o = 0; o < n.length; o += 4) {
    const s = n[o], e = n[o + 1], i = n[o + 2];
    if (n[o + 3] < 128) continue;
    const l = Math.round(s / 16) * 16, f = Math.round(e / 16) * 16, u = Math.round(i / 16) * 16, h = `${l},${f},${u}`;
    c.has(h) ? c.set(h, c.get(h) + 1) : c.set(h, 1);
  }
  const r = [];
  return c.forEach((o, s) => {
    const [e, i, a] = s.split(",").map(Number);
    r.push({ r: e, g: i, b: a, count: o });
  }), r;
}
function V(t) {
  t.sort((o, s) => s.count - o.count);
  const n = t.filter((o) => {
    const { r: s, g: e, b: i } = o, a = Math.max(s, e, i), l = Math.min(s, e, i), f = a - l, u = a === 0 ? 0 : f / a, h = a / 255;
    return u > 0.15 && h > 0.2 && h < 0.8;
  }), c = n.length > 0 ? n[0] : t[0];
  return w({ r: c.r, g: c.g, b: c.b }).hex();
}
function W(t) {
  return new Promise((n, c) => {
    if (typeof FileReader > "u" || typeof Image > "u") {
      c(new Error("文件读取功能仅在浏览器环境中可用"));
      return;
    }
    if (!t.type.startsWith("image/")) {
      c(new Error("请选择图片文件"));
      return;
    }
    const r = new FileReader();
    r.onload = async (o) => {
      var s;
      try {
        const e = new Image();
        e.onload = async () => {
          try {
            const a = await P(e);
            n(a);
          } catch (a) {
            c(a);
          }
        }, e.onerror = () => c(new Error("图片加载失败"));
        const i = (s = o.target) == null ? void 0 : s.result;
        typeof i == "string" ? e.src = i : c(new Error("无法读取图片数据"));
      } catch (e) {
        c(e);
      }
    }, r.onerror = () => c(new Error("文件读取失败")), r.readAsDataURL(t);
  });
}
function $(t, n, c = {}) {
  const { steps: r = 10, format: o = "hex", includeEnds: s = !0 } = c;
  if (r < 2)
    throw new Error("步数必须至少为2");
  const e = w(t), i = w(n), a = [], l = s ? r : r + 2, f = 1 / (l - 1);
  for (let u = 0; u < l; u++) {
    const h = u * f, d = Math.round(e.red() + (i.red() - e.red()) * h), M = Math.round(e.green() + (i.green() - e.green()) * h), g = Math.round(e.blue() + (i.blue() - e.blue()) * h), m = w({ r: d, g: M, b: g });
    !s && (u === 0 || u === l - 1) || a.push(L(m, o));
  }
  return a;
}
function J(t = {}) {
  const {
    startGray: n = "#ffffff",
    endGray: c = "#000000",
    steps: r = 10,
    format: o = "hex"
  } = t;
  return $(n, c, { steps: r, format: o, includeEnds: !0 });
}
function j(t, n = {}) {
  const {
    steps: c = 10,
    format: r = "hex",
    lightnessRange: o = 80,
    minLightness: s = null,
    maxLightness: e = null
  } = n, i = w(t);
  let a, l;
  if (s !== null && e !== null) {
    if (s > e)
      throw new Error("minLightness 不能大于 maxLightness");
    a = Math.max(0, Math.min(100, e)), l = Math.max(0, Math.min(100, s));
  } else {
    const h = i.lightness();
    a = Math.min(95, h + o / 2), l = Math.max(5, h - o / 2);
  }
  const f = w({
    h: i.hue(),
    s: i.saturationl(),
    l: a
  }), u = w({
    h: i.hue(),
    s: i.saturationl(),
    l
  });
  return $(f.hex(), u.hex(), { steps: c, format: r, includeEnds: !0 });
}
function Q(t, n, c = {}) {
  const { steps: r = 10, format: o = "hex", includeEnds: s = !0 } = c;
  if (r < 2)
    throw new Error("步数必须至少为2");
  const e = w(t), i = w(n), a = [], l = s ? r : r + 2, f = 1 / (l - 1);
  let u = e.hue() || 0, h = i.hue() || 0;
  const d = h - u;
  Math.abs(d) > 180 && (d > 0 ? u += 360 : h += 360);
  const M = e.saturationl(), g = i.saturationl(), m = e.lightness(), E = i.lightness();
  for (let y = 0; y < l; y++) {
    const p = y * f;
    let b = u + (h - u) * p;
    const x = M + (g - M) * p, v = m + (E - m) * p;
    b = b % 360, b < 0 && (b += 360);
    const A = w({ h: b, s: x, l: v });
    !s && (y === 0 || y === l - 1) || a.push(L(A, o));
  }
  return a;
}
function S(t) {
  if (!t || typeof t != "string")
    throw new Error("Invalid RGB color: must be a string");
  let n = t.replace("#", "");
  if (n.length === 8 && (n = n.substring(0, 6)), !/^[0-9A-Fa-f]{6}$/.test(n))
    throw new Error("Invalid RGB color format: must be #rrggbb or rrggbb");
  const c = parseInt(n.slice(0, 2), 16) / 255, r = parseInt(n.slice(2, 4), 16) / 255, o = parseInt(n.slice(4, 6), 16) / 255, s = Math.max(c, r, o), e = Math.min(c, r, o), i = s - e;
  let a = 0;
  i !== 0 && (s === c ? a = (r - o) / i % 6 : s === r ? a = (o - c) / i + 2 : a = (c - r) / i + 4), a = Math.round(a * 60), a < 0 && (a += 360);
  const l = Math.round((0.299 * c + 0.587 * r + 0.114 * o) * 100), f = (s + e) / 2;
  let u = 0;
  i !== 0 && f !== 0 && f !== 1 && (u = i / (1 - Math.abs(2 * f - 1)));
  let h = 0;
  return l > 0 && l < 100 && (h = Math.round(u * Math.min(l, 100 - l))), { h: a, c: Math.max(0, h), t: Math.max(0, Math.min(100, l)) };
}
function R(t, n = {}) {
  if (!t || typeof t != "object" || t.h === void 0 || t.c === void 0 || t.t === void 0)
    throw new Error("Invalid HCT color: must be an object with h, c, t properties");
  const { h: c, c: r, t: o } = t, { maxChroma: s = 200 } = n, e = (c % 360 + 360) % 360, i = Math.max(0, Math.min(s, r)), a = Math.max(0, Math.min(100, o)), l = a / 100;
  let f = 0;
  if (a > 0 && a < 100 && i > 0) {
    const y = Math.min(a, 100 - a);
    f = y > 0 ? i / y : 0;
  }
  const u = (1 - Math.abs(2 * l - 1)) * Math.min(1, f), h = u * (1 - Math.abs(e / 60 % 2 - 1)), d = l - u / 2;
  let M, g, m;
  e >= 0 && e < 60 ? [M, g, m] = [u, h, 0] : e >= 60 && e < 120 ? [M, g, m] = [h, u, 0] : e >= 120 && e < 180 ? [M, g, m] = [0, u, h] : e >= 180 && e < 240 ? [M, g, m] = [0, h, u] : e >= 240 && e < 300 ? [M, g, m] = [h, 0, u] : [M, g, m] = [u, 0, h];
  const E = (y) => {
    const p = Math.max(0, Math.min(1, y + d)), b = Math.round(p * 255).toString(16);
    return b.length === 1 ? "0" + b : b;
  };
  return `#${E(M)}${E(g)}${E(m)}`;
}
function F(t, n, c = 0.5) {
  if (!t || !n)
    throw new Error("Both colors are required for blending");
  const r = Math.max(0, Math.min(1, c)), o = S(t), s = S(n);
  let e = o.h, i = s.h, a = i - e;
  Math.abs(a) > 180 && (a > 0 ? e += 360 : i += 360, a = i - e);
  const l = (e + a * r) % 360, f = o.c + (s.c - o.c) * r, u = o.t + (s.t - o.t) * r;
  return R({
    h: l < 0 ? l + 360 : l,
    c: Math.max(0, Math.round(f)),
    t: Math.max(0, Math.min(100, Math.round(u)))
  });
}
function X(t, n, c = 0.15) {
  if (!t || !n)
    throw new Error("Both theme color and target color are required");
  const r = Math.max(0, Math.min(1, c)), o = S(t), s = S(n);
  let e = s.h, i = o.h, a = i - e;
  Math.abs(a) > 180 && (a > 0 ? e += 360 : i += 360, a = i - e);
  const l = (e + a * r) % 360;
  return R({
    h: l < 0 ? l + 360 : l,
    c: s.c,
    // 保持原有色度
    t: s.t
    // 保持原有色调
  });
}
function Y(t, n) {
  if (!t)
    throw new Error("Theme color is required");
  const c = S(t);
  let r;
  if (Array.isArray(n) ? r = n : n && n.tones && Array.isArray(n.tones) ? r = n.tones : r = [10, 20, 30, 40, 50, 60, 70, 80, 90], !Array.isArray(r) || r.length === 0)
    throw new Error("Tone steps must be a non-empty array");
  const o = r.filter((s) => typeof s == "number" && s >= 0 && s <= 100);
  if (o.length === 0)
    throw new Error("No valid tone values found (must be numbers between 0-100)");
  return o.map((s) => R({
    h: c.h,
    c: c.c,
    t: s
  }));
}
function N(t, n, c = 0.2) {
  if (!t)
    throw new Error("Theme color is required");
  if (!n || typeof n != "object")
    throw new Error("UI colors must be an object");
  const r = Math.max(0, Math.min(1, c)), o = {};
  for (const [s, e] of Object.entries(n))
    try {
      o[s] = F(t, e, r);
    } catch (i) {
      console.warn(`Failed to blend color for key "${s}": ${/** @type {Error} */
      i.message}`), o[s] = e;
    }
  return o;
}
function I(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    baseGray: c = "#989898",
    blendRatio: r = 0.08,
    isDark: o = !1,
    steps: s = 12,
    // 默认 12 个等级，可以增加到 24、36 等以获得更细腻的梯度
    lightnessRange: e = 85,
    // 亮度变化范围（中心扩展模式），默认 85
    minLightness: i = null,
    // 最小亮度（固定端点模式），优先级高于 lightnessRange
    maxLightness: a = null
    // 最大亮度（固定端点模式），优先级高于 lightnessRange
  } = n, l = Math.max(0, Math.min(1, r)), f = Math.max(2, Math.min(100, Math.round(s))), u = F(c, t, l), h = {
    steps: f,
    format: "hex"
  };
  if (i !== null && a !== null)
    h.minLightness = i, h.maxLightness = a;
  else {
    const m = Math.max(20, Math.min(95, e));
    h.lightnessRange = m;
  }
  const d = j(u, h), M = o ? d.reverse() : d, g = {};
  return M.forEach((m, E) => {
    g[`gray-${E + 1}`] = m;
  }), g;
}
function T(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    semanticColors: c = {
      success: "#52c41a",
      warning: "#faad14",
      error: "#ff4d4f",
      info: "#1890ff"
    },
    blendRatio: r = 0,
    isDark: o = !1
  } = n;
  if (!c || typeof c != "object")
    throw new Error("Semantic colors must be an object");
  const s = Math.max(0, Math.min(1, r)), e = {};
  return Object.entries(c).forEach(([i, a]) => {
    if (!a || typeof a != "string") {
      console.warn(`Invalid color for semantic color "${i}": ${a}`);
      return;
    }
    try {
      const l = {}, f = S(a);
      (o ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]).forEach((h, d) => {
        const M = { h: f.h, c: f.c, t: h }, g = F(R(M), t, s);
        l[`${i}-${d + 1}`] = g;
      }), Object.assign(e, l);
    } catch (l) {
      console.warn(`Failed to generate variants for semantic color "${i}": ${/** @type {Error} */
      l.message}`);
    }
  }), e;
}
function q(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const { isDark: c = !1 } = n, r = S(t), o = {};
  return (c ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]).forEach((e, i) => {
    const a = { h: r.h, c: r.c, t: e };
    o[`theme-${i + 1}`] = R(a);
  }), o;
}
function Z(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    baseGray: c = "#666666",
    isDark: r = !1,
    semanticColors: o,
    controlBlendRatio: s = 0.08,
    semanticBlendRatio: e = 0.12,
    controlSteps: i = 12,
    // 控件色灰度等级数
    controlLightnessRange: a = 85,
    // 控件色亮度变化范围（中心扩展模式）
    controlMinLightness: l = null,
    // 控件色最小亮度（固定端点模式）
    controlMaxLightness: f = null
    // 控件色最大亮度（固定端点模式）
  } = n, u = Math.max(0, Math.min(1, s)), h = Math.max(0, Math.min(1, e)), d = {
    baseGray: c,
    blendRatio: u,
    isDark: r,
    steps: i
  };
  return l !== null && f !== null ? (d.minLightness = l, d.maxLightness = f) : d.lightnessRange = a, {
    // 1. 基础控件颜色（灰色系1-12或更多）
    controls: I(t, d),
    // 2. 表意色（1-10）
    semantic: T(t, {
      semanticColors: o,
      blendRatio: h,
      isDark: r
    }),
    // 3. 主题色（1-10）
    theme: q(t, { isDark: r })
  };
}
function _(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    semanticColors: c = {
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
    harmonizeRatio: o = 0.15,
    blendRatio: s = 0.12,
    isDark: e = !1
  } = (
    /** @type {any} */
    n
  ), i = Math.max(0, Math.min(1, o)), a = Math.max(0, Math.min(1, s)), l = q(t, { isDark: e }), f = I(t, {
    blendRatio: a * 0.5,
    // 中性色混合比例稍低
    isDark: e
  }), u = T(t, {
    semanticColors: c,
    blendRatio: i,
    isDark: e
  }), h = {};
  return Object.entries(c).forEach(([M]) => {
    h[M] = {};
    for (let g = 1; g <= 10; g++) {
      const m = `${M}-${g}`;
      u[m] && (h[M][g] = u[m]);
    }
  }), {
    theme: l,
    // 主题色阶 theme-1 到 theme-10
    controls: f,
    // 中性色阶 gray-1 到 gray-12
    semantic: h,
    // 功能色系
    ui: N(t, r, a)
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
function tt() {
  const t = {};
  return Object.keys(C).forEach((n) => {
    t[n] = {}, t[n].light = B(C[
      /** @type {keyof typeof colorList} */
      n
    ], { list: !0 }), t[n].dark = B(C[
      /** @type {keyof typeof colorList} */
      n
    ], { list: !0, dark: !0 }), t[n].primary = C[
      /** @type {keyof typeof colorList} */
      n
    ];
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
  N as blendUIColors,
  C as colorList,
  W as extractColorFromFile,
  P as extractColorFromImage,
  B as generate,
  I as generateControlColors,
  J as generateGrayLinear,
  Z as generateInterfaceColorSystem,
  $ as generateLinear,
  Q as generateLinearHSL,
  j as generateMonochromeLinear,
  T as generateSemanticColors,
  q as generateThemeColors,
  _ as generateThemePalette,
  Y as generateThemeVariants,
  tt as getPresetColors,
  K as getRgbStr,
  X as harmonizeColor,
  R as hctToRgb,
  S as rgbToHct
};
