import { toScenePosition } from '../../src/game/world/coordinates.ts';
import type { ProjectedPosition } from '../../src/game/world/coordinates.ts';

export interface ProjectedFootprint {
  id: string;
  minEasting: number;
  maxEasting: number;
  minNorthing: number;
  maxNorthing: number;
}

export interface FootprintChunk {
  id: string;
  gridX: number;
  gridY: number;
  buildingIds: string[];
}

const CHUNK_SIZE = 128;
const MAX_CHUNKS_PER_FOOTPRINT = 4096;

// Footprint bounds are half-open and share the origin's projected CRS.
export function compileFootprintChunks(
  footprints: readonly ProjectedFootprint[],
  origin: ProjectedPosition,
): FootprintChunk[] {
  if (![origin.easting, origin.northing, origin.elevation].every(Number.isFinite)) {
    throw new Error('Invalid world origin');
  }

  const chunks = new Map<string, FootprintChunk>();
  const seen = new Set<string>();
  for (const footprint of footprints) {
    const { id, minEasting, maxEasting, minNorthing, maxNorthing } = footprint;
    if (!id.trim() || seen.has(id)) throw new Error(`Invalid or duplicate footprint ID: ${id}`);
    if (![minEasting, maxEasting, minNorthing, maxNorthing].every(Number.isFinite) ||
        minEasting >= maxEasting || minNorthing >= maxNorthing) {
      throw new Error(`Invalid footprint bounds: ${id}`);
    }
    seen.add(id);

    const min = toScenePosition({ easting: minEasting, northing: minNorthing, elevation: origin.elevation }, origin);
    const max = toScenePosition({ easting: maxEasting, northing: maxNorthing, elevation: origin.elevation }, origin);
    const firstX = Math.floor(min.x / CHUNK_SIZE);
    const lastX = Math.ceil(max.x / CHUNK_SIZE) - 1;
    const firstY = Math.floor(-min.z / CHUNK_SIZE) + 0;
    const lastY = Math.ceil(-max.z / CHUNK_SIZE) - 1;
    const count = (lastX - firstX + 1) * (lastY - firstY + 1);
    if (![firstX, lastX, firstY, lastY].every(Number.isSafeInteger) ||
        count < 1 || count > MAX_CHUNKS_PER_FOOTPRINT) {
      throw new Error(`Footprint spans an invalid chunk range: ${id}`);
    }

    for (let gridY = firstY; gridY <= lastY; gridY++) {
      for (let gridX = firstX; gridX <= lastX; gridX++) {
        const chunkId = `chunk:${gridX}:${gridY}`;
        let chunk = chunks.get(chunkId);
        if (!chunk) {
          chunk = { id: chunkId, gridX, gridY, buildingIds: [] };
          chunks.set(chunkId, chunk);
        }
        chunk.buildingIds.push(id);
      }
    }
  }
  return [...chunks.values()]
    .sort((a, b) => a.gridY - b.gridY || a.gridX - b.gridX)
    .map((chunk) => ({ ...chunk, buildingIds: chunk.buildingIds.sort() }));
}
