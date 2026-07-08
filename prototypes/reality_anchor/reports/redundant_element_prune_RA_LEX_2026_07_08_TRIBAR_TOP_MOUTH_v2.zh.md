# Redundant Element Prune: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2

redundant_element_prune:
  status: pruned
  sequence:
    - rejected RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1 after critic hold
    - changed horizontal tail target into upper target-mouth consumption
    - removed redundant second sticky-side target from the three-goal draft
  removed_elements:
    - kind: goal
      id_or_cell: [6, 1]
      reason: Three-goal draft preserved the same cost and core chain after deleting either sticky-side target; one sticky target is enough to express tail consumption, and the second target would overclaim independent responsibility.
  retained_elements:
    - kind: object
      id_or_cell: "three initial crates"
      reason: all-win count probes require `box_to_sticky >= 3` and `sticky_merge >= 2`.
    - kind: goal
      id_or_cell: [4, 1]
      reason: consumes the cut C output; deleting it removes the post-cut crate refill and drops cost from 18 to 14.
    - kind: goal
      id_or_cell: [5, 1]
      reason: consumes sticky tail upward; deleting it drops cost from 18 to 16 and allows `move_sticky_rigid` count 3.
    - kind: space
      id_or_cell: "lower return corridor"
      reason: needed to reach right-side return-cut stance and lower push stances for C / MM allocation.
  evidence_refs:
    - prototypes/reality_anchor/reports/goal_prune_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2.zh.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2.md
    - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_core5.md
