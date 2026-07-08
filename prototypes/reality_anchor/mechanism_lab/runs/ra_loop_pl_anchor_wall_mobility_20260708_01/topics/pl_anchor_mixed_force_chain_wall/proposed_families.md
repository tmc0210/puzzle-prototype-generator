# Proposed Families: pl_anchor_mixed_force_chain_wall

## 1. P/L 混合链墙端容量：crate 缩短锚点余量

语料化结果：

- Designer 可用装置：把 crate 与 P/L anchor 放进同一长轴 force chain，让尾墙消费整条混合链的 footprint。crate 不是普通箱链装饰，它会把 anchor-only 可移动余量缩短一格。
- 最小形式：

```text
crate -> P/L，首步合法，第二步撞尾墙：
########
#..@...#
#..C...#
#..P...#
#..L...#
#......#
########

P/L -> crate，首步合法，第二步撞尾墙：
########
#..@...#
#..P...#
#..L...#
#..C...#
#......#
########

anchor-only 对照，同样余量可走两步：
########
#..@...#
#..P...#
#..L...#
#......#
#......#
########
```

- 适用变体：P 侧 push crate -> P/L；P 侧 push P/L -> crate；一格尾余量；anchor-only 对照。
- 输入接口：玩家在 P 侧长轴方向接触链头；P/L 与 crate 四邻接且在移动方向上会互相顶住；尾端只有有限空格，后面是墙或边界。
- 输出接口：首步产生 `force_chain:n2` 与 `anchor_boundary_shift:push_pull`；移动后尾端空间被吃掉，下一次同向推进因 `force_blocked` 失败。
- 自然消费方式：用作有限位移资源、门闩停位、后续边界重写的前置 driver；把“能否再推一次”交给尾墙判定。
- 误用边界：若没有 crate，结论退化为 anchor-only 墙廊；若尾端空间太多，只是普通可移动链；若 P/L 没移动，不能归入本 family。
- 组合例句：`mixed-chain one-step ratchet -> boundary rewrite probe`：玩家先用 crate 把 P/L 推到新边界位，同时接受下一次同向推被尾墙关掉，再用新边界处理侧边对象。

机制角色：

- active_rule：`push_force` 的 force propagation 加上 rigid footprint 墙检查；关键差异发生在第二次同向推进，mixed 链尾端撞墙给 `force_blocked`。
- material_source：crate 是链材料；P/L anchor 提供可移动边界本体。
- consumer：尾墙 / 边界余量。
- incidental：目标 `G` 只用于 runtime 合法解析。

关键观察点：

- `p_push_crate_into_anchor_tail_wall_after_one` 首步事件为 `push_object:crate#1, force_chain:n2, anchor_boundary_shift:push_pull`，第二步 `force_blocked`。
- `p_push_anchor_into_crate_tail_wall_after_one` 首步事件为 `push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull`，第二步同样 `force_blocked`。
- `anchor_only_two_steps_capacity_control` 两步都合法，事件只有 `anchor_boundary_shift:push_pull`，没有 `force_chain:n2`。

结构旋钮：

- 链顺序：crate -> P/L / P/L -> crate / anchor-only。
- 尾端余量：0 / 1 / 2 格。本轮只实测 1 格和 anchor-only 对照。
- 下一步消费：同向再推 / 转向绕行。本轮强证据是同向再推。

变体谱与共同解释：

- 两种 mixed 链顺序都形成 `n2` 链并移动 P/L；墙端容量相同。
- anchor-only 在同样走廊高度下多走一步，证明 crate 改变的是 P/L mobility，而非只是事件标签。
- 链顺序改变首步 `push_object` 的对象名和移动后对象排布，但不单独构成新 family。

推荐 probe：

- 若要 promote，需要补 0 格和 2 格尾余量，确认这是完整容量谱，而不是一格特例。
- 若并入既有 `P/L 长轴墙廊`，把本轮作为 mixed-chain supplement 即可。

证据：

- `run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_mixed_force_chain_wall`
- `cases=p_push_crate_into_anchor_tail_wall_after_one,p_push_anchor_into_crate_tail_wall_after_one,anchor_only_two_steps_capacity_control`
- `tags=runtime_observed,graph_complete,mixed_force_chain,anchor_boundary_shift,wall_consumer,control_case`

建议 curator 决策：`supplement`

不应进入 lexicon 的部分：

- 不把 `crate_before_anchor` 和 `anchor_before_crate` 拆成两个顶层 family。
- 不把 `returnToInitial` 写成不可回返；两个 mixed case 因脚本停在 illegal step，return search 是 not applicable。

结论范围校准：

- 已支撑：一格尾余量中 mixed crate 会缩短 P/L 可动性，尾墙消费下一次推进。
- 未覆盖：更长链、更大余量、目标消费。
- 不应入库：普通箱链解释。
- 是否打开新题材：否，更像 P/L 墙廊条目的 mixed-chain supplement。

