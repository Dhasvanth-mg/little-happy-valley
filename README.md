# Little Happy Valley

**Tagline:** A little world with a lot to explore.

A browser-first, single-player, open-world exploration sandbox inspired by State College, Pennsylvania, and Penn State University Park. The game will use detailed **2.5D isometric pixel art**, a geographically recognizable world, procedurally generated buildings and interiors, and progressive chunk streaming.

> **Status: preproduction only.** This repository currently contains specifications, not a playable game. Do not implement until the owner explicitly authorizes implementation.

## Project vision

Walk through recognizable streets, explore campus, enter storefronts, discover locations, interact with objects, and eventually travel across the surrounding valley. Geography should feel authentic while selective changes improve readability and playability. Interiors are plausible fictional procedural layouts, **not representations of real private floor plans**.

### Locked decisions

| Area | Decision |
|---|---|
| Platform | Modern desktop browsers first; mobile later |
| Stack | TypeScript, Three.js, Vite; React only for application UI |
| Rendering | Orthographic 3D scene with detailed pixel-art textures and pixel-aligned presentation |
| Geography | Hybrid fidelity: real road connectivity and building positions; documented gameplay adjustments |
| Interiors | Deterministic procedural generation by building archetype |
| Hosting | Cloudflare Pages static hosting, target $0 monthly infrastructure |
| Persistence | IndexedDB, with export/import of saves |
| Multiplayer | Out of scope for first release |
| Initial playable area | Approximately 300 m x 300 m near Allen Street and College Avenue |
| Initial interiors | Three: cafe, retail, lobby |
| Goal | 60 FPS on a defined reference desktop, subject to benchmarking |

## Non-goals for Alpha 0.1

No multiplayer, paid APIs, server-authoritative simulation, advanced traffic, missions, economy, entire-valley polish, photorealistic 3D, or exact reconstruction of nonpublic interiors. Avoid feature creep.

## Repository map

- [`AGENTS.md`](AGENTS.md): binding instructions for Codex and other coding agents.
- [`docs/PRODUCT.md`](docs/PRODUCT.md): game design, interaction rules, and scope.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): browser runtime, data pipeline, world streaming, and deployment.
- [`docs/DATA_SCHEMAS.md`](docs/DATA_SCHEMAS.md): canonical TypeScript-oriented logical schemas and invariants.
- [`docs/GEO_DATA.md`](docs/GEO_DATA.md): geospatial acquisition, licensing, provenance, and accuracy.
- [`docs/PROCEDURAL_GENERATION.md`](docs/PROCEDURAL_GENERATION.md): exterior and interior generators.
- [`docs/ART_DIRECTION.md`](docs/ART_DIRECTION.md): pixel-art standards and asset budgets.
- [`docs/TESTING.md`](docs/TESTING.md): quality gates, validation, performance, and acceptance criteria.
- [`docs/ROADMAP.md`](docs/ROADMAP.md): milestones, backlog, and definition of done.
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md): zero-cost-first deployment and constraints.
- [`docs/DECISIONS.md`](docs/DECISIONS.md): decision log and open questions.
- [`docs/CODEX_HANDOFF.md`](docs/CODEX_HANDOFF.md): first prompt and staged Codex workflow.

## First playable acceptance

A user opens a URL, sees a recognizable downtown block, walks on real-world-derived sidewalks, enters/exits three procedural interiors, interacts with doors and props, observes day/night changes, and saves/reloads their location. Adjacent world chunks load without disruptive stalls. A new geographic chunk can be compiled without manually rebuilding every road and building.

## Working approach

1. Audit data sources and rights before importing or deriving content.
2. Prove rendering and geographic conversion on a small block.
3. Build reusable generators and data contracts before scaling coverage.
4. Ship small, testable increments with screenshots and reproducible benchmarks.
5. Keep gameplay client-side and deploy static artifacts unless a future requirement truly needs a backend.

## Ownership and licensing

This project does not own the original Reddit map or Google's map imagery. Do not scrape Google Street View, reproduce protected imagery, or assume public accessibility grants reuse rights. Respect OpenStreetMap's ODbL, dataset-specific licenses, trademark considerations, and contributor permissions. Store source provenance and required attributions. Use original or properly licensed art.

## Current state

Documentation prepared for Codex handoff. No application, geographic dataset, 3D model, or asset has been generated yet.
