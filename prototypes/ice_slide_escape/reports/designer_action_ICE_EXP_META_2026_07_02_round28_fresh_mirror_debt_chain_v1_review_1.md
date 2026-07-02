# Designer Action: ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1 Review 1

```yaml
candidate: ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1
evidence_review:
  file: evidence_review_ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_review_1.md
  verdict: supports_claim
  required_action: none
puzzle_critic:
  file: puzzle_critic_ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_review_1.md
  verdict: revise_required
  required_action: structural_revision
controller_decision: reject_as_submission
proposal_ready: false
```

## Accepted Facts

- All ice starts on targets; there is no extra ice.
- Base A->B and meta C->D are both solvable with complete graphs.
- Base and meta both require `ice_rebound_d4` on every winning path under complete search.
- The base window has no reachable d5 / restart / d6 / boundary-disappear-after-d4 exposure in the reviewer rerun.
- Edge interface facts are clean for target pairs and risky non-target pairs.

## Blocking Design Issue

The target-debt primitive is useful, but the candidate is structurally two isolated mirrored chains. It does not deliver enough meta-first reinterpretation: C->D is a mirrored copy of A->B rather than a late rereading of the same material. Nash estimated both flows around difficulty 3 and aesthetic below the required 4 floor.

## Next Structural Direction

Do not continue by polishing the mirror-chain family. Keep only the active target-debt/refill idea and design a new family where:

- base and meta interact with at least one shared target / shared stopper group / shared chamber, not parallel lanes;
- the shared material has different roles in A->B and C->D;
- interface isolation is solved by geometry or one-way state obligations, not by separating the two flows into disjoint rooms;
- at least one flow has a stronger nonlocal planning obligation than repeating the same borrow/refill module.
