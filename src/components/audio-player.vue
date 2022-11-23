<script setup lang="ts">
import * as THREE from "three";

const canvas = ref<HTMLCanvasElement>();
const mediaElement = ref<HTMLAudioElement>();

const scene = new THREE.Scene();
const camera = new THREE.Camera();

const listener = new THREE.AudioListener();
const audio = new THREE.Audio(listener);

const file = "/bossa.mp3";
const FFT_SIZE = 1024;

mediaElement.value = new Audio(file);

const bruh = () => {
  console.log(mediaElement.value);
  listener.context.resume();
  mediaElement.value!.play();
  console.log("abasd");
};

onMounted(() => {
  const el = mediaElement.value as HTMLAudioElement;

  audio.setMediaElementSource(el);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas.value,
    alpha: true,
  });
  renderer.setClearColor(0x000000, 0);

  const analyser = new THREE.AudioAnalyser(audio, FFT_SIZE);
  const geometry = new THREE.PlaneGeometry(1, 1);

  let render = function () {
    const format = renderer.capabilities.isWebGL2
      ? THREE.RedFormat
      : THREE.LuminanceFormat;
    const uniforms = {
      tAudioData: {
        value: new THREE.DataTexture(analyser.data, FFT_SIZE / 2, 1, format),
      },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
varying vec2 vUv;

void main() {

  vUv = uv;
  gl_Position = vec4( position, 1.0 );

}
`,
      fragmentShader: `
uniform sampler2D tAudioData;
varying vec2 vUv;

void main() {

  vec3 backgroundColor = vec3( 0.0, 0.0, 0.0 );
  vec3 color = vec3( 1.0, 1.0, 1.0 );

  float f = texture2D( tAudioData, vec2( vUv.x, 1.0 ) ).r;

  // float i = step( vUv.y, f ) * step( f - 0.0125, vUv.y );

  gl_FragColor = vec4( mix( backgroundColor, color, f ), 1.0 );
  // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

}
  `,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    analyser.getFrequencyData();
    uniforms.tAudioData.value.needsUpdate = true;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };
  render();
});
</script>

<template>
  <div>
    <canvas ref="canvas" />
    <button @click="bruh">play</button>
  </div>
</template>
