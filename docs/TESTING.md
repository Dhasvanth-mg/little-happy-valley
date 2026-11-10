# Testing and acceptance

## Automated test layers

1. Schema validation: all external JSON and generated manifests parse against versioned contracts.
2. Geographic tests: valid polygons, consistent CRS, no duplicate IDs, connected intended routes, bounded elevation discontinuities, source provenance.
3. Generator tests: deterministic output for identical inputs, valid meshes, no intersections with roads, appropriate facade modules.
4. Interior tests: 1,000 seed/property combinations, no blocked exits, reachable public zones, bounded retries, fallback success.
5. Persistence tests: save/load, migrations, stable IDs across world snapshots, export/import.
6. Streaming tests: correct chunk ownership, cross-chunk objects, disposal of GPU resources, cancellation of stale loads.
7. Browser tests: startup, movement, door transitions, UI interaction, keyboard handling, recovery from missing assets.

## Reference test scenario

Launch → spawn near Allen Street/College Avenue → move along sidewalk → cross intersection → approach storefront → enter cafe → interact with prop → exit → enter retail → exit → enter lobby → exit → switch day/night → save → refresh browser → load → verify location and object state.

## Release blockers

Broken navigation; unlicensed assets; missing attribution; broken doors; player trapped; corrupted saves; deterministic generator mismatch; large reproducible chunk stalls; failed build; runtime console errors during core scenario.

## Performance protocol

Define hardware/browser versions. Collect FPS percentiles, frame-time p95/p99, main-thread long tasks, GPU memory proxy, JS heap, draw calls, triangle counts, network bytes, and chunk load durations. Targets: 60 FPS on reference desktop, ~16.7 ms frame budget, ≤2 GB memory, avoid >150 ms visible stalls. Targets remain provisional until measured.

## Definition of done

Feature has documented acceptance criteria, automated tests where practical, browser verification, reproducible build, no license violations, updated docs, and known limitations reported. Never mark an untested feature complete.
