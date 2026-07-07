# 探索记录：ra_struct_sticky_split_pocket_01

## 探索简报

- `prototype`: Reality_Anchor (`reality_anchor`)
- `scope`: C 形 sticky 刚体跨过固定 B/S 边界后，被切成多个组件，再由上端点目标袋消费。
- `exclusions`: 不进入完整关卡设计；不组装候选包；不调用批评或审查流程；不读取设计归档、人类评价、历史候选、采样配置、硬编码布局模板、旧实验 run 或历史报告。
- `source_boundary`: 允许读取技能协议、curator rubric、本地 run 格式、仓库级 mechanism lab 边界、当前 `mechanic.yml`、当前 Reality Anchor runtime / CLI / 本地实验 runner、当前 lexicon。禁止读取历史设计材料。
- `run_intent`: `explore_then_curate`。

## 本轮 primitive 引用

- `push_force`: 玩家横推 C 形 sticky 刚体，使它跨过固定 B/S 边界。
- `box_sticky_normalize`: 跨线后左柱从 sticky 归一成 crate，右侧端点仍为 sticky。
- `sticky_split`: 原来的一个 sticky 来源被切成两个不相邻的 sticky 组件。
- `target_cover_win`: 上方目标袋作为最小消费约束，不作为完整关卡目标设计。

## 候选结构族草案

1. `sticky_split_endpoint_pocket_consumption`: C 形 sticky 被固定边界切断，独立上端点被目标袋消费。已执行。
2. `sticky_split_dual_endpoint_choice`: 切断后上下端点分别可进入不同口袋。过滤：需要更复杂消费面，本轮先验证单端点。
3. `sticky_split_bridge_debt`: 左柱变成 crate 桥后阻断水平推回。过滤：更像本轮输出债务的后续消费。
4. `split_without_stand`: 切断成功但站位被墙吃掉。作为本轮边界 case 执行。
5. `pre_split_endpoint_control`: 端点本来就分离时表现类似切断输出。作为本轮正对照执行。
6. `unsplit_self_collision`: C 形仍是一个刚体时，从端点下方施力会被自身下端点/玩家位置阻断。作为本轮反例执行。
7. `three_cell_bar_middle_cut`: 三格直条跨边界只切出 `C+MM`，不是两个独立端点。过滤：更贴近上一轮 `C+M` 谱系。
8. `moving_boundary_same_split`: 移动 B/S anchor 扫过 C 形，产出同类 split。过滤：driver 改变，不作为本轮主体。

## 选择理由

本轮选择 `sticky_split_endpoint_pocket_consumption`，因为它补上了固定 B/S 切割语料中的一个不同层级：不是把二连块切成 `C+M`，而是把一个连接形状切断成多个 sticky 组件。目标袋消费的是“上端点已经独立”，不是单纯材质变化。

## 本轮假设

如果 C 形 sticky 刚体跨过固定 B/S 边界后，左柱被归一成 crate，那么右侧上下端点会分裂成两个独立 sticky 组件；玩家能从下方只推上端点进目标袋。未切开的 C 形刚体在同一动作上应被整体 footprint 阻断。

## 有效比较

- `split_cshape_upper_pocket_pass`: 第一推产生 `sticky_to_box:n3` 和 `sticky_split:n1`；随后 `up` 合法，单独上端点覆盖目标。
- `unsplit_cshape_upper_pocket_block`: 第一推仍是一个 `MM/M/MM` 刚体；同站位 `up` 为 `force_blocked_by_player`。
- `split_cshape_no_stand_block`: 第一推同样产生 `sticky_split:n1`，但下行站位被墙关闭，消费链停在站位门。
- `pre_split_endpoints_upper_pocket_pass`: 上下端点本来分离时，上端点目标袋表现与切断输出一致。

## 被修正的解释

- “发生 `sticky_split` 就能进目标袋”过宽。`split_cshape_no_stand_block` 说明还需要下方施力站位。
- “C 形 sticky 不能进上方目标”过宽。失败来自仍为一个刚体 footprint 时下端点与玩家站位冲突；切断或预先分离后，上端点可以被单独消费。
- `returnToInitial.status=exhausted` 只表示回返预算不足，本轮不把它写成不可回返结论。
- 可达图里的 anchor 移动事件是开放局部图的旁支；本轮主证据来自指定动作回放与近邻对照。

## 不建议提交 curator 的弱结论

- “B/S 会产生 sticky_split”：这是规则事件 witness，不是结构族。
- “切断总是好”：缺少站位时无法消费，切断也可能只留下难处理的 crate 桥。
- “上端点覆盖目标就是胜利结构”：目标覆盖只是消费面，本轮语料是端点独立性被消费。

## 下一轮建议

- 扩展成双端点选择：上端点、下端点分别接不同目标袋，比较切断后资源分配。
- 把左柱 crate 桥作为债务接入墙口，验证“split 输出 + crate 桥债”的二段消费。
- 跑禁用 `box_sticky_normalize` 的反事实，确认切断消失后目标袋消费失败。
