---
candidate_id: ICE_CAND_CODEX_META_D6_GATE_20260701
prototype: ice_slide_escape
status: rejected_candidate
terminal_state: rejected_candidate
created_by: codex
created_date: 2026-07-01
index_status: not_indexed_due_parallel_archive_work
experiment_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_CODEX_META_D6_GATE_20260701.md
review_integrity: independent_review_available
human_verdict: no_archive_value
---

# ICE_CAND_CODEX_META_D6_GATE_20260701

## Proposal Summary

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

## Design Claim

Human correction after submission: this candidate has no archive value. The
designer over-weighted `ICE_CAND_0020` as if it were an acceptable lower bound
for proposal quality. It should instead have been treated as a warning example:
functional route-puzzle ecology does not imply archive-worthy design.

This was a compact meta revisit attempt. The base route is intentionally light:
it teaches or witnesses the left-side relation between two ice blocks, two
targets, and the x5 stopper wall through two `ice_stop_short:d1` fills. It
should not be described as a high-difficulty application.

The meta route uses a different logic chain. From the right side, the player
must use `ice_destroy_group_d6_plus` and `slide_restart_after_group` to open and
reinterpret the same x5 wall that served as the base stopper. After that route
change, the meta solve reuses the left-side target/ice relation and exits at D.
The cross-time reuse is mechanically real, but the payoff is not enough for
archive value: the d6+ group is length 1, the base-time route has little visible
foreshadow, and the base/meta flows remain too thin.

Final verdict: rejected. Do not use this as an accepted lower bound for future
meta design.

## Player Insight

Base insight: the left-side wall is a short-stop support for two local target
fills.

Meta insight: the same wall can be reread as a destructible route lock from the
right side. The revisit meaning is not "do the base twice"; it is "the base
stopper was also the meta door condition."

## Causal Chain

Base A -> B:

1. Enter from A.
2. Push the lower left ice into the lower target with `ice_stop_short:d1`.
3. Push the upper left ice into the upper target with `ice_stop_short:d1`.
4. Exit at B.

Meta C -> D:

1. Enter from C and operate the right-side ice.
2. Use the right-side line to trigger `ice_destroy_group_d6_plus` and
   `slide_restart_after_group` against the x5 wall.
3. Cross into the left space opened by that route change.
4. Reuse the two left-side target/ice relations.
5. Return through the right side and exit at D.

## Why Not Execution

The base route is execution-light and should be treated as application-lite.
The meta route adds a topology rewrite: the player must understand that a wall
that was only a stopper in the base read can become a destructible route lock
in the later read. That makes the meta route a different logical chain from the
base route, even though it reuses the same local target relation afterward.

## Falsification

Reject or revise this proposal if any of the following is found:

- A or B can solve C or D.
- Any of A, B, C, or D can solve a non-ABCD edge goal.
- C -> D can be solved without `ice_destroy_group_d6_plus`.
- C -> D can be solved without `slide_restart_after_group`.
- C -> D can be solved without any `ice_stop_short:d1`.
- The d6+/restart action does not actually enable the returned route into the
  left-side space.
- The design is judged to be merely "open a door, then replay base" with too
  little meta reinterpretation.

## Mechanism Scope

Central:

- Meta d6+ group destruction and restart as the route-opening reinterpretation
  of the base stopper wall.
- Cross-time reuse of the left-side target/ice relation.

Support:

- Base two-target d1 short-stop route.
- The right-side approach line that sets up the d6+/restart opening.

Incidental:

- d4 rebound appears in one returned meta trace, but a required-event probe
  found a C -> D win without d4. It must not be claimed as central.

## Solver And Graph Evidence

Base A -> B:

- `explain-layout`: solvable, cost 14, pushes 2.
- Events include two `ice_stop_short:d1`.
- Complete graph: 5241 reachable states, 16190 transitions, 1 winning state.
- SCC: `branching_win_dag`; solution irreversible steps 2; forcedWinPrefix 0/2.
- Required-event probe: no A -> B win missing `ice_stop_short:d1`.

Meta C -> D:

- `explain-layout`: solvable, cost 39, pushes 4.
- Events include `ice_destroy_group_d6_plus:len1`,
  `slide_restart_after_group`, and two `ice_stop_short:d1`.
- Complete graph: 125469 reachable states, 414359 legal transitions,
  9 winning states.
