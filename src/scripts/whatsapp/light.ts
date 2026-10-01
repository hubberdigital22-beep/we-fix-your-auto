export interface LightState {
	pos: number;
	angle: number;
	width: number;
	power: number;
	warm: number;
}

export interface Light {
	state: LightState;
	pointer: { x: number; y: number; on: number };
	start(): void;
	stop(): void;
	render(): void;
	destroy(): void;
}

const VERT = `
attribute vec2 a;
void main() {
	gl_Position = vec4(a, 0.0, 1.0);
}`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_res;
uniform float u_time;
uniform vec4 u_beam;
uniform vec2 u_ptr;
uniform float u_ptr_on;
uniform float u_warm;

float hash(vec2 p) {
	vec3 p3 = fract(vec3(p.xyx) * 0.1031);
	p3 += dot(p3, p3.yzx + 33.33);
	return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	f = f * f * (3.0 - 2.0 * f);
	return mix(
		mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
		mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
		f.y
	);
}

void main() {
	vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
	float c = cos(u_beam.y);
	float s = sin(u_beam.y);
	vec2 q = vec2(c * p.x - s * p.y, s * p.x + c * p.y);

	float d = q.x - (u_beam.x + u_ptr.x * 0.05);
	float w = u_beam.z;

	float edge = d > 0.0 ? 0.62 : 1.0;
	float core = exp(-pow(d / (w * 0.5 * edge), 2.0));
	float halo = exp(-pow(d / (w * 1.9), 2.0));
	float beam = core * 0.6 + halo * 0.4;

	float along = smoothstep(-1.1, 0.75, q.y + u_ptr.y * 0.06);
	beam *= mix(0.22, 1.0, along);

	float dust = noise(q * 2.6 + vec2(0.0, u_time * 0.035));
	beam *= 0.8 + 0.2 * dust;

	vec2 cell = floor(gl_FragCoord.xy / 1.5);
	float rnd = hash(cell);
	float twinkle = 0.5 + 0.5 * sin(u_time * 1.3 + rnd * 60.0);
	float flake = step(0.9976, rnd) * twinkle * beam;

	vec2 spot = vec2(u_ptr.x * u_res.x / u_res.y, -u_ptr.y) * 0.5;
	float glow = exp(-dot(p - spot, p - spot) / 0.05) * u_ptr_on;

	vec3 base = vec3(0.043, 0.043, 0.047);
	vec3 tint = mix(vec3(0.86, 0.88, 0.92), vec3(0.96, 0.8, 0.5), u_warm);
	vec3 col = base + tint * beam * 0.27 * u_beam.w;
	col += tint * flake * 0.42 * u_beam.w;
	col += tint * glow * (0.035 + 0.05 * beam) * u_beam.w;

	float vig = smoothstep(1.3, 0.25, length(p * vec2(0.85, 1.0)));
	col *= mix(0.7, 1.0, vig);

	col += (hash(gl_FragCoord.xy + fract(u_time) * 61.0) - 0.5) * 0.016;

	gl_FragColor = vec4(col, 1.0);
}`;

const compile = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
	const shader = gl.createShader(type);
	if (!shader) return null;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		gl.deleteShader(shader);
		return null;
	}
	return shader;
};

const SOFTWARE = /swiftshader|llvmpipe|software|basic render/i;

export function createLight(
	canvas: HTMLCanvasElement,
	options: { animate: boolean; onGiveUp?: () => void },
): Light | null {
	try {
		if (sessionStorage.getItem('light') === 'off') return null;
	} catch {
	}
	const remember = () => {
		try {
			sessionStorage.setItem('light', 'off');
		} catch {
		}
	};

	const gl = canvas.getContext('webgl', {
		alpha: false,
		antialias: false,
		depth: false,
		stencil: false,
		powerPreference: 'low-power',
		preserveDrawingBuffer: false,
		failIfMajorPerformanceCaveat: true,
	});
	if (!gl) return null;

	const info = gl.getExtension('WEBGL_debug_renderer_info');
	const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? '');
	if (SOFTWARE.test(renderer)) {
		gl.getExtension('WEBGL_lose_context')?.loseContext();
		remember();
		return null;
	}

	const vert = compile(gl, gl.VERTEX_SHADER, VERT);
	const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
	const program = gl.createProgram();
	if (!vert || !frag || !program) return null;

	gl.attachShader(program, vert);
	gl.attachShader(program, frag);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
	gl.useProgram(program);

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
	const attr = gl.getAttribLocation(program, 'a');
	gl.enableVertexAttribArray(attr);
	gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0);

	const uRes = gl.getUniformLocation(program, 'u_res');
	const uTime = gl.getUniformLocation(program, 'u_time');
	const uBeam = gl.getUniformLocation(program, 'u_beam');
	const uPtr = gl.getUniformLocation(program, 'u_ptr');
	const uPtrOn = gl.getUniformLocation(program, 'u_ptr_on');
	const uWarm = gl.getUniformLocation(program, 'u_warm');

	const state: LightState = { pos: 0.3, angle: -0.62, width: 0.34, power: 0, warm: 0 };
	const pointer = { x: 0, y: 0, on: 0 };

	let scale = Math.min(window.devicePixelRatio || 1, 1.5);
	let raf = 0;
	let running = false;
	let last = 0;
	let slowFrames = 0;
	let measured = 0;
	let downgrades = 0;
	const origin = performance.now();

	const resize = () => {
		const width = Math.max(1, Math.round(canvas.clientWidth * scale));
		const height = Math.max(1, Math.round(canvas.clientHeight * scale));
		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width;
			canvas.height = height;
			gl.viewport(0, 0, width, height);
		}
	};

	const draw = (now: number) => {
		resize();
		gl.uniform2f(uRes, canvas.width, canvas.height);
		gl.uniform1f(uTime, options.animate ? (now - origin) / 1000 : 0);
		gl.uniform4f(uBeam, state.pos, state.angle, state.width, state.power);
		gl.uniform2f(uPtr, pointer.x, pointer.y);
		gl.uniform1f(uPtrOn, pointer.on);
		gl.uniform1f(uWarm, state.warm);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	};

	const frame = (now: number) => {
		if (!running) return;
		raf = requestAnimationFrame(frame);

		if (last && measured < 90) {
			measured += 1;
			if (now - last > 26) slowFrames += 1;
			if (measured === 90 && slowFrames > 30) {
				if (downgrades >= 2) {
					running = false;
					cancelAnimationFrame(raf);
					remember();
					options.onGiveUp?.();
					return;
				}
				downgrades += 1;
				scale *= 0.6;
				measured = 0;
				slowFrames = 0;
			}
		}
		last = now;
		draw(now);
	};

	const onLost = (event: Event) => {
		event.preventDefault();
		running = false;
		cancelAnimationFrame(raf);
		canvas.parentElement?.classList.remove('is-live');
	};
	canvas.addEventListener('webglcontextlost', onLost);

	return {
		state,
		pointer,
		start() {
			if (running) return;
			running = true;
			last = 0;
			raf = requestAnimationFrame(frame);
		},
		stop() {
			running = false;
			cancelAnimationFrame(raf);
		},
		render() {
			draw(performance.now());
		},
		destroy() {
			this.stop();
			canvas.removeEventListener('webglcontextlost', onLost);
			gl.getExtension('WEBGL_lose_context')?.loseContext();
		},
	};
}
