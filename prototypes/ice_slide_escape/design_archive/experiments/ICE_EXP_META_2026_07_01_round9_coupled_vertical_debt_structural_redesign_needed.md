# Experiment: ICE_EXP_META_2026_07_01_round9_coupled_vertical_debt

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round9_coupled_vertical_debt_structural_redesign_needed
prototype: ice_slide_escape
terminal_state: structural_redesign_needed
candidate_id: ICE_CAND_0029
review_integrity: post_designer_correction
human_final_status: pending
```

## Post-Designer Correction

This run was downgraded after designer feedback. The previous
`proposal_ready_with_caveats` conclusion was too permissive.

Correction summary:

- Base leaks d5 knowledge too strongly.
- Meta flow is still too simple for a late-game revisit.
- Base flow is also too simple.
- The two sides lack adequate geometric interweaving or element reuse.
- The review loop used weaker archive examples as an acceptance floor. Future
  meta-first design should target the highest-taste references, not merely beat
  functional connector / solid filler cases.

Updated verdict: reject / structural redesign needed.

## Rejected Proposal Draft

```yaml
interfaces:
  A: [0, 7]
  B: [0, 1]
  C: [16, 7]
  D: [16, 6]
base_instance:
  player_start: [0, 7]
  player_goal: [0, 1]
meta_instance:
  player_start: [16, 7]
  player_goal: [16, 6]
```

```text
#################
......###########
#...#.###########
#..#G.*.....*.###
#...*.######*.###
#.....######..###
#...I.######I....
......######.....
#################
```

## Design Claim

Base is a light first-visit setup, not a strong standalone application. It uses
two local pushes on the left to establish [4,3] and [6,3] as completed / blocking
structure.

Meta is the intended value. From C, [12,3]* is no longer read as only a completed
target; it is a d5 projectile that passes through [6,3]* and fills [4,3]. This
creates right-side debt at [12,3]. [12,4]* refills [12,3], then [12,6] refills
[12,4] by using the newly placed [12,3] ice as the stopper. The v2 revision was
made specifically so the last two meta steps are coupled rather than a side ice
simply clearing a target debt against a wall.

## Player Insight

The revisit insight is to treat completed target ice as an interface instead of
as solved clutter: [12,3]* can be spent through the central [6,3]* d5 group to
solve the left target, but doing so creates a vertical refill obligation. The
last refill depends on recognizing that the previous refill has also created the
stopper.

## Causal Chain

Base A->B:

1. Push the left lower ice upward to fill [4,3], creating local target debt.
2. Push the remaining left target ice upward to refill [4,4], stopping against
   the newly placed [4,3] ice.
3. Exit to B.

Meta C->D:

1. Push [12,3]* left through [6,3]* by d5/restart to fill [4,3].
2. Push [12,4]* up to refill [12,3].
3. Push [12,6] up to refill [12,4], stopping against the ice now at [12,3].
4. Exit to D.

## Why Not Execution

This is not relying on fiddly walking. The non-walk structure is two base pushes
and three meta pushes. The v2 meta SCC path has three irreversible steps with
forced viable prefix 3/3, and the count probe found no C->D win missing the
declared three-push d5/restart/block event profile.

## Falsification

Reject or redesign if any of the following become true:

- A or B can solve to C or D.
- Any A/B/C/D start can solve to a non-selected perimeter goal.
- Meta C->D has a win missing `push_ice>=3`, d5 pass-through, restart, or the
  required block/short-stop profile.
- Critic or human reviewer judges the right-side vertical chain to still be only
  a trivial target-debt stack with no meaningful stopper coupling.

## Mechanism Scope

```yaml
central:
  - d5_pass_through on the [12,3] -> [6,3] -> [4,3] projectile
  - target_debt_refill
  - coupled_stopper_refill: [12,3] created by step 2 stops step 3
support:
  - short_stop_d1_d2
  - ice_blocks_ice_no_chain_push
  - explicit_edge_goal
incidental:
  - base right-side future structure is visible but not used by A/B
