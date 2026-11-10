# Codex handoff

## Context

This repository contains the full preproduction specification for a browser-based, detailed 2.5D isometric pixel-art State College sandbox. It was prepared from a planning conversation. Treat the checked-in documents as the durable source of truth, not an assumed chat history.

## FIRST PROMPT TO CODEX (copy/paste)

> Read `AGENTS.md`, `README.md`, and every file in `docs/`. This repository is currently documentation-only. Do not write application code, install packages, fetch datasets, generate art, or deploy yet. Audit the specification for contradictions, missing dependencies, licensing risks, and unrealistic scope. Then give me a prioritized implementation plan for the first browser walking proof, including exact files you would create, data contracts, testing strategy, and commands. Wait for my explicit approval before implementing anything. Preserve the locked decisions: TypeScript, Three.js, Vite, React only for UI, detailed 2.5D isometric pixel art, hybrid geography, procedural-first interiors, single-player, static Cloudflare Pages hosting, and zero-cost-first infrastructure.

## FOLLOW-UP PROMPT WHEN READY TO IMPLEMENT

> I authorize implementation of milestone P1 only. Follow `AGENTS.md` and `docs/ROADMAP.md`. Start with a minimal browser walking proof using synthetic geometry if licensing of real-world data is not yet approved. Write complete working code, add tests, run typecheck/build, and report exact commands and limitations. Do not implement later milestones or deploy without separate authorization.

## Working cadence

1. Codex reads documentation and proposes scope.
2. Owner approves one milestone.
3. Codex implements and tests in a branch or reviewed working tree.
4. Owner runs the browser build and provides screenshots/errors.
5. Codex fixes defects, updates docs, and requests approval for next milestone.

## Critical constraints

Do not reuse the Reddit map or Google Street View images as assets without rights. Do not claim geographic precision for procedural details. Do not add paid services, accounts, backend, multiplayer, or external dependencies without approval. Do not mark tasks complete without actual test evidence.

## Official project identity

Use **Little Happy Valley** in all user-facing text and `little-happy-valley` as the repository/package slug. Retain State College as the real-world setting, not the product title.
