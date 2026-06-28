# Tool Contracts And Conformance

Status: proposed standard for prototype-specific tools.

本文档回答三个问题：

```text
1. 当前工具是否应该抽象？
2. 每类工具应该输出什么？
3. 如何证明某个新机制已经实现了该工具，并且输出符合规范？
```

结论：

```text
工具应该抽象成 capability contracts。
每个工具应该有机器可读 artifact + 人类可读 report。
每个新机制应该有 conformance check，证明工具存在、调用同一个 runtime adapter、输出符合 schema、关键语义可复验。
```

## Contract Levels

不要把所有工具都强行抽成同一种 TypeScript interface。工具有三层 contract：

```text
in-process contract:
  TypeScript functions such as runtime adapter, solveWithRuntime, analyzeGraphWithRuntime.

artifact contract:
  YAML / JSON outputs such as candidates_v2.yml, evaluation.json, layout_analysis_*.json.

CLI contract:
  commands that run the tool, write artifacts, and fail explicitly when unavailable.
```

一个工具可以先只有 artifact/CLI contract，稍后再提取 in-process interface。

## Common Tool Envelope

所有机器可读工具输出最终都应包含同一类 envelope 字段：

```yaml
schema_version: 1
tool_id: layout_analyzer
tool_version: 0.1.0
mechanic: my_new_mechanic
adapter_id: my_new_mechanic
generated_at: 2026-06-28T00:00:00.000Z
status: pass | fail | warning | pending | unavailable
inputs:
  package_root: prototypes/my_new_mechanic
  level_id: L01
  layout_source: scratch | package | generated
budgets:
  max_states: 100000
  max_depth: 200
capabilities_used:
  - runtime_adapter
  - solver
  - graph_analyzer
artifacts:
  machine: reports/layout_analysis_L01.json
  human: reports/layout_analysis_L01.md
notes: []
```

Current artifacts do not all use this envelope yet. Until they do, conformance checks should inspect their existing
equivalent fields and record gaps.

## Tool Families

### Runtime Adapter

Purpose:

```text
Authoritative executable semantics for a confirmed mechanism.
```

Required implementation:

```text
registered adapter id
parseLevel
renderState
createRuntime
step
replay
isWin
isEventWin
```

Required output / evidence:

```text
parse/render smoke result
step/replay smoke result
solver smoke result using the adapter
explicit unsupported error if adapter is missing
```

Conformance checks:

```text
getRuntimeAdapter(mechanic) succeeds
parseLevel accepts fixture layouts
renderState produces stable text
replay of declared smoke trace reaches expected events
solveWithRuntime finds expected smoke solution
state key changes when future-relevant state changes
```

### Solver

Purpose:

```text
Find winning paths and report search completeness without knowing mechanism-specific objects.
```

Machine output minimum:

```yaml
found: true | false
inputs: []
steps:
  - input: right
    events: []
    stateKey: P:1,1
events: []
cost: 0
exploredStates: 1
searchStatus: found | complete | exhausted
budget:
  maxStates: 100000
  maxDepth: 200
reason: optional
```

Conformance checks:

```text
solution replay reaches win when found=true
complete unsolved smoke fixture returns found=false, searchStatus=complete
budget exhaustion returns searchStatus=exhausted, not fail/pass proof
events in solution come from adapter transitions
```

### Layout Analyzer

Purpose:

```text
Turn one package or scratch layout into designer evidence.
```

Machine output minimum:

```text
prototype / mechanic id
level metadata and win condition
initial state rendering
shortest solution summary
key event snapshots
graph analysis with complete/exhausted status
agency / SCC facts when available
counterfactual results
target event checks if target detectors exist
object participation summaries when events carry instance evidence
```

Conformance checks:

```text
can analyze scratch layout for this mechanism
analysis uses registered adapter, not another mechanism's parser
all returned solution steps replay
non-walk/key events have before/after snapshots
graph-dependent claims are unknown if graph status is exhausted
JSON report validates against layout-analysis schema once schema exists
```

### Graph / Agency Analyzer

Purpose:

```text
Expose complete reachable graph facts, SCC shape, irreversible commitments, branches, and bypass risks.
```

Machine output minimum:

```text
status: complete | exhausted
reachableStateCount
legalTransitionCount
eventOnlyTransitionCount
winStateCount
budget
reason if exhausted
SCC/agency fields when complete
```

Conformance checks:

```text
complete small smoke graph reports status=complete
budget-limited smoke graph reports status=exhausted
dependent metrics do not pass on exhausted graph
```

### Runtime-Backed Playable

Purpose:

```text
Human play/debug surface backed by the same adapter semantics as solver/analyzer.
```

Output minimum:

```text
playable/index.html
playable/app.js
playable/data.json
playable/style.css
```

Conformance checks:

```text
data.json contains mechanic id and levels/candidates used
app imports runtime adapter registry or bundled equivalent
build succeeds
smoke level renders
smoke solution can be replayed by the same data/runtime path
```

### PuzzleScript Next Exporter

Purpose:

```text
Shareable / inspectable external playable output, not the source of truth.
```

Output minimum:

```text
game.ps
checker report or CLI success/failure
structured comments linking rules/events/level ids where possible
documented unsupported semantics
```

Conformance checks:

```text
export command succeeds for this mechanism or reports unavailable
check command validates required sections and level coverage
exported rules are explicitly scoped to supported semantics
event-win fixture strategy is documented if used
unsupported runtime behavior is not silently compiled as something else
```

### Temporary Miner

Purpose:

