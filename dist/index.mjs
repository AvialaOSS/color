import m from "color";
function W(t) {
  return m(t).rgb().round().color.join(",");
}
const A = ["hex", "rgb", "hsl"];
function P(t) {
  return !t || A.indexOf(t) < 0 ? "hex" : t;
}
function F(t, r) {
  const a = P(r);
  return a === "hex" ? t[a]().toLowerCase() : t[a]().round().string();
}
function E(t, r, a) {
  const e = m(t), n = e.hue(), o = e.saturationv(), s = e.value(), c = ((b) => b >= 60 && b <= 240 ? 2.5 : b >= 0 && b < 60 || b > 300 && b <= 360 ? 1.5 : 2)(n), l = 100, f = 9, h = 100, u = 30;
  function d(b, w) {
    let x;
    return n >= 60 && n <= 240 ? x = b ? n - c * w : n + c * w : x = b ? n + c * w : n - c * w, x < 0 ? x += 360 : x >= 360 && (x -= 360), Math.round(x);
  }
  function g(b, w) {
    let x;
    if (b)
      x = o <= f ? o : o - (o - f) / 5.5 * Math.pow(w, 1.05);
    else {
      const k = Math.min(l, o + 30);
      x = o + (k - o) / 4.2 * Math.pow(w, 0.95);
    }
    return Math.max(0, Math.min(100, x));
  }
  function M(b, w) {
    return b ? Math.min(h, s + (h - s) / 5.2 * Math.pow(w, 0.9)) : s <= u ? s : Math.max(u, s - (s - u) / 4.2 * Math.pow(w, 1.05));
  }
  const p = r < 6, C = p ? 6 - r : r - 6, S = r === 6 ? e : m({
    h: d(p, C),
    s: g(p, C),
    v: M(p, C)
  });
  return F(S, a);
}
function v(t, r, a) {
  const e = m(E(t, 10 - r + 1)), n = m(t), o = n.hue(), s = n.saturationv(), c = m({
    h: n.hue(),
    s: h(6),
    v: n.value()
  }).saturationv(), l = Math.ceil((c - 9) / 4), f = Math.ceil((100 - c) / 5);
  function h(d) {
    if (d < 6)
      return c + (6 - d) * f;
    if (d === 6) {
      if (o >= 0 && o < 50)
        return s - 15;
      if (o >= 50 && o < 191)
        return s - 20;
      if (o >= 191 && o <= 360)
        return s - 15;
    }
    return c - l * (d - 6);
  }
  const u = m({
    h: e.hue(),
    s: h(r),
    v: e.value()
  });
  return F(u, a);
}
function I(t, r = {}) {
  const { dark: a, list: e, index: n = 6, format: o = "hex" } = r;
  if (e) {
    const s = [], i = a ? v : E;
    for (let c = 1; c <= 10; c++)
      s.push(i(t, c, o));
    return s;
  }
  return a ? v(t, n, o) : E(t, n, o);
}
async function $(t) {
  try {
    const r = await z(t), a = B(r);
    return V(a);
  } catch (r) {
    throw console.error("提取图片颜色失败:", r), r;
  }
}
async function z(t) {
  return new Promise((r, a) => {
    try {
      const e = document.createElement("canvas"), n = e.getContext("2d"), o = Math.min(t.width, 100), s = Math.min(t.height, 100), i = Math.min(o / t.width, s / t.height);
      e.width = t.width * i, e.height = t.height * i, n.drawImage(t, 0, 0, e.width, e.height);
      const c = n.getImageData(0, 0, e.width, e.height);
      r(c);
    } catch (e) {
      a(e);
    }
  });
}
function B(t) {
  const r = t.data, a = /* @__PURE__ */ new Map();
  for (let n = 0; n < r.length; n += 4) {
    const o = r[n], s = r[n + 1], i = r[n + 2];
    if (r[n + 3] < 128) continue;
    const l = Math.round(o / 16) * 16, f = Math.round(s / 16) * 16, h = Math.round(i / 16) * 16, u = `${l},${f},${h}`;
    a.has(u) ? a.set(u, a.get(u) + 1) : a.set(u, 1);
  }
  const e = [];
  return a.forEach((n, o) => {
    const [s, i, c] = o.split(",").map(Number);
    e.push({ r: s, g: i, b: c, count: n });
  }), e;
}
function V(t) {
  t.sort((n, o) => o.count - n.count);
  const r = t.filter((n) => {
    const { r: o, g: s, b: i } = n, c = Math.max(o, s, i), l = Math.min(o, s, i), f = c - l, h = c === 0 ? 0 : f / c, u = c / 255;
    return h > 0.15 && u > 0.2 && u < 0.8;
  }), a = r.length > 0 ? r[0] : t[0];
  return m({ r: a.r, g: a.g, b: a.b }).hex();
}
function J(t) {
  return new Promise((r, a) => {
    if (!t.type.startsWith("image/")) {
      a(new Error("请选择图片文件"));
      return;
    }
    const e = new FileReader();
    e.onload = async (n) => {
      try {
        const o = new Image();
        o.onload = async () => {
          try {
            const s = await $(o);
            r(s);
          } catch (s) {
            a(s);
          }
        }, o.onerror = () => a(new Error("图片加载失败")), o.src = n.target.result;
      } catch (o) {
        a(o);
      }
    }, e.onerror = () => a(new Error("文件读取失败")), e.readAsDataURL(t);
  });
}
function L(t, r, a = {}) {
  const { steps: e = 10, format: n = "hex", includeEnds: o = !0 } = a;
  if (e < 2)
    throw new Error("步数必须至少为2");
  const s = m(t), i = m(r), c = [], l = o ? e : e + 2, f = 1 / (l - 1);
  for (let h = 0; h < l; h++) {
    const u = h * f, d = Math.round(s.red() + (i.red() - s.red()) * u), g = Math.round(s.green() + (i.green() - s.green()) * u), M = Math.round(s.blue() + (i.blue() - s.blue()) * u), p = m({ r: d, g, b: M });
    !o && (h === 0 || h === l - 1) || c.push(F(p, n));
  }
  return c;
}
function Q(t = {}) {
  const {
    startGray: r = "#ffffff",
    endGray: a = "#000000",
    steps: e = 10,
    format: n = "hex"
  } = t;
  return L(r, a, { steps: e, format: n, includeEnds: !0 });
}
function X(t, r = {}) {
  const { steps: a = 10, format: e = "hex", lightnessRange: n = 80 } = r, s = m(t).hsl(), i = s.lightness(), c = Math.min(95, i + n / 2), l = Math.max(5, i - n / 2), f = m({
    h: s.hue(),
    s: s.saturationl(),
    l: c
  }), h = m({
    h: s.hue(),
    s: s.saturationl(),
    l
  });
  return L(f.hex(), h.hex(), { steps: a, format: e, includeEnds: !0 });
}
function Y(t, r, a = {}) {
  const { steps: e = 10, format: n = "hex", includeEnds: o = !0 } = a;
  if (e < 2)
    throw new Error("步数必须至少为2");
  const s = m(t).hsl(), i = m(r).hsl(), c = [], l = o ? e : e + 2, f = 1 / (l - 1);
  let h = s.hue() || 0, u = i.hue() || 0;
  const d = u - h;
  Math.abs(d) > 180 && (d > 0 ? h += 360 : u += 360);
  for (let g = 0; g < l; g++) {
    const M = g * f;
    let p = h + (u - h) * M;
    const C = s.saturationl() + (i.saturationl() - s.saturationl()) * M, S = s.lightness() + (i.lightness() - s.lightness()) * M;
    p = p % 360, p < 0 && (p += 360);
    const b = m({ h: p, s: C, l: S });
    !o && (g === 0 || g === l - 1) || c.push(F(b, n));
  }
  return c;
}
function y(t) {
  const r = t.replace("#", ""), a = parseInt(r.substr(0, 2), 16) / 255, e = parseInt(r.substr(2, 2), 16) / 255, n = parseInt(r.substr(4, 2), 16) / 255, o = Math.max(a, e, n), s = Math.min(a, e, n), i = o - s;
  let c = 0;
  i !== 0 && (o === a ? c = (e - n) / i % 6 : o === e ? c = (n - a) / i + 2 : c = (a - e) / i + 4), c = Math.round(c * 60), c < 0 && (c += 360);
  const l = Math.round((0.299 * a + 0.587 * e + 0.114 * n) * 100), f = (o + s) / 2, h = i === 0 ? 0 : i / (1 - Math.abs(2 * f - 1)), u = Math.round(h * Math.min(l, 100 - l));
  return { h: c, c: u, t: l };
}
function D(t) {
  const { h: r, c: a, t: e } = t, n = (r % 360 + 360) % 360, o = Math.max(0, Math.min(150, a)), s = Math.max(0, Math.min(100, e)), i = s / 100, c = s === 0 || s === 100 ? 0 : o / Math.min(s, 100 - s), l = (1 - Math.abs(2 * i - 1)) * Math.min(1, c), f = l * (1 - Math.abs(n / 60 % 2 - 1)), h = i - l / 2;
  let u, d, g;
  n >= 0 && n < 60 ? [u, d, g] = [l, f, 0] : n >= 60 && n < 120 ? [u, d, g] = [f, l, 0] : n >= 120 && n < 180 ? [u, d, g] = [0, l, f] : n >= 180 && n < 240 ? [u, d, g] = [0, f, l] : n >= 240 && n < 300 ? [u, d, g] = [f, 0, l] : [u, d, g] = [l, 0, f];
  const M = (p) => {
    const C = Math.max(0, Math.min(1, p + h)), S = Math.round(C * 255).toString(16);
    return S.length === 1 ? "0" + S : S;
  };
  return `#${M(u)}${M(d)}${M(g)}`;
}
function R(t, r, a = 0.5) {
  const e = y(t), n = y(r);
  let o = e.h, s = n.h, i = s - o;
  Math.abs(i) > 180 && (i > 0 ? o += 360 : s += 360);
  const c = (o + (s - o) * a) % 360, l = e.c + (n.c - e.c) * a, f = e.t + (n.t - e.t) * a;
  return D({
    h: c < 0 ? c + 360 : c,
    c: Math.max(0, Math.round(l)),
    t: Math.max(0, Math.min(100, Math.round(f)))
  });
}
function G(t, r, a = 0.15) {
  const e = y(t), n = y(r);
  let o = n.h, s = e.h, i = s - o;
  Math.abs(i) > 180 && (i > 0 ? o += 360 : s += 360, i = s - o);
  const c = (o + i * a) % 360;
  return D({
    h: c < 0 ? c + 360 : c,
    c: n.c,
    // 保持原有色度
    t: n.t
    // 保持原有色调
  });
}
function O(t, r = [10, 20, 30, 40, 50, 60, 70, 80, 90]) {
  const a = y(t);
  let e;
  return Array.isArray(r) ? e = r : r && r.tones && Array.isArray(r.tones) ? e = r.tones : e = [10, 20, 30, 40, 50, 60, 70, 80, 90], e.map((n) => D({
    h: a.h,
    c: a.c,
    t: n
  }));
}
function T(t, r, a = 0.15) {
  const e = {};
  for (const [n, o] of Object.entries(r))
    e[n] = G(t, o, a);
  return e;
}
function N(t, r, a = 0.2) {
  const e = {};
  for (const [n, o] of Object.entries(r))
    e[n] = R(t, o, a);
  return e;
}
function q(t, r = {}) {
  const { baseGray: a = "#666666" } = r, { blendRatio: e = 0.08, isDark: n = !1 } = r, o = y(a), s = {};
  return (n ? [95, 90, 85, 80, 70, 60, 50, 40, 30, 20, 15, 10] : [10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95]).forEach((c, l) => {
    const f = { h: o.h, c: o.c, t: c }, h = R(D(f), t, e);
    s[`gray-${l + 1}`] = h;
  }), s;
}
function j(t, r = {}) {
  const {
    semanticColors: a = {
      success: "#52c41a",
      warning: "#faad14",
      error: "#ff4d4f",
      info: "#1890ff"
    },
    blendRatio: e = 0.12,
    isDark: n = !1
  } = r, o = {};
  return Object.entries(a).forEach(([s, i]) => {
    const c = {}, l = y(i);
    (n ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]).forEach((h, u) => {
      const d = { h: l.h, c: l.c, t: h }, g = R(D(d), t, e);
      c[`${s}-${u + 1}`] = g;
    }), Object.assign(o, c);
  }), o;
}
function U(t, r = {}) {
  const { isDark: a = !1 } = r, e = y(t), n = {};
  return (a ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]).forEach((s, i) => {
    const c = { h: e.h, c: e.c, t: s };
    n[`theme-${i + 1}`] = D(c);
  }), n;
}
function Z(t, r = {}) {
  const {
    baseGray: a = "#666666",
    isDark: e = !1,
    semanticColors: n,
    controlBlendRatio: o = 0.08,
    semanticBlendRatio: s = 0.12
  } = r;
  return {
    // 1. 基础控件颜色（灰色系1-12）
    controls: q(t, {
      baseGray: a,
      blendRatio: o,
      isDark: e
    }),
    // 2. 表意色（1-10）
    semantic: j(t, {
      semanticColors: n,
      blendRatio: s,
      isDark: e
    }),
    // 3. 主题色（1-10）
    theme: U(t, { isDark: e })
  };
}
function _(t, r = {}) {
  const {
    semanticColors: a = {
      success: "#4caf50",
      warning: "#ff9800",
      error: "#f44336",
      info: "#2196f3"
    },
    uiColors: e = {
      primary: t,
      "primary-light": "#ffffff",
      "primary-lighter": "#f8f9ff",
      "primary-dark": "#000000",
      "primary-darker": "#0a0a0a",
      accent: "#722ed1",
      "neutral-1": "#f7f8fa",
      "neutral-2": "#f2f3f5",
      "neutral-3": "#e5e6eb",
      "neutral-4": "#c9cdd4",
      "neutral-5": "#a9aeb8",
      "neutral-6": "#86909c",
      background: "#ffffff",
      surface: "#f8f9fa",
      border: "#e5e6eb",
      disabled: "#c9cdd4"
    },
    harmonizeRatio: n = 0.15,
    blendRatio: o = 0.12,
    generateVariants: s = !0
  } = r, i = {
    theme: t,
    semantic: T(t, a, n),
    ui: N(t, e, o)
  };
  return s && (i.variants = O(t)), i;
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
function tt() {
  const t = {};
  return Object.keys(H).forEach((r) => {
    t[r] = {}, t[r].light = I(H[r], { list: !0 }), t[r].dark = I(H[r], { list: !0, dark: !0 }), t[r].primary = H[r];
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
  R as blendInHct,
  T as blendSemanticColors,
  N as blendUIColors,
  H as colorList,
  J as extractColorFromFile,
  $ as extractColorFromImage,
  I as generate,
  q as generateControlColors,
  Q as generateGrayLinear,
  Z as generateInterfaceColorSystem,
  L as generateLinear,
  Y as generateLinearHSL,
  X as generateMonochromeLinear,
  j as generateSemanticColors,
  U as generateThemeColors,
  _ as generateThemePalette,
  O as generateThemeVariants,
  tt as getPresetColors,
  W as getRgbStr,
  G as harmonizeColor,
  D as hctToRgb,
  y as rgbToHct
};
