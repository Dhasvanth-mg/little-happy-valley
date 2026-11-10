# AGENTS.md — Instructions for coding agents

Read this file and the linked specifications **before modifying the repository**. This file is authoritative for agent behavior, while `docs/DECISIONS.md` records architectural choices.

## Current authorization gate

**DOCUMENTATION ONLY. Do not implement, install dependencies, scaffold application files, fetch geographic datasets, generate images, or deploy until the owner explicitly says to begin implementation.** You may review documentation, identify contradictions, and propose a plan. If instructions conflict, ask the owner rather than silently changing locked choices.

## Product invariants

- Browser-first, static-hostable, single-player open-world exploration game.
- TypeScript + Three.js + Vite; React for menus and application UI, not for per-frame world state.
- Detailed 2.5D isometric pixel art on real 3D geometry, initially fixed orthographic camera.
- Hybrid geography: preserve verified street connectivity, landmarks, and building positions; log deviations.
- Procedural-first, deterministic interiors; never claim generated interiors are authentic floor plans.
- No required paid services, API keys, or always-on backend for Alpha 0.1.
- Stable geographic and game-object IDs; versioned schemas and save migrations.
- No unauthorized use of Google Street View, the Reddit creator's map, copyrighted art, or restricted floor plans.

## Agent workflow after implementation is authorized

1. Read `README.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/DATA_SCHEMAS.md`, `docs/ROADMAP.md`, and relevant specialized docs.
2. State the milestone, scope, assumptions, files to change, tests, and risks **before coding**.
3. Implement one coherent vertical slice at a time. Prefer small reviewable changes over giant rewrites.
4. Add tests for geometry, generator determinism, save migration, and gameplay state alongside features.
5. Run lint, typecheck, tests, and build before claiming completion; report commands and actual outcomes.
6. Update documentation and decision log when behavior or contracts change.
7. Never claim a feature works based solely on code generation; distinguish implemented, tested, and manually verified.

## Code quality

- Strict TypeScript; avoid `any`, unvalidated external JSON, implicit units, and unbounded memory growth.
- Keep rendering, simulation, data loading, procedural generation, persistence, and UI separate.
- Treat external geospatial data as untrusted input. Validate at ingestion and at runtime boundaries.
- Prefer deterministic pure functions for world generation, with explicit seed and generator version.
- Use meters in world coordinates; use a documented projected CRS and local chunk-relative transforms.
- Use stable IDs and content hashes; never use array positions as persistent identities.
- Keep draw calls, geometry allocations, texture memory, and chunk transitions measurable.
- Dispose GPU resources and cancel obsolete loading tasks when chunks unload.
- Support keyboard interaction, scalable UI, reduced-motion options, and accessible contrast where practical.
- No hardcoded secrets, copyrighted copied assets, remote tracking, or unnecessary user data collection.

## Expected repository organization after authorization

`src/app`, `src/game/rendering`, `src/game/player`, `src/game/world`, `src/game/buildings`, `src/game/interiors`, `src/game/interactions`, `src/game/simulation`, `src/game/persistence`, `src/game/ui`, `src/shared`, `tools/geodata`, `tools/world-compiler`, `public/world`, `public/assets`, `tests`.

These paths are planned, not permission to create them yet.

## Definition of done

A task is done only when its acceptance tests pass, build output works in a browser, the implementation respects data provenance and performance budgets, and the change is documented. Include test evidence and known limitations.

## Escalation rules

Ask before adding backend services, paid dependencies, login requirements, map providers, network requests at runtime, new licenses, multiplayer, major architecture changes, or scope beyond Alpha 0.1. Do not silently replace Three.js with another engine.

## Priority order

Legal/data integrity > correct and playable geography > stable runtime > procedural scalability > visual polish > extra features.
