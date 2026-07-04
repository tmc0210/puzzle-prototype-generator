# Design Claim: RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1
candidate_family: fixed_anchor_transitions
fixed_anchor: box_sticky
movable_anchor: push_pull
role: challenge
intended_campaign_position: mid_game_transition
archive_lineage_policy: fresh_required
score_claim_allowed: false
```

## Player Insight

固定 B/S 在顶部墙腔中不移动，但它把下方棋盘稳定分成 box/sticky 两侧。玩家先把右侧 sticky 放到可被收束的位置，再把 P/L 左推，使 L 覆盖左中目标并保留 pull 侧，最后从 pull 侧把 sticky 拉过固定 B/S 边界，触发 `sticky_to_box` 覆盖底部目标。

## Hard Claim Boundary

- 全胜路层面只声明：P/L shift、material normalization、pull_event 必经；固定 B/S shift 在完整可达扫描中不出现。
- 返回解层面展示：step 7 P/L 左移覆盖左中目标，step 11 pull sticky 并触发 `sticky_to_box` 获胜。
- 不声明唯一路线、对象实例必要性、逐目标覆盖身份在所有胜路固定，或所有胜路固定事件顺序。

## Why This Fits The Brief

这是中期过渡关：玩家同时看到 P/L 和 B/S，但 B/S 被墙固定。B/S 不需要腾挪，却不是装饰，因为固定材料边界的 `sticky_to_box` 在所有胜路中必经；玩家只需要实际移动一次 P/L，负担低于后期双锚互锁。

## Falsification

- 可达扫描发现 `anchor_boundary_shift:box_sticky`。
- 存在不触发 material normalization、pull_event 或 P/L shift 的胜路。
- critic 认为 P/L 左移和固定 B/S 的 final pull 只是机械按钮，没有过渡关价值。

