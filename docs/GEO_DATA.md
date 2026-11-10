# Geographic data, fidelity, and licensing

## Candidate sources (not yet licensed/approved)

- OpenStreetMap: roads, footpaths, building footprints, POIs. ODbL attribution and database obligations must be evaluated. https://www.openstreetmap.org/copyright
- Centre County GIS: local features and possible building-height information; review individual layer terms. https://centrecountypa.gov/202/GIS
- PASDA: Pennsylvania terrain and imagery layers; confirm terms and datum per dataset. https://www.pasda.psu.edu/
- USGS 3DEP: elevation sources. https://www.usgs.gov/3d-elevation-program
- Original photography and expressly licensed imagery for facade references.

## P0 source review

| Candidate | Proposed use | Terms and remaining checks |
|---|---|---|
| OpenStreetMap raw vector data | Roads, pedestrian links, and building footprints | ODbL. Display contributor attribution and a license link. Keep the source extract and derived geographic database separable from game code and art. Determine the database distribution and share-alike obligations before publishing compiled geometry. Verify coverage of each feature class in the slice. [Copyright and license](https://www.openstreetmap.org/copyright) · [Attribution guidelines](https://osmfoundation.org/wiki/Licence/Attribution_Guidelines) |
| USGS 3DEP one-meter DEM | Bare-earth terrain | Public-domain product. Record the selected tile, vintage, checksum, native horizontal CRS, and NAVD88 elevation metadata. Confirm tile coverage at the intersection before selecting a snapshot. [Product metadata](https://catalog.data.gov/dataset/1-meter-digital-elevation-models-dems-usgs-national-map-3dep-downloadable-data-collection) |
| Centre County GIS and PASDA | Potential footprint gap-filling and independent validation | Identify exact layers and verify their reuse and redistribution terms before combining with the OSM database or using them in an export. |

Propose a 300 m square centered near the Allen Street and College Avenue intersection. Freeze the boundary and its southwest corner as the local origin after inspecting coverage. Evaluate NAD83 / UTM zone 18N (EPSG:26918) for horizontal coordinates and NAVD88 meters for terrain. Convert local easting to Three.js X, relative elevation to Y, and local northing to negative Z. Record the chosen reference elevation with the origin.

Coverage checks should confirm both streets and intended pedestrian connections, identify missing or invalid building footprints, and check for DEM gaps. Source approval, exact bounds, and the stable origin remain open.

Do **not** scrape Google Street View, trace restricted images into game assets, reuse the Reddit map without permission, or ingest sensitive/nonpublic floor plans. Public visibility does not imply a license to redistribute or derive game assets.

## Offline ingestion

1. Record source URL, license, attribution, acquisition date, dataset version, geographic coverage and checksums.
2. Import original geometry, preserve raw files separately, and project into a consistent metric CRS.
3. Normalize road classifications, building categories, addresses and source IDs.
4. Resolve duplicates and conflicts with source priority and manual review, never silently.
5. Repair geometry and flag unrepairable records; estimate missing values with confidence labels.
6. Build road/pedestrian connectivity and terrain-aligned geometry.
7. Export immutable snapshot and validation report.

## Hybrid fidelity

Preserve street names, intersection topology, landmark position, and known building footprints. Minor sidewalk widening, occlusion adjustments, accessible entrance repositioning, and path smoothing are allowed if recorded in `DeviationRecord`. Never quietly move a landmark or invent a street connection.

## Geographic quality gates

No invalid accepted polygons; all imported features have source references; road/path topology matches source intent; coordinate and vertical datum documented; no unexplained elevation discontinuities; manually adjusted features have approved deviation records. Audit a sample against independent licensed imagery or on-site observations.

## Legal review checklist

For every dataset: permitted commercial/noncommercial use, derivative works, redistribution, attribution, share-alike requirements, privacy/safety, and refresh policy. Keep source attribution accessible in-game. No dataset is approved merely because it is free to download.
