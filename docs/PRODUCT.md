# Product and game design

## Core loop

Spawn in downtown State College → walk along recognizable streets → discover and label points of interest → enter accessible fictionalized interiors → interact with doors, props, and signage → save progress → explore adjacent chunks. No quest system is required for the first playable.

## Player controls (desktop baseline)

WASD / arrow keys move relative to the camera; Shift sprint; E interact; mouse wheel zoom; Escape pause; M map. Key rebinding is a later accessibility improvement. Movement must be consistent regardless of frame rate. Camera yaw is fixed for Alpha 0.1.

## World fidelity

Preserve road topology, major pedestrian paths, relative landmark placement, and known building footprints. Sidewalk widths and inaccessible gaps may be adjusted to ensure navigation. Each modification must include a deviation reason and original geometry reference.

## Interaction contract

Interactables expose stable ID, action type, proximity radius, eligibility, prompt, and state transition. Doors have paired destinations and valid spawn points. Interactions cannot trap the player. The world map distinguishes discovered from undiscovered POIs.

## Environment

Alpha 0.1: day/night cycle with stylized lighting, ambient props, and limited NPCs only if budget permits. Later: weather, seasons, traffic, vehicles, larger campus, multiplayer. Do not add server requirements to support cosmetic effects.

## Interiors

Three initial archetypes: cafe, retail, lobby. Every interior is generated from footprint, entry point, profile, seed, and generator version. It must have a reachable exit and consistent saved state. The default authenticity label is `fictional`.

## Alpha 0.1 geographic boundary

Proposed roughly 300 m × 300 m around Allen Street and College Avenue. Exact polygon and list of buildings must be fixed only after GIS coverage is inspected. Do not assume any specific business remains open or occupies a particular address without verified current data.

## Success

A new player can understand controls, navigate the test block, recognize the setting, enter and exit all three interiors, and resume a saved session without errors. No required login, payment, or download outside the browser.
