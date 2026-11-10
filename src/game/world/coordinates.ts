export interface ProjectedPosition {
  easting: number;
  northing: number;
  elevation: number;
}

export interface ScenePosition {
  x: number;
  y: number;
  z: number;
}

// Both inputs must use the same projected CRS and vertical datum, in meters.
export function toScenePosition(point: ProjectedPosition, origin: ProjectedPosition): ScenePosition {
  return {
    x: point.easting - origin.easting,
    y: point.elevation - origin.elevation,
    z: origin.northing - point.northing,
  };
}
