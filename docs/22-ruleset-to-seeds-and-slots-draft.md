# Ruleset To Design Plan Blind Test

Status: blind-test-safe draft. This document describes the upstream phase from a confirmed ruleset to an initial, revisable design plan. It does not try to define a complete knowledge ontology, curriculum topology, or final level list.

## Purpose

The goal is to avoid two opposite failure modes:

```text
over-planning:
  invent a complete knowledge / ability / lesson taxonomy before any level design evidence exists.

under-planning:
  randomly roll maps from seeds or miner findings and only later pretend the good ones form a curriculum.
```

The intended path is:

```text
confirmed ruleset
-> rule facts
-> observable probes and miner findings
-> initial design plan
-> exploration queue
-> single-level design attempts through the downstream designer loop
-> analyzer / reviewer evidence
-> design plan revision
-> later campaign arrangement
```

This document covers initialization and plan revision. It does not certify final levels.

## Hard Boundary

Do not introduce formal entities named knowledge, ability, pattern, bundle, support level, guided application, independent application, review level, or challenge level in this upstream phase.

If those words appear in older downstream documents, treat them as legacy vocabulary for local design discussion, not as the output schema of this phase.

The upstream output is only:

```text
rule facts
observable probes / mined raw findings
an initial design plan
an exploration queue
plan revision records
blocked questions
```

## Inputs

Minimum allowed inputs:

```text
confirmed preflight decisions
mechanic / ruleset source
confirmed player-facing win condition
declared user focus, if any
known open questions
runtime / solver / analyzer tools, if implemented
random or enumerative miner tools, if implemented
docs/21-current-workflow-standard.md, only when a selected plan item enters single-level design
```

Do not infer unresolved interaction semantics. If an open rule interaction affects a proposed probe or plan item, mark it blocked.

## Evidence Labels

Use evidence labels narrowly.

```text
hypothesis:
  Reasoning only. No tool or runtime evidence.

tool_observed:
  A runtime, solver, analyzer, or miner run observed an event, state change, solution, or graph fact.

tool_necessary_in_probe:
  In a specific scratch probe, a counterfactual, bypass check, or equivalent tool result suggests that a claimed event / state change is necessary for that probe.

graph_checked:
  A complete graph / SCC analysis supports a graph-dependent statement.

reviewer_judgment:
  A reviewer or critic judged design fit, elegance, or teaching quality for a concrete candidate.
```

Tool evidence can support concrete facts:

```text
event occurred
state changed
solution exists
returned solution uses named events
counterfactual solved / unsolved in a stated scope
complete graph facts
object / instance participation when the analyzer reports it
```

Tool evidence alone cannot prove:

```text
the idea is fun
the idea deserves a standalone lesson
the idea belongs early or late in a campaign
the idea can produce many good, non-redundant levels
```

Those remain design judgments and must be tested through later candidate attempts.

## Step 1: Rule Facts

Extract rule facts mechanically from the confirmed ruleset.

Useful fact kinds:

```text
normal_outcome:
  A successful rule result visible to the player.

constraint:
  A precondition, impossibility, cancellation, failure, or boundary.

interaction:
  Behavior depending on two or more objects, mechanisms, relations, priorities, or exception branches.

state_or_relation:
  Position, orientation, pairing, ownership, charge, gravity, nested state, active role, grouping, ordering, or same-type instance relation.

win_condition:
  The confirmed player-facing win condition.

implementation_detail:
  Runtime or data-format detail that tools need but players normally should not need.
```

Suggested shape:

```yaml
rule_fact:
  id: RF_conditioned_action_changes_state
  kind: interaction
  statement: When action A is attempted under condition C, state S changes instead of the baseline result.
  source_rules:
    - rule_group.branch_id
  observed_events:
    - condition_detected
    - state_changed
  preconditions:
    - condition_C
  effects:
    - state_S_changes
  open_questions: []
```

Rules:

- Do not mark a fact important just because it exists.
- Do not turn constraints or failure branches into positive teaching goals.
- Do not write player-side strategies here.
- If a fact is present only in runtime but not in the confirmed ruleset, record it as an IR/runtime mismatch or open question, not as confirmed design material.

## Step 2: Observable Probes

For promising rule facts or small fact groups, describe minimal observable probes.

A probe is not a level. It is a small structure or tool run used to see whether a fact can occur, whether a state change can be consumed, or whether an apparent idea collapses into a forced witness.

Probe purposes:

```text
witness:
  Show that a fact can occur.

contrast:
  Show baseline behavior versus changed / failed / exception behavior.

consume_state_change:
  Show that a changed state later affects reachability, legality, route, or win access.

construct_condition:
  Show that the player can actively create the condition that triggers a rule branch.

preserve_condition:
  Show that a condition must be created or preserved across other actions.

negative_probe:
  Show that an idea mostly produces bypasses, forced demonstrations, or irrelevant events.
```

Suggested shape:

```yaml
observable_probe:
  id: OP_construct_condition_then_consume_state
  source_facts:
    - RF_create_condition
    - RF_conditioned_action_changes_state
  purpose:
    - construct_condition
    - consume_state_change
  expected_observation:
    - condition is created by player action
    - rule branch changes a visible state
    - changed state later affects route, legality, or win access
  evidence: hypothesis
  blocked_by_open_questions: []
```

