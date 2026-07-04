# ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour review_3 claim-last wrapper

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour
review_iteration_target: review_3
prototype: ice_slide_escape
status: review_candidate
claim_last_review:
  mode: sequential_single_call
  facts_packet: prototypes/ice_slide_escape/reports/facts_packet_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_review3.zh.md
  claim_packet: prototypes/ice_slide_escape/reports/claim_packet_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_review3.zh.md
  read_order: facts_then_claim
evidence_reviewer_packet: prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_review2_standard.zh.md
```

## Reviewer Routing

Evidence reviewer may use the standard review_2 packet because evidence claims
and layout have not changed.

Puzzle critic must use claim-last routing:

1. Read the facts packet and complete `initial_review` from facts/evidence/archive context.
2. Then read the claim packet.
3. Fill `claim_followup`.
4. Top-level final fields must match `claim_followup.final_*`.

Prior critic artifacts:

```yaml
review_1: invalid_free_prompt_review_integrity_missing
review_2_puzzle_critic: invalid_for_final_closure_claim_last_false
```
