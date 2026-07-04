# Candidate Packet: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2 review1

```yaml
prototype_context:
  prototype: reality_anchor
  confirmed_rules:
    - P/L anchor: player on P side uses push mode; player on L side uses pull mode.
    - B/S anchor: cells on B side normalize to crates; cells on S side normalize to sticky blocks.
    - Sticky blocks in connected components move as rigid bodies and can merge/split after normalization.
    - Win condition is all targets covered by objects.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    anchor_boundary_shift:box_sticky: B/S anchor object moved by force.
    anchor_boundary_shift:push_pull: P/L anchor object moved by force.
    box_to_sticky: crate normalized onto sticky side.
    sticky_merge: at least two sticky sources joined into one connected sticky component.
    move_sticky_rigid: sticky component moved as a rigid body.
    pull_object: object moved by pull-side action.
  tool_boundary:
    - Solver/analyzer/probe evidence is factual only.
    - No tool result is treated as aesthetic, difficulty, or archive verdict.
    - No object-instance necessity is claimed because analyzer reported no instance-level participation.

slot_brief:
  intended_role: mid_game_fixed_anchor_transition
  known_before:
    - K_runtime_smoke
    - all_current_reality_anchor_runtime_rules_allowed
  target:
    - introduce two anchors with one fixed anchor.
    - fixed P/L is wall-isolated but globally changes push/pull behavior.
    - movable B/S must create a material difference that ordinary boxes cannot replace.
  difficulty_or_support_expectation:
    - lower than late-game candidates.
    - compact mid-game transition; not a score claim.

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid

design_target:
  aesthetic_score_target: unscored_missing_lower_bound_archive_context
  difficulty_score_target: unscored_missing_lower_bound_archive_context
  target_role_notes:
    - Aim for high compactness and clear material necessity.
    - Do not use numeric score language because clean human archive has only positive anchors.
```

## Solve Instance

```yaml
candidate_version: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2
layout_file: prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_layout.txt
player_start: [3, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: fixed_vertical_wall_pocket
box_sticky_anchor: movable_horizontal
```

```text
###########
###@SB....#
#P#..#....#
#L#.M.C#..#
####GG#...#
###########
```

## Mechanism Scope

```yaml
central:
  - Fixed P/L creates upper push side and lower pull side.
  - Movable B/S shifts once to make x=5 sticky side.
  - C must become sticky and merge with M, forming a horizontal sticky rigid body.
  - Final target coverage uses one accessible left handle to move a two-cell sticky body; ordinary boxes cannot cover the sealed right target.
allowed_support:
  - short walk/reposition steps.
  - multiple equivalent post-win states.
incidental_allowed:
  - extra reachable sticky_to_box events outside the winning trace.
required_winning_path_events:
  - anchor_boundary_shift:box_sticky
  - pull_object
  - box_to_sticky
  - sticky_merge
  - move_sticky_rigid
forbidden_winning_path_events: []
forbidden_if_seen_anywhere:
  - anchor_boundary_shift:push_pull
```

## Design Claim

```yaml
player_insight: >
  The right target has no independent force face for an ordinary box. The player must turn the crate
  into sticky material and merge it with the left sticky block, then use the left cell as a handle so
  the rigid pair carries the right cell onto the sealed target.
causal_chain:
  - Push B/S right once from the upper push side; this expands sticky side to include x=5.
  - Push M down once from the upper push side, placing it on the left target as a temporary reservoir.
  - In lower pull side, pull C left into x=5, triggering box_to_sticky.
  - Pull the left sticky block back upward so the two sticky cells become horizontally adjacent and merge.
  - Push the merged horizontal sticky body down from the left handle; both targets are covered together.
why_not_execution: >
  The route is short, but the material change is not step economy. Both the initial ordinary-box
  replacement and the post-merge two-box replacement have complete reachable graphs with zero wins.
  The right target is sealed against independent ordinary-box placement, so sticky rigidity is the
  structural carrier.
falsification:
  - Any winning path missing a required event group rejects the claim.
  - Any reachable P/L movement rejects the fixed-anchor claim.
  - Any solvable ordinary-box or post-merge ordinary-box counterfactual rejects material necessity.
```

