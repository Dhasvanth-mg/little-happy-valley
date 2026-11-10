# Free-first browser deployment

## Proposed hosting

Cloudflare Pages serves a Vite-built static app, game assets and precompiled geographic chunks. The application performs rendering, physics, procedural generation and saves client-side. Default domain is a provider subdomain, so a paid custom domain is unnecessary.

## Important qualification

**$0 is a target, not a guarantee of unlimited usage.** Hosting limits, file-size caps, build quotas, bandwidth policies and commercial terms can change. Check the current provider documentation before deployment. Large world datasets may require careful packaging or another permitted static asset host. No provider should be described as unlimited without current verification.

## Deployment design

Build static assets → version and hash chunk bundles → deploy preview → run browser smoke test → verify attribution/license page → publish. Use immutable asset filenames and a versioned world manifest to avoid mixing old code with new chunks. Keep an easy rollback path.

## Client persistence

Use IndexedDB for player saves, discovered locations and world overrides. Provide export/import. Explain that clearing browser storage may erase local saves. Avoid login, cloud saves and backend databases for Alpha 0.1.

## Network behavior

No runtime Google Maps API, paid AI inference, map scraping, or server-side procedural generation. Load only nearby chunks; cache shared art; avoid excessive startup downloads. PWA/offline mode is optional after baseline works.

## Scaling triggers

Reassess infrastructure only when measured asset transfer, storage limits, player concurrency, or requested multiplayer/cloud saves justify it. Multiplayer would require separately designed server infrastructure and cannot be promised at $0 at scale.
