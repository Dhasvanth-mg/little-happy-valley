import assert from 'node:assert/strict';
import test from 'node:test';
import { toScenePosition } from '../src/game/world/coordinates.ts';

const origin = { easting: 100_000, northing: 200_000, elevation: 300 };

test('maps the projected origin to zero in the scene', () => {
  assert.deepEqual(toScenePosition(origin, origin), { x: 0, y: 0, z: 0 });
});

test('preserves meter offsets with east on X, up on Y, and north on negative Z', () => {
  const point = { easting: 100_012.5, northing: 200_008, elevation: 298 };
  assert.deepEqual(toScenePosition(point, origin), { x: 12.5, y: -2, z: -8 });
});
