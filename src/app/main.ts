import './styles.css';
import { walk } from '../game/player/movement.ts';
import { createScene } from '../game/rendering/scene.ts';
import { proofBlock } from '../game/world/proofBlock.ts';

const canvas = document.querySelector<HTMLCanvasElement>('#world')!;
const coordinates = document.querySelector<HTMLElement>('#coordinates')!;
const error = document.querySelector<HTMLElement>('#error')!;
const keys = new Set<string>();
const controls = new Set([
  'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
  'ShiftLeft', 'ShiftRight',
]);

function start() {
  const scene = createScene(canvas);
  scene.resize();
  window.addEventListener('resize', scene.resize);
  canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? canvas.clientHeight : 1;
    scene.zoom(event.deltaY * scale);
  }, { passive: false });
  window.addEventListener('keydown', (event) => {
    if (!controls.has(event.code)) return;
    event.preventDefault();
    keys.add(event.code);
  });
  window.addEventListener('keyup', (event) => keys.delete(event.code));
  window.addEventListener('blur', () => keys.clear());
  document.addEventListener('visibilitychange', () => keys.clear());

  const obstacles = proofBlock.buildings.map(({ bounds }) => bounds);
  const diagonal = Math.SQRT1_2;
  const pressed = (key: string, arrow: string) => Number(keys.has(key) || keys.has(arrow));
  let position = proofBlock.spawn;
  let previousTime = performance.now();
  const startTime = previousTime;

  function frame(time: number) {
    const right = pressed('KeyD', 'ArrowRight') - pressed('KeyA', 'ArrowLeft');
    const forward = pressed('KeyW', 'ArrowUp') - pressed('KeyS', 'ArrowDown');
    // Screen right maps to +X/-Z, and screen up maps to -X/-Z.
    position = walk(position, { x: (right - forward) * diagonal, z: (-right - forward) * diagonal },
      (time - previousTime) / 1000, proofBlock.bounds, obstacles,
      keys.has('ShiftLeft') || keys.has('ShiftRight'));
    previousTime = time;
    const label = `X ${position.x.toFixed(1)} m · Z ${position.z.toFixed(1)} m`;
    if (coordinates.textContent !== label) coordinates.textContent = label;
    scene.render(position, (time - startTime) / 1000);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

try {
  start();
} catch (cause) {
  console.error(cause);
  error.hidden = false;
  error.textContent = 'The walking scene could not start. Check that WebGL is available in your browser.';
}