```text
Phenomenon discovery. It finds raw structures, events, graph shapes, and negative evidence.
It does not accept levels or create curriculum slots.
```

Machine output minimum:

```yaml
prototype: my_new_mechanic
generatedAt: timestamp
options: {}
stats:
  generated: 0
  invalid: 0
  unsolved: 0
  solved: 0
  completeGraph: 0
  kept: 0
tagCounts: {}
findings:
  - id: MF_0001
    source:
      tool: temporary_seed_miner
      generator: scatter
      seed: 1
      index: 1
    score: 0
    tags: []
    layout: ""
    observedEvents: []
    solution: {}
    graph: {}
    objectParticipation: []
    notes: []
```

Conformance checks:

```text
miner command succeeds for this mechanism or reports unavailable
machine JSON validates against miner-report schema once schema exists
every kept finding has replayable layout and solution
graph facts include complete/exhausted status
findings are labeled raw and not accepted/campaign material
```

### Seed Factories / Candidate Generator

Purpose:

```text
Generate controlled witnesses or seed structures for known rule facts/specs.
```

Machine output:

```text
candidates_v2.yml
```

Current schema:

```text
schemas/candidates_v2.schema.json
```

Conformance checks:

```text
schema validation passes
candidate mechanic id matches package mechanic
candidate spec_id references known spec when level_specs_v2 exists
solution_trace replays when present
probe_trace replays or explicitly allows illegal probe events
solver can solve verified candidates
unsupported mechanism fails explicitly instead of returning an empty success
```

### Candidate Gallery

Purpose:

```text
Human-readable grouping of generated/probed candidates by factory, motif, spec, and status.
```

Output minimum:

```text
reports/candidate_gallery_v2.md
```

Conformance checks:

```text
all candidates in candidates_v2.yml appear in the gallery
factory grouping is complete
layout and traces are displayed
gallery does not assign accepted status by itself
```

### Evaluator / Audit

Purpose:

```text
Hard gate over declared evidence contracts and project-level readiness.
```

Machine output minimum:

```text
evaluation.json or evaluation_v2 machine artifact
audit.md plus future audit.json
metric statuses: pass | fail | unknown
evidence levels: static | trace | optimal | full_graph | heuristic | unknown
```

Conformance checks:

```text
unknown is preserved when evidence is missing
budget exhaustion never becomes pass
accepted coverage requires accepted status + evaluator pass + player win standard
quality/taste is not faked as hard metric
```

## Capability Manifest

Each prototype should eventually include or generate a capability manifest:

```yaml
mechanic: my_new_mechanic
adapter: implemented
tools:
  solver:
    status: implemented
    command: npm run solve -- prototypes/my_new_mechanic
    machine_output: stdout_or_report
  layout_analyzer:
    status: implemented
    command: npx tsx src/cli.ts explain-layout prototypes/my_new_mechanic scratch.txt --write
    machine_output: reports/layout_analysis_*.json
  playable:
    status: implemented
  puzzlescript_exporter:
    status: unavailable
    reason: exporter not implemented for this mechanism yet
  temporary_miner:
    status: unavailable
    reason: miner search space not implemented yet
  seed_factories:
    status: unavailable
```

This manifest is the bridge between "tool should exist" and "tool is proven available for this mechanism".

## Conformance Command

The project should add a command with this intended shape:

```text
npx tsx src/cli.ts tool-conformance <prototype-path> [--write]
```

It should produce:

```text
reports/tool_conformance.json
reports/tool_conformance.md
```

Minimum checks:

```text
adapter_registered
solver_smoke
layout_analyzer_smoke
graph_smoke
playable_build_or_unavailable
puzzlescript_export_or_unavailable
miner_run_or_unavailable
seed_factories_generate_or_unavailable
candidate_schema_valid_if_present
reports_have_machine_artifacts
```

Status rules:

```text
implemented + passing smoke/schema checks => pass
implemented but output invalid => fail
not implemented but explicitly marked unavailable => unavailable
not implemented and silently missing => fail
budget-limited evidence => unknown, not pass
```

## Prompt And Code Templates

The working template kit lives at:

```text
templates/new_mechanic/
```

It contains:

```text
PROMPT.md
templates/new_mechanic/src/__mechanicCamel__Mechanics.template.ts
templates/new_mechanic/src/__mechanicCamel__Runtime.template.ts
templates/new_mechanic/src/__mechanicCamel__Tools.template.ts
templates/new_mechanic/src/__mechanicCamel__Conformance.template.ts
prototype/*.template.yml
conformance.template.md
```

Instantiate those source templates under:

```text
src/prototypes/<mechanic_id>/mechanics.ts
src/prototypes/<mechanic_id>/runtime.ts
src/prototypes/<mechanic_id>/tools.ts
src/prototypes/<mechanic_id>/conformance.ts
```

These templates are the practical starting point for satisfying the contracts in this document.
They are intentionally explicit about unavailable tools so a new mechanism cannot silently reuse
another prototype's miner, exporter, or seed factories.

## Current Gaps

Current `pull_portal_fallback` has many useful tool outputs, but not all have formal schemas yet.

Already schema-backed:

```text
mechanic.yml
levels.yml
player_model.yml
curriculum*.yml
level_specs_v2.yml
candidates_v2.yml
```

Needs schema / conformance extraction:

```text
layout_analysis_*.json
temporary_seed_miner.json
evaluation_v2 machine JSON
audit.json
tool_conformance.json
playable manifest
PuzzleScript check report
```

Until these schemas exist, tool implementation claims should cite concrete smoke commands and output paths,
not just say "implemented".
