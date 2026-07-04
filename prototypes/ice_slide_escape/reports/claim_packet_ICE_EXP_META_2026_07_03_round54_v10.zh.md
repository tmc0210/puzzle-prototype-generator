# Claim Packet: ICE_EXP_META_2026_07_03_round54_v10

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round54_v10_two_target_late_reseal
prototype: ice_slide_escape
claim_last_review: true
claim_only: true
```

## Design Claim

```yaml
player_insight: >
  玩家要读出同一对目标冰的角色交换。base 中 T2 只是 T1 的右侧 d4 障碍，
  T1 被移开又回封；meta 中，后期 d5/restart 先把一个底部产物放成 D 门资源，
  但这个资源不能直接消费，必须先把 T2 移离目标打开竖向通道。之后 d6 打开 D 门，
  又必须把 T2 回封才能获胜。

why_not_execution: >
  这不是重复“拿走目标冰再找最近冰补回”。只有两个目标冰；T1 在 base 中被借还，
  T2 在 meta 中同时承担目标债、通道门、T1/T2 互相阻挡和最终回封职责。
  meta 的 d5 产物不是一次性钥匙，因为玩家还需要通过 T2 空出的目标位才能接触它，
  且开 D 后仍需回到 T2 做 d4 回封。

causal_chain:
  base:
    - "A->B 从左侧进入；T1 位于 [4,6]，T2 位于 [9,6]。"
    - "T1 右推，借 T2 作 d4 障碍，离开 [4,6] 并打开通道。"
    - "玩家绕到 T1 右侧，再左推 T1 借左墙 d4 回到 [4,6]。"
    - "目标恢复后，从上方 B 离开。"
  meta:
    - "C 先下推 [10,1]，d5/restart 产物落到底部，成为稍后打开 D 门的资源。"
    - "玩家不能直接完成 D；必须先把 T2 左推，T2 借 T1/左侧结构 d4，空出 [9,6] 竖向通道。"
    - "经 [9,6] 通道到下方，从右侧推 d5 产物向左，d6 破坏 [1,10] D 门。"
    - "D 门已开但 T2 目标为空；玩家回到 T2 左侧，把 T2 右推 d4 回封到 [9,6]。"
    - "两个目标都重新覆盖后，走到 D。"

shared_structure:
  - "T1/T2 所在 row6 是 base 和 meta 的共同核心。"
  - "T2 在 base 中是 T1 的右障碍，在 meta 中是通道门和最终 target debt。"
  - "底部 row10 在 base 中不可达，在 meta 中通过 d5 产物与 T2 通道耦合。"

chain_delta_from_base: >
  base 是早期 d4 借还门；meta 是后期 d5 放置资源、T2 开通道、d6 开 D 门、
  T2 回封的状态债链。二者共享目标排和 T2，但消费顺序与对象职责不同。

base_time_masking: >
  base 完整可达扫描不能触发 d5/restart/d6；C 侧 projectile 和 D 门资源在 base
  时间被墙和接口隔开，只作为视觉上的潜伏结构。

design_target:
  aesthetic_score_target: 4_minimum_pursue_5
  difficulty_score_target: "base >=2, meta >=3; at least one flow >=3"
  base_allowed_exposure_through: ice_rebound_d4
  meta_allowed_exposure_through: all_known

falsification:
  - "若 base 完整可达能触发 d5/restart/d6，则 base 窗口失败。"
  - "若 C->D 存在缺少 d5/d6/restart/d4 任一事件的胜利路径，则 meta claim 失败或需降级。"
  - "若 A/B 可到 D 或 A/B/C/D 可到外部 edge goal，则接口失败。"
  - "若 critic 判断 T2 移动、D 门产物、T2 回封只是线性开锁且没有角色交换洞见，则审美不足。"
```

## Intended Difficulty Read

- Base: 2 左右。早期 d4 应用，结构紧凑但不追求高难。
- Meta: 3 到 4。四个 commitment：d5/restart 放置资源、T2 左推开通道、d6 开 D、T2 回封。
- Overall: 至少一条流程达到 3+，整体追求 4 分审美门槛。

## Designer Notes For Critic

- 不把“所有目标初始都有冰”当作审美加分理由；它只是本轮布局约束和事实。
- 关键审美主张是二目标角色交换与 d5/d6 产物被 T2 通道门消费。
- 请重点攻击它是否仍然像一个“base 小关 + meta 小关”拼接，或是否 row10 产物与 row6 目标门的耦合足够强。
