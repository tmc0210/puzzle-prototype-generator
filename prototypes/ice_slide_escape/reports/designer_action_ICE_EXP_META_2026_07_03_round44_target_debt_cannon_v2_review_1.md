# Designer Action: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2 review_1

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2
review_iteration: review_1
status_after_review: held_for_structural_revision
submit_current_version: false
```

## Review Results

Evidence review:

- Verdict: `not_fully_supported`.
- Supported: layout, costs, returned events, complete graphs, interface scan,
  base required d3/d4, meta required d6/d3/d4.
- Blocking issue: packet claimed base exposure `through_ice_rebound_d4`, but
  complete base reachable scan includes `ice_boundary_disappear:d5` and
  `ice_boundary_disappear:d1`. The narrower "no pass-through d5/restart/d6" gate
  passes, but the packet wording is too strong.

Puzzle critic:

- Verdict: `does_not_support_aesthetic_4`.
- Supported: base difficulty around low 3; meta at least 2+; no direct
  round39/0037 L-ladder repeat.
- Blocking issue: B=D same bottom exit and the long right-side d6 runway make
  the meta feel like an external attachment rather than a strong
  reinterpretation of the target-debt chamber.

## Designer Decision

Do not submit v2. Treat it as a useful base material:

- The base two-target debt chain is worth preserving.
- The meta needs a different exit or a stronger reason for same-exit reuse.
- The d6 action should be internalized into the shared chamber, or at least
  make multiple later conditions change at once.
- A revised candidate must either eliminate boundary-disappear reachability in
  base or state a correct exposure window without overclaiming.

## Next Revision Target

Use the same debt-chain grammar, but revise the meta so that:

- d6 opens or rewires a different edge goal rather than simply feeding the same
  bottom exit;
- the late action changes the target debt/refill relationship, not just the
  access corridor;
- base remains free of pass-through d5, restart, and d6; ideally also free of
  boundary-disappear if the final packet claims a d4-only window.
