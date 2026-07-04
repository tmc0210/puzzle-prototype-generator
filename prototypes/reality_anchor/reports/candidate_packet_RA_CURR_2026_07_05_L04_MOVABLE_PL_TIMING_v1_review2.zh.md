# Candidate Packet: RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1 review_2 evidence supplement

candidate_version: RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1
review_iteration: review_2
review_input_type: evidence_disagreement_for_next_review
prototype: reality_anchor
slot: 第四关 / 可移动 P/L 推动时机

## Summary Of Review 1 Disagreement

review_1 evidence reviewer conclusion:

- verdict: `unknown`
- review_loop_state: `revise_required`
- required_action: `evidence_disagreement_for_next_review`

Reason:

- The broad probe proved all wins require some `push_object`, some `pull_object`, and `anchor_boundary_shift:push_pull`.
- But the claim also spoke about the crate itself being pulled before P/L movement and pushed after P/L movement.
- The broad probe did not prove object-specific `pull_object:crate#1` and `push_object:crate#1` were all-solution required.

## Unchanged Candidate Facts

Layout is unchanged:

```text
#########
#..PL...#
#.G..@C.#
#########
```

Shortest solution is unchanged:

```text
left left left up right right right down left left
```

Returned trace remains:

- steps 1-2: `pull_object:crate#1`
- steps 5-7: `push_object:push_pull_anchor`, `anchor_boundary_shift:push_pull`
- steps 9-10: `push_object:crate#1`

## Revised / Clarified Claim

The candidate still claims:

- The intended and shortest route is crate pull -> P/L boundary sweep -> crate push.
- P/L movement is not an opening move; complete order scan found no winning path where anchor shift happens before any crate event.
- Since there is exactly one crate, object-specific crate pull and crate push are meaningful instance-level checks.

The candidate does not claim:

- A unique input sequence.
- That every win moves P/L exactly three times.
- That every win has exactly two crate pulls and exactly two crate pushes.

## New Evidence

New command:

```text
npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_layout.txt RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_instance_core 300000 80 "crate_pull=pull_object:crate#1" "crate_push=push_object:crate#1" "anchor_shift=anchor_boundary_shift:push_pull"
```

New artifact:

- `prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_instance_core.md`

Result:

```yaml
combined_probe:
  status: complete
  found_bypass: false
  explored_states: 154
individual_probes:
  crate_pull:
    status: complete
    found_bypass: false
  crate_push:
    status: complete
    found_bypass: false
  anchor_shift:
    status: complete
    found_bypass: false
```

## Existing Evidence Refs

- `prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md`
- `prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_core.md`
- `prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md`
- `prototypes/reality_anchor/reports/order_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md`
- `prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_review_1.md`
- `prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_review_1.md`

## Reviewer Request

Please review whether the new object-specific event probe resolves the review_1 evidence gap.

Use `evidence-reviewer-template.md` fields. This is an evidence supplement only; do not evaluate aesthetic or difficulty.
