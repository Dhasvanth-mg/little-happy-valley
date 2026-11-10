# Detailed pixel-art art direction

## Target look

High-density isometric pixel-art town, with legible street topology, recognizable building silhouettes, layered vegetation, storefront details, and richly furnished interiors. This is an original visual identity, not a copy of the Reddit creator's artwork.

## Camera and scale baseline

Orthographic camera; yaw 45°, elevation ~35.264°. 1 unit = 1 m. Prototype internal resolution 640×360; nearest-neighbor upscale. Reference texture density 16 texels/meter. These values must be validated against pixel stability and legibility before being locked for production.

## Rules

- Nearest-neighbor filtering; no accidental antialiasing or mixed pixel densities.
- Consistent palette and lighting response across exteriors/interiors.
- Clear silhouettes and readable doors at gameplay zoom.
- Avoid baked highlights/shadows that conflict with dynamic sun lighting.
- Pixel-align static props and camera where practical; test movement for shimmer.
- Use reusable facade, roof, window, door, signage, vegetation, furniture and prop kits.
- Make seasonal/weather changes through materials, decals and effects rather than duplicating every model.

## Asset metadata

Every asset has ID, version, category, dimensions in meters, pixel dimensions, pivot, collision type, material, atlas reference, LOD policy, placement rules, content hash, and license. Example names: `facade_brick_red_03`, `window_shop_double_02`, `prop_cafe_table_round_04`.

## Long-term library targets (not MVP requirements)

120 facade modules; 100 windows/doors; 80 roofs/trim; 80 signage/awnings; 100 roads/street props; 100 vegetation; 80 interior surfaces; 160 furniture/fixtures; 150 small props; 60 lighting/effects; 70 character components. Total 1,100 reusable variants. The MVP needs only a curated subset.

## Review gates

Art proof scene includes brick commercial building, modern building, residential building, trees, roads, storefront and interior. Review at 100%, 200%, 300% zoom and during camera movement, daytime/nighttime. Reject mismatched perspective, texture shimmer, blurry edges, incorrect scale, unlicensed sources, or unusable silhouettes.
