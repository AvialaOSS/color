import K from "color";
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
function Y(a) {
  return a < 0 ? -1 : a === 0 ? 0 : 1;
}
function re(a, e, t) {
  return (1 - t) * a + t * e;
}
function Oe(a, e, t) {
  return t < a ? a : t > e ? e : t;
}
function U(a, e, t) {
  return t < a ? a : t > e ? e : t;
}
function ue(a) {
  return a = a % 360, a < 0 && (a = a + 360), a;
}
function Ne(a, e) {
  return ue(e - a) <= 180 ? 1 : -1;
}
function Ve(a, e) {
  return 180 - Math.abs(Math.abs(a - e) - 180);
}
function pe(a, e) {
  const t = a[0] * e[0][0] + a[1] * e[0][1] + a[2] * e[0][2], r = a[0] * e[1][0] + a[1] * e[1][1] + a[2] * e[1][2], n = a[0] * e[2][0] + a[1] * e[2][1] + a[2] * e[2][2];
  return [t, r, n];
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
const _e = [
  [0.41233895, 0.35762064, 0.18051042],
  [0.2126, 0.7152, 0.0722],
  [0.01932141, 0.11916382, 0.95034478]
], Ue = [
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
], Ye = [95.047, 100, 108.883];
function ge(a, e, t) {
  return (255 << 24 | (a & 255) << 16 | (e & 255) << 8 | t & 255) >>> 0;
}
function Te(a) {
  const e = W(a[0]), t = W(a[1]), r = W(a[2]);
  return ge(e, t, r);
}
function we(a) {
  return a >> 16 & 255;
}
function Me(a) {
  return a >> 8 & 255;
}
function Be(a) {
  return a & 255;
}
function ze(a, e, t) {
  const r = Ue, n = r[0][0] * a + r[0][1] * e + r[0][2] * t, i = r[1][0] * a + r[1][1] * e + r[1][2] * t, c = r[2][0] * a + r[2][1] * e + r[2][2] * t, u = W(n), f = W(i), l = W(c);
  return ge(u, f, l);
}
function Ke(a) {
  const e = ee(we(a)), t = ee(Me(a)), r = ee(Be(a));
  return pe([e, t, r], _e);
}
function He(a) {
  const e = J(a), t = W(e);
  return ge(t, t, t);
}
function ye(a) {
  const e = Ke(a)[1];
  return 116 * ve(e / 100) - 16;
}
function J(a) {
  return 100 * Xe((a + 16) / 116);
}
function Pe(a) {
  return ve(a / 100) * 116 - 16;
}
function ee(a) {
  const e = a / 255;
  return e <= 0.040449936 ? e / 12.92 * 100 : Math.pow((e + 0.055) / 1.055, 2.4) * 100;
}
function W(a) {
  const e = a / 100;
  let t = 0;
  return e <= 31308e-7 ? t = e * 12.92 : t = 1.055 * Math.pow(e, 1 / 2.4) - 0.055, Oe(0, 255, Math.round(t * 255));
}
function je() {
  return Ye;
}
function ve(a) {
  const e = 0.008856451679035631, t = 24389 / 27;
  return a > e ? Math.pow(a, 1 / 3) : (t * a + 16) / 116;
}
function Xe(a) {
  const e = 0.008856451679035631, t = 24389 / 27, r = a * a * a;
  return r > e ? r : (116 * a - 16) / t;
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
class H {
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
  static make(e = je(), t = 200 / Math.PI * J(50) / 100, r = 50, n = 2, i = !1) {
    const c = e, u = c[0] * 0.401288 + c[1] * 0.650173 + c[2] * -0.051461, f = c[0] * -0.250268 + c[1] * 1.204414 + c[2] * 0.045854, l = c[0] * -2079e-6 + c[1] * 0.048952 + c[2] * 0.953127, h = 0.8 + n / 10, P = h >= 0.9 ? re(0.59, 0.69, (h - 0.9) * 10) : re(0.525, 0.59, (h - 0.8) * 10);
    let d = i ? 1 : h * (1 - 1 / 3.6 * Math.exp((-t - 42) / 92));
    d = d > 1 ? 1 : d < 0 ? 0 : d;
    const b = h, m = [
      d * (100 / u) + 1 - d,
      d * (100 / f) + 1 - d,
      d * (100 / l) + 1 - d
    ], y = 1 / (5 * t + 1), g = y * y * y * y, B = 1 - g, F = g * t + 0.1 * B * B * Math.cbrt(5 * t), I = J(r) / e[1], A = 1.48 + Math.sqrt(I), E = 0.725 / Math.pow(I, 0.2), M = E, w = [
      Math.pow(F * m[0] * u / 100, 0.42),
      Math.pow(F * m[1] * f / 100, 0.42),
      Math.pow(F * m[2] * l / 100, 0.42)
    ], N = [
      400 * w[0] / (w[0] + 27.13),
      400 * w[1] / (w[1] + 27.13),
      400 * w[2] / (w[2] + 27.13)
    ], _ = (2 * N[0] + N[1] + 0.05 * N[2]) * E;
    return new H(I, _, E, M, P, b, m, F, Math.pow(F, 0.25), A);
  }
  /**
   * Parameters are intermediate values of the CAM16 conversion process. Their
   * names are shorthand for technical color science terminology, this class
   * would not benefit from documenting them individually. A brief overview
   * is available in the CAM16 specification, and a complete overview requires
   * a color science textbook, such as Fairchild's Color Appearance Models.
   */
  constructor(e, t, r, n, i, c, u, f, l, h) {
    this.n = e, this.aw = t, this.nbb = r, this.ncb = n, this.c = i, this.nc = c, this.rgbD = u, this.fl = f, this.fLRoot = l, this.z = h;
  }
}
H.DEFAULT = H.make();
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
class V {
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
  constructor(e, t, r, n, i, c, u, f, l) {
    this.hue = e, this.chroma = t, this.j = r, this.q = n, this.m = i, this.s = c, this.jstar = u, this.astar = f, this.bstar = l;
  }
  /**
   * CAM16 instances also have coordinates in the CAM16-UCS space, called J*,
   * a*, b*, or jstar, astar, bstar in code. CAM16-UCS is included in the CAM16
   * specification, and is used to measure distances between colors.
   */
  distance(e) {
    const t = this.jstar - e.jstar, r = this.astar - e.astar, n = this.bstar - e.bstar, i = Math.sqrt(t * t + r * r + n * n);
    return 1.41 * Math.pow(i, 0.63);
  }
  /**
   * @param argb ARGB representation of a color.
   * @return CAM16 color, assuming the color was viewed in default viewing
   *     conditions.
   */
  static fromInt(e) {
    return V.fromIntInViewingConditions(e, H.DEFAULT);
  }
  /**
   * @param argb ARGB representation of a color.
   * @param viewingConditions Information about the environment where the color
   *     was observed.
   * @return CAM16 color.
   */
  static fromIntInViewingConditions(e, t) {
    const r = (e & 16711680) >> 16, n = (e & 65280) >> 8, i = e & 255, c = ee(r), u = ee(n), f = ee(i), l = 0.41233895 * c + 0.35762064 * u + 0.18051042 * f, h = 0.2126 * c + 0.7152 * u + 0.0722 * f, P = 0.01932141 * c + 0.11916382 * u + 0.95034478 * f, d = 0.401288 * l + 0.650173 * h - 0.051461 * P, b = -0.250268 * l + 1.204414 * h + 0.045854 * P, m = -2079e-6 * l + 0.048952 * h + 0.953127 * P, y = t.rgbD[0] * d, g = t.rgbD[1] * b, B = t.rgbD[2] * m, F = Math.pow(t.fl * Math.abs(y) / 100, 0.42), I = Math.pow(t.fl * Math.abs(g) / 100, 0.42), A = Math.pow(t.fl * Math.abs(B) / 100, 0.42), E = Y(y) * 400 * F / (F + 27.13), M = Y(g) * 400 * I / (I + 27.13), w = Y(B) * 400 * A / (A + 27.13), N = (11 * E + -12 * M + w) / 11, _ = (E + M - 2 * w) / 9, O = (20 * E + 20 * M + 21 * w) / 20, j = (40 * E + 20 * M + w) / 20, Z = Math.atan2(_, N) * 180 / Math.PI, z = ue(Z), ae = z * Math.PI / 180, oe = j * t.nbb, G = 100 * Math.pow(oe / t.aw, t.c * t.z), ie = 4 / t.c * Math.sqrt(G / 100) * (t.aw + 4) * t.fLRoot, fe = z < 20.14 ? z + 360 : z, he = 0.25 * (Math.cos(fe * Math.PI / 180 + 2) + 3.8), me = 5e4 / 13 * he * t.nc * t.ncb * Math.sqrt(N * N + _ * _) / (O + 0.305), se = Math.pow(me, 0.9) * Math.pow(1.64 - Math.pow(0.29, t.n), 0.73), be = se * Math.sqrt(G / 100), Se = be * t.fLRoot, Le = 50 * Math.sqrt(se * t.c / (t.aw + 4)), Ae = (1 + 100 * 7e-3) * G / (1 + 7e-3 * G), Ce = 1 / 0.0228 * Math.log(1 + 0.0228 * Se), Ee = Ce * Math.cos(ae), Re = Ce * Math.sin(ae);
    return new V(z, be, G, ie, Se, Le, Ae, Ee, Re);
  }
  /**
   * @param j CAM16 lightness
   * @param c CAM16 chroma
   * @param h CAM16 hue
   */
  static fromJch(e, t, r) {
    return V.fromJchInViewingConditions(e, t, r, H.DEFAULT);
  }
  /**
   * @param j CAM16 lightness
   * @param c CAM16 chroma
   * @param h CAM16 hue
   * @param viewingConditions Information about the environment where the color
   *     was observed.
   */
  static fromJchInViewingConditions(e, t, r, n) {
    const i = 4 / n.c * Math.sqrt(e / 100) * (n.aw + 4) * n.fLRoot, c = t * n.fLRoot, u = t / Math.sqrt(e / 100), f = 50 * Math.sqrt(u * n.c / (n.aw + 4)), l = r * Math.PI / 180, h = (1 + 100 * 7e-3) * e / (1 + 7e-3 * e), P = 1 / 0.0228 * Math.log(1 + 0.0228 * c), d = P * Math.cos(l), b = P * Math.sin(l);
    return new V(r, t, e, i, c, f, h, d, b);
  }
  /**
   * @param jstar CAM16-UCS lightness.
   * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
   *     coordinate on the Y axis.
   * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
   *     coordinate on the X axis.
   */
  static fromUcs(e, t, r) {
    return V.fromUcsInViewingConditions(e, t, r, H.DEFAULT);
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
  static fromUcsInViewingConditions(e, t, r, n) {
    const i = t, c = r, u = Math.sqrt(i * i + c * c), l = (Math.exp(u * 0.0228) - 1) / 0.0228 / n.fLRoot;
    let h = Math.atan2(c, i) * (180 / Math.PI);
    h < 0 && (h += 360);
    const P = e / (1 - (e - 100) * 7e-3);
    return V.fromJchInViewingConditions(P, l, h, n);
  }
  /**
   *  @return ARGB representation of color, assuming the color was viewed in
   *     default viewing conditions, which are near-identical to the default
   *     viewing conditions for sRGB.
   */
  toInt() {
    return this.viewed(H.DEFAULT);
  }
  /**
   * @param viewingConditions Information about the environment where the color
   *     will be viewed.
   * @return ARGB representation of color
   */
  viewed(e) {
    const t = this.chroma === 0 || this.j === 0 ? 0 : this.chroma / Math.sqrt(this.j / 100), r = Math.pow(t / Math.pow(1.64 - Math.pow(0.29, e.n), 0.73), 1 / 0.9), n = this.hue * Math.PI / 180, i = 0.25 * (Math.cos(n + 2) + 3.8), c = e.aw * Math.pow(this.j / 100, 1 / e.c / e.z), u = i * (5e4 / 13) * e.nc * e.ncb, f = c / e.nbb, l = Math.sin(n), h = Math.cos(n), P = 23 * (f + 0.305) * r / (23 * u + 11 * r * h + 108 * r * l), d = P * h, b = P * l, m = (460 * f + 451 * d + 288 * b) / 1403, y = (460 * f - 891 * d - 261 * b) / 1403, g = (460 * f - 220 * d - 6300 * b) / 1403, B = Math.max(0, 27.13 * Math.abs(m) / (400 - Math.abs(m))), F = Y(m) * (100 / e.fl) * Math.pow(B, 1 / 0.42), I = Math.max(0, 27.13 * Math.abs(y) / (400 - Math.abs(y))), A = Y(y) * (100 / e.fl) * Math.pow(I, 1 / 0.42), E = Math.max(0, 27.13 * Math.abs(g) / (400 - Math.abs(g))), M = Y(g) * (100 / e.fl) * Math.pow(E, 1 / 0.42), w = F / e.rgbD[0], N = A / e.rgbD[1], _ = M / e.rgbD[2], O = 1.86206786 * w - 1.01125463 * N + 0.14918677 * _, j = 0.38752654 * w + 0.62144744 * N - 897398e-8 * _, q = -0.0158415 * w - 0.03412294 * N + 1.04996444 * _;
    return ze(O, j, q);
  }
  /// Given color expressed in XYZ and viewed in [viewingConditions], convert to
  /// CAM16.
  static fromXyzInViewingConditions(e, t, r, n) {
    const i = 0.401288 * e + 0.650173 * t - 0.051461 * r, c = -0.250268 * e + 1.204414 * t + 0.045854 * r, u = -2079e-6 * e + 0.048952 * t + 0.953127 * r, f = n.rgbD[0] * i, l = n.rgbD[1] * c, h = n.rgbD[2] * u, P = Math.pow(n.fl * Math.abs(f) / 100, 0.42), d = Math.pow(n.fl * Math.abs(l) / 100, 0.42), b = Math.pow(n.fl * Math.abs(h) / 100, 0.42), m = Y(f) * 400 * P / (P + 27.13), y = Y(l) * 400 * d / (d + 27.13), g = Y(h) * 400 * b / (b + 27.13), B = (11 * m + -12 * y + g) / 11, F = (m + y - 2 * g) / 9, I = (20 * m + 20 * y + 21 * g) / 20, A = (40 * m + 20 * y + g) / 20, M = Math.atan2(F, B) * 180 / Math.PI, w = M < 0 ? M + 360 : M >= 360 ? M - 360 : M, N = w * Math.PI / 180, _ = A * n.nbb, O = 100 * Math.pow(_ / n.aw, n.c * n.z), j = 4 / n.c * Math.sqrt(O / 100) * (n.aw + 4) * n.fLRoot, q = w < 20.14 ? w + 360 : w, Z = 1 / 4 * (Math.cos(q * Math.PI / 180 + 2) + 3.8), ae = 5e4 / 13 * Z * n.nc * n.ncb * Math.sqrt(B * B + F * F) / (I + 0.305), oe = Math.pow(ae, 0.9) * Math.pow(1.64 - Math.pow(0.29, n.n), 0.73), G = oe * Math.sqrt(O / 100), ie = G * n.fLRoot, fe = 50 * Math.sqrt(oe * n.c / (n.aw + 4)), he = (1 + 100 * 7e-3) * O / (1 + 7e-3 * O), de = Math.log(1 + 0.0228 * ie) / 0.0228, me = de * Math.cos(N), se = de * Math.sin(N);
    return new V(w, G, O, j, ie, fe, he, me, se);
  }
  /// XYZ representation of CAM16 seen in [viewingConditions].
  xyzInViewingConditions(e) {
    const t = this.chroma === 0 || this.j === 0 ? 0 : this.chroma / Math.sqrt(this.j / 100), r = Math.pow(t / Math.pow(1.64 - Math.pow(0.29, e.n), 0.73), 1 / 0.9), n = this.hue * Math.PI / 180, i = 0.25 * (Math.cos(n + 2) + 3.8), c = e.aw * Math.pow(this.j / 100, 1 / e.c / e.z), u = i * (5e4 / 13) * e.nc * e.ncb, f = c / e.nbb, l = Math.sin(n), h = Math.cos(n), P = 23 * (f + 0.305) * r / (23 * u + 11 * r * h + 108 * r * l), d = P * h, b = P * l, m = (460 * f + 451 * d + 288 * b) / 1403, y = (460 * f - 891 * d - 261 * b) / 1403, g = (460 * f - 220 * d - 6300 * b) / 1403, B = Math.max(0, 27.13 * Math.abs(m) / (400 - Math.abs(m))), F = Y(m) * (100 / e.fl) * Math.pow(B, 1 / 0.42), I = Math.max(0, 27.13 * Math.abs(y) / (400 - Math.abs(y))), A = Y(y) * (100 / e.fl) * Math.pow(I, 1 / 0.42), E = Math.max(0, 27.13 * Math.abs(g) / (400 - Math.abs(g))), M = Y(g) * (100 / e.fl) * Math.pow(E, 1 / 0.42), w = F / e.rgbD[0], N = A / e.rgbD[1], _ = M / e.rgbD[2], O = 1.86206786 * w - 1.01125463 * N + 0.14918677 * _, j = 0.38752654 * w + 0.62144744 * N - 897398e-8 * _, q = -0.0158415 * w - 0.03412294 * N + 1.04996444 * _;
    return [O, j, q];
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
class C {
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
    let r = 0;
    return t <= 31308e-7 ? r = t * 12.92 : r = 1.055 * Math.pow(t, 1 / 2.4) - 0.055, r * 255;
  }
  static chromaticAdaptation(e) {
    const t = Math.pow(Math.abs(e), 0.42);
    return Y(e) * 400 * t / (t + 27.13);
  }
  /**
   * Returns the hue of a linear RGB color in CAM16.
   *
   * @param linrgb The linear RGB coordinates of a color.
   * @return The hue of the color in CAM16, in radians.
   */
  static hueOf(e) {
    const t = pe(e, C.SCALED_DISCOUNT_FROM_LINRGB), r = C.chromaticAdaptation(t[0]), n = C.chromaticAdaptation(t[1]), i = C.chromaticAdaptation(t[2]), c = (11 * r + -12 * n + i) / 11, u = (r + n - 2 * i) / 9;
    return Math.atan2(u, c);
  }
  static areInCyclicOrder(e, t, r) {
    const n = C.sanitizeRadians(t - e), i = C.sanitizeRadians(r - e);
    return n < i;
  }
  /**
   * Solves the lerp equation.
   *
   * @param source The starting number.
   * @param mid The number in the middle.
   * @param target The ending number.
   * @return A number t such that lerp(source, target, t) = mid.
   */
  static intercept(e, t, r) {
    return (t - e) / (r - e);
  }
  static lerpPoint(e, t, r) {
    return [
      e[0] + (r[0] - e[0]) * t,
      e[1] + (r[1] - e[1]) * t,
      e[2] + (r[2] - e[2]) * t
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
  static setCoordinate(e, t, r, n) {
    const i = C.intercept(e[n], t, r[n]);
    return C.lerpPoint(e, i, r);
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
    const r = C.Y_FROM_LINRGB[0], n = C.Y_FROM_LINRGB[1], i = C.Y_FROM_LINRGB[2], c = t % 4 <= 1 ? 0 : 100, u = t % 2 === 0 ? 0 : 100;
    if (t < 4) {
      const f = c, l = u, h = (e - f * n - l * i) / r;
      return C.isBounded(h) ? [h, f, l] : [-1, -1, -1];
    } else if (t < 8) {
      const f = c, l = u, h = (e - l * r - f * i) / n;
      return C.isBounded(h) ? [l, h, f] : [-1, -1, -1];
    } else {
      const f = c, l = u, h = (e - f * r - l * n) / i;
      return C.isBounded(h) ? [f, l, h] : [-1, -1, -1];
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
    let r = [-1, -1, -1], n = r, i = 0, c = 0, u = !1, f = !0;
    for (let l = 0; l < 12; l++) {
      const h = C.nthVertex(e, l);
      if (h[0] < 0)
        continue;
      const P = C.hueOf(h);
      if (!u) {
        r = h, n = h, i = P, c = P, u = !0;
        continue;
      }
      (f || C.areInCyclicOrder(i, P, c)) && (f = !1, C.areInCyclicOrder(i, t, P) ? (n = h, c = P) : (r = h, i = P));
    }
    return [r, n];
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
    const r = C.bisectToSegment(e, t);
    let n = r[0], i = C.hueOf(n), c = r[1];
    for (let u = 0; u < 3; u++)
      if (n[u] !== c[u]) {
        let f = -1, l = 255;
        n[u] < c[u] ? (f = C.criticalPlaneBelow(C.trueDelinearized(n[u])), l = C.criticalPlaneAbove(C.trueDelinearized(c[u]))) : (f = C.criticalPlaneAbove(C.trueDelinearized(n[u])), l = C.criticalPlaneBelow(C.trueDelinearized(c[u])));
        for (let h = 0; h < 8 && !(Math.abs(l - f) <= 1); h++) {
          const P = Math.floor((f + l) / 2), d = C.CRITICAL_PLANES[P], b = C.setCoordinate(n, d, c, u), m = C.hueOf(b);
          C.areInCyclicOrder(i, t, m) ? (c = b, l = P) : (n = b, i = m, f = P);
        }
      }
    return C.midpoint(n, c);
  }
  static inverseChromaticAdaptation(e) {
    const t = Math.abs(e), r = Math.max(0, 27.13 * t / (400 - t));
    return Y(e) * Math.pow(r, 1 / 0.42);
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
  static findResultByJ(e, t, r) {
    let n = Math.sqrt(r) * 11;
    const i = H.DEFAULT, c = 1 / Math.pow(1.64 - Math.pow(0.29, i.n), 0.73), f = 0.25 * (Math.cos(e + 2) + 3.8) * (5e4 / 13) * i.nc * i.ncb, l = Math.sin(e), h = Math.cos(e);
    for (let P = 0; P < 5; P++) {
      const d = n / 100, b = t === 0 || n === 0 ? 0 : t / Math.sqrt(d), m = Math.pow(b * c, 1 / 0.9), g = i.aw * Math.pow(d, 1 / i.c / i.z) / i.nbb, B = 23 * (g + 0.305) * m / (23 * f + 11 * m * h + 108 * m * l), F = B * h, I = B * l, A = (460 * g + 451 * F + 288 * I) / 1403, E = (460 * g - 891 * F - 261 * I) / 1403, M = (460 * g - 220 * F - 6300 * I) / 1403, w = C.inverseChromaticAdaptation(A), N = C.inverseChromaticAdaptation(E), _ = C.inverseChromaticAdaptation(M), O = pe([w, N, _], C.LINRGB_FROM_SCALED_DISCOUNT);
      if (O[0] < 0 || O[1] < 0 || O[2] < 0)
        return 0;
      const j = C.Y_FROM_LINRGB[0], q = C.Y_FROM_LINRGB[1], Z = C.Y_FROM_LINRGB[2], z = j * O[0] + q * O[1] + Z * O[2];
      if (z <= 0)
        return 0;
      if (P === 4 || Math.abs(z - r) < 2e-3)
        return O[0] > 100.01 || O[1] > 100.01 || O[2] > 100.01 ? 0 : Te(O);
      n = n - (z - r) * n / (2 * z);
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
  static solveToInt(e, t, r) {
    if (t < 1e-4 || r < 1e-4 || r > 99.9999)
      return He(r);
    e = ue(e);
    const n = e / 180 * Math.PI, i = J(r), c = C.findResultByJ(n, t, i);
    if (c !== 0)
      return c;
    const u = C.bisectToLimit(i, n);
    return Te(u);
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
  static solveToCam(e, t, r) {
    return V.fromInt(C.solveToInt(e, t, r));
  }
}
C.SCALED_DISCOUNT_FROM_LINRGB = [
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
C.LINRGB_FROM_SCALED_DISCOUNT = [
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
C.Y_FROM_LINRGB = [0.2126, 0.7152, 0.0722];
C.CRITICAL_PLANES = [
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
class D {
  static from(e, t, r) {
    return new D(C.solveToInt(e, t, r));
  }
  /**
   * @param argb ARGB representation of a color.
   * @return HCT representation of a color in default viewing conditions
   */
  static fromInt(e) {
    return new D(e);
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
    this.setInternalState(C.solveToInt(e, this.internalChroma, this.internalTone));
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
    this.setInternalState(C.solveToInt(this.internalHue, e, this.internalTone));
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
    this.setInternalState(C.solveToInt(this.internalHue, this.internalChroma, e));
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
    const t = V.fromInt(e);
    this.internalHue = t.hue, this.internalChroma = t.chroma, this.internalTone = ye(e), this.argb = e;
  }
  setInternalState(e) {
    const t = V.fromInt(e);
    this.internalHue = t.hue, this.internalChroma = t.chroma, this.internalTone = ye(e), this.argb = e;
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
    const r = V.fromInt(this.toInt()).xyzInViewingConditions(e), n = V.fromXyzInViewingConditions(r[0], r[1], r[2], H.make());
    return D.from(n.hue, n.chroma, Pe(r[1]));
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
class le {
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
    const r = D.fromInt(e), n = D.fromInt(t), i = Ve(r.hue, n.hue), c = Math.min(i * 0.5, 15), u = ue(r.hue + c * Ne(r.hue, n.hue));
    return D.from(u, r.chroma, r.tone).toInt();
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
  static hctHue(e, t, r) {
    const n = le.cam16Ucs(e, t, r), i = V.fromInt(n), c = V.fromInt(e);
    return D.from(i.hue, c.chroma, ye(e)).toInt();
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
  static cam16Ucs(e, t, r) {
    const n = V.fromInt(e), i = V.fromInt(t), c = n.jstar, u = n.astar, f = n.bstar, l = i.jstar, h = i.astar, P = i.bstar, d = c + (l - c) * r, b = u + (h - u) * r, m = f + (P - f) * r;
    return V.fromUcs(d, b, m).toInt();
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
class L {
  /**
   * Returns a contrast ratio, which ranges from 1 to 21.
   *
   * @param toneA Tone between 0 and 100. Values outside will be clamped.
   * @param toneB Tone between 0 and 100. Values outside will be clamped.
   */
  static ratioOfTones(e, t) {
    return e = U(0, 100, e), t = U(0, 100, t), L.ratioOfYs(J(e), J(t));
  }
  static ratioOfYs(e, t) {
    const r = e > t ? e : t, n = r === t ? e : t;
    return (r + 5) / (n + 5);
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
    const r = J(e), n = t * (r + 5) - 5, i = L.ratioOfYs(n, r), c = Math.abs(i - t);
    if (i < t && c > 0.04)
      return -1;
    const u = Pe(n) + 0.4;
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
    const r = J(e), n = (r + 5) / t - 5, i = L.ratioOfYs(r, n), c = Math.abs(i - t);
    if (i < t && c > 0.04)
      return -1;
    const u = Pe(n) - 0.4;
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
    const r = L.lighter(e, t);
    return r < 0 ? 100 : r;
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
    const r = L.darker(e, t);
    return r < 0 ? 0 : r;
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
class ke {
  /**
   * Returns true if a color is disliked.
   *
   * @param hct A color to be judged.
   * @return Whether the color is disliked.
   *
   * Disliked is defined as a dark yellow-green that is not neutral.
   */
  static isDisliked(e) {
    const t = Math.round(e.hue) >= 90 && Math.round(e.hue) <= 111, r = Math.round(e.chroma) > 16, n = Math.round(e.tone) < 65;
    return t && r && n;
  }
  /**
   * If a color is disliked, lighten it to make it likable.
   *
   * @param hct A color to be judged.
   * @return A new color if the original color is disliked, or the original
   *   color if it is acceptable.
   */
  static fixIfDisliked(e) {
    return ke.isDisliked(e) ? D.from(e.hue, e.chroma, 70) : e;
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
function qe(a, e, t) {
  if (a.name !== t.name)
    throw new Error(`Attempting to extend color ${a.name} with color ${t.name} of different name for spec version ${e}.`);
  if (a.isBackground !== t.isBackground)
    throw new Error(`Attempting to extend color ${a.name} as a ${a.isBackground ? "background" : "foreground"} with color ${t.name} as a ${t.isBackground ? "background" : "foreground"} for spec version ${e}.`);
}
function T(a, e, t) {
  return qe(a, e, t), s.fromPalette({
    name: a.name,
    palette: (r) => r.specVersion === e ? t.palette(r) : a.palette(r),
    tone: (r) => r.specVersion === e ? t.tone(r) : a.tone(r),
    isBackground: a.isBackground,
    chromaMultiplier: (r) => {
      const n = r.specVersion === e ? t.chromaMultiplier : a.chromaMultiplier;
      return n !== void 0 ? n(r) : 1;
    },
    background: (r) => {
      const n = r.specVersion === e ? t.background : a.background;
      return n !== void 0 ? n(r) : void 0;
    },
    secondBackground: (r) => {
      const n = r.specVersion === e ? t.secondBackground : a.secondBackground;
      return n !== void 0 ? n(r) : void 0;
    },
    contrastCurve: (r) => {
      const n = r.specVersion === e ? t.contrastCurve : a.contrastCurve;
      return n !== void 0 ? n(r) : void 0;
    },
    toneDeltaPair: (r) => {
      const n = r.specVersion === e ? t.toneDeltaPair : a.toneDeltaPair;
      return n !== void 0 ? n(r) : void 0;
    }
  });
}
class s {
  /**
   * Create a DynamicColor defined by a TonalPalette and HCT tone.
   *
   * @param args Functions with DynamicScheme as input. Must provide a palette
   *     and tone. May provide a background DynamicColor and ToneDeltaPair.
   */
  static fromPalette(e) {
    return new s(e.name ?? "", e.palette, e.tone ?? s.getInitialToneFromBackground(e.background), e.isBackground ?? !1, e.chromaMultiplier, e.background, e.secondBackground, e.contrastCurve, e.toneDeltaPair);
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
  constructor(e, t, r, n, i, c, u, f, l) {
    if (this.name = e, this.palette = t, this.tone = r, this.isBackground = n, this.chromaMultiplier = i, this.background = c, this.secondBackground = u, this.contrastCurve = f, this.toneDeltaPair = l, this.hctCache = /* @__PURE__ */ new Map(), !c && u)
      throw new Error(`Color ${e} has secondBackgrounddefined, but background is not defined.`);
    if (!c && f)
      throw new Error(`Color ${e} has contrastCurvedefined, but background is not defined.`);
    if (c && !f)
      throw new Error(`Color ${e} has backgrounddefined, but contrastCurve is not defined.`);
  }
  /**
   * Returns a deep copy of this DynamicColor.
   */
  clone() {
    return s.fromPalette({
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
    const r = De(e.specVersion).getHct(e, this);
    return this.hctCache.size > 4 && this.hctCache.clear(), this.hctCache.set(e, r), r;
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
    return De(e.specVersion).getTone(e, this);
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
    const r = L.lighterUnsafe(e, t), n = L.darkerUnsafe(e, t), i = L.ratioOfTones(r, e), c = L.ratioOfTones(n, e);
    if (s.tonePrefersLightForeground(e)) {
      const f = Math.abs(i - c) < 0.1 && i < t && c < t;
      return i >= t || i >= c || f ? r : n;
    } else
      return c >= t || c >= i ? n : r;
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
    return s.tonePrefersLightForeground(e) && !s.toneAllowsLightForeground(e) ? 49 : e;
  }
}
class Ge {
  getHct(e, t) {
    const r = t.getTone(e);
    return t.palette(e).getHct(r);
  }
  getTone(e, t) {
    const r = e.contrastLevel < 0, n = t.toneDeltaPair ? t.toneDeltaPair(e) : void 0;
    if (n) {
      const i = n.roleA, c = n.roleB, u = n.delta, f = n.polarity, l = n.stayTogether, h = f === "nearer" || f === "lighter" && !e.isDark || f === "darker" && e.isDark, P = h ? i : c, d = h ? c : i, b = t.name === P.name, m = e.isDark ? 1 : -1;
      let y = P.tone(e), g = d.tone(e);
      if (t.background && P.contrastCurve && d.contrastCurve) {
        const B = t.background(e), F = P.contrastCurve(e), I = d.contrastCurve(e);
        if (B && F && I) {
          const A = B.getTone(e), E = F.get(e.contrastLevel), M = I.get(e.contrastLevel);
          L.ratioOfTones(A, y) < E && (y = s.foregroundTone(A, E)), L.ratioOfTones(A, g) < M && (g = s.foregroundTone(A, M)), r && (y = s.foregroundTone(A, E), g = s.foregroundTone(A, M));
        }
      }
      return (g - y) * m < u && (g = U(0, 100, y + u * m), (g - y) * m >= u || (y = U(0, 100, g - u * m))), 50 <= y && y < 60 ? m > 0 ? (y = 60, g = Math.max(g, y + u * m)) : (y = 49, g = Math.min(g, y + u * m)) : 50 <= g && g < 60 && (l ? m > 0 ? (y = 60, g = Math.max(g, y + u * m)) : (y = 49, g = Math.min(g, y + u * m)) : m > 0 ? g = 60 : g = 49), b ? y : g;
    } else {
      let i = t.tone(e);
      if (t.background == null || t.background(e) === void 0 || t.contrastCurve == null || t.contrastCurve(e) === void 0)
        return i;
      const c = t.background(e).getTone(e), u = t.contrastCurve(e).get(e.contrastLevel);
      if (L.ratioOfTones(c, i) >= u || (i = s.foregroundTone(c, u)), r && (i = s.foregroundTone(c, u)), t.isBackground && 50 <= i && i < 60 && (L.ratioOfTones(49, c) >= u ? i = 49 : i = 60), t.secondBackground == null || t.secondBackground(e) === void 0)
        return i;
      const [f, l] = [t.background, t.secondBackground], [h, P] = [f(e).getTone(e), l(e).getTone(e)], [d, b] = [Math.max(h, P), Math.min(h, P)];
      if (L.ratioOfTones(d, i) >= u && L.ratioOfTones(b, i) >= u)
        return i;
      const m = L.lighter(d, u), y = L.darker(b, u), g = [];
      return m !== -1 && g.push(m), y !== -1 && g.push(y), s.tonePrefersLightForeground(h) || s.tonePrefersLightForeground(P) ? m < 0 ? 100 : m : g.length === 1 ? g[0] : y < 0 ? 0 : y;
    }
  }
}
class $e {
  getHct(e, t) {
    const r = t.palette(e), n = t.getTone(e), i = r.hue, c = r.chroma * (t.chromaMultiplier ? t.chromaMultiplier(e) : 1);
    return D.from(i, c, n);
  }
  getTone(e, t) {
    const r = t.toneDeltaPair ? t.toneDeltaPair(e) : void 0;
    if (r) {
      const n = r.roleA, i = r.roleB, c = r.polarity, u = r.constraint, f = c === "darker" || c === "relative_lighter" && e.isDark || c === "relative_darker" && !e.isDark ? -r.delta : r.delta, l = t.name === n.name, h = l ? n : i, P = l ? i : n;
      let d = h.tone(e), b = P.getTone(e);
      const m = f * (l ? 1 : -1);
      if (u === "exact" ? d = U(0, 100, b + m) : u === "nearer" ? m > 0 ? d = U(0, 100, U(b, b + m, d)) : d = U(0, 100, U(b + m, b, d)) : u === "farther" && (m > 0 ? d = U(b + m, 100, d) : d = U(0, b + m, d)), t.background && t.contrastCurve) {
        const y = t.background(e), g = t.contrastCurve(e);
        if (y && g) {
          const B = y.getTone(e), F = g.get(e.contrastLevel);
          d = L.ratioOfTones(B, d) >= F && e.contrastLevel >= 0 ? d : s.foregroundTone(B, F);
        }
      }
      return t.isBackground && !t.name.endsWith("_fixed_dim") && (d >= 57 ? d = U(65, 100, d) : d = U(0, 49, d)), d;
    } else {
      let n = t.tone(e);
      if (t.background == null || t.background(e) === void 0 || t.contrastCurve == null || t.contrastCurve(e) === void 0)
        return n;
      const i = t.background(e).getTone(e), c = t.contrastCurve(e).get(e.contrastLevel);
      if (n = L.ratioOfTones(i, n) >= c && e.contrastLevel >= 0 ? n : s.foregroundTone(i, c), t.isBackground && !t.name.endsWith("_fixed_dim") && (n >= 57 ? n = U(65, 100, n) : n = U(0, 49, n)), t.secondBackground == null || t.secondBackground(e) === void 0)
        return n;
      const [u, f] = [t.background, t.secondBackground], [l, h] = [u(e).getTone(e), f(e).getTone(e)], [P, d] = [Math.max(l, h), Math.min(l, h)];
      if (L.ratioOfTones(P, n) >= c && L.ratioOfTones(d, n) >= c)
        return n;
      const b = L.lighter(P, c), m = L.darker(d, c), y = [];
      return b !== -1 && y.push(b), m !== -1 && y.push(m), s.tonePrefersLightForeground(l) || s.tonePrefersLightForeground(h) ? b < 0 ? 100 : b : y.length === 1 ? y[0] : m < 0 ? 0 : m;
    }
  }
}
const Je = new Ge(), We = new $e();
function De(a) {
  return a === "2025" ? We : Je;
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
  constructor(e, t, r, n) {
    this.low = e, this.normal = t, this.medium = r, this.high = n;
  }
  /**
   * Returns the value at a given contrast level.
   *
   * @param contrastLevel The contrast level. 0.0 is the default (normal); -1.0
   *     is the lowest; 1.0 is the highest.
   * @return The value. For contrast ratios, a number between 1.0 and 21.0.
   */
  get(e) {
    return e <= -1 ? this.low : e < 0 ? re(this.low, this.normal, (e - -1) / 1) : e < 0.5 ? re(this.normal, this.medium, (e - 0) / 0.5) : e < 1 ? re(this.medium, this.high, (e - 0.5) / 0.5) : this.high;
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
class v {
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
  constructor(e, t, r, n, i, c) {
    this.roleA = e, this.roleB = t, this.delta = r, this.polarity = n, this.stayTogether = i, this.constraint = c, this.constraint = c ?? "exact";
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
var p;
(function(a) {
  a[a.MONOCHROME = 0] = "MONOCHROME", a[a.NEUTRAL = 1] = "NEUTRAL", a[a.TONAL_SPOT = 2] = "TONAL_SPOT", a[a.VIBRANT = 3] = "VIBRANT", a[a.EXPRESSIVE = 4] = "EXPRESSIVE", a[a.FIDELITY = 5] = "FIDELITY", a[a.CONTENT = 6] = "CONTENT", a[a.RAINBOW = 7] = "RAINBOW", a[a.FRUIT_SALAD = 8] = "FRUIT_SALAD";
})(p || (p = {}));
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
function Q(a) {
  return a.variant === p.FIDELITY || a.variant === p.CONTENT;
}
function R(a) {
  return a.variant === p.MONOCHROME;
}
function Ze(a, e, t, r) {
  let n = t, i = D.from(a, e, t);
  if (i.chroma < e) {
    let c = i.chroma;
    for (; i.chroma < e; ) {
      n += r ? -1 : 1;
      const u = D.from(a, e, n);
      if (c > u.chroma || Math.abs(u.chroma - e) < 0.4)
        break;
      const f = Math.abs(u.chroma - e), l = Math.abs(i.chroma - e);
      f < l && (i = u), c = Math.max(c, u.chroma);
    }
  }
  return n;
}
class Qe {
  ////////////////////////////////////////////////////////////////
  // Main Palettes                                              //
  ////////////////////////////////////////////////////////////////
  primaryPaletteKeyColor() {
    return s.fromPalette({
      name: "primary_palette_key_color",
      palette: (e) => e.primaryPalette,
      tone: (e) => e.primaryPalette.keyColor.tone
    });
  }
  secondaryPaletteKeyColor() {
    return s.fromPalette({
      name: "secondary_palette_key_color",
      palette: (e) => e.secondaryPalette,
      tone: (e) => e.secondaryPalette.keyColor.tone
    });
  }
  tertiaryPaletteKeyColor() {
    return s.fromPalette({
      name: "tertiary_palette_key_color",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => e.tertiaryPalette.keyColor.tone
    });
  }
  neutralPaletteKeyColor() {
    return s.fromPalette({
      name: "neutral_palette_key_color",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.neutralPalette.keyColor.tone
    });
  }
  neutralVariantPaletteKeyColor() {
    return s.fromPalette({
      name: "neutral_variant_palette_key_color",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.neutralVariantPalette.keyColor.tone
    });
  }
  errorPaletteKeyColor() {
    return s.fromPalette({
      name: "error_palette_key_color",
      palette: (e) => e.errorPalette,
      tone: (e) => e.errorPalette.keyColor.tone
    });
  }
  ////////////////////////////////////////////////////////////////
  // Surfaces [S]                                               //
  ////////////////////////////////////////////////////////////////
  background() {
    return s.fromPalette({
      name: "background",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 6 : 98,
      isBackground: !0
    });
  }
  onBackground() {
    return s.fromPalette({
      name: "on_background",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 90 : 10,
      background: (e) => this.background(),
      contrastCurve: (e) => new k(3, 3, 4.5, 7)
    });
  }
  surface() {
    return s.fromPalette({
      name: "surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 6 : 98,
      isBackground: !0
    });
  }
  surfaceDim() {
    return s.fromPalette({
      name: "surface_dim",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 6 : new k(87, 87, 80, 75).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceBright() {
    return s.fromPalette({
      name: "surface_bright",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(24, 24, 29, 34).get(e.contrastLevel) : 98,
      isBackground: !0
    });
  }
  surfaceContainerLowest() {
    return s.fromPalette({
      name: "surface_container_lowest",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(4, 4, 2, 0).get(e.contrastLevel) : 100,
      isBackground: !0
    });
  }
  surfaceContainerLow() {
    return s.fromPalette({
      name: "surface_container_low",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(10, 10, 11, 12).get(e.contrastLevel) : new k(96, 96, 96, 95).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainer() {
    return s.fromPalette({
      name: "surface_container",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(12, 12, 16, 20).get(e.contrastLevel) : new k(94, 94, 92, 90).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainerHigh() {
    return s.fromPalette({
      name: "surface_container_high",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(17, 17, 21, 25).get(e.contrastLevel) : new k(92, 92, 88, 85).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainerHighest() {
    return s.fromPalette({
      name: "surface_container_highest",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new k(22, 22, 26, 30).get(e.contrastLevel) : new k(90, 90, 84, 80).get(e.contrastLevel),
      isBackground: !0
    });
  }
  onSurface() {
    return s.fromPalette({
      name: "on_surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 90 : 10,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  surfaceVariant() {
    return s.fromPalette({
      name: "surface_variant",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 30 : 90,
      isBackground: !0
    });
  }
  onSurfaceVariant() {
    return s.fromPalette({
      name: "on_surface_variant",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 80 : 30,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  inverseSurface() {
    return s.fromPalette({
      name: "inverse_surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 90 : 20,
      isBackground: !0
    });
  }
  inverseOnSurface() {
    return s.fromPalette({
      name: "inverse_on_surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 20 : 95,
      background: (e) => this.inverseSurface(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  outline() {
    return s.fromPalette({
      name: "outline",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 60 : 50,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1.5, 3, 4.5, 7)
    });
  }
  outlineVariant() {
    return s.fromPalette({
      name: "outline_variant",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 30 : 80,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5)
    });
  }
  shadow() {
    return s.fromPalette({
      name: "shadow",
      palette: (e) => e.neutralPalette,
      tone: (e) => 0
    });
  }
  scrim() {
    return s.fromPalette({
      name: "scrim",
      palette: (e) => e.neutralPalette,
      tone: (e) => 0
    });
  }
  surfaceTint() {
    return s.fromPalette({
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
    return s.fromPalette({
      name: "primary",
      palette: (e) => e.primaryPalette,
      tone: (e) => R(e) ? e.isDark ? 100 : 0 : e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new v(this.primaryContainer(), this.primary(), 10, "nearer", !1)
    });
  }
  primaryDim() {
  }
  onPrimary() {
    return s.fromPalette({
      name: "on_primary",
      palette: (e) => e.primaryPalette,
      tone: (e) => R(e) ? e.isDark ? 10 : 90 : e.isDark ? 20 : 100,
      background: (e) => this.primary(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  primaryContainer() {
    return s.fromPalette({
      name: "primary_container",
      palette: (e) => e.primaryPalette,
      tone: (e) => Q(e) ? e.sourceColorHct.tone : R(e) ? e.isDark ? 85 : 25 : e.isDark ? 30 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new v(this.primaryContainer(), this.primary(), 10, "nearer", !1)
    });
  }
  onPrimaryContainer() {
    return s.fromPalette({
      name: "on_primary_container",
      palette: (e) => e.primaryPalette,
      tone: (e) => Q(e) ? s.foregroundTone(this.primaryContainer().tone(e), 4.5) : R(e) ? e.isDark ? 0 : 100 : e.isDark ? 90 : 30,
      background: (e) => this.primaryContainer(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  inversePrimary() {
    return s.fromPalette({
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
    return s.fromPalette({
      name: "secondary",
      palette: (e) => e.secondaryPalette,
      tone: (e) => e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new v(this.secondaryContainer(), this.secondary(), 10, "nearer", !1)
    });
  }
  secondaryDim() {
  }
  onSecondary() {
    return s.fromPalette({
      name: "on_secondary",
      palette: (e) => e.secondaryPalette,
      tone: (e) => R(e) ? e.isDark ? 10 : 100 : e.isDark ? 20 : 100,
      background: (e) => this.secondary(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  secondaryContainer() {
    return s.fromPalette({
      name: "secondary_container",
      palette: (e) => e.secondaryPalette,
      tone: (e) => {
        const t = e.isDark ? 30 : 90;
        return R(e) ? e.isDark ? 30 : 85 : Q(e) ? Ze(e.secondaryPalette.hue, e.secondaryPalette.chroma, t, !e.isDark) : t;
      },
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new v(this.secondaryContainer(), this.secondary(), 10, "nearer", !1)
    });
  }
  onSecondaryContainer() {
    return s.fromPalette({
      name: "on_secondary_container",
      palette: (e) => e.secondaryPalette,
      tone: (e) => R(e) ? e.isDark ? 90 : 10 : Q(e) ? s.foregroundTone(this.secondaryContainer().tone(e), 4.5) : e.isDark ? 90 : 30,
      background: (e) => this.secondaryContainer(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  /////////////////////////////////////////////////////////////////
  // Tertiary [T].                                               //
  /////////////////////////////////////////////////////////////////
  tertiary() {
    return s.fromPalette({
      name: "tertiary",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => R(e) ? e.isDark ? 90 : 25 : e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new v(this.tertiaryContainer(), this.tertiary(), 10, "nearer", !1)
    });
  }
  tertiaryDim() {
  }
  onTertiary() {
    return s.fromPalette({
      name: "on_tertiary",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => R(e) ? e.isDark ? 10 : 90 : e.isDark ? 20 : 100,
      background: (e) => this.tertiary(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  tertiaryContainer() {
    return s.fromPalette({
      name: "tertiary_container",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => {
        if (R(e))
          return e.isDark ? 60 : 49;
        if (!Q(e))
          return e.isDark ? 30 : 90;
        const t = e.tertiaryPalette.getHct(e.sourceColorHct.tone);
        return ke.fixIfDisliked(t).tone;
      },
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new v(this.tertiaryContainer(), this.tertiary(), 10, "nearer", !1)
    });
  }
  onTertiaryContainer() {
    return s.fromPalette({
      name: "on_tertiary_container",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => R(e) ? e.isDark ? 0 : 100 : Q(e) ? s.foregroundTone(this.tertiaryContainer().tone(e), 4.5) : e.isDark ? 90 : 30,
      background: (e) => this.tertiaryContainer(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  //////////////////////////////////////////////////////////////////
  // Error [E].                                                   //
  //////////////////////////////////////////////////////////////////
  error() {
    return s.fromPalette({
      name: "error",
      palette: (e) => e.errorPalette,
      tone: (e) => e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new v(this.errorContainer(), this.error(), 10, "nearer", !1)
    });
  }
  errorDim() {
  }
  onError() {
    return s.fromPalette({
      name: "on_error",
      palette: (e) => e.errorPalette,
      tone: (e) => e.isDark ? 20 : 100,
      background: (e) => this.error(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  errorContainer() {
    return s.fromPalette({
      name: "error_container",
      palette: (e) => e.errorPalette,
      tone: (e) => e.isDark ? 30 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new v(this.errorContainer(), this.error(), 10, "nearer", !1)
    });
  }
  onErrorContainer() {
    return s.fromPalette({
      name: "on_error_container",
      palette: (e) => e.errorPalette,
      tone: (e) => R(e) ? e.isDark ? 90 : 10 : e.isDark ? 90 : 30,
      background: (e) => this.errorContainer(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  //////////////////////////////////////////////////////////////////
  // Primary Fixed [PF]                                           //
  //////////////////////////////////////////////////////////////////
  primaryFixed() {
    return s.fromPalette({
      name: "primary_fixed",
      palette: (e) => e.primaryPalette,
      tone: (e) => R(e) ? 40 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new v(this.primaryFixed(), this.primaryFixedDim(), 10, "lighter", !0)
    });
  }
  primaryFixedDim() {
    return s.fromPalette({
      name: "primary_fixed_dim",
      palette: (e) => e.primaryPalette,
      tone: (e) => R(e) ? 30 : 80,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new v(this.primaryFixed(), this.primaryFixedDim(), 10, "lighter", !0)
    });
  }
  onPrimaryFixed() {
    return s.fromPalette({
      name: "on_primary_fixed",
      palette: (e) => e.primaryPalette,
      tone: (e) => R(e) ? 100 : 10,
      background: (e) => this.primaryFixedDim(),
      secondBackground: (e) => this.primaryFixed(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  onPrimaryFixedVariant() {
    return s.fromPalette({
      name: "on_primary_fixed_variant",
      palette: (e) => e.primaryPalette,
      tone: (e) => R(e) ? 90 : 30,
      background: (e) => this.primaryFixedDim(),
      secondBackground: (e) => this.primaryFixed(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  ///////////////////////////////////////////////////////////////////
  // Secondary Fixed [QF]                                          //
  ///////////////////////////////////////////////////////////////////
  secondaryFixed() {
    return s.fromPalette({
      name: "secondary_fixed",
      palette: (e) => e.secondaryPalette,
      tone: (e) => R(e) ? 80 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new v(this.secondaryFixed(), this.secondaryFixedDim(), 10, "lighter", !0)
    });
  }
  secondaryFixedDim() {
    return s.fromPalette({
      name: "secondary_fixed_dim",
      palette: (e) => e.secondaryPalette,
      tone: (e) => R(e) ? 70 : 80,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new v(this.secondaryFixed(), this.secondaryFixedDim(), 10, "lighter", !0)
    });
  }
  onSecondaryFixed() {
    return s.fromPalette({
      name: "on_secondary_fixed",
      palette: (e) => e.secondaryPalette,
      tone: (e) => 10,
      background: (e) => this.secondaryFixedDim(),
      secondBackground: (e) => this.secondaryFixed(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  onSecondaryFixedVariant() {
    return s.fromPalette({
      name: "on_secondary_fixed_variant",
      palette: (e) => e.secondaryPalette,
      tone: (e) => R(e) ? 25 : 30,
      background: (e) => this.secondaryFixedDim(),
      secondBackground: (e) => this.secondaryFixed(),
      contrastCurve: (e) => new k(3, 4.5, 7, 11)
    });
  }
  /////////////////////////////////////////////////////////////////
  // Tertiary Fixed [TF]                                         //
  /////////////////////////////////////////////////////////////////
  tertiaryFixed() {
    return s.fromPalette({
      name: "tertiary_fixed",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => R(e) ? 40 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new v(this.tertiaryFixed(), this.tertiaryFixedDim(), 10, "lighter", !0)
    });
  }
  tertiaryFixedDim() {
    return s.fromPalette({
      name: "tertiary_fixed_dim",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => R(e) ? 30 : 80,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new k(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new v(this.tertiaryFixed(), this.tertiaryFixedDim(), 10, "lighter", !0)
    });
  }
  onTertiaryFixed() {
    return s.fromPalette({
      name: "on_tertiary_fixed",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => R(e) ? 100 : 10,
      background: (e) => this.tertiaryFixedDim(),
      secondBackground: (e) => this.tertiaryFixed(),
      contrastCurve: (e) => new k(4.5, 7, 11, 21)
    });
  }
  onTertiaryFixedVariant() {
    return s.fromPalette({
      name: "on_tertiary_fixed_variant",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => R(e) ? 90 : 30,
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
function x(a, e = 0, t = 100, r = 1) {
  let n = Ie(a.hue, a.chroma * r, 100, !0);
  return U(e, t, n);
}
function $(a, e = 0, t = 100) {
  let r = Ie(a.hue, a.chroma, 0, !1);
  return U(e, t, r);
}
function Ie(a, e, t, r) {
  let n = t, i = D.from(a, e, n);
  for (; i.chroma < e && !(t < 0 || t > 100); ) {
    t += r ? -1 : 1;
    const c = D.from(a, e, t);
    i.chroma < c.chroma && (i = c, n = t);
  }
  return n;
}
function S(a) {
  return a === 1.5 ? new k(1.5, 1.5, 3, 5.5) : a === 3 ? new k(3, 3, 4.5, 7) : a === 4.5 ? new k(4.5, 4.5, 7, 11) : a === 6 ? new k(6, 6, 7, 11) : a === 7 ? new k(7, 7, 11, 21) : a === 9 ? new k(9, 9, 11, 21) : a === 11 ? new k(11, 11, 21, 21) : a === 21 ? new k(21, 21, 21, 21) : new k(a, a, 7, 21);
}
class et extends Qe {
  ////////////////////////////////////////////////////////////////
  // Surfaces [S]                                               //
  ////////////////////////////////////////////////////////////////
  surface() {
    const e = s.fromPalette({
      name: "surface",
      palette: (t) => t.neutralPalette,
      tone: (t) => (super.surface().tone(t), t.platform === "phone" ? t.isDark ? 4 : D.isYellow(t.neutralPalette.hue) ? 99 : t.variant === p.VIBRANT ? 97 : 98 : 0),
      isBackground: !0
    });
    return T(super.surface(), "2025", e);
  }
  surfaceDim() {
    const e = s.fromPalette({
      name: "surface_dim",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 4 : D.isYellow(t.neutralPalette.hue) ? 90 : t.variant === p.VIBRANT ? 85 : 87,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (!t.isDark) {
          if (t.variant === p.NEUTRAL)
            return 2.5;
          if (t.variant === p.TONAL_SPOT)
            return 1.7;
          if (t.variant === p.EXPRESSIVE)
            return D.isYellow(t.neutralPalette.hue) ? 2.7 : 1.75;
          if (t.variant === p.VIBRANT)
            return 1.36;
        }
        return 1;
      }
    });
    return T(super.surfaceDim(), "2025", e);
  }
  surfaceBright() {
    const e = s.fromPalette({
      name: "surface_bright",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 18 : D.isYellow(t.neutralPalette.hue) ? 99 : t.variant === p.VIBRANT ? 97 : 98,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.isDark) {
          if (t.variant === p.NEUTRAL)
            return 2.5;
          if (t.variant === p.TONAL_SPOT)
            return 1.7;
          if (t.variant === p.EXPRESSIVE)
            return D.isYellow(t.neutralPalette.hue) ? 2.7 : 1.75;
          if (t.variant === p.VIBRANT)
            return 1.36;
        }
        return 1;
      }
    });
    return T(super.surfaceBright(), "2025", e);
  }
  surfaceContainerLowest() {
    const e = s.fromPalette({
      name: "surface_container_lowest",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 0 : 100,
      isBackground: !0
    });
    return T(super.surfaceContainerLowest(), "2025", e);
  }
  surfaceContainerLow() {
    const e = s.fromPalette({
      name: "surface_container_low",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? 6 : D.isYellow(t.neutralPalette.hue) ? 98 : t.variant === p.VIBRANT ? 95 : 96 : 15,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === p.NEUTRAL)
            return 1.3;
          if (t.variant === p.TONAL_SPOT)
            return 1.25;
          if (t.variant === p.EXPRESSIVE)
            return D.isYellow(t.neutralPalette.hue) ? 1.3 : 1.15;
          if (t.variant === p.VIBRANT)
            return 1.08;
        }
        return 1;
      }
    });
    return T(super.surfaceContainerLow(), "2025", e);
  }
  surfaceContainer() {
    const e = s.fromPalette({
      name: "surface_container",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? 9 : D.isYellow(t.neutralPalette.hue) ? 96 : t.variant === p.VIBRANT ? 92 : 94 : 20,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === p.NEUTRAL)
            return 1.6;
          if (t.variant === p.TONAL_SPOT)
            return 1.4;
          if (t.variant === p.EXPRESSIVE)
            return D.isYellow(t.neutralPalette.hue) ? 1.6 : 1.3;
          if (t.variant === p.VIBRANT)
            return 1.15;
        }
        return 1;
      }
    });
    return T(super.surfaceContainer(), "2025", e);
  }
  surfaceContainerHigh() {
    const e = s.fromPalette({
      name: "surface_container_high",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? 12 : D.isYellow(t.neutralPalette.hue) ? 94 : t.variant === p.VIBRANT ? 90 : 92 : 25,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === p.NEUTRAL)
            return 1.9;
          if (t.variant === p.TONAL_SPOT)
            return 1.5;
          if (t.variant === p.EXPRESSIVE)
            return D.isYellow(t.neutralPalette.hue) ? 1.95 : 1.45;
          if (t.variant === p.VIBRANT)
            return 1.22;
        }
        return 1;
      }
    });
    return T(super.surfaceContainerHigh(), "2025", e);
  }
  surfaceContainerHighest() {
    const e = s.fromPalette({
      name: "surface_container_highest",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 15 : D.isYellow(t.neutralPalette.hue) ? 92 : t.variant === p.VIBRANT ? 88 : 90,
      isBackground: !0,
      chromaMultiplier: (t) => t.variant === p.NEUTRAL ? 2.2 : t.variant === p.TONAL_SPOT ? 1.7 : t.variant === p.EXPRESSIVE ? D.isYellow(t.neutralPalette.hue) ? 2.3 : 1.6 : t.variant === p.VIBRANT ? 1.29 : 1
    });
    return T(super.surfaceContainerHighest(), "2025", e);
  }
  onSurface() {
    const e = s.fromPalette({
      name: "on_surface",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.variant === p.VIBRANT ? x(t.neutralPalette, 0, 100, 1.1) : s.getInitialToneFromBackground((r) => r.platform === "phone" ? this.highestSurface(r) : this.surfaceContainerHigh())(t),
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === p.NEUTRAL)
            return 2.2;
          if (t.variant === p.TONAL_SPOT)
            return 1.7;
          if (t.variant === p.EXPRESSIVE)
            return D.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.isDark && t.platform === "phone" ? S(11) : S(9)
    });
    return T(super.onSurface(), "2025", e);
  }
  onSurfaceVariant() {
    const e = s.fromPalette({
      name: "on_surface_variant",
      palette: (t) => t.neutralPalette,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === p.NEUTRAL)
            return 2.2;
          if (t.variant === p.TONAL_SPOT)
            return 1.7;
          if (t.variant === p.EXPRESSIVE)
            return D.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? t.isDark ? S(6) : S(4.5) : S(7)
    });
    return T(super.onSurfaceVariant(), "2025", e);
  }
  outline() {
    const e = s.fromPalette({
      name: "outline",
      palette: (t) => t.neutralPalette,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === p.NEUTRAL)
            return 2.2;
          if (t.variant === p.TONAL_SPOT)
            return 1.7;
          if (t.variant === p.EXPRESSIVE)
            return D.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(3) : S(4.5)
    });
    return T(super.outline(), "2025", e);
  }
  outlineVariant() {
    const e = s.fromPalette({
      name: "outline_variant",
      palette: (t) => t.neutralPalette,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === p.NEUTRAL)
            return 2.2;
          if (t.variant === p.TONAL_SPOT)
            return 1.7;
          if (t.variant === p.EXPRESSIVE)
            return D.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(1.5) : S(3)
    });
    return T(super.outlineVariant(), "2025", e);
  }
  inverseSurface() {
    const e = s.fromPalette({
      name: "inverse_surface",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 98 : 4,
      isBackground: !0
    });
    return T(super.inverseSurface(), "2025", e);
  }
  inverseOnSurface() {
    const e = s.fromPalette({
      name: "inverse_on_surface",
      palette: (t) => t.neutralPalette,
      background: (t) => this.inverseSurface(),
      contrastCurve: (t) => S(7)
    });
    return T(super.inverseOnSurface(), "2025", e);
  }
  ////////////////////////////////////////////////////////////////
  // Primaries [P]                                              //
  ////////////////////////////////////////////////////////////////
  primary() {
    const e = s.fromPalette({
      name: "primary",
      palette: (t) => t.primaryPalette,
      tone: (t) => t.variant === p.NEUTRAL ? t.platform === "phone" ? t.isDark ? 80 : 40 : 90 : t.variant === p.TONAL_SPOT ? t.platform === "phone" ? t.isDark ? 80 : x(t.primaryPalette) : x(t.primaryPalette, 0, 90) : t.variant === p.EXPRESSIVE ? t.platform === "phone" ? x(t.primaryPalette, 0, D.isYellow(t.primaryPalette.hue) ? 25 : D.isCyan(t.primaryPalette.hue) ? 88 : 98) : x(t.primaryPalette) : t.platform === "phone" ? x(t.primaryPalette, 0, D.isCyan(t.primaryPalette.hue) ? 88 : 98) : x(t.primaryPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(4.5) : S(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new v(this.primaryContainer(), this.primary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return T(super.primary(), "2025", e);
  }
  primaryDim() {
    return s.fromPalette({
      name: "primary_dim",
      palette: (e) => e.primaryPalette,
      tone: (e) => e.variant === p.NEUTRAL ? 85 : e.variant === p.TONAL_SPOT ? x(e.primaryPalette, 0, 90) : x(e.primaryPalette),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => S(4.5),
      toneDeltaPair: (e) => new v(this.primaryDim(), this.primary(), 5, "darker", !0, "farther")
    });
  }
  onPrimary() {
    const e = s.fromPalette({
      name: "on_primary",
      palette: (t) => t.primaryPalette,
      background: (t) => t.platform === "phone" ? this.primary() : this.primaryDim(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onPrimary(), "2025", e);
  }
  primaryContainer() {
    const e = s.fromPalette({
      name: "primary_container",
      palette: (t) => t.primaryPalette,
      tone: (t) => t.platform === "watch" ? 30 : t.variant === p.NEUTRAL ? t.isDark ? 30 : 90 : t.variant === p.TONAL_SPOT ? t.isDark ? $(t.primaryPalette, 35, 93) : x(t.primaryPalette, 0, 90) : t.variant === p.EXPRESSIVE ? t.isDark ? x(t.primaryPalette, 30, 93) : x(t.primaryPalette, 78, D.isCyan(t.primaryPalette.hue) ? 88 : 90) : t.isDark ? $(t.primaryPalette, 66, 93) : x(t.primaryPalette, 66, D.isCyan(t.primaryPalette.hue) ? 88 : 93),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "phone" ? void 0 : new v(this.primaryContainer(), this.primaryDim(), 10, "darker", !0, "farther"),
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.primaryContainer(), "2025", e);
  }
  onPrimaryContainer() {
    const e = s.fromPalette({
      name: "on_primary_container",
      palette: (t) => t.primaryPalette,
      background: (t) => this.primaryContainer(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onPrimaryContainer(), "2025", e);
  }
  primaryFixed() {
    const e = s.fromPalette({
      name: "primary_fixed",
      palette: (t) => t.primaryPalette,
      tone: (t) => {
        let r = Object.assign({}, t, { isDark: !1, contrastLevel: 0 });
        return this.primaryContainer().getTone(r);
      },
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.primaryFixed(), "2025", e);
  }
  primaryFixedDim() {
    const e = s.fromPalette({
      name: "primary_fixed_dim",
      palette: (t) => t.primaryPalette,
      tone: (t) => this.primaryFixed().getTone(t),
      isBackground: !0,
      toneDeltaPair: (t) => new v(this.primaryFixedDim(), this.primaryFixed(), 5, "darker", !0, "exact")
    });
    return T(super.primaryFixedDim(), "2025", e);
  }
  onPrimaryFixed() {
    const e = s.fromPalette({
      name: "on_primary_fixed",
      palette: (t) => t.primaryPalette,
      background: (t) => this.primaryFixedDim(),
      contrastCurve: (t) => S(7)
    });
    return T(super.onPrimaryFixed(), "2025", e);
  }
  onPrimaryFixedVariant() {
    const e = s.fromPalette({
      name: "on_primary_fixed_variant",
      palette: (t) => t.primaryPalette,
      background: (t) => this.primaryFixedDim(),
      contrastCurve: (t) => S(4.5)
    });
    return T(super.onPrimaryFixedVariant(), "2025", e);
  }
  inversePrimary() {
    const e = s.fromPalette({
      name: "inverse_primary",
      palette: (t) => t.primaryPalette,
      tone: (t) => x(t.primaryPalette),
      background: (t) => this.inverseSurface(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.inversePrimary(), "2025", e);
  }
  ////////////////////////////////////////////////////////////////
  // Secondaries [Q]                                            //
  ////////////////////////////////////////////////////////////////
  secondary() {
    const e = s.fromPalette({
      name: "secondary",
      palette: (t) => t.secondaryPalette,
      tone: (t) => t.platform === "watch" ? t.variant === p.NEUTRAL ? 90 : x(t.secondaryPalette, 0, 90) : t.variant === p.NEUTRAL ? t.isDark ? $(t.secondaryPalette, 0, 98) : x(t.secondaryPalette) : t.variant === p.VIBRANT ? x(t.secondaryPalette, 0, t.isDark ? 90 : 98) : t.isDark ? 80 : x(t.secondaryPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(4.5) : S(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new v(this.secondaryContainer(), this.secondary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return T(super.secondary(), "2025", e);
  }
  secondaryDim() {
    return s.fromPalette({
      name: "secondary_dim",
      palette: (e) => e.secondaryPalette,
      tone: (e) => e.variant === p.NEUTRAL ? 85 : x(e.secondaryPalette, 0, 90),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => S(4.5),
      toneDeltaPair: (e) => new v(this.secondaryDim(), this.secondary(), 5, "darker", !0, "farther")
    });
  }
  onSecondary() {
    const e = s.fromPalette({
      name: "on_secondary",
      palette: (t) => t.secondaryPalette,
      background: (t) => t.platform === "phone" ? this.secondary() : this.secondaryDim(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onSecondary(), "2025", e);
  }
  secondaryContainer() {
    const e = s.fromPalette({
      name: "secondary_container",
      palette: (t) => t.secondaryPalette,
      tone: (t) => t.platform === "watch" ? 30 : t.variant === p.VIBRANT ? t.isDark ? $(t.secondaryPalette, 30, 40) : x(t.secondaryPalette, 84, 90) : t.variant === p.EXPRESSIVE ? t.isDark ? 15 : x(t.secondaryPalette, 90, 95) : t.isDark ? 25 : 90,
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "watch" ? new v(this.secondaryContainer(), this.secondaryDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.secondaryContainer(), "2025", e);
  }
  onSecondaryContainer() {
    const e = s.fromPalette({
      name: "on_secondary_container",
      palette: (t) => t.secondaryPalette,
      background: (t) => this.secondaryContainer(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onSecondaryContainer(), "2025", e);
  }
  secondaryFixed() {
    const e = s.fromPalette({
      name: "secondary_fixed",
      palette: (t) => t.secondaryPalette,
      tone: (t) => {
        let r = Object.assign({}, t, { isDark: !1, contrastLevel: 0 });
        return this.secondaryContainer().getTone(r);
      },
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.secondaryFixed(), "2025", e);
  }
  secondaryFixedDim() {
    const e = s.fromPalette({
      name: "secondary_fixed_dim",
      palette: (t) => t.secondaryPalette,
      tone: (t) => this.secondaryFixed().getTone(t),
      isBackground: !0,
      toneDeltaPair: (t) => new v(this.secondaryFixedDim(), this.secondaryFixed(), 5, "darker", !0, "exact")
    });
    return T(super.secondaryFixedDim(), "2025", e);
  }
  onSecondaryFixed() {
    const e = s.fromPalette({
      name: "on_secondary_fixed",
      palette: (t) => t.secondaryPalette,
      background: (t) => this.secondaryFixedDim(),
      contrastCurve: (t) => S(7)
    });
    return T(super.onSecondaryFixed(), "2025", e);
  }
  onSecondaryFixedVariant() {
    const e = s.fromPalette({
      name: "on_secondary_fixed_variant",
      palette: (t) => t.secondaryPalette,
      background: (t) => this.secondaryFixedDim(),
      contrastCurve: (t) => S(4.5)
    });
    return T(super.onSecondaryFixedVariant(), "2025", e);
  }
  ////////////////////////////////////////////////////////////////
  // Tertiaries [T]                                             //
  ////////////////////////////////////////////////////////////////
  tertiary() {
    const e = s.fromPalette({
      name: "tertiary",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => t.platform === "watch" ? t.variant === p.TONAL_SPOT ? x(t.tertiaryPalette, 0, 90) : x(t.tertiaryPalette) : t.variant === p.EXPRESSIVE || t.variant === p.VIBRANT ? x(t.tertiaryPalette, 0, D.isCyan(t.tertiaryPalette.hue) ? 88 : t.isDark ? 98 : 100) : t.isDark ? x(t.tertiaryPalette, 0, 98) : x(t.tertiaryPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(4.5) : S(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new v(this.tertiaryContainer(), this.tertiary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return T(super.tertiary(), "2025", e);
  }
  tertiaryDim() {
    return s.fromPalette({
      name: "tertiary_dim",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => e.variant === p.TONAL_SPOT ? x(e.tertiaryPalette, 0, 90) : x(e.tertiaryPalette),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => S(4.5),
      toneDeltaPair: (e) => new v(this.tertiaryDim(), this.tertiary(), 5, "darker", !0, "farther")
    });
  }
  onTertiary() {
    const e = s.fromPalette({
      name: "on_tertiary",
      palette: (t) => t.tertiaryPalette,
      background: (t) => t.platform === "phone" ? this.tertiary() : this.tertiaryDim(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onTertiary(), "2025", e);
  }
  tertiaryContainer() {
    const e = s.fromPalette({
      name: "tertiary_container",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => t.platform === "watch" ? t.variant === p.TONAL_SPOT ? x(t.tertiaryPalette, 0, 90) : x(t.tertiaryPalette) : t.variant === p.NEUTRAL ? t.isDark ? x(t.tertiaryPalette, 0, 93) : x(t.tertiaryPalette, 0, 96) : t.variant === p.TONAL_SPOT ? x(t.tertiaryPalette, 0, t.isDark ? 93 : 100) : t.variant === p.EXPRESSIVE ? x(t.tertiaryPalette, 75, D.isCyan(t.tertiaryPalette.hue) ? 88 : t.isDark ? 93 : 100) : t.isDark ? x(t.tertiaryPalette, 0, 93) : x(t.tertiaryPalette, 72, 100),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "watch" ? new v(this.tertiaryContainer(), this.tertiaryDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.tertiaryContainer(), "2025", e);
  }
  onTertiaryContainer() {
    const e = s.fromPalette({
      name: "on_tertiary_container",
      palette: (t) => t.tertiaryPalette,
      background: (t) => this.tertiaryContainer(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onTertiaryContainer(), "2025", e);
  }
  tertiaryFixed() {
    const e = s.fromPalette({
      name: "tertiary_fixed",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => {
        let r = Object.assign({}, t, { isDark: !1, contrastLevel: 0 });
        return this.tertiaryContainer().getTone(r);
      },
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.tertiaryFixed(), "2025", e);
  }
  tertiaryFixedDim() {
    const e = s.fromPalette({
      name: "tertiary_fixed_dim",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => this.tertiaryFixed().getTone(t),
      isBackground: !0,
      toneDeltaPair: (t) => new v(this.tertiaryFixedDim(), this.tertiaryFixed(), 5, "darker", !0, "exact")
    });
    return T(super.tertiaryFixedDim(), "2025", e);
  }
  onTertiaryFixed() {
    const e = s.fromPalette({
      name: "on_tertiary_fixed",
      palette: (t) => t.tertiaryPalette,
      background: (t) => this.tertiaryFixedDim(),
      contrastCurve: (t) => S(7)
    });
    return T(super.onTertiaryFixed(), "2025", e);
  }
  onTertiaryFixedVariant() {
    const e = s.fromPalette({
      name: "on_tertiary_fixed_variant",
      palette: (t) => t.tertiaryPalette,
      background: (t) => this.tertiaryFixedDim(),
      contrastCurve: (t) => S(4.5)
    });
    return T(super.onTertiaryFixedVariant(), "2025", e);
  }
  ////////////////////////////////////////////////////////////////
  // Errors [E]                                                 //
  ////////////////////////////////////////////////////////////////
  error() {
    const e = s.fromPalette({
      name: "error",
      palette: (t) => t.errorPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? $(t.errorPalette, 0, 98) : x(t.errorPalette) : $(t.errorPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(4.5) : S(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new v(this.errorContainer(), this.error(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return T(super.error(), "2025", e);
  }
  errorDim() {
    return s.fromPalette({
      name: "error_dim",
      palette: (e) => e.errorPalette,
      tone: (e) => $(e.errorPalette),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => S(4.5),
      toneDeltaPair: (e) => new v(this.errorDim(), this.error(), 5, "darker", !0, "farther")
    });
  }
  onError() {
    const e = s.fromPalette({
      name: "on_error",
      palette: (t) => t.errorPalette,
      background: (t) => t.platform === "phone" ? this.error() : this.errorDim(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onError(), "2025", e);
  }
  errorContainer() {
    const e = s.fromPalette({
      name: "error_container",
      palette: (t) => t.errorPalette,
      tone: (t) => t.platform === "watch" ? 30 : t.isDark ? $(t.errorPalette, 30, 93) : x(t.errorPalette, 0, 90),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "watch" ? new v(this.errorContainer(), this.errorDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.errorContainer(), "2025", e);
  }
  onErrorContainer() {
    const e = s.fromPalette({
      name: "on_error_container",
      palette: (t) => t.errorPalette,
      background: (t) => this.errorContainer(),
      contrastCurve: (t) => t.platform === "phone" ? S(4.5) : S(7)
    });
    return T(super.onErrorContainer(), "2025", e);
  }
  /////////////////////////////////////////////////////////////////
  // Remapped Colors                                             //
  /////////////////////////////////////////////////////////////////
  surfaceVariant() {
    const e = Object.assign(this.surfaceContainerHighest().clone(), { name: "surface_variant" });
    return T(super.surfaceVariant(), "2025", e);
  }
  surfaceTint() {
    const e = Object.assign(this.primary().clone(), { name: "surface_tint" });
    return T(super.surfaceTint(), "2025", e);
  }
  background() {
    const e = Object.assign(this.surface().clone(), { name: "background" });
    return T(super.background(), "2025", e);
  }
  onBackground() {
    const e = Object.assign(this.onSurface().clone(), {
      name: "on_background",
      tone: (t) => t.platform === "watch" ? 100 : this.onSurface().getTone(t)
    });
    return T(super.onBackground(), "2025", e);
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
o.colorSpec = new et();
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
function ce(a) {
  const e = we(a), t = Me(a), r = Be(a), n = [e.toString(16), t.toString(16), r.toString(16)];
  for (const [i, c] of n.entries())
    c.length === 1 && (n[i] = "0" + c);
  return "#" + n.join("");
}
function te(a) {
  a = a.replace("#", "");
  const e = a.length === 3, t = a.length === 6, r = a.length === 8;
  if (!e && !t && !r)
    throw new Error("unexpected hex " + a);
  let n = 0, i = 0, c = 0;
  return e ? (n = X(a.slice(0, 1).repeat(2)), i = X(a.slice(1, 2).repeat(2)), c = X(a.slice(2, 3).repeat(2))) : t ? (n = X(a.slice(0, 2)), i = X(a.slice(2, 4)), c = X(a.slice(4, 6))) : r && (n = X(a.slice(2, 4)), i = X(a.slice(4, 6)), c = X(a.slice(6, 8))), (255 << 24 | (n & 255) << 16 | (i & 255) << 8 | c & 255) >>> 0;
}
function X(a) {
  return parseInt(a, 16);
}
const tt = ["hex", "rgb", "hsl"];
function rt(a) {
  return !a || tt.indexOf(a) < 0 ? "hex" : a;
}
function ne(a, e) {
  const t = rt(e);
  return t === "hex" ? a[t]().toLowerCase() : a[t]().round().string();
}
function xe(a, e, t, r = 10, n = 1, i = "", c = 0) {
  const u = K(a), f = Math.max(1, Math.min(24, Number(r) || 10)), l = Math.floor(f / 2) + 1, h = Math.max(0.1, Math.min(5, Number(n) || 1)), P = Math.max(0, Math.min(1, Number(c) || 0));
  let d = u;
  if (i && P > 0) {
    const M = te(u.hex().toLowerCase()), w = te(K(i).hex().toLowerCase());
    d = K(ce(le.cam16Ucs(M, w, P)));
  }
  if (e === l)
    return ne(d, t);
  const b = te(d.hex().toLowerCase()), m = D.fromInt(b), y = m.tone, g = l - 1, B = f - l, F = (M) => Math.pow(Math.max(0, Math.min(1, M)), h), I = e < l ? y + (100 - y) * F((l - e) / Math.max(1, g)) : y - y * F((e - l) / Math.max(1, B)), A = D.from(m.hue, m.chroma, Math.max(0, Math.min(100, I))), E = ce(A.toInt());
  return ne(K(E), t);
}
function Fe(a, e, t, r = 10, n = 1, i = "", c = 0) {
  const u = K(a), f = Math.max(1, Math.min(24, Number(r) || 10)), l = Math.floor(f / 2) + 1, h = Math.max(0.1, Math.min(5, Number(n) || 1)), P = Math.max(0, Math.min(1, Number(c) || 0));
  let d = u;
  if (i && P > 0) {
    const M = te(u.hex().toLowerCase()), w = te(K(i).hex().toLowerCase());
    d = K(ce(le.cam16Ucs(M, w, P)));
  }
  if (e === l)
    return ne(d, t);
  const b = te(d.hex().toLowerCase()), m = D.fromInt(b), y = m.tone, g = l - 1, B = f - l, F = (M) => Math.pow(Math.max(0, Math.min(1, M)), h), I = e < l ? y - y * F((l - e) / Math.max(1, g)) : y + (100 - y) * F((e - l) / Math.max(1, B)), A = D.from(m.hue, m.chroma, Math.max(0, Math.min(100, I))), E = ce(A.toInt());
  return ne(K(E), t);
}
function nt(a, e = {}) {
  const { dark: t, list: r, format: n = "hex" } = e, i = Math.max(1, Math.min(24, Number(e.steps) || 10)), c = Math.floor(i / 2) + 1, u = Math.max(1, Math.min(i, Number(e.index) || c)), f = Math.max(0.1, Math.min(5, Number(e.curveGamma) || 1)), l = typeof e.mixColor == "string" ? e.mixColor : "", h = Math.max(0, Math.min(1, Number(e.mixRatio) || 0));
  if (r) {
    const P = [], d = t ? Fe : xe;
    for (let b = 1; b <= i; b++)
      P.push(d(a, b, n, i, f, l, h));
    return P;
  }
  return t ? Fe(a, u, n, i, f, l, h) : xe(a, u, n, i, f, l, h);
}
function at(a = "#ffffff", e = "#000000", t = {}) {
  const { steps: r = 10, format: n = "hex", includeEnds: i = !0, curveGamma: c = 1 } = t, u = Math.max(1, Math.min(24, Number(r) || 10)), f = Math.max(0.1, Math.min(5, Number(c) || 1)), l = K(a), h = K(e), P = i ? u : u + 2, d = Math.max(1, P - 1), b = [];
  for (let m = 0; m < P; m++) {
    const y = Math.pow(m / d, f), g = Math.round(l.red() + (h.red() - l.red()) * y), B = Math.round(l.green() + (h.green() - l.green()) * y), F = Math.round(l.blue() + (h.blue() - l.blue()) * y), I = ne(K({ r: g, g: B, b: F }), n);
    !i && (m === 0 || m === P - 1) || b.push(I);
  }
  return b;
}
const ot = { generate: at }, st = {
  generate: nt
}, ct = ot;
export {
  ct as neutral,
  st as palette
};
