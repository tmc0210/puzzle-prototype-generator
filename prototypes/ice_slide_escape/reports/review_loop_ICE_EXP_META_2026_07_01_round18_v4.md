# Review Loop Summary: ICE_EXP_META_2026_07_01_round18_v4

```yaml
prototype: ice_slide_escape
candidate_id: ICE_EXP_META_2026_07_01_round18_v4
controller_final_state: revise_required
review_integrity: independent_review
archive_eligibility: raw_run_only
designer_action_4: downgrade_after_pair_policy_audit
required_action_after_reviews: structural_revision
amended_on: 2026-07-02
amendment_reason: >
  Prior controller conclusion incorrectly treated A/B->C/D as a non-blocking
  interface clarity caveat. The prototype docs only ignore C/D->A/B reverse
  internal pairs. A/B->C/D are internal non-target pairs not listed under
  ignored_internal_reverse_pairs, so they must be treated as risky pair-policy
  findings requiring revision or explicit human override.
human_correction_applied:
  ignore_c_to_a_b_shorter_than_c_to_d: true
  note: >
    C->A/B shorter than declared C->D is treated as a document/interface note for
    this and following designs. It is not counted as a core attack, caveat,
    reading risk, or score penalty in this loop.
summary: >
  v4 is a fresh meta-first candidate with useful evidence, but it does not close
  as proposal_ready. Base meets the narrow A->B solve and meta C->D solves, but
  A/B->C/D are solvable internal non-target pairs and are not covered by the
  ignored reverse-pair policy. The candidate requires structural revision.
```

## Candidate Packet

```yaml
meta_first_design: true
lineage_claim: fresh_required / random d3_d4_pressure_room search
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_01_round18_fresh_v4_layout.txt
interfaces:
  A: [0, 1]
  B: [0, 2]
  C: [7, 5]
  D: [0, 5]
base_instance:
  player_start: [0, 1]
  player_goal: [0, 2]
  target_difficulty: "2/2+"
  allowed_exposure_through: ice_pass_through_d5
  recommended_exposure: "d4, with strict-clean caveat"
meta_instance:
  player_start: [7, 5]
  player_goal: [0, 5]
  target_difficulty: "4/4+"
  achieved_difficulty: "4; not stable 4+"
  allowed_exposure_through: "all knowledge"
design_claim: >
  Base presents a minimal one-push d4 rebound target-fill read. Meta reuses the
  same target/row cluster after d3 ice clearing, then returns to d4 rebound/refill
  as a longer five-push route.
```

```text
########
.....I.#
.I..G.##
####.###
#....#.#
..#...I.
#...I..#
########
```

## Evidence

```yaml
base:
  result: solved
  start: [0, 1]
  goal: [0, 2]
  cost: 3
  pushes: 1
  graph: "complete, states=5051, transitions=12795, wins=18"
  returned_events:
    - walk
    - push_ice
    - ice_rebound_d4
    - walk
  d5_cap_gate: pass
  required_core_gate: pass
  required_core:
    - ice_rebound_d4
  forbidden_reachable:
    ice_destroy_group_d6_plus: false
  strict_d4_gate: "not clean"
  strict_d4_caveat: "reachable boundary-disappear events exist; winning path uses d4 rebound"
meta:
  result: solved
  start: [7, 5]
  goal: [0, 5]
  cost: 33
  pushes: 5
  graph: "complete, states=1711, transitions=4280, wins=4"
  returned_events:
    ice_destroyed_d3: 2
    ice_rebound_d4: 3
  required_core_gate: pass
  required_core:
    - ice_destroyed_d3
    - ice_rebound_d4
  missing_required_core_wins: 0
edge_scan:
  non_interface_completion: none
  completion_edges: [[0, 1], [0, 2], [0, 5], [7, 5]]
  risky_internal_non_target_pairs:
    - A_to_C
    - A_to_D
    - B_to_C
    - B_to_D
  ignored_internal_reverse_pairs:
    - C_to_A
    - C_to_B
    - D_to_A
    - D_to_B
  selected_pair_costs:
    A_to_B: 3
    A_to_C: 37
    A_to_D: 40
    B_to_A: 3
    B_to_C: 38
    B_to_D: 41
    C_to_A: 15
    C_to_B: 14
    C_to_D: 33
    D_to_A: 16
    D_to_B: 15
    D_to_C: 31
```

Evidence refs:

```text
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round18_v4_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round18_v4_base.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round18_v4_meta.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round18_v4_meta.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round18_v4_base_d5_cap.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round18_v4_base_d5_cap.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round18_v4_meta_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round18_v4_meta_required_core.json
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_01_round18_v4_ABCD.md
```

## Independent Review

```yaml
evidence_reviewer:
  verdict: supports_with_caveats
  required_action: none
  confirmed:
    - "base solved: cost=3, pushes=1, d4 rebound on returned solution"
    - "base d5 cap passes; no reachable d6 group destroy"
    - "meta solved: cost=33, pushes=5, required d3 destroy + d4 rebound"
    - "no non-interface edge completion outside A/B/C/D"
  caveats:
    - "meta_first_design and fresh lineage are designer provenance metadata, not solver-proved facts"
    - "no object identity / per-object necessity proof"
    - "C->A/B shorter than C->D is recorded only as internal pair data under the human correction"
puzzle_critic:
  review_loop_state: revise_required
  required_action: structural_revision
  base_difficulty: "meets 2/2+ as a minimal d4 seed"
  meta_difficulty: "meets 4; do not strongly claim 4+"
  aesthetic_score: "4- / low 4"
  blocking_attacks:
    - "A/B->C/D are solvable internal non-target pairs not covered by ignored_internal_reverse_pairs."
  non_blocking_caveats:
    - "base is very short: 1 push / cost 3, more seed than full standalone puzzle"
    - "base strict d4 is not fully clean, though hard <=d5 passes"
    - "meta's higher-order feel comes from d3/d4 sequencing, not deep state debt"
  critic_miss_note: >
    The original critic treated A/B->C/D as a clarity caveat. That was too weak
    under the current interface_pair_policy. This amendment supersedes that
    conclusion.
```

## Controller Conclusion

```text
This loop does not close as proposal_ready_with_caveats. The previous conclusion
over-relied on the fact that there was no non-interface edge completion and
under-read the prototype-specific pair policy. The docs ignore C/D->A/B reverse
internal pairs by default, but they do not ignore A/B->C/D. Since A->C, A->D,
B->C, and B->D all solve, v4 has unresolved risky internal non-target pairs.

Correct controller state: revise_required / structural_revision. A future v5
would need to block or structurally devalue A/B->C/D while preserving the
declared A->B base and C->D meta instances, then rerun edge-pair diagnostics and
review.
```
