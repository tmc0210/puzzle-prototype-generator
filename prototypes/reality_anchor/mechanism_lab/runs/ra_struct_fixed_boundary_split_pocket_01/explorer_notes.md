# 探索记录：ra_struct_fixed_boundary_split_pocket_01

## 探索简报

- `prototype`: Reality_Anchor (`reality_anchor`)
- `scope`: 横向 sticky 二连块跨过固定 B/S 边界后，被切成 `C+M`，再由单格目标袋消费。
- `exclusions`: 不进入完整关卡设计；不组装候选包；不调用批评或审查流程；不读取设计归档、人类评价、历史候选、采样配置、硬编码布局模板、旧实验 run 或历史报告。
- `source_boundary`: 允许读取技能协议、curator rubric、本地 run 格式、仓库级 mechanism lab 边界、当前 `mechanic.yml`、当前 Reality Anchor runtime / CLI / 本地实验 runner、当前 lexicon。禁止读取历史设计材料。
- `run_intent`: `explore_then_curate`。

## 本轮 primitive 引用

- `push_force`: 推动相邻对象；横向 sticky 二连块作为一个刚体被整体移动。
- `box_sticky_normalize`: 推动后按固定 B/S 边界把左格变为 crate、右格保留 sticky，或让两格都保持 sticky / crate。
- `sticky_merge`: 未被切开的 sticky 二连块保持刚体 footprint。
- `target_cover_win`: 单格目标袋作为最小消费约束；它不是完整关卡目标设计。

## 候选结构族草案

1. `fixed_boundary_split_pocket_consumption`: sticky 二连块跨固定 B/S 边界，被切成 `C+M`，单格目标袋只消费左格。已执行。
2. `fixed_boundary_split_side_handle`: 固定边界把横条切开后，侧向把手只作用于 crate，不再拖动 sticky 尾巴。过滤：需要先证明目标袋消费，本轮先做更小版本。
3. `fixed_boundary_partial_l_unbind`: L 形 sticky 跨固定边界后切成 `C+MM` 或 `CC+M`。过滤：形状谱更大，适合作为下一轮扩展。
4. `split_tail_force_chain_shortcut`: `C+M` 相邻时，从水平侧推仍会形成 force chain shortcut。过滤：是本轮误用边界，不单独升族。
5. `all_box_same_pocket`: 两个 crate 在同袋口中天然可分离。作为本轮正对照执行。
6. `all_sticky_two_cell_mouth`: 未切开的刚体只要给双格口就能通过。作为本轮修正解释的边界执行。
7. `moving_boundary_same_output`: 移动 B/S anchor 刷出同样 `C+M`。过滤：当前 lexicon 已有移动边界刷，避免重复。
8. `fixed_boundary_split_with_goal_before_cut`: 目标位放在切割前路径上。过滤：容易变成目标覆盖事件 witness，不如后置目标袋清楚。

## 选择理由

选择 `fixed_boundary_split_pocket_consumption`，因为它有清晰的 producer -> consumer 链条：

- producer：固定 B/S 边界把一个 sticky 刚体切成 `C+M`。
- consumer：单格目标袋只允许左格上推，区分“可分配 crate”与“未切开的 sticky footprint”。
- 反例：未切开的 sticky 在同一单格袋口失败；打开双格袋口后又能成功。
- 边界 case：全箱资源也能通过，说明成功来自“可分离左格”，不是 `sticky_to_box` 事件本身。

## 本轮假设

如果横向 sticky 二连块跨过固定 B/S 边界后被切成 `C+M`，那么左格 crate 可以被单格目标袋单独消费；同形未切开的 sticky 刚体会因为右格上方是墙而被拒绝。

## 有效比较

- `split_tail_single_pocket_pass`: 第一推产生 `sticky_to_box:n1`，输出 `C+M`；后续 `up` 合法，把 crate 推入目标。
- `all_sticky_single_pocket_block`: 第一推仍是 `MM`；同一站位 `up` 为 `force_blocked`。
- `all_sticky_two_cell_pocket_pass`: 保持 `MM`，但右上墙格打开后，`up` 合法，说明失败来自单格袋口消费 footprint。
- `all_box_single_pocket_pass`: 同形 `CC` 在单格袋口中也能只推左格，说明本轮核心输出是“可分配左格 + 留尾”，不是单纯材质事件。

## 被修正的解释

- “固定边界切开后才可进入目标袋”过窄；全箱对照也能进入，真正变量是对象是否仍为一个刚体 footprint。
- “sticky 刚体不能进目标袋”过宽；双格目标袋对照说明只要 footprint 前沿都开放，刚体也能整体进入。
- `returnToInitial.status=exhausted` 只表示回返预算不足。本轮不把它写成不可回返证据。
- 可达图里出现 anchor boundary shift，是开放房间可达枚举中的旁支；本轮主证据来自指定动作回放与近邻对照。

## 不建议提交 Curator 的弱结论

- “sticky 跨 B/S 会变成 crate”：规则复述，不是结构族。
- “C+M 比 MM 好”：过抽象；必须绑定到单格目标袋或类似消费面。
- “目标被覆盖所以结构成立”：目标覆盖只是消费结果，结构成立来自四个近邻变体的动作差异。

## 下一轮建议

- 扩展到 L 形和三格横条：比较 `C+MM`、`CC+M`、`MMM` 在同一单格/双格目标袋里的动作差异。
- 加一个反事实：禁用 `box_sticky_normalize` 后，验证 `split_tail_single_pocket_pass` 退化为未切开的 footprint。
- 把该固定边界切割输出接到“刚体墙口回返谱系”，测试它是否能作为更长 composition probe 的 producer。
