# Claim Packet: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour review_3

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour
packet_type: claim_packet
review_iteration_target: review_3
claim_last_review: true
```

## Design Target

```yaml
aesthetic_score_target: "4 floor, not claiming 5"
difficulty_score_target:
  base: "2"
  meta: "3"
target_role_notes:
  - "meta_first_design paired candidate"
  - "base should stay early-readable"
  - "meta may use full ice_slide_escape knowledge"
```

## Design Claim

```yaml
player_insight: >
  Meta 不是右侧局部钥匙：玩家必须把右侧目标债和主通道目标债串起来读。
  x10 封口与 x8/x9 绕道使 [9,5] 从 base 中的普通目标/阻挡关系，变成
  C->D 的必经主门。
causal_chain:
  base:
    - "A->B: [5,5] 目标冰被 d3 消耗。"
    - "玩家绕到下方，用下层资源 d2 回填 [5,5]。"
    - "所有目标恢复后到 B。"
  meta:
    - "C->D: [21,5] 目标冰左推，d6+ 摧毁两墙并 restart，随后 d3 撞毁于 [9,5]。"
    - "用下方冰 d2 回填 [21,5]，偿还右目标债。"
    - "x10 下行被封，未移开 [9,5] 无法进入终点下层。"
    - "左推 [9,5] 产生主目标债，再用 [9,7] d2 回填，最后到 D。"
why_not_execution: >
  v36/v37 的右侧自足路线已被整列边界和中心错位切断；meta 不能只在右侧开门
  并补本地债后走回旧出口。对象债务探针显示 [21,5] 和 [9,5] 都必须空过。
falsification:
  - "若存在 C->D 胜利路径且 [9,5] 全程不空，则主结构重写 claim 失败。"
  - "若存在 C->D 胜利路径且 [21,5] 全程不空，则右目标债 claim 失败。"
  - "若 base 完整可达扫描命中 d5 pass/restart/d6，则 base 早知识窗口 claim 失败。"
```

## Meta-Reinterpretation Claim

```yaml
meta_design_mode: meta_first_design
base_instance:
  start: [0, 5]
  goal: [11, 10]
  causal_chain: "借出 [5,5] 目标冰 -> d3 消耗 -> 下层 d2 回填 -> 到 B。"
  intended_difficulty_score: 2
meta_instance:
  start: [23, 4]
  goal: [11, 10]
  causal_chain: "借出 [21,5] 开墙并撞毁 -> d2 回填 [21,5] -> 借出 [9,5] 打开主门 -> d2 回填 [9,5] -> 到 D。"
  intended_difficulty_score: 3
shared_structure:
  - "[9,5] 主目标：base 中是普通目标/通道关系，meta 中成为必须借出的主门。"
  - "下层 [8,7]/[9,7]/[9,8] 区域：base 用于回填，meta 用于主目标债偿还。"
  - "B/D [11,10] 共享底部出口：中性收束。"
chain_delta_from_base: "Meta 增加右目标 d6+ opener，并通过中心错位强制主目标 [9,5] 参与；不是复刻 base 的单目标借还。"
cross_visit_payoff: "base 里普通的目标/下层回填关系，在 meta 中因 x10 封口和右侧 opener 被重读为主门债。"
classification_claim: meaningful_reinterpretation
```
