# Pull Portal Casebook And Tool Notes

Status: prototype-specific note. Do not include this document in blind tests that are meant to evaluate the generic ruleset-to-seeds workflow.

This document records implementation notes for the current `pull_portal_fallback` prototype only. It may contain examples, terminology, reports, and lessons from this thread. Treat it as casebook material, not as a generic process prompt.

## Temporary Miner

Current commands:

```text
npm run mine -- --iterations 120 --max-findings 12
npm run mine:write -- --iterations 120 --max-findings 12
```

The current `mine` command is runtime-specific to `pull_portal_fallback`, but its workflow role is generic: it emits raw findings with layouts, events, graph/SCC facts, object participation, and interpretation prompts. It does not draft slots and does not certify level quality.

Current report paths:

```text
prototypes/pull_portal_fallback/reports/temporary_seed_miner.md
prototypes/pull_portal_fallback/reports/temporary_seed_miner.json
```

## Current Prototype Paths

Useful implementation files:

```text
prototypes/pull_portal_fallback/mechanic.yml
src/prototypes/pull_portal_fallback/runtime.ts
src/core/solver.ts
src/core/graphAnalyzer.ts
src/core/agencyAnalyzer.ts
src/workflows/levelAnalyzer.ts
src/workflows/seedMiner.ts
src/cli.ts
```

Prior design artifacts that should usually be excluded from blind tests:

```text
prototypes/pull_portal_fallback/player_model.yml
prototypes/pull_portal_fallback/knowledge.yml
prototypes/pull_portal_fallback/curriculum.yml
prototypes/pull_portal_fallback/curriculum_v2.yml
prototypes/pull_portal_fallback/level_specs_v2.yml
prototypes/pull_portal_fallback/candidates_v2.yml
prototypes/pull_portal_fallback/levels.yml
prototypes/pull_portal_fallback/reports/*
```

## Contamination Rule

Do not use this file to test whether an agent can derive atoms, seeds, insights, or slots from an unfamiliar ruleset. It already contains prototype-specific framing and will bias the agent toward the current pull-crate / portal-family design space.
