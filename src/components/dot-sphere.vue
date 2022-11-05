<script setup lang="ts">
import {
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";

const sphereCanvas = ref<HTMLCanvasElement>();

const scene = new Scene();
const camera = new PerspectiveCamera(70);

// sphere
const group = new Object3D();
const RADIUS = 20;
const SEPARATION = 10;

// parametric curve
for (let s = 0; s < 360; s += SEPARATION) {
  for (let t = 0; t < 360; t += SEPARATION) {
    const x =
      RADIUS * Math.sin((s * Math.PI) / 180) * Math.cos((t * Math.PI) / 180);
    const y =
      RADIUS * Math.sin((s * Math.PI) / 180) * Math.sin((t * Math.PI) / 180);
    const z = RADIUS * Math.cos((s * Math.PI) / 180);

    const dot = new SphereGeometry(0.1, 6, 6);
    const dotMaterial = new MeshBasicMaterial({
      color: 0xeeeeee,
      transparent: true,
      opacity: 0.2,
    });
    const mesh = new Mesh(dot, dotMaterial);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    group.add(mesh);
  }
}

// const sphere = new Mesh(geometry, material);

group.position.set(0, 0, 0);
camera.position.set(10, 0, 10);

scene.add(group);

onMounted(() => {
  const renderer = new WebGLRenderer({
    canvas: sphereCanvas.value,
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(0x000000, 0);
  // const controls = new OrbitControls(camera, renderer.domElement);

  group.rotation.set(
    Math.random() * 2 * Math.PI,
    Math.random() * 2 * Math.PI,
    Math.random() * 2 * Math.PI
  );

  let render = function () {
    if (!sphereCanvas.value) {
      return;
    }

    sphereCanvas.value.width = window.innerWidth;
    sphereCanvas.value.height = window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);

    const rotateX = group.rotation.x + 0.0005;
    const rotateY = group.rotation.y + 0.0003;
    const rotateZ = group.rotation.z + 0.0002;

    group.rotation.set(rotateX, rotateY, rotateZ);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };
  render();
});
</script>

<template>
  <canvas
    ref="sphereCanvas"
    filter="~ blur-sm"
  />
</template>
