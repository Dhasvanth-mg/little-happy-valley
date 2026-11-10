import assert from 'node:assert/strict';
import test from 'node:test';
import { daylightAt } from '../src/game/simulation/daylight.ts';
import { walk, PLAYER_RADIUS } from '../src/game/player/movement.ts';
import { proofBlock } from '../src/game/world/proofBlock.ts';

const bounds = { minX: -10, maxX: 10, minZ: -10, maxZ: 10 };
const wall = { minX: 1, maxX: 3, minZ: -2, maxZ: 2 };
const origin = { x: 0, z: 0 };

test('daylight fades into night and repeats every three minutes', () => {
  assert.equal(daylightAt(0), 1);
  assert.ok(daylightAt(30) > 0 && daylightAt(30) < 1);
  assert.equal(daylightAt(90), 0);
  assert.equal(daylightAt(180), 1);
});

test('normalizes diagonal movement and scales by elapsed time', () => {
  const straight = walk(origin, { x: 1, z: 0 }, 0.1, bounds, []);
  const diagonal = walk(origin, { x: 1, z: 1 }, 0.1, bounds, []);
  assert.ok(Math.abs(Math.hypot(diagonal.x, diagonal.z) - straight.x) < 1e-10);
  assert.equal(walk(origin, { x: 1, z: 0 }, 0.05, bounds, []).x, straight.x / 2);
});

test('blocks movement through a building and slides along its wall', () => {
  const position = { x: 1 - PLAYER_RADIUS, z: 0 };
  const next = walk(position, { x: 1, z: 1 }, 0.1, bounds, [wall]);
  assert.equal(next.x, position.x);
  assert.ok(next.z > position.z);
});

test('limits long frames and stays inside world bounds', () => {
  assert.equal(walk(origin, { x: 1, z: 0 }, 60, bounds, []).x, 0.5);
  assert.equal(walk({ x: 9.5, z: 0 }, { x: 1, z: 0 }, 0.1, bounds, []).x, 10 - PLAYER_RADIUS);
});

test('sprint increases speed while respecting building collision', () => {
  const input = { x: 1, z: 0 };
  assert.equal(walk(origin, input, 0.1, bounds, [], true).x, 0.8);
  assert.equal(walk(origin, input, 0.1, bounds, [wall], true).x, 1 - PLAYER_RADIUS);
});

test('synthetic spawn is inside the block and clear of all buildings', () => {
  const { spawn, bounds, buildings } = proofBlock;
  assert.ok(spawn.x > bounds.minX + PLAYER_RADIUS && spawn.x < bounds.maxX - PLAYER_RADIUS);
  assert.ok(spawn.z > bounds.minZ + PLAYER_RADIUS && spawn.z < bounds.maxZ - PLAYER_RADIUS);
  for (const { bounds: building } of buildings) {
    assert.ok(spawn.x < building.minX - PLAYER_RADIUS || spawn.x > building.maxX + PLAYER_RADIUS ||
      spawn.z < building.minZ - PLAYER_RADIUS || spawn.z > building.maxZ + PLAYER_RADIUS);
  }
});
