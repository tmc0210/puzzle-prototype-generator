# Design Claim: RA_EXP_2026_07_04_COMPACT_CHAIN_v1 / review_2

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_COMPACT_CHAIN_v1
candidate_family: compact_dual_material_chain
archive_lineage_policy: fresh_required
role: challenge
support: none
brief_context_allowed_knowledge: all_current_reality_anchor_runtime_rules
exposure_gate_claim: not_made
score_claim_allowed: false
target_positioning: lower_burden_late_game_candidate
layout_changed_since_review_1: false
claim_revision_reason: downgrade unsupported all-solution temporal order claim
```

## Claim Boundary

本 review_2 不声明所有胜路中的事件顺序、P/L 终局时序、唯一输入序列、对象实例必要性、逐目标覆盖身份固定，或改性材料直接覆盖目标。

硬证据层面的 claim 仅为：

- 同关有一个 P/L 和一个 B/S。
- 返回解展示材料转换、sticky 刚体移动、sticky_merge、B/S 位移、P/L pull / 位移。
- 完整 probe 支持所有胜路都必经六个事件组：P/L anchor shift、B/S anchor shift、pull、material normalization、sticky_merge、sticky rigid movement。

玩家侧设计 claim 为：

> 这是一个较低负担的紧凑双锚材料链。玩家在短路线中必须处理 B/S 材料边界和 P/L pull 收束两类锚点责任；B/S 承担主要材料整理和左上目标覆盖读法，P/L 承担较轻但不可绕过的 pull 收束读法。该 claim 是玩家侧 critic 对返回解、图形态和事件必经性的设计解释，不是由工具单独证明的硬事实。

## Returned-Trace Causal Reading

返回解展示的可读链条：

1. `step_2` 下方 crate 被推过 B/S 边界并归一化为 sticky。
2. `step_3` / `step_4` sticky 作为刚体继续右移。
3. `step_6` / `step_7` / `step_10` B/S 被推移，最后在返回解中覆盖左上目标。
4. `step_15` sticky 刚体右移并触发 sticky_merge。
5. `step_17` 玩家使用 pull 机制移动 P/L，在返回解中覆盖中线目标并胜利。

这些是 returned trace 的顺序读法，不声明为所有胜路固定顺序。

## Why Not Pure Execution

本候选的反执行性只提交较弱版本：

- 六个核心事件组在所有胜路中不可绕过，说明玩家不能只解决单一锚点或单一材料操作。
- SCC/agency 的 `scripted=2/7` 和 `branching_win_dag` 说明返回解并非图上全程单脚本；但这只作为反驳“完全线性脚本”的辅助事实，不单独证明高洞见。
- 开局和终局都较受约束，符合本轮“难度稍低”的候选目标；主要玩家责任集中在中段 B/S 材料整理和最终 P/L pull 收束之间的短链读法。

## Required Winning-Path Event Groups

```yaml
required_winning_path_event_groups:
  push_pull_anchor_shift: anchor_boundary_shift:push_pull
  box_sticky_anchor_shift: anchor_boundary_shift:box_sticky
  pull_event: pull_object
  material_normalization: box_to_sticky or sticky_to_box
  sticky_merge: sticky_merge
  sticky_rigid_move: move_sticky_rigid
forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []
```

## Falsification

该 review_2 claim 会被下列事实击穿：

- 任一核心事件组存在 winning bypass。
- 返回解实际不包含 packet 声明的 trace 事件。
- critic 认为 P/L 的轻量收束在 lower-burden brief 下仍不可接受。
- critic 认为 B/S 材料链只是事件库存，而玩家侧短链读法不足。
- 发现该结构继承 clean archive 候选的布局骨架、对象角色或主要因果链。

