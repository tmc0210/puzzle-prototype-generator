# Topic Brief: pl_boundary_multi_box_force_chain

## Prototype

`reality_anchor`

## Topic

P/L 边界附近多箱 / 力链推拉移动的可动性和可逆性。

## Seed Source

用户指定 topic 3 的多箱部分，并补充：必须真正用到 P/L 边界两侧的推拉差异。

## Scope

比较多个 crate 在边界邻域中被 push 链和 pull 抽取语义分化：

- P 侧推同轴 2/3 箱链到边界邻域，L 侧只能从身后一格抽近端或被前格门拒绝。
- L 侧拉一箱后改变 P 侧推链长度 / 资源分配。
- 并排箱或箱 + P/L anchor 力链在跨侧后产生不同回返门。
- 墙廊、单格口袋或目标口消费 push 链和 pull 抽取的差异。

## Exclusions

- 不接受只证明普通 push chain 的 case。
- 不接受只证明单箱 pull 的 case；多箱必须改变力链、资源分配或回返性。
- P/L anchor 位移可作为对象参与，但不能替代玩家跨侧和箱链语义差异。
- 不读取 design archive、候选关卡、人类评价或 sampler profile。

## True Boundary Gate

有效 case 必须同时满足：

- 玩家至少一次跨过 P/L 分界线，并在两侧都发生与多箱/力链相关的有效动作或被明确门控的动作。
- 至少两个 crate 或 crate + anchor 参与同一局部资源差异。
- 关键差异来自 P 侧推链与 L 侧 pull 抽取/前格门/身后相邻门的差异。

## Compare Checklist

- 至少 4 个 case：同轴箱链正例、L 侧抽近端导致链断开的资源分配、前格门或目标格反例、打开空间后的 shortcut 或可逆 case。
- 记录 `force_chain:n*`、`pull_object`、`push_object` 事件是否支撑解释。
- 写明 `active_rule=P/L push-chain vs pull-extract semantics`，墙/口袋/站位/链长度为 consumer 或旋钮。

## Run Intent

生成 `cases.yml`，运行 `mechanism-lab-run --write`，再写：

- `explorer_notes.md`：逐 case 判定 true boundary gate；区分普通多箱推链与边界语义差异。
- `proposed_families.md`：若只是 driver，建议 supplement/recipe；若形成稳定边界分配器，再建议新 family。