```

## Routing Result

```yaml
perimeter_goals_checked: 48
selected_starts_checked: [A, B, C, D]
A: solves [B, A]
B: solves [B, A]
C: solves [D, C]
D: solves [D, C]
selected_to_nonselected_solved: 0
early_to_late_solved: 0
ABCD_to_nonselected_solved: 0
```

Graph diagnostic reading:

- graph_fact: A/B/C/D selected starts were each enumerated against all 48
  perimeter goals; A/B solve only A/B and C/D solve only C/D.
  neutral_meaning: early and late interfaces are separated at the perimeter
  goal layer.
  player_facing_interpretation: first-visit A/B cannot complete targets and leak
  into the revisit side; revisit C/D remains a right-side interface.
  verdict_effect: hard route isolation passes.

## Evidence Refs

```text
- prototypes/ice_slide_escape/reports/ICE_CAND_0029_v2_coupled_vertical_debt_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0029_v2_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0029_v2_base_A_to_B.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0029_v2_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0029_v2_meta_C_to_D.json
- prototypes/ice_slide_escape/reports/required_count_probe_ICE_CAND_0029_v2.md
- prototypes/ice_slide_escape/reports/required_count_probe_ICE_CAND_0029_v2.json
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0029_v2_ABCD.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0029_v2_ABCD.json
```

## Graph / SCC Reading

Base:

- graph_fact: complete graph, 11,729 reachable states, 1 winning state, SCC
  steps=2, forcedWinPrefix=2/2.
  neutral_meaning: the base solve has a two-commitment win-continuing chain.
  player_facing_interpretation: base is a valid light setup, not a high-depth
  application.
  verdict_effect: supports caveated base claim.

Meta:

- graph_fact: complete graph, 318,713 reachable states, 1 winning state, SCC
  steps=3, winSubgraph=one_win_continuation_per_scc, forcedWinPrefix=3/3.
  neutral_meaning: the meta solve has a fixed three-commitment win-continuing
  chain.
  player_facing_interpretation: the revisit route is a real three-step coupled
  chain rather than a one- or two-step witness.
  verdict_effect: supports the former meta claim as a topological fact, with
  caveat that topology does not
  itself prove aesthetic depth.

## Review Iterations

review_1:

- evidence reviewer: pass_with_caveats, required_action none.
- critic: acceptable but held; required_action hold.
- main attacks: v1 meta after the first d5 projectile was still too much like
  linear target-debt bookkeeping; cross-time reuse was concentrated at [6,3] and
  [4,3]; base remained light.

designer_action_1:

- Replaced v1 side refill with v2 vertical coupled refill.
- New meta chain: [12,4]* refills [12,3], then [12,6] refills [12,4] using the
  newly placed [12,3] ice as stopper.
- Re-ran solver, graph/SCC, count probe, and all-perimeter routing.

review_2:

- evidence reviewer: pass_with_caveats, required_action none,
  final_recommendation proposal_ready_with_caveats.
- critic: design_quality acceptable, required_action none,
  final_recommendation proposal_ready_with_caveats.

post_designer_correction:

- The `proposal_ready_with_caveats` conclusion was rejected as too lenient.
- Critic was too permissive because it accepted "better than 0020/0027 and worse
  than 0024" as sufficient. This is not a valid threshold for the user's goal.
- Required future action: change structural family and aim at highest-taste meta
  references rather than producing solid water-level meta fillers.

## Critic Attacks And Designer Actions

```yaml
remaining_attacks:
  - base remains a light two-push setup and must not be overclaimed
  - cross-time reuse still concentrates on [6,3] and [4,3]
  - meta is a precise forced chain, not an open high-difficulty puzzle
  - no instance-level object participation proof
designer_response:
  - former proposal text explicitly labeled base as light setup
  - this was insufficient because the candidate still leaks d5 and stays too simple
  - status is downgraded to structural_redesign_needed after designer correction
```

## Archive Taste Context

Used only for calibration, not for layout inheritance:

- ICE_CAND_0024 human-accepted strong meta reference: warns that 0029 is not
  0024-level shared-space reuse and should not be oversold.
- ICE_CAND_0027 negative calibration: avoid mirrored same-logic reuse and do not
  treat shared elements as automatic complexity.
- ICE_CAND_0020 / ICE_CAND_0025 negative-functional calibration: avoid producing
  another clean connector / short role-flip puzzle and calling it strong meta.

## Exploration Log Summary

1. ICE_CAND_0028 v1/v3 established a central target-ice d5 projectile idea but
   meta remained only two pushes.
2. ICE_CAND_0029 v1 added a three-push right-side debt cascade; evidence passed,
   but critic held it as too close to linear cleanup.
3. ICE_CAND_0029 v2 changed the final cleanup into a vertical stopper dependency
   and passed review_2 with caveats.
