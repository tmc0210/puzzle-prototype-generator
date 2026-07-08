# Redundant Element Prune: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2

```yaml
candidate_version: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2
prototype: reality_anchor
status: clean_after_prune
sequence:
  - goal_prune
  - object_remove_prune
  - object_wallify_prune
  - space_prune
  - wall_outline_prune
```

## Layout

```text
##########
#..G#...##
#...MM@P##
#.....#L##
###BS#####
##########
```

## Goal Prune

v1 had two targets. The lower target at `[4,3]` was removed because it was only
covered as a side effect of the required final B/S pull chain.

```yaml
goal_prune_check:
  status: pruned
  targets_checked:
    - target: [3, 1]
      action: keep
      reason: >
        Removing the upper target collapses the level to a 3-step sticky push
        route and creates winning bypasses missing pull, B/S shift, sticky_to_box,
        and force_chain.
      cost_delta: "12->3"
      graph_status: complete
      expected_trace_win: false
      core_event_bypass:
        missing:
          - push_pull_effect
          - box_sticky_anchor_shift
          - material_cut
          - force_chain
      evidence_refs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v1_NO_TOP_GOAL.md
        - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v1_NO_TOP_GOAL_core.md
    - target: [4, 3]
      action: remove
      reason: >
        Removing the lower target preserves the 12-step trace, complete graph,
        and all required core event groups; it was not adding structural pressure.
      cost_delta: "12->12"
      graph_status: complete
      expected_trace_win: true
      core_event_bypass: none
      evidence_refs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v1_NO_LOWER_GOAL.md
        - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v1_NO_LOWER_GOAL_core.md
  removed_targets:
    - [4, 3]
  retained_targets:
    - [3, 1]
```

## Object And Space Prune

```yaml
object_remove_prune:
  status: clean
  retained_objects:
    - object: initial sticky pair at row 2
      reason: >
        Both cells participate in the returned trace through sticky rigid movement,
        sticky_to_box cutting, and later crate allocation.
    - object: fixed P/L anchor at [7,2]-[7,3]
      reason: >
        Reachable scan reports no P/L anchor shift, but every win requires
        pull_object; the anchor supplies the push-to-pull region handoff.
    - object: B/S anchor at [3,4]-[4,4]
      reason: >
        Every win requires anchor_boundary_shift:box_sticky; the final pull of
        B/S is the force-chain handoff that lifts the upper crate onto the target.
space_prune:
  status: clean
  retained_spaces:
    - cells: opening top/right buffer
      reason: >
        The initial SCC has 4 states, giving a small observation/reposition buffer
        before the first irreversible commitment. Removing it would make the
        challenge start more forced without improving the causal chain.
    - cells: left/top transit loop
      reason: >
        Returned trace uses it to move from the cut output to the upper-push and
        lower-pull phases.
wall_outline_prune:
  status: clean
  reason: >
    Rectangular outline is already tight around the P/L pocket, B/S pocket,
    target wall tooth, and left transit route.
evidence_refs:
  - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2.md
  - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_core.md
  - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_fixed_PL.md
```
