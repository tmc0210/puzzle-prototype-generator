# Claim-Last Counterexperiment: Old 4-ish Candidate Blind Packet With Aesthetic Calibration

```yaml
experiment_id: claim_last_counterexp_old4
target_identity: hidden_from_critic_phase1
phase: blind_first_with_aesthetic_calibration
purpose: >
  Counterexperiment for the claim-last + aesthetic-calibration process. The
  target is an older archived candidate around the 4-point aesthetic band, but
  its identity, human score, human verdict, designer claim, and archive entry
  are intentionally hidden during phase 1.
reviewer_instruction: >
  Review only the current level facts and the human archive calibration anchors
  below. Do not read archive files, candidate packets, prior reviews, human
  reviews, or claim reveal files for this target during phase 1.
```

## Current Brief, Without Designer Claim

```yaml
target_role: meta_first_design_candidate
hard_requirements_under_test:
  - base instance should stay within early exposure through ice_rebound_d4
  - meta instance may use later knowledge
  - base and meta should not collapse into pure independent subpuzzles
  - aesthetic target is around 4, not necessarily 5
  - difficulty may be modest if the aesthetic/meta relationship is real
```

## Rules And Instances

```yaml
prototype: ice_slide_escape
win_condition:
  - all targets must be occupied by ice
  - player must stand on the explicit edge goal for the solve instance
object_semantics:
  "#": wall
  ".": floor
  "*": target with ice initially on it
  "I": ice not on target
  "G": target without ice
event_semantics:
  ice_stop_short_d1_d2: pushed ice stops before long collision, depending on nearby obstacle
  ice_rebound_d4: pushed ice travels four cells, collides, then rebounds one cell backward
  ice_destroy_group_d6_plus: pushed ice destroys an obstacle group of length 2 or more, then continues/restarts by prototype rules
instance_boundary:
  - base and meta are separate reset solve instances
  - state changes from base do not carry into meta
interfaces:
  A: [3, 8]
  B: [7, 8]
  C: [12, 0]
  D: [13, 2]
base_instance:
  start: [3, 8]
  goal: [7, 8]
meta_instance:
  start: [12, 0]
  goal: [13, 2]
```

## Layout

```text
############.#
###..######..#
###I.######...
###*......I.##
########...###
####.G..I.####
###.II.G.#####
###.....######
###.###.######
```

Raw object facts:

```yaml
targets:
  - [3, 3]   # initially occupied by ice
  - [5, 5]   # initially empty
  - [7, 6]   # initially empty
ice:
  - [3, 2]
  - [3, 3]
  - [10, 3]
  - [8, 5]
  - [4, 6]
  - [5, 6]
standable_edge_or_wall_goal_points_declared:
  - A: [3, 8]
  - B: [7, 8]
  - C: [12, 0]
  - D: [13, 2]
```

## Base A->B Raw Historical Evidence

```yaml
result: solved
cost: 14
pushes: 2
required_events:
  - ice_rebound_d4
graph: "complete, states=14236, transitions=37854, wins=9"
forbidden_reachable_late_events:
  checked:
    - ice_destroy_group_d6_plus
    - slide_restart_after_group
    - ice_pass_through_d5
  hits: []
required_push_coordinates:
  required:
    - [5, 6]
    - [4, 6]
  not_required:
    - [8, 5]
    - [3, 2]
evidence_limits:
  - "This packet gives historical summarized evidence, not a fresh trace replay."
  - "Do not infer human score or designer intent from these facts."
```

## Meta C->D Raw Historical Evidence

```yaml
result: solved
cost: 49
pushes: 6
required_events:
  - ice_destroy_group_d6_plus
  - ice_rebound_d4
graph: "complete, states=9819, transitions=24603, wins=1"
required_push_coordinates:
  required:
    - [8, 5]
    - [5, 6]
    - [4, 6]
    - [3, 2]
evidence_limits:
  - "This packet gives historical summarized evidence, not a fresh trace replay."
  - "Coordinates marked required are raw evidence facts; they are not designer claims."
```

## Routing Facts

