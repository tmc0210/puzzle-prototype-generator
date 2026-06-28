# Prompt: Bring Up A New Sokoban-Like Mechanism

Use this prompt in a fresh Codex thread after the mechanism has been confirmed.
If the mechanism has not been confirmed with ASCII probes, stop and run the preflight flow first.

```text
You are implementing a new Sokoban-like prototype in this repository.

Mechanic id:
__mechanic_id__

Confirmed mechanism packet:
<paste confirmed rules, objects, inputs, win condition, priorities, edge cases,
multi-instance semantics, central/boundary mechanisms, ASCII probe decisions, and known open questions>

Goal:
Create a complete runtime + tool surface for designer testing of this mechanism.
Knowledge/player-model/curriculum derivation may be skipped for this test only, but
the implementation must not create hidden debt or reuse pull_portal_fallback-specific tools.

Read first:
- README.md
- docs/09-agent-preflight.md
- docs/28-mechanic-disambiguation-and-ascii-probes.md
- docs/10-generic-solver-evaluator-contract.md
- docs/21-current-workflow-standard.md
- docs/24-runtime-adapter-boundary.md
- docs/25-new-mechanic-implementation-playbook.md
- docs/26-tool-contracts-and-conformance.md
- templates/new_mechanic/README.md

Do not read previous prototype reports or casebooks unless explicitly asked.

Pre-implementation gate:
- Do not invent Sokoban defaults.
- Do not assume walls, floor, player, push, pull, grid bounds, portal destination, object collision,
  or multi-instance identity unless confirmed in the packet.
- If a runtime-critical decision is open, pause implementation and ask for ASCII-probe confirmation.
- If a probe used temporary glyphs or walls only for explanation, do not treat them as confirmed objects
  unless the packet confirms them.

Implementation requirements:
1. Create mechanism-specific runtime files from templates/new_mechanic/src:
   - __mechanicCamel__Mechanics.ts
   - __mechanicCamel__Runtime.ts
2. Register the adapter in src/runtimeAdapter.ts.
3. Create prototypes/__mechanic_id__/mechanic.yml and minimal smoke levels from the templates.
4. Make solver / graph / agency / layout analyzer run through the registered adapter.
5. Implement or explicitly mark unavailable:
   - runtime-backed playable support
   - PuzzleScript Next exporter/checker
   - temporary miner
   - seed factories / candidate generator
   - candidate gallery if candidates exist
6. Add or update a conformance report path:
   - reports/tool_conformance.md
   - reports/tool_conformance.json once schema exists
7. Do not silently fall back to pull_portal_fallback behavior.
8. For every implemented tool, document its output artifact and add a smoke check that proves
   the artifact is parseable and mechanism-specific.

Runtime requirements:
- state key includes all future-relevant state and relation fields
- step is deterministic unless a future interface explicitly supports branching
- actions enumerates every player action the solver should consider
- events are scoped enough for trace-level evidence
- multi-instance object events include instance or relation evidence when claims may depend on it
- event-only illegal transitions are deliberate and documented
- counterfactual disabledRules/disabledBranches are honored if declared

Designer tool requirements:
- solve smoke fixture
- replay smoke trace
- explain-layout or equivalent layout report
- key event snapshots
- graph complete/exhausted status
- agency/SCC facts if graph completes
- conformance checklist of implemented/unavailable tools

Tool output requirements:
- seed factories return CandidatesV2Doc with verified/failed status per candidate
- temporary miner returns a mechanism-specific raw findings report with stats and solver evidence
- PuzzleScript exporter returns source text, checker validates that source, or both fail explicitly
- conformance report lists pass/fail/unknown/unavailable checks with command evidence
- unavailable tools name __mechanic_id__ and must not call pull_portal_fallback code

Verification commands:
- npm run check
- npx tsx src/cli.ts solve prototypes/__mechanic_id__ <smoke-level-id>
- npx tsx src/cli.ts explain-level prototypes/__mechanic_id__ <smoke-level-id>
- npx tsx src/cli.ts evaluate prototypes/__mechanic_id__ if temporary knowledge/levels stubs exist
- npx tsx src/cli.ts tool-conformance prototypes/__mechanic_id__ --write once implemented

Final response should report:
- files created/changed
- tools implemented vs unavailable
- commands run and results
- known remaining gaps before serious designer testing
```
