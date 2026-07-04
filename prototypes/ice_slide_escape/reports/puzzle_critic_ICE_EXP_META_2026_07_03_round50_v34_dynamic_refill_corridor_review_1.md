# Puzzle Critic Review: ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor

```yaml
reviewer_role: independent_puzzle_design_critic
review_language: zh
candidate_packet: prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor.zh.md
candidate_version_reviewed: ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor
verdict: hold_for_revision
review_loop_state: revise_required
required_action: structural_revision
aesthetic_floor_4: not_supported_as_floor
difficulty_gate: marginal_pass_with_caveat
aesthetic_band: "3+ / 4-"
difficulty_detail: "base 可记 2+ 到 low3-；meta 约 2+，不支持 meta 3。"
meta_first_read: "硬隔离已改善；玩家侧仍偏 C 侧钥匙模块。"
```

## 审查边界

本 review 只评价玩家侧审美、难度和 meta-first 质量。solver 的 complete graph、required-event pass、strict exposure pass 只说明候选可以进入审美审查；它们不自动证明 4 分、low3 或共享结构 payoff。

已读取材料包括候选包、base/meta analysis、base strict gate、meta required gate、B11/D10 interface checks，以及人评锚点 `ICE_CAND_0034`、`ICE_CAND_0035`、`ICE_CAND_0037`。另参考同族前案 v21 与 v8 的 critic 结论来校准“二步钥匙+走路”和“共享对象但 base 暴露”的边界。

## Anchor 校准

`ICE_CAND_0034` 是当前最相关的 4 分下界：它的 base 很低，但 meta 回访时有一个动作扰乱并重写下方共享结构，后段不是原样复刻。v34 要守住 4，必须证明右侧 corridor 不是单独附加钥匙，而是让 base 中已经被玩家理解的目标债务/补给结构获得新读法。

`ICE_CAND_0035` 只作为上界和同格接口边界使用。0035 的高分来自 return pressure 让旧出口自然变成回访入口，以及同一局部冰组在回访时改变角色；不是来自 B=C 或同格事实。v34 明确不声称 0035 式加分，这是正确的，但 B=D 同格仍会削弱接口读法，见下文。

`ICE_CAND_0037` 提醒：target debt、required events、完整图可解和接口方便性都不能替代洞见。v34 明显强于 0037 的重复 d4 target-door stitching，因为 base 的双债务链是紧的，meta 也至少制造并偿还了一个新 target debt；但它仍有“把一个小钥匙接到主路上”的风险。

## 结论摘要

我不支持把 v34 作为审美 4 floor 提交。它比 v21 有实质进步：C 侧第一推不再只是开墙，还会制造右侧 target debt；第二推的 d2 refill 是所有胜路都必须偿还的状态责任。因此“仍只是两步钥匙+走路”这个攻击不能按 v21 原样判死刑。

但这个修补还不够。玩家侧主要读法仍是：从 C 旁边强制推右侧 target ice，d6 打开墙并制造债，然后进右侧 latent corridor 推一块隐藏 refill 冰上去，还债后长距离走回旧 B/D。meta trace 只有 2 个不可逆 commitment，第一次在起点旁强制，第二次是局部还债；之后报告显示有 19 步 endgame tail。这个形状说明它有局部机制闭环，但还没有 0034 式“回访重写共享主结构”的清晰 payoff。

## Core Attacks

1. **v34 没有完全摆脱 C 侧钥匙模块感。**

v34 对 v21 的最好修正，是把“开墙 projectile”绑定到右侧 target debt：玩家不能只开门走人，必须用 latent refill corridor 把右 target 补回。这让 meta 从纯钥匙上升到“小钥匙 + 小债务闭环”。

问题是，这个债务闭环几乎完全发生在右侧新模块内。d6、右 target debt、右侧 refill 冰、d2 upward refill 都围绕 C 侧 corridor 自洽；它没有要求玩家重新消费 base 里的左/右上目标债务顺序，也没有重新安排下方主 refill room。结果是：比 v21 更好，但仍不像 0034 那样让原有结构被扰动后产生新解法。