## Evidence

```yaml
commands_run:
  - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2 --title "Fixed P/L downpull sidecar v2" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
  - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_box_analog_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_box_analog --title "Fixed P/L downpull sidecar v2 box analog" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
  - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_postmerge_box_analog_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_postmerge_box_analog --title "Fixed P/L downpull sidecar v2 postmerge box analog" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
  - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_layout.txt RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2 push_pull 400000 200 strong_material
solver_result:
  found: true
  cost: 7
  depth: 7
  explored_states: 57
  inputs: right down down right left up down
trace_summary:
  events:
    - push_object:box_sticky_anchor
    - anchor_boundary_shift:box_sticky
    - walk
    - push_object:sticky#1
    - move_sticky_rigid
    - walk
    - pull_object:crate#1
    - box_to_sticky:n1
    - pull_object:sticky#1
    - move_sticky_rigid
    - sticky_merge:n1
    - push_object:sticky#1
    - move_sticky_rigid
target_events:
  K_runtime_smoke: executable
object_or_instance_evidence:
  reported: none
  limit: no per-object necessity claim
winning_path_event_checks:
  fixed_anchor_probe:
    status: complete
    combined_missing_required_bypass_found: false
    explored_states_combined: 996
    individual_missing_required_bypass_found:
      movable_box_sticky_shift: false
      fixed_push_pull_effect: false
      material_normalization: false
      box_to_sticky: false
      sticky_merge: false
      sticky_rigid_move: false
reachable_event_exposure:
  original_graph_status: complete
  reachable_states: 783
  legal_transitions: 1917
  forbidden_anchor_boundary_shift_push_pull_hits: none
  observed_reachable_events:
    - anchor_boundary_shift:box_sticky
    - box_to_sticky:n1
    - move_sticky_rigid
    - pull_object:crate#1
    - pull_object:sticky#1
    - pull_object:sticky#2
    - push_object:box_sticky_anchor
    - push_object:crate#1
    - push_object:sticky#1
    - sticky_merge:n1
    - sticky_to_box:n1
    - sticky_to_box:n2
graph_or_counterfactual_evidence:
  original_graph:
    status: complete
    reachable_states: 783
    winning_states: 120
    scc_shape: sccs=59, edges=76, winSubgraph=branching_win_dag
  initial_box_analog:
    layout_file: prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_box_analog_layout.txt
    found: false
    graph_status: complete
    reachable_states: 104
    winning_states: 0
  postmerge_box_analog:
    layout_file: prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_postmerge_box_analog_layout.txt
    found: false
    graph_status: complete
    reachable_states: 63
    winning_states: 0
evidence_refs:
  - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_box_analog.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2_postmerge_box_analog.md
  - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2.md
evidence_limits:
  - Tool evidence supports event and counterfactual premises, not final player-side quality.
  - No per-object instance necessity is claimed.
  - Counterfactuals are layout-level analogs, not a universal proof over all conceivable variants.
```

## Key Snapshots

```text
step 0
###########
###@SB....#
#P#..#....#
#L#.M.C#..#
####GG#...#
###########

step 1 right: B/S shifts, x=5 becomes sticky side
###########
###.@SB...#
#P#..#....#
#L#.M.C#..#
####GG#...#
###########

step 3 down: left M stored on left target
###########
###..SB...#
#P#..#....#
#L#.@.C#..#
####mG#...#
###########

step 5 left: C is pulled into sticky side
###########
###..SB...#
#P#..#....#
#L#.@M.#..#
####mG#...#
###########

step 6 up: sticky merge creates horizontal rigid pair
###########
###..SB...#
#P#.@#....#
#L#.MM.#..#
####GG#...#
###########

step 7 down: one handle covers both targets
###########
###..SB...#
#P#..#....#
#L#.@..#..#
####mm#...#
###########
```

