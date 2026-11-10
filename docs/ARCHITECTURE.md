# Technical architecture

## Stack

- Vite + strict TypeScript: application build and modules.
- Three.js/WebGL: scene graph, orthographic camera, meshes, materials, lighting, raycasts.
- React: menus, HUD, map overlay, settings; keep render-loop state outside React.
- IndexedDB: versioned saves and optional local chunk cache.
- Python geospatial tooling (offline only): GDAL, pyproj, Shapely/GeoPandas as needed for ingestion and preprocessing.
- Cloudflare Pages: static distribution of built app and content, subject to current service limits.

## Runtime boundaries

`AppShell` owns startup, settings, error reporting and UI. `GameLoop` owns simulation timestep. `WorldManager` tracks origin and active regions. `ChunkStreamer` prioritizes nearby content. `Renderer` owns GPU resources. `PlayerController` handles movement/collision. `InteractionSystem` resolves actions. `InteriorManager` loads generated interiors. `SaveManager` serializes stable overrides. Avoid circular dependencies; communicate through typed interfaces/events.

## World compilation

Offline: source data → licensed ingestion → coordinate normalization → geometry cleanup → canonical feature store → deterministic world compiler → versioned chunk manifests and geometry/texture bundles → static hosting.

Runtime: load manifest → request nearby chunks → validate schema and hashes → instantiate geometry/collision → activate interactions → unload distant chunks and dispose resources. Do not call live map APIs during play.

## Spatial system

Use projected metric coordinates in offline data. EPSG:26918 is a candidate for State College; confirm source datum and vertical datum. Define immutable world origin. 1 world unit = 1 meter. Start with 128 m grid chunks; large buildings retain one canonical ID and may be referenced by multiple chunks. Store transforms chunk-relative to avoid precision drift.

## Rendering strategy

Orthographic camera with initial 45-degree yaw and approximately 35.264-degree elevation. Begin with a 640×360 reference render target, nearest-neighbor upscale, and 16 texels/meter reference texture density; validate and revise through visual tests. Use low-poly structures plus pixel-art materials and selective sprites. Avoid postprocessing that blurs pixels. Fixed camera rotation for MVP.

## Streaming and LOD

Use a near ring for full geometry, middle ring for simplified buildings, and far ring for terrain silhouettes. Exact radii depend on profiling. Prioritize chunks based on distance and movement; cancel obsolete loads; cap simultaneous fetch/decode; use shared instancing and asset caching. Do not stall the main thread for chunk parsing or geometry creation when workers are viable.

## Persistence

IndexedDB stores schema version, world snapshot ID, player transform, discovered POIs, interior state and object overrides. Save files must be exportable/importable and migratable. Source geography is immutable; saves store deltas only. Use explicit compatibility rules when world manifests change.

## Performance targets (not guarantees)

60 FPS on selected reference desktop (16.7 ms frame budget), ≤2 GB runtime memory, and no noticeable >150 ms main-thread stalls at chunk boundaries. Profile first; do not assume these budgets have been achieved. Mobile is not a first-release requirement.

## Security and privacy

No secrets or privileged backend in browser code. Sanitize imported text and POI labels. Do not embed arbitrary user-supplied HTML. Saves remain local unless future cloud features are approved. Avoid analytics by default.
