import b from "color";
function st(t) {
  return b(t).rgb().round().color.join(",");
}
const W = ["hex", "rgb", "hsl"];
function J(t) {
  return !t || !W.includes(
    /** @type {any} */
    t
  ) ? "hex" : (
    /** @type {'hex' | 'rgb' | 'hsl'} */
    t
  );
}
function E(t, n) {
  const r = J(n);
  return r === "hex" ? t[r]().toLowerCase() : t[r]().round().string();
}
function T(t, n, r) {
  const e = b(t), o = e.hue(), s = e.saturationv(), a = e.value(), i = ((p) => p >= 60 && p <= 240 ? 2.5 : p >= 0 && p < 60 || p > 300 && p <= 360 ? 1.5 : 2)(o), h = 100, f = 9, u = 100, l = 30;
  function m(p, x) {
    let y;
    return o >= 60 && o <= 240 ? y = p ? o - i * x : o + i * x : y = p ? o + i * x : o - i * x, y < 0 ? y += 360 : y >= 360 && (y -= 360), Math.round(y);
  }
  function d(p, x) {
    let y;
    if (p)
      y = s <= f ? s : s - (s - f) / 5.5 * Math.pow(x, 1.05);
    else {
      const v = Math.min(h, s + 30);
      y = s + (v - s) / 4.2 * Math.pow(x, 0.95);
    }
    return Math.max(0, Math.min(100, y));
  }
  function M(p, x) {
    return p ? Math.min(u, a + (u - a) / 5.2 * Math.pow(x, 0.9)) : a <= l ? a : Math.max(l, a - (a - l) / 4.2 * Math.pow(x, 1.05));
  }
  const g = n < 6, w = g ? 6 - n : n - 6, L = n === 6 ? e : b({
    h: m(g, w),
    s: d(g, w),
    v: M(g, w)
  });
  return E(L, r);
}
function q(t, n, r) {
  const e = b(T(t, 10 - n + 1, "hex")), o = b(t), s = o.hue(), a = o.saturationv();
  function c(m) {
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
  const h = b({
    h: o.hue(),
    s: c(6),
    v: o.value()
  }).saturationv(), f = Math.ceil((h - 9) / 4), u = Math.ceil((100 - h) / 5), l = b({
    h: e.hue(),
    s: c(n),
    v: e.value()
  });
  return E(l, r);
}
function P(t, n = {}) {
  const { dark: r, list: e, index: o = 6, format: s = "hex" } = n;
  if (e) {
    const a = [], c = r ? q : T;
    for (let i = 1; i <= 10; i++)
      a.push(c(t, i, s));
    return a;
  }
  return r ? q(t, o, s) : T(t, o, s);
}
async function Q(t) {
  try {
    const n = await X(t), r = Y(n);
    return Z(r);
  } catch (n) {
    throw console.error("提取图片颜色失败:", n), n;
  }
}
async function X(t) {
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
      const s = Math.min(t.width, 100), a = Math.min(t.height, 100), c = Math.min(s / t.width, a / t.height);
      e.width = t.width * c, e.height = t.height * c, o.drawImage(t, 0, 0, e.width, e.height);
      const i = o.getImageData(0, 0, e.width, e.height);
      n(i);
    } catch (e) {
      r(e);
    }
  });
}
function Y(t) {
  const n = t.data, r = /* @__PURE__ */ new Map();
  for (let o = 0; o < n.length; o += 4) {
    const s = n[o], a = n[o + 1], c = n[o + 2];
    if (n[o + 3] < 128) continue;
    const h = Math.round(s / 16) * 16, f = Math.round(a / 16) * 16, u = Math.round(c / 16) * 16, l = `${h},${f},${u}`;
    r.has(l) ? r.set(l, r.get(l) + 1) : r.set(l, 1);
  }
  const e = [];
  return r.forEach((o, s) => {
    const [a, c, i] = s.split(",").map(Number);
    e.push({ r: a, g: c, b: i, count: o });
  }), e;
}
function Z(t) {
  t.sort((o, s) => s.count - o.count);
  const n = t.filter((o) => {
    const { r: s, g: a, b: c } = o, i = Math.max(s, a, c), h = Math.min(s, a, c), f = i - h, u = i === 0 ? 0 : f / i, l = i / 255;
    return u > 0.15 && l > 0.2 && l < 0.8;
  }), r = n.length > 0 ? n[0] : t[0];
  return b({ r: r.r, g: r.g, b: r.b }).hex();
}
function at(t) {
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
            const i = await Q(a);
            n(i);
          } catch (i) {
            r(i);
          }
        }, a.onerror = () => r(new Error("图片加载失败"));
        const c = (s = o.target) == null ? void 0 : s.result;
        typeof c == "string" ? a.src = c : r(new Error("无法读取图片数据"));
      } catch (a) {
        r(a);
      }
    }, e.onerror = () => r(new Error("文件读取失败")), e.readAsDataURL(t);
  });
}
function O(t, n, r = {}) {
  const { steps: e = 10, format: o = "hex", includeEnds: s = !0 } = r;
  if (e < 2)
    throw new Error("步数必须至少为2");
  const a = b(t), c = b(n), i = [], h = s ? e : e + 2, f = 1 / (h - 1);
  for (let u = 0; u < h; u++) {
    const l = u * f, m = Math.round(a.red() + (c.red() - a.red()) * l), d = Math.round(a.green() + (c.green() - a.green()) * l), M = Math.round(a.blue() + (c.blue() - a.blue()) * l), g = b({ r: m, g: d, b: M });
    !s && (u === 0 || u === h - 1) || i.push(E(g, o));
  }
  return i;
}
function it(t = {}) {
  const {
    startGray: n = "#ffffff",
    endGray: r = "#000000",
    steps: e = 10,
    format: o = "hex"
  } = t;
  return O(n, r, { steps: e, format: o, includeEnds: !0 });
}
function I(t, n = {}) {
  const {
    steps: r = 10,
    format: e = "hex",
    lightnessRange: o = 80,
    minLightness: s = null,
    maxLightness: a = null,
    preserveChroma: c = !1
  } = n, i = b(t);
  let h, f;
  if (s !== null && a !== null) {
    if (s > a)
      throw new Error("minLightness 不能大于 maxLightness");
    h = Math.max(0, Math.min(100, a)), f = Math.max(0, Math.min(100, s));
  } else {
    const m = i.lightness();
    h = Math.min(95, m + o / 2), f = Math.max(5, m - o / 2);
  }
  if (c)
    return _(i, h, f, r, e);
  const u = b({
    h: i.hue(),
    s: i.saturationl(),
    l: h
  }), l = b({
    h: i.hue(),
    s: i.saturationl(),
    l: f
  });
  return O(u.hex(), l.hex(), { steps: r, format: e, includeEnds: !0 });
}
function _(t, n, r, e, o) {
  const s = t.a(), a = t.b(), c = Math.sqrt(s * s + a * a), i = Math.atan2(a, s), h = [], f = (n - r) / (e - 1);
  for (let u = 0; u < e; u++) {
    const l = n - f * u;
    let m = c;
    if (l > 85) {
      const p = Math.max(0, (100 - l) / 15);
      m = c * p;
    } else if (l < 15) {
      const p = Math.max(0, l / 15);
      m = c * p;
    }
    const d = m * Math.cos(i), M = m * Math.sin(i);
    let g = b.lab(l, d, M), w = g.rgb().array(), L = m;
    for (; (w[0] < 0 || w[0] > 255 || w[1] < 0 || w[1] > 255 || w[2] < 0 || w[2] > 255) && L > 0; ) {
      L -= 1;
      const p = L * Math.cos(i), x = L * Math.sin(i);
      g = b.lab(l, p, x), w = g.rgb().array();
    }
    h.push(E(g, o));
  }
  return h;
}
function ct(t, n, r = {}) {
  const { steps: e = 10, format: o = "hex", includeEnds: s = !0 } = r;
  if (e < 2)
    throw new Error("步数必须至少为2");
  const a = b(t), c = b(n), i = [], h = s ? e : e + 2, f = 1 / (h - 1);
  let u = a.hue() || 0, l = c.hue() || 0;
  const m = l - u;
  Math.abs(m) > 180 && (m > 0 ? u += 360 : l += 360);
  const d = a.saturationl(), M = c.saturationl(), g = a.lightness(), w = c.lightness();
  for (let L = 0; L < h; L++) {
    const p = L * f;
    let x = u + (l - u) * p;
    const y = d + (M - d) * p, v = g + (w - g) * p;
    x = x % 360, x < 0 && (x += 360);
    const A = b({ h: x, s: y, l: v });
    !s && (L === 0 || L === h - 1) || i.push(E(A, o));
  }
  return i;
}
function R(t) {
  if (!t || typeof t != "string")
    throw new Error("Invalid RGB color: must be a string");
  let n;
  try {
    n = b(t);
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
function C(t, n = {}) {
  if (!t || typeof t != "object" || t.h === void 0 || t.c === void 0 || t.t === void 0)
    throw new Error("Invalid HCT color: must be an object with h, c, t properties");
  const { gamutMapping: r = "reduce-chroma" } = n;
  let { h: e, c: o, t: s } = t;
  e = (e % 360 + 360) % 360, o = Math.max(0, o), s = Math.max(0, Math.min(100, s));
  const a = e * (Math.PI / 180), c = o * Math.cos(a), i = o * Math.sin(a);
  try {
    let h = b.lab(s, c, i);
    if (r === "reduce-chroma") {
      let d = o, M = h.rgb().array();
      for (; (M[0] < 0 || M[0] > 255 || M[1] < 0 || M[1] > 255 || M[2] < 0 || M[2] > 255) && d > 0; ) {
        d -= 1;
        const g = d * Math.cos(a), w = d * Math.sin(a);
        h = b.lab(s, g, w), M = h.rgb().array();
      }
    }
    const f = h.rgb().array(), u = Math.max(0, Math.min(255, Math.round(f[0]))), l = Math.max(0, Math.min(255, Math.round(f[1]))), m = Math.max(0, Math.min(255, Math.round(f[2])));
    return `#${u.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${m.toString(16).padStart(2, "0")}`;
  } catch {
    return b.lab(s, c, i).hex().toLowerCase();
  }
}
function $(t, n, r = 0.5, e = {}) {
  if (!t || !n)
    throw new Error("Both colors are required for blending");
  const { mode: o = "lab" } = e, s = Math.max(0, Math.min(1, r));
  return o === "lab" ? tt(t, n, s) : o === "hue-only" ? j(t, n, s) : nt(t, n, s);
}
function tt(t, n, r) {
  const e = b(t), o = b(n), s = e.l(), a = e.a(), c = e.b(), i = o.l(), h = o.a(), f = o.b(), u = s + (i - s) * r, l = a + (h - a) * r, m = c + (f - c) * r;
  return b.lab(u, l, m).hex().toLowerCase();
}
function nt(t, n, r) {
  const e = R(t), o = R(n), s = k(e.h, o.h, r), a = e.c + (o.c - e.c) * r, c = e.t + (o.t - e.t) * r;
  return C({
    h: s,
    c: Math.max(0, a),
    t: Math.max(0, Math.min(100, c))
  });
}
function j(t, n, r) {
  const e = R(t), o = R(n), s = k(e.h, o.h, r);
  return C({
    h: s,
    c: e.c,
    // 保持第一个颜色的色度
    t: e.t
    // 保持第一个颜色的明度
  });
}
function k(t, n, r) {
  let e = n - t;
  e > 180 ? e -= 360 : e < -180 && (e += 360);
  let o = t + e * r;
  return o < 0 && (o += 360), o >= 360 && (o -= 360), o;
}
function lt(t, n) {
  const r = b(t), e = b(n), o = r.l(), s = r.a(), a = r.b(), c = e.l(), i = e.a(), h = e.b();
  return Math.sqrt(
    Math.pow(c - o, 2) + Math.pow(i - s, 2) + Math.pow(h - a, 2)
  );
}
function ht(t, n) {
  const r = R(t);
  return C({
    h: r.h,
    c: r.c,
    t: Math.max(0, Math.min(100, n))
  });
}
function ut(t, n) {
  const r = R(t);
  return C({
    h: r.h,
    c: Math.max(0, n),
    t: r.t
  });
}
function ft(t, n) {
  const r = R(t);
  return C({
    h: (n % 360 + 360) % 360,
    c: r.c,
    t: r.t
  });
}
function S(t, n) {
  const r = R(t);
  let e = r.h + n;
  return e = (e % 360 + 360) % 360, C({
    h: e,
    c: r.c,
    t: r.t
  });
}
function mt(t) {
  return S(t, 180);
}
function dt(t) {
  return [
    t,
    S(t, 120),
    S(t, 240)
  ];
}
function gt(t, n = 30) {
  return [
    t,
    S(t, 180 - n),
    S(t, 180 + n)
  ];
}
function Mt(t, n = 3, r = 30) {
  const e = [], o = -r * Math.floor(n / 2);
  for (let s = 0; s < n; s++)
    e.push(S(t, o + r * s));
  return e;
}
function pt(t, n, r = 0.15) {
  if (!t || !n)
    throw new Error("Both theme color and target color are required");
  const e = Math.max(0, Math.min(1, r));
  return j(n, t, e);
}
function bt(t, n) {
  if (!t)
    throw new Error("Theme color is required");
  const r = R(t);
  let e;
  if (Array.isArray(n) ? e = n : n && n.tones && Array.isArray(n.tones) ? e = n.tones : e = [10, 20, 30, 40, 50, 60, 70, 80, 90], !Array.isArray(e) || e.length === 0)
    throw new Error("Tone steps must be a non-empty array");
  const o = e.filter((s) => typeof s == "number" && s >= 0 && s <= 100);
  if (o.length === 0)
    throw new Error("No valid tone values found (must be numbers between 0-100)");
  return o.map((s) => C({
    h: r.h,
    c: r.c,
    t: s
  }));
}
function et(t, n, r = 0.2) {
  if (!t)
    throw new Error("Theme color is required");
  if (!n || typeof n != "object")
    throw new Error("UI colors must be an object");
  const e = Math.max(0, Math.min(1, r)), o = {};
  for (const [s, a] of Object.entries(n))
    try {
      o[s] = $(t, a, e);
    } catch (c) {
      console.warn(`Failed to blend color for key "${s}": ${/** @type {Error} */
      c.message}`), o[s] = a;
    }
  return o;
}
function z(t, n = {}) {
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
    minLightness: c = null,
    // 最小亮度（固定端点模式），优先级高于 lightnessRange
    maxLightness: i = null
    // 最大亮度（固定端点模式），优先级高于 lightnessRange
  } = n, h = Math.max(0, Math.min(1, e)), f = Math.max(2, Math.min(100, Math.round(s))), u = $(r, t, h), l = {
    steps: f,
    format: "hex"
  };
  if (c !== null && i !== null)
    l.minLightness = c, l.maxLightness = i;
  else {
    const g = Math.max(20, Math.min(95, a));
    l.lightnessRange = g;
  }
  const m = I(u, l), d = o ? m.reverse() : m, M = {};
  return d.forEach((g, w) => {
    M[`gray-${w + 1}`] = g;
  }), M;
}
function rt(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    baseGray: r = "#f5f5f5",
    // 使用浅灰作为基础，比控件色更浅
    blendRatio: e = 0.03,
    // 较低的混合比例，保持中性但带有品牌色调
    steps: o = 6,
    // 默认 6 个等级
    minLightness: s = 92,
    // 最深的浅灰亮度
    maxLightness: a = 100,
    // 最浅接近白色
    prefix: c = "neutral"
    // 颜色名称前缀
  } = n, i = Math.max(0, Math.min(1, e)), h = Math.max(2, Math.min(20, Math.round(o))), f = Math.max(80, Math.min(99, s)), u = Math.max(f + 1, Math.min(100, a)), l = $(r, t, i), m = I(l, {
    steps: h,
    format: "hex",
    minLightness: f,
    maxLightness: u
  }), d = {};
  return m.forEach((M, g) => {
    d[`${c}-${g + 1}`] = M;
  }), d;
}
function G(t, n = {}) {
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
    minLightness: c = 8,
    // 最小亮度（固定端点模式）- 默认接近黑色
    maxLightness: i = 97,
    // 最大亮度（固定端点模式）- 默认接近白色
    preserveChroma: h = !0
    // 默认保持色度，避免灰蒙蒙
  } = n;
  if (!r || typeof r != "object")
    throw new Error("Semantic colors must be an object");
  const f = Math.max(0, Math.min(1, e)), u = Math.max(2, Math.min(100, Math.round(s))), l = {};
  return Object.entries(r).forEach(([m, d]) => {
    if (!d || typeof d != "string") {
      console.warn(`Invalid color for semantic color "${m}": ${d}`);
      return;
    }
    try {
      const M = $(d, t, f), g = {
        steps: u,
        format: "hex",
        preserveChroma: h
        // 保持色度，避免灰蒙蒙
      };
      if (c !== null && i !== null)
        g.minLightness = c, g.maxLightness = i;
      else {
        const p = Math.max(20, Math.min(95, a));
        g.lightnessRange = p;
      }
      const w = I(M, g);
      (o ? w.reverse() : w).forEach((p, x) => {
        l[`${m}-${x + 1}`] = p;
      });
    } catch (M) {
      console.warn(`Failed to generate variants for semantic color "${m}": ${/** @type {Error} */
      M.message}`);
    }
  }), l;
}
function N(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    isDark: r = !1,
    steps: e = 10,
    // 默认生成 10 个色阶
    lightnessRange: o = 80,
    // 亮度变化范围（中心扩展模式）
    minLightness: s = 8,
    // 最小亮度（固定端点模式）- 默认接近黑色
    maxLightness: a = 97,
    // 最大亮度（固定端点模式）- 默认接近白色
    preserveChroma: c = !0
    // 默认保持色度
  } = n, h = {
    steps: Math.max(2, Math.min(100, Math.round(e))),
    format: "hex",
    preserveChroma: c
  };
  if (s !== null && a !== null)
    h.minLightness = s, h.maxLightness = a;
  else {
    const m = Math.max(20, Math.min(95, o));
    h.lightnessRange = m;
  }
  const f = I(t, h), u = r ? f.reverse() : f, l = {};
  return u.forEach((m, d) => {
    l[`theme-${d + 1}`] = m;
  }), l;
}
function wt(t, n = {}) {
  if (!t)
    throw new Error("Theme color is required");
  const {
    baseGray: r = "#666666",
    isDark: e = !1,
    semanticColors: o,
    controlBlendRatio: s = 0.08,
    semanticBlendRatio: a = 0.12,
    controlSteps: c = 12,
    // 控件色灰度等级数
    controlLightnessRange: i = 85,
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
    semanticMaxLightness: d = null,
    // 语义色最大亮度
    semanticPreserveChroma: M = !0,
    // 语义色保持色度（默认开启）
    themeSteps: g = 10,
    // 主题色等级数
    themeLightnessRange: w = 80,
    // 主题色亮度变化范围
    themeMinLightness: L = null,
    // 主题色最小亮度
    themeMaxLightness: p = null,
    // 主题色最大亮度
    themePreserveChroma: x = !0,
    // 主题色保持色度（默认开启）
    // 浅灰度颜色配置
    neutralSteps: y = 6,
    // 浅灰度等级数
    neutralMinLightness: v = 92,
    // 浅灰度最小亮度
    neutralMaxLightness: A = 100,
    // 浅灰度最大亮度
    neutralBlendRatio: V = 0.03
    // 浅灰度主题色混合比例
  } = n, U = Math.max(0, Math.min(1, s)), K = Math.max(0, Math.min(1, a)), B = {
    baseGray: r,
    blendRatio: U,
    isDark: e,
    steps: c
  };
  h !== null && f !== null ? (B.minLightness = h, B.maxLightness = f) : B.lightnessRange = i;
  const D = {
    semanticColors: o,
    blendRatio: K,
    isDark: e,
    steps: u,
    preserveChroma: M
  };
  m !== null && d !== null ? (D.minLightness = m, D.maxLightness = d) : D.lightnessRange = l;
  const F = {
    isDark: e,
    steps: g,
    preserveChroma: x
  };
  return L !== null && p !== null ? (F.minLightness = L, F.maxLightness = p) : F.lightnessRange = w, {
    // 1. 基础控件颜色（灰色系1-12或更多）
    controls: z(t, B),
    // 2. 浅灰度颜色（用于背景、卡片等）
    neutrals: rt(t, {
      blendRatio: V,
      steps: y,
      minLightness: v,
      maxLightness: A
    }),
    // 3. 表意色（1-10或更多）
    semantic: G(t, D),
    // 4. 主题色（1-10或更多）
    theme: N(t, F)
  };
}
function xt(t, n = {}) {
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
  ), c = Math.max(0, Math.min(1, o)), i = Math.max(0, Math.min(1, s)), h = N(t, { isDark: a }), f = z(t, {
    blendRatio: i * 0.5,
    // 中性色混合比例稍低
    isDark: a
  }), u = G(t, {
    semanticColors: r,
    blendRatio: c,
    isDark: a
  }), l = {};
  return Object.entries(r).forEach(([d]) => {
    l[d] = {};
    for (let M = 1; M <= 10; M++) {
      const g = `${d}-${M}`;
      u[g] && (l[d][M] = u[g]);
    }
  }), {
    theme: h,
    // 主题色阶 theme-1 到 theme-10
    controls: f,
    // 中性色阶 gray-1 到 gray-12
    semantic: l,
    // 功能色系
    ui: et(t, e, i)
  };
}
const H = {
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
function Lt() {
  const t = {};
  return Object.keys(H).forEach((n) => {
    t[n] = {}, t[n].light = P(H[
      /** @type {keyof typeof colorList} */
      n
    ], { list: !0 }), t[n].dark = P(H[
      /** @type {keyof typeof colorList} */
      n
    ], { list: !0, dark: !0 }), t[n].primary = H[
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
  ut as adjustChroma,
  ft as adjustHue,
  ht as adjustTone,
  $ as blendInHct,
  et as blendUIColors,
  lt as colorDifference,
  H as colorList,
  at as extractColorFromFile,
  Q as extractColorFromImage,
  P as generate,
  z as generateControlColors,
  it as generateGrayLinear,
  wt as generateInterfaceColorSystem,
  O as generateLinear,
  ct as generateLinearHSL,
  I as generateMonochromeLinear,
  rt as generateNeutralColors,
  G as generateSemanticColors,
  N as generateThemeColors,
  xt as generateThemePalette,
  bt as generateThemeVariants,
  Mt as getAnalogous,
  mt as getComplementary,
  Lt as getPresetColors,
  st as getRgbStr,
  gt as getSplitComplementary,
  dt as getTriadic,
  pt as harmonizeColor,
  C as hctToRgb,
  R as rgbToHct,
  S as rotateHue
};