## Diagnostic Routing

```yaml
hard_evidence:
  evidence_reviewer_should_check:
    - all required event groups are complete all-solution gates.
    - forbidden P/L movement is clean via complete reachable scan.
    - analog counterfactuals are complete unsolved.
    - no object-instance necessity is overclaimed.
mechanism_scope:
  central_claims:
    - fixed P/L effect via pull_object.
    - movable B/S material window.
    - sticky rigid pair as necessary carrier for right target.
claim_hygiene:
  fresh_required: true
  no_archive_variant_authorization: true
taste_probes:
  critic_should_attack:
    - Is the 7-step route too scripted or too local for the transition role?
    - Does the sealed right target make the sticky insight legible rather than merely forced?
    - Is B/S movement meaningful enough, or just a pre-step switch?
scc_graph:
  graph_fact: original complete graph; branching_win_dag; SCC solution path has 4 irreversible steps and some scripted same-state handoffs.
  neutral_meaning: There are several win-reaching branches and some short forced transitions after commitments.
  player_facing_interpretation: Candidate may feel like a compact demonstration with one main irreversible insight rather than broad exploration.
  verdict_effect_request: critic_decide
variant_family:
  relation: same high-level family as failed v1 claim, structurally revised to seal ordinary-box force faces.
start_position:
  fixed_start: [3, 1]
prototype_specific_work:
  design_handoff: not_found
  pre_human_submission_pass: not_applicable
```

## Prototype Specific Contracts

```yaml
interface_pair_policy:
  declared_interface_points: []
  target_pairs: []
  ignored_pair_classes: []
  risky_pair_classes: []
pair_diagnostics:
  ignored_pairs: []
  risky_pairs: []
```

## Archive Lineage Policy

```yaml
default: fresh_required
authorized_archive_variant_work:
  enabled: false
  authorized_by: null
  candidate_ids: []
  allowed_operations: []
candidate_relation: fresh
why_not_archive_variant: >
  Clean archive entries were read only for human taste calibration and failure-mode awareness.
  This candidate uses a fixed wall-pocket P/L plus top-row movable B/S and a sealed two-target
  carrier pattern; it is not derived from RA_CAND_0001 or RA_CAND_0002 layout/route.
```

## Attempt Log

```yaml
serious_structural_attempts:
  - id: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v1
    result: abandoned_before_review
    reason: original was solvable but both initial ordinary-box and post-merge ordinary-box analogs were solvable, violating hard material-necessity gate.
local_repairs:
  - moved B/S away from the direct top face of the right target.
  - sealed right/down force faces around the right target.
  - reran solver, fixed-anchor probe, and both analog graph searches.
abandoned_families: []
```

## Archive Taste Context

```yaml
examples:
  - candidate_id: RA_CAND_0001
    human_reviewed: true
    archive_eligibility: clean_archive
    human_comment: >
      机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，
      综合质量较高的好关。
    relevance: positive anchor for compact causal coupling and visible player conflict.
  - candidate_id: RA_CAND_0002
    human_reviewed: true
    archive_eligibility: clean_archive
    human_comment: >
      对关卡中要素有充分利用，使用拉动黏块打破了“推拉锚点只能被单向移动”的假设，
      具有较强洞见。
    relevance: positive anchor for pull/sticky coupling and insight over mere execution.
negative_anchor_none_found: >
  Current clean human-reviewed archive contains only two accepted positive entries for this prototype.
  No clean low-score, failed, lower-bound, or explicitly dissatisfied human-reviewed anchor is available.
score_claim_allowed: false
```

## Claim Last Review

```yaml
mode: not_used
facts_packet: not_applicable
claim_packet: not_applicable
read_order: not_applicable
```
