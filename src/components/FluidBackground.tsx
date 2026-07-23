import { useEffect, useRef, useState } from 'react';
import InteractiveNodes from './InteractiveNodes';

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [webglSupported] = useState(() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  if (!webglSupported) return <InteractiveNodes />;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas;
    c.width = c.clientWidth || window.innerWidth;
    c.height = c.clientHeight || window.innerHeight;

    const config: any = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 0.96,
      VELOCITY_DISSIPATION: 0.97,
      PRESSURE_DISSIPATION: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 30,
      SPLAT_RADIUS: 0.01,
      SHADING: false,
      COLORFUL: false,
      PAUSED: false,
      BACK_COLOR: { r: 10, g: 10, b: 18 },
      TRANSPARENT: false,
      BLOOM: false,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.15,
      BLOOM_THRESHOLD: 0.6,
      BLOOM_SOFT_KNEE: 0.7,
    };

    // ---- WebGL context + format probing ----
    function getWebGLContext(cv: HTMLCanvasElement) {
      const params: any = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      let gl: any = cv.getContext('webgl2', params);
      const isWebGL2 = !!gl;
      if (!isWebGL2) gl = cv.getContext('webgl', params) || cv.getContext('experimental-webgl', params);
      if (!gl) return null;
      let halfFloat: any;
      let supportLinearFiltering: any;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
      let formatRGBA: any;
      let formatRG: any;
      let formatR: any;
      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }
      if (formatRGBA == null) return null;
      return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    }

    function getSupportedFormat(gl: any, internalFormat: number, format: number, type: number) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl: any, internalFormat: number, format: number, type: number) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      if (status !== gl.FRAMEBUFFER_COMPLETE) return false;
      return true;
    }

    function isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }

    const ctx = getWebGLContext(c);
    if (!ctx) return;
    const gl: any = ctx.gl;
    const ext: any = ctx.ext;
    if (isMobile()) config.SHADING = false;
    if (!ext.supportLinearFiltering) {
      config.SHADING = false;
      config.BLOOM = false;
    }

    // ---- Shader helpers ----
    class GLProgram {
      uniforms: any = {};
      program: any;
      constructor(vertexShader: any, fragmentShader: any) {
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) throw gl.getProgramInfoLog(this.program);
        const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
          const uniformName = gl.getActiveUniform(this.program, i).name;
          this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
        }
      }
      bind() {
        gl.useProgram(this.program);
      }
    }

    function compileShader(type: number, source: string) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(shader);
      return shader;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `
    );

    const colorShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      uniform vec4 color;
      void main () {
        gl_FragColor = color;
      }
    `
    );

    const backgroundShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float aspectRatio;
      #define SCALE 25.0
      void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
      }
    `
    );

    const displayShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
        vec3 C = texture2D(uTexture, vUv).rgb;
        float a = max(C.r, max(C.g, C.b));
        gl_FragColor = vec4(C, a);
      }
    `
    );

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `
    );

    const advectionManualFilteringShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;
      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }
      void main () {
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);
        gl_FragColor.a = 1.0;
      }
    `
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
        gl_FragColor.a = 1.0;
      }
    `
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
      }
    `
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      vec2 boundary (vec2 uv) {
        return uv;
      }
      void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      vec2 boundary (vec2 uv) {
        return uv;
      }
      void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `
    );

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      return (destination: any) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    let simWidth: number;
    let simHeight: number;
    let dyeWidth: number;
    let dyeHeight: number;
    let density: any;
    let velocity: any;
    let divergence: any;
    let curl: any;
    let pressure: any;

    const clearProgram = new GLProgram(baseVertexShader, clearShader);
    const colorProgram = new GLProgram(baseVertexShader, colorShader);
    const backgroundProgram = new GLProgram(baseVertexShader, backgroundShader);
    const displayProgram = new GLProgram(baseVertexShader, displayShader);
    const splatProgram = new GLProgram(baseVertexShader, splatShader);
    const advectionProgram = new GLProgram(baseVertexShader, ext.supportLinearFiltering ? advectionShader : advectionManualFilteringShader);
    const divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
    const curlProgram = new GLProgram(baseVertexShader, curlShader);
    const vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
    const pressureProgram = new GLProgram(baseVertexShader, pressureShader);
    const gradientSubtractProgram = new GLProgram(baseVertexShader, gradientSubtractShader);

    function getResolution(resolution: number) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
      return { width: min, height: max };
    }

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return {
        texture,
        fbo,
        width: w,
        height: h,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        get read() { return fbo1; },
        set read(value: any) { fbo1 = value; },
        get write() { return fbo2; },
        set write(value: any) { fbo2 = value; },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function resizeFBO(target: any, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      const newFBO = createFBO(w, h, internalFormat, format, type, param);
      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, target.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, 1);
      blit(newFBO.fbo);
      return newFBO;
    }

    function resizeDoubleFBO(target: any, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
      target.write = createFBO(w, h, internalFormat, format, type, param);
      return target;
    }

    function initFramebuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);
      simWidth = simRes.width;
      simHeight = simRes.height;
      dyeWidth = dyeRes.width;
      dyeHeight = dyeRes.height;
      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      density = density == null ? createDoubleFBO(dyeWidth, dyeHeight, rgba.internalFormat, rgba.format, texType, filtering) : resizeDoubleFBO(density, dyeWidth, dyeHeight, rgba.internalFormat, rgba.format, texType, filtering);
      velocity = velocity == null ? createDoubleFBO(simWidth, simHeight, rg.internalFormat, rg.format, texType, filtering) : resizeDoubleFBO(velocity, simWidth, simHeight, rg.internalFormat, rg.format, texType, filtering);
      divergence = createFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST);
      curl = createFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    let rafId: number | null = null;
    let idleTimeoutId: number | null = null;
    let lastInteractionTime = Date.now();
    const IDLE_TIMEOUT = 2000;

    function resume() {
      lastInteractionTime = Date.now();
      if (idleTimeoutId != null) {
        clearTimeout(idleTimeoutId);
        idleTimeoutId = null;
      }
      if (rafId == null) {
        rafId = requestAnimationFrame(update);
      }
    }

    function update() {
      resizeCanvas();
      input();
      if (!config.PAUSED) step(0.016);
      render(null);
      if (Date.now() - lastInteractionTime > IDLE_TIMEOUT) {
        idleTimeoutId = setTimeout(() => {
          idleTimeoutId = null;
          rafId = requestAnimationFrame(update);
        }, 250);
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(update);
    }

    function input() {
      if (splatStack.length > 0) multipleSplats(splatStack.pop());
      for (let i = 0; i < pointers.length; i++) {
        const p: any = pointers[i];
        if (p.moved) {
          splat(p.x, p.y, p.dx, p.dy, p.color);
          p.moved = false;
        }
      }
      if (!config.COLORFUL) return;
      if (lastColorChangeTime + 100 < Date.now()) {
        lastColorChangeTime = Date.now();
        for (let i = 0; i < pointers.length; i++) {
          pointers[i].color = generateColor();
        }
      }
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);
      gl.viewport(0, 0, simWidth, simHeight);
      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl.fbo);
      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write.fbo);
      velocity.swap();
      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence.fbo);
      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
      blit(pressure.write.fbo);
      pressure.swap();
      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write.fbo);
        pressure.swap();
      }
      gradientSubtractProgram.bind();
      gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write.fbo);
      velocity.swap();
      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, 1.0 / simWidth, 1.0 / simHeight);
      const velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write.fbo);
      velocity.swap();
      gl.viewport(0, 0, dyeWidth, dyeHeight);
      if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, 1.0 / dyeWidth, 1.0 / dyeHeight);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, density.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(density.write.fbo);
      density.swap();
    }

    function render(target: any) {
      if (target == null || !config.TRANSPARENT) {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
      } else {
        gl.disable(gl.BLEND);
      }
      const width = target == null ? gl.drawingBufferWidth : dyeWidth;
      const height = target == null ? gl.drawingBufferHeight : dyeHeight;
      gl.viewport(0, 0, width, height);
      if (!config.TRANSPARENT) {
        colorProgram.bind();
        const bc = config.BACK_COLOR;
        gl.uniform4f(colorProgram.uniforms.color, bc.r / 255, bc.g / 255, bc.b / 255, 1);
        blit(target);
      }
      if (target == null && config.TRANSPARENT) {
        backgroundProgram.bind();
        gl.uniform1f(backgroundProgram.uniforms.aspectRatio, c.width / c.height);
        blit(null);
      }
      displayProgram.bind();
      gl.uniform1i(displayProgram.uniforms.uTexture, density.read.attach(0));
      blit(target);
    }

    function splat(x: number, y: number, dx: number, dy: number, color: any) {
      gl.viewport(0, 0, simWidth, simHeight);
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, c.width / c.height);
      gl.uniform2f(splatProgram.uniforms.point, x / c.width, 1.0 - y / c.height);
      gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
      gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS);
      blit(velocity.write.fbo);
      velocity.swap();
      gl.viewport(0, 0, dyeWidth, dyeHeight);
      gl.uniform1i(splatProgram.uniforms.uTarget, density.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(density.write.fbo);
      density.swap();
    }

    function multipleSplats(amount: number) {
      for (let i = 0; i < amount; i++) {
        const color = generateColor();
        const x = c.width * Math.random();
        const y = c.height * Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, {
          r: color.r * 10,
          g: color.g * 10,
          b: color.b * 10,
        });
      }
    }

    function resizeCanvas() {
      if (c.width !== c.clientWidth || c.height !== c.clientHeight) {
        c.width = c.clientWidth;
        c.height = c.clientHeight;
        initFramebuffers();
      }
    }

    function generateColor() {
      let h: number;
      if (Math.random() < 0.5) h = 0.75 + Math.random() * 0.25;
      else if (Math.random() < 0.5) h = 0.45 + Math.random() * 0.15;
      else h = Math.random() * 0.2;
      const color = HSVtoRGB(h, 0.85, 0.55);
      color.r *= 0.28;
      color.g *= 0.28;
      color.b *= 0.28;
      return color;
    }

    function generateBrightColor() {
      const color = HSVtoRGB(Math.random(), 1.0, 1.0);
      color.r *= 0.15;
      color.g *= 0.15;
      color.b *= 0.15;
      return color;
    }

    function HSVtoRGB(h: number, s: number, v: number) {
      let r = 0;
      let g = 0;
      let b = 0;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }
      return { r, g, b };
    }

    // ---- pointers + interaction ----
    const pointers: any[] = [];
    {
      const p = function (this: any) {
        this.id = -1;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.down = false;
        this.moved = false;
        this.color = [30, 0, 300];
      };
      pointers.push(new (p as any)());
    }
    pointers[0].x = window.innerWidth / 2;
    pointers[0].y = window.innerHeight / 2;
    const splatStack: any[] = [];
    let lastColorChangeTime = Date.now();

    const onMouseMove = (e: MouseEvent) => {
      resume();
      const p = pointers[0];
      p.down = true;
      p.color = generateColor();
      p.moved = true;
      p.dx = (e.clientX - p.x) * 5.0;
      p.dy = (e.clientY - p.y) * 5.0;
      p.x = e.clientX;
      p.y = e.clientY;
    };

    const onMouseDown = () => {
      resume();
      const p = pointers[0];
      p.down = true;
      p.color = generateColor();
    };

    const onTouchMove = (e: TouchEvent) => {
      resume();
      const t = e.touches[0];
      const p = pointers[0];
      p.down = true;
      p.moved = true;
      p.color = generateColor();
      p.dx = (t.clientX - p.x) * 5.0;
      p.dy = (t.clientY - p.y) * 5.0;
      p.x = t.clientX;
      p.y = t.clientY;
    };

    const onTouchStart = (e: TouchEvent) => {
      resume();
      const t = e.touches[0];
      const p = pointers[0];
      p.down = true;
      p.moved = true;
      p.color = generateColor();
      p.x = t.clientX;
      p.y = t.clientY;
      p.dx = 0;
      p.dy = 0;
    };

    // ---- initial splats ----
    function bootBurst(count: number) {
      for (let i = 0; i < count; i++) {
        const color = generateBrightColor();
        splat(
          c.width * Math.random(),
          c.height * Math.random(),
          1000 * (Math.random() - 0.5),
          1000 * (Math.random() - 0.5),
          { r: color.r * 10, g: color.g * 10, b: color.b * 10 }
        );
      }
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    initFramebuffers();
    bootBurst(20);
    update();

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      if (idleTimeoutId != null) clearTimeout(idleTimeoutId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default FluidBackground;
