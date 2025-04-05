import m from "color";
function R(t) {
  return m(t).rgb().round().color.join(",");
}
const B = ["hex", "rgb", "hsl"];
function A(t) {
  return !t || B.indexOf(t) < 0 ? "hex" : t;
}
function S(t, n) {
  const o = A(n);
  return o === "hex" ? t[o]() : t[o]().round().string();
}
function F(t, n, o) {
  const a = m(t), e = a.hue(), r = a.saturationv(), s = a.value(), c = ((l) => l >= 60 && l <= 240 ? 2.5 : l >= 0 && l < 60 || l > 300 && l <= 360 ? 1.5 : 2)(e), p = 100, d = 9, f = 100, u = 30;
  function w(l, g) {
    let h;
    return e >= 60 && e <= 240 ? h = l ? e - c * g : e + c * g : h = l ? e + c * g : e - c * g, h < 0 ? h += 360 : h >= 360 && (h -= 360), Math.round(h);
  }
  function y(l, g) {
    let h;
    if (l)
      h = r <= d ? r : r - (r - d) / 5.5 * Math.pow(g, 1.05);
    else {
      const E = Math.min(p, r + 30);
      h = r + (E - r) / 4.2 * Math.pow(g, 0.95);
    }
    return Math.max(0, Math.min(100, h));
  }
  function v(l, g) {
    return l ? Math.min(f, s + (f - s) / 5.2 * Math.pow(g, 0.9)) : s <= u ? s : Math.max(u, s - (s - u) / 4.2 * Math.pow(g, 1.05));
  }
  const x = n < 6, b = x ? 6 - n : n - 6, P = n === 6 ? a : m({
    h: w(x, b),
    s: y(x, b),
    v: v(x, b)
  });
  return S(P, o);
}
function C(t, n, o) {
  const a = m(F(t, 10 - n + 1)), e = m(t), r = e.hue(), s = e.saturationv(), c = m({
    h: e.hue(),
    s: f(6),
    v: e.value()
  }).saturationv(), p = Math.ceil((c - 9) / 4), d = Math.ceil((100 - c) / 5);
  function f(w) {
    if (w < 6)
      return c + (6 - w) * d;
    if (w === 6) {
      if (r >= 0 && r < 50)
        return s - 15;
      if (r >= 50 && r < 191)
        return s - 20;
      if (r >= 191 && r <= 360)
        return s - 15;
    }
    return c - p * (w - 6);
  }
  const u = m({
    h: a.hue(),
    s: f(n),
    v: a.value()
  });
  return S(u, o);
}
function D(t, n = {}) {
  const { dark: o, list: a, index: e = 6, format: r = "hex" } = n;
  if (a) {
    const s = [], i = o ? C : F;
    for (let c = 1; c <= 10; c++)
      s.push(i(t, c, r));
    return s;
  }
  return o ? C(t, e, r) : F(t, e, r);
}
async function I(t) {
  try {
    const n = await N(t), o = q(n);
    return z(o);
  } catch (n) {
    throw console.error("提取图片颜色失败:", n), n;
  }
}
async function N(t) {
  return new Promise((n, o) => {
    try {
      const a = document.createElement("canvas"), e = a.getContext("2d"), r = Math.min(t.width, 100), s = Math.min(t.height, 100), i = Math.min(r / t.width, s / t.height);
      a.width = t.width * i, a.height = t.height * i, e.drawImage(t, 0, 0, a.width, a.height);
      const c = e.getImageData(0, 0, a.width, a.height);
      n(c);
    } catch (a) {
      o(a);
    }
  });
}
function q(t) {
  const n = t.data, o = /* @__PURE__ */ new Map();
  for (let e = 0; e < n.length; e += 4) {
    const r = n[e], s = n[e + 1], i = n[e + 2];
    if (n[e + 3] < 128) continue;
    const p = Math.round(r / 16) * 16, d = Math.round(s / 16) * 16, f = Math.round(i / 16) * 16, u = `${p},${d},${f}`;
    o.has(u) ? o.set(u, o.get(u) + 1) : o.set(u, 1);
  }
  const a = [];
  return o.forEach((e, r) => {
    const [s, i, c] = r.split(",").map(Number);
    a.push({ r: s, g: i, b: c, count: e });
  }), a;
}
function z(t) {
  t.sort((e, r) => r.count - e.count);
  const n = t.filter((e) => {
    const { r, g: s, b: i } = e, c = Math.max(r, s, i), p = Math.min(r, s, i), d = c - p, f = c === 0 ? 0 : d / c, u = c / 255;
    return f > 0.15 && u > 0.2 && u < 0.8;
  }), o = n.length > 0 ? n[0] : t[0];
  return m({ r: o.r, g: o.g, b: o.b }).hex();
}
function V(t) {
  return new Promise((n, o) => {
    if (!t.type.startsWith("image/")) {
      o(new Error("请选择图片文件"));
      return;
    }
    const a = new FileReader();
    a.onload = async (e) => {
      try {
        const r = new Image();
        r.onload = async () => {
          try {
            const s = await I(r);
            n(s);
          } catch (s) {
            o(s);
          }
        }, r.onerror = () => o(new Error("图片加载失败")), r.src = e.target.result;
      } catch (r) {
        o(r);
      }
    }, a.onerror = () => o(new Error("文件读取失败")), a.readAsDataURL(t);
  });
}
const M = {
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
function $() {
  const t = {};
  return Object.keys(M).forEach((n) => {
    t[n] = {}, t[n].light = D(M[n], { list: !0 }), t[n].dark = D(M[n], { list: !0, dark: !0 }), t[n].primary = M[n];
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
  M as colorList,
  V as extractColorFromFile,
  I as extractColorFromImage,
  D as generate,
  $ as getPresetColors,
  R as getRgbStr
};
