---
experiment_id: ICE_EXP_CODEX_META_SHARED_ROLE_BATCH_20260701
prototype: ice_slide_escape
status: structural_redesign_needed
terminal_state: structural_redesign_needed
created_by: codex
created_date: 2026-07-01
index_status: not_indexed_due_parallel_archive_work
review_integrity: not_invoked_no_serious_candidate
candidate_ref: none
---

# ICE_EXP_CODEX_META_SHARED_ROLE_BATCH_20260701

## Goal

Attempt a higher-bar meta design where both flows are challenge-level:

- base should be a mid/late application or challenge;
- meta should be a later challenge;
- both flows should share substantial space and elements;
- shared elements should change roles, for example same targets filled by
  different ice, or same ice serving as mover in one flow and obstacle/stopper
  in another.

Taste calibration used this stricter interpretation:

- `ICE_CAND_0020` is not a design lower bound. It is only a functional
  route-puzzle reserve with no real archive-quality aesthetic value.
- `ICE_CAND_0022` is an acceptable lower bound / water-level backup, not a
  middle-of-pack quality target.
- `ICE_CAND_0024` is the real priority target: strong space reuse, masking,
  and revisit reinterpretation.

No archive layout, geometry, route, causal chain, object placement, or interface
relationship was reused.

## Best Structural Idea Found

The strongest family was a shared two-target role-swap structure:

- Two central targets are shared by base and meta.
- In base, left ice are the target fillers.
- In meta, right-side or shared ice should fill the same targets.
- The same left ice that are pushed onto targets in base should become rebound
  obstacles in meta.
- The same right/shared ice should become base stoppers in one reading and meta
  movers in the other reading.

This is the correct design direction. It directly addresses the requested
pattern:

- same target, different filling ice;
- same ice, different role;
- shared activity rows and target space;
- base/meta causal chains intended to differ rather than one replaying the
  other.

## Attempt Log

### v2/v3 six-ice role-swap family

Representative layout:

```text
#############
######..#..##
.......I#I...
#.#.I.G....##
#.#.##.###.##
#...I.G....##
.......I#I...
######..#..##
#############
```

Intended base:

1. Move the x7 vertical ice into right-side stopper positions.
2. Push the two left ice right onto the two targets.

Intended meta:

1. Move the x9 vertical ice into right-side mover positions.
2. Push those ice left into d4 rebounds off the left ice.
3. Fill the same targets with different ice.

What worked:

- Returned traces exist for both intended flows.
- Base and meta both have 4 pushes in the intended traces.
- The intended role swap is strong: left ice are base movers and meta rebound
  obstacles; right ice are meta movers; targets are shared.

Why it failed as a serious candidate:

- Complete graph could not be closed. `explain-layout` exhausted at
  1,000,000 states for both base and meta; a 5,000,000-state attempt hit Node
  heap OOM.
- Required-event probing found a base winning path missing the intended
  `ice_stop_short:d2` pattern and using d4-like alternatives, so the base chain
  was not cleanly protected.
- Because the left/right activity rows are walkable as well as slide lines,
  after one ice moves the other interface can steal part of the opposite logic.

Verdict: promising family, not a proposal.

### v4 four-ice shared-ice family

Core idea:

- Use only two left ice plus two shared ice.
- In base, the shared ice become stoppers.
- In meta, the same shared ice should be shifted into mover positions and then
  rebound-fill the targets.

What worked:

- Solver found challenge-length base and meta traces.
- Ice count was reduced, and the role-swap ambition was stronger than v3.

Why it failed:

- Meta could still steal the base method for one target.
- It no longer guaranteed that both targets are filled by a different meta
  logic chain.
- Complete graph still exceeded 300,000 states.

Verdict: wrong lock structure.

### v5/v6 corridor-split variants

Core idea:

- Split row2/row6 and row1/row7 corridors so the right-side meta entrance could
  reach the shared ice shift positions but not the left-ice push positions.

What failed:

- v5 introduced a new vertical short-stop exploit: the shared ice could be
  shifted to x6 and pushed directly onto the target, bypassing d4.
- v6 fixed that specific x6 vertical stop by opening x6,y4, but meta still
  collapsed into the base-style stopper/fill chain.
- These variants therefore made the evidence easier in some places but damaged
  the actual chain difference.

Verdict: structural redesign needed, not incremental patching.

## Evidence Summary

Useful evidence collected:

- v3 intended base and meta traces replay manually.
- v3 solver found both base and meta shortest solutions, but graph enumeration
  exhausted at high budgets.
- v3 base required-event probe found a missing-required winning path, so the
  intended base chain was not forced.
- v4/v5/v6 solver reports exposed concrete bypasses where one flow steals the
  other flow's logic.

No serious candidate was submitted to independent critic, because none met the
minimum evidence bar for `proposal_ready` or `proposal_ready_with_caveats`.

## Graph Fact Interpretations

- `v3 graph exhausted above 1,000,000 states` -> the full reachable state space
  is too large for current evidence closure -> reviewer cannot distinguish
  intended chain from hidden alternate families by full graph -> prevents
  proposal readiness.
- `v3 required-event probe found a base win missing required d2 pattern` -> the
  intended base stopper/fill reading is not the only winning logic -> the player
  may discover a meta-like or hybrid route during base -> undermines clean
  base/meta separation.
- `v4/v6 meta solver returns base-style short-stop fills` -> corridor changes
  did not enforce the intended later reading -> the player-facing meta route is
  not a genuinely different chain -> reject these variants.
- `manual traces show same targets and ice role swaps are possible` -> the
  family has real structural promise -> next search should redesign the lock,
  not abandon the role-swap idea.

## Next Design Constraints

Next attempt should keep the role-swap idea but change the lock model:

- Separate player walking access from slide lanes more strongly; shared slide
  space is good, but the player should not be able to stand in both flows'
  push positions.
- Avoid using the same open row as both the cross-flow slide lane and a free
  walking corridor.
- If the same ice is base stopper and meta mover, use a state-independent
  geometry lock that prevents the opposite flow from pushing it into a direct
  short-stop target fill.
- Prefer a sequential lock where the first target fill opens or preserves access
  to the second, instead of two independent modules that multiply graph size.
- Run required-event probes early; if the intended chain is not event-family
  necessary, reject before spending full-graph budget.

## Review Loop

No numbered independent review loop was opened for a proposal candidate.

Reason:

- No serious candidate satisfied the evidence threshold.
- Sending v3/v4/v5/v6 to critic as if they were proposal candidates would risk
  laundering an unclosed design.

Review integrity: `not_invoked_no_serious_candidate`.

## Final Terminal State

`structural_redesign_needed`

