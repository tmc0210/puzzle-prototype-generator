# Designer Action: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour review_3

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour
review_iteration: review_3
decision: submit_as_qualified_candidate_with_caveats
review_integrity: independent_review
review_loop_state: proposal_ready_with_caveats
archive_eligibility: human_pending
evidence_review:
  file: prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_review_3.md
  verdict: supports_with_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
puzzle_critic:
  file: prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_review_3.md
  verdict: supports_with_noncore_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
  claim_last_used: true
prior_invalidated_reviews:
  - review_1: "free-prompt reviewer/critic; review_integrity missing"
  - review_2_puzzle_critic: "claim_last_review false; not accepted as final critic under current default"
```

## 结论

v38 现在按 repo-local `sokoban-design-review-loop` 标准重新通过：latest evidence reviewer 与 claim-last puzzle critic 均为 `proposal_ready_with_caveats`，且 `required_action: none`。

## 可提交口径

- Base A `[0,5]` -> B `[11,10]`：早期可读，难度约 2。完整可达扫描未命中 base forbidden 的 d5 pass / restart / d6。
- Meta C `[23,4]` -> D `[11,10]`：难度约 3。所有胜利路径需要 d6+、d3、d2 short-stop；对象债务探针支持 `[21,5]` 和 `[9,5]` 都必须空过。
- 审美：支持 4 分下界，但不支持 5。亮点是 `[9,5]` 从 base 普通目标/通道关系被 meta 重读为主门债；B/D 同格只作为中性收束。

## Caveats

- 不声明具体冰实例身份，只声明目标格债务必要性。
- 不声明所有胜利路径都经过某个精确 x8/x9 几何路线；该几何解释由返回 trace 与 `[9,5]` 目标债务间接支持。
- 不使用 B/D 同格作为 return-pressure 或 same-cell bonus。
