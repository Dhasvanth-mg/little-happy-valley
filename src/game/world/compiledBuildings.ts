import { toScenePosition } from './coordinates.ts';
import type { ProjectedPosition } from './coordinates.ts';

interface BuildingManifest {
  origin: ProjectedPosition;
  footprints: readonly {
    id: string;
    minEasting: number;
    maxEasting: number;
    minNorthing: number;
    maxNorthing: number;
  }[];
  chunks: readonly { buildingIds: readonly string[] }[];
}

// This consumes a bundled compiler output. A cross-chunk building has one mesh and collider.
export function compiledBuildings(manifest: BuildingManifest) {
  const referenced = new Set(manifest.chunks.flatMap((chunk) => chunk.buildingIds));
  return manifest.footprints.filter(({ id }) => referenced.has(id)).map((footprint) => {
    const { origin } = manifest;
    const southwest = toScenePosition({
      easting: footprint.minEasting, northing: footprint.minNorthing, elevation: origin.elevation,
    }, origin);
    const northeast = toScenePosition({
      easting: footprint.maxEasting, northing: footprint.maxNorthing, elevation: origin.elevation,
    }, origin);
    return {
      id: footprint.id,
      bounds: { minX: southwest.x, maxX: northeast.x, minZ: northeast.z, maxZ: southwest.z },
      color: 0xb28568,
      height: 7,
    };
  });
}
