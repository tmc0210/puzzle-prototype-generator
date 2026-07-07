# Reality Anchor 机制探索 Backlog

本文件记录当前值得继续探索的缺口，给 controller / curator 生成短周期 explorer brief。它不是历史 refresh，也不是正式语料正文。Explorer 可以建议新增或关闭 gap，但 curator 负责维护本文件。

## ra_gap_bind_to_mouth_composition

- 状态：open
- 来源：`B/S 绑定债`、`刚体黏块 + 墙口`
- 为什么现在值得跑：当前两条都各自有 consumption probe，但 producer 输出与 consumer 输入还缺系统串接。
- 要比较的局部变量：2 格横条、3 格横条、4 格横条、L 形、桥接端点后的 connected footprint；同一墙口 / 目标口宽。
- 成功标准：至少一个正确 footprint 被墙口消费，一个相邻错误 footprint 失败或产生 shortcut，一个口宽变化修正解释。
- 不要重复：不要再证明 crate 跨 B/S 会变 sticky；不要只观察 `move_sticky_rigid` 事件。
- 推荐 probe：把绑定债产物直接接入反向施力格墙口，比较推进后回返格是否存在。
- 收口规则：若差异只来自已有墙口谱系，作为两个条目的 composition recipe；若出现新的 footprint 选择器，再考虑补充 lexicon。

## ra_gap_split_tail_second_consumer

- 状态：open
- 来源：`固定 B/S 切割`、`固定 B/S 断桥`
- 为什么现在值得跑：切割和断桥已经证明目标袋可消费左格或端点，但尾债 / crate 桥债还没有被第二段结构充分消费。
- 要比较的局部变量：`C+M`、`C+MM`、`CC+M`、`MMM`、C 形断桥后的 crate 桥；单格袋、双格袋、侧墙把手、尾债通道。
- 成功标准：证明同一第一段成功输出在第二段产生不同债务处理；至少包含一个尾债被消费的正例和一个尾债空间过宽导致绕过的 shortcut。
- 不要重复：不要把 `sticky_to_box` 或 `sticky_split` 事件本身写成成果。
- 推荐 probe：单格目标袋回填后，要求尾巴进入窄通道或占住回返格。
- 收口规则：若只是固定 B/S 切割条目的尾债补强，走 supplement；若形成稳定“切割输出 -> 二段债务消费”链，写 recipe。

## ra_gap_boundary_brush_goal_fill

- 状态：open
- 来源：`B/S 移动边界刷产物`
- 为什么现在值得跑：现有门口消费证明产物差异，但目标回填场景更接近 designer 会检索的输入 / 输出接口。
- 要比较的局部变量：`CC`、`C+M`、`C+MM`、2x2、双柱；目标数量、目标口宽、尾债通道宽度、低墙位置。
- 成功标准：同一目标回填需求下，不同刷产物产生不同剩余债务或 shortcut；至少一个目标少一格 / 通道宽一格的反例。
- 不要重复：不要把 push 刷、pull 刷拆成新顶层条目，除非 driver 额外制造门。
- 推荐 probe：移动边界先选择产物，再把产物送入同一目标口，观察目标覆盖和剩余 footprint。
- 收口规则：若消费方式仍是门口谱，merge / supplement；若目标回填形成新消费口，补 lexicon 或 recipe。

## ra_gap_pl_ratchet_drives_brush

- 状态：open
- 来源：`P/L 长轴墙廊`、`B/S 移动边界刷产物`
- 为什么现在值得跑：P/L 棘轮目前证明的是位移容量，尚未证明这个单向位移作为 driver 被下游边界刷稳定消费。
- 要比较的局部变量：L 端余量 1 / 2、B/S anchor 与 P/L 的相对位置、刷线距离、侧廊是否开放。
- 成功标准：P/L 只能移动到某个停位时，B/S 边界刚好刷出正确产物；余量多一格或少一格产生错误产物或 shortcut。
- 不要重复：不要只证明 P/L 在墙廊单向；不要把所有差异写成新 P/L 顶层条目。
- 推荐 probe：`P/L 长轴棘轮 -> B/S 边界刷产物 -> 门口消费` 的三段最小链。
- 收口规则：若棘轮只提供 driver，写 recipe / supplement；若墙廊同时创造新的站位门，再考虑新 family。

## ra_gap_pl_handle_brush_shortcuts

- 状态：open
- 来源：`P/L 横向把手`、`B/S 移动边界刷产物`
- 为什么现在值得跑：横向把手门已经分类，但还缺“把手门是否实际决定边界刷能否启动 / 是否绕过”的下游消费。
- 要比较的局部变量：P 侧 push、L 侧 pull、玩家前格墙、另一半 footprint 墙、首步后回返门、B/S 刷线位置。
- 成功标准：同一刷产物需求下，一个墙格关闭玩家动作，一个墙格关闭 anchor footprint，一个墙格只关闭回返；三者导致不同后续刷产物或 shortcut。
- 不要重复：不要只报告 `destination_blocked` / `force_blocked`，必须接到刷产物或门口消费。
- 推荐 probe：把 P/L 横向把手作为移动 B/S anchor 的唯一驱动入口。
- 收口规则：若只是已有把手门的下游证据，supplement；若 push / pull driver 产生不同可组合接口，补充结构谱。

## ra_gap_pull_sweep_sticky_blocker

- 状态：open
- 来源：`P/L pull 抽取把手`
- 为什么现在值得跑：侧向 crate 已证明会从封门变成扫带资源；sticky blocker 可能把扫带变成刚体合并或 footprint 关闭。
- 要比较的局部变量：侧向 blocker 为空、墙、crate、单格 sticky、二格 sticky；被拉对象为垂直 B/S 或其他二格 footprint。
- 成功标准：同一 pull 抽取下，blocker 类型改变后续动作集合或资源形态；至少一个 crate 成功扫带与 sticky 失败 / 合并的对照。
- 不要重复：不要只测试玩家前格墙；不要只测单 crate。
- 推荐 probe：垂直 B/S pull 侧向目标位放 sticky，观察是否合并、同步移动或 force blocked。
- 收口规则：若只是 blocker 类型补充，supplement；若 sticky blocker 产生新的刚体合并接口，考虑新 gap。

## ra_gap_split_endpoints_double_distribution

- 状态：open
- 来源：`固定 B/S 断桥`
- 为什么现在值得跑：当前只证明上端点目标袋消费端点独立性，还缺上下端点分别被两个消费口消费的结构。
- 要比较的局部变量：上端点目标、下端点目标、左柱 crate 桥位置、站位门开闭、目标口宽。
- 成功标准：切断后两个端点能分别进入两个消费口；未切断或站位关闭时失败；目标口放宽时出现 shortcut。
- 不要重复：不要把预分离端点成功当成边界切断证据。
- 推荐 probe：先切断 C 形，再要求上下端点分别填两个单格口。
- 收口规则：如果只是断桥条目的强化，supplement；如果形成“端点分配器”稳定结构，补 lexicon 条目。
