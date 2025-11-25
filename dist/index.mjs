import g from "color";
function Y(t) {
  return g(t).rgb().round().color.join(",");
}
const j = ["hex", "rgb", "hsl"];
function G(t) {
  return !t || !j.includes(
    /** @type {any} */
    t
  ) ? "hex" : (
    /** @type {'hex' | 'rgb' | 'hsl'} */
    t
  );
}
function F(t, n) {
  const r = G(n);
  return r === "hex" ? t[r]().toLowerCase() : t[r]().round().string();
}
function B(t, n, r) {
  const e = g(t), o = e.hue(), s = e.saturationv(), a = e.value(), c = ((b) => b >= 60 && b <= 240 ? 2.5 : b >= 0 && b < 60 || b > 300 && b <= 360 ? 1.5 : 2)(o), h = 100, f = 9, u = 100, l = 30;
  function m(b, w) {
    let x;
    return o >= 60 && o <= 240 ? x = b ? o - c * w : o + c * w : x = b ? o + c * w : o - c * w, x < 0 ? x += 360 : x >= 360 && (x -= 360), Math.round(x);
  }
  function M(b, w) {
    let x;
    if (b)
      x = s <= f ? s : s - (s - f) / 5.5 * Math.pow(w, 1.05);
    else {
      const S = Math.min(h, s + 30);
      x = s + (S - s) / 4.2 * Math.pow(w, 0.95);
    }
    return Math.max(0, Math.min(100, x));
  }
  function d(b, w) {
    return b ? Math.min(u, a + (u - a) / 5.2 * Math.pow(w, 0.9)) : a <= l ? a : Math.max(l, a - (a - l) / 4.2 * Math.pow(w, 1.05));
  }
  const p = n < 6, L = p ? 6 - n : n - 6, y = n === 6 ? e : g({
    h: m(p, L),
    s: M(p, L),
    v: d(p, L)
  });
  return F(y, r);
}
function T(t, n, r) {
  const e = g(B(t, 10 - n + 1, "hex")), o = g(t), s = o.hue(), a = o.saturationv();
  function i(m) {
    if (m < 6)
      return h + (6 - m) * u;
    if (m === 6) {
      if (s >= 0 && s < 50)
        return a - 15;
      if (s >= 50 && s < 191)
        return a - 20;
      if (s >= 191 && s <= 360)
        return a - 15;
    }
    return h - f * (m - 6);
  }
  const h = g({
    h: o.hue(),
    s: i(6),
    v: o.value()
  }).saturationv(), f = Math.ceil((h - 9) / 4), u = Math.ceil((100 - h) / 5), l = g({
    h: e.hue(),
    s: i(n),
    v: e.value()
  });
  return F(l, r);
}
function $(t, n = {}) {
  const { dark: r, list: e, index: o = 6, format: s = "hex" } = n;
  if (e) {
    const a = [], i = r ? T : B;
    for (let c = 1; c <= 10; c++)
      a.push(i(t, c, s));
    return a;
  }
  return r ? T(t, o, s) : B(t, o, s);
}
async function N(t) {
  try {
    const n = await V(t), r = U(n);
    return K(r);
  } catch (n) {
    throw console.error("提取图片颜色失败:", n), n;
  }
}
async function V(t) {
  return new Promise((n, r) => {
    try {
      if (typeof document > "u") {
        r(new Error("图像颜色提取功能仅在浏览器环境中可用"));
        return;
      }
      const e = document.createElement("canvas"), o = e.getContext("2d");
      if (!o) {
        r(new Error("无法获取canvas 2d context"));
        return;
      }
      const s = Math.min(t.width, 100), a = Math.min(t.height, 100), i = Math.min(s / t.width, a / t.height);
      e.width = t.width * i, e.height = t.height * i, o.drawImage(t, 0, 0, e.width, e.height);
      const c = o.getImageData(0, 0, e.width, e.height);
      n(c);
    } catch (e) {
      r(e);
    }
  });
}
function U(t) {
  const n = t.data, r = /* @__PURE__ */ new Map();
  for (let o = 0; o < n.length; o += 4) {
    const s = n[o], a = n[o + 1], i = n[o + 2];
    if (n[o + 3] < 128) continue;
    const h = Math.round(s / 16) * 16, f = Math.round(a / 16) * 16, u = Math.round(i / 16) * 16, l = `${h},${f},${u}`;
    r.has(l) ? r.set(l, r.get(l) + 1) : r.set(l, 1);
  }
  const e = [];
  return r.forEach((o, s) => {
    const [a, i, c] = s.split(",").map(Number);
    e.push({ r: a, g: i, b: c, count: o });
  }), e;
}
function K(t) {
  t.sort((o, s) => s.count - o.count);
  const n = t.filter((o) => {
    const { r: s, g: a, b: i } = o, c = Math.max(s, a, i), h = Math.min(s, a, i), f = c - h, u = c === 0 ? 0 : f / c, l = c / 255;
    return u > 0.15 && l > 0.2 && l < 0.8;
  }), r = n.length > 0 ? n[0] : t[0];
  return g({ r: r.r, g: r.g, b: r.b }).hex();
}
function Z(t) {
  return new Promise((n, r) => {
    if (typeof FileReader > "u" || typeof Image > "u") {
      r(new Error("文件读取功能仅在浏览器环境中可用"));
      return;
    }
    if (!t.type.startsWith("image/")) {
      r(new Error("请选择图片文件"));
      return;
    }
    const e = new FileReader();
    e.onload = async (o) => {
      var s;
      try {
        const a = new Image();
        a.onload = async () => {
          try {
            const c = await N(a);
            n(c);
          } catch (c) {
            r(c);
          }
        }, a.onerror = () => r(new Error("图片加载失败"));
        const i = (s = o.target) == null ? void 0 : s.result;
        typeof i == "string" ? a.src = i : r(new Error("无法读取图片数据"));
      } catch (a) {
        r(a);
      }
    }, e.onerror = () => r(new Error("文件读取失败")), e.readAsDataURL(t);
  });
}
function q(t, n, r = {}) {
  const { steps: e = 10, format: o = "hex", includeEnds: s = !0 } = r;
  if (e < 2)
    throw new Error("步数必须至少为2");
  const a = g(t), i = g(n), c = [], h = s ? e : e + 2, f = 1 / (h - 1);
  for (let u = 0; u < h; u++) {
    const l = u * f, m = Math.round(a.red() + (i.red() - a.red()) * l), M = Math.round(a.green() + (i.green() - a.green()) * l), d = Math.round(a.blue() + (i.blue() - a.blue()) * l), p = g({ r: m, g: M, b: d });
    !s && (u === 0 || u === h - 1) || c.push(F(p, o));
  }
  return c;
}
function _(t = {}) {
  const {
    startGray: n = "#ffffff",
    endGray: r = "#000000",
    steps: e = 10,
    format: o = "hex"
  } = t;
  return q(n, r, { steps: e, format: o, includeEnds: !0 });
}
function H(t, n = {}) {
  const {
    steps: r = 10,
    format: e = "hex",
    lightnessRange: o = 80,
    minLightness: s = null,
    maxLightness: a = null
  } = n, i = g(t);
  let c, h;
  if (s !== null && a !== null) {
    if (s > a)
      throw new Error("minLightness 不能大于 maxLightness");
    c = Math.max(0, Math.min(100, a)), h = Math.max(0, Math.min(100, s));
  } else {
    const l = i.lightness();
    c = Math.min(95, l + o / 2), h = Math.max(5, l - o / 2);
  }
  const f = g({
    h: i.hue(),
    s: i.saturationl(),
    l: c
  }), u = g({
    h: i.hue(),
    s: i.saturationl(),
    l: h
  });
  return q(f.hex(), u.hex(), { steps: r, format: e, includeEnds: !0 });
}
function tt(t, n, r = {}) {
  const { steps: e = 10, format: o = "hex", includeEnds: s = !0 } = r;
  if (e < 2)
    throw new Error("步数必须至少为2");
  const a = g(t), i = g(n), c = [], h = s ? e : e + 2, f = 1 / (h - 1);
  let u = a.hue() || 0, l = i.hue() || 0;
  const m = l - u;
  Math.abs(m) > 180 && (m > 0 ? u += 360 : l += 360);
  const M = a.saturationl(), d = i.saturationl(), p = a.lightness(), L = i.lightness();
  for (let y = 0; y < h; y++) {
    const b = y * f;
    let w = u + (l - u) * b;
    const x = M + (d - M) * b, S = p + (L - p) * b;
    w = w % 360, w < 0 && (w += 360);
    const C = g({ h: w, s: x, l: S });
    !s && (y === 0 || y === h - 1) || c.push(F(C, o));
  }
  return c;
}
function R(t) {
  if (!t || typeof t != "string")
    throw new Error("Invalid RGB color: must be a string");
  let n;
  try {
    n = g(t);
  } catch {
    throw new Error("Invalid RGB color format");
  }
  const r = n.l(), e = n.a(), o = n.b();
  let s = Math.atan2(o, e) * (180 / Math.PI);
  s < 0 && (s += 360);
  const a = Math.sqrt(e * e + o * o);
  return {
    h: s,
    c: a,
    t: r
  };
}
function E(t, n = {}) {
  if (!t || typeof t != "object" || t.h === void 0 || t.c === void 0 || t.t === void 0)
    throw new Error("Invalid HCT color: must be an object with h, c, t properties");
  const { gamutMapping: r = "reduce-chroma" } = n;
  let { h: e, c: o, t: s } = t;
  e = (e % 360 + 360) % 360, o = Math.max(0, o), s = Math.max(0, Math.min(100, s));
  const a = e * (Math.PI / 180), i = o * Math.cos(a), c = o * Math.sin(a);
  try {
    let h = g.lab(s, i, c);
    if (r === "reduce-chroma") {
      let M = o, d = h.rgb().array();
      for (; (d[0] < 0 || d[0] > 255 || d[1] < 0 || d[1] > 255 || d[2] < 0 || d[2] > 255) && M > 0; ) {
        M -= 1;
        const p = M * Math.cos(a), L = M * Math.sin(a);
        h = g.lab(s, p, L), d = h.rgb().array();
      }
    }
    const f = h.rgb().array(), u = Math.max(0, Math.min(255, Math.round(f[0]))), l = Math.max(0, Math.min(255, Math.round(f[1]))), m = Math.max(0, Math.min(255, Math.round(f[2])));
    return `#${u.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${m.toString(16).padStart(2, "0")}`;
  } catch {
    return g.lab(s, i, c).hex().toLowerCase();
  }
}
function I(t, n, r = 0.5, e = {}) {
  if (!t || !n)
    throw new Error("Both colors are required for blending");
  const { mode: o = "lab" } = e, s = Math.max(0, Math.min(1, r));
  return o === "lab" ? W(t, n, s) : o === "hue-only" ? A(t, n, s) : J(t, n, s);
}
function W(t, n, r) {
  const e = g(t), o = g(n), s = e.l(), a = e.a(), i = e.b(), c = o.l(), h = o.a(), f = o.b(), u = s + (c - s) * r, l = a + (h - a) * r, m = i + (f - i) * r;
  return g.lab(u, l, m).hex().toLowerCase();
}
function J(t, n, r) {
  const e = R(t), o = R(n), s = O(e.h, o.h, r), a = e.c + (o.c - e.c) * r, i = e.t + (o.t - e.t) * r;
  return E({
    h: s,
    c: Math.max(0, a),
    t: Math.max(0, Math.min(100, i))
  });
}
function A(t, n, r) {
  const e = R(t), o = R(n), s = O(e.h, o.h, r);
  return E({
    h: s,
    c: e.c,
    // 保持第一个颜色的色度
    t: e.t
    // 保持第一个颜色的明度
  });
}
function O(t, n, r) {
  let e = n - t;
  e > 180 ? e -= 360 : e < -180 && (e += 360);
  let o = t + e * r;
  return o < 0 && (o += 360), o >= 360 && (o -= 360), o;
}
function nt(t, n) {
  const r = g(t), e = g(n), o = r.l(), s = r.a(), a = r.b(), i = e.l(), c = e.a(), h = e.b();
  return Math.sqrt(
    Math.pow(i - o, 2) + Math.pow(c - s, 2) + Math.pow(h - a, 2)
  );
}
function et(t, n) {
  const r = R(t);
  return E({
    h: r.h,
    c: r.c,
    t: Math.max(0, Math.min(100, n))
  });
}
function rt(t, n) {
  const r = R(t);
  return E({
    h: r.h,
    c: Math.max(0, n),
    t: r.t
  });
}
function ot(t, n) {
  const r = R(t);
  return E({
    h: (n % 360 + 360) % 360,
    c: r.c,
    t: r.t
  });
}
function v(t, n) {
  const r = R(t);
  let e = r.h + n;
  return e = (e % 360 + 360) % 360, E({
    h: e,
    c: r.c,
    t: r.t
  });
}
function st(t) {
  return v(t, 180);
}
function at(t) {
  return [
    t,
    v(t, 120),
    v(t, 240)
  ];
}
function ct(t, n = 30) {
  return [
    t,
    v(t, 180 - n),
    v(t, 180 + n)
  ];
}
function it(t, n = 3, r = 30) {
  const e = [], o = -r * Math.floor(n / 2);
  for (let s = 0; s < n; s++)
    e.push(v(t, o + r * s));
  return e;
}
function lt(t, n, r = 0.15) {
  if (!t || !n)
    throw new Error("Both theme color and target color are required");
  const e = Math.max(0, Math.min(1, r));
  return A(n, t, e);
}
function ht(t, n) {
  if (!t)
    throw new Error("Theme color is required");
  const r = R(t);
  let e;
  if (Array.isArray(n) ? e = n : n && n.tones && Array.isArray(n.tones) ? e = n.tones : e = [10, 20, 30, 40, 50, 60, 70, 80, 90], !Array.isArray(e) || e.length === 0)
    throw new Error("Tone steps must be a non-empty array");
  const o = e.filter((s) => typeof s == "number" && s >= 0 && s <= 100);
  if (o.length === 0)
    throw new Error("No valid tone values found (must be numbers between 0-100)");
  return o.map((s) => E({
    h: r.h,
    c: r.c,
    t: s
  }));
}
function Q(t, n, r = 0.2) {
  if (!t)
    throw new Error("Theme color is required");
  if (!n || typeof n != "object")
    throw new Error("UI colors must be an object");
  const e = Math.max(0, Math.min(1, r)), o = {};
  for (const [s, a] of Object.entries(n))
    try {
      o[s] = I(t, a, e);
    } catch (i) {
      console.warn(`Failed to blend color for key "${s}": ${/** @type {Error} */
      i.message}`), o[s] = a;
    }
  return o;
}
function P(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    baseGray: r = "#989898",
    blendRatio: e = 0.08,
    isDark: o = !1,
    steps: s = 12,
    // 默认 12 个等级，可以增加到 24、36 等以获得更细腻的梯度
    lightnessRange: a = 85,
    // 亮度变化范围（中心扩展模式），默认 85
    minLightness: i = null,
    // 最小亮度（固定端点模式），优先级高于 lightnessRange
    maxLightness: c = null
    // 最大亮度（固定端点模式），优先级高于 lightnessRange
  } = n, h = Math.max(0, Math.min(1, e)), f = Math.max(2, Math.min(100, Math.round(s))), u = I(r, t, h), l = {
    steps: f,
    format: "hex"
  };
  if (i !== null && c !== null)
    l.minLightness = i, l.maxLightness = c;
  else {
    const p = Math.max(20, Math.min(95, a));
    l.lightnessRange = p;
  }
  const m = H(u, l), M = o ? m.reverse() : m, d = {};
  return M.forEach((p, L) => {
    d[`gray-${L + 1}`] = p;
  }), d;
}
function k(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    semanticColors: r = {
      success: "#52c41a",
      warning: "#faad14",
      error: "#ff4d4f",
      info: "#1890ff"
    },
    blendRatio: e = 0,
    isDark: o = !1,
    steps: s = 10,
    // 默认生成 10 个色阶
    lightnessRange: a = 80,
    // 亮度变化范围（中心扩展模式）
    minLightness: i = null,
    // 最小亮度（固定端点模式）
    maxLightness: c = null
    // 最大亮度（固定端点模式）
  } = n;
  if (!r || typeof r != "object")
    throw new Error("Semantic colors must be an object");
  const h = Math.max(0, Math.min(1, e)), f = Math.max(2, Math.min(100, Math.round(s))), u = {};
  return Object.entries(r).forEach(([l, m]) => {
    if (!m || typeof m != "string") {
      console.warn(`Invalid color for semantic color "${l}": ${m}`);
      return;
    }
    try {
      const M = I(m, t, h), d = {
        steps: f,
        format: "hex"
      };
      if (i !== null && c !== null)
        d.minLightness = i, d.maxLightness = c;
      else {
        const y = Math.max(20, Math.min(95, a));
        d.lightnessRange = y;
      }
      const p = H(M, d);
      (o ? p.reverse() : p).forEach((y, b) => {
        u[`${l}-${b + 1}`] = y;
      });
    } catch (M) {
      console.warn(`Failed to generate variants for semantic color "${l}": ${/** @type {Error} */
      M.message}`);
    }
  }), u;
}
function z(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    isDark: r = !1,
    steps: e = 10,
    // 默认生成 10 个色阶
    lightnessRange: o = 80,
    // 亮度变化范围（中心扩展模式）
    minLightness: s = null,
    // 最小亮度（固定端点模式）
    maxLightness: a = null
    // 最大亮度（固定端点模式）
  } = n, c = {
    steps: Math.max(2, Math.min(100, Math.round(e))),
    format: "hex"
  };
  if (s !== null && a !== null)
    c.minLightness = s, c.maxLightness = a;
  else {
    const l = Math.max(20, Math.min(95, o));
    c.lightnessRange = l;
  }
  const h = H(t, c), f = r ? h.reverse() : h, u = {};
  return f.forEach((l, m) => {
    u[`theme-${m + 1}`] = l;
  }), u;
}
function ut(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    baseGray: r = "#666666",
    isDark: e = !1,
    semanticColors: o,
    controlBlendRatio: s = 0.08,
    semanticBlendRatio: a = 0.12,
    controlSteps: i = 12,
    // 控件色灰度等级数
    controlLightnessRange: c = 85,
    // 控件色亮度变化范围（中心扩展模式）
    controlMinLightness: h = null,
    // 控件色最小亮度（固定端点模式）
    controlMaxLightness: f = null,
    // 控件色最大亮度（固定端点模式）
    semanticSteps: u = 10,
    // 语义色等级数
    semanticLightnessRange: l = 80,
    // 语义色亮度变化范围
    semanticMinLightness: m = null,
    // 语义色最小亮度
    semanticMaxLightness: M = null,
    // 语义色最大亮度
    themeSteps: d = 10,
    // 主题色等级数
    themeLightnessRange: p = 80,
    // 主题色亮度变化范围
    themeMinLightness: L = null,
    // 主题色最小亮度
    themeMaxLightness: y = null
    // 主题色最大亮度
  } = n, b = Math.max(0, Math.min(1, s)), w = Math.max(0, Math.min(1, a)), x = {
    baseGray: r,
    blendRatio: b,
    isDark: e,
    steps: i
  };
  h !== null && f !== null ? (x.minLightness = h, x.maxLightness = f) : x.lightnessRange = c;
  const S = {
    semanticColors: o,
    blendRatio: w,
    isDark: e,
    steps: u
  };
  m !== null && M !== null ? (S.minLightness = m, S.maxLightness = M) : S.lightnessRange = l;
  const C = {
    isDark: e,
    steps: d
  };
  return L !== null && y !== null ? (C.minLightness = L, C.maxLightness = y) : C.lightnessRange = p, {
    // 1. 基础控件颜色（灰色系1-12或更多）
    controls: P(t, x),
    // 2. 表意色（1-10或更多）
    semantic: k(t, S),
    // 3. 主题色（1-10或更多）
    theme: z(t, C)
  };
}
function ft(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    semanticColors: r = {
      success: "#52c41a",
      warning: "#faad14",
      error: "#ff4d4f",
      info: "#1890ff"
    },
    uiColors: e = {
      background: "#ffffff",
      surface: "#fafafa",
      border: "#d9d9d9",
      disabled: "#f5f5f5"
    },
    harmonizeRatio: o = 0.15,
    blendRatio: s = 0.12,
    isDark: a = !1
  } = (
    /** @type {any} */
    n
  ), i = Math.max(0, Math.min(1, o)), c = Math.max(0, Math.min(1, s)), h = z(t, { isDark: a }), f = P(t, {
    blendRatio: c * 0.5,
    // 中性色混合比例稍低
    isDark: a
  }), u = k(t, {
    semanticColors: r,
    blendRatio: i,
    isDark: a
  }), l = {};
  return Object.entries(r).forEach(([M]) => {
    l[M] = {};
    for (let d = 1; d <= 10; d++) {
      const p = `${M}-${d}`;
      u[p] && (l[M][d] = u[p]);
    }
  }), {
    theme: h,
    // 主题色阶 theme-1 到 theme-10
    controls: f,
    // 中性色阶 gray-1 到 gray-12
    semantic: l,
    // 功能色系
    ui: Q(t, e, c)
  };
}
const D = {
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
function mt() {
  const t = {};
  return Object.keys(D).forEach((n) => {
    t[n] = {}, t[n].light = $(D[
      /** @type {keyof typeof colorList} */
      n
    ], { list: !0 }), t[n].dark = $(D[
      /** @type {keyof typeof colorList} */
      n
    ], { list: !0, dark: !0 }), t[n].primary = D[
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
  rt as adjustChroma,
  ot as adjustHue,
  et as adjustTone,
  I as blendInHct,
  Q as blendUIColors,
  nt as colorDifference,
  D as colorList,
  Z as extractColorFromFile,
  N as extractColorFromImage,
  $ as generate,
  P as generateControlColors,
  _ as generateGrayLinear,
  ut as generateInterfaceColorSystem,
  q as generateLinear,
  tt as generateLinearHSL,
  H as generateMonochromeLinear,
  k as generateSemanticColors,
  z as generateThemeColors,
  ft as generateThemePalette,
  ht as generateThemeVariants,
  it as getAnalogous,
  st as getComplementary,
  mt as getPresetColors,
  Y as getRgbStr,
  ct as getSplitComplementary,
  at as getTriadic,
  lt as harmonizeColor,
  E as hctToRgb,
  R as rgbToHct,
  v as rotateHue
};
