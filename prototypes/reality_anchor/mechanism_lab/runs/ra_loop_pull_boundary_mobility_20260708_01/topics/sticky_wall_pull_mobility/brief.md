# Topic Brief: sticky_wall_pull_mobility

## Prototype

`reality_anchor`

## Topic

拉黏块组 + 墙的可动性。

## Seed Source

用户指定 topic 2。与现有 “刚体黏块 + 墙口” 语料相关，但本轮限定 pull 语义下的可动性和回返。

## Scope

比较 sticky group 被 pull 时的刚体 footprint 检查：

- 单格 sticky 与 crate 的对照。
- 2 格条沿轴 / 垂直于轴被拉。
- L 形或 2x2 在窄口、凸角、墙边的前格 / footprint 目标格差异。
- 拉过墙口后的反向施力格或把手格是否仍可达。

## Exclusions

- B/S 只作为 material_source，不得把 “M 存在” 或跨 B/S 转换本身写成成果。
- 不重复证明 sticky push 进入墙口的旧语料；关键观察点必须在 pull 动作或 pull 后回返门。
- 不读取 design archive、候选关卡、人类评价或 sampler profile。

## Source Boundary

可读：本 brief、round manifest、Reality Anchor README / runtime / mechanics、runner、lexicon index、backlog。

## Compare Checklist

- 至少 4 个 case，包含一个 sticky 单格正例、一个 2 格刚体被墙目标格拒绝、一个打开墙口后通过的正例、一个拉后把手/回返 probe。
- 若使用 L 形或 2x2，优先做同一 consumer 下的 open / blocked 近邻对照。
- 写明 `active_rule=sticky rigid footprint under pull_force`，墙口/凸角/把手格为 `consumer`，B/S 为 `material_source`。

## Run Intent

生成 `cases.yml`，运行 `mechanism-lab-run --write`，再写：

- `explorer_notes.md`：哪些差异来自 pull，哪些只是 sticky 刚体通用墙口。
- `proposed_families.md`：优先作为 “刚体黏块 + 墙口” 的 pull-side supplement；只有出现新输入/输出接口时才建议新 family。