Rules:

- A probe may use multiple rule facts.
- A probe that only witnesses an event is still useful, but it should not be promoted into a level goal by itself.
- Extra walking distance does not turn a witness into meaningful design material.
- If a probe requires a temporary win condition or event win, mark it as a tool probe, not a player-facing level.

## Step 3: Miner Use

Random or enumerative miners are allowed only as phenomenon finders.

Miner purpose:

```text
discover observable structures the designer did not think of
find fact interactions that create nontrivial state consumption
find bypasses or degeneracies
find small graph shapes worth inspecting
find variation axes worth later testing
produce negative evidence that a direction mostly collapses into witness / padding
```

Miner output is raw material, not a level and not a plan item by itself.

Suggested raw finding shape:

```yaml
miner_finding:
  id: MF_001
  source:
    tool: random_structure_miner
    seed: 18422
    search_space: small structures with related mechanism instances
  observed_events:
    - baseline_outcome
    - conditioned_state_change
  graph_notes:
    scc_shape: branching_win_dag
    initial_out_win_dead: 3/2/1
  status: raw_finding
```

Every useful miner finding must be rewritten into one of:

```text
new observable probe candidate
interaction to test between existing probes
variation axis to test later
negative result
blocked question / IR-runtime mismatch
```

Rules:

- Do not accept a mined layout as a final level.
- Do not let frequency alone define importance.
- Do not promote a raw mined map directly into the design plan.
- Record search space and tool limits.
- Keep implementation-specific miner commands, paths, and examples outside this blind-test-safe document.

## Step 4: Initial Design Plan

The design plan is a working plan, not a knowledge list.

It records what the agent currently intends to do with observed facts and phenomena. It is expected to change after design attempts.

Use coarse treatment states:

```text
show_once:
  Probably needs to be seen or calibrated, but not yet worth serious level design.

explore_for_level:
  Worth trying to make into a player-facing candidate.

embed_as_boundary:
  Useful as a guardrail, contrast, failure branch, or tool check, but should not become a standalone target by default.

combine_later:
  Weak alone but plausibly useful when another state change, object, relation, or route consumes it.

defer:
  Needs an upstream rule decision, tool support, or earlier design result.

discard:
  Current evidence suggests it is not worth further design effort.
```

Suggested plan row:

```yaml
plan_item:
  id: P_conditioned_state_change
  source_facts:
    - RF_conditioned_action_changes_state
  current_treatment: explore_for_level
  reason: The state change can plausibly affect later reachability.
  evidence:
    - OP_construct_condition_then_consume_state: hypothesis
  risks:
    - May collapse into a forced witness.
  next_experiment: Try one scratch probe where the changed state is consumed by a later route or legality condition.
```

Rules:

- Do not create a plan item for every rule fact.
- Do not create one plan item for every old role label.
- A constraint normally starts as `embed_as_boundary`, `show_once`, or `defer`, not `explore_for_level`.
- If several facts only become meaningful together, one plan item may reference several facts.
- If an item repeatedly fails to produce good candidates, downgrade, combine, defer, or discard it.

## Step 5: Exploration Queue

The initialization output must end with a small exploration queue.

Each queued experiment is written in plain language, not as a new schema. Use exactly three parts:

```text
Selected plan item: P_x.
This attempt tries to: <specific thing to observe, verify, or design>.
Minimum hard evidence: <concrete solver/analyzer facts that would make the attempt worth reviewing>.
```

Example template:

```text
Selected plan item: P_conditioned_state_change.
This attempt tries to: create a compact candidate where a player-caused condition triggers a state change that is later consumed by route access.
Minimum hard evidence: returned solution includes the target state-change event before the route access; a stated counterfactual or bypass check does not find an equivalent solution without that state change.
```

Rules:

- The queue should contain a few targeted experiments, not a campaign plan.
- A queue item may call for a scratch probe, miner run, or real single-level design attempt.
- If it enters real single-level design, use `docs/21-current-workflow-standard.md` as the downstream designer loop.

## Step 6: Calling The Downstream Designer Loop

`docs/21-current-workflow-standard.md` is the downstream single-candidate design and review process. It can be used after this document selects one plan item and writes the three-part experiment note.

When using `docs/21` from this upstream phase:

```text
22 owns the plan.
21 owns the single-candidate design attempt.
22 gives 21 only:
  selected plan item
  this attempt tries to...
  minimum hard evidence...
21 returns:
  candidate / probe result
  analyzer evidence
  reviewer / critic judgment, if run
  caveats and failed repairs
22 then revises the plan.
```

If older terms in `docs/21` conflict with this document, this document controls upstream classification. In particular:

```text
support level:
  Do not use as an upstream field.

guided / independent application:
  Do not use as upstream categories.

challenge / review:
  Treat as later difficulty or campaign-placement language, not upstream plan states.

slot:
  Read as "the current single-level design task" when working downstream.
```

## Step 7: Plan Revision

After each scratch probe, miner pass, or single-level design attempt, revise the plan.

