# Explorer Notes: pl_boundary_single_crate

运行命令成功：

```text
npx tsx src/cli.ts mechanism-lab-run prototypes/reality_anchor prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pull_boundary_mobility_20260708_01/topics/pl_boundary_single_crate/cases.yml --run-id ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_single_crate --out-dir prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pull_boundary_mobility_20260708_01/topics/pl_boundary_single_crate --write
```

生成时间：`results.json` 记录为 `2026-07-08T03:52:49.084Z`。

## 总体判定

四个 case 都通过 true boundary gate。共同结构是水平 `P L` anchor，边界在 `x=4|5` 之间；脚本 witness 中玩家至少一次实际跨过该边界，并且跨线两侧都有同一 crate 的有效动作或明确门控动作。关键 active_rule 是 `P/L forceModeAt changes player action semantics`；墙、目标口袋、站位和前格空性是 consumer。局部可达图里出现的 `push_object:push_pull_anchor` / `pull_object:push_pull_anchor` 属于探索旁支；脚本 witness 本身没有移动 P/L anchor，不作为本 topic 结论。

`returnToInitial.status=exhausted` 在 plb_01 和 plb_04 中只记为未知，不能当成不可回返证明。

## 逐 case true boundary gate

### plb_01_push_cross_pull_success

- 通过 true boundary gate：是。
- 跨侧步数：第 3 步 `right`，玩家从 `x=4` 的 P 侧走到 `x=5` 的 L 侧。
- 两侧 crate 相关动作：第 1 步在 P 侧 `right` 推 crate，事件 `push_object:crate#1`；第 6 步在 L 侧 `right` 拉同一 crate，事件 `pull_object:crate#1`。
- crate 边界邻域：初始在 `x=4`，第 1 步后到 `x=5`，均贴着 P/L 边界。
- 关键差异：P 侧把相邻前方对象作为 push 目标；跨到 L 侧后，同一空间关系被换成“前格空、身后相邻对象”的 pull 语义。不是全图 push 或全图 pull。
- 结果观察：最终 crate 到 `x=6`，玩家到 `x=7`；最终动作表中 `left` 因 `pull_world_front_blocked` 非法，说明 L 侧前格门仍在消费后续动作。

### plb_02_push_cross_pull_front_wall

- 通过 true boundary gate：是。
- 跨侧步数：第 3 步 `right`，玩家从 P 侧进入 L 侧。
- 两侧 crate 相关动作 / 门控：第 1 步 P 侧 `right` 推 crate 成功，事件 `push_object:crate#1`；第 6 步 L 侧尝试 `right` 拉同一 crate，但玩家前格是墙，结果 `destination_blocked`。
- crate 边界邻域：第 1 步后 crate 在 `x=5`，保持在 L 侧边界相邻格。
- 关键差异：与 plb_01 只有 L 侧前格 consumer 不同；P 侧 handoff 相同，但 L 侧 pull 必须先满足前格空。
- 结果观察：回返搜索因非法脚本步标为 not applicable；局部可达图 complete，1275 states。

### plb_03_l_pull_then_p_push_wall

- 通过 true boundary gate：是。
- 跨侧步数：第 2 步 `left`，玩家从 `x=5` 的 L 侧走到 `x=4` 的 P 侧。
- 两侧 crate 相关动作 / 门控：第 1 步在 L 侧 `down` 拉 crate 成功，事件 `pull_object:crate#1`；第 4 步在 P 侧 `right` 尝试推同一 crate，被 `force_blocked`。
- crate 边界邻域：crate 初始和最终都在 `x=5` 的 L 侧边界相邻列，且第 1 步被 L 侧 pull 从 `(5,3)` 移到 `(5,4)`。
- 关键差异：L 侧动作把“身后 crate + 前格空”解释为 pull；跨回 P 侧后，相邻前方 crate 变成 push 目标，并被右侧墙消费为 `force_blocked`。
- 结果观察：这是“L 可拉、P 回推/释放失败”的最小 witness；不依赖目标或锚点位移。

### plb_04_goal_pocket_shortcut

- 通过 true boundary gate：是。
- 跨侧步数：第 3 步 `right`，玩家从 P 侧进入 L 侧。
- 两侧 crate 相关动作：第 1 步 P 侧 `right` 推 crate 成功，事件 `push_object:crate#1`；第 6 步 L 侧 `right` 拉同一 crate 成功，事件 `pull_object:crate#1`。
- crate 边界邻域：初始在 `x=4`，第 1 步后到 `x=5`，第 6 步被拉到 `x=6` 的目标口袋。
- 关键差异：P 侧只能把 crate 交到边界邻域；L 侧 pull 把 crate 拉进玩家刚离开的目标格。目标口袋是 consumer。
- 结果观察：第 5 步玩家站在目标上不算覆盖；第 6 步 crate 覆盖目标后最终 `isWin=true`。

## 核心观察

1. P 侧 push 可以把 crate 送到 `x=5` 的 L 侧边界相邻格，随后玩家绕行跨线，L 侧 pull 能继续移动同一 crate；这是边界两侧动作互补。
2. L 侧 pull 的前格门是强 consumer：同样的 P-side handoff，在 plb_02 中只因 L 侧前格变成墙，就从 `pull_object:crate#1` 变为 `destination_blocked`。
3. 反向也成立：L 侧先 pull 后，跨回 P 侧会把下一次 crate 互动改写为 push；侧墙可把该 push 消费为 `force_blocked`。
4. 目标口袋可以消费 L pull 的“crate 移入玩家原站位”特性：玩家站在目标上不覆盖，拉动后 crate 覆盖目标，形成 shortcut / deposit。
