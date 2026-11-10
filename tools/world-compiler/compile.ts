import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { compileFootprintChunks } from './chunks.ts';

function record(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Expected an object in the footprint snapshot');
  }
  return value as Record<string, unknown>;
}

function number(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error('Expected a finite coordinate');
  return value;
}

const inputPath = process.argv[2];
if (!inputPath || process.argv.length !== 3) {
  console.error('Usage: npm run compile:world -- <snapshot.json>');
  process.exit(1);
}

try {
  const input = record(JSON.parse(readFileSync(inputPath, 'utf8')));
  const { sourceSnapshotId, crs, verticalDatum } = input;
  if (input.schemaVersion !== 1 || typeof sourceSnapshotId !== 'string' || !sourceSnapshotId.trim() ||
      typeof crs !== 'string' || !crs.trim() || typeof verticalDatum !== 'string' ||
      !verticalDatum.trim() || !Array.isArray(input.footprints)) {
    throw new Error('Invalid snapshot version, provenance, coordinate metadata, or footprint list');
  }

  const rawOrigin = record(input.origin);
  const origin = {
    easting: number(rawOrigin.easting),
    northing: number(rawOrigin.northing),
    elevation: number(rawOrigin.elevation),
  };
  const footprints = input.footprints.map((value: unknown) => {
    const entry = record(value);
    if (typeof entry.id !== 'string') throw new Error('Expected a string footprint ID');
    return {
      id: entry.id,
      minEasting: number(entry.minEasting),
      maxEasting: number(entry.maxEasting),
      minNorthing: number(entry.minNorthing),
      maxNorthing: number(entry.maxNorthing),
    };
  });
  const chunks = compileFootprintChunks(footprints, origin);
  footprints.sort((a, b) => a.id < b.id ? -1 : Number(a.id !== b.id));
  const manifest = { schemaVersion: 1, sourceSnapshotId, crs, verticalDatum, origin, footprints, chunks };
  const contentHash = createHash('sha256').update(JSON.stringify(manifest)).digest('hex');
  console.log(JSON.stringify({ ...manifest, contentHash }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
