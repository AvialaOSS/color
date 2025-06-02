import m from "color";
function U(n) {
  return m(n).rgb().round().color.join(",");
}
const P = ["hex", "rgb", "hsl"];
function z(n) {
  return !n || P.indexOf(n) < 0 ? "hex" : n;
}
function F(n, o) {
  const a = z(o);
  return a === "hex" ? n[a]().toLowerCase() : n[a]().round().string();
}
function E(n, o, a) {
  const e = m(n), t = e.hue(), r = e.saturationv(), s = e.value(), c = ((b) => b >= 60 && b <= 240 ? 2.5 : b >= 0 && b < 60 || b > 300 && b <= 360 ? 1.5 : 2)(t), l = 100, f = 9, u = 100, h = 30;
  function d(b, w) {
    let x;
    return t >= 60 && t <= 240 ? x = b ? t - c * w : t + c * w : x = b ? t + c * w : t - c * w, x < 0 ? x += 360 : x >= 360 && (x -= 360), Math.round(x);
  }
  function g(b, w) {
    let x;
    if (b)
      x = r <= f ? r : r - (r - f) / 5.5 * Math.pow(w, 1.05);
    else {
      const A = Math.min(l, r + 30);
      x = r + (A - r) / 4.2 * Math.pow(w, 0.95);
    }
    return Math.max(0, Math.min(100, x));
  }
  function p(b, w) {
    return b ? Math.min(u, s + (u - s) / 5.2 * Math.pow(w, 0.9)) : s <= h ? s : Math.max(h, s - (s - h) / 4.2 * Math.pow(w, 1.05));
  }
  const M = o < 6, S = M ? 6 - o : o - 6, y = o === 6 ? e : m({
    h: d(M, S),
    s: g(M, S),
    v: p(M, S)
  });
  return F(y, a);
}
function v(n, o, a) {
  const e = m(E(n, 10 - o + 1)), t = m(n), r = t.hue(), s = t.saturationv(), c = m({
    h: t.hue(),
    s: u(6),
    v: t.value()
  }).saturationv(), l = Math.ceil((c - 9) / 4), f = Math.ceil((100 - c) / 5);
  function u(d) {
    if (d < 6)
      return c + (6 - d) * f;
    if (d === 6) {
      if (r >= 0 && r < 50)
        return s - 15;
      if (r >= 50 && r < 191)
        return s - 20;
      if (r >= 191 && r <= 360)
        return s - 15;
    }
    return c - l * (d - 6);
  }
  const h = m({
    h: e.hue(),
    s: u(o),
    v: e.value()
  });
  return F(h, a);
}
function I(n, o = {}) {
  const { dark: a, list: e, index: t = 6, format: r = "hex" } = o;
  if (e) {
    const s = [], i = a ? v : E;
    for (let c = 1; c <= 10; c++)
      s.push(i(n, c, r));
    return s;
  }
  return a ? v(n, t, r) : E(n, t, r);
}
async function B(n) {
  try {
    const o = await k(n), a = V(o);
    return G(a);
  } catch (o) {
    throw console.error("提取图片颜色失败:", o), o;
  }
}
async function k(n) {
  return new Promise((o, a) => {
    try {
      const e = document.createElement("canvas"), t = e.getContext("2d"), r = Math.min(n.width, 100), s = Math.min(n.height, 100), i = Math.min(r / n.width, s / n.height);
      e.width = n.width * i, e.height = n.height * i, t.drawImage(n, 0, 0, e.width, e.height);
      const c = t.getImageData(0, 0, e.width, e.height);
      o(c);
    } catch (e) {
      a(e);
    }
  });
}
function V(n) {
  const o = n.data, a = /* @__PURE__ */ new Map();
  for (let t = 0; t < o.length; t += 4) {
    const r = o[t], s = o[t + 1], i = o[t + 2];
    if (o[t + 3] < 128) continue;
    const l = Math.round(r / 16) * 16, f = Math.round(s / 16) * 16, u = Math.round(i / 16) * 16, h = `${l},${f},${u}`;
    a.has(h) ? a.set(h, a.get(h) + 1) : a.set(h, 1);
  }
  const e = [];
  return a.forEach((t, r) => {
    const [s, i, c] = r.split(",").map(Number);
    e.push({ r: s, g: i, b: c, count: t });
  }), e;
}
function G(n) {
  n.sort((t, r) => r.count - t.count);
  const o = n.filter((t) => {
    const { r, g: s, b: i } = t, c = Math.max(r, s, i), l = Math.min(r, s, i), f = c - l, u = c === 0 ? 0 : f / c, h = c / 255;
    return u > 0.15 && h > 0.2 && h < 0.8;
  }), a = o.length > 0 ? o[0] : n[0];
  return m({ r: a.r, g: a.g, b: a.b }).hex();
}
function K(n) {
  return new Promise((o, a) => {
    if (!n.type.startsWith("image/")) {
      a(new Error("请选择图片文件"));
      return;
    }
    const e = new FileReader();
    e.onload = async (t) => {
      try {
        const r = new Image();
        r.onload = async () => {
          try {
            const s = await B(r);
            o(s);
          } catch (s) {
            a(s);
          }
        }, r.onerror = () => a(new Error("图片加载失败")), r.src = t.target.result;
      } catch (r) {
        a(r);
      }
    }, e.onerror = () => a(new Error("文件读取失败")), e.readAsDataURL(n);
  });
}
function $(n, o, a = {}) {
  const { steps: e = 10, format: t = "hex", includeEnds: r = !0 } = a;
  if (e < 2)
    throw new Error("步数必须至少为2");
  const s = m(n), i = m(o), c = [], l = r ? e : e + 2, f = 1 / (l - 1);
  for (let u = 0; u < l; u++) {
    const h = u * f, d = Math.round(s.red() + (i.red() - s.red()) * h), g = Math.round(s.green() + (i.green() - s.green()) * h), p = Math.round(s.blue() + (i.blue() - s.blue()) * h), M = m({ r: d, g, b: p });
    !r && (u === 0 || u === l - 1) || c.push(F(M, t));
  }
  return c;
}
function W(n = {}) {
  const {
    startGray: o = "#ffffff",
    endGray: a = "#000000",
    steps: e = 10,
    format: t = "hex"
  } = n;
  return $(o, a, { steps: e, format: t, includeEnds: !0 });
}
function J(n, o = {}) {
  const { steps: a = 10, format: e = "hex", lightnessRange: t = 80 } = o, s = m(n).hsl(), i = s.lightness(), c = Math.min(95, i + t / 2), l = Math.max(5, i - t / 2), f = m({
    h: s.hue(),
    s: s.saturationl(),
    l: c
  }), u = m({
    h: s.hue(),
    s: s.saturationl(),
    l
  });
  return $(f.hex(), u.hex(), { steps: a, format: e, includeEnds: !0 });
}
function Q(n, o, a = {}) {
  const { steps: e = 10, format: t = "hex", includeEnds: r = !0 } = a;
  if (e < 2)
    throw new Error("步数必须至少为2");
  const s = m(n).hsl(), i = m(o).hsl(), c = [], l = r ? e : e + 2, f = 1 / (l - 1);
  let u = s.hue() || 0, h = i.hue() || 0;
  const d = h - u;
  Math.abs(d) > 180 && (d > 0 ? u += 360 : h += 360);
  for (let g = 0; g < l; g++) {
    const p = g * f;
    let M = u + (h - u) * p;
    const S = s.saturationl() + (i.saturationl() - s.saturationl()) * p, y = s.lightness() + (i.lightness() - s.lightness()) * p;
    M = M % 360, M < 0 && (M += 360);
    const b = m({ h: M, s: S, l: y });
    !r && (g === 0 || g === l - 1) || c.push(F(b, t));
  }
  return c;
}
function C(n) {
  const o = n.replace("#", ""), a = parseInt(o.substr(0, 2), 16) / 255, e = parseInt(o.substr(2, 2), 16) / 255, t = parseInt(o.substr(4, 2), 16) / 255, r = Math.max(a, e, t), s = Math.min(a, e, t), i = r - s;
  let c = 0;
  i !== 0 && (r === a ? c = (e - t) / i % 6 : r === e ? c = (t - a) / i + 2 : c = (a - e) / i + 4), c = Math.round(c * 60), c < 0 && (c += 360);
  const l = Math.round((0.299 * a + 0.587 * e + 0.114 * t) * 100), f = (r + s) / 2, u = i === 0 ? 0 : i / (1 - Math.abs(2 * f - 1)), h = Math.round(u * Math.min(l, 100 - l));
  return { h: c, c: h, t: l };
}
function D(n) {
  const { h: o, c: a, t: e } = n, t = (o % 360 + 360) % 360, r = Math.max(0, Math.min(150, a)), s = Math.max(0, Math.min(100, e)), i = s / 100, c = s === 0 || s === 100 ? 0 : r / Math.min(s, 100 - s), l = (1 - Math.abs(2 * i - 1)) * Math.min(1, c), f = l * (1 - Math.abs(t / 60 % 2 - 1)), u = i - l / 2;
  let h, d, g;
  t >= 0 && t < 60 ? [h, d, g] = [l, f, 0] : t >= 60 && t < 120 ? [h, d, g] = [f, l, 0] : t >= 120 && t < 180 ? [h, d, g] = [0, l, f] : t >= 180 && t < 240 ? [h, d, g] = [0, f, l] : t >= 240 && t < 300 ? [h, d, g] = [f, 0, l] : [h, d, g] = [l, 0, f];
  const p = (M) => {
    const S = Math.max(0, Math.min(1, M + u)), y = Math.round(S * 255).toString(16);
    return y.length === 1 ? "0" + y : y;
  };
  return `#${p(h)}${p(d)}${p(g)}`;
}
function R(n, o, a = 0.5) {
  const e = C(n), t = C(o);
  let r = e.h, s = t.h, i = s - r;
  Math.abs(i) > 180 && (i > 0 ? r += 360 : s += 360);
  const c = (r + (s - r) * a) % 360, l = e.c + (t.c - e.c) * a, f = e.t + (t.t - e.t) * a;
  return D({
    h: c < 0 ? c + 360 : c,
    c: Math.max(0, Math.round(l)),
    t: Math.max(0, Math.min(100, Math.round(f)))
  });
}
function X(n, o, a = 0.15) {
  const e = C(n), t = C(o);
  let r = t.h, s = e.h, i = s - r;
  Math.abs(i) > 180 && (i > 0 ? r += 360 : s += 360, i = s - r);
  const c = (r + i * a) % 360;
  return D({
    h: c < 0 ? c + 360 : c,
    c: t.c,
    // 保持原有色度
    t: t.t
    // 保持原有色调
  });
}
function O(n, o = [10, 20, 30, 40, 50, 60, 70, 80, 90]) {
  const a = C(n);
  let e;
  return Array.isArray(o) ? e = o : o && o.tones && Array.isArray(o.tones) ? e = o.tones : e = [10, 20, 30, 40, 50, 60, 70, 80, 90], e.map((t) => D({
    h: a.h,
    c: a.c,
    t
  }));
}
function T(n, o, a = 0.2) {
  const e = {};
  for (const [t, r] of Object.entries(o))
    e[t] = R(n, r, a);
  return e;
}
function N(n, o = {}) {
  const { baseGray: a = "#666666" } = o, { blendRatio: e = 0.08, isDark: t = !1 } = o, r = C(a), s = {};
  return (t ? [95, 90, 85, 80, 70, 60, 50, 40, 30, 20, 15, 10] : [10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95]).forEach((c, l) => {
    const f = { h: r.h, c: r.c, t: c }, u = R(D(f), n, e);
    s[`gray-${l + 1}`] = u;
  }), s;
}
function L(n, o = {}) {
  const {
    semanticColors: a = {
      success: "#52c41a",
      warning: "#faad14",
      error: "#ff4d4f",
      info: "#1890ff"
    },
    blendRatio: e = 0.12,
    isDark: t = !1
  } = o, r = {};
  return Object.entries(a).forEach(([s, i]) => {
    const c = {}, l = C(i);
    (t ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]).forEach((u, h) => {
      const d = { h: l.h, c: l.c, t: u }, g = R(D(d), n, e);
      c[`${s}-${h + 1}`] = g;
    }), Object.assign(r, c);
  }), r;
}
function q(n, o = {}) {
  const { isDark: a = !1 } = o, e = C(n), t = {};
  return (a ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]).forEach((s, i) => {
    const c = { h: e.h, c: e.c, t: s };
    t[`theme-${i + 1}`] = D(c);
  }), t;
}
function Y(n, o = {}) {
  const {
    baseGray: a = "#666666",
    isDark: e = !1,
    semanticColors: t,
    controlBlendRatio: r = 0.08,
    semanticBlendRatio: s = 0.12
  } = o;
  return {
    // 1. 基础控件颜色（灰色系1-12）
    controls: N(n, {
      baseGray: a,
      blendRatio: r,
      isDark: e
    }),
    // 2. 表意色（1-10）
    semantic: L(n, {
      semanticColors: t,
      blendRatio: s,
      isDark: e
    }),
    // 3. 主题色（1-10）
    theme: q(n, { isDark: e })
  };
}
function Z(n, o = {}) {
  const {
    semanticColors: a = {
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
    harmonizeRatio: t = 0.15,
    blendRatio: r = 0.12,
    generateVariants: s = !0
  } = o, i = L(n, { semanticColors: a, blendRatio: t }), c = {};
  Object.entries(a).forEach(([f]) => {
    c[f] = {};
    for (let u = 1; u <= 10; u++) {
      const h = `${f}-${u}`;
      i[h] && (c[f][u] = i[h]);
    }
  });
  const l = {
    theme: n,
    semantic: c,
    ui: T(n, e, r)
  };
  return s && (l.variants = O(n)), l;
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
function _() {
  const n = {};
  return Object.keys(H).forEach((o) => {
    n[o] = {}, n[o].light = I(H[o], { list: !0 }), n[o].dark = I(H[o], { list: !0, dark: !0 }), n[o].primary = H[o];
  }), n.gray = {}, n.gray.light = [
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
  ], n.gray.dark = [
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
  ], n.gray.primary = n.gray.light[6], n;
}
export {
  R as blendInHct,
  T as blendUIColors,
  H as colorList,
  K as extractColorFromFile,
  B as extractColorFromImage,
  I as generate,
  N as generateControlColors,
  W as generateGrayLinear,
  Y as generateInterfaceColorSystem,
  $ as generateLinear,
  Q as generateLinearHSL,
  J as generateMonochromeLinear,
  L as generateSemanticColors,
  q as generateThemeColors,
  Z as generateThemePalette,
  O as generateThemeVariants,
  _ as getPresetColors,
  U as getRgbStr,
  X as harmonizeColor,
  D as hctToRgb,
  C as rgbToHct
};
