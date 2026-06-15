import U from "color";
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function H(r) {
  return r < 0 ? -1 : r === 0 ? 0 : 1;
}
function ae(r, e, t) {
  return (1 - t) * r + t * e;
}
function He(r, e, t) {
  return t < r ? r : t > e ? e : t;
}
function Y(r, e, t) {
  return t < r ? r : t > e ? e : t;
}
function he(r) {
  return r = r % 360, r < 0 && (r = r + 360), r;
}
function Ue(r, e) {
  return he(e - r) <= 180 ? 1 : -1;
}
function ze(r, e) {
  return 180 - Math.abs(Math.abs(r - e) - 180);
}
function Pe(r, e) {
  const t = r[0] * e[0][0] + r[1] * e[0][1] + r[2] * e[0][2], n = r[0] * e[1][0] + r[1] * e[1][1] + r[2] * e[1][2], a = r[0] * e[2][0] + r[1] * e[2][1] + r[2] * e[2][2];
  return [t, n, a];
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ke = [
  [0.41233895, 0.35762064, 0.18051042],
  [0.2126, 0.7152, 0.0722],
  [0.01932141, 0.11916382, 0.95034478]
], Ge = [
  [
    3.2413774792388685,
    -1.5376652402851851,
    -0.49885366846268053
  ],
  [
    -0.9691452513005321,
    1.8758853451067872,
    0.04156585616912061
  ],
  [
    0.05562093689691305,
    -0.20395524564742123,
    1.0571799111220335
  ]
], je = [95.047, 100, 108.883];
function be(r, e, t) {
  return (255 << 24 | (r & 255) << 16 | (e & 255) << 8 | t & 255) >>> 0;
}
function we(r) {
  const e = Q(r[0]), t = Q(r[1]), n = Q(r[2]);
  return be(e, t, n);
}
function Ae(r) {
  return r >> 16 & 255;
}
function Ie(r) {
  return r >> 8 & 255;
}
function ve(r) {
  return r & 255;
}
function Xe(r, e, t) {
  const n = Ge, a = n[0][0] * r + n[0][1] * e + n[0][2] * t, i = n[1][0] * r + n[1][1] * e + n[1][2] * t, s = n[2][0] * r + n[2][1] * e + n[2][2] * t, u = Q(a), l = Q(i), f = Q(s);
  return be(u, l, f);
}
function qe(r) {
  const e = ne(Ae(r)), t = ne(Ie(r)), n = ne(ve(r));
  return Pe([e, t, n], Ke);
}
function $e(r) {
  const e = W(r), t = Q(e);
  return be(t, t, t);
}
function ge(r) {
  const e = qe(r)[1];
  return 116 * Le(e / 100) - 16;
}
function W(r) {
  return 100 * Je((r + 16) / 116);
}
function ke(r) {
  return Le(r / 100) * 116 - 16;
}
function ne(r) {
  const e = r / 255;
  return e <= 0.040449936 ? e / 12.92 * 100 : Math.pow((e + 0.055) / 1.055, 2.4) * 100;
}
function Q(r) {
  const e = r / 100;
  let t = 0;
  return e <= 31308e-7 ? t = e * 12.92 : t = 1.055 * Math.pow(e, 1 / 2.4) - 0.055, He(0, 255, Math.round(t * 255));
}
function We() {
  return je;
}
function Le(r) {
  const e = 0.008856451679035631, t = 24389 / 27;
  return r > e ? Math.pow(r, 1 / 3) : (t * r + 16) / 116;
}
function Je(r) {
  const e = 0.008856451679035631, t = 24389 / 27, n = r * r * r;
  return n > e ? n : (116 * r - 16) / t;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class K {
  /**
   * Create ViewingConditions from a simple, physically relevant, set of
   * parameters.
   *
   * @param whitePoint White point, measured in the XYZ color space.
   *     default = D65, or sunny day afternoon
   * @param adaptingLuminance The luminance of the adapting field. Informally,
   *     how bright it is in the room where the color is viewed. Can be
   *     calculated from lux by multiplying lux by 0.0586. default = 11.72,
   *     or 200 lux.
   * @param backgroundLstar The lightness of the area surrounding the color.
   *     measured by L* in L*a*b*. default = 50.0
   * @param surround A general description of the lighting surrounding the
   *     color. 0 is pitch dark, like watching a movie in a theater. 1.0 is a
   *     dimly light room, like watching TV at home at night. 2.0 means there
   *     is no difference between the lighting on the color and around it.
   *     default = 2.0
   * @param discountingIlluminant Whether the eye accounts for the tint of the
   *     ambient lighting, such as knowing an apple is still red in green light.
   *     default = false, the eye does not perform this process on
   *       self-luminous objects like displays.
   */
  static make(e = We(), t = 200 / Math.PI * W(50) / 100, n = 50, a = 2, i = !1) {
    const s = e, u = s[0] * 0.401288 + s[1] * 0.650173 + s[2] * -0.051461, l = s[0] * -0.250268 + s[1] * 1.204414 + s[2] * 0.045854, f = s[0] * -2079e-6 + s[1] * 0.048952 + s[2] * 0.953127, h = 0.8 + a / 10, p = h >= 0.9 ? ae(0.59, 0.69, (h - 0.9) * 10) : ae(0.525, 0.59, (h - 0.8) * 10);
    let d = i ? 1 : h * (1 - 1 / 3.6 * Math.exp((-t - 42) / 92));
    d = d > 1 ? 1 : d < 0 ? 0 : d;
    const C = h, P = [
      d * (100 / u) + 1 - d,
      d * (100 / l) + 1 - d,
      d * (100 / f) + 1 - d
    ], g = 1 / (5 * t + 1), y = g * g * g * g, F = 1 - y, w = y * t + 0.1 * F * F * Math.cbrt(5 * t), O = W(n) / e[1], R = 1.48 + Math.sqrt(O), E = 0.725 / Math.pow(O, 0.2), v = E, B = [
      Math.pow(w * P[0] * u / 100, 0.42),
      Math.pow(w * P[1] * l / 100, 0.42),
      Math.pow(w * P[2] * f / 100, 0.42)
    ], N = [
      400 * B[0] / (B[0] + 27.13),
      400 * B[1] / (B[1] + 27.13),
      400 * B[2] / (B[2] + 27.13)
    ], V = (2 * N[0] + N[1] + 0.05 * N[2]) * E;
    return new K(O, V, E, v, p, C, P, w, Math.pow(w, 0.25), R);
  }
  /**
   * Parameters are intermediate values of the CAM16 conversion process. Their
   * names are shorthand for technical color science terminology, this class
   * would not benefit from documenting them individually. A brief overview
   * is available in the CAM16 specification, and a complete overview requires
   * a color science textbook, such as Fairchild's Color Appearance Models.
   */
  constructor(e, t, n, a, i, s, u, l, f, h) {
    this.n = e, this.aw = t, this.nbb = n, this.ncb = a, this.c = i, this.nc = s, this.rgbD = u, this.fl = l, this.fLRoot = f, this.z = h;
  }
}
K.DEFAULT = K.make();
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _ {
  /**
   * All of the CAM16 dimensions can be calculated from 3 of the dimensions, in
   * the following combinations:
   *      -  {j or q} and {c, m, or s} and hue
   *      - jstar, astar, bstar
   * Prefer using a static method that constructs from 3 of those dimensions.
   * This constructor is intended for those methods to use to return all
   * possible dimensions.
   *
   * @param hue
   * @param chroma informally, colorfulness / color intensity. like saturation
   *     in HSL, except perceptually accurate.
   * @param j lightness
   * @param q brightness; ratio of lightness to white point's lightness
   * @param m colorfulness
   * @param s saturation; ratio of chroma to white point's chroma
   * @param jstar CAM16-UCS J coordinate
   * @param astar CAM16-UCS a coordinate
   * @param bstar CAM16-UCS b coordinate
   */
  constructor(e, t, n, a, i, s, u, l, f) {
    this.hue = e, this.chroma = t, this.j = n, this.q = a, this.m = i, this.s = s, this.jstar = u, this.astar = l, this.bstar = f;
  }
  /**
   * CAM16 instances also have coordinates in the CAM16-UCS space, called J*,
   * a*, b*, or jstar, astar, bstar in code. CAM16-UCS is included in the CAM16
   * specification, and is used to measure distances between colors.
   */
  distance(e) {
    const t = this.jstar - e.jstar, n = this.astar - e.astar, a = this.bstar - e.bstar, i = Math.sqrt(t * t + n * n + a * a);
    return 1.41 * Math.pow(i, 0.63);
  }
  /**
   * @param argb ARGB representation of a color.
   * @return CAM16 color, assuming the color was viewed in default viewing
   *     conditions.
   */
  static fromInt(e) {
    return _.fromIntInViewingConditions(e, K.DEFAULT);
  }
  /**
   * @param argb ARGB representation of a color.
   * @param viewingConditions Information about the environment where the color
   *     was observed.
   * @return CAM16 color.
   */
  static fromIntInViewingConditions(e, t) {
    const n = (e & 16711680) >> 16, a = (e & 65280) >> 8, i = e & 255, s = ne(n), u = ne(a), l = ne(i), f = 0.41233895 * s + 0.35762064 * u + 0.18051042 * l, h = 0.2126 * s + 0.7152 * u + 0.0722 * l, p = 0.01932141 * s + 0.11916382 * u + 0.95034478 * l, d = 0.401288 * f + 0.650173 * h - 0.051461 * p, C = -0.250268 * f + 1.204414 * h + 0.045854 * p, P = -2079e-6 * f + 0.048952 * h + 0.953127 * p, g = t.rgbD[0] * d, y = t.rgbD[1] * C, F = t.rgbD[2] * P, w = Math.pow(t.fl * Math.abs(g) / 100, 0.42), O = Math.pow(t.fl * Math.abs(y) / 100, 0.42), R = Math.pow(t.fl * Math.abs(F) / 100, 0.42), E = H(g) * 400 * w / (w + 27.13), v = H(y) * 400 * O / (O + 27.13), B = H(F) * 400 * R / (R + 27.13), N = (11 * E + -12 * v + B) / 11, V = (E + v - 2 * B) / 9, L = (20 * E + 20 * v + 21 * B) / 20, G = (40 * E + 20 * v + B) / 20, ee = Math.atan2(V, N) * 180 / Math.PI, z = he(ee), ie = z * Math.PI / 180, se = G * t.nbb, q = 100 * Math.pow(se / t.aw, t.c * t.z), ce = 4 / t.c * Math.sqrt(q / 100) * (t.aw + 4) * t.fLRoot, de = z < 20.14 ? z + 360 : z, me = 0.25 * (Math.cos(de * Math.PI / 180 + 2) + 3.8), ye = 5e4 / 13 * me * t.nc * t.ncb * Math.sqrt(N * N + V * V) / (L + 0.305), ue = Math.pow(ye, 0.9) * Math.pow(1.64 - Math.pow(0.29, t.n), 0.73), xe = ue * Math.sqrt(q / 100), Te = xe * t.fLRoot, Ne = 50 * Math.sqrt(ue * t.c / (t.aw + 4)), _e = (1 + 100 * 7e-3) * q / (1 + 7e-3 * q), De = 1 / 0.0228 * Math.log(1 + 0.0228 * Te), Ve = De * Math.cos(ie), Ye = De * Math.sin(ie);
    return new _(z, xe, q, ce, Te, Ne, _e, Ve, Ye);
  }
  /**
   * @param j CAM16 lightness
   * @param c CAM16 chroma
   * @param h CAM16 hue
   */
  static fromJch(e, t, n) {
    return _.fromJchInViewingConditions(e, t, n, K.DEFAULT);
  }
  /**
   * @param j CAM16 lightness
   * @param c CAM16 chroma
   * @param h CAM16 hue
   * @param viewingConditions Information about the environment where the color
   *     was observed.
   */
  static fromJchInViewingConditions(e, t, n, a) {
    const i = 4 / a.c * Math.sqrt(e / 100) * (a.aw + 4) * a.fLRoot, s = t * a.fLRoot, u = t / Math.sqrt(e / 100), l = 50 * Math.sqrt(u * a.c / (a.aw + 4)), f = n * Math.PI / 180, h = (1 + 100 * 7e-3) * e / (1 + 7e-3 * e), p = 1 / 0.0228 * Math.log(1 + 0.0228 * s), d = p * Math.cos(f), C = p * Math.sin(f);
    return new _(n, t, e, i, s, l, h, d, C);
  }
  /**
   * @param jstar CAM16-UCS lightness.
   * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
   *     coordinate on the Y axis.
   * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
   *     coordinate on the X axis.
   */
  static fromUcs(e, t, n) {
    return _.fromUcsInViewingConditions(e, t, n, K.DEFAULT);
  }
  /**
   * @param jstar CAM16-UCS lightness.
   * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
   *     coordinate on the Y axis.
   * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
   *     coordinate on the X axis.
   * @param viewingConditions Information about the environment where the color
   *     was observed.
   */
  static fromUcsInViewingConditions(e, t, n, a) {
    const i = t, s = n, u = Math.sqrt(i * i + s * s), f = (Math.exp(u * 0.0228) - 1) / 0.0228 / a.fLRoot;
    let h = Math.atan2(s, i) * (180 / Math.PI);
    h < 0 && (h += 360);
    const p = e / (1 - (e - 100) * 7e-3);
    return _.fromJchInViewingConditions(p, f, h, a);
  }
  /**
   *  @return ARGB representation of color, assuming the color was viewed in
   *     default viewing conditions, which are near-identical to the default
   *     viewing conditions for sRGB.
   */
  toInt() {
    return this.viewed(K.DEFAULT);
  }
  /**
   * @param viewingConditions Information about the environment where the color
   *     will be viewed.
   * @return ARGB representation of color
   */
  viewed(e) {
    const t = this.chroma === 0 || this.j === 0 ? 0 : this.chroma / Math.sqrt(this.j / 100), n = Math.pow(t / Math.pow(1.64 - Math.pow(0.29, e.n), 0.73), 1 / 0.9), a = this.hue * Math.PI / 180, i = 0.25 * (Math.cos(a + 2) + 3.8), s = e.aw * Math.pow(this.j / 100, 1 / e.c / e.z), u = i * (5e4 / 13) * e.nc * e.ncb, l = s / e.nbb, f = Math.sin(a), h = Math.cos(a), p = 23 * (l + 0.305) * n / (23 * u + 11 * n * h + 108 * n * f), d = p * h, C = p * f, P = (460 * l + 451 * d + 288 * C) / 1403, g = (460 * l - 891 * d - 261 * C) / 1403, y = (460 * l - 220 * d - 6300 * C) / 1403, F = Math.max(0, 27.13 * Math.abs(P) / (400 - Math.abs(P))), w = H(P) * (100 / e.fl) * Math.pow(F, 1 / 0.42), O = Math.max(0, 27.13 * Math.abs(g) / (400 - Math.abs(g))), R = H(g) * (100 / e.fl) * Math.pow(O, 1 / 0.42), E = Math.max(0, 27.13 * Math.abs(y) / (400 - Math.abs(y))), v = H(y) * (100 / e.fl) * Math.pow(E, 1 / 0.42), B = w / e.rgbD[0], N = R / e.rgbD[1], V = v / e.rgbD[2], L = 1.86206786 * B - 1.01125463 * N + 0.14918677 * V, G = 0.38752654 * B + 0.62144744 * N - 897398e-8 * V, X = -0.0158415 * B - 0.03412294 * N + 1.04996444 * V;
    return Xe(L, G, X);
  }
  /// Given color expressed in XYZ and viewed in [viewingConditions], convert to
  /// CAM16.
  static fromXyzInViewingConditions(e, t, n, a) {
    const i = 0.401288 * e + 0.650173 * t - 0.051461 * n, s = -0.250268 * e + 1.204414 * t + 0.045854 * n, u = -2079e-6 * e + 0.048952 * t + 0.953127 * n, l = a.rgbD[0] * i, f = a.rgbD[1] * s, h = a.rgbD[2] * u, p = Math.pow(a.fl * Math.abs(l) / 100, 0.42), d = Math.pow(a.fl * Math.abs(f) / 100, 0.42), C = Math.pow(a.fl * Math.abs(h) / 100, 0.42), P = H(l) * 400 * p / (p + 27.13), g = H(f) * 400 * d / (d + 27.13), y = H(h) * 400 * C / (C + 27.13), F = (11 * P + -12 * g + y) / 11, w = (P + g - 2 * y) / 9, O = (20 * P + 20 * g + 21 * y) / 20, R = (40 * P + 20 * g + y) / 20, v = Math.atan2(w, F) * 180 / Math.PI, B = v < 0 ? v + 360 : v >= 360 ? v - 360 : v, N = B * Math.PI / 180, V = R * a.nbb, L = 100 * Math.pow(V / a.aw, a.c * a.z), G = 4 / a.c * Math.sqrt(L / 100) * (a.aw + 4) * a.fLRoot, X = B < 20.14 ? B + 360 : B, ee = 1 / 4 * (Math.cos(X * Math.PI / 180 + 2) + 3.8), ie = 5e4 / 13 * ee * a.nc * a.ncb * Math.sqrt(F * F + w * w) / (O + 0.305), se = Math.pow(ie, 0.9) * Math.pow(1.64 - Math.pow(0.29, a.n), 0.73), q = se * Math.sqrt(L / 100), ce = q * a.fLRoot, de = 50 * Math.sqrt(se * a.c / (a.aw + 4)), me = (1 + 100 * 7e-3) * L / (1 + 7e-3 * L), pe = Math.log(1 + 0.0228 * ce) / 0.0228, ye = pe * Math.cos(N), ue = pe * Math.sin(N);
    return new _(B, q, L, G, ce, de, me, ye, ue);
  }
  /// XYZ representation of CAM16 seen in [viewingConditions].
  xyzInViewingConditions(e) {
    const t = this.chroma === 0 || this.j === 0 ? 0 : this.chroma / Math.sqrt(this.j / 100), n = Math.pow(t / Math.pow(1.64 - Math.pow(0.29, e.n), 0.73), 1 / 0.9), a = this.hue * Math.PI / 180, i = 0.25 * (Math.cos(a + 2) + 3.8), s = e.aw * Math.pow(this.j / 100, 1 / e.c / e.z), u = i * (5e4 / 13) * e.nc * e.ncb, l = s / e.nbb, f = Math.sin(a), h = Math.cos(a), p = 23 * (l + 0.305) * n / (23 * u + 11 * n * h + 108 * n * f), d = p * h, C = p * f, P = (460 * l + 451 * d + 288 * C) / 1403, g = (460 * l - 891 * d - 261 * C) / 1403, y = (460 * l - 220 * d - 6300 * C) / 1403, F = Math.max(0, 27.13 * Math.abs(P) / (400 - Math.abs(P))), w = H(P) * (100 / e.fl) * Math.pow(F, 1 / 0.42), O = Math.max(0, 27.13 * Math.abs(g) / (400 - Math.abs(g))), R = H(g) * (100 / e.fl) * Math.pow(O, 1 / 0.42), E = Math.max(0, 27.13 * Math.abs(y) / (400 - Math.abs(y))), v = H(y) * (100 / e.fl) * Math.pow(E, 1 / 0.42), B = w / e.rgbD[0], N = R / e.rgbD[1], V = v / e.rgbD[2], L = 1.86206786 * B - 1.01125463 * N + 0.14918677 * V, G = 0.38752654 * B + 0.62144744 * N - 897398e-8 * V, X = -0.0158415 * B - 0.03412294 * N + 1.04996444 * V;
    return [L, G, X];
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class S {
  /**
   * Sanitizes a small enough angle in radians.
   *
   * @param angle An angle in radians; must not deviate too much
   * from 0.
   * @return A coterminal angle between 0 and 2pi.
   */
  static sanitizeRadians(e) {
    return (e + Math.PI * 8) % (Math.PI * 2);
  }
  /**
   * Delinearizes an RGB component, returning a floating-point
   * number.
   *
   * @param rgbComponent 0.0 <= rgb_component <= 100.0, represents
   * linear R/G/B channel
   * @return 0.0 <= output <= 255.0, color channel converted to
   * regular RGB space
   */
  static trueDelinearized(e) {
    const t = e / 100;
    let n = 0;
    return t <= 31308e-7 ? n = t * 12.92 : n = 1.055 * Math.pow(t, 1 / 2.4) - 0.055, n * 255;
  }
  static chromaticAdaptation(e) {
    const t = Math.pow(Math.abs(e), 0.42);
    return H(e) * 400 * t / (t + 27.13);
  }
  /**
   * Returns the hue of a linear RGB color in CAM16.
   *
   * @param linrgb The linear RGB coordinates of a color.
   * @return The hue of the color in CAM16, in radians.
   */
  static hueOf(e) {
    const t = Pe(e, S.SCALED_DISCOUNT_FROM_LINRGB), n = S.chromaticAdaptation(t[0]), a = S.chromaticAdaptation(t[1]), i = S.chromaticAdaptation(t[2]), s = (11 * n + -12 * a + i) / 11, u = (n + a - 2 * i) / 9;
    return Math.atan2(u, s);
  }
  static areInCyclicOrder(e, t, n) {
    const a = S.sanitizeRadians(t - e), i = S.sanitizeRadians(n - e);
    return a < i;
  }
  /**
   * Solves the lerp equation.
   *
   * @param source The starting number.
   * @param mid The number in the middle.
   * @param target The ending number.
   * @return A number t such that lerp(source, target, t) = mid.
   */
  static intercept(e, t, n) {
    return (t - e) / (n - e);
  }
  static lerpPoint(e, t, n) {
    return [
      e[0] + (n[0] - e[0]) * t,
      e[1] + (n[1] - e[1]) * t,
      e[2] + (n[2] - e[2]) * t
    ];
  }
  /**
   * Intersects a segment with a plane.
   *
   * @param source The coordinates of point A.
   * @param coordinate The R-, G-, or B-coordinate of the plane.
   * @param target The coordinates of point B.
   * @param axis The axis the plane is perpendicular with. (0: R, 1:
   * G, 2: B)
   * @return The intersection point of the segment AB with the plane
   * R=coordinate, G=coordinate, or B=coordinate
   */
  static setCoordinate(e, t, n, a) {
    const i = S.intercept(e[a], t, n[a]);
    return S.lerpPoint(e, i, n);
  }
  static isBounded(e) {
    return 0 <= e && e <= 100;
  }
  /**
   * Returns the nth possible vertex of the polygonal intersection.
   *
   * @param y The Y value of the plane.
   * @param n The zero-based index of the point. 0 <= n <= 11.
   * @return The nth possible vertex of the polygonal intersection
   * of the y plane and the RGB cube, in linear RGB coordinates, if
   * it exists. If this possible vertex lies outside of the cube,
   * [-1.0, -1.0, -1.0] is returned.
   */
  static nthVertex(e, t) {
    const n = S.Y_FROM_LINRGB[0], a = S.Y_FROM_LINRGB[1], i = S.Y_FROM_LINRGB[2], s = t % 4 <= 1 ? 0 : 100, u = t % 2 === 0 ? 0 : 100;
    if (t < 4) {
      const l = s, f = u, h = (e - l * a - f * i) / n;
      return S.isBounded(h) ? [h, l, f] : [-1, -1, -1];
    } else if (t < 8) {
      const l = s, f = u, h = (e - f * n - l * i) / a;
      return S.isBounded(h) ? [f, h, l] : [-1, -1, -1];
    } else {
      const l = s, f = u, h = (e - l * n - f * a) / i;
      return S.isBounded(h) ? [l, f, h] : [-1, -1, -1];
    }
  }
  /**
   * Finds the segment containing the desired color.
   *
   * @param y The Y value of the color.
   * @param targetHue The hue of the color.
   * @return A list of two sets of linear RGB coordinates, each
   * corresponding to an endpoint of the segment containing the
   * desired color.
   */
  static bisectToSegment(e, t) {
    let n = [-1, -1, -1], a = n, i = 0, s = 0, u = !1, l = !0;
    for (let f = 0; f < 12; f++) {
      const h = S.nthVertex(e, f);
      if (h[0] < 0)
        continue;
      const p = S.hueOf(h);
      if (!u) {
        n = h, a = h, i = p, s = p, u = !0;
        continue;
      }
      (l || S.areInCyclicOrder(i, p, s)) && (l = !1, S.areInCyclicOrder(i, t, p) ? (a = h, s = p) : (n = h, i = p));
    }
    return [n, a];
  }
  static midpoint(e, t) {
    return [
      (e[0] + t[0]) / 2,
      (e[1] + t[1]) / 2,
      (e[2] + t[2]) / 2
    ];
  }
  static criticalPlaneBelow(e) {
    return Math.floor(e - 0.5);
  }
  static criticalPlaneAbove(e) {
    return Math.ceil(e - 0.5);
  }
  /**
   * Finds a color with the given Y and hue on the boundary of the
   * cube.
   *
   * @param y The Y value of the color.
   * @param targetHue The hue of the color.
   * @return The desired color, in linear RGB coordinates.
   */
  static bisectToLimit(e, t) {
    const n = S.bisectToSegment(e, t);
    let a = n[0], i = S.hueOf(a), s = n[1];
    for (let u = 0; u < 3; u++)
      if (a[u] !== s[u]) {
        let l = -1, f = 255;
        a[u] < s[u] ? (l = S.criticalPlaneBelow(S.trueDelinearized(a[u])), f = S.criticalPlaneAbove(S.trueDelinearized(s[u]))) : (l = S.criticalPlaneAbove(S.trueDelinearized(a[u])), f = S.criticalPlaneBelow(S.trueDelinearized(s[u])));
        for (let h = 0; h < 8 && !(Math.abs(f - l) <= 1); h++) {
          const p = Math.floor((l + f) / 2), d = S.CRITICAL_PLANES[p], C = S.setCoordinate(a, d, s, u), P = S.hueOf(C);
          S.areInCyclicOrder(i, t, P) ? (s = C, f = p) : (a = C, i = P, l = p);
        }
      }
    return S.midpoint(a, s);
  }
  static inverseChromaticAdaptation(e) {
    const t = Math.abs(e), n = Math.max(0, 27.13 * t / (400 - t));
    return H(e) * Math.pow(n, 1 / 0.42);
  }
  /**
   * Finds a color with the given hue, chroma, and Y.
   *
   * @param hueRadians The desired hue in radians.
   * @param chroma The desired chroma.
   * @param y The desired Y.
   * @return The desired color as a hexadecimal integer, if found; 0
   * otherwise.
   */
  static findResultByJ(e, t, n) {
    let a = Math.sqrt(n) * 11;
    const i = K.DEFAULT, s = 1 / Math.pow(1.64 - Math.pow(0.29, i.n), 0.73), l = 0.25 * (Math.cos(e + 2) + 3.8) * (5e4 / 13) * i.nc * i.ncb, f = Math.sin(e), h = Math.cos(e);
    for (let p = 0; p < 5; p++) {
      const d = a / 100, C = t === 0 || a === 0 ? 0 : t / Math.sqrt(d), P = Math.pow(C * s, 1 / 0.9), y = i.aw * Math.pow(d, 1 / i.c / i.z) / i.nbb, F = 23 * (y + 0.305) * P / (23 * l + 11 * P * h + 108 * P * f), w = F * h, O = F * f, R = (460 * y + 451 * w + 288 * O) / 1403, E = (460 * y - 891 * w - 261 * O) / 1403, v = (460 * y - 220 * w - 6300 * O) / 1403, B = S.inverseChromaticAdaptation(R), N = S.inverseChromaticAdaptation(E), V = S.inverseChromaticAdaptation(v), L = Pe([B, N, V], S.LINRGB_FROM_SCALED_DISCOUNT);
      if (L[0] < 0 || L[1] < 0 || L[2] < 0)
        return 0;
      const G = S.Y_FROM_LINRGB[0], X = S.Y_FROM_LINRGB[1], ee = S.Y_FROM_LINRGB[2], z = G * L[0] + X * L[1] + ee * L[2];
      if (z <= 0)
        return 0;
      if (p === 4 || Math.abs(z - n) < 2e-3)
        return L[0] > 100.01 || L[1] > 100.01 || L[2] > 100.01 ? 0 : we(L);
      a = a - (z - n) * a / (2 * z);
    }
    return 0;
  }
  /**
   * Finds an sRGB color with the given hue, chroma, and L*, if
   * possible.
   *
   * @param hueDegrees The desired hue, in degrees.
   * @param chroma The desired chroma.
   * @param lstar The desired L*.
   * @return A hexadecimal representing the sRGB color. The color
   * has sufficiently close hue, chroma, and L* to the desired
   * values, if possible; otherwise, the hue and L* will be
   * sufficiently close, and chroma will be maximized.
   */
  static solveToInt(e, t, n) {
    if (t < 1e-4 || n < 1e-4 || n > 99.9999)
      return $e(n);
    e = he(e);
    const a = e / 180 * Math.PI, i = W(n), s = S.findResultByJ(a, t, i);
    if (s !== 0)
      return s;
    const u = S.bisectToLimit(i, a);
    return we(u);
  }
  /**
   * Finds an sRGB color with the given hue, chroma, and L*, if
   * possible.
   *
   * @param hueDegrees The desired hue, in degrees.
   * @param chroma The desired chroma.
   * @param lstar The desired L*.
   * @return An CAM16 object representing the sRGB color. The color
   * has sufficiently close hue, chroma, and L* to the desired
   * values, if possible; otherwise, the hue and L* will be
   * sufficiently close, and chroma will be maximized.
   */
  static solveToCam(e, t, n) {
    return _.fromInt(S.solveToInt(e, t, n));
  }
}
S.SCALED_DISCOUNT_FROM_LINRGB = [
  [
    0.001200833568784504,
    0.002389694492170889,
    2795742885861124e-19
  ],
  [
    5891086651375999e-19,
    0.0029785502573438758,
    3270666104008398e-19
  ],
  [
    10146692491640572e-20,
    5364214359186694e-19,
    0.0032979401770712076
  ]
];
S.LINRGB_FROM_SCALED_DISCOUNT = [
  [
    1373.2198709594231,
    -1100.4251190754821,
    -7.278681089101213
  ],
  [
    -271.815969077903,
    559.6580465940733,
    -32.46047482791194
  ],
  [
    1.9622899599665666,
    -57.173814538844006,
    308.7233197812385
  ]
];
S.Y_FROM_LINRGB = [0.2126, 0.7152, 0.0722];
S.CRITICAL_PLANES = [
  0.015176349177441876,
  0.045529047532325624,
  0.07588174588720938,
  0.10623444424209313,
  0.13658714259697685,
  0.16693984095186062,
  0.19729253930674434,
  0.2276452376616281,
  0.2579979360165119,
  0.28835063437139563,
  0.3188300904430532,
  0.350925934958123,
  0.3848314933096426,
  0.42057480301049466,
  0.458183274052838,
  0.4976837250274023,
  0.5391024159806381,
  0.5824650784040898,
  0.6277969426914107,
  0.6751227633498623,
  0.7244668422128921,
  0.775853049866786,
  0.829304845476233,
  0.8848452951698498,
  0.942497089126609,
  1.0022825574869039,
  1.0642236851973577,
  1.1283421258858297,
  1.1946592148522128,
  1.2631959812511864,
  1.3339731595349034,
  1.407011200216447,
  1.4823302800086415,
  1.5599503113873272,
  1.6398909516233677,
  1.7221716113234105,
  1.8068114625156377,
  1.8938294463134073,
  1.9832442801866852,
  2.075074464868551,
  2.1693382909216234,
  2.2660538449872063,
  2.36523901573795,
  2.4669114995532007,
  2.5710888059345764,
  2.6777882626779785,
  2.7870270208169257,
  2.898822059350997,
  3.0131901897720907,
  3.1301480604002863,
  3.2497121605402226,
  3.3718988244681087,
  3.4967242352587946,
  3.624204428461639,
  3.754355295633311,
  3.887192587735158,
  4.022731918402185,
  4.160988767090289,
  4.301978482107941,
  4.445716283538092,
  4.592217266055746,
  4.741496401646282,
  4.893568542229298,
  5.048448422192488,
  5.20615066083972,
  5.3666897647573375,
  5.5300801301023865,
  5.696336044816294,
  5.865471690767354,
  6.037501145825082,
  6.212438385869475,
  6.390297286737924,
  6.571091626112461,
  6.7548350853498045,
  6.941541251256611,
  7.131223617812143,
  7.323895587840543,
  7.5195704746346665,
  7.7182615035334345,
  7.919981813454504,
  8.124744458384042,
  8.332562408825165,
  8.543448553206703,
  8.757415699253682,
  8.974476575321063,
  9.194643831691977,
  9.417930041841839,
  9.644347703669503,
  9.873909240696694,
  10.106627003236781,
  10.342513269534024,
  10.58158024687427,
  10.8238400726681,
  11.069304815507364,
  11.317986476196008,
  11.569896988756009,
  11.825048221409341,
  12.083451977536606,
  12.345119996613247,
  12.610063955123938,
  12.878295467455942,
  13.149826086772048,
  13.42466730586372,
  13.702830557985108,
  13.984327217668513,
  14.269168601521828,
  14.55736596900856,
  14.848930523210871,
  15.143873411576273,
  15.44220572664832,
  15.743938506781891,
  16.04908273684337,
  16.35764934889634,
  16.66964922287304,
  16.985093187232053,
  17.30399201960269,
  17.62635644741625,
  17.95219714852476,
  18.281524751807332,
  18.614349837764564,
  18.95068293910138,
  19.290534541298456,
  19.633915083172692,
  19.98083495742689,
  20.331304511189067,
  20.685334046541502,
  21.042933821039977,
  21.404114048223256,
  21.76888489811322,
  22.137256497705877,
  22.50923893145328,
  22.884842241736916,
  23.264076429332462,
  23.6469514538663,
  24.033477234264016,
  24.42366364919083,
  24.817520537484558,
  25.21505769858089,
  25.61628489293138,
  26.021211842414342,
  26.429848230738664,
  26.842203703840827,
  27.258287870275353,
  27.678110301598522,
  28.10168053274597,
  28.529008062403893,
  28.96010235337422,
  29.39497283293396,
  29.83362889318845,
  30.276079891419332,
  30.722335150426627,
  31.172403958865512,
  31.62629557157785,
  32.08401920991837,
  32.54558406207592,
  33.010999283389665,
  33.4802739966603,
  33.953417292456834,
  34.430438229418264,
  34.911345834551085,
  35.39614910352207,
  35.88485700094671,
  36.37747846067349,
  36.87402238606382,
  37.37449765026789,
  37.87891309649659,
  38.38727753828926,
  38.89959975977785,
  39.41588851594697,
  39.93615253289054,
  40.460400508064545,
  40.98864111053629,
  41.520882981230194,
  42.05713473317016,
  42.597404951718396,
  43.141702194811224,
  43.6900349931913,
  44.24241185063697,
  44.798841244188324,
  45.35933162437017,
  45.92389141541209,
  46.49252901546552,
  47.065252796817916,
  47.64207110610409,
  48.22299226451468,
  48.808024568002054,
  49.3971762874833,
  49.9904556690408,
  50.587870934119984,
  51.189430279724725,
  51.79514187861014,
  52.40501387947288,
  53.0190544071392,
  53.637271562750364,
  54.259673423945976,
  54.88626804504493,
  55.517063457223934,
  56.15206766869424,
  56.79128866487574,
  57.43473440856916,
  58.08241284012621,
  58.734331877617365,
  59.39049941699807,
  60.05092333227251,
  60.715611475655585,
  61.38457167773311,
  62.057811747619894,
  62.7353394731159,
  63.417162620860914,
  64.10328893648692,
  64.79372614476921,
  65.48848194977529,
  66.18756403501224,
  66.89098006357258,
  67.59873767827808,
  68.31084450182222,
  69.02730813691093,
  69.74813616640164,
  70.47333615344107,
  71.20291564160104,
  71.93688215501312,
  72.67524319850172,
  73.41800625771542,
  74.16517879925733,
  74.9167682708136,
  75.67278210128072,
  76.43322770089146,
  77.1981124613393,
  77.96744375590167,
  78.74122893956174,
  79.51947534912904,
  80.30219030335869,
  81.08938110306934,
  81.88105503125999,
  82.67721935322541,
  83.4778813166706,
  84.28304815182372,
  85.09272707154808,
  85.90692527145302,
  86.72564993000343,
  87.54890820862819,
  88.3767072518277,
  89.2090541872801,
  90.04595612594655,
  90.88742016217518,
  91.73345337380438,
  92.58406282226491,
  93.43925555268066,
  94.29903859396902,
  95.16341895893969,
  96.03240364439274,
  96.9059996312159,
  97.78421388448044,
  98.6670533535366,
  99.55452497210776
];
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class T {
  static from(e, t, n) {
    return new T(S.solveToInt(e, t, n));
  }
  /**
   * @param argb ARGB representation of a color.
   * @return HCT representation of a color in default viewing conditions
   */
  static fromInt(e) {
    return new T(e);
  }
  toInt() {
    return this.argb;
  }
  /**
   * A number, in degrees, representing ex. red, orange, yellow, etc.
   * Ranges from 0 <= hue < 360.
   */
  get hue() {
    return this.internalHue;
  }
  /**
   * @param newHue 0 <= newHue < 360; invalid values are corrected.
   * Chroma may decrease because chroma has a different maximum for any given
   * hue and tone.
   */
  set hue(e) {
    this.setInternalState(S.solveToInt(e, this.internalChroma, this.internalTone));
  }
  get chroma() {
    return this.internalChroma;
  }
  /**
   * @param newChroma 0 <= newChroma < ?
   * Chroma may decrease because chroma has a different maximum for any given
   * hue and tone.
   */
  set chroma(e) {
    this.setInternalState(S.solveToInt(this.internalHue, e, this.internalTone));
  }
  /** Lightness. Ranges from 0 to 100. */
  get tone() {
    return this.internalTone;
  }
  /**
   * @param newTone 0 <= newTone <= 100; invalid valids are corrected.
   * Chroma may decrease because chroma has a different maximum for any given
   * hue and tone.
   */
  set tone(e) {
    this.setInternalState(S.solveToInt(this.internalHue, this.internalChroma, e));
  }
  /** Sets a property of the Hct object. */
  setValue(e, t) {
    this[e] = t;
  }
  toString() {
    return `HCT(${this.hue.toFixed(0)}, ${this.chroma.toFixed(0)}, ${this.tone.toFixed(0)})`;
  }
  static isBlue(e) {
    return e >= 250 && e < 270;
  }
  static isYellow(e) {
    return e >= 105 && e < 125;
  }
  static isCyan(e) {
    return e >= 170 && e < 207;
  }
  constructor(e) {
    this.argb = e;
    const t = _.fromInt(e);
    this.internalHue = t.hue, this.internalChroma = t.chroma, this.internalTone = ge(e), this.argb = e;
  }
  setInternalState(e) {
    const t = _.fromInt(e);
    this.internalHue = t.hue, this.internalChroma = t.chroma, this.internalTone = ge(e), this.argb = e;
  }
  /**
   * Translates a color into different [ViewingConditions].
   *
   * Colors change appearance. They look different with lights on versus off,
   * the same color, as in hex code, on white looks different when on black.
   * This is called color relativity, most famously explicated by Josef Albers
   * in Interaction of Color.
   *
   * In color science, color appearance models can account for this and
   * calculate the appearance of a color in different settings. HCT is based on
   * CAM16, a color appearance model, and uses it to make these calculations.
   *
   * See [ViewingConditions.make] for parameters affecting color appearance.
   */
  inViewingConditions(e) {
    const n = _.fromInt(this.toInt()).xyzInViewingConditions(e), a = _.fromXyzInViewingConditions(n[0], n[1], n[2], K.make());
    return T.from(a.hue, a.chroma, ke(n[1]));
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class oe {
  /**
   * Blend the design color's HCT hue towards the key color's HCT
   * hue, in a way that leaves the original color recognizable and
   * recognizably shifted towards the key color.
   *
   * @param designColor ARGB representation of an arbitrary color.
   * @param sourceColor ARGB representation of the main theme color.
   * @return The design color with a hue shifted towards the
   * system's color, a slightly warmer/cooler variant of the design
   * color's hue.
   */
  static harmonize(e, t) {
    const n = T.fromInt(e), a = T.fromInt(t), i = ze(n.hue, a.hue), s = Math.min(i * 0.5, 15), u = he(n.hue + s * Ue(n.hue, a.hue));
    return T.from(u, n.chroma, n.tone).toInt();
  }
  /**
   * Blends hue from one color into another. The chroma and tone of
   * the original color are maintained.
   *
   * @param from ARGB representation of color
   * @param to ARGB representation of color
   * @param amount how much blending to perform; 0.0 >= and <= 1.0
   * @return from, with a hue blended towards to. Chroma and tone
   * are constant.
   */
  static hctHue(e, t, n) {
    const a = oe.cam16Ucs(e, t, n), i = _.fromInt(a), s = _.fromInt(e);
    return T.from(i.hue, s.chroma, ge(e)).toInt();
  }
  /**
   * Blend in CAM16-UCS space.
   *
   * @param from ARGB representation of color
   * @param to ARGB representation of color
   * @param amount how much blending to perform; 0.0 >= and <= 1.0
   * @return from, blended towards to. Hue, chroma, and tone will
   * change.
   */
  static cam16Ucs(e, t, n) {
    const a = _.fromInt(e), i = _.fromInt(t), s = a.jstar, u = a.astar, l = a.bstar, f = i.jstar, h = i.astar, p = i.bstar, d = s + (f - s) * n, C = u + (h - u) * n, P = l + (p - l) * n;
    return _.fromUcs(d, C, P).toInt();
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class A {
  /**
   * Returns a contrast ratio, which ranges from 1 to 21.
   *
   * @param toneA Tone between 0 and 100. Values outside will be clamped.
   * @param toneB Tone between 0 and 100. Values outside will be clamped.
   */
  static ratioOfTones(e, t) {
    return e = Y(0, 100, e), t = Y(0, 100, t), A.ratioOfYs(W(e), W(t));
  }
  static ratioOfYs(e, t) {
    const n = e > t ? e : t, a = n === t ? e : t;
    return (n + 5) / (a + 5);
  }
  /**
   * Returns a tone >= tone parameter that ensures ratio parameter.
   * Return value is between 0 and 100.
   * Returns -1 if ratio cannot be achieved with tone parameter.
   *
   * @param tone Tone return value must contrast with.
   * Range is 0 to 100. Invalid values will result in -1 being returned.
   * @param ratio Contrast ratio of return value and tone.
   * Range is 1 to 21, invalid values have undefined behavior.
   */
  static lighter(e, t) {
    if (e < 0 || e > 100)
      return -1;
    const n = W(e), a = t * (n + 5) - 5, i = A.ratioOfYs(a, n), s = Math.abs(i - t);
    if (i < t && s > 0.04)
      return -1;
    const u = ke(a) + 0.4;
    return u < 0 || u > 100 ? -1 : u;
  }
  /**
   * Returns a tone <= tone parameter that ensures ratio parameter.
   * Return value is between 0 and 100.
   * Returns -1 if ratio cannot be achieved with tone parameter.
   *
   * @param tone Tone return value must contrast with.
   * Range is 0 to 100. Invalid values will result in -1 being returned.
   * @param ratio Contrast ratio of return value and tone.
   * Range is 1 to 21, invalid values have undefined behavior.
   */
  static darker(e, t) {
    if (e < 0 || e > 100)
      return -1;
    const n = W(e), a = (n + 5) / t - 5, i = A.ratioOfYs(n, a), s = Math.abs(i - t);
    if (i < t && s > 0.04)
      return -1;
    const u = ke(a) - 0.4;
    return u < 0 || u > 100 ? -1 : u;
  }
  /**
   * Returns a tone >= tone parameter that ensures ratio parameter.
   * Return value is between 0 and 100.
   * Returns 100 if ratio cannot be achieved with tone parameter.
   *
   * This method is unsafe because the returned value is guaranteed to be in
   * bounds for tone, i.e. between 0 and 100. However, that value may not reach
   * the ratio with tone. For example, there is no color lighter than T100.
   *
   * @param tone Tone return value must contrast with.
   * Range is 0 to 100. Invalid values will result in 100 being returned.
   * @param ratio Desired contrast ratio of return value and tone parameter.
   * Range is 1 to 21, invalid values have undefined behavior.
   */
  static lighterUnsafe(e, t) {
    const n = A.lighter(e, t);
    return n < 0 ? 100 : n;
  }
  /**
   * Returns a tone >= tone parameter that ensures ratio parameter.
   * Return value is between 0 and 100.
   * Returns 100 if ratio cannot be achieved with tone parameter.
   *
   * This method is unsafe because the returned value is guaranteed to be in
   * bounds for tone, i.e. between 0 and 100. However, that value may not reach
   * the [ratio with [tone]. For example, there is no color darker than T0.
   *
   * @param tone Tone return value must contrast with.
   * Range is 0 to 100. Invalid values will result in 0 being returned.
   * @param ratio Desired contrast ratio of return value and tone parameter.
   * Range is 1 to 21, invalid values have undefined behavior.
   */
  static darkerUnsafe(e, t) {
    const n = A.darker(e, t);
    return n < 0 ? 0 : n;
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Se {
  /**
   * Returns true if a color is disliked.
   *
   * @param hct A color to be judged.
   * @return Whether the color is disliked.
   *
   * Disliked is defined as a dark yellow-green that is not neutral.
   */
  static isDisliked(e) {
    const t = Math.round(e.hue) >= 90 && Math.round(e.hue) <= 111, n = Math.round(e.chroma) > 16, a = Math.round(e.tone) < 65;
    return t && n && a;
  }
  /**
   * If a color is disliked, lighten it to make it likable.
   *
   * @param hct A color to be judged.
   * @return A new color if the original color is disliked, or the original
   *   color if it is acceptable.
   */
  static fixIfDisliked(e) {
    return Se.isDisliked(e) ? T.from(e.hue, e.chroma, 70) : e;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ze(r, e, t) {
  if (r.name !== t.name)
    throw new Error(`Attempting to extend color ${r.name} with color ${t.name} of different name for spec version ${e}.`);
  if (r.isBackground !== t.isBackground)
    throw new Error(`Attempting to extend color ${r.name} as a ${r.isBackground ? "background" : "foreground"} with color ${t.name} as a ${t.isBackground ? "background" : "foreground"} for spec version ${e}.`);
}
function x(r, e, t) {
  return Ze(r, e, t), c.fromPalette({
    name: r.name,
    palette: (n) => n.specVersion === e ? t.palette(n) : r.palette(n),
    tone: (n) => n.specVersion === e ? t.tone(n) : r.tone(n),
    isBackground: r.isBackground,
    chromaMultiplier: (n) => {
      const a = n.specVersion === e ? t.chromaMultiplier : r.chromaMultiplier;
      return a !== void 0 ? a(n) : 1;
    },
    background: (n) => {
      const a = n.specVersion === e ? t.background : r.background;
      return a !== void 0 ? a(n) : void 0;
    },
    secondBackground: (n) => {
      const a = n.specVersion === e ? t.secondBackground : r.secondBackground;
      return a !== void 0 ? a(n) : void 0;
    },
    contrastCurve: (n) => {
      const a = n.specVersion === e ? t.contrastCurve : r.contrastCurve;
      return a !== void 0 ? a(n) : void 0;
    },
    toneDeltaPair: (n) => {
      const a = n.specVersion === e ? t.toneDeltaPair : r.toneDeltaPair;
      return a !== void 0 ? a(n) : void 0;
    }
  });
}
class c {
  /**
   * Create a DynamicColor defined by a TonalPalette and HCT tone.
   *
   * @param args Functions with DynamicScheme as input. Must provide a palette
   *     and tone. May provide a background DynamicColor and ToneDeltaPair.
   */
  static fromPalette(e) {
    return new c(e.name ?? "", e.palette, e.tone ?? c.getInitialToneFromBackground(e.background), e.isBackground ?? !1, e.chromaMultiplier, e.background, e.secondBackground, e.contrastCurve, e.toneDeltaPair);
  }
  static getInitialToneFromBackground(e) {
    return e === void 0 ? (t) => 50 : (t) => e(t) ? e(t).getTone(t) : 50;
  }
  /**
   * The base constructor for DynamicColor.
   *
   * _Strongly_ prefer using one of the convenience constructors. This class is
   * arguably too flexible to ensure it can support any scenario. Functional
   * arguments allow  overriding without risks that come with subclasses.
   *
   * For example, the default behavior of adjust tone at max contrast
   * to be at a 7.0 ratio with its background is principled and
   * matches accessibility guidance. That does not mean it's the desired
   * approach for _every_ design system, and every color pairing,
   * always, in every case.
   *
   * @param name The name of the dynamic color. Defaults to empty.
   * @param palette Function that provides a TonalPalette given DynamicScheme. A
   *     TonalPalette is defined by a hue and chroma, so this replaces the need
   *     to specify hue/chroma. By providing a tonal palette, when contrast
   *     adjustments are made, intended chroma can be preserved.
   * @param tone Function that provides a tone, given a DynamicScheme.
   * @param isBackground Whether this dynamic color is a background, with some
   *     other color as the foreground. Defaults to false.
   * @param chromaMultiplier A factor that multiplies the chroma for this color.
   * @param background The background of the dynamic color (as a function of a
   *     `DynamicScheme`), if it exists.
   * @param secondBackground A second background of the dynamic color (as a
   *     function of a `DynamicScheme`), if it exists.
   * @param contrastCurve A `ContrastCurve` object specifying how its contrast
   *     against its background should behave in various contrast levels
   *     options.
   * @param toneDeltaPair A `ToneDeltaPair` object specifying a tone delta
   *     constraint between two colors. One of them must be the color being
   *     constructed.
   */
  constructor(e, t, n, a, i, s, u, l, f) {
    if (this.name = e, this.palette = t, this.tone = n, this.isBackground = a, this.chromaMultiplier = i, this.background = s, this.secondBackground = u, this.contrastCurve = l, this.toneDeltaPair = f, this.hctCache = /* @__PURE__ */ new Map(), !s && u)
      throw new Error(`Color ${e} has secondBackgrounddefined, but background is not defined.`);
    if (!s && l)
      throw new Error(`Color ${e} has contrastCurvedefined, but background is not defined.`);
    if (s && !l)
      throw new Error(`Color ${e} has backgrounddefined, but contrastCurve is not defined.`);
  }
  /**
   * Returns a deep copy of this DynamicColor.
   */
  clone() {
    return c.fromPalette({
      name: this.name,
      palette: this.palette,
      tone: this.tone,
      isBackground: this.isBackground,
      chromaMultiplier: this.chromaMultiplier,
      background: this.background,
      secondBackground: this.secondBackground,
      contrastCurve: this.contrastCurve,
      toneDeltaPair: this.toneDeltaPair
    });
  }
  /**
   * Clears the cache of HCT values for this color. For testing or debugging
   * purposes.
   */
  clearCache() {
    this.hctCache.clear();
  }
  /**
   * Returns a ARGB integer (i.e. a hex code).
   *
   * @param scheme Defines the conditions of the user interface, for example,
   *     whether or not it is dark mode or light mode, and what the desired
   *     contrast level is.
   */
  getArgb(e) {
    return this.getHct(e).toInt();
  }
  /**
   * Returns a color, expressed in the HCT color space, that this
   * DynamicColor is under the conditions in scheme.
   *
   * @param scheme Defines the conditions of the user interface, for example,
   *     whether or not it is dark mode or light mode, and what the desired
   *     contrast level is.
   */
  getHct(e) {
    const t = this.hctCache.get(e);
    if (t != null)
      return t;
    const n = Fe(e.specVersion).getHct(e, this);
    return this.hctCache.size > 4 && this.hctCache.clear(), this.hctCache.set(e, n), n;
  }
  /**
   * Returns a tone, T in the HCT color space, that this DynamicColor is under
   * the conditions in scheme.
   *
   * @param scheme Defines the conditions of the user interface, for example,
   *     whether or not it is dark mode or light mode, and what the desired
   *     contrast level is.
   */
  getTone(e) {
    return Fe(e.specVersion).getTone(e, this);
  }
  /**
   * Given a background tone, finds a foreground tone, while ensuring they reach
   * a contrast ratio that is as close to [ratio] as possible.
   *
   * @param bgTone Tone in HCT. Range is 0 to 100, undefined behavior when it
   *     falls outside that range.
   * @param ratio The contrast ratio desired between bgTone and the return
   *     value.
   */
  static foregroundTone(e, t) {
    const n = A.lighterUnsafe(e, t), a = A.darkerUnsafe(e, t), i = A.ratioOfTones(n, e), s = A.ratioOfTones(a, e);
    if (c.tonePrefersLightForeground(e)) {
      const l = Math.abs(i - s) < 0.1 && i < t && s < t;
      return i >= t || i >= s || l ? n : a;
    } else
      return s >= t || s >= i ? a : n;
  }
  /**
   * Returns whether [tone] prefers a light foreground.
   *
   * People prefer white foregrounds on ~T60-70. Observed over time, and also
   * by Andrew Somers during research for APCA.
   *
   * T60 used as to create the smallest discontinuity possible when skipping
   * down to T49 in order to ensure light foregrounds.
   * Since `tertiaryContainer` in dark monochrome scheme requires a tone of
   * 60, it should not be adjusted. Therefore, 60 is excluded here.
   */
  static tonePrefersLightForeground(e) {
    return Math.round(e) < 60;
  }
  /**
   * Returns whether [tone] can reach a contrast ratio of 4.5 with a lighter
   * color.
   */
  static toneAllowsLightForeground(e) {
    return Math.round(e) <= 49;
  }
  /**
   * Adjusts a tone such that white has 4.5 contrast, if the tone is
   * reasonably close to supporting it.
   */
  static enableLightForeground(e) {
    return c.tonePrefersLightForeground(e) && !c.toneAllowsLightForeground(e) ? 49 : e;
  }
}
class Qe {
  getHct(e, t) {
    const n = t.getTone(e);
    return t.palette(e).getHct(n);
  }
  getTone(e, t) {
    const n = e.contrastLevel < 0, a = t.toneDeltaPair ? t.toneDeltaPair(e) : void 0;
    if (a) {
      const i = a.roleA, s = a.roleB, u = a.delta, l = a.polarity, f = a.stayTogether, h = l === "nearer" || l === "lighter" && !e.isDark || l === "darker" && e.isDark, p = h ? i : s, d = h ? s : i, C = t.name === p.name, P = e.isDark ? 1 : -1;
      let g = p.tone(e), y = d.tone(e);
      if (t.background && p.contrastCurve && d.contrastCurve) {
        const F = t.background(e), w = p.contrastCurve(e), O = d.contrastCurve(e);
        if (F && w && O) {
          const R = F.getTone(e), E = w.get(e.contrastLevel), v = O.get(e.contrastLevel);
          A.ratioOfTones(R, g) < E && (g = c.foregroundTone(R, E)), A.ratioOfTones(R, y) < v && (y = c.foregroundTone(R, v)), n && (g = c.foregroundTone(R, E), y = c.foregroundTone(R, v));
        }
      }
      return (y - g) * P < u && (y = Y(0, 100, g + u * P), (y - g) * P >= u || (g = Y(0, 100, y - u * P))), 50 <= g && g < 60 ? P > 0 ? (g = 60, y = Math.max(y, g + u * P)) : (g = 49, y = Math.min(y, g + u * P)) : 50 <= y && y < 60 && (f ? P > 0 ? (g = 60, y = Math.max(y, g + u * P)) : (g = 49, y = Math.min(y, g + u * P)) : P > 0 ? y = 60 : y = 49), C ? g : y;
    } else {
      let i = t.tone(e);
      if (t.background == null || t.background(e) === void 0 || t.contrastCurve == null || t.contrastCurve(e) === void 0)
        return i;
      const s = t.background(e).getTone(e), u = t.contrastCurve(e).get(e.contrastLevel);
      if (A.ratioOfTones(s, i) >= u || (i = c.foregroundTone(s, u)), n && (i = c.foregroundTone(s, u)), t.isBackground && 50 <= i && i < 60 && (A.ratioOfTones(49, s) >= u ? i = 49 : i = 60), t.secondBackground == null || t.secondBackground(e) === void 0)
        return i;
      const [l, f] = [t.background, t.secondBackground], [h, p] = [l(e).getTone(e), f(e).getTone(e)], [d, C] = [Math.max(h, p), Math.min(h, p)];
      if (A.ratioOfTones(d, i) >= u && A.ratioOfTones(C, i) >= u)
        return i;
      const P = A.lighter(d, u), g = A.darker(C, u), y = [];
      return P !== -1 && y.push(P), g !== -1 && y.push(g), c.tonePrefersLightForeground(h) || c.tonePrefersLightForeground(p) ? P < 0 ? 100 : P : y.length === 1 ? y[0] : g < 0 ? 0 : g;
    }
  }
}
class et {
  getHct(e, t) {
    const n = t.palette(e), a = t.getTone(e), i = n.hue, s = n.chroma * (t.chromaMultiplier ? t.chromaMultiplier(e) : 1);
    return T.from(i, s, a);
  }
  getTone(e, t) {
    const n = t.toneDeltaPair ? t.toneDeltaPair(e) : void 0;
    if (n) {
      const a = n.roleA, i = n.roleB, s = n.polarity, u = n.constraint, l = s === "darker" || s === "relative_lighter" && e.isDark || s === "relative_darker" && !e.isDark ? -n.delta : n.delta, f = t.name === a.name, h = f ? a : i, p = f ? i : a;
      let d = h.tone(e), C = p.getTone(e);
      const P = l * (f ? 1 : -1);
      if (u === "exact" ? d = Y(0, 100, C + P) : u === "nearer" ? P > 0 ? d = Y(0, 100, Y(C, C + P, d)) : d = Y(0, 100, Y(C + P, C, d)) : u === "farther" && (P > 0 ? d = Y(C + P, 100, d) : d = Y(0, C + P, d)), t.background && t.contrastCurve) {
        const g = t.background(e), y = t.contrastCurve(e);
        if (g && y) {
          const F = g.getTone(e), w = y.get(e.contrastLevel);
          d = A.ratioOfTones(F, d) >= w && e.contrastLevel >= 0 ? d : c.foregroundTone(F, w);
        }
      }
      return t.isBackground && !t.name.endsWith("_fixed_dim") && (d >= 57 ? d = Y(65, 100, d) : d = Y(0, 49, d)), d;
    } else {
      let a = t.tone(e);
      if (t.background == null || t.background(e) === void 0 || t.contrastCurve == null || t.contrastCurve(e) === void 0)
        return a;
      const i = t.background(e).getTone(e), s = t.contrastCurve(e).get(e.contrastLevel);
      if (a = A.ratioOfTones(i, a) >= s && e.contrastLevel >= 0 ? a : c.foregroundTone(i, s), t.isBackground && !t.name.endsWith("_fixed_dim") && (a >= 57 ? a = Y(65, 100, a) : a = Y(0, 49, a)), t.secondBackground == null || t.secondBackground(e) === void 0)
        return a;
      const [u, l] = [t.background, t.secondBackground], [f, h] = [u(e).getTone(e), l(e).getTone(e)], [p, d] = [Math.max(f, h), Math.min(f, h)];
      if (A.ratioOfTones(p, a) >= s && A.ratioOfTones(d, a) >= s)
        return a;
      const C = A.lighter(p, s), P = A.darker(d, s), g = [];
      return C !== -1 && g.push(C), P !== -1 && g.push(P), c.tonePrefersLightForeground(f) || c.tonePrefersLightForeground(h) ? C < 0 ? 100 : C : g.length === 1 ? g[0] : P < 0 ? 0 : P;
    }
  }
}
const tt = new Qe(), rt = new et();
function Fe(r) {
  return r === "2025" ? rt : tt;
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class k {
  /**
   * Creates a `ContrastCurve` object.
   *
   * @param low Value for contrast level -1.0
   * @param normal Value for contrast level 0.0
   * @param medium Value for contrast level 0.5
   * @param high Value for contrast level 1.0
   */
  constructor(e, t, n, a) {
    this.low = e, this.normal = t, this.medium = n, this.high = a;
  }
  /**
   * Returns the value at a given contrast level.
   *
   * @param contrastLevel The contrast level. 0.0 is the default (normal); -1.0
   *     is the lowest; 1.0 is the highest.
   * @return The value. For contrast ratios, a number between 1.0 and 21.0.
   */
  get(e) {
    return e <= -1 ? this.low : e < 0 ? ae(this.low, this.normal, (e - -1) / 1) : e < 0.5 ? ae(this.normal, this.medium, (e - 0) / 0.5) : e < 1 ? ae(this.medium, this.high, (e - 0.5) / 0.5) : this.high;
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class M {
  /**
   * Documents a constraint in tone distance between two DynamicColors.
   *
   * The polarity is an adjective that describes "A", compared to "B".
   *
   * For instance, ToneDeltaPair(A, B, 15, 'darker', 'exact') states that
   * A's tone should be exactly 15 darker than B's.
   *
   * 'relative_darker' and 'relative_lighter' describes the tone adjustment
   * relative to the surface color trend (white in light mode; black in dark
   * mode). For instance, ToneDeltaPair(A, B, 10, 'relative_lighter',
   * 'farther') states that A should be at least 10 lighter than B in light
   * mode, and at least 10 darker than B in dark mode.
   *
   * @param roleA The first role in a pair.
   * @param roleB The second role in a pair.
   * @param delta Required difference between tones. Absolute value, negative
   * values have undefined behavior.
   * @param polarity The relative relation between tones of roleA and roleB,
   * as described above.
   * @param constraint How to fulfill the tone delta pair constraint.
   * @param stayTogether Whether these two roles should stay on the same side
   * of the "awkward zone" (T50-59). This is necessary for certain cases where
   * one role has two backgrounds.
   */
  constructor(e, t, n, a, i, s) {
    this.roleA = e, this.roleB = t, this.delta = n, this.polarity = a, this.stayTogether = i, this.constraint = s, this.constraint = s ?? "exact";
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var m;
(function(r) {
  r[r.MONOCHROME = 0] = "MONOCHROME", r[r.NEUTRAL = 1] = "NEUTRAL", r[r.TONAL_SPOT = 2] = "TONAL_SPOT", r[r.VIBRANT = 3] = "VIBRANT", r[r.EXPRESSIVE = 4] = "EXPRESSIVE", r[r.FIDELITY = 5] = "FIDELITY", r[r.CONTENT = 6] = "CONTENT", r[r.RAINBOW = 7] = "RAINBOW", r[r.FRUIT_SALAD = 8] = "FRUIT_SALAD";
})(m || (m = {}));
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function te(r) {
  return r.variant === m.FIDELITY || r.variant === m.CONTENT;
}
function I(r) {
  return r.variant === m.MONOCHROME;
}
function nt(r, e, t, n) {
  let a = t, i = T.from(r, e, t);
  if (i.chroma < e) {
    let s = i.chroma;
    for (; i.chroma < e; ) {
      a += n ? -1 : 1;
      const u = T.from(r, e, a);
      if (s > u.chroma || Math.abs(u.chroma - e) < 0.4)
        break;
      const l = Math.abs(u.chroma - e), f = Math.abs(i.chroma - e);
      l < f && (i = u), s = Math.max(s, u.chroma);
    }
  }
  return a;
}
class at {
  ////////////////////////////////////////////////////////////////
  // Main Palettes                                              //
  ////////////////////////////////////////////////////////////////
  primaryPaletteKeyColor() {
    return c.fromPalette({
      name: "primary_palette_key_color",
      palette: (e) => e.primaryPalette,
      tone: (e) => e.primaryPalette.keyColor.tone
    });
  }
  secondaryPaletteKeyColor() {
    return c.fromPalette({
      name: "secondary_palette_key_color",
      palette: (e) => e.secondaryPalette,
      tone: (e) => e.secondaryPalette.keyColor.tone
    });
  }
  tertiaryPaletteKeyColor() {
    return c.fromPalette({
      name: "tertiary_palette_key_color",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => e.tertiaryPalette.keyColor.tone
    });
  }
  neutralPaletteKeyColor() {
    return c.fromPalette({
      name: "neutral_palette_key_color",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.neutralPalette.keyColor.tone
    });
  }
  neutralVariantPaletteKeyColor() {
    return c.fromPalette({
      name: "neutral_variant_palette_key_color",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.neutralVariantPalette.keyColor.tone
    });
  }
  errorPaletteKeyColor() {
    return c.fromPalette({
      name: "error_palette_key_color",
      palette: (e) => e.errorPalette,
      tone: (e) => e.errorPalette.keyColor.tone
    });
  }
  ////////////////////////////////////////////////////////////////
  // Surfaces [S]                                               //
  ////////////////////////////////////////////////////////////////
  background() {
    return c.fromPalette({
      name: "background",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 6 : 98,
      isBackground: !0
    });
  }
  onBackground() {
    return c.fromPalette({
      name: "on_background",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 90 : 10,
      background: (e) => this.background(),
      contrastCurve: (e) => new k(3, 3, 4.5, 7)
    });
  }
  surface() {
    return c.fromPalette({
      name: "surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 6 : 98,
      isBackground: !0
    });
  }
  surfaceDim() {
    return c.fromPalette({
      name: "surface_dim",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 6 : new k(87, 87, 80, 75).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceBright() {
    return c.fromPalette({
      name: "surface_bright",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(24, 24, 29, 34).get(e.contrastLevel) : 98,
      isBackground: !0
    });
  }
  surfaceContainerLowest() {
    return c.fromPalette({
      name: "surface_container_lowest",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(4, 4, 2, 0).get(e.contrastLevel) : 100,
      isBackground: !0
    });
  }
  surfaceContainerLow() {
    return c.fromPalette({
      name: "surface_container_low",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(10, 10, 11, 12).get(e.contrastLevel) : new k(96, 96, 96, 95).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainer() {
    return c.fromPalette({
      name: "surface_container",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(12, 12, 16, 20).get(e.contrastLevel) : new k(94, 94, 92, 90).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainerHigh() {
    return c.fromPalette({
      name: "surface_container_high",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(17, 17, 21, 25).get(e.contrastLevel) : new k(92, 92, 88, 85).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainerHighest() {
    return c.fromPalette({
      name: "surface_container_highest",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(22, 22, 26, 30).get(e.contrastLevel) : new k(90, 90, 84, 80).get(e.contrastLevel),
      isBackground: !0
    });
  }
  onSurface() {
    return c.fromPalette({
      name: "on_surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 90 : 10,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  surfaceVariant() {
    return c.fromPalette({
      name: "surface_variant",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 30 : 90,
      isBackground: !0
    });
  }
  onSurfaceVariant() {
    return c.fromPalette({
      name: "on_surface_variant",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 80 : 30,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  inverseSurface() {
    return c.fromPalette({
      name: "inverse_surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 90 : 20,
      isBackground: !0
    });
  }
  inverseOnSurface() {
    return c.fromPalette({
      name: "inverse_on_surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 20 : 95,
      background: (e) => this.inverseSurface(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  outline() {
    return c.fromPalette({
      name: "outline",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 60 : 50,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1.5, 3, 4.5, 7)
    });
  }
  outlineVariant() {
    return c.fromPalette({
      name: "outline_variant",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 30 : 80,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5)
    });
  }
  shadow() {
    return c.fromPalette({
      name: "shadow",
      palette: (e) => e.neutralPalette,
      tone: (e) => 0
    });
  }
  scrim() {
    return c.fromPalette({
      name: "scrim",
      palette: (e) => e.neutralPalette,
      tone: (e) => 0
    });
  }
  surfaceTint() {
    return c.fromPalette({
      name: "surface_tint",
      palette: (e) => e.primaryPalette,
      tone: (e) => e.isDark ? 80 : 40,
      isBackground: !0
    });
  }
  ////////////////////////////////////////////////////////////////
  // Primary [P].                                               //
  ////////////////////////////////////////////////////////////////
  primary() {
    return c.fromPalette({
      name: "primary",
      palette: (e) => e.primaryPalette,
      tone: (e) => I(e) ? e.isDark ? 100 : 0 : e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new M(this.primaryContainer(), this.primary(), 10, "nearer", !1)
    });
  }
  primaryDim() {
  }
  onPrimary() {
    return c.fromPalette({
      name: "on_primary",
      palette: (e) => e.primaryPalette,
      tone: (e) => I(e) ? e.isDark ? 10 : 90 : e.isDark ? 20 : 100,
      background: (e) => this.primary(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  primaryContainer() {
    return c.fromPalette({
      name: "primary_container",
      palette: (e) => e.primaryPalette,
      tone: (e) => te(e) ? e.sourceColorHct.tone : I(e) ? e.isDark ? 85 : 25 : e.isDark ? 30 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new M(this.primaryContainer(), this.primary(), 10, "nearer", !1)
    });
  }
  onPrimaryContainer() {
    return c.fromPalette({
      name: "on_primary_container",
      palette: (e) => e.primaryPalette,
      tone: (e) => te(e) ? c.foregroundTone(this.primaryContainer().tone(e), 4.5) : I(e) ? e.isDark ? 0 : 100 : e.isDark ? 90 : 30,
      background: (e) => this.primaryContainer(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  inversePrimary() {
    return c.fromPalette({
      name: "inverse_primary",
      palette: (e) => e.primaryPalette,
      tone: (e) => e.isDark ? 40 : 80,
      background: (e) => this.inverseSurface(),
      contrastCurve: (e) => new k(3, 4.5, 7, 7)
    });
  }
  /////////////////////////////////////////////////////////////////
  // Secondary [Q].                                              //
  /////////////////////////////////////////////////////////////////
  secondary() {
    return c.fromPalette({
      name: "secondary",
      palette: (e) => e.secondaryPalette,
      tone: (e) => e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new M(this.secondaryContainer(), this.secondary(), 10, "nearer", !1)
    });
  }
  secondaryDim() {
  }
  onSecondary() {
    return c.fromPalette({
      name: "on_secondary",
      palette: (e) => e.secondaryPalette,
      tone: (e) => I(e) ? e.isDark ? 10 : 100 : e.isDark ? 20 : 100,
      background: (e) => this.secondary(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  secondaryContainer() {
    return c.fromPalette({
      name: "secondary_container",
      palette: (e) => e.secondaryPalette,
      tone: (e) => {
        const t = e.isDark ? 30 : 90;
        return I(e) ? e.isDark ? 30 : 85 : te(e) ? nt(e.secondaryPalette.hue, e.secondaryPalette.chroma, t, !e.isDark) : t;
      },
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new M(this.secondaryContainer(), this.secondary(), 10, "nearer", !1)
    });
  }
  onSecondaryContainer() {
    return c.fromPalette({
      name: "on_secondary_container",
      palette: (e) => e.secondaryPalette,
      tone: (e) => I(e) ? e.isDark ? 90 : 10 : te(e) ? c.foregroundTone(this.secondaryContainer().tone(e), 4.5) : e.isDark ? 90 : 30,
      background: (e) => this.secondaryContainer(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  /////////////////////////////////////////////////////////////////
  // Tertiary [T].                                               //
  /////////////////////////////////////////////////////////////////
  tertiary() {
    return c.fromPalette({
      name: "tertiary",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => I(e) ? e.isDark ? 90 : 25 : e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new M(this.tertiaryContainer(), this.tertiary(), 10, "nearer", !1)
    });
  }
  tertiaryDim() {
  }
  onTertiary() {
    return c.fromPalette({
      name: "on_tertiary",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => I(e) ? e.isDark ? 10 : 90 : e.isDark ? 20 : 100,
      background: (e) => this.tertiary(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  tertiaryContainer() {
    return c.fromPalette({
      name: "tertiary_container",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => {
        if (I(e))
          return e.isDark ? 60 : 49;
        if (!te(e))
          return e.isDark ? 30 : 90;
        const t = e.tertiaryPalette.getHct(e.sourceColorHct.tone);
        return Se.fixIfDisliked(t).tone;
      },
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new M(this.tertiaryContainer(), this.tertiary(), 10, "nearer", !1)
    });
  }
  onTertiaryContainer() {
    return c.fromPalette({
      name: "on_tertiary_container",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => I(e) ? e.isDark ? 0 : 100 : te(e) ? c.foregroundTone(this.tertiaryContainer().tone(e), 4.5) : e.isDark ? 90 : 30,
      background: (e) => this.tertiaryContainer(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  //////////////////////////////////////////////////////////////////
  // Error [E].                                                   //
  //////////////////////////////////////////////////////////////////
  error() {
    return c.fromPalette({
      name: "error",
      palette: (e) => e.errorPalette,
      tone: (e) => e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new M(this.errorContainer(), this.error(), 10, "nearer", !1)
    });
  }
  errorDim() {
  }
  onError() {
    return c.fromPalette({
      name: "on_error",
      palette: (e) => e.errorPalette,
      tone: (e) => e.isDark ? 20 : 100,
      background: (e) => this.error(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  errorContainer() {
    return c.fromPalette({
      name: "error_container",
      palette: (e) => e.errorPalette,
      tone: (e) => e.isDark ? 30 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new M(this.errorContainer(), this.error(), 10, "nearer", !1)
    });
  }
  onErrorContainer() {
    return c.fromPalette({
      name: "on_error_container",
      palette: (e) => e.errorPalette,
      tone: (e) => I(e) ? e.isDark ? 90 : 10 : e.isDark ? 90 : 30,
      background: (e) => this.errorContainer(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  //////////////////////////////////////////////////////////////////
  // Primary Fixed [PF]                                           //
  //////////////////////////////////////////////////////////////////
  primaryFixed() {
    return c.fromPalette({
      name: "primary_fixed",
      palette: (e) => e.primaryPalette,
      tone: (e) => I(e) ? 40 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new M(this.primaryFixed(), this.primaryFixedDim(), 10, "lighter", !0)
    });
  }
  primaryFixedDim() {
    return c.fromPalette({
      name: "primary_fixed_dim",
      palette: (e) => e.primaryPalette,
      tone: (e) => I(e) ? 30 : 80,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new M(this.primaryFixed(), this.primaryFixedDim(), 10, "lighter", !0)
    });
  }
  onPrimaryFixed() {
    return c.fromPalette({
      name: "on_primary_fixed",
      palette: (e) => e.primaryPalette,
      tone: (e) => I(e) ? 100 : 10,
      background: (e) => this.primaryFixedDim(),
      secondBackground: (e) => this.primaryFixed(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  onPrimaryFixedVariant() {
    return c.fromPalette({
      name: "on_primary_fixed_variant",
      palette: (e) => e.primaryPalette,
      tone: (e) => I(e) ? 90 : 30,
      background: (e) => this.primaryFixedDim(),
      secondBackground: (e) => this.primaryFixed(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  ///////////////////////////////////////////////////////////////////
  // Secondary Fixed [QF]                                          //
  ///////////////////////////////////////////////////////////////////
  secondaryFixed() {
    return c.fromPalette({
      name: "secondary_fixed",
      palette: (e) => e.secondaryPalette,
      tone: (e) => I(e) ? 80 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new M(this.secondaryFixed(), this.secondaryFixedDim(), 10, "lighter", !0)
    });
  }
  secondaryFixedDim() {
    return c.fromPalette({
      name: "secondary_fixed_dim",
      palette: (e) => e.secondaryPalette,
      tone: (e) => I(e) ? 70 : 80,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new M(this.secondaryFixed(), this.secondaryFixedDim(), 10, "lighter", !0)
    });
  }
  onSecondaryFixed() {
    return c.fromPalette({
      name: "on_secondary_fixed",
      palette: (e) => e.secondaryPalette,
      tone: (e) => 10,
      background: (e) => this.secondaryFixedDim(),
      secondBackground: (e) => this.secondaryFixed(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  onSecondaryFixedVariant() {
    return c.fromPalette({
      name: "on_secondary_fixed_variant",
      palette: (e) => e.secondaryPalette,
      tone: (e) => I(e) ? 25 : 30,
      background: (e) => this.secondaryFixedDim(),
      secondBackground: (e) => this.secondaryFixed(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  /////////////////////////////////////////////////////////////////
  // Tertiary Fixed [TF]                                         //
  /////////////////////////////////////////////////////////////////
  tertiaryFixed() {
    return c.fromPalette({
      name: "tertiary_fixed",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => I(e) ? 40 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new M(this.tertiaryFixed(), this.tertiaryFixedDim(), 10, "lighter", !0)
    });
  }
  tertiaryFixedDim() {
    return c.fromPalette({
      name: "tertiary_fixed_dim",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => I(e) ? 30 : 80,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new M(this.tertiaryFixed(), this.tertiaryFixedDim(), 10, "lighter", !0)
    });
  }
  onTertiaryFixed() {
    return c.fromPalette({
      name: "on_tertiary_fixed",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => I(e) ? 100 : 10,
      background: (e) => this.tertiaryFixedDim(),
      secondBackground: (e) => this.tertiaryFixed(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  onTertiaryFixedVariant() {
    return c.fromPalette({
      name: "on_tertiary_fixed_variant",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => I(e) ? 90 : 30,
      background: (e) => this.tertiaryFixedDim(),
      secondBackground: (e) => this.tertiaryFixed(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  ////////////////////////////////////////////////////////////////
  // Other                                                      //
  ////////////////////////////////////////////////////////////////
  highestSurface(e) {
    return e.isDark ? this.surfaceBright() : this.surfaceDim();
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function D(r, e = 0, t = 100, n = 1) {
  let a = Oe(r.hue, r.chroma * n, 100, !0);
  return Y(e, t, a);
}
function $(r, e = 0, t = 100) {
  let n = Oe(r.hue, r.chroma, 0, !1);
  return Y(e, t, n);
}
function Oe(r, e, t, n) {
  let a = t, i = T.from(r, e, a);
  for (; i.chroma < e && !(t < 0 || t > 100); ) {
    t += n ? -1 : 1;
    const s = T.from(r, e, t);
    i.chroma < s.chroma && (i = s, a = t);
  }
  return a;
}
function b(r) {
  return r === 1.5 ? new k(1.5, 1.5, 3, 5.5) : r === 3 ? new k(3, 3, 4.5, 7) : r === 4.5 ? new k(4.5, 4.5, 7, 11) : r === 6 ? new k(6, 6, 7, 11) : r === 7 ? new k(7, 7, 11, 21) : r === 9 ? new k(9, 9, 11, 21) : r === 11 ? new k(11, 11, 21, 21) : r === 21 ? new k(21, 21, 21, 21) : new k(r, r, 7, 21);
}
class ot extends at {
  ////////////////////////////////////////////////////////////////
  // Surfaces [S]                                               //
  ////////////////////////////////////////////////////////////////
  surface() {
    const e = c.fromPalette({
      name: "surface",
      palette: (t) => t.neutralPalette,
      tone: (t) => (super.surface().tone(t), t.platform === "phone" ? t.isDark ? 4 : T.isYellow(t.neutralPalette.hue) ? 99 : t.variant === m.VIBRANT ? 97 : 98 : 0),
      isBackground: !0
    });
    return x(super.surface(), "2025", e);
  }
  surfaceDim() {
    const e = c.fromPalette({
      name: "surface_dim",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 4 : T.isYellow(t.neutralPalette.hue) ? 90 : t.variant === m.VIBRANT ? 85 : 87,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (!t.isDark) {
          if (t.variant === m.NEUTRAL)
            return 2.5;
          if (t.variant === m.TONAL_SPOT)
            return 1.7;
          if (t.variant === m.EXPRESSIVE)
            return T.isYellow(t.neutralPalette.hue) ? 2.7 : 1.75;
          if (t.variant === m.VIBRANT)
            return 1.36;
        }
        return 1;
      }
    });
    return x(super.surfaceDim(), "2025", e);
  }
  surfaceBright() {
    const e = c.fromPalette({
      name: "surface_bright",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 18 : T.isYellow(t.neutralPalette.hue) ? 99 : t.variant === m.VIBRANT ? 97 : 98,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.isDark) {
          if (t.variant === m.NEUTRAL)
            return 2.5;
          if (t.variant === m.TONAL_SPOT)
            return 1.7;
          if (t.variant === m.EXPRESSIVE)
            return T.isYellow(t.neutralPalette.hue) ? 2.7 : 1.75;
          if (t.variant === m.VIBRANT)
            return 1.36;
        }
        return 1;
      }
    });
    return x(super.surfaceBright(), "2025", e);
  }
  surfaceContainerLowest() {
    const e = c.fromPalette({
      name: "surface_container_lowest",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 0 : 100,
      isBackground: !0
    });
    return x(super.surfaceContainerLowest(), "2025", e);
  }
  surfaceContainerLow() {
    const e = c.fromPalette({
      name: "surface_container_low",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? 6 : T.isYellow(t.neutralPalette.hue) ? 98 : t.variant === m.VIBRANT ? 95 : 96 : 15,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === m.NEUTRAL)
            return 1.3;
          if (t.variant === m.TONAL_SPOT)
            return 1.25;
          if (t.variant === m.EXPRESSIVE)
            return T.isYellow(t.neutralPalette.hue) ? 1.3 : 1.15;
          if (t.variant === m.VIBRANT)
            return 1.08;
        }
        return 1;
      }
    });
    return x(super.surfaceContainerLow(), "2025", e);
  }
  surfaceContainer() {
    const e = c.fromPalette({
      name: "surface_container",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? 9 : T.isYellow(t.neutralPalette.hue) ? 96 : t.variant === m.VIBRANT ? 92 : 94 : 20,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === m.NEUTRAL)
            return 1.6;
          if (t.variant === m.TONAL_SPOT)
            return 1.4;
          if (t.variant === m.EXPRESSIVE)
            return T.isYellow(t.neutralPalette.hue) ? 1.6 : 1.3;
          if (t.variant === m.VIBRANT)
            return 1.15;
        }
        return 1;
      }
    });
    return x(super.surfaceContainer(), "2025", e);
  }
  surfaceContainerHigh() {
    const e = c.fromPalette({
      name: "surface_container_high",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? 12 : T.isYellow(t.neutralPalette.hue) ? 94 : t.variant === m.VIBRANT ? 90 : 92 : 25,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === m.NEUTRAL)
            return 1.9;
          if (t.variant === m.TONAL_SPOT)
            return 1.5;
          if (t.variant === m.EXPRESSIVE)
            return T.isYellow(t.neutralPalette.hue) ? 1.95 : 1.45;
          if (t.variant === m.VIBRANT)
            return 1.22;
        }
        return 1;
      }
    });
    return x(super.surfaceContainerHigh(), "2025", e);
  }
  surfaceContainerHighest() {
    const e = c.fromPalette({
      name: "surface_container_highest",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 15 : T.isYellow(t.neutralPalette.hue) ? 92 : t.variant === m.VIBRANT ? 88 : 90,
      isBackground: !0,
      chromaMultiplier: (t) => t.variant === m.NEUTRAL ? 2.2 : t.variant === m.TONAL_SPOT ? 1.7 : t.variant === m.EXPRESSIVE ? T.isYellow(t.neutralPalette.hue) ? 2.3 : 1.6 : t.variant === m.VIBRANT ? 1.29 : 1
    });
    return x(super.surfaceContainerHighest(), "2025", e);
  }
  onSurface() {
    const e = c.fromPalette({
      name: "on_surface",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.variant === m.VIBRANT ? D(t.neutralPalette, 0, 100, 1.1) : c.getInitialToneFromBackground((n) => n.platform === "phone" ? this.highestSurface(n) : this.surfaceContainerHigh())(t),
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === m.NEUTRAL)
            return 2.2;
          if (t.variant === m.TONAL_SPOT)
            return 1.7;
          if (t.variant === m.EXPRESSIVE)
            return T.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.isDark && t.platform === "phone" ? b(11) : b(9)
    });
    return x(super.onSurface(), "2025", e);
  }
  onSurfaceVariant() {
    const e = c.fromPalette({
      name: "on_surface_variant",
      palette: (t) => t.neutralPalette,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === m.NEUTRAL)
            return 2.2;
          if (t.variant === m.TONAL_SPOT)
            return 1.7;
          if (t.variant === m.EXPRESSIVE)
            return T.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? t.isDark ? b(6) : b(4.5) : b(7)
    });
    return x(super.onSurfaceVariant(), "2025", e);
  }
  outline() {
    const e = c.fromPalette({
      name: "outline",
      palette: (t) => t.neutralPalette,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === m.NEUTRAL)
            return 2.2;
          if (t.variant === m.TONAL_SPOT)
            return 1.7;
          if (t.variant === m.EXPRESSIVE)
            return T.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? b(3) : b(4.5)
    });
    return x(super.outline(), "2025", e);
  }
  outlineVariant() {
    const e = c.fromPalette({
      name: "outline_variant",
      palette: (t) => t.neutralPalette,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === m.NEUTRAL)
            return 2.2;
          if (t.variant === m.TONAL_SPOT)
            return 1.7;
          if (t.variant === m.EXPRESSIVE)
            return T.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? b(1.5) : b(3)
    });
    return x(super.outlineVariant(), "2025", e);
  }
  inverseSurface() {
    const e = c.fromPalette({
      name: "inverse_surface",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 98 : 4,
      isBackground: !0
    });
    return x(super.inverseSurface(), "2025", e);
  }
  inverseOnSurface() {
    const e = c.fromPalette({
      name: "inverse_on_surface",
      palette: (t) => t.neutralPalette,
      background: (t) => this.inverseSurface(),
      contrastCurve: (t) => b(7)
    });
    return x(super.inverseOnSurface(), "2025", e);
  }
  ////////////////////////////////////////////////////////////////
  // Primaries [P]                                              //
  ////////////////////////////////////////////////////////////////
  primary() {
    const e = c.fromPalette({
      name: "primary",
      palette: (t) => t.primaryPalette,
      tone: (t) => t.variant === m.NEUTRAL ? t.platform === "phone" ? t.isDark ? 80 : 40 : 90 : t.variant === m.TONAL_SPOT ? t.platform === "phone" ? t.isDark ? 80 : D(t.primaryPalette) : D(t.primaryPalette, 0, 90) : t.variant === m.EXPRESSIVE ? t.platform === "phone" ? D(t.primaryPalette, 0, T.isYellow(t.primaryPalette.hue) ? 25 : T.isCyan(t.primaryPalette.hue) ? 88 : 98) : D(t.primaryPalette) : t.platform === "phone" ? D(t.primaryPalette, 0, T.isCyan(t.primaryPalette.hue) ? 88 : 98) : D(t.primaryPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? b(4.5) : b(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new M(this.primaryContainer(), this.primary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return x(super.primary(), "2025", e);
  }
  primaryDim() {
    return c.fromPalette({
      name: "primary_dim",
      palette: (e) => e.primaryPalette,
      tone: (e) => e.variant === m.NEUTRAL ? 85 : e.variant === m.TONAL_SPOT ? D(e.primaryPalette, 0, 90) : D(e.primaryPalette),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => b(4.5),
      toneDeltaPair: (e) => new M(this.primaryDim(), this.primary(), 5, "darker", !0, "farther")
    });
  }
  onPrimary() {
    const e = c.fromPalette({
      name: "on_primary",
      palette: (t) => t.primaryPalette,
      background: (t) => t.platform === "phone" ? this.primary() : this.primaryDim(),
      contrastCurve: (t) => t.platform === "phone" ? b(6) : b(7)
    });
    return x(super.onPrimary(), "2025", e);
  }
  primaryContainer() {
    const e = c.fromPalette({
      name: "primary_container",
      palette: (t) => t.primaryPalette,
      tone: (t) => t.platform === "watch" ? 30 : t.variant === m.NEUTRAL ? t.isDark ? 30 : 90 : t.variant === m.TONAL_SPOT ? t.isDark ? $(t.primaryPalette, 35, 93) : D(t.primaryPalette, 0, 90) : t.variant === m.EXPRESSIVE ? t.isDark ? D(t.primaryPalette, 30, 93) : D(t.primaryPalette, 78, T.isCyan(t.primaryPalette.hue) ? 88 : 90) : t.isDark ? $(t.primaryPalette, 66, 93) : D(t.primaryPalette, 66, T.isCyan(t.primaryPalette.hue) ? 88 : 93),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "phone" ? void 0 : new M(this.primaryContainer(), this.primaryDim(), 10, "darker", !0, "farther"),
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? b(1.5) : void 0
    });
    return x(super.primaryContainer(), "2025", e);
  }
  onPrimaryContainer() {
    const e = c.fromPalette({
      name: "on_primary_container",
      palette: (t) => t.primaryPalette,
      background: (t) => this.primaryContainer(),
      contrastCurve: (t) => t.platform === "phone" ? b(6) : b(7)
    });
    return x(super.onPrimaryContainer(), "2025", e);
  }
  primaryFixed() {
    const e = c.fromPalette({
      name: "primary_fixed",
      palette: (t) => t.primaryPalette,
      tone: (t) => {
        let n = Object.assign({}, t, { isDark: !1, contrastLevel: 0 });
        return this.primaryContainer().getTone(n);
      },
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? b(1.5) : void 0
    });
    return x(super.primaryFixed(), "2025", e);
  }
  primaryFixedDim() {
    const e = c.fromPalette({
      name: "primary_fixed_dim",
      palette: (t) => t.primaryPalette,
      tone: (t) => this.primaryFixed().getTone(t),
      isBackground: !0,
      toneDeltaPair: (t) => new M(this.primaryFixedDim(), this.primaryFixed(), 5, "darker", !0, "exact")
    });
    return x(super.primaryFixedDim(), "2025", e);
  }
  onPrimaryFixed() {
    const e = c.fromPalette({
      name: "on_primary_fixed",
      palette: (t) => t.primaryPalette,
      background: (t) => this.primaryFixedDim(),
      contrastCurve: (t) => b(7)
    });
    return x(super.onPrimaryFixed(), "2025", e);
  }
  onPrimaryFixedVariant() {
    const e = c.fromPalette({
      name: "on_primary_fixed_variant",
      palette: (t) => t.primaryPalette,
      background: (t) => this.primaryFixedDim(),
      contrastCurve: (t) => b(4.5)
    });
    return x(super.onPrimaryFixedVariant(), "2025", e);
  }
  inversePrimary() {
    const e = c.fromPalette({
      name: "inverse_primary",
      palette: (t) => t.primaryPalette,
      tone: (t) => D(t.primaryPalette),
      background: (t) => this.inverseSurface(),
      contrastCurve: (t) => t.platform === "phone" ? b(6) : b(7)
    });
    return x(super.inversePrimary(), "2025", e);
  }
  ////////////////////////////////////////////////////////////////
  // Secondaries [Q]                                            //
  ////////////////////////////////////////////////////////////////
  secondary() {
    const e = c.fromPalette({
      name: "secondary",
      palette: (t) => t.secondaryPalette,
      tone: (t) => t.platform === "watch" ? t.variant === m.NEUTRAL ? 90 : D(t.secondaryPalette, 0, 90) : t.variant === m.NEUTRAL ? t.isDark ? $(t.secondaryPalette, 0, 98) : D(t.secondaryPalette) : t.variant === m.VIBRANT ? D(t.secondaryPalette, 0, t.isDark ? 90 : 98) : t.isDark ? 80 : D(t.secondaryPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? b(4.5) : b(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new M(this.secondaryContainer(), this.secondary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return x(super.secondary(), "2025", e);
  }
  secondaryDim() {
    return c.fromPalette({
      name: "secondary_dim",
      palette: (e) => e.secondaryPalette,
      tone: (e) => e.variant === m.NEUTRAL ? 85 : D(e.secondaryPalette, 0, 90),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => b(4.5),
      toneDeltaPair: (e) => new M(this.secondaryDim(), this.secondary(), 5, "darker", !0, "farther")
    });
  }
  onSecondary() {
    const e = c.fromPalette({
      name: "on_secondary",
      palette: (t) => t.secondaryPalette,
      background: (t) => t.platform === "phone" ? this.secondary() : this.secondaryDim(),
      contrastCurve: (t) => t.platform === "phone" ? b(6) : b(7)
    });
    return x(super.onSecondary(), "2025", e);
  }
  secondaryContainer() {
    const e = c.fromPalette({
      name: "secondary_container",
      palette: (t) => t.secondaryPalette,
      tone: (t) => t.platform === "watch" ? 30 : t.variant === m.VIBRANT ? t.isDark ? $(t.secondaryPalette, 30, 40) : D(t.secondaryPalette, 84, 90) : t.variant === m.EXPRESSIVE ? t.isDark ? 15 : D(t.secondaryPalette, 90, 95) : t.isDark ? 25 : 90,
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "watch" ? new M(this.secondaryContainer(), this.secondaryDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? b(1.5) : void 0
    });
    return x(super.secondaryContainer(), "2025", e);
  }
  onSecondaryContainer() {
    const e = c.fromPalette({
      name: "on_secondary_container",
      palette: (t) => t.secondaryPalette,
      background: (t) => this.secondaryContainer(),
      contrastCurve: (t) => t.platform === "phone" ? b(6) : b(7)
    });
    return x(super.onSecondaryContainer(), "2025", e);
  }
  secondaryFixed() {
    const e = c.fromPalette({
      name: "secondary_fixed",
      palette: (t) => t.secondaryPalette,
      tone: (t) => {
        let n = Object.assign({}, t, { isDark: !1, contrastLevel: 0 });
        return this.secondaryContainer().getTone(n);
      },
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? b(1.5) : void 0
    });
    return x(super.secondaryFixed(), "2025", e);
  }
  secondaryFixedDim() {
    const e = c.fromPalette({
      name: "secondary_fixed_dim",
      palette: (t) => t.secondaryPalette,
      tone: (t) => this.secondaryFixed().getTone(t),
      isBackground: !0,
      toneDeltaPair: (t) => new M(this.secondaryFixedDim(), this.secondaryFixed(), 5, "darker", !0, "exact")
    });
    return x(super.secondaryFixedDim(), "2025", e);
  }
  onSecondaryFixed() {
    const e = c.fromPalette({
      name: "on_secondary_fixed",
      palette: (t) => t.secondaryPalette,
      background: (t) => this.secondaryFixedDim(),
      contrastCurve: (t) => b(7)
    });
    return x(super.onSecondaryFixed(), "2025", e);
  }
  onSecondaryFixedVariant() {
    const e = c.fromPalette({
      name: "on_secondary_fixed_variant",
      palette: (t) => t.secondaryPalette,
      background: (t) => this.secondaryFixedDim(),
      contrastCurve: (t) => b(4.5)
    });
    return x(super.onSecondaryFixedVariant(), "2025", e);
  }
  ////////////////////////////////////////////////////////////////
  // Tertiaries [T]                                             //
  ////////////////////////////////////////////////////////////////
  tertiary() {
    const e = c.fromPalette({
      name: "tertiary",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => t.platform === "watch" ? t.variant === m.TONAL_SPOT ? D(t.tertiaryPalette, 0, 90) : D(t.tertiaryPalette) : t.variant === m.EXPRESSIVE || t.variant === m.VIBRANT ? D(t.tertiaryPalette, 0, T.isCyan(t.tertiaryPalette.hue) ? 88 : t.isDark ? 98 : 100) : t.isDark ? D(t.tertiaryPalette, 0, 98) : D(t.tertiaryPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? b(4.5) : b(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new M(this.tertiaryContainer(), this.tertiary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return x(super.tertiary(), "2025", e);
  }
  tertiaryDim() {
    return c.fromPalette({
      name: "tertiary_dim",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => e.variant === m.TONAL_SPOT ? D(e.tertiaryPalette, 0, 90) : D(e.tertiaryPalette),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => b(4.5),
      toneDeltaPair: (e) => new M(this.tertiaryDim(), this.tertiary(), 5, "darker", !0, "farther")
    });
  }
  onTertiary() {
    const e = c.fromPalette({
      name: "on_tertiary",
      palette: (t) => t.tertiaryPalette,
      background: (t) => t.platform === "phone" ? this.tertiary() : this.tertiaryDim(),
      contrastCurve: (t) => t.platform === "phone" ? b(6) : b(7)
    });
    return x(super.onTertiary(), "2025", e);
  }
  tertiaryContainer() {
    const e = c.fromPalette({
      name: "tertiary_container",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => t.platform === "watch" ? t.variant === m.TONAL_SPOT ? D(t.tertiaryPalette, 0, 90) : D(t.tertiaryPalette) : t.variant === m.NEUTRAL ? t.isDark ? D(t.tertiaryPalette, 0, 93) : D(t.tertiaryPalette, 0, 96) : t.variant === m.TONAL_SPOT ? D(t.tertiaryPalette, 0, t.isDark ? 93 : 100) : t.variant === m.EXPRESSIVE ? D(t.tertiaryPalette, 75, T.isCyan(t.tertiaryPalette.hue) ? 88 : t.isDark ? 93 : 100) : t.isDark ? D(t.tertiaryPalette, 0, 93) : D(t.tertiaryPalette, 72, 100),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "watch" ? new M(this.tertiaryContainer(), this.tertiaryDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? b(1.5) : void 0
    });
    return x(super.tertiaryContainer(), "2025", e);
  }
  onTertiaryContainer() {
    const e = c.fromPalette({
      name: "on_tertiary_container",
      palette: (t) => t.tertiaryPalette,
      background: (t) => this.tertiaryContainer(),
      contrastCurve: (t) => t.platform === "phone" ? b(6) : b(7)
    });
    return x(super.onTertiaryContainer(), "2025", e);
  }
  tertiaryFixed() {
    const e = c.fromPalette({
      name: "tertiary_fixed",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => {
        let n = Object.assign({}, t, { isDark: !1, contrastLevel: 0 });
        return this.tertiaryContainer().getTone(n);
      },
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? b(1.5) : void 0
    });
    return x(super.tertiaryFixed(), "2025", e);
  }
  tertiaryFixedDim() {
    const e = c.fromPalette({
      name: "tertiary_fixed_dim",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => this.tertiaryFixed().getTone(t),
      isBackground: !0,
      toneDeltaPair: (t) => new M(this.tertiaryFixedDim(), this.tertiaryFixed(), 5, "darker", !0, "exact")
    });
    return x(super.tertiaryFixedDim(), "2025", e);
  }
  onTertiaryFixed() {
    const e = c.fromPalette({
      name: "on_tertiary_fixed",
      palette: (t) => t.tertiaryPalette,
      background: (t) => this.tertiaryFixedDim(),
      contrastCurve: (t) => b(7)
    });
    return x(super.onTertiaryFixed(), "2025", e);
  }
  onTertiaryFixedVariant() {
    const e = c.fromPalette({
      name: "on_tertiary_fixed_variant",
      palette: (t) => t.tertiaryPalette,
      background: (t) => this.tertiaryFixedDim(),
      contrastCurve: (t) => b(4.5)
    });
    return x(super.onTertiaryFixedVariant(), "2025", e);
  }
  ////////////////////////////////////////////////////////////////
  // Errors [E]                                                 //
  ////////////////////////////////////////////////////////////////
  error() {
    const e = c.fromPalette({
      name: "error",
      palette: (t) => t.errorPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? $(t.errorPalette, 0, 98) : D(t.errorPalette) : $(t.errorPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? b(4.5) : b(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new M(this.errorContainer(), this.error(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return x(super.error(), "2025", e);
  }
  errorDim() {
    return c.fromPalette({
      name: "error_dim",
      palette: (e) => e.errorPalette,
      tone: (e) => $(e.errorPalette),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => b(4.5),
      toneDeltaPair: (e) => new M(this.errorDim(), this.error(), 5, "darker", !0, "farther")
    });
  }
  onError() {
    const e = c.fromPalette({
      name: "on_error",
      palette: (t) => t.errorPalette,
      background: (t) => t.platform === "phone" ? this.error() : this.errorDim(),
      contrastCurve: (t) => t.platform === "phone" ? b(6) : b(7)
    });
    return x(super.onError(), "2025", e);
  }
  errorContainer() {
    const e = c.fromPalette({
      name: "error_container",
      palette: (t) => t.errorPalette,
      tone: (t) => t.platform === "watch" ? 30 : t.isDark ? $(t.errorPalette, 30, 93) : D(t.errorPalette, 0, 90),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "watch" ? new M(this.errorContainer(), this.errorDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? b(1.5) : void 0
    });
    return x(super.errorContainer(), "2025", e);
  }
  onErrorContainer() {
    const e = c.fromPalette({
      name: "on_error_container",
      palette: (t) => t.errorPalette,
      background: (t) => this.errorContainer(),
      contrastCurve: (t) => t.platform === "phone" ? b(4.5) : b(7)
    });
    return x(super.onErrorContainer(), "2025", e);
  }
  /////////////////////////////////////////////////////////////////
  // Remapped Colors                                             //
  /////////////////////////////////////////////////////////////////
  surfaceVariant() {
    const e = Object.assign(this.surfaceContainerHighest().clone(), { name: "surface_variant" });
    return x(super.surfaceVariant(), "2025", e);
  }
  surfaceTint() {
    const e = Object.assign(this.primary().clone(), { name: "surface_tint" });
    return x(super.surfaceTint(), "2025", e);
  }
  background() {
    const e = Object.assign(this.surface().clone(), { name: "background" });
    return x(super.background(), "2025", e);
  }
  onBackground() {
    const e = Object.assign(this.onSurface().clone(), {
      name: "on_background",
      tone: (t) => t.platform === "watch" ? 100 : this.onSurface().getTone(t)
    });
    return x(super.onBackground(), "2025", e);
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class o {
  constructor() {
    this.allColors = [
      this.background(),
      this.onBackground(),
      this.surface(),
      this.surfaceDim(),
      this.surfaceBright(),
      this.surfaceContainerLowest(),
      this.surfaceContainerLow(),
      this.surfaceContainer(),
      this.surfaceContainerHigh(),
      this.surfaceContainerHighest(),
      this.onSurface(),
      this.onSurfaceVariant(),
      this.outline(),
      this.outlineVariant(),
      this.inverseSurface(),
      this.inverseOnSurface(),
      this.primary(),
      this.primaryDim(),
      this.onPrimary(),
      this.primaryContainer(),
      this.onPrimaryContainer(),
      this.primaryFixed(),
      this.primaryFixedDim(),
      this.onPrimaryFixed(),
      this.onPrimaryFixedVariant(),
      this.inversePrimary(),
      this.secondary(),
      this.secondaryDim(),
      this.onSecondary(),
      this.secondaryContainer(),
      this.onSecondaryContainer(),
      this.secondaryFixed(),
      this.secondaryFixedDim(),
      this.onSecondaryFixed(),
      this.onSecondaryFixedVariant(),
      this.tertiary(),
      this.tertiaryDim(),
      this.onTertiary(),
      this.tertiaryContainer(),
      this.onTertiaryContainer(),
      this.tertiaryFixed(),
      this.tertiaryFixedDim(),
      this.onTertiaryFixed(),
      this.onTertiaryFixedVariant(),
      this.error(),
      this.errorDim(),
      this.onError(),
      this.errorContainer(),
      this.onErrorContainer()
    ].filter((e) => e !== void 0);
  }
  highestSurface(e) {
    return o.colorSpec.highestSurface(e);
  }
  ////////////////////////////////////////////////////////////////
  // Main Palettes                                              //
  ////////////////////////////////////////////////////////////////
  primaryPaletteKeyColor() {
    return o.colorSpec.primaryPaletteKeyColor();
  }
  secondaryPaletteKeyColor() {
    return o.colorSpec.secondaryPaletteKeyColor();
  }
  tertiaryPaletteKeyColor() {
    return o.colorSpec.tertiaryPaletteKeyColor();
  }
  neutralPaletteKeyColor() {
    return o.colorSpec.neutralPaletteKeyColor();
  }
  neutralVariantPaletteKeyColor() {
    return o.colorSpec.neutralVariantPaletteKeyColor();
  }
  errorPaletteKeyColor() {
    return o.colorSpec.errorPaletteKeyColor();
  }
  ////////////////////////////////////////////////////////////////
  // Surfaces [S]                                               //
  ////////////////////////////////////////////////////////////////
  background() {
    return o.colorSpec.background();
  }
  onBackground() {
    return o.colorSpec.onBackground();
  }
  surface() {
    return o.colorSpec.surface();
  }
  surfaceDim() {
    return o.colorSpec.surfaceDim();
  }
  surfaceBright() {
    return o.colorSpec.surfaceBright();
  }
  surfaceContainerLowest() {
    return o.colorSpec.surfaceContainerLowest();
  }
  surfaceContainerLow() {
    return o.colorSpec.surfaceContainerLow();
  }
  surfaceContainer() {
    return o.colorSpec.surfaceContainer();
  }
  surfaceContainerHigh() {
    return o.colorSpec.surfaceContainerHigh();
  }
  surfaceContainerHighest() {
    return o.colorSpec.surfaceContainerHighest();
  }
  onSurface() {
    return o.colorSpec.onSurface();
  }
  surfaceVariant() {
    return o.colorSpec.surfaceVariant();
  }
  onSurfaceVariant() {
    return o.colorSpec.onSurfaceVariant();
  }
  outline() {
    return o.colorSpec.outline();
  }
  outlineVariant() {
    return o.colorSpec.outlineVariant();
  }
  inverseSurface() {
    return o.colorSpec.inverseSurface();
  }
  inverseOnSurface() {
    return o.colorSpec.inverseOnSurface();
  }
  shadow() {
    return o.colorSpec.shadow();
  }
  scrim() {
    return o.colorSpec.scrim();
  }
  surfaceTint() {
    return o.colorSpec.surfaceTint();
  }
  ////////////////////////////////////////////////////////////////
  // Primaries [P]                                              //
  ////////////////////////////////////////////////////////////////
  primary() {
    return o.colorSpec.primary();
  }
  primaryDim() {
    return o.colorSpec.primaryDim();
  }
  onPrimary() {
    return o.colorSpec.onPrimary();
  }
  primaryContainer() {
    return o.colorSpec.primaryContainer();
  }
  onPrimaryContainer() {
    return o.colorSpec.onPrimaryContainer();
  }
  inversePrimary() {
    return o.colorSpec.inversePrimary();
  }
  /////////////////////////////////////////////////////////////////
  // Primary Fixed [PF]                                          //
  /////////////////////////////////////////////////////////////////
  primaryFixed() {
    return o.colorSpec.primaryFixed();
  }
  primaryFixedDim() {
    return o.colorSpec.primaryFixedDim();
  }
  onPrimaryFixed() {
    return o.colorSpec.onPrimaryFixed();
  }
  onPrimaryFixedVariant() {
    return o.colorSpec.onPrimaryFixedVariant();
  }
  ////////////////////////////////////////////////////////////////
  // Secondaries [Q]                                            //
  ////////////////////////////////////////////////////////////////
  secondary() {
    return o.colorSpec.secondary();
  }
  secondaryDim() {
    return o.colorSpec.secondaryDim();
  }
  onSecondary() {
    return o.colorSpec.onSecondary();
  }
  secondaryContainer() {
    return o.colorSpec.secondaryContainer();
  }
  onSecondaryContainer() {
    return o.colorSpec.onSecondaryContainer();
  }
  /////////////////////////////////////////////////////////////////
  // Secondary Fixed [QF]                                        //
  /////////////////////////////////////////////////////////////////
  secondaryFixed() {
    return o.colorSpec.secondaryFixed();
  }
  secondaryFixedDim() {
    return o.colorSpec.secondaryFixedDim();
  }
  onSecondaryFixed() {
    return o.colorSpec.onSecondaryFixed();
  }
  onSecondaryFixedVariant() {
    return o.colorSpec.onSecondaryFixedVariant();
  }
  ////////////////////////////////////////////////////////////////
  // Tertiaries [T]                                             //
  ////////////////////////////////////////////////////////////////
  tertiary() {
    return o.colorSpec.tertiary();
  }
  tertiaryDim() {
    return o.colorSpec.tertiaryDim();
  }
  onTertiary() {
    return o.colorSpec.onTertiary();
  }
  tertiaryContainer() {
    return o.colorSpec.tertiaryContainer();
  }
  onTertiaryContainer() {
    return o.colorSpec.onTertiaryContainer();
  }
  /////////////////////////////////////////////////////////////////
  // Tertiary Fixed [TF]                                         //
  /////////////////////////////////////////////////////////////////
  tertiaryFixed() {
    return o.colorSpec.tertiaryFixed();
  }
  tertiaryFixedDim() {
    return o.colorSpec.tertiaryFixedDim();
  }
  onTertiaryFixed() {
    return o.colorSpec.onTertiaryFixed();
  }
  onTertiaryFixedVariant() {
    return o.colorSpec.onTertiaryFixedVariant();
  }
  ////////////////////////////////////////////////////////////////
  // Errors [E]                                                 //
  ////////////////////////////////////////////////////////////////
  error() {
    return o.colorSpec.error();
  }
  errorDim() {
    return o.colorSpec.errorDim();
  }
  onError() {
    return o.colorSpec.onError();
  }
  errorContainer() {
    return o.colorSpec.errorContainer();
  }
  onErrorContainer() {
    return o.colorSpec.onErrorContainer();
  }
  // Static variables are deprecated. Use the instance methods to get correct
  // specs based on request.
  /** @deprecated Use highestSurface() instead. */
  static highestSurface(e) {
    return o.colorSpec.highestSurface(e);
  }
}
o.contentAccentToneDelta = 15;
o.colorSpec = new ot();
o.primaryPaletteKeyColor = o.colorSpec.primaryPaletteKeyColor();
o.secondaryPaletteKeyColor = o.colorSpec.secondaryPaletteKeyColor();
o.tertiaryPaletteKeyColor = o.colorSpec.tertiaryPaletteKeyColor();
o.neutralPaletteKeyColor = o.colorSpec.neutralPaletteKeyColor();
o.neutralVariantPaletteKeyColor = o.colorSpec.neutralVariantPaletteKeyColor();
o.background = o.colorSpec.background();
o.onBackground = o.colorSpec.onBackground();
o.surface = o.colorSpec.surface();
o.surfaceDim = o.colorSpec.surfaceDim();
o.surfaceBright = o.colorSpec.surfaceBright();
o.surfaceContainerLowest = o.colorSpec.surfaceContainerLowest();
o.surfaceContainerLow = o.colorSpec.surfaceContainerLow();
o.surfaceContainer = o.colorSpec.surfaceContainer();
o.surfaceContainerHigh = o.colorSpec.surfaceContainerHigh();
o.surfaceContainerHighest = o.colorSpec.surfaceContainerHighest();
o.onSurface = o.colorSpec.onSurface();
o.surfaceVariant = o.colorSpec.surfaceVariant();
o.onSurfaceVariant = o.colorSpec.onSurfaceVariant();
o.inverseSurface = o.colorSpec.inverseSurface();
o.inverseOnSurface = o.colorSpec.inverseOnSurface();
o.outline = o.colorSpec.outline();
o.outlineVariant = o.colorSpec.outlineVariant();
o.shadow = o.colorSpec.shadow();
o.scrim = o.colorSpec.scrim();
o.surfaceTint = o.colorSpec.surfaceTint();
o.primary = o.colorSpec.primary();
o.onPrimary = o.colorSpec.onPrimary();
o.primaryContainer = o.colorSpec.primaryContainer();
o.onPrimaryContainer = o.colorSpec.onPrimaryContainer();
o.inversePrimary = o.colorSpec.inversePrimary();
o.secondary = o.colorSpec.secondary();
o.onSecondary = o.colorSpec.onSecondary();
o.secondaryContainer = o.colorSpec.secondaryContainer();
o.onSecondaryContainer = o.colorSpec.onSecondaryContainer();
o.tertiary = o.colorSpec.tertiary();
o.onTertiary = o.colorSpec.onTertiary();
o.tertiaryContainer = o.colorSpec.tertiaryContainer();
o.onTertiaryContainer = o.colorSpec.onTertiaryContainer();
o.error = o.colorSpec.error();
o.onError = o.colorSpec.onError();
o.errorContainer = o.colorSpec.errorContainer();
o.onErrorContainer = o.colorSpec.onErrorContainer();
o.primaryFixed = o.colorSpec.primaryFixed();
o.primaryFixedDim = o.colorSpec.primaryFixedDim();
o.onPrimaryFixed = o.colorSpec.onPrimaryFixed();
o.onPrimaryFixedVariant = o.colorSpec.onPrimaryFixedVariant();
o.secondaryFixed = o.colorSpec.secondaryFixed();
o.secondaryFixedDim = o.colorSpec.secondaryFixedDim();
o.onSecondaryFixed = o.colorSpec.onSecondaryFixed();
o.onSecondaryFixedVariant = o.colorSpec.onSecondaryFixedVariant();
o.tertiaryFixed = o.colorSpec.tertiaryFixed();
o.tertiaryFixedDim = o.colorSpec.tertiaryFixedDim();
o.onTertiaryFixed = o.colorSpec.onTertiaryFixed();
o.onTertiaryFixedVariant = o.colorSpec.onTertiaryFixedVariant();
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function le(r) {
  const e = Ae(r), t = Ie(r), n = ve(r), a = [e.toString(16), t.toString(16), n.toString(16)];
  for (const [i, s] of a.entries())
    s.length === 1 && (a[i] = "0" + s);
  return "#" + a.join("");
}
function J(r) {
  r = r.replace("#", "");
  const e = r.length === 3, t = r.length === 6, n = r.length === 8;
  if (!e && !t && !n)
    throw new Error("unexpected hex " + r);
  let a = 0, i = 0, s = 0;
  return e ? (a = j(r.slice(0, 1).repeat(2)), i = j(r.slice(1, 2).repeat(2)), s = j(r.slice(2, 3).repeat(2))) : t ? (a = j(r.slice(0, 2)), i = j(r.slice(2, 4)), s = j(r.slice(4, 6))) : n && (a = j(r.slice(2, 4)), i = j(r.slice(4, 6)), s = j(r.slice(6, 8))), (255 << 24 | (a & 255) << 16 | (i & 255) << 8 | s & 255) >>> 0;
}
function j(r) {
  return parseInt(r, 16);
}
const it = ["hex", "rgb", "hsl"];
function st(r) {
  return !r || it.indexOf(r) < 0 ? "hex" : r;
}
function fe(r, e) {
  const t = st(e);
  return t === "hex" ? r[t]().toLowerCase() : r[t]().round().string();
}
const ct = [98, 96, 92, 86, 76, 64, 52, 40, 28, 18], ut = [14, 20, 28, 38, 50, 62, 74, 86, 93, 97], lt = [99, 97, 94, 89, 80, 70, 60, 50, 40, 30], ft = [18, 24, 32, 42, 54, 66, 77, 87, 94, 98], ht = [0.08, 0.14, 0.24, 0.36, 0.5, 0.74, 1, 0.92, 0.78, 0.6], dt = [1, 0.98, 0.94, 0.88, 0.8, 0.72, 0.62, 0.52, 0.42, 0.32], mt = [0.12, 0.18, 0.3, 0.46, 0.62, 0.82, 1.02, 1, 0.92, 0.8], pt = [1.02, 1, 0.98, 0.94, 0.9, 0.84, 0.76, 0.68, 0.58, 0.48], yt = 105, Me = 32;
function Z(r, e, t) {
  return Math.max(e, Math.min(t, r));
}
function re(r) {
  return Math.round(r * 100) / 100;
}
function Pt(r, e) {
  const t = Math.abs(r - e) % 360;
  return t > 180 ? 360 - t : t;
}
function gt(r, e, t) {
  return r + (e - r) * t;
}
function Re(r, e, t) {
  return t <= 0 ? r : t >= 1 ? e : r.map((n, a) => gt(n, e[a], t));
}
function Ee(r) {
  return Z(Math.round(r * 0.77), 1, r);
}
function kt(r = {}) {
  const e = Z(Number(r.steps) || 10, 1, 24), t = Math.floor(e / 2) + 1, n = !!r.dark, a = r.index !== void 0 && r.index !== null && r.index !== "", i = n ? Ee(e) : t;
  return {
    dark: n,
    list: !!r.list,
    meta: !!r.meta,
    format: r.format || "hex",
    steps: e,
    centerIndex: t,
    hasExplicitIndex: a,
    index: Z(a ? Number(r.index) : i, 1, e),
    curveGamma: Z(Number(r.curveGamma) || 1, 0.1, 5),
    mixColor: typeof r.mixColor == "string" ? r.mixColor : "",
    mixRatio: Z(Number(r.mixRatio) || 0, 0, 1),
    protectYellow: !!r.protectYellow
  };
}
function bt(r, e, t) {
  const n = U(r);
  if (!e || t <= 0)
    return n;
  const a = J(n.hex().toLowerCase()), i = J(U(e).hex().toLowerCase());
  return U(le(oe.cam16Ucs(a, i, t)));
}
function St(r, e) {
  const t = Z(r, 0, 1);
  return t <= 0.5 ? 0.5 * Math.pow(t * 2, e) : 1 - 0.5 * Math.pow((1 - t) * 2, e);
}
function Be(r, e) {
  if (r.length === 1)
    return r[0];
  const t = Z(e, 0, 1) * (r.length - 1), n = Math.floor(t), a = Math.min(r.length - 1, n + 1), i = t - n;
  return r[n] + (r[a] - r[n]) * i;
}
function Ce(r, e) {
  if (!e)
    return 0;
  const t = Pt(r, yt);
  if (t >= Me)
    return 0;
  const n = 1 - t / Me;
  return n * n;
}
function Ct(r, e, t) {
  return Re(e ? dt : ht, e ? pt : mt, Ce(r.hue, t));
}
function xt(r, e, t) {
  return Re(e ? ut : ct, e ? ft : lt, Ce(r.hue, t));
}
function Tt(r, e, t) {
  const n = t.steps === 1 ? 0.5 : e / (t.steps - 1), a = St(n, t.curveGamma), i = Be(xt(r, t.dark, t.protectYellow), a), s = Be(Ct(r, t.dark, t.protectYellow), a), u = Z(r.chroma * s, 0, 140);
  return {
    tone: re(i),
    chroma: re(u),
    isNeutral: !1
  };
}
function Dt(r, e, t) {
  const n = T.from(r.hue, e.chroma, e.tone);
  return fe(U(le(n.toInt())), t);
}
function wt(r, e = {}) {
  const t = kt(e), n = bt(r, t.mixColor, t.mixRatio), a = T.fromInt(J(n.hex().toLowerCase())), i = Ce(a.hue, t.protectYellow), s = Array.from({ length: t.steps }, (h, p) => {
    const d = Tt(a, p, t);
    return {
      index: p + 1,
      ...d,
      color: Dt(a, d, t.format)
    };
  }), u = s.reduce((h, p) => {
    const d = Math.abs(p.tone - a.tone) + Math.abs(p.chroma - a.chroma) * 0.35, C = Math.abs(h.tone - a.tone) + Math.abs(h.chroma - a.chroma) * 0.35;
    return d < C ? p : h;
  }, s[0]), l = t.dark ? Math.max(u.index, Ee(t.steps)) : u.index, f = s[l - 1];
  return {
    options: t,
    descriptors: s,
    meta: {
      sourceColor: fe(U(r), t.format),
      seedColor: fe(n, t.format),
      sourceHex: U(r).hex().toLowerCase(),
      seedHex: n.hex().toLowerCase(),
      sourceTone: re(T.fromInt(J(U(r).hex().toLowerCase())).tone),
      seedTone: re(a.tone),
      seedChroma: re(a.chroma),
      closestIndex: u.index,
      closestColor: u.color,
      baseIndex: f.index,
      baseColor: f.color,
      dark: t.dark,
      steps: t.steps,
      isNeutral: u.isNeutral,
      protectYellow: t.protectYellow,
      yellowProtectionApplied: i > 0,
      yellowProtectionStrength: re(i)
    }
  };
}
function Ft(r) {
  const { options: e, descriptors: t, meta: n } = r, a = t.map((l) => l.color), i = e.hasExplicitIndex || e.list ? e.index : n.baseIndex, s = t[i - 1];
  if (!e.meta)
    return e.list ? a : s.color;
  const u = {
    ...n
  };
  return e.list ? {
    colors: a,
    base: u,
    steps: t.map(({ index: l, color: f, tone: h, chroma: p }) => ({
      index: l,
      color: f,
      tone: h,
      chroma: p
    }))
  } : {
    color: s.color,
    step: {
      index: s.index,
      tone: s.tone,
      chroma: s.chroma
    },
    base: u
  };
}
function Mt(r, e = {}) {
  return Ft(wt(r, e));
}
function Bt(r, e = {}) {
  const { dark: t, list: n, format: a = "hex", meta: i = !1 } = e, s = Math.max(1, Math.min(24, Number(e.steps) || 10)), l = e.index !== void 0 && e.index !== null && e.index !== "" ? Math.max(1, Math.min(s, Number(e.index))) : void 0, f = Math.max(0.1, Math.min(5, Number(e.curveGamma) || 1)), h = typeof e.mixColor == "string" ? e.mixColor : "", p = Math.max(0, Math.min(1, Number(e.mixRatio) || 0)), d = !!e.protectYellow;
  return Mt(r, {
    dark: t,
    list: n,
    meta: i,
    format: a,
    steps: s,
    index: l,
    curveGamma: f,
    mixColor: h,
    mixRatio: p,
    protectYellow: d
  });
}
function At(r = "#ffffff", e = "#000000", t = {}) {
  const { steps: n = 10, format: a = "hex", includeEnds: i = !0, curveGamma: s = 1 } = t, u = Math.max(1, Math.min(24, Number(n) || 10)), l = Math.max(0.1, Math.min(5, Number(s) || 1)), f = typeof t.mixColor == "string" ? t.mixColor : "", h = Math.max(0, Math.min(1, Number(t.mixRatio) || 0));
  let p = U(r), d = U(e);
  if (f && h > 0) {
    const y = U(f).hex().toLowerCase(), F = p.hex().toLowerCase(), w = d.hex().toLowerCase();
    p = U(le(oe.cam16Ucs(J(F), J(y), h))), d = U(le(oe.cam16Ucs(J(w), J(y), h)));
  }
  const C = i ? u : u + 2, P = Math.max(1, C - 1), g = [];
  for (let y = 0; y < C; y++) {
    const F = Math.pow(y / P, l), w = Math.round(p.red() + (d.red() - p.red()) * F), O = Math.round(p.green() + (d.green() - p.green()) * F), R = Math.round(p.blue() + (d.blue() - p.blue()) * F), E = fe(U({ r: w, g: O, b: R }), a);
    !i && (y === 0 || y === C - 1) || g.push(E);
  }
  return g;
}
const It = { generate: At }, Lt = {
  generate: Bt
}, Ot = It;
export {
  Ot as neutral,
  Lt as palette
};
