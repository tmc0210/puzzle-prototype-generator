# Curator Decision: ra_loop_pl_anchor_wall_mobility_20260708_01

## 决策摘要

- `supplement`: `pl_anchor_long_axis_pull_push_wall_ratchet` 并入 `P/L 长轴墙廊：L 端余量棘轮`。
- `supplement`: `pl_anchor_transverse_wall_gate_matrix` 并入 `P/L 横向把手：玩家前格门与锚点 footprint 门`。
- `relabel/defer`: `pl_anchor_wall_latch_goal_plug` 的墙口门闩材料不入正式 lexicon；它只证明 P/L anchor 作为二格 movable footprint / 物理门闩可被墙口消费，没有证明边界变化被后续消费。
- `promote`: 新增 `P/L 锚点边界重写：旧半格把手与侧边对象改侧`。
- `supplement`: `pl_anchor_mixed_force_chain_wall` 的 wall capacity 并入长轴墙廊，carried crate pull gate 并入横向把手，mixed downshift rewrite 并入锚点边界重写。
- `defer`: P/L target plug 两个目标覆盖 case 停在 run 中，不入正式 lexicon。

## claim_calibration

已支撑：

- P/L anchor 本体在 push / pull 下都能被墙廊、墙门、mixed chain 消费。
- 长轴 pull 的玩家前格余量、回返门、mixed-chain 尾墙都有正反对照。
- 横向把手的 P 半格门、L 半格门、玩家前格门、移动后回返门和 carried crate 目标门均有 runtime-backed 对照。
- 边界重写有旧 L 半格目标袋消费，也有 mixed chain 下移后侧边 crate 改侧消费。

未覆盖导致的结论收窄：

- 旧 P 半格、全部竖向镜像、目标塞子非胜利 consumer、B/S 刷子 composition 没有写成全称。
- 正例中 `returnToInitial.status=exhausted` 保持 unknown。
- mixed chain 不扩张到三箱或 sticky。

不应入库的弱结论：

- P/L anchor 覆盖目标的胜利 witness。
- 墙口门闩：正例有 anchor 移动和通道释放，但关键观察点是二格 footprint 让门口从占用变可走，未消费 P/L 边界变化。
- 首步 illegal case 脱离对照后的单独规则复述。
- 一次 anchor shift 但没有后续消费的事件 witness。

是否打开新题材或新结构用途：

- 打开了一个新正式结构用途：锚点移动后的边界重写。墙口门闩改为 relabel/defer，仅作为二格物理 footprint 证据停在 run 中。
- 不新增 backlog：本轮相邻基础变体已经按 topic 顺手覆盖或明确收窄；目标塞子若继续属于 recipe / 非胜利 consumer 方向，不作为本轮基础债务。

## lexicon_changes

已更新：

- `prototypes/reality_anchor/mechanism_lab/lexicon.md`

具体变更：

- 在 `P/L 长轴墙廊：L 端余量棘轮` 中补入 L 侧 pull 余量、回返门和 mixed-chain 容量谱。
- 在 `P/L 横向把手：玩家前格门与锚点 footprint 门` 中补入半格目标门矩阵、竖向开放镜像和 L 侧 pull carried crate gate。
- 新增 `P/L 锚点边界重写：旧半格把手与侧边对象改侧`。
- 在 `P/L 边界交接` 中补充归属边界：P/L anchor 本体移动后的边界重写不归入普通对象 handoff。

## index_changes

已更新：

- `prototypes/reality_anchor/mechanism_lab/lexicon_index.md`

具体变更：

- 扩展 `P/L 长轴墙廊` 和 `P/L 横向把手` 的一句话用途、输入 / 输出接口和仍缺说明。
- 新增 `P/L 锚点边界重写：旧半格把手与侧边对象改侧` 索引条目。
- 移除 `P/L 边界交接` 中“箱 + anchor 混合链仍缺基础”的表述，改为指向锚点边界重写条目。

## backlog_changes

未更新 `backlog.md`。

原因：

- 本轮没有把同题材普通未覆盖变体写成 backlog 债。
- 既有 B/S brush composition gaps 仍是独立 composition 方向，本轮没有关闭也没有扩张。
- 墙口门闩已经在本轮停止晋升；若未来重开，必须加入真正消费边界重写的第二动作，而不是只证明二格 footprint 开关门口。
- P/L target plug 只有 target-covering witness，不足以新增正式探索 gap；停在 run 中即可。

## next_round_suggestion

若继续 P/L anchor 方向，建议不要补基础可动性，而是做 composition round：把 `P/L 锚点边界重写` 的输出接入 B/S 移动边界刷、目标回填或残余债务处理。
