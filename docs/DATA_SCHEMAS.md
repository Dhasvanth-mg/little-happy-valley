# Canonical data contracts

All schemas are **logical contracts**, not executable code. Implementation must define runtime validators (for example Zod or JSON Schema) and versioned TypeScript types. All external input is untrusted.

## Common primitives

`FeatureId: string`; `SchemaVersion: integer`; `WorldXY: {x_m:number,y_m:number}`; `WorldXYZ: {x_m:number,y_m:number,z_m:number}`; `Bounds2D: {min_x_m,min_y_m,max_x_m,max_y_m}`; `SourceRef: {dataset_id,source_feature_id,license_id,retrieved_at,source_snapshot_id}`. Geometry must specify CRS, units, and axis convention.

## WorldChunk

`{chunk_id,schema_version,region_id,grid_x,grid_y,bounds_m,terrain_asset_id,road_asset_ids[],building_ids[],poi_ids[],navigation_asset_id,source_snapshot_id,generation_version,content_hash}`. Each chunk manifest is independently retrievable. IDs remain stable across export order changes.

## Building

`{building_id,schema_version,footprint_ref,height_m|null,floor_count|null,building_category,architectural_profile,facade_profile_id,roof_profile_id,entrance_ids[],interior_policy,interior_seed,landmark_override_id|null,attribute_confidence,source_refs[],generation_version}`. Confidence is per attribute: `G0` verified, `G1` estimated, `G2` procedural, `G3` fictional. Height and floor count must not be fabricated as verified values.

## Interior

`{interior_id,building_id,generator_profile,generator_version,seed,floor_index,usable_polygon_ref,entrance_links[],room_ids[],furniture_instance_ids[],navigation_asset_id|null,validation_status,authenticity}`. `authenticity` defaults to `fictional`. Stable seed plus generator version and input snapshot must yield reproducible layout.

## RoadSegment / PedestrianPath

Road: `{road_id,geometry_ref,class,width_m|null,surface|null,from_node,to_node,source_refs[]}`. Path: `{path_id,geometry_ref,width_m|null,accessibility,connected_node_ids[],source_refs[]}`. Connectivity graph must be validated separately from visible mesh.

## Entrance / POI

Entrance: `{entrance_id,building_id,world_position,facing_degrees,access_type,destination_id|null,confidence,source_refs[]}`. POI: `{poi_id,name,category,geometry_ref,building_id|null,valid_from|null,valid_to|null,source_refs[]}`. Names are time-sensitive and should be versioned.

## AssetDefinition / AssetInstance

Definition: `{asset_id,version,category,dimensions_m,texture_size_px,texels_per_meter,pivot,collision_profile,placement_rules,license_id,content_hash}`. Instance: `{instance_id,asset_id,parent_feature_id,transform,overrides}`. No silent asset substitutions that alter collision.

## ProvenanceRecord / DeviationRecord

Provenance: `{provenance_id,dataset_id,source_url,license_id,retrieved_at,source_feature_id,transform_steps[],source_snapshot_id}`. Deviation: `{deviation_id,feature_id,original_geometry_ref,modified_geometry_ref,reason,author,review_status}`.

## GenerationManifest

`{manifest_id,schema_version,source_snapshot_id,generator_version,seed,input_hashes[],output_hashes[],generated_at}`. Hashes and seeds enable reproducible builds.

## SaveGame

`{save_schema_version,world_snapshot_id,created_at,updated_at,player:{position,orientation},discovered_poi_ids[],world_overrides[],interior_overrides[],settings}`. Validate before load, support migration, and provide human-readable errors for incompatible saves.

## Invariants

All IDs unique in namespace; all referenced IDs resolve or explicitly mark missing optional references; all geometry valid and in documented CRS; all source data carries provenance; all generation is deterministic; no runtime dependence on mutable live map endpoints; all external JSON validated before use.
