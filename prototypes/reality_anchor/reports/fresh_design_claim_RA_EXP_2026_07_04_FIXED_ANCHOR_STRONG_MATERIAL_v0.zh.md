# Fresh Design Claim: RA_EXP_2026_07_04_FIXED_ANCHOR_STRONG_MATERIAL_v0

```yaml
prototype: reality_anchor
candidate_family: fixed_anchor_strong_material
archive_lineage_policy: fresh_required
target_count: 2-3
role: challenge
intended_campaign_position: mid_game_transition
score_claim_allowed: false
revision_reason: user clarified material conversion must be functionally consumed
```

## User Constraint

材料转换本身不算有效使用。候选必须展示转换后的箱/黏差异被继续消费：

- crate 变 sticky 后与另一 sticky 合并，随后以合并刚体被移动、拉动或覆盖多个关键格。
- sticky 变 crate 或 split 后，因为不再刚体连接而可以独立调整结构。
- 材料转换导致某条路径不可行或某个通道/把手发生实际变化。

只在胜利步 `sticky_to_box` / `box_to_sticky` 后直接覆盖目标，或转换后没有以新材料身份产生后果，视为失败。

## Target Families

### Fixed B/S + Movable P/L

固定 B/S 提供稳定材料边界。优先寻找 `box_to_sticky -> sticky_merge -> move_sticky_rigid` 链；P/L 只需一次移动或一次 pull/push 重定位，作为中期过渡。

### Fixed P/L + Movable B/S

固定 P/L 提供稳定 push/pull 背景。B/S 移动触发材料变化；转换后的 sticky 必须合并或刚体移动，或者转换后的 crate 必须因拆散刚体而可被独立处理。

## Required Evidence If Submitted

- 固定锚点对应 shift 在完整可达扫描中不出现。
- 移动锚点 shift 在所有胜路中必经。
- 固定锚点规则效果在所有胜路中必经。
- 强材料事件组优先为 all-solution 必经：`box_to_sticky`、`sticky_merge`、`move_sticky_rigid`。
- 返回 trace 明确展示材料转换后的材料差异被继续消费，而不是转换后立刻胜利。
- 不声明唯一路线、对象实例级必要性或全胜路固定顺序。

## Falsification

- critic 认为材料转换只是事件标签。
- 转换发生在最后一步且没有后续消费。
- 固定锚点只是墙腔装饰，没有影响可行动作类型、材料边界或后续结构。

