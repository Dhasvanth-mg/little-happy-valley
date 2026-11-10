import * as THREE from 'three';
import type { Bounds, Point } from '../player/movement.ts';
import { proofBlock } from '../world/proofBlock.ts';
import { daylightAt } from '../simulation/daylight.ts';

const CAMERA_OFFSET = new THREE.Vector3(30, 30, 30);
const VIEW_HEIGHT = 48;

export function createScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
  const scene = new THREE.Scene();
  const sky = new THREE.Color();
  const nightSky = new THREE.Color(0x10162e);
  const daySky = new THREE.Color(0x293944);
  scene.background = sky;
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 180);

  const sunlight = new THREE.DirectionalLight(0xffe2bd, 2);
  sunlight.position.set(-20, 40, 10);
  const ambient = new THREE.HemisphereLight(0xe5f3ff, 0x706452, 1.9);
  scene.add(sunlight, ambient);

  function addBox(bounds: Bounds, height: number, color: number) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(bounds.maxX - bounds.minX, height, bounds.maxZ - bounds.minZ),
      new THREE.MeshStandardMaterial({ color }),
    );
    mesh.position.set((bounds.minX + bounds.maxX) / 2, height / 2,
      (bounds.minZ + bounds.maxZ) / 2);
    scene.add(mesh);
  }

  addBox(proofBlock.bounds, 0.01, 0x83916a);
  for (const surface of [...proofBlock.roads, ...proofBlock.sidewalks, ...proofBlock.buildings]) {
    addBox(surface.bounds, surface.height, surface.color);
  }

  const avatar = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.38, 0.95, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0xfbd067 }),
  );
  scene.add(avatar);

  function resize() {
    const aspect = Math.max(1, canvas.clientWidth) / Math.max(1, canvas.clientHeight);
    const width = Math.max(1, Math.round(360 * aspect));
    camera.left = -VIEW_HEIGHT * aspect / 2;
    camera.right = -camera.left;
    camera.top = VIEW_HEIGHT / 2;
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    renderer.setSize(width, 360, false);
  }

  function render(position: Point, elapsedSeconds: number) {
    const daylight = daylightAt(elapsedSeconds);
    sky.copy(nightSky).lerp(daySky, daylight);
    sunlight.intensity = 2 * daylight;
    ambient.intensity = 0.4 + 1.5 * daylight;
    avatar.position.set(position.x, 0.93, position.z);
    camera.position.set(position.x, 0, position.z).add(CAMERA_OFFSET);
    camera.lookAt(position.x, 0, position.z);
    renderer.render(scene, camera);
  }

  function zoom(delta: number) {
    camera.zoom = THREE.MathUtils.clamp(camera.zoom * Math.exp(-delta * 0.001), 0.65, 2.5);
    camera.updateProjectionMatrix();
  }

  return { resize, render, zoom };
}
