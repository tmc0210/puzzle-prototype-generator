# Explorer Notes: ra_struct_rigid_tooth_consume_01

## Exploration Brief

- `prototype`: Reality_Anchor (`reality_anchor`)
- `scope`: B/S 归一化产生的 sticky merge footprint，被一格墙齿目标口消费时的动作集合差异。
- `exclusions`: 不进入完整关卡设计；不组装候选包；不调用批评或审查流程；不读取设计归档、人类评价、历史候选、采样配置、硬编码布局模板、旧实验 run 或历史报告。
- `source_boundary`: 允许读取技能协议、curator rubric、本地 run 格式、仓库级 mechanism lab 边界、当前 `mechanic.yml`、当前 Reality Anchor runtime / CLI / 本地实验 runner、当前 lexicon。禁止读取历史设计材料。
- `run_intent`: `explore_then_curate`，但 curator 只按 rubric 判断是否作为 lexicon 补充，不扩展成关卡 recipe。

## 本轮 Primitive Refs

- `box_sticky_normalize`: B/S 边界把 box side 归一为 crate，把 sticky side 归一为 sticky cell。
- `sticky_merge`: sticky side 的正交相邻 sticky cell 合并成一个刚体 footprint。
- `push_force`: 玩家在默认 push world 中推动相邻 movable object，刚体 footprint 的每个 cell 都要有可移动目标格。
- `target_cover_win`: 目标口可消费进入目标格的 object cell；本轮只把它当作最小后续约束，不做关卡胜负设计。

## 候选结构族草案

1. `rigid_tooth_mouth_consumption`: 竖向 sticky 刚体被一格墙齿目标口消费；近邻变量是是否 merge、是否打开双格口、是否只有单格 sticky。已执行。
2. `boundary_brush_partial_release`: 移动 B/S 边界只切过 footprint 的一行或一列，比较 `C+M`、`C+MM` 和完整 `CC` 产物。过滤：当前 lexicon 已有移动边界刷产物，除非补新消费口。
3. `pl_pull_front_gate_vs_footprint_gate`: P/L pull 抽取时，玩家前格墙和对象目标格墙分别关闭不同门。过滤：现有 lexicon 已覆盖，除非换成新 blocker 类型。
4. `sticky_pair_side_handle`: 双格 sticky 推入墙口后，侧向把手是否能恢复反向施力。过滤：已有反向施力格谱系，作为后续补充即可。
5. `crate_to_sticky_merge_timing`: 同两个 crate 先后跨入 sticky side，比较立即相邻 merge 与晚接入 L 形。过滤：更像 B/S 绑定债已有变体。
6. `anchor_as_brush_driver`: P/L 或 B/S anchor 被 force chain 推动后，远端对象 side 发生变化。过滤：driver 差异，不单独升 family。
7. `target_mouth_singleton_vs_footprint`: 同一个目标口只允许单格对象进入，footprint 对象会被墙齿拒绝。与本轮主 family 合并执行。
8. `sticky_split_by_box_side_escape`: sticky 刚体被移动边界切回 crate 后，分离资源穿过窄口。过滤：需要额外生产步骤，本轮先只做静态 side 对照。

## 选择理由

本轮选择 `rigid_tooth_mouth_consumption`，因为它同时满足四个条件：

- 近邻变体密度高：同一局部形状只改 merge 状态、墙齿或对象数量。
- 可观测差异强：`right` 在双格 sticky + 墙齿中是 `force_blocked`，在分离 crate、单格 sticky、双格开口中合法。
- 反例潜力明确：双格 sticky 本身不是问题，墙齿本身也不是问题；二者组合才形成 footprint 门。
- consumption probe 明确：目标口 `G` 作为最小后续约束，被单格/分离资源覆盖，而被双格刚体 + 单格墙齿拒绝。

## 本轮假设

如果 B/S side 把两个竖向相邻对象合成 sticky 刚体，那么推下格时，上格的目标格也必须开放；因此“一格目标口 + 上沿墙齿”会消费这个刚体 footprint。相邻但未绑定的两个 crate 或单格 sticky 不会被上沿墙齿连带阻断。

## 有效比较

- `rigid_pair_tooth_block`: `right` 为 illegal，reason=`force_blocked`；局部图 complete，只有 1 个状态，目标未被覆盖。
- `crate_pair_tooth_lower_pass`: 同样墙齿和目标口，下方 crate 可单独右推覆盖目标；局部图 complete，2 个状态，1 个 win state。
- `rigid_pair_open_mouth_pass`: 保留双格 sticky，但移除上沿墙齿形成双格口；`right` 合法，事件为 `push_object:sticky#1, move_sticky_rigid`。
- `single_sticky_tooth_pass`: 保留墙齿和目标口，但移除上方 sticky；`right` 合法，单格 sticky 覆盖目标。

## 被修正的解释

- 初始解释“sticky 刚体会被墙口挡住”过宽。`rigid_pair_open_mouth_pass` 说明双格刚体在双格口中可以通过。
- 初始解释“墙齿挡住目标口”也过宽。`single_sticky_tooth_pass` 与 `crate_pair_tooth_lower_pass` 说明墙齿只在它挡住同一刚体 footprint 的另一格目标位时才起作用。
- `crate_pair_tooth_lower_pass` 的后续动作表出现 `box_to_sticky:n1`，说明进入目标后的进一步 side 变化存在，但它不是本轮结论主体；本轮主体是第一步目标口消费。

## 不建议提交 Curator 的弱结论

- “sticky 会被墙挡住”：这是规则复述，不是结构族。
- “crate 比 sticky 更灵活”：过抽象，缺少局部形状条件。
- “目标口能产生胜利”：这是 win rule 事实，不是本轮机制语料。
- `returnToInitial` 中合法变体多为 `no complete`，可以说明局部状态图内未回初始，但本轮不把它作为不可回返结构的主要证据。

## 下一轮建议

- 把同一前沿墙齿目标口接到 B/S 移动边界刷子输出，验证 `CC`、`C+M`、`C+MM`、竖向 sticky pair 是否能作为 producer 输出稳定接入。
- 增加一个反事实：禁用 `box_sticky_normalize` 或换 side 位置，确认差异来自 merge footprint 而不是单纯地形。
- 扩展 footprint：比较 2 格竖条、3 格竖条、L 形在同一墙齿目标口中的前沿阻断谱。
