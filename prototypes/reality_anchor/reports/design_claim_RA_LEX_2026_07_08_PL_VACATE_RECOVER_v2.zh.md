# Design Claim: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2

```yaml
candidate_version: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2
prototype: reality_anchor
status: evidence_ready_for_review_2
revises: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1
revision_reason: >
  v1 被 puzzle critic 打回为 clean 2：两个目标只是各自消费一个端点 pull，缺少共享状态债。
  v2 改成下目标先覆盖、再腾空、最后由另一状态角色回填。
```

## Layout

```text
#########
##PL#..##
###..G.##
#.@CCG..#
#########
```

## Claim

固定 P/L 边界仍是主语。第一步在 push 侧把两箱链推过边界；右箱先覆盖下目标，但这不是终点，因为上目标仍空。玩家必须从 pull 侧把这个已覆盖下目标的箱子上拉到上目标，主动腾空下目标并打开右侧回路；最后再把剩余箱子横向拉入刚被腾空的下目标。

这版的核心是目标职责重读：下目标不是简单终点，而是一个必须经历 `covered -> uncovered -> covered` 的状态债。

## Lexicon Sources Used

- `P/L 边界交接：P 侧推链 -> 跨 P/L -> L 侧抽近端 -> 下方口袋打开`：先用 P 侧整链推送，再在 L 侧抽取链端。
- `P/L pull 抽取把手：前格门、footprint 门与扫带`：两次 pull 分别消费玩家前格和对象目标格；上拉后用侧路回到下目标 stance。
- `P/L 横向把手门 / footprint 门`：用于收紧 P/L 锚点仓，确保本体不移动。
- RA_CAND_0011 的人类口味校准：使用“先覆盖、再撤出、再回填”的状态责任，但不复制其布局或锚点移动结构。
- 设计时阅读了 `prototypes/reality_anchor/mechanism_lab/lexicon.md`，没有读取同目录 `mechanism_lab/runs`。

## Evidence Claim Boundary

- 主张所有胜路需要 `push_object`、`force_chain`、`pull_object`，且至少两次 `pull_object`。
- 主张下目标 `[5,3]` 所有胜路都必须经历 `covered -> uncovered -> covered`。
- 主张 P/L 锚点在完整可达图中不移动，`anchor_boundary_shift:push_pull` 无 reachable hit。
- 不主张 crate#1/crate#2 实例身份；事件标签只作为 returned trace 标签。
- 不主张唯一输入序列；不把 complete graph / forced prefix 写成审美证据。
