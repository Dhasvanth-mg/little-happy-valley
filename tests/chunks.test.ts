import assert from 'node:assert/strict';
import test from 'node:test';
import { compileFootprintChunks } from '../tools/world-compiler/chunks.ts';

const origin = { easting: 1000, northing: 2000, elevation: 300 };
const edge = {
  id: 'edge', minEasting: 1000, maxEasting: 1128, minNorthing: 2000, maxNorthing: 2128,
};
const crossing = {
  id: 'crossing', minEasting: 999, maxEasting: 1001, minNorthing: 1999, maxNorthing: 2001,
};

test('indexes half-open bounds without adding chunks across exact edges', () => {
  assert.deepEqual(compileFootprintChunks([edge], origin), [
    { id: 'chunk:0:0', gridX: 0, gridY: 0, buildingIds: ['edge'] },
  ]);
});

test('preserves cross-chunk IDs and produces stable output across input order', () => {
  const chunks = compileFootprintChunks([edge, crossing], origin);
  assert.deepEqual(chunks, compileFootprintChunks([crossing, edge], origin));
  assert.deepEqual(chunks.map((chunk) => chunk.id), [
    'chunk:-1:-1', 'chunk:0:-1', 'chunk:-1:0', 'chunk:0:0',
  ]);
  assert.deepEqual(chunks[3].buildingIds, ['crossing', 'edge']);
});

test('rejects duplicate IDs, invalid bounds, and excessive chunk spans', () => {
  assert.throws(() => compileFootprintChunks([edge, edge], origin), /duplicate/);
  assert.throws(() => compileFootprintChunks([{ ...edge, maxEasting: Infinity }], origin), /bounds/);
  assert.throws(() => compileFootprintChunks([{ ...edge, maxEasting: 1e9 }], origin), /chunk range/);
});
