# Design Claim: RA_EXP_2026_07_04_COMPACT_CHAIN_v1

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_COMPACT_CHAIN_v1
candidate_family: compact_dual_material_chain
archive_lineage_policy: fresh_required
role: challenge
support: none
allowed_exposure_through: all_current_reality_anchor_runtime_rules
score_claim_allowed: false
target_positioning: lower_burden_late_game_candidate
```

## Claim Revision From Family Seed

探索 claim `COMPACT_DUAL_MATERIAL_CHAIN_v0` 原本希望最好出现“改性材料直接覆盖目标”的 payoff。当前候选证据不支持这个更强说法，因此本候选不提交该 claim。

`COMPACT_CHAIN_v1` 的正式 claim 是：目标最终由两个不同锚点分别收束覆盖，材料链负责制造必要通路和状态债务。B/S 不是单纯终点箱子，而是先触发 crate -> sticky、sticky 刚体移动、B/S 位移，再占住左上目标；P/L 不是全局互锁主角，而是终局必须被 pull 下来的收束锚。

## Player Insight

玩家需要读出一个紧凑的双锚材料门：

- 下方 crate 必须先跨过 B/S 规则边界，被归一化为 sticky。
- 这个 sticky 不是装饰物；它必须被继续当作刚体移动，并在后段触发 sticky_merge。
- B/S 要先从中线移到左上，既改变材料边界，也最终覆盖左上目标。
- P/L 保持在上通道，直到材料链整理完后，由 pull 机制下拉，覆盖中线目标。
- 因此本题的核心不是长距离规划，而是识别“材料转换先开路，两个锚点再分别结账”的顺序债务。

## Causal Chain

1. 玩家从下方推动 crate，触发 `box_to_sticky`，得到可继续作为 sticky 刚体处理的材料。
2. 玩家继续右推 sticky，使其让出 B/S 左移和上移所需空间，同时保留后段 sticky_merge 的对象。
3. 玩家推动 B/S 左移并上移到左上目标位，完成 `anchor_boundary_shift:box_sticky`，并把材料边界稳定到后段结构。
4. 玩家走到右下，将 sticky 继续右推，与右侧 sticky 接触，触发 `sticky_merge`。
5. sticky 合并后，玩家进入 P/L 的 pull 侧，把 P/L 下拉到中线目标位，触发 `pull_object` 和 `anchor_boundary_shift:push_pull`，完成胜利。

## Why Not Pure Execution

返回解只有 17 步，但不是只沿最近可推物体线性执行：

- 完整 probe 显示六个核心事件组在所有胜路中均不可绕过。
- SCC path 有 7 个不可逆进展节点，但 scripted handoff 只有 2/7；中后段有可重定位空间和多个可行承诺。
- 开局前 3 个 viable/optimal commitment 偏强制，这是本轮“难度稍低”的取向；中段 B/S 上移和右侧 sticky_merge 前后承担主要读法。

## Required Winning-Path Events

```yaml
required_winning_path_events:
  - anchor_boundary_shift:push_pull
  - anchor_boundary_shift:box_sticky
  - pull_object
  - box_to_sticky or sticky_to_box
  - sticky_merge
  - move_sticky_rigid
forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []
```

## Falsification

该 claim 会被下列事实击穿：

- 存在不移动 P/L 或不移动 B/S 的胜路。
- 存在没有 material normalization、sticky_merge 或 sticky rigid movement 的胜路。
- critic 认为 P/L 只是在已解完后的机械按钮，无法形成有效收束张力。
- critic 认为材料链只是事件库存，而玩家不需要理解其顺序债务。
- 发现该结构继承 clean archive 候选的布局骨架、对象角色或主要因果链。

## Evidence To Route

- `layout_analysis_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md/json`
- `event_probe_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md/json`
- `trace_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md/json`

