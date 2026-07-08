# Fresh Design Claim: RA_FRESH_2026_07_08_PL_BRUSH_DEBT_v0

candidate_version: RA_FRESH_2026_07_08_PL_BRUSH_DEBT_v0
prototype: reality_anchor
archive_lineage_policy: fresh_required
candidate_relation: fresh

## 设计目标

- role: challenge / application+
- aesthetic_score_target: 4
- difficulty_score_target: 3_or_higher
- allowed_exposure_through: all_current_reality_anchor_runtime_rules
- fresh boundary: 只使用 `prototypes/reality_anchor/mechanism_lab/lexicon.md` 的局部结构语料，不从旧候选、旧 reports 或旧 run 布局继续设计。

## 选用语料零件

- `P/L 边界交接`：P 侧把对象送到边界，L 侧 pull 只抽近端，留下残余债。
- `B/S 移动边界刷产物`：移动 B/S 边界跨过远处材料，生成 `CC`、`C+M` 或 `C+MM` 一类可被目标口消费的产物。
- `目标口 / 墙口消费`：目标不是顺路奖励，而是分别消费近端抽取、残余债和刷产物。

## 新增衔接逻辑

本候选不把上述零件简单串成三个小任务。目标是让第一个 P/L 抽取留下的残余对象成为 B/S 刷线的 blocker / handle，使玩家必须先制造残余债，才能让 B/S 边界刷出正确产物；刷产物再被两个不同目标口消费。错误顺序要么只有普通箱链推进，要么只看到材料转换事件但缺少可消费形状。

## Player Insight

玩家需要意识到同一组材料在 P/L 边界两侧的可分配性不同：P 侧先把链整体送入，L 侧只抽近端，从而故意留下一个残余债。这个残余债不是路线税，而是后续 B/S 边界刷子的停位/消费条件。完成刷线后，玩家还要把产生的可分离 crate 与 sticky tail 分别送入目标口，而不能把它们当成普通箱子一路推完。

## Causal Chain

1. P/L 边界交接制造近端抽取：P 侧 push/force-chain 打包对象，L 侧 pull 只抽近端。
2. 抽取后的残余对象改变 B/S anchor 或材料条的可达/可推状态，形成刷线前提。
3. B/S 边界移动跨过材料，产生可分离 crate 与 sticky tail 的组合产物。
4. 单格目标口消费 crate；另一个目标口或墙口消费 sticky tail / 残余债。
5. 任何少一步的胜路都应缺少至少一个核心事件组：pull_object、anchor_boundary_shift:box_sticky、box_to_sticky/sticky_to_box、move_sticky_rigid 或 force_chain。

## Why Not Mere Execution

- 如果只是执行最近 affordance，玩家会先把箱链当普通箱链推完，导致 B/S 刷线没有正确停位或只生成错误产物。
- 如果只移动 B/S anchor，玩家会得到材料转换事件，但目标口没有被正确消费。
- 如果只做 P/L 抽取，近端箱能移动，却无法同时满足刷产物与尾债目标。

## Required / Forbidden Evidence Questions

- returned winning trace 必须包含：pull_object、force_chain、anchor_boundary_shift:box_sticky、material normalization、sticky rigid movement。
- 所有胜路至少需要 P/L pull 或 P/L 边界交接的 pull 事件；所有胜路至少需要 B/S anchor shift。
- 删除任一目标不得产生缺少核心事件组的 winning bypass。
- 若完整图超预算，graph-dependent no-bypass claim 必须降级为 unknown。

## Falsification

- 若 solver 找到不移动 B/S anchor 的胜路，claim 失败。
- 若 solver 找到不使用 P/L pull / 边界抽取的胜路，claim 失败。
- 若目标删除后仍能以同等或更低成本绕过核心事件，目标职责失败。
- 若最终布局只是三个互不相干的小任务，critic 应按 stitched checklist 攻击并要求换 family。