2. **base 可支持 low3- 口径，但不是强 low3。**

base A->B 是当前候选最稳的部分：两枚上方 target ice 先后被 d3 消耗，随后用下方两枚冰分别 d2 short-stop 回填。返回解有 4 次 push，SCC path 有 4 个 irreversible progress steps，前两个 viable/optimal 前缀较强制，中段存在少量选择与死路。

这足以高于纯 2 分执行题，我愿意记为 `2+ / low3-`。但它仍不是结实的 low3：前两笔债务基本沿通道强制，后两次 refill 是对称还款，且首入 winning region 后仍有 9 步走路尾巴。按 0034 的难度校准，干净 target debt 不应自动抬难；若提交文本写“base low3”，建议写成边界值而非稳态值。

3. **B=D 同格不只是中性事实，它削弱 meta 接口读法。**

packet 没有把 B=D 当作 0035 式加分，这是对的。但从玩家体验看，D 与 B 完全同格会让 meta 的目标读法变窄：C->D 不像“旧结构通向一个新出口”，更像“从右侧外接入口开墙，修好本地 target，然后回到 base 的旧出口”。这不是硬接口错误；B->D cost 0 也可以记录为 neutral fact。但审美上，它会压低“接口被重读”的力度。

如果设计想借同格出口做美感，需要 0035 式 return-pressure wrapper 或等价语境，让旧出口在玩家心中自然改变意义。当前没有 wrapper，B=D 只能算方便收束，不能加分，并且会让右侧模块的外接感更明显。

4. **右侧 latent corridor 更像外接模块，不像共享结构 payoff。**

右侧 corridor 的优点是 base 完整可达图不能触及 d6/restart，这修复了 v8 的硬污染；同时 meta 的 corridor 是打开 d6 后才有意义，机制隔离比 v8 更干净。

代价是共享对象美感被明显削弱。v8 至少有“同一墙组 stopper/gate 互换、target debt 方向反转、左 target 冰成为 projectile”的强共享对象味道，只是被 base reachable d6 暴露污染。v34 通过把 projectile 与 refill corridor 移到 d6 墙外修复污染，但也把 payoff 移成了右侧外接小模块。它证明了“base 看不到 late mechanic”，但没有证明“meta 重新解释了 base 的主结构”。

## 难度与审美判定

```yaml
base_difficulty:
  score_band: "2+ / low3-"
  support: "双 target debt + 双 d2 refill，有 4 个不可逆步骤。"
  caveat: "债务顺序偏强制，对称 refill 偏练习题，不是稳 low3。"
meta_difficulty:
  score_band: "2+"
  support: "d6 开墙会制造 target debt，d2 refill 必须偿还。"
  caveat: "只有 2 个主要 commitment；第二个 commitment 后长尾走路，不支持 3。"
overall_difficulty_gate:
  result: marginal_pass_with_caveat
  reason: "若门槛只是 base 触及 low3 边界且 meta >=2，则勉强通过；若门槛要求至少一条稳 3，则不通过。"
aesthetic_floor_4:
  result: not_supported_as_floor
  reason: "右侧 corridor 是有效修补，但 payoff 仍偏外接；共享结构重读弱于 ICE_CAND_0034。"
```

## Required Action

建议 `revise_required / structural_revision`，不要按审美 4 floor 提交。

优先修改方向不是再堆 required events，而是让 meta 的右侧 debt 影响 base 主结构中的既有责任。可行目标包括：让 d6 projectile 直接改变上方双 target debt 的还款顺序；让右侧 latent refill corridor 释放或占用 base 下方 refill room 的一枚资源；或让 C->D 必须回到主结构中完成一次非对称再规划，而不是本地补债后走回 B/D。

如果保留 B=D 同格，需要把它降为中性接口收束；不要把它写成 return/old-exit payoff。若要让同格出口成为美感，需要另给周围地图的 return-pressure/fairness wrapper 证据。

当前诚实定位：硬隔离比 v8 好，meta 比 v21 更有状态责任，base 可以作为 low3 边界材料；但整体仍是 `3+ / 4-`，不够稳 4。
