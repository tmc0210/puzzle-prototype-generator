# Designer Action: round50 v34 review 1

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor
review_loop_state: revise_required
designer_decision: hold_not_submit
reason: "evidence supports the gates, but puzzle critic does not support aesthetic floor 4 or robust difficulty target."
next_action: "structural_revision"
```

## Review Inputs

- Evidence review: `prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor_review_1.md`
- Puzzle critic: `prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor_review_1.md`

## Decision

Do not submit v34 as the qualified candidate.

The evidence reviewer supports the packet with caveats: layout, interface facts,
base strict gate, and meta required gate all match local evidence. However, the
puzzle critic holds the candidate for revision:

- v34 improves on v21 because the meta route must create and repay a C-side
  target debt.
- It still reads too much like a right-side attached module rather than a
  shared-structure reinterpretation comparable to ICE_CAND_0034.
- The critic does not support aesthetic floor 4.
- Difficulty is only marginal: base about 2+ / low 3-, meta about 2+.

## Design Boundary Learned

v8 remains the strongest aesthetic skeleton, but its shared left-target
projectile creates a strict-exposure contradiction: base can manufacture the
same firing state that meta needs. Local wall bands can clean base only by
killing meta.

v34 solves the strict-exposure contradiction by moving the meta projectile and
refill corridor to a C-only object family. That makes the evidence clean, but
also loses too much shared-structure payoff.

The next candidate should not add another C-only key. It should make the
meta-only debt corridor alter or depend on the main target room, so the C-side
debt is not merely adjacent to the base debt chain.
