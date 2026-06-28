# Ice Slide Escape Miner Scoring v0

Status: heuristic designer-attention model. This is not an accepted-level gate.

This document defines the first curated scoring pass for `ice_slide_escape`
miner findings. Its job is to rank raw findings for human/LLM designer review,
not to prove that a level is good, teachable, or campaign-ready.

## Tool Maturity

```yaml
tool_id: ice_curated_miner_scoring_v0
maturity: curated_miner
evidence_level: heuristic
purpose: rank raw findings for designer review
not_for:
  - accepted gate
  - curriculum coverage
  - proof of teaching quality
  - proof of no bypass
```

The score is intentionally biased. Later design practice may add tags, change
weights, or record known bias, but this v0 should be good enough to separate
obvious noise from promising ice-mechanic material.

## Hard Gates

A finding may enter the scored list only if all hard gates pass:

```yaml
hard_gates:
  - layout_parses
  - explicit_player_start_present
  - explicit_player_goal_present
  - start_is_edge_cell
  - start_initially_standable
  - goal_is_edge_cell
  - solver_finds_win
  - returned_solution_replays
  - win_uses_specific_goal_cell
  - solution_is_not_walk_only
```

Graph exhaustion is not a hard reject. Exhausted graph evidence remains
unknown and receives a score penalty.

## Mechanic Salience

Mechanic salience ranks whether the returned solution visibly exercises an ice
rule worth reviewing.

```yaml
positive_salience:
  pass_through_d5: high
  destroy_group_d6_plus: high
  restart_after_group: high
  rebound_d4: medium_high
  destroy_moving_ice_d3: medium
  boundary_disappear: medium
  short_stop_d1_d2: low
  ice_blocks_ice_no_chain_push: medium
```

The preferred findings combine a high-salience branch with a later consequence,
such as opening a route, changing the edge goal, satisfying a target, or forcing
the player to route after the ice event.

## Design Value

Design value estimates whether the finding is worth designer attention.

```yaml
positive_design_value:
  edge_goal_wall_opened: high
  target_present: medium
  target_and_escape_both_relevant: high
  branch_then_player_routes: medium
  complete_graph: medium
  branching_win_dag: medium
  readable_single_commitment_witness: low
```

Negative signals:

```yaml
penalties:
  walk_padding_heavy: high
  target_initially_satisfied: low
  same_start_and_goal: medium
  graph_incomplete: medium
  single_action_probe_only: low
  repeated_equivalent_finding: handled_by_sampler_diversity
```

`single_action_probe_only` is not bad for a smoke witness, but it is less useful
as a mined design candidate because there is little downstream consumption.

## Current Weight Sketch

The current code uses a simple additive score:

```yaml
base:
  solution_cost_cap: 8

salience:
  push_ice: 5
  pass_through_d5: 18
  destroy_group_d6_plus: 18
  restart_after_group: 8
  rebound_d4: 12
  destroy_moving_ice_d3: 8
  boundary_disappear: 5
  short_stop_d1_d2: 3
  ice_blocks_ice_no_chain_push: 7

design_value:
  edge_goal_wall_opened: 18
  target_present: 6
  target_and_escape_both_relevant: 10
  branching_win_dag: 6
  readable_single_commitment_witness: 2

penalties:
  target_initially_satisfied: -4
  same_start_and_goal: -10
  walk_padding_moderate: -4
  walk_padding_heavy: -9
  graph_incomplete: -12
  single_action_probe_only: -3
  walk_only: reject
  no_push_ice: reject
```

These weights are deliberately plain. They are meant to prioritize findings,
not to decide acceptance.

## Report Interpretation

Designer reviewers should read a high score as:

```text
This finding probably contains an ice interaction worth inspecting first.
```

They should not read it as:

```text
This is a good level.
This teaches the target.
This has no bypass.
This belongs in the final campaign.
```

Before promoting any finding, run a manual designer pass, solve/explain the
specific `(player_start, player_goal)` instance, and check whether the ice event
is actually consumed by later route, target, or edge-goal structure.
