# New Mechanic Template Kit

This folder is a copy-and-fill template kit for bringing up a new Sokoban-like mechanism.

It has two prompt entry points:

```text
PREFLIGHT_PROMPT.md
  Use before implementation when the mechanism is still underspecified.

PROMPT.md
  Use after preflight has produced a confirmed mechanic packet.
```

The implementation templates are intentionally more concrete than the design docs:

```text
src/*.template.ts
  Copy into src/, replace placeholders, and wire into the registries / CLI.

prototype/*.template.yml
  Copy into prototypes/<mechanic_id>/ as the initial package skeleton.

conformance.template.md
  Use as the checklist for proving the runtime and tools exist.
```

## Prompt Boundary

Do not use `PROMPT.md` to guess missing semantics. If the user brief has not confirmed
runtime-critical behavior, first run `PREFLIGHT_PROMPT.md` and produce a confirmed packet with
ASCII probe decisions.

Runtime-critical behavior includes:

```text
world topology
controlled actor model
win condition
object collision / occupancy
movement behavior
mechanism normal and blocked outcomes
multi-instance identity / relation semantics
mechanism x mechanism interactions
```

## Placeholder Convention

Replace these placeholders everywhere:

```text
__mechanic_id__        snake_case id, e.g. gravity_swap
__MechanicPascal__     PascalCase id, e.g. GravitySwap
__mechanicCamel__      camelCase id, e.g. gravitySwap
__ActionId__           action union name, e.g. GravitySwapAction
__StateName__          state type name, e.g. GravitySwapState
```

## Expected Target Files

Recommended target files after instantiation:

```text
src/__mechanicCamel__Mechanics.ts
src/__mechanicCamel__Runtime.ts
src/__mechanicCamel__Generator.ts
src/__mechanicCamel__Miner.ts
src/__mechanicCamel__PuzzleScript.ts
src/__mechanicCamel__Conformance.ts
prototypes/__mechanic_id__/mechanic.yml
prototypes/__mechanic_id__/levels.yml
prototypes/__mechanic_id__/README.md
```

Then wire:

```text
src/runtimeAdapter.ts
src/generatorV2.ts or a future generator registry
src/seedMiner.ts or a future miner registry
src/exporters/exportPuzzleScriptNext.ts or a future exporter registry
src/exporters/checkPuzzleScriptNext.ts or a future checker registry
src/cli.ts for tool-conformance once implemented
```

## Tool Output Contracts

Each mechanism-specific tool must either write/return the expected artifact or fail with an
explicit `__mechanic_id__ ... unavailable` error. A tool is not considered implemented just
because a registry entry exists.

```text
Runtime adapter
  Output: registered RuntimeAdapter with parseLevel, renderState, createRuntime, step, replay,
  isWin, and isEventWin.
  Check: adapter smoke, parse/render fixture, step/replay trace, solver smoke.

Seed factories / candidate generator
  Output: CandidatesV2Doc with mechanic, status, generated_by, and CandidateLevelV2[].
  Candidate minimum: id, spec_id, title, status, factory, seed, motifs, layout,
  solution_trace or explicit solver notes.
  Check: every generated candidate parses; verified candidates are solvable by the adapter runtime.

Temporary miner
  Output: mechanism-specific miner report with prototype, generatedAt, stats, findings[],
  source seed/index, layout, observedEvents, solver result, graphStatus, notes.
  Check: report schema is stable enough to diff; kept findings parse and solve.

PuzzleScript exporter / checker
  Output: exporter returns source text; checker reports pass/fail for that source.
  Check: exported source includes only this mechanism's declared glyphs/rules and checker runs on it.

Tool conformance
  Output: markdown report now, JSON report once the shared schema exists.
  Check: adapter, solver, graph, layout analyzer, and implemented tools are exercised by smoke cases.
```

## Minimum Definition Of Done

For direct designer testing:

```text
[ ] adapter registered
[ ] parse/render smoke fixture works
[ ] step/replay smoke trace works
[ ] solve smoke fixture works
[ ] explain-layout or equivalent layout analyzer works
[ ] graph / agency analysis works
[ ] runtime-backed playable builds or is explicitly unavailable
[ ] PuzzleScript exporter/checker succeeds or is explicitly unavailable
[ ] miner succeeds or is explicitly unavailable
[ ] seed factories generate verified candidates or are explicitly unavailable
```

Unsupported tools must fail explicitly with a mechanism-specific unavailable message. They must not reuse
`pull_portal_fallback` behavior.