## 2. P/L 混合链边界下移：旧 L 侧 crate 被重标为 P 侧 push 入口

语料化结果：

- Designer 可用装置：先用 P/L -> crate 混合链把垂直 P/L 下移一格，再让玩家绕到旧 L 侧侧边 crate 的右侧。边界移动后，该站位从 pull side 变成 push side，原本会被 `pull_world_front_blocked` 拒绝的触碰变成合法 push chain。
- 最小形式：

```text
初始，侧边 crate 在旧 L 行：
########
#..@...#
#..P...#
#..LC..#
#..C...#
#......#
########

先 down，P/L 与下方 crate 同链下移：
########
#......#
#..@...#
#..PC..#
#..L...#
#..C...#
########

玩家到右侧后 left，变成 P 侧 push：
########
#......#
#......#
#.PC@..#
#.L....#
#..C...#
########

不先 down 的门控反例：
########
#......#
#..P...#
#..LC@.#
#..C...#
#......#
########
left => pull_world_front_blocked
```

- 适用变体：垂直 P/L，P 在上、L 在下；P/L 下方有 crate 形成首步 mixed chain；旧 L 行侧边有待消费 crate；玩家可绕到侧边 crate 右侧。
- 输入接口：首步必须移动 P/L 且出现 `force_chain:n2`；第二步需要一个站位刚好落在边界被重写的行上。
- 输出接口：第二动作从 L 侧 pull gate 变成 P 侧 push chain，事件再次出现 `force_chain:n2` 与 `anchor_boundary_shift:push_pull`。
- 自然消费方式：把侧边 crate 推入新锚点位置、打开或关闭横向口、把旧 L 侧对象重新分配到 P 侧处理。
- 误用边界：如果玩家站位不在被边界扫过的行上，只是普通绕行；如果首步不移动 P/L，`left` 是 pull 前格被占；如果没有第二个 consumer crate，只是 anchor 移动 witness。
- 组合例句：`mixed-chain downshift -> side crate push relay`：第一段用下方 crate 限制 P/L 位移，第二段用新 P 边界把侧边 crate 推入锚点，形成二段式对象分配。

机制角色：

- active_rule：`forceModeAt` 在 P/L 移动后重算玩家站位侧别，导致同一 `left` 从 pull front gate 变成 push force；第二动作的 `push_force` 是关键观察点。
- material_source：首步 P/L -> crate mixed chain 提供移动边界；下方 crate 是链材料。
- consumer：旧 L 行的侧边 crate 和玩家右侧站位消费边界重写；尾墙容量由第 1 个 family 校准，不是本 family 的主要观察点。
- incidental：目标 `G` 只用于 runtime 合法解析。

关键观察点：

- `mixed_downshift_rewrites_side_crate_to_push` 的首步 `down` 为 `push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull`。
- 同一 case 的最终 `left` 为合法 push，事件为 `push_object:crate#1, force_chain:n2, anchor_boundary_shift:push_pull`。
- `no_shift_side_crate_pull_front_gate` 在同一右侧站位执行 `left`，因为仍在 L 侧而 `pull_world_front_blocked`。

结构旋钮：

- 是否先移动 P/L：mixed downshift / no shift。
- 被重写的格：旧 L 行侧边站位是否落入新 P 侧。
- consumer 对象：侧边 crate 是否贴着 P/L，可否推入 anchor。
- 绕行通道：玩家是否能到达右侧站位。

变体谱与共同解释：

- mixed downshift 把 P 行从原 y=3 改到 y=4，旧 L 行 y=4 被重标为 P 侧。
- no shift 时 y=4 仍是 L 侧，玩家朝 crate 走入被 pull 规则拒绝。
- 这个 family 的主体不是普通箱链，而是 P/L anchor 移动后重新定义动作语义。

推荐 probe：

- 加一个目标口袋或单格门，让第二步推入的侧边 crate 直接打开 / 关闭通道。
- 比较水平 P/L 左右移动时是否存在同构的列重写。

证据：

- `run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_mixed_force_chain_wall`
- `cases=mixed_downshift_rewrites_side_crate_to_push,no_shift_side_crate_pull_front_gate`
- `tags=runtime_observed,graph_complete,mixed_force_chain,anchor_boundary_shift,boundary_rewrite,gate_counterexample`

建议 curator 决策：`promote`

不应进入 lexicon 的部分：

- `no_shift_side_crate_pull_front_gate` 不能单独入库，它只是门控反例。
- 不把最终可达图中其它 reachable force chains 当作证据；证据只来自脚本动作回放。
- 不声称不可回返：positive case 的 return search 为 `exhausted: state budget exceeded`。

结论范围校准：

