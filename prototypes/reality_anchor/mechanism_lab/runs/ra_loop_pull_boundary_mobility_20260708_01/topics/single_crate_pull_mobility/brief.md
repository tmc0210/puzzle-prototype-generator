# Topic Brief: single_crate_pull_mobility

## Prototype

`reality_anchor`

## Topic

拉单个箱子的可动性。

## Seed Source

用户指定 topic 1。该 topic 是 pull 语义的基础谱，不要求证明 P/L 真边界；P/L 若出现，只作为创建 pull 侧的局部条件。

## Scope

比较单个 crate 在 pull 世界中的最小合法条件和回返性：

- 玩家前格为空 / 墙 / 物体。
- 玩家身后一格有 crate / 无 crate。
- crate 移动目标格为空 / 墙 / 被物体占用。
- 拉入单格口袋后能否回到初始。
- 同一局部结构中 push 回推是否能撤销 pull。

## Exclusions

- 不研究 P/L 边界本身。
- 不把全图 pull 的规则复述写成 lexicon 成果；必须通过近邻结构差异说明可用接口。
- 不读取 design archive、候选关卡、人类评价或 sampler profile。

## Source Boundary

可读：本 brief、round manifest、Reality Anchor README / runtime / mechanics、runner、lexicon index、backlog。

## Compare Checklist

- 至少 4 个 case，包含一个合法 pull 正例、一个前格阻塞反例、一个 crate 目标格阻塞反例、一个单格口袋 / 回返 probe。
- 记录最终动作表中 `up/down/left/right` 的 legal / illegal 差异。
- 回返只接受 `found` 或 `complete no`；`exhausted` 只能写 unknown。
- 写明 `active_rule=pull_force + player front cell requirement`，墙/口袋为 `consumer`。

## Run Intent

生成 `cases.yml`，运行 `mechanism-lab-run --write`，再写：

- `explorer_notes.md`：有效比较、无效规则复述、回返范围。
- `proposed_families.md`：若仅是基础语法，可建议 defer；若单格口袋消费形成可组合接口，可建议 supplement 到 P/L pull 抽取把手。