Allowed result readings:

```text
candidate_found:
  A concrete candidate passed the minimum hard evidence and is worth reviewer / critic attention.

useful_fixture:
  Good for tool calibration, mechanism witness, or reviewer calibration, but not a mainline candidate.

weak_witness_only:
  The idea can occur but currently has no nontrivial consumed consequence.

needs_combination:
  The idea is weak alone but may matter when another state change or relation consumes it.

blocked_by_rule:
  An unresolved rule, object semantics, or IR/runtime mismatch blocks progress.

bypass_or_too_open:
  Tool evidence found a bypass or the claimed event is not necessary in the probe.

unexpected_direction:
  The attempt produced a different stronger idea. Add a new plan item or variation axis, but do not pretend the original target succeeded.

discarded:
  Current evidence and attempts do not justify more effort.
```

Allowed plan updates:

```text
keep:
  Continue exploring as planned.

downgrade:
  Move from explore_for_level to show_once, embed_as_boundary, combine_later, or defer.

merge:
  Combine two plan items because attempts show they only work together.

split:
  Separate a plan item because attempts reveal two distinct design directions.

defer:
  Wait for rule clarification, tool support, or earlier candidate evidence.

discard:
  Stop spending design effort.

add:
  Add a new plan item from a tool finding or unexpected successful direction.
```

Revision record shape:

```yaml
plan_revision:
  source_attempt: ATT_001
  affected_items:
    - P_conditioned_state_change
  result_reading: needs_combination
  update: downgrade
  reason: Single occurrence repeatedly produced only forced witnesses; later consumption seems required.
  evidence_scope:
    - tool_observed
    - tool_necessary_in_probe
  next_experiment: Try a second rule fact that can consume the changed state.
```

## Initialization Output

A blind-test initialization run should output:

```text
1. actual files read and commands run
2. blocked / unresolved input questions
3. rule facts
4. observable probes
5. miner findings rewritten into probes, variation axes, negative results, or blocked questions
6. initial design plan
7. exploration queue
8. explicit non-claims
```

Do not output:

```text
final campaign level list
final knowledge topology
ability / pattern / bundle taxonomy
challenge or review level labels
accepted final maps
old generated report summaries
```

## Iteration Output

A later plan-update run should output:

```text
1. starting plan item and three-part experiment note
2. scratch probes or candidate attempts actually made
3. analyzer / solver / graph evidence with commands or report references
4. reviewer / critic judgment, if used
5. plan revision records
6. candidate pool changes, if any
7. next exploration queue
```

## Blind Test Protocol

Use this protocol in a fresh conversation to reduce contamination.

Recommended allowed inputs:

```text
docs/09-agent-preflight.md
docs/22-ruleset-to-seeds-and-slots-draft.md
docs/21-current-workflow-standard.md only if a selected plan item enters single-level design
path/to/target_prototype/mechanic.yml or ruleset source
package / CLI entry points needed to run target-prototype tools
runtime source for the target prototype
solver source or executable for the target prototype
graph / SCC analyzer source or executable for the target prototype
layout analyzer source or executable for the target prototype
generator / miner source or executable, only if implemented for the target prototype
```

Optional only if schema details are needed:

```text
docs/02-mechanic-ir.md
docs/19-multi-instance-object-model.md
```

Do not read for the first blind test:

```text
target_prototype/player_model.yml, if it exists from an earlier attempt
target_prototype/knowledge.yml, if it exists from an earlier attempt
target_prototype/curriculum*.yml, if it exists from an earlier attempt
target_prototype/level_specs*.yml, if it exists from an earlier attempt
target_prototype/candidates*.yml, if it exists from an earlier attempt
target_prototype/levels.yml, if it exists from an earlier attempt
target_prototype/reports/*
prototype-specific casebooks or postmortems from previous design attempts
```

Allowed tool use:

```text
prototype inspection command, if available
solver command, if available
layout analyzer command, if available
graph / SCC report command, if available
direct CLI calls for temporary layouts, if supported
implemented random / enumerative miner tools, if available
read runtime / solver / analyzer source needed to understand tool input and output
```

Tool-use constraints:

- Temporary layouts may be created for probes or candidate attempts, but they are not final campaign levels.
- Mined layouts are raw findings only.
- Do not write back old player model, curriculum, level spec, candidate, or level files during the blind test.
- Do not read generated reports from previous runs.
- If no miner is implemented, mark miner findings as unavailable rather than inventing them.
- Mark reasoning-only claims as `hypothesis`.
- Mark tool-supported facts with the exact command or source.
- Mark graph-dependent claims unknown unless the graph is complete under the stated budget.

## Blind Test Evaluation

The controller should judge the output by asking:

```text
Are rule facts faithful to the confirmed ruleset?
Did the agent avoid inventing a knowledge / ability / bundle taxonomy?
Are probes real observable structures rather than names?
Were miner findings rewritten instead of accepted as maps?
Does the initial design plan make conservative treatment decisions?
Does the exploration queue contain targeted experiments rather than random map goals?
Are evidence scopes narrow and reproducible?
Are blocked questions explicit?
```