- 已支撑：混合链移动 P/L 后，后续 crate 动作的 push/pull 语义可被重写并消费。
- 未覆盖：目标消费、水平同构、更多边界移动距离。
- 不应入库：只说“P/L 移动了”的 event witness。
- 是否打开新题材：是，打开了“移动 P/L anchor 后的 crate 语义重写 consumer”。

## 3. L 侧 pull 混合链门矩阵：玩家前格门与 crate 目标墙

语料化结果：

- Designer 可用装置：横向 P/L 在 L 侧被 pull 时，非接触半格目标上的 crate 可以被同链带走；墙可以分别关掉玩家前格和 crate 的目标格，得到两种不同失败理由。
- 最小形式：

```text
开放：上方玩家前格和 crate 目标格都开放
########
#G.....#
#..C@..#
#..PL..#
#......#
########
up => pull_object:push_pull_anchor + force_chain:n2 + anchor_boundary_shift

玩家前格墙：
########
#G..#..#
#..C@..#
#..PL..#
#......#
########
up => destination_blocked

crate 目标墙：
########
#G.#...#
#..C@..#
#..PL..#
#......#
########
up => force_blocked
```

- 适用变体：横向 P/L，玩家在 L 侧上方或下方 pull；crate 位于非接触半格的目标格上，能被 anchor footprint 推到下一格。
- 输入接口：玩家必须在 L side；玩家前格必须开放；crate 目标格是否开放可控。
- 输出接口：开放时 P/L 与 crate 同链移动；玩家前格墙给 `destination_blocked`；crate 目标墙给 `force_blocked`。
- 自然消费方式：作为横向把手门矩阵的 mixed-chain扩展，用墙位区分“动作入口被关”还是“被携带对象 footprint 被关”。
- 误用边界：如果 crate 不在非接触半格目标格上，pull 只移动 P/L；如果玩家不在 L 侧，变成 push 规则；如果只记录失败理由，没有开放正例，不足以形成语料。
- 组合例句：`L pull handle -> carried crate gate -> side pocket`：玩家先抽 P/L，同时把侧边 crate 带进一格高口袋；若墙放在玩家前格，动作根本启动不了；若墙放在 crate 目标格，动作启动检查中被拒绝。

机制角色：

- active_rule：`pull_force` 的玩家前格检查与 `planObjectMove` 的 footprint/chain 目标检查。
- material_source：横向 P/L anchor 与 crate。
- consumer：玩家前格墙、crate 目标墙。
- incidental：目标 `G` 只用于 runtime 合法解析。

关键观察点：

- `l_pull_anchor_carries_side_crate_open` 的 `up` 合法，事件为 `pull_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull`。
- `l_pull_anchor_front_wall_gate` 的 `up` 直接 `destination_blocked`，没有 force chain 事件。
- `l_pull_anchor_crate_target_wall_gate` 的 `up` 为 `force_blocked`，说明 front gate 已通过，失败发生在 carried crate 的目标格。

结构旋钮：

- 玩家前格：开放 / 墙。
- carried crate 目标格：开放 / 墙。
- P/L 横向朝向：本轮只测 P 左 L 右。
- pull 方向：本轮只测向上 pull。

变体谱与共同解释：

- open case 证明 L pull 可以形成 P/L + crate mixed chain。
- front wall case 是动作入口门。
- crate target wall case 是对象 footprint 门。
- 这不是普通 crate pull，因为首个被拉对象是 P/L anchor，crate 是由 anchor footprint 目标触发进链。

推荐 probe：

- 与既有 `P/L 横向把手` 合并时，补一个向下 pull 或 P/L 反向朝向可增强矩阵完整性。
- 若要独立 promote，需要把 carried crate 接到目标或通道 consumer，而不是只停在门分类。

证据：

- `run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_mixed_force_chain_wall`
- `cases=l_pull_anchor_carries_side_crate_open,l_pull_anchor_front_wall_gate,l_pull_anchor_crate_target_wall_gate`
- `tags=runtime_observed,graph_complete,mixed_force_chain,anchor_boundary_shift,wall_gate_matrix`

建议 curator 决策：`supplement`

不应进入 lexicon 的部分：

- 不把 front wall 和 crate target wall 两个失败例单独升 family。
- 不把 positive case 的 `returnToInitial.status=exhausted` 写成不可回返。
- 不把它写成普通 pull crate；关键是 P/L anchor pull 把 crate 纳入同一 force chain。

结论范围校准：

- 已支撑：L 侧 pull P/L 可以携带 crate，且墙位能分离 front gate 与 carried-object target gate。
- 未覆盖：向下 pull、P/L 反向、后续目标消费。
- 不应入库：只列失败理由的规则复述。
- 是否打开新题材：否，更适合作为 `P/L 横向把手` 的 mixed-chain supplement。
