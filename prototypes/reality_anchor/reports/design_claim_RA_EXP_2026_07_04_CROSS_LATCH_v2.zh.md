# Design Claim: RA_EXP_2026_07_04_CROSS_LATCH_v2

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_CROSS_LATCH_v2
family: cross_latch
source_claim: prototypes/reality_anchor/reports/fresh_design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v0.zh.md
revision_source: designer_action_RA_EXP_2026_07_04_CROSS_LATCH_v1_review_1.zh.md
archive_lineage_policy: fresh_required
role: challenge
allowed_exposure_through: all_current_reality_anchor_runtime_rules
score_policy: unscored_missing_negative_human_archive_context
```

## Layout

```text
#########
#..P.BS@#
#..LG#..#
#...#C..#
#C..GC.##
#########
```

## Player Insight

v2 是对 v1 的结构修订：P/L 不再只是一次性 opener。玩家先推动 B/S，制造左侧材料 merge；随后 B/S 的水平位移会把 P/L 一起带进左侧，形成一个位置债务。中段必须先利用这个被带走的 P/L / B/S 组合覆盖或打开上方目标区，再把 B/S 下拉、把 P/L 下拉，才能为底部 crate 的最后材料转换留出通道。

玩家要读到的是“双锚同车移动后必须分步偿还”：B/S 负责材料相位和横向搬运，P/L 负责被 force-chain 带走后的纵向/回拉债务。只做局部推箱会把锚点留在错误高度或错误侧，底部 crate 无法完成最终 `box_to_sticky` 收束。

## Causal Chain

1. 第 1 步推动 B/S，触发 `box_to_sticky` 与 `sticky_merge`，先把右侧 crate 变成可被移动的 sticky 材料。
2. 第 4 步拉动 sticky 刚体，把材料债务放到右侧下方，为后续目标覆盖准备。
3. 第 8-9 步继续推 B/S；force chain 把 P/L 一起横移，触发两类 `anchor_boundary_shift`，并改变上方目标区的锚点形态。
4. 第 13-14 步先拉 P/L/B/S 组合，再下拉 B/S，分离横向搬运后的双锚位置债务。
5. 第 16 步再下拉 P/L，打开底部横向 pull 通道。
6. 第 17-19 步拉底部 crate 到目标上并触发 `box_to_sticky`，完成最终收束。

## Evidence-Supported Required Events

本候选提交时只声明事件组级必要性，不声明对象身份或唯一输入序列：

- `anchor_boundary_shift:push_pull`
- `anchor_boundary_shift:box_sticky`
- `pull_object`
- `box_to_sticky | sticky_to_box`
- `sticky_merge`
- `move_sticky_rigid`

## Response To Review 1

- 修复 v1 的 opener-only 问题：P/L 在第 8、9、13、16 步都发生或参与 `anchor_boundary_shift:push_pull`，其中第 13 步还与 B/S force-chain 同步。
- 保留较低难度目标：路线仍是 19 步短链，不声明开放规划型高难。
- 保留 caveat：walk 为 9/19，SCC scripted=7/11，说明仍有短脚本块；这应交由 critic 判断是否可作为 lower-burden challenge 接受。

## Non-Claims / Caveats

- 不声明唯一解。
- 不声明具体对象身份或逐目标覆盖身份在所有胜路中必经。
- 不声明高难开放规划；本轮目标是较低负担 challenge 候选。
- 不把完整图或 event gate 当作审美证明。

