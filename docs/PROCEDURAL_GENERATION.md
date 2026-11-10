# Procedural buildings and interiors

## Deterministic generation contract

Inputs: stable feature ID, validated footprint, category, seed, source snapshot, generator version, art-kit version, and optional manually authored constraints. Outputs: renderable scene description, collision, navigation, interaction anchors, asset references, validation report, and hashes. Identical inputs must produce identical outputs.

## Exteriors

1. Repair/validate footprint and orient street-facing edges.
2. Determine measured/estimated height and floors, retaining confidence labels.
3. Extrude massing and generate roof profile.
4. Partition facade surfaces into modules with door/window grammar.
5. Apply approved material kits, signage placeholders, architectural trim, props and lighting anchors.
6. Align to terrain and verify sidewalk clearance.
7. Generate LODs, simplified collision and navigation boundaries.
8. Apply landmark overrides without changing canonical building ID.

Profiles: downtown brick commercial, university stone, modern academic, residential siding, mixed-use apartments, industrial/service. Avoid random architectural combinations that violate building function.

## Interiors

Generate from building footprint inset, entrances, usable floor area, archetype, seed and version. Steps: reserve structure and circulation → build room/zone adjacency graph → partition floor polygon → position fixtures → fill furniture/props → compute navigation → validate reachability → retry bounded alternatives → fall back to a simple valid layout.

Initial archetypes: cafe, retail, lobby. Future archetypes: restaurant, convenience store, library, classroom, office, apartment, generic commercial. Treat private and nonpublic interiors as fictional; no exact reconstructions without appropriate permission.

## Validation

All public zones reachable from entry; exit always reachable; no furniture blocks critical routes; door clearances and collision valid; all props inside assigned rooms; navigation meshes connect expected destinations; save/load preserves identity. Test 1,000 seeded candidates across archetypes, with 100% validity among accepted output. Aim for at least 20 distinguishable valid variants per archetype in a standardized footprint.

## Performance

Generate expensive geometry offline when possible. Runtime interiors should preferably instantiate from compact deterministic scene descriptions and reusable kits. Cache recently used interiors. Limit per-frame generation work and provide loading transitions. Never require paid inference at runtime.
