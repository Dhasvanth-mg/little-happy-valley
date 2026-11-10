import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const args = [
  '--experimental-strip-types',
  '--disable-warning=ExperimentalWarning',
  'tools/world-compiler/compile.ts',
];

test('the compiler emits a repeatable manifest for the synthetic snapshot', () => {
  const compile = () => spawnSync(process.execPath, [...args, 'tests/fixtures/synthetic-footprints.json'], {
    encoding: 'utf8',
  });
  const first = compile();
  const second = compile();
  assert.equal(first.status, 0, first.stderr);
  assert.equal(second.status, 0, second.stderr);
  assert.equal(first.stdout, second.stdout);
  const { contentHash, chunks, sourceSnapshotId } = JSON.parse(first.stdout);
  assert.match(contentHash, /^[a-f0-9]{64}$/);
  assert.equal(sourceSnapshotId, 'synthetic-footprints-v1');
  assert.deepEqual(chunks.map(({ id }: { id: string }) => id), ['chunk:0:0', 'chunk:1:0']);
});

test('the compiler rejects invalid snapshot metadata without emitting JSON', () => {
  const result = spawnSync(process.execPath, [...args, 'package.json'], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /Invalid snapshot version/);
});
