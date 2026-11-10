import type { Bounds, Point } from '../player/movement.ts';
import { compiledBuildings } from './compiledBuildings.ts';
import manifest from './synthetic-manifest.json' with { type: 'json' };

interface Surface {
  id: string;
  bounds: Bounds;
  color: number;
  height: number;
}

interface ProofBlock {
  id: string;
  bounds: Bounds;
  spawn: Point;
  roads: readonly Surface[];
  sidewalks: readonly Surface[];
  buildings: readonly Surface[];
}

// Local meters. Three.js X/Z form the ground plane and Y is elevation.
export const proofBlock: ProofBlock = {
  id: 'synthetic-downtown-v1',
  bounds: { minX: -30, maxX: 30, minZ: -30, maxZ: 30 },
  spawn: { x: 0, z: 7 },
  roads: [
    { id: 'east-west', bounds: { minX: -30, maxX: 30, minZ: -4, maxZ: 4 }, color: 0x414951, height: 0.02 },
    { id: 'north-south', bounds: { minX: -4, maxX: 4, minZ: -30, maxZ: -4 }, color: 0x414951, height: 0.02 },
  ],
  sidewalks: [
    { id: 'south', bounds: { minX: -30, maxX: 30, minZ: 4, maxZ: 9 }, color: 0xc8b49e, height: 0.08 },
    { id: 'northwest', bounds: { minX: -30, maxX: -4, minZ: -9, maxZ: -4 }, color: 0xc8b49e, height: 0.08 },
    { id: 'northeast', bounds: { minX: 4, maxX: 30, minZ: -9, maxZ: -4 }, color: 0xc8b49e, height: 0.08 },
  ],
  buildings: [
    ...compiledBuildings(manifest),
    { id: 'brick-shop', bounds: { minX: -22, maxX: -7, minZ: -23, maxZ: -9 }, color: 0xa05a48, height: 8 },
    { id: 'stone-shop', bounds: { minX: 8, maxX: 22, minZ: -21, maxZ: -9 }, color: 0xceab79, height: 6 },
    { id: 'corner-lobby', bounds: { minX: -21, maxX: -5, minZ: 9, maxZ: 22 }, color: 0x647e81, height: 10 },
    { id: 'row-shop', bounds: { minX: 5, maxX: 19, minZ: 9, maxZ: 21 }, color: 0x926f58, height: 7 },
  ],
};
