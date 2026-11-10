# Architecture decision record

## Accepted

- ADR-001: Browser-first game instead of Godot desktop build. Rationale: shareable URL, rapid iteration, no installation.
- ADR-002: TypeScript + Three.js + Vite. React limited to application UI. Rationale: direct browser rendering and streaming control.
- ADR-003: Detailed 2.5D isometric pixel art over 3D geometry. Rationale: preserve map-inspired appearance while supporting collisions, terrain, interiors.
- ADR-004: Hybrid geography. Rationale: preserve recognizable roads/buildings with logged playability adjustments.
- ADR-005: Procedural-first interiors. Rationale: scale coverage without hand-authoring every room.
- ADR-006: Static hosting + client-side simulation + IndexedDB. Rationale: $0-first infrastructure.
- ADR-007: Single-player Alpha 0.1. Rationale: avoid early server complexity.
- ADR-008: Initial ~300 m × 300 m downtown vertical slice. Rationale: test complete pipeline before expanding.
- ADR-009: Documentation-only handoff. Rationale: implementation requires explicit owner authorization.

## Provisional engineering values

128 m chunk grid, 640×360 reference render target, 16 texels/meter, camera yaw 45°, elevation ~35.264°, 60 FPS reference desktop target, ≤2 GB runtime memory target. Must be measured and adjusted if necessary.

## Open questions to resolve in P0

1. Exact downtown boundary polygon and building list.
2. Approved datasets, actual coverage, license obligations, and attribution format.
3. Coordinate and vertical datum; world origin.
4. Reference laptop/desktop hardware and supported browsers.
5. Art palette and initial master asset kit.
6. Whether Vite + React UI remains sufficiently lightweight or should be reduced.
7. Hosting provider limits and static asset distribution strategy at deployment time.

## Change control

New decisions receive an ADR entry with date, reason, alternatives, impact, and approval. Do not silently revise accepted product decisions.

## Project identity (2026-11-10)

- Official title: **Little Happy Valley**.
- Repository slug: `little-happy-valley`.
- Tagline: *A little world with a lot to explore.*
- The game is an independent project inspired by the State College region, not an official Penn State product. Name, domain, and trademark availability have not been verified.
