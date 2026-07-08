# Topic Brief: pl_boundary_sticky_groups

## Prototype

`reality_anchor`

## Topic

P/L 边界附近黏块组推拉移动的可动性和可逆性。

## Seed Source

用户指定 topic 3 的黏块组部分，并补充：必须真正用到 P/L 边界两侧的推拉差异。

## Scope

比较 sticky footprint 在 P/L 边界邻域的 push / pull 分岔：

- P 侧把 2 格条推到边界邻域，L 侧需要前格空才能抽回。
- L 侧拉 sticky group 穿过边界附近墙口，P 侧回推是否被 footprint / 站位关闭。
- L 形或 2x2 的把手格在两侧语义下是否互补或互斥。
- B/S 只用于提供 sticky，关键观察点必须是 P/L + sticky footprint + consumer。

## Exclusions

- 不重复 “sticky + 墙口” 旧 push 语料。
- 不接受只在 L 侧拉 sticky、从未跨过 P/L 的全拉 case。
- 不把 B/S material_source 写成 active_rule。
- 不读取 design archive、候选关卡、人类评价或 sampler profile。

## True Boundary Gate

有效 case 必须同时满足：

- 玩家至少一次跨过 P/L 分界线，并在两侧都发生与 sticky group 相关的有效动作或被明确门控的动作。
- sticky footprint 至少一次处于边界相邻格，或其移动目标/把手格跨边界造成动作语义差异。
- 关键差异来自 push 与 pull 对 sticky footprint 的不同检查，不是单纯墙口尺寸。

## Compare Checklist

- 至少 4 个 case：2 格条边界互补正例、墙/前格门反例、打开把手后的回返正例、L/2x2 或 shortcut 边界修正。
- 对每个 case 标注 `active_rule`、`material_source`、`consumer`。
- 如果结果只是旧 sticky-wall 结论，建议 relabel/defer，不入 P/L 边界语料。

## Run Intent

生成 `cases.yml`，运行 `mechanism-lab-run --write`，再写：

- `explorer_notes.md`：逐 case 判定 true boundary gate 与旧语料重复风险。
- `proposed_families.md`：只有边界两侧操作差异形成接口时建议 promote/supplement。
