# Design Claim: RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1
candidate_family: fixed_anchor_transitions
fixed_anchor: push_pull
movable_anchor: box_sticky
role: challenge
intended_campaign_position: mid_game_transition
archive_lineage_policy: fresh_required
score_claim_allowed: false
```

## Player Insight

固定 P/L 在顶部墙腔中不移动，提供稳定的 push/pull 分区。玩家开局两次推 B/S，把材料边界右移并立刻触发 `sticky_to_box`；随后推 crate 覆盖左目标，最后走到右侧 pull 区，利用固定 P/L 的 pull 背景拉下 sticky 覆盖右目标。

## Hard Claim Boundary

- 全胜路层面只声明：B/S shift、pull_event、material normalization 必经；固定 P/L shift 在完整可达扫描中不出现。
- 返回解层面展示：step 1/2 B/S 两次右移，step 4 crate 覆盖左目标，step 9 fixed pull side 拉 sticky 覆盖右目标。
- 不声明唯一路线、对象实例必要性、逐目标覆盖身份在所有胜路固定，或所有胜路固定事件顺序。

## Why This Fits The Brief

这是三份候选中更短的一份：9 步，固定 P/L 教会“另一侧可以 pull”，可动 B/S 只需两次平移。它强调固定锚点作为规则背景的存在感，同时把实际操作集中在一个移动锚点上。

## Falsification

- 可达扫描发现 `anchor_boundary_shift:push_pull`。
- 存在不触发 B/S shift、pull_event 或 material normalization 的胜路。
- critic 认为开局 B/S 两推只是局部执行，没有玩家侧转相读法。

