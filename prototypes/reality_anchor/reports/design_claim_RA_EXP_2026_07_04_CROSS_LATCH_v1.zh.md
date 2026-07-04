# Design Claim: RA_EXP_2026_07_04_CROSS_LATCH_v1

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_CROSS_LATCH_v1
family: cross_latch
source_claim: prototypes/reality_anchor/reports/fresh_design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v0.zh.md
archive_lineage_policy: fresh_required
role: challenge
allowed_exposure_through: all_current_reality_anchor_runtime_rules
score_policy: unscored_missing_negative_human_archive_context
```

## Layout

```text
#########
#.MSB@P.#
#MGMC.L.#
#..G#..C#
#########
```

## Player Insight

这是一个较短的 cross latch：P/L 不是末端得分块，而是第一步把右侧竖直锚点推开，改变玩家与右侧箱子的 pull 窗口。玩家随后把右侧箱子压入下方通道，再把左侧黏性材料拉过 B/S 的材料边界，形成可回收的 crate。中段 B/S 左推时，材料与锚点同场换位，触发 `move_sticky_rigid` 与 `sticky_merge`；最后 B/S 下拉完成左下目标覆盖。

玩家视角的矛盾点是：左侧两个目标一开始看似由附近的 M/箱解决，但真正的钥匙在右侧 P/L 先打开的 pull 通道里。回程时需要把“被改性的材料”和 B/S 锚点共同消费，而不是把某个目标简单推满。

## Causal Chain

1. `push_object:push_pull_anchor` + `anchor_boundary_shift:push_pull` 把 P/L 移到右侧，为右侧 pull 操作和回程站位打开空间。
2. 右侧 crate 被 pull / push 到下方走廊，使玩家能回到左侧材料区。
3. 左侧 sticky 被 pull 成 `sticky_to_box`，把原本刚性材料转成可作为目标覆盖链的一部分。
4. B/S 左推触发 `anchor_boundary_shift:box_sticky`，并与刚才的材料状态共同触发 `move_sticky_rigid` 与 `sticky_merge`。
5. 玩家回到左侧，拉动 crate 覆盖上方目标；最后下拉 B/S，把锚点/材料结构收束到下方目标。

## Evidence-Supported Required Events

本候选提交时只声明事件组级必要性，不声明对象身份或唯一输入序列：

- `anchor_boundary_shift:push_pull`
- `anchor_boundary_shift:box_sticky`
- `pull_object`
- `box_to_sticky | sticky_to_box`
- `sticky_merge`
- `move_sticky_rigid`

## Non-Claims / Caveats

- 不声明唯一解，只声明完整图中所有胜路都包含六个事件组。
- 不声明每个目标由同一对象身份覆盖。
- P/L 的角色是开局 latch 和通道重定位，不声明 P/L 在中后段重复参与。
- 路线中有若干必要走位，目标是较低难度候选；是否仍有足够玩家侧读法交给 critic 攻击。

