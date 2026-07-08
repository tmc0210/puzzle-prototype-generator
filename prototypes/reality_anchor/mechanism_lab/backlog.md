# Reality Anchor 机制探索 Backlog

本文件只记录当前值得探索的新设计空间或组合空间，给 mechanism loop 选题时作为 seed 之一。它不是历史 refresh，也不是维护债清单。已关闭 gap 的 provenance 保留在 `lexicon.md` 的证据段和 `runs/` 中，默认不再放在 backlog 入口。

## ra_gap_split_tail_second_consumer

- 状态：open
- 来源：`固定 B/S 切割`、`固定 B/S 断桥`
- 设计空间：第一段切割 / 断桥输出的尾债或 crate 桥债，被第二段墙口、通道或目标消费。
- 输入接口：`C+M`、`C+MM`、`CC+M`、`MMM`，或 C 形断桥后的 crate 桥。
- 预期产物：可处理左格 / 端点已经被第一 consumer 消费后，剩余 sticky tail、crate bridge 或残余连体块成为第二段输入。
- 最小 consumer：单格袋回填后，尾巴进入窄通道、占住回返格，或 crate 桥被墙口 / 目标口消费。
- 建议对照：尾债被消费正例、空间过宽 shortcut、未切割 / 未断桥反例、尾债长度变化。
- 不要重复：不要把 `sticky_to_box` 或 `sticky_split` 事件本身写成成果。
- 语料化收口规则：若只是固定 B/S 切割条目的尾债补强，走 supplement；若形成稳定“切割输出 -> 二段债务消费”链，写 recipe。

## ra_gap_boundary_brush_goal_fill

- 状态：open
- 来源：`B/S 移动边界刷产物`
- 设计空间：移动 B/S 边界先选择远处产物，再把不同产物送入同一目标回填需求。
- 输入接口：可移动 B/S anchor、远处 `CC`、`C+M`、`C+MM`、2x2、双柱等资源形状。
- 预期产物：不同刷产物覆盖目标后留下不同尾债、连体块阻塞或 shortcut。
- 最小 consumer：目标数量、目标口宽、尾债通道宽度和低墙位置消费刷产物差异。
- 建议对照：目标少一格、通道宽一格、低墙错位、push / pull driver 只作输入侧对照。
- 不要重复：不要把 push 刷、pull 刷拆成新顶层条目，除非 driver 额外制造门。
- 语料化收口规则：若消费方式仍是门口谱，merge / supplement；若目标回填形成新消费口，补 lexicon 或 recipe。

## ra_gap_pl_ratchet_drives_brush

- 状态：open
- 来源：`P/L 长轴墙廊`、`B/S 移动边界刷产物`
- 设计空间：P/L 长轴墙廊的停位容量作为 driver，稳定驱动 B/S 移动边界刷出正确产物。
- 输入接口：L 端余量 1 / 2、B/S anchor 与 P/L 的相对位置、刷线距离、侧廊开闭。
- 预期产物：P/L 只能移动到某个停位时，B/S 边界刚好刷出正确产物；余量多一格或少一格产生错误产物或 shortcut。
- 最小 consumer：`P/L 长轴棘轮 -> B/S 边界刷产物 -> 门口消费` 的三段最小链。
- 建议对照：余量多一格、余量少一格、刷线偏一格、侧廊开放 shortcut。
- 不要重复：不要只证明 P/L 在墙廊单向；不要把所有差异写成新 P/L 顶层条目。
- 语料化收口规则：若棘轮只提供 driver，写 recipe / supplement；若墙廊同时创造新的站位门，再考虑新 family。

## ra_gap_pl_handle_brush_shortcuts

- 状态：open
- 来源：`P/L 横向把手`、`B/S 移动边界刷产物`
- 设计空间：P/L 横向把手门是否实际决定移动 B/S 边界刷能否启动，或是否产生绕过。
- 输入接口：P 侧 push、L 侧 pull、玩家前格墙、锚点另一半目标墙、首步后回返门、B/S 刷线位置。
- 预期产物：同一刷产物需求下，不同墙格关闭玩家动作、锚点占格目标或回返门，导致不同刷产物或 shortcut。
- 最小 consumer：把 P/L 横向把手作为移动 B/S anchor 的唯一驱动入口，并接到门口消费。
- 建议对照：玩家前格墙、锚点半格目标墙、回返门墙、刷线偏移。
- 不要重复：不要只报告 `destination_blocked` / `force_blocked`，必须接到刷产物或门口消费。
- 语料化收口规则：若只是已有把手门的下游证据，supplement；若 push / pull driver 产生不同可组合接口，补充结构谱。

## ra_gap_pull_sweep_sticky_blocker

- 状态：open
- 来源：`P/L pull 抽取把手`
- 设计空间：pull 抽取时，侧向 blocker 从 crate 换成 sticky 后，扫带资源是移交、合并还是关闭。
- 输入接口：玩家在 pull 侧，身后为垂直 B/S 或其他二格对象；侧向目标位为空、墙、crate、单格 sticky 或二格 sticky。
- 预期产物：同一 pull 抽取下，blocker 类型改变后续动作集合或资源形态。
- 最小 consumer：crate 成功扫带与 sticky 失败 / 合并对照，证明 blocker 类型被抽取结构消费。
- 建议对照：空格、墙、crate、单格 sticky、二格 sticky；玩家前格保持相同。
- 不要重复：不要只测试玩家前格墙；不要只测单 crate。
- 语料化收口规则：若只是 blocker 类型补充，supplement；若 sticky blocker 产生新的刚体合并接口，考虑新 gap。

## ra_gap_split_endpoints_double_distribution

- 状态：open
- 来源：`固定 B/S 断桥`
- 设计空间：断桥后上下 sticky 端点分别被两个消费口消费，形成端点分配结构。
- 输入接口：C 形 sticky 断桥输出的上端点、下端点和左柱 crate 桥债。
- 预期产物：切断后两个端点可分别进入两个消费口；未切断或站位关闭时失败。
- 最小 consumer：上下两个单格消费口分别消费独立端点。
- 建议对照：上端点目标、下端点目标、左柱 crate 桥位置、站位门开闭、目标口放宽 shortcut。
- 不要重复：不要把预分离端点成功当成边界切断证据。
- 语料化收口规则：如果只是断桥条目的强化，supplement；如果形成“端点分配器”稳定结构，补 lexicon 条目。
