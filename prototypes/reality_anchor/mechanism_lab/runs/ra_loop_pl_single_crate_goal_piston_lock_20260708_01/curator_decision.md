# Curator Decision

## 决策

`supplement`

并入 `P/L 边界交接：推入、跨侧与抽取分配`，挂在 `边界活塞本体谱` 下，标题为 `单箱目标活塞顺序锁：推入覆盖与回撤撤销`。

## 理由

该结构不需要新顶层：active rule 仍是 P/L 边界交接中的 `push -> pull` 单箱活塞。但它补上了单箱活塞的一个最小 consumer：伸出位是目标时，单箱不再只是退化往复，而是产生会被回撤撤销的临时目标覆盖。

## 已支撑

- `corridor_goal_last_action`：推入目标作为最后动作成立，`final.isWin=true`。
- `corridor_goal_then_forced_retract`：继续回撤会拉出 crate，`final.isWin=false`。
- `open_side_exit_preserves_goal`：有侧向出口时不构成锁。
- `corridor_goal_offset_no_temp_cover`：目标偏离伸出位时没有临时覆盖。

## 结论收窄

- 只写局部顺序锁材料，不写完整多目标关卡结论。
- 不写全局不可回返。
- 不扩展到箱链或 sticky 本体。
- 不新增 backlog；后续若要做多目标 recipe，是组合应用而不是普通补变体。

## 正式入口更新

- `lexicon.md`：在 `P/L 边界交接` 的活塞本体谱下新增完整 supplement 小节。
- `lexicon_index.md`：更新 `P/L 边界交接` 的输出接口与主要接法，标明单箱目标顺序锁已收纳。
- `backlog.md`：不更新。

