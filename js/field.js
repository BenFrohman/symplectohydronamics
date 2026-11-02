/* Copyright (c) 2026 Benjamin Stanley Frohman. SPDX-License-Identifier: Apache-2.0 */
(() => {
  const canvas = document.getElementById("field");
  if (!canvas) return;

  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!gl) {
    canvas.style.background = "#07070c url('assets/vorticity-field.jpg') center/cover";
    return;
  }

  const vert = `
    attribute vec2 a;
    void main(){ gl_Position = vec4(a, 0.0, 1.0); }
  `;
  const frag = `
    precision mediump float;
    uniform vec2 uRes;
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uMouse;

    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p); vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    float fbm(vec2 p){
      float v = 0.0; float a = 0.5;
      for(int i=0;i<5;i++){ v += a * noise(p); p *= 2.07; a *= 0.55; }
      return v;
    }

    mat2 rot(float a){ return mat2(cos(a), -sin(a), sin(a), cos(a)); }

    float filament(vec2 p, float t){
      vec2 q = p;
      q.y += 0.18 * sin(q.x * 2.4 + t * 0.6);
      float n = fbm(q * 1.6 + vec2(t * 0.07, -t * 0.04));
      float stretch = 1.0 + 0.35 * sin(t * 0.8 + q.x * 1.8);
      q.y *= stretch;
      float d = abs(q.y + 0.55 * sin(q.x * 3.1 + n * 6.283) + 0.2 * sin(q.x * 7.0 - t));
      float core = smoothstep(0.22, 0.0, d);
      float braid = smoothstep(0.09, 0.0, abs(sin(q.x * 8.0 + t) * 0.12 + q.y));
      return core * 0.85 + braid * 0.45;
    }

    void main(){
      vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.y, uRes.x);
      float t = uTime;
      float s = uScroll;
      uv *= 1.15 + 0.12 * s;
      uv.y += s * 0.18;
      uv += (uMouse - 0.5) * 0.08;

      vec2 p = uv * rot(0.15 + s * 0.25);
      float f1 = filament(p, t);
      float f2 = filament(p * rot(2.094) * 1.15 + 0.2, t * 0.85 + 1.7);
      float f3 = filament(p * rot(-1.2) * 0.92 - 0.15, t * 1.1 + 3.1);
      float vort = f1 + 0.75 * f2 + 0.6 * f3;

      float spike = pow(max(vort, 0.0), 2.2);
      float sbt = sin(t * 0.4);
      float bound = 0.72 + 0.08 * (exp(2.0 * sbt) - 1.0) / (exp(2.0 * sbt) + 1.0);
      float tether = smoothstep(bound, bound - 0.22, spike);
      float gold = spike * tether;
      float plasma = vort * (1.0 - 0.35 * tether);

      vec3 col = vec3(0.027, 0.028, 0.047);
      col += vec3(0.18, 0.78, 0.82) * plasma * 0.55;
      col += vec3(0.42, 0.28, 0.92) * f3 * 0.28;
      col += vec3(0.83, 0.71, 0.42) * gold * 0.95;
      col += vec3(0.92, 0.86, 0.72) * pow(f1, 6.0) * 0.35;

      float fog = smoothstep(1.15, 0.15, length(uv));
      col *= fog;
      float vig = smoothstep(1.4, 0.2, length(uv * vec2(1.1, 1.0)));
      col *= 0.55 + 0.45 * vig;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  }

  const vs = compile(gl.VERTEX_SHADER, vert);
  const fs = compile(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) {
    canvas.style.background = "#07070c url('assets/vorticity-field.jpg') center/cover";
    return;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "uRes");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uScroll = gl.getUniformLocation(prog, "uScroll");
  const uMouse = gl.getUniformLocation(prog, "uMouse");

  const mouse = { x: 0.5, y: 0.5 };
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = 1 - e.clientY / window.innerHeight;
  }, { passive: true });

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener("resize", resize);

  const start = performance.now();
  let raf;
  function frame(now) {
    const t = reduced ? 8.0 : (now - start) / 1000;
    const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const s = window.scrollY / max;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, t);
    gl.uniform1f(uScroll, s);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!reduced) raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
})();
