# Topic Brief: pl_boundary_single_crate

## Prototype

`reality_anchor`

## Topic

P/L 边界附近单个箱子的推拉移动可动性和可逆性。

## Seed Source

用户指定 topic 3，并补充：必须真正用到 P/L 边界，玩家需要真的在边界两侧通过推拉差异行动。

## Scope

研究同一个单箱在 P/L 边界邻域被 push / pull 语义切换消费：

- 玩家从 P 侧推箱到边界邻域，再跨入 L 侧把同一箱抽回或抽入口袋。
- 玩家从 L 侧拉箱后回到 P 侧，比较能否 push 撤销。
- 箱处在边界相邻格、跨边界后身份不变但动作语义改变。
- 墙或目标口袋消费 “P 侧能推、L 侧需前格空 / 身后相邻” 的差异。

## Exclusions

- 不接受 “全局 P 侧推关卡” 或 “全局 L 侧拉关卡” 作为成果。
- 不把 P/L anchor 的普通墙廊棘轮作为本 topic 主成果，除非它直接让玩家跨侧后操作同一箱。
- 不读取 design archive、候选关卡、人类评价或 sampler profile。

## True Boundary Gate

有效 case 必须同时满足：

- 玩家至少一次跨过 P/L 分界线，并在两侧都发生与箱相关的有效动作或被明确门控的动作。
- crate 至少一次在 P/L 边界相邻格或被推/拉穿过边界附近的局部区域。
- 对照 case 的差异不能用 “全图 push” 或 “全图 pull” 单独解释。

## Compare Checklist

- 至少 4 个 case：边界互补正例、P 侧可推但 L 侧前格门失败、L 侧可拉但 P 侧回推失败、口袋/墙消费或 shortcut。
- 记录动作序列中玩家跨侧的具体步数。
- 写明 `active_rule=P/L forceModeAt changes player action semantics`，墙/口袋/站位为 `consumer`。

## Run Intent

生成 `cases.yml`，运行 `mechanism-lab-run --write`，再写：

- `explorer_notes.md`：逐 case 判定是否满足 true boundary gate。
- `proposed_families.md`：只收满足门槛的结构族；不满足者列入 “not for lexicon”。
