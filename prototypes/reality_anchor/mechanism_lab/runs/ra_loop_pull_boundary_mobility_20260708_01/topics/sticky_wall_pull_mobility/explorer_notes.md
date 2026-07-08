# Explorer Notes: sticky_wall_pull_mobility

## 运行范围

- 读取范围：本 topic brief、round manifest、Reality Anchor README、`mechanic.yml`、`src/prototypes/reality_anchor/mechanics.ts` / `runtime.ts`、`src/workflows/localExperimentRunner.ts`、机制实验流程说明、lexicon index / backlog。
- 未读取：design archive、候选关卡、人类评价、sampler profile。
- 运行命令：`npx tsx src/cli.ts mechanism-lab-run prototypes/reality_anchor prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pull_boundary_mobility_20260708_01/topics/sticky_wall_pull_mobility/cases.yml --run-id ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_mobility --out-dir prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pull_boundary_mobility_20260708_01/topics/sticky_wall_pull_mobility --write`
- runner 成功生成 `cases.json`、`results.json`、`report.md`。8 个 case 的局部可达图均为 `complete`。

## 实验隔离

- P/L 只用于把实验区放在 pull side；锚点被墙隔离，不作为被操作对象。
- B/S 只用于让 `M` 成为合法 sticky material source；关键 case 的事件类型没有 B/S 移动或边界事件。
- 每个 layout 的 `G` 只是满足 runtime 至少一个 target 的解析要求，不参与观察点。

## Case 摘要

| case | 首步 | 关键结果 | 图 |
| --- | --- | --- | --- |
| `single_crate_pull_clear` | `right` legal | `pull_object:crate#1`；回初始 depth 9 | complete / 114 |
| `single_sticky_pull_clear` | `right` legal | `pull_object:sticky#1, move_sticky_rigid`；回初始 depth 9 | complete / 114 |
| `bar_side_pull_target_wall_blocked` | `right` illegal | `force_blocked`；下侧 footprint 目标格是墙 | complete / 95 |
| `bar_side_pull_open_mouth` | `right` legal | 2 格竖条整体右移；回初始 depth 9 | complete / 138 |
| `l_corner_pull_tooth_blocked` | `right` illegal | `force_blocked`；L 形远端脚目标格是墙 | complete / 7 |
| `l_corner_pull_notch_open` | `right` legal | L 形整体右移；回初始为 `no complete` | complete / 9 |
| `bar_pull_after_handle_open` | `right` legal | 上侧环路开放，回初始 depth 9 | complete / 108 |
| `bar_pull_after_handle_closed` | `right` legal | 同样先通过，但回初始 `no complete` | complete / 12 |

## 观察

- 单格 sticky 与单格 crate 在 clear pull 下动作集合同构：首步都合法，最终 `left` 都因 `pull_world_front_blocked` 非法；差异只是 sticky 多出 `move_sticky_rigid`。这只作 material/control，不是可入库结构族。
- 2 格竖条的 blocked/open 对照把关键点隔离在 pull 下的刚体 footprint 检查：玩家前格为空、接触格能进入玩家旧位仍不足够；非接触格的目标位置如果是墙，整步 `force_blocked`。
- L 形对照给出凸角版本：只要远端脚目标格开墙，首步从 `force_blocked` 变成 legal；这不是 B/S 边界成果，而是 sticky connected footprint 被墙齿消费。
- post-mouth handle 对照显示 pull-specific 回返门：拉过口后，直接反向输入不是“推回去”，而是玩家前格被刚体占住导致 `pull_world_front_blocked`；必须绕到对象另一侧的把手格。上侧环路开放时 bounded return 找到 depth 9 路径，墙带关闭时完整图证明不能回到初始。
- L 形 open case 的 `no complete` 只能写成该小封闭 patch 中无回返；它证明口打开不自动提供把手，不应扩展为所有 L 形 pull 后都不可回返。

## 结论范围

- 已支撑：pull_force 下 sticky 刚体的目标 footprint 墙检、凸角开闭、以及拉后反向把手可达性。
- 后续补齐：`sticky_wall_pull_shape_spectrum` 已追加 2x2、3 格条、把手格被 crate / sticky 占用等变体；本文件只作为早期 subset，不再代表本轮最终覆盖边界。
- 归因：`active_rule=sticky rigid footprint under pull_force`；`material_source=B/S`；`consumer=墙目标格 / 凸齿 / 拉后把手通路`；`incidental=P/L 只提供 pull side，target G 只满足解析`。