```yaml
routing:
  AB_to_C: no_solution
  AB_to_D: no_solution
  full_edge_goal_scan:
    edge_goals_checked: 42
    A_solved_only: ["A", "B"]
    B_solved_only: ["A", "B"]
    C_solved: ["C", "D", "A", "B"]
    D_solved: ["C", "D", "A", "B"]
    non_interface_solved: []
    ignored_reverse_pairs:
      - C->A
      - C->B
      - D->A
      - D->B
```

## Human Aesthetic Calibration Anchors

The target candidate itself is not included as an anchor. Use these same-prototype
human-reviewed clean archive anchors only as score/taste calibration.

```yaml
anchors:
  - candidate_id: ICE_CAND_0015
    human_aesthetic_score: 1
    human_difficulty_score: 2
    human_final_status: structural_redesign_needed
    human_verdict_summary: >
      Machine evidence supports a multi-mechanic chain, but the claimed
      target-state insight does not exist for the player because the corridor
      naturally triggers it. The result is a linear unlocking structure with
      weak effective misdirection.

  - candidate_id: ICE_CAND_0020
    human_aesthetic_score: 2
    human_difficulty_score: 1
    human_final_status: accepted_functional_meta_connector
    human_verdict_summary: >
      Functionally useful meta route material, but base and meta are simple
      witnesses rather than strong applications. It is low-aesthetic
      overclaim calibration, not a production aesthetic target.

  - candidate_id: ICE_CAND_0022
    human_aesthetic_score: 3
    human_difficulty_score: 3
    human_final_status: accepted
    human_verdict_summary: >
      Accepted solid meta lower bound. Base is light and low-pollution; meta is
      a robust double-debt chain. It does not score higher because base/meta
      each lack strong insight and space/object interweaving is limited.

  - candidate_id: ICE_CAND_0019
    human_aesthetic_score: 4
    human_difficulty_score: 4
    human_final_status: accepted
    human_verdict_summary: >
      Accepted later-stage positive with caveats. A human-suggested edit removed
      an immediate target reward and turned an obvious opening step into a
      delayed hidden-stopper condition. It is a solid compound lock with many
      good steps, though not a true late-game aha moment.

  - candidate_id: ICE_CAND_0035
    human_aesthetic_score: 5
    human_difficulty_score: 4
    human_final_status: accepted
    human_verdict_summary: >
      Exceptional same-cell return design. B/C works because surrounding-map
      return pressure makes the first exit naturally become a revisit entrance:
      the refreshed same level is reread, and old exit, target, lower-left ice
      group, and breakable D are reorganized into one-level-two-uses.
```

## Phase 1 Output Contract

Write a phase 1 artifact, replacing `<N>` with your assigned round:

```text
prototypes/ice_slide_escape/reports/claim_last_counterexp_old4_critic<N>_phase1_blind.md
```

Required fields:

```yaml
critic_round:
phase: blind_first_with_aesthetic_calibration
materials_used:
observed_player_model:
cheapest_sufficient_explanation:
  description:
  repeated_unit:
  unit_count:
  segmentation:
  explains_solution_experience: true | false
  why_or_why_not:
module_decomposition:
element_reuse_matrix:
  - element:
    base_role:
    meta_role:
    core_in_base: true | false
    core_in_meta: true | false
    role_reinterpretation: none | weak | strong
degenerate_template_matches:
  - template:
    present: true | false
    evidence:
score_calibration:
  anchors_used:
  closest_negative_anchor:
  closest_positive_anchor:
  closest_overall_anchor:
  why_not_higher_anchor:
  why_not_lower_anchor:
claim_independent_score_cap:
  aesthetic_cap:
  difficulty_base_cap:
  difficulty_meta_cap:
  reason:
phase1_score_assessment_without_designer_claim:
  aesthetic:
  base_difficulty:
  meta_difficulty:
  target_fit:
phase1_verdict_without_designer_claim:
questions_for_claim_reveal:
```

Important: phase 1 must form the player-facing model from the current facts
before reading any designer claim. If historical evidence already shows shared
required coordinates or role changes, credit those facts; if it only shows
stitched modules, cap accordingly.
