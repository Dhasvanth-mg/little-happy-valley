export interface Point {
  x: number;
  z: number;
}

export interface Bounds {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export const PLAYER_RADIUS = 0.4;
const SPEED = 5;
const MAX_FRAME_SECONDS = 0.1;

export function walk(
  position: Point,
  input: Point,
  seconds: number,
  bounds: Bounds,
  obstacles: readonly Bounds[],
  sprinting = false,
): Point {
  const magnitude = Math.hypot(input.x, input.z);
  if (magnitude === 0 || seconds <= 0) return position;

  const distance = SPEED * (sprinting ? 1.6 : 1) * Math.min(seconds, MAX_FRAME_SECONDS);
  const scale = distance / Math.max(1, magnitude);
  let x = Math.max(bounds.minX + PLAYER_RADIUS,
    Math.min(bounds.maxX - PLAYER_RADIUS, position.x + input.x * scale));

  // Sweep each axis separately so a blocked axis still permits wall sliding.
  for (const obstacle of obstacles) {
    if (position.z <= obstacle.minZ - PLAYER_RADIUS ||
        position.z >= obstacle.maxZ + PLAYER_RADIUS) continue;
    if (position.x <= obstacle.minX - PLAYER_RADIUS) {
      x = Math.min(x, obstacle.minX - PLAYER_RADIUS);
    } else if (position.x >= obstacle.maxX + PLAYER_RADIUS) {
      x = Math.max(x, obstacle.maxX + PLAYER_RADIUS);
    }
  }

  let z = Math.max(bounds.minZ + PLAYER_RADIUS,
    Math.min(bounds.maxZ - PLAYER_RADIUS, position.z + input.z * scale));
  for (const obstacle of obstacles) {
    if (x <= obstacle.minX - PLAYER_RADIUS || x >= obstacle.maxX + PLAYER_RADIUS) continue;
    if (position.z <= obstacle.minZ - PLAYER_RADIUS) {
      z = Math.min(z, obstacle.minZ - PLAYER_RADIUS);
    } else if (position.z >= obstacle.maxZ + PLAYER_RADIUS) {
      z = Math.max(z, obstacle.maxZ + PLAYER_RADIUS);
    }
  }
  return { x, z };
}
