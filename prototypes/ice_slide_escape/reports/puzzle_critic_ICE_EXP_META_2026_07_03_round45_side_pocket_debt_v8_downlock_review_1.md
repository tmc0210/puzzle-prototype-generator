# Puzzle Critic Review: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock

```yaml
reviewer_role: independent_puzzle_design_critic
review_language: zh
candidate_packet: prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock.zh.md
verdict: hold_for_revision
aesthetic_floor_4: not_supported_as_floor
aesthetic_band: "3+ / 4-"
difficulty_gate: pass
difficulty_detail: "base 2+, meta 3 左右；不支持 meta 4"
meta_first: "intended route 成立，但玩家侧被 base reachable d6 暴露污染"
B_equals_C_value: "弱正向/条件成立；当前 packet 不能按 0035 加分"
required_action: "修复 base 可达 d6 暴露，或降格为带玩家侧污染 caveat 的 3+ 候选；若继续声称 B=C 价值，需要提供 return-pressure wrapper 证据。"
```

## 审查边界

本审查只评价玩家侧结构、审美、难度与 meta-first 读法。隐藏约束、归档硬条件、以及“所有目标初始有冰”不作为审美加分项；它们只作为证据或合规背景。

## 证据读取

- packet: `candidate_packet_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock.zh.md`
- base analysis: `layout_analysis_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base.md`
- meta analysis: `layout_analysis_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_meta.md`
- base winning gate: `start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base_winning_only.md`
- base reachable exposure gate: `start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base_required.md`
- meta required gate: `start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_meta_required.md`
- interface checks: `start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_interface_ABCD_goal_B.md`, `start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_interface_ABCD_goal_D.md`
- archive anchors: `ICE_CAND_0034.md`, `ICE_CAND_0035.md`, `ICE_CAND_0037.md`

我另行复跑了 packet 提到的 witness 脚本，A 起点到 B 目标的 base 图在深度 23 可触发 `ice_destroy_group_d6_plus:len2`，同时触发 `slide_restart_after_group` 与 `ice_boundary_disappear:d8`。该 witness 使用右侧 refill 冰作为临时开路器，并打开与 meta 同侧的右边界结构；它不是胜利路径，但不是纯统计噪音。

## Anchor 校准

`ICE_CAND_0034` 的 4 分来自 meta 回访时扰乱并重读下方结构，而不是简单复刻 base。当前候选确实有接近这一类的优点：base 中墙对是 stopper，meta 中同一墙对变成 d6 gate；base 中两个 target debt 依次清空再回填，meta 则反向制造右 target debt，并保留左 target 冰作为 projectile。

`ICE_CAND_0035` 的 5 分不是因为 B=C，而是因为周围地图的 return pressure 让旧出口自然变成回访入口。当前 packet 只证明 B 与 C 是同一物理格、C->B cost 0；没有证明外部地图会迫使玩家自然回访，也没有证明 B=C 在发现层面承担公平性。因此不能把 0035 的高分逻辑迁移到这里。

`ICE_CAND_0037` 是反例：重复 target-door stitching、接口外溢、没有 meta 洞见。当前候选明显强于 0037，因为它不是三段同质动作串接；它有 target debt 的方向互换和对象角色变化。但 0037 也提醒：solver 证明可解、required-event 过关、以及表层 target 覆盖，都不能替代玩家侧洞见。

## 玩家侧结构

Base A->B 的玩家读法比较清楚：两个上层 target 冰先后被 d3 消耗，随后从下方 room 用 short-stop 回填两个 target，最后从底边离开。它是一个紧凑的 target debt / refill 小结构，有可读性，也有少量选择空间。难度约 2+，不应声称 3。

Meta C->D 的较好处在于顺序和对象角色改变：右 target 冰先被向左消耗，左 target 冰保留为之后的横向 projectile；左侧下方冰经 d4 rebound 后暴露 firing face；左 target 冰再横向 d6 打开右边界；最后仍回到底部 refill room 修复两个 target。这比单纯复制 base 多一层“同一墙组和同一 target debt 被反向使用”的重读，meta 难度约 3。

