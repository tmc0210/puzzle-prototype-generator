---
experiment_id: ICE_EXP_CODEX_META_D6_GATE_20260701
prototype: ice_slide_escape
status: rejected_candidate
terminal_state: rejected_candidate
candidate_ref: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_CODEX_META_D6_GATE_20260701.md
created_by: codex
created_date: 2026-07-01
index_status: not_indexed_due_parallel_archive_work
review_integrity: independent_review_available
human_verdict: no_archive_value
---

# ICE_EXP_CODEX_META_D6_GATE_20260701

## Goal

Run one complete meta-level design loop and produce at least one proposal for
human review. This attempt was rejected after human review: it has no archive
value, and the designer incorrectly treated a functional `ICE_CAND_0020`-like
route-puzzle niche as an acceptable lower bound.

## Additional Round Constraints

- Base and meta must be evaluated separately from cross-time reuse.
- Cross-time reuse cannot make a shallow base route count as a strong base
  application.
- At least one of base or meta should have a meaningful insight or coupling.
- ABCD -> non-ABCD edge reachability is a hard reject.
- A/B -> C/D reachability is a hard reject.
- C/D -> A/B reachability is a caveat, not a hard reject for this round.
- Archive candidates with human comments are taste calibration only and may not
  be reused as layout, geometry, causal chain, route, object placement, or
  interface relationships.

## Candidate

`ICE_CAND_CODEX_META_D6_GATE_20260701` - rejected after human correction.

```text
###############
.....#.........
#....#........#
#..IG#......I.#
#....#........#
#..IG#........#
#....#.........
.....#........#
###############
```

Interfaces:

- A = `[0,7]`
- B = `[0,1]`
- C = `[14,1]`
- D = `[14,6]`

Instances:

- base: A -> B
- meta: C -> D

## Exploration Log Summary

1. Calibrated taste against only human-commented archive examples. The key
   lesson from the recent human note was to separate base quality, meta quality,
   and cross-time reuse.
2. Generated a compact left/right revisit family rather than a three-solve
   ABCDEF family, because the hard routing constraint made a clean first
   proposal more valuable than a broad but fragile interface set.
3. Found a base route with two d1 short-stop target fills.
4. Found a meta route where right-side play uses d6+/restart to open a route
   through the same wall that served as the base stopper, then reuses the
   left-side target relation.
5. Ran complete solve, graph, SCC, required-event, and edge-reachability checks.
6. Submitted the same base+meta packet to independent evidence review and
   independent critic review.
7. Narrowed claims according to the reviews: d4 is incidental, object roles are
   returned-trace-supported, and the base is application-lite.
8. Human review rejected the candidate as having no archive value. The main
   lesson is that `ICE_CAND_0020` is not an acceptable lower bound; it is a
   warning against overvaluing functional meta route-puzzle material.

## Machine Evidence

Base A -> B:

- Solvable with 14 inputs and 2 pushes.
- Required `ice_stop_short:d1` event-family probe passed.
- Complete graph: 5241 states, 16190 transitions, 1 winning state.
- SCC: `branching_win_dag`, irreversible steps 2, forcedWinPrefix 0/2.

Meta C -> D:

- Solvable with 39 inputs and 4 pushes.
- Required `ice_destroy_group_d6_plus`, `slide_restart_after_group`, and
  `ice_stop_short:d1` event-family probe passed.
- Complete graph: 125469 states, 414359 legal transitions, 9 winning states.
- SCC: `branching_win_dag`, irreversible steps 4, forcedWinPrefix 0/4.
- d4 rebound is not required; a probe found a C -> D win without d4.

Routing:

- A solves A/B only.
- B solves A/B only.
- C solves A/B/C/D.
- D solves A/B/C/D.
- No ABCD -> non-ABCD edge goal was found.
- No A/B -> C/D route was found.
- C/D -> A/B is retained as route bleed caveat.

## Required Interpretive Chain For Graph Facts

- `base complete graph and 5241 states` -> the base search space is finite and
  fully checked under the budget -> the player sees a small local puzzle, not a
  strong late-game reasoning object -> reduces base claim to application-lite.
- `base forcedWinPrefix 0/2` -> no initial push is solver-forced -> base can be
  discovered by local testing -> prevents overclaiming a deep base aha.
- `meta complete graph and 125469 states` -> the revisit has a substantially
  larger state space -> the player may need to distinguish route-opening play
  from irrelevant movement -> supports meta being the stronger half.
- `meta required d6+/restart probe passed` -> every checked C -> D win uses the
  later mechanism family -> the player-facing revisit is not just the same d1
  witness repeated from the right -> supports a caveated meta proposal.

## Review Loop

`review_2` independent evidence review:

- Verdict: `supports_with_caveats`.
- Required action: `none`.
- Key support: solver, graph, SCC, required events, and hard routing gate.
- Key limit: exact object identity is not all-solution-proven.

`review_3` independent critic:

- Verdict: `proposal_ready_with_caveats`.
- Required action: `none`.
- Main critique: base is shallow; meta is different and valid but not a strong
  capstone; cross-time reuse is real but mainly appears on revisit; route bleed
  C/D -> A/B should be shown to humans.

No `designer_action_N` is used to close the review loop. The loop closes because
the independent review has `required_action: none`.

## Human Review Result

Result: rejected, no archive value.

Reason: the design has mechanical cross-time reuse, but that reuse does not
raise the base or meta flow above a thin functional puzzle. The attempt repeats
the same miscalibration warned about by the human comment on `ICE_CAND_0020`:
functional ecological utility is not the same as archive-worthy design quality.

## Final Terminal State

`rejected_candidate`
