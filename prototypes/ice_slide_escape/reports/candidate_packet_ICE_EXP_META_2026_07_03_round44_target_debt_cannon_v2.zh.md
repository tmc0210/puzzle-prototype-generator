# ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2 候选包

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2
prototype: ice_slide_escape
status: candidate_for_independent_review
design_mode: meta_first
review_language: zh
win_condition: ice_slide_escape_explicit_goal
allowed_exposure:
  base: through_ice_rebound_d4
  meta: full_knowledge
interfaces:
  A: [0, 5]
  B: [10, 10]
  C: [22, 5]
  D: [10, 10]
interface_note: B and D are the same physical bottom-edge exit.
claimed_difficulty:
  base: 3
  meta: 3
claimed_aesthetic_band: low_4_to_4
```

## Layout

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....*...*...##......I.
#####.###.#############
#####.###...###########
#####I###I..###########
#####......############
##########.############
```

Legend: `#` wall, `.` floor, `*` target with ice, `I` ice.

## Intended Reading

This candidate is a compact target-debt chamber with a right-side late-mechanic
entry. The base and meta flows share the lower refill room, but they enter it
through different causal commitments.

Base A->B:

1. Push the left target ice right. It is destroyed against the right target ice,
   leaving the first target in debt.
2. Push the right target ice right. It is destroyed against the short wall pair,
   opening access to the refill room and leaving the second target in debt.
3. Use the lower-right ice to refill the right target by d4 rebound.
4. Use the lower-left ice to refill the left target by d4 rebound, then exit
   through the bottom edge.

Meta C->D:

1. From the right edge, push the right-side ice left. It uses d6+ destruction to
   remove the short wall pair; after the restart it dies against the right target
   ice. This makes the base's wall pair no longer a stopper but a late-entry
   destructible gate.
2. Push the right target ice left into the left target ice, destroying it and
   creating a target debt.
3. Refill the right target from the lower refill room by d4 rebound, then exit
   through the same bottom edge.

The meta difference is not an entrance reversal. Base consumes both target
nodes as a two-debt chain before rebuilding them; meta first rewrites the right
wall pair with d6, then consumes only the right target debt needed to enter the
shared refill room.

## Evidence

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_layout.txt
base_analysis:
  file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_base.md
  start: [0, 5]
  goal: [10, 10]
  found: true
  cost: 29
  graph: complete
  reachable_states: 922
  winning_states: 1
  events:
    push_ice: 4
    ice_destroyed_d3: 2
    ice_rebound_d4: 2
  scc:
    irreversible_steps: 4
    forced_win_prefix: 2
meta_analysis:
  file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_meta.md
  start: [22, 5]
  goal: [10, 10]
  found: true
  cost: 23
  graph: complete
  reachable_states: 1725
  winning_states: 3
  events:
    push_ice: 3
    ice_destroy_group_d6_plus: 1
    slide_restart_after_group: 1
    ice_destroyed_d3: 2
    ice_rebound_d4: 1
  scc:
    irreversible_steps: 3
    forced_win_prefix: 2
base_gate:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_base_required_core.md
  result: pass
  required_winning_events:
    - ice_destroyed_d3
    - ice_rebound_d4
  forbidden_reachable_events:
    - ice_pass_through_d5
    - slide_restart_after_group
    - ice_destroy_group_d6_plus
  forbidden_reachable_hits: none
meta_gate:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_meta_required_core.md
  result: pass
  required_winning_events:
    - ice_destroy_group_d6_plus
    - ice_destroyed_d3
    - ice_rebound_d4
interface_scan:
  file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_interface_edges.md
  solved_edge_pairs: 2
```

## Reviewer Questions

- Does the shared bottom exit make this feel like a meaningful reinterpretation
  or merely two starts aimed at one exit?
- Is the right-side d6 runway acceptable as a clear late-entry device, or does
  it read too much like an external attachment?
- Does the base two-debt chain read as one compact dependency rather than as
  repeated target-door padding?

## Known Caveats

- B and D are the same physical exit. The candidate should not receive credit
  for four-interface topology.
- The meta opening d6 push is forced and visually long; its value depends on
  whether the reviewer accepts it as a clean overwrite of the base wall stopper.
- The base has a stronger dependency chain than the meta. The meta is shorter
  but uses a later, more destructive mechanism as its core reinterpretation.
