# Revised Design Claim: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2

## 变更原因

v1 原布局虽然最优解包含 B/S 位移、box_to_sticky、sticky_merge 与 sticky rigid movement，但初始普通箱替代和 post-merge 普通箱替代都可解，违反本轮硬门槛。v2 不沿用 v1 的开放右侧/下侧通道，而改为封住右目标的独立施力面。

## 本轮目标

- role: mid_game_fixed_anchor_transition
- 机制范围：固定 P/L 决定上层 push / 下层 pull；可移动 B/S 只负责材料边界。
- 难度目标：中期过渡，短解、低执行量，但结构必须能说明“黏性二连块不可替换为两个普通箱”。
- 审美目标：不做分数声称；只追求紧凑、因果清楚、无多余开放通路。
- archive_lineage_policy: fresh_required。本轮只使用 clean archive 人评作为审美/失败模式校准，不复用旧候选布局或解法骨架。

## Player Insight

玩家需要先意识到右目标没有自己的推/拉施力面：普通箱即使能落在左目标，也不能独立进入右目标。唯一办法是先借 B/S 位移扩大 sticky side，再把 C 拉进 sticky side 与 M 合并成横向二连块，最后从左把手格推动整块下落，右半块被黏性刚体携带覆盖右目标。

## Causal Chain

1. 固定 P/L 被墙隔离但全局生效：上层允许 push，下层允许 pull。
2. 玩家在上层推动 B/S 一格，令 x=5 成为 sticky side，打开 C 变黏的材料窗口。
3. 玩家从上层把左 M 推到左目标，再在下层把 C 拉进 x=5，触发 `box_to_sticky`。
4. 玩家利用 pull-side 把左 M 拉回上方，与新 M 水平相邻并 `sticky_merge`。
5. 末段只从左把手推动横向 sticky rigid body 下落；右目标因为上/右/下施力面封死，普通箱替代不能完成。

## Required Events

- `anchor_boundary_shift:box_sticky`
- `pull_object`
- `box_to_sticky`
- `sticky_merge`
- `move_sticky_rigid`

## Forbidden / Negative Evidence

- `anchor_boundary_shift:push_pull` 在完整可达图中出现：reject，固定 P/L 必须不可移动。
- 存在缺少任一 required event group 的胜路：reject。
- 初始普通箱替代可解：reject。
- post-merge 普通箱替代可解：reject。
- 若普通箱替代只是因为 B/S 移除后打开额外上方空间而可解，也 reject；v2 应通过墙形阻断这种额外施力面。

## 工具要回答的问题

- 原布局是否可解，并给出关键 snapshots。
- 固定 P/L 是否完整扫描无移动事件。
- 所有胜路是否都需要 B/S 位移、pull、box_to_sticky、sticky_merge、sticky rigid movement。
- 两个普通箱反事实是否在完整图搜索中无胜路。
