# Reality Anchor 机制探索轮次：ra_loop_pull_boundary_mobility_20260708_01

## 目标

围绕 Reality Anchor 原型做一轮 runtime-backed 的并行机制探索，聚焦：

- 拉单个箱子的可动性。
- 拉黏块组 + 墙时的可动性。
- P/L 边界附近单箱、黏块组、多箱推拉移动的可动性和可逆性。

本轮只做机制实验和语料整理，不进入关卡设计、candidate packet、critic、evidence review 或 archive 审美判断。

## Source Boundary

允许读取：

- `prototypes/reality_anchor/README.md`
- `prototypes/reality_anchor/mechanic.yml`
- `src/prototypes/reality_anchor/mechanics.ts`
- `src/prototypes/reality_anchor/runtime.ts`
- `src/workflows/localExperimentRunner.ts`
- `docs/31-mechanism-lab-explorer-curator.md`
- `prototypes/reality_anchor/mechanism_lab/lexicon_index.md`
- `prototypes/reality_anchor/mechanism_lab/backlog.md`
- 自己 topic 目录下的 `brief.md`、`cases.yml`、runner 输出和自己写的 notes。

禁止作为设计起点或语料判断来源读取：

- `design_archive/`
- 历史 candidate packet / human review / critic review。
- sampler profile、hardcoded layout template 或完整关卡候选。

## 共同运行命令

每个 topic 在自己的目录执行：

```text
npx tsx src/cli.ts mechanism-lab-run prototypes/reality_anchor prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pull_boundary_mobility_20260708_01/topics/<topic_id>/cases.yml --run-id ra_loop_pull_boundary_mobility_20260708_01_<topic_id> --out-dir prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pull_boundary_mobility_20260708_01/topics/<topic_id> --write
```

## 共同硬约束

- 每个 topic 的 `cases.yml` 至少包含 4 个近邻 case；优先包含正例、反例、边界修正 case、最小 consumer / shortcut probe。
- `returnToInitial.status=exhausted` 只能写作未知，不能当作不可回返证明。
- 对于 P/L 边界 topic，必须满足“真边界”门槛：
  - 玩家至少一次实际从 P 侧进入 L 侧，或从 L 侧进入 P 侧，并在两侧分别执行有意义动作。
  - 被研究对象或 P/L anchor 的 footprint 至少一次处在边界相邻格或跨边界移动的局部状态中。
  - 关键差异必须来自 push / pull 语义在边界两侧的切换，例如玩家前格门、身后抽取、推链、回返门或 anchor footprint 位移；不能只把 P/L 当作“整图是推世界/拉世界”的前置条件。
  - 未满足门槛的 case 只能作为反例、smoke 或被剔除材料，不能进入 proposed family。
- 机制角色必须区分：
  - `active_rule`：关键观察点真正造成差异的规则。
  - `material_source`：只生成对象、形状、边界或初始资源。
  - `consumer`：消费输出并制造动作集合、可达性、回返性或资源分配差异的后续约束。
  - `incidental`：出现过但关键观察点不参与的机制。

## Topic Portfolio

### A. single_crate_pull_mobility

- seed_source: 用户指定 “拉单个箱子的可动性”。
- 题材：单箱在 pull 世界中的合法条件、回返性和单格 consumer。
- 边界：不要求 P/L 真边界；若使用 P/L，只作为创建 pull 侧的最小局部条件。
- 成功标准：归纳单箱 pull 的前格、身后格、目标格和墙口对可动性的影响。

### B. sticky_wall_pull_mobility

- seed_source: 用户指定 “拉黏块 + 墙的可动性”。
- 题材：sticky group 作为刚体被 pull 时，墙、窄口、凸角和把手格如何决定可动性 / 回返性。
- 边界：B/S 只允许作为 sticky 材料来源；关键观察点必须是 sticky 刚体 + 墙 consumer。
- 成功标准：至少覆盖单格、2 格条、L 或 2x2 中的一组近邻差异。

### B2. sticky_wall_pull_shape_spectrum

- seed_source: 用户复核后指出 sticky group + 墙的 pull 实验不够充分，不能把 2x2、3 格条、把手占用等基础变体留作 backlog。
- 题材：在 `sticky_wall_pull_mobility` 的基础上补齐 3 格竖条、2x2、L 形方向、3 格横条沿轴、box-side crate blocker 与 sticky blocker。
- 边界：仍然只把 B/S 当作材料来源；关键观察点必须来自 pull_force 下 sticky footprint 与墙 / 把手格 / 占用物的交互。
- 成功标准：把原先“未覆盖变体”补成正式 runner 证据，并与单箱 pull 基线合并为同一 pull-side object mobility 结构族。

### C. pl_boundary_single_crate

- seed_source: 用户指定 “P/L 边界附近单个箱子推拉移动”并补充真边界要求。
- 题材：玩家跨 P/L 边界后，对同一个单箱产生 push / pull 差异，进而影响动作集合和回返。
- 边界：必须满足共同真边界门槛。
- 成功标准：至少一个 case 证明边界两侧的动作互补或互斥被墙/口袋消费。

### D. pl_boundary_sticky_groups

- seed_source: 用户指定 “P/L 边界附近黏块组推拉移动”并补充真边界要求。
- 题材：sticky group 在边界邻域由 push 侧送入、pull 侧抽出，或反向操作时，footprint 和把手格如何改变可逆性。
- 边界：P/L 必须真正参与动作语义差异；B/S 只作 sticky 材料来源。
- 成功标准：至少一个 footprint 近邻对照说明边界两侧操作差异不是纯 sticky-wall 旧结论。

### E. pl_boundary_multi_box_force_chain

- seed_source: 用户指定 “P/L 边界附近多箱推拉移动”并补充真边界要求。
- 题材：多箱、推链、pull 抽取在边界邻域的分岔；比较同轴箱链、并排箱和箱 + anchor 力链。
- 边界：必须满足共同真边界门槛。
- 成功标准：证明 push 链与 pull 抽近端/前格门在边界两侧造成不同资源分配或可逆性。

## 预期输出

每个 topic 输出：

- `brief.md`
- `cases.yml`
- `cases.json`
- `results.json`
- `report.md`
- `explorer_notes.md`
- `proposed_families.md`

主线程最终输出：

- `curator_synthesis.md`
- `curator_decision.md`
- 必要时更新 `lexicon.md`、`lexicon_index.md`、`backlog.md`。
