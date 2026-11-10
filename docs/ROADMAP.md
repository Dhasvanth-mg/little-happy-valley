# Milestones and prioritized backlog

**Status: planning only.** Dates are estimates, not commitments. Work begins only after explicit authorization.

## P0 — Data and rendering feasibility (1–2 weeks)

- P0-01 Verify dataset coverage and license terms for downtown slice.
- P0-02 Select exact initial polygon and stable world origin.
- P0-03 Confirm coordinate reference and vertical datum.
- P0-04 Approve art proof scene, reference hardware, performance instrumentation.
- Exit: documented approved source manifest, downtown boundary, rendering acceptance rubric.

## P1 — Browser walking proof (2–4 days aggressive target)

- P1-01 Vite + TypeScript + Three.js scaffold and strict checks.
- P1-02 Orthographic camera and keyboard movement.
- P1-03 Render simple georeferenced road/building geometry.
- P1-04 Basic collision and debug coordinates.
- Exit: walkable browser build around one real downtown block.

## P2 — Offline geospatial pipeline (1–3 weeks)

- P2-01 Ingest and normalize OSM/GIS layers.
- P2-02 Terrain and road/path graph processing.
- P2-03 Versioned schema validation and provenance.
- P2-04 Chunk compiler and manifest generation.
- Exit: reproducible, licensed world export for slice.

## P3 — Visual world and streaming (2–4 weeks)

- P3-01 Pixel-art rendering proof and art kit.
- P3-02 Procedural facade and roof grammar.
- P3-03 Chunk load/unload, LOD and GPU disposal.
- P3-04 Landmark override support and location labels.
- Exit: recognizable, navigable downtown at target quality level.

## P4 — Interiors and interactions (2–4 weeks)

- P4-01 Interior room graph and partition generator.
- P4-02 Cafe, retail, lobby archetypes.
- P4-03 Door transitions and prop interactions.
- P4-04 Seeded generation validation and persistence.
- Exit: three stable enterable interiors with safe exits.

## P5 — Alpha systems (1–3 weeks)

- P5-01 Day/night lighting.
- P5-02 Minimap, discovered POIs and pause/settings UI.
- P5-03 IndexedDB saves and export/import.
- P5-04 Accessibility and failure handling.
- Exit: end-to-end exploration scenario passes.

## P6 — Deploy and stabilize (1–2 weeks)

- P6-01 Optimize assets and static chunk delivery.
- P6-02 Cloudflare Pages preview and production setup.
- P6-03 Browser regression and profiling.
- P6-04 License/attribution audit and release checklist.
- Exit: public playable URL with documented limitations.

## Sequencing

P0 is mandatory before geographic ingestion. A minimal P1 proof may be implemented after authorization with synthetic geometry while licensing work continues. P2 and rendering work may overlap once contracts are frozen. Do not build entire-valley content before P6.

## First playable definition

~300 m × 300 m recognizable downtown; walking and sprinting; fixed isometric camera with zoom; procedural building exteriors; cafe, retail and lobby interiors; doors and props; day/night; local saves; chunk streaming; desktop browser build. 60 FPS is a target to validate, not a promise.