弱点在于 lower refill room 的耦合仍偏工具化。base 和 meta 末段都回到“两次 short-stop 回填”，它服务于目标债链，但审美上没有像 0034 那样明显被 meta 扰乱成新局部；更多是同一补给室被再次使用。它支撑 3+，但不足以单独把整体托稳到 4。

## 问题回答

**整体审美是否能保底 4：不能。** 当前机制骨架接近低 4：target debt 方向反转、同一墙组 stopper/gate 互换、左 target 冰从覆盖物变成 projectile，这些都是正向结构。但 base reachable d6 暴露和 B=C wrapper 证据不足，使它不能作为“保底 4”提交。更稳妥的审美判断是 3+ / 4-；如果修掉 base d6 暴露，并补上自然回访语境，才可重新争取 4。

**难度是否 base/meta 均 >=2 且至少一个 >=3：是。** base 有 4 次关键 push，完整图 4393 states，胜利路径需要 d3 与 short-stop，玩家侧约 2+。meta 有 5 次关键 push，完整图 10854 states，所有胜利路径要求 d6、d3、short-stop，且有 d4 setup 与对象角色切换，约 3。meta 3+ to 4- 的上沿偏乐观；我不支持 4。

**B=C 是否有正向回访价值：当前证据下只有弱正向，不能按 0035 加分。** 同格回访确实让旧底边出口成为 meta 起点，并允许从同一 chamber 反向读 target debt；这是有潜力的。但 packet 没有周围地图 return pressure，也没有自然发现保障。按 0035 的人类 anchor，B=C 本身不是审美点；没有 wrapper 时它更像接口方便性，而不是强审美回访。

**base 非胜利 d6 暴露是否影响玩家侧/role fit：是，影响较大。** base 胜利路径不触发 d6，这个证据是干净的；但完整可达图会触发非胜利 d6，且 witness 是玩家可执行的局部误用，不是不可见 solver artifact。它把右 refill 冰从“回填资源”变成“开右边界资源”，提前暴露 meta 的 d6 gate 语言，并削弱“base 只教 debt/refill，meta 才重写墙组”的 role fit。若 brief 要求 meta-first 的玩家侧知识隔离，这是 blocking；若 brief 只要求胜利路径隔离，则仍应作为核心 caveat 降低审美和提交信心。

## Core Attacks

1. **meta-first 污染**：meta 的核心亮点是同一右墙组从 base stopper 变成 d6 gate；但 base reachable witness 已能用右 refill 冰触发同类 d6+ 开边界。即使不可胜，也会让玩家提前看到 meta 语言。

2. **B=C 证据不足**：当前只有同格接口，没有 0035 式 return pressure。不能把“旧出口成为新入口”的高分逻辑直接套用。

3. **末段 refill 偏机械**：base/meta 都以两次 short-stop 回填收束，耦合存在但新读法有限。它是紧凑，不是标杆级优雅。

4. **审美 4 不可保底**：结构优点足以超过 0037 反例，但没有达到 0034 那种干净、可提交的 4 分底线；当前更像有亮点但带核心 caveat 的 3+。

## Required Action

推荐 `revise_required / hold`。

必须先做二选一：修复 A 起点完整可达图中的 base d6 暴露，并重跑 base required / base winning-only / interface checks；或公开降格，不再以 clean meta-first aesthetic 4 候选提交。

若继续使用 B=C 作为卖点，需要提供外部 return-pressure wrapper 或等价发现保障；否则 B=C 只能作为中性接口事实，不作为审美加分。

在未完成上述动作前，不建议提交为审美保底 4。当前可接受的诚实定位是：难度门槛通过、meta 机制约 3、审美 3+ / 4-、玩家侧 role fit 仍需修复。