- SCC: `branching_win_dag`; solution irreversible steps 4; forcedWinPrefix 0/4.
- Required-event probe: no C -> D win missing `ice_destroy_group_d6_plus`,
  `slide_restart_after_group`, or `ice_stop_short:d1`.
- Separate d4 probe found a C -> D win without d4, so d4 is not required.

Evidence limitation: the required-event probes prove event-family necessity for
the checked goals. They do not prove per-object all-solution identity. Object
and wall-coordinate descriptions are returned-trace-supported design readings.

## Routing Result

All-edge scan from selected starts:

- A `[0,7]`: solves A and B only.
- B `[0,1]`: solves A and B only.
- C `[14,1]`: solves A, B, C, and D.
- D `[14,6]`: solves A, B, C, and D.

Hard routing gates:

- ABCD -> non-ABCD edge goals: none found.
- A/B -> C/D: none found.

Caveat:

- C/D -> A/B exists. This weakens interface cleanliness and should be shown to
  the human reviewer, but it is not a hard reject under this round's stated
  routing rule.

## Graph Fact Interpretations

- `base graph complete, 5241 states, branching_win_dag` -> the base has real
  search width but is not a forced-line proof -> the player likely experiences
  it as a light local route rather than a strong reasoning lock -> supports
  application-lite, not high-difficulty, status.
- `base irreversible steps 2, forcedWinPrefix 0/2` -> two commitment points exist
  but neither is forced from the start -> the base can be found by light
  experimentation -> limits the base quality claim.
- `meta graph complete, 125469 states, branching_win_dag` -> the meta state space
  is much larger, but branching alone is not quality -> the player may feel a
  broader revisit problem with more false movement options -> mildly supports
  that meta has more content than base.
- `meta irreversible steps 4, forcedWinPrefix 0/4` -> the meta has more
  commitments, but not a linear forced chain -> the mechanism chain is valid
  while still allowing trial-and-error feel -> proposal stays with caveats.

## Archive Taste Context

Used only human-commented archive candidates as calibration:

- `ICE_CAND_0020`: reminder not to overclaim a functional meta connector whose
  base and meta flows are individually simple.
- `ICE_CAND_0022`: positive reference for a light base plus a stronger meta
  chain, with caveat when spatial interweaving is limited.
- `ICE_CAND_0024`: high bar for strong cross-time reuse and base-time masking;
  this proposal is weaker than that bar.
- `ICE_CAND_0019`: reference for delayed payoff through a reread of a local
  structure, without claiming a final aha.

No archive layout, geometry, route, object placement, interface relationship,
or causal chain is reused.

## Review Iterations And Correction

`review_2` independent evidence reviewer:

- Verdict: `supports_with_caveats`.
- Required action: `none`.
- Supported: base/meta solvability, required event-family probes, and hard
  route gate.
- Caveat: object identity and exact wall-role claims are returned-trace
  supported, not all-solution per-object proofs.

`review_3` independent critic:

- Verdict: `proposal_ready_with_caveats`.
- Required action: `none`.
- Base assessment: base is witness/application-lite and must not be inflated.
- Meta assessment: meta has a different d6+/restart route-opening chain, but
  payoff strength is medium because d6+ length is 1 and d4 is not required.
- Cross-time reuse assessment: valid revisit reuse, not a separate pasted-on
  side puzzle, but base-time foreshadow is limited.
- Route assessment: hard reject not triggered; C/D -> A/B remains a route bleed
  caveat.

Human correction:

- Verdict: no archive value.
- Reason: the designer and critic treated a functional 0020-like ecological
  niche as if it established an acceptable proposal threshold. That is wrong.
  `ICE_CAND_0020` calibrates against overclaiming simple base/meta flows; it is
  not an acceptable lower bound for archiving.

## Critic Attacks And Designer Actions

Attacks:

- Base is shallow and should not be framed as a strong application.
- Meta d6+ length 1 may be visually thin.
- Base-time route lacks strong hidden foreshadow compared with stronger meta
  archive examples.
- C/D -> A/B weakens interface discipline.
- d4 must not be used in the central claim.

Designer actions:

- Narrowed base claim to application-lite.
- Narrowed meta claim to d6+/restart plus left relation reuse.
- Recorded C/D -> A/B as a caveat.
- After human correction, changed terminal state from
  `proposal_ready_with_caveats` to `rejected_candidate`.