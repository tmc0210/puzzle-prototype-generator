# Reality Anchor 机制探索轮次：ra_loop_pl_anchor_wall_mobility_20260708_01

## 目标

围绕 Reality Anchor 原型做一轮 runtime-backed 的 P/L 推拉锚点本体探索，聚焦：

- P/L anchor 自身在墙廊、横向墙门、墙口和力链中的可动性。
- P/L anchor 被移动后，分界线重写是否能被后续动作真正消费。
- 墙格如何分别关闭玩家前格、锚点 footprint 目标格、回返把手、门闩口和混合力链。

本轮只做机制实验和语料整理，不进入关卡设计、candidate packet、critic、evidence review 或 archive 审美判断。

## Source Boundary

允许读取：

- `prototypes/reality_anchor/README.md`
- `prototypes/reality_anchor/mechanic.yml`
- `src/prototypes/reality_anchor/mechanics.ts`
- `src/prototypes/reality_anchor/runtime.ts`
- `src/workflows/localExperimentRunner.ts`
- `docs/31-mechanism-lab-explorer-curator.md`
- `skills/sokoban-mechanism-lab/SKILL.md`
- `skills/sokoban-mechanism-lab/references/protocol.md`
- `skills/sokoban-mechanism-lab/references/local-run-format.md`
- `skills/sokoban-mechanism-lab/references/lexicon-format.md`
- `skills/sokoban-mechanism-lab/references/curator-rubric.md`
- `prototypes/reality_anchor/mechanism_lab/lexicon_index.md`
- `prototypes/reality_anchor/mechanism_lab/backlog.md`
- 已有正式条目中与 `P/L 长轴墙廊`、`P/L 横向把手`、`P/L 边界交接` 直接相关的段落。
- 自己 topic 目录下的 `brief.md`、`cases.yml`、runner 输出和 notes。

禁止作为设计起点或语料判断来源读取：

- `design_archive/`
- 历史 candidate packet / human review / critic review。
- sampler profile、hardcoded layout template 或完整关卡候选。
- 非本 topic 的旧 run 全量内容，除非 curator 收口时核对 provenance。

## 共同运行命令

每个 topic 在自己的目录执行：

```text
npx tsx src/cli.ts mechanism-lab-run prototypes/reality_anchor prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pl_anchor_wall_mobility_20260708_01/topics/<topic_id>/cases.yml --run-id ra_loop_pl_anchor_wall_mobility_20260708_01_<topic_id> --out-dir prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pl_anchor_wall_mobility_20260708_01/topics/<topic_id> --write
```

## 共同硬约束

- 每个 topic 的 `cases.yml` 至少包含 4 个近邻 case；优先包含正例、反例、边界修正 case、最小 consumer / shortcut probe。
- 正例必须移动 P/L anchor 本体，并在事件中出现 `anchor_boundary_shift:push_pull`。
- 反例可以首步被墙阻止；但若没有移动 P/L anchor，只能作为门控反例，不能单独支撑可动性 family。
- 墙必须是 consumer：关闭玩家前格、锚点某半格目标位、锚点移动后回返把手、墙口门闩、目标覆盖或混合力链。
- 箱子 / sticky / B/S 只能作为 blocker、下游消费或对照材料；不得把本轮结论写成普通对象推拉或 B/S 边界结论。
- `returnToInitial.status=exhausted` 只能写作未知，不能当作不可回返证明。
- proposed family 即使是 `merge` 或 `supplement`，规格也必须和 promote 草案对齐：局部结构谱、机制角色、关键观察点、旋钮、I/O、自然消费、误用边界、证据都要齐。
- 本轮不把同题材内显然相邻、可顺手覆盖的变体写成 backlog 债；未覆盖只用于收窄结论。只有打开新结构用途或新题材，才进入 backlog。

## Topic Portfolio

### A. pl_anchor_long_axis_pull_push_wall_ratchet

- seed_source: 用户指出 P/L 推拉锚点实验太少；现有 `P/L 长轴墙廊` 仅覆盖 P 侧 push 的基础余量谱。
- 题材：水平 P/L 在长轴墙廊中被 P push / L pull 移动时，L/P 端余量、玩家前格和回返把手如何决定可动性与棘轮性。
- 边界：研究对象必须是 P/L anchor 本体；对象箱子不参与。
- 成功标准：比较 push 与 pull 两类驱动是否都能形成墙廊容量资源，至少一个 case 证明墙不是装饰而是停位/回返 consumer。

### B. pl_anchor_transverse_wall_gate_matrix

- seed_source: 用户 scope + 现有 `P/L 横向把手` 只覆盖少量墙位，尚未形成完整墙门矩阵。
- 题材：横放或竖放 P/L anchor 被垂直/水平推拉时，玩家前格门、P 半格目标门、L 半格目标门、移动后回返门如何分离。
- 边界：不把 `destination_blocked` / `force_blocked` 只当规则复述，必须放在相邻墙位矩阵内解释。
- 成功标准：产出可复现的墙门分类谱，含 push 侧、pull 侧、旋转方向或回返 consumer。

### C. pl_anchor_boundary_rewrite_second_action

- seed_source: 用户 scope；现有语料缺“移动 P/L anchor 后，分界线重写被下一步动作消费”的本体实验。
- 题材：玩家先移动 P/L anchor，使某个站位或对象从 push side 变成 pull side，或反向，再用第二动作消费新边界。
- 边界：第二动作必须依赖新 P/L 边界；若锚点移动后没有后续差异，只能停在 weak finding。
- 成功标准：至少一个正例有 `anchor_boundary_shift:push_pull` 后接第二动作的 push/pull 语义差异；至少一个对照把锚点移动量或墙位改掉后第二动作失败或变质。

### D. pl_anchor_wall_latch_goal_plug

- seed_source: 用户提出结合墙进一步考察推拉锚点；现有语料只把 P/L anchor 当边界或可移动二格体，少有墙口/目标门闩实验。
- 题材：P/L anchor 作为二格移动门闩或目标塞子，在一格/二格墙口、目标格和回返通道中被 push/pull 消费。
- 边界：目标和墙口是 consumer，不能变成完整关卡目标设计。
- 成功标准：证明锚点移动会打开/堵住通道或覆盖/释放目标；包含宽度 shortcut 或墙口过窄反例。

### E. pl_anchor_mixed_force_chain_wall

- seed_source: 用户 scope + `P/L 边界交接` 当前仍缺箱 + anchor 混合链，但本轮只取 P/L anchor 本体方向。
- 题材：crate 与 P/L anchor 在同一 force chain 中被墙和边界重写消费；比较箱顶锚点、锚点顶箱、pull 锚点带箱链等局部结构。
- 边界：锚点必须参与同一 force chain 并移动；箱子只是链材料或下游对象，不得抢主语。
- 成功标准：至少一个 case 同时出现 `force_chain:n*` 与 `anchor_boundary_shift:push_pull`，且墙位改变动作集合、资源分配或后续边界语义。

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
