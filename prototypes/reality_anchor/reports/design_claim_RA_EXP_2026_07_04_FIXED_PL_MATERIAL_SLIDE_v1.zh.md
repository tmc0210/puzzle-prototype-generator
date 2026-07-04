# Design Claim: RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1
candidate_family: fixed_anchor_transitions
fixed_anchor: push_pull
movable_anchor: box_sticky
role: challenge
intended_campaign_position: mid_game_transition
archive_lineage_policy: fresh_required
score_claim_allowed: false
```

## Player Insight

固定 P/L 在顶部墙腔中不移动，但它让棋盘右侧/左侧形成稳定 push/pull 背景。返回解先在固定 push/pull 背景下把右侧 sticky 推入 B/S 的 box 区，触发 `sticky_to_box` 并覆盖右下目标；随后玩家进入左侧 pull 区，把 B/S 向左拉，使锚点本身覆盖左侧目标。

## Hard Claim Boundary

- 全胜路层面只声明：B/S shift、pull_event、material normalization 必经；固定 P/L shift 在完整可达扫描中不出现。
- 返回解层面展示：step 1 sticky_to_box 覆盖右下目标，step 12 pull B/S 左移覆盖左侧目标。
- 不声明唯一路线、对象实例必要性、逐目标覆盖身份在所有胜路固定，或所有胜路固定事件顺序。

## Why This Fits The Brief

这是“固定 push/pull 背景 + 可动材料锚”的中期关。固定 P/L 不移动，但 pull 侧动作必经；B/S 是唯一需要腾挪的锚点，移动量小，解长 12 步，适合在双锚互锁前让玩家看到两种锚点同屏合作。

## Falsification

- 可达扫描发现 `anchor_boundary_shift:push_pull`。
- 存在不触发 B/S shift、pull_event 或 material normalization 的胜路。
- critic 认为步 1 和步 12 之间只是走位，没有形成可读的短链 payoff。

