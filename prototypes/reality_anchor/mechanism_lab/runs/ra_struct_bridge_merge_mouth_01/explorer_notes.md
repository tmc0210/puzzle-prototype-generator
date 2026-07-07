# 探索记录：B/S 桥格合并后由目标口宽消费

运行 ID：`ra_struct_bridge_merge_mouth_01`

范围：

- 原型：`Reality_Anchor`
- 本轮只做局部机制 explorer，不进入关卡设计。
- 不读取历史设计归档、候选包、报告、采样配置或旧实验 run 材料。
- 可用上下文限于当前规则、runtime 行为、local experiment runner、策展 rubric，以及当前 lexicon 的去重判断。

## 本轮局部问题

之前的结构已经能说明 B/S 边界会把 crate 转成 sticky，并且相邻 sticky 会合并成刚体。本轮追问更局部的一点：

如果一个 crate 从 box side 跨入 sticky side 时，正好落在两个分离 sticky 端点之间，它会不会作为“桥格”把端点接成一个新的刚体 footprint？这个输出能否被一个极小目标口宽消费？

## 可用原语

- B/S 固定边界：crate 右推跨线后触发 `box_to_sticky`。
- sticky 正交邻接：新 sticky 与上下端点正交相邻时触发 `sticky_merge`。
- sticky 刚体推动：连接后的 sticky component 会作为一个 footprint 共同移动。
- 墙口 / 目标口：中格是目标，上下格是否开口决定 footprint 能否整体进入。

## 候选结构族扫描

1. 桥格合并两个端点，然后单格目标口拒绝。
2. 无端点时，单格 sticky 进入同一目标口。
3. 桥格合并两个端点，但三格口宽允许整体进入。
4. 桥格只合并一个端点，二格 footprint 仍被单格口拒绝。
5. 上下端点换成横向端点，测试口宽消费是否只依赖正交 footprint。
6. 桥格先变 sticky，再由移动 B/S 刷子切回 crate，测试是否能解开桥债。
7. 桥格合并后接回返墙口，测试合并 footprint 是否也能被反向施力格消费。
8. 桥格合并后把目标口改成两个分离目标，测试目标覆盖是否能区分一体与两体。

本轮实际跑 1-4。它们足够形成 proposed family，并满足 curator rubric 中的正例、反例、边界修正和 consumption probe。

## 假设与对照

- 假设 A：桥格只改变材质，不改变对象连接。
  - 反证：`bridge_merge_single_mouth_block` 和 `bridge_merge_triple_mouth_pass` 首步都有 `box_to_sticky:n1, sticky_merge:n1`，后续按整体 footprint 检查。
- 假设 B：目标口拒绝的是 sticky 材质。
  - 反证：`no_endpoints_single_mouth_pass` 的单格 sticky 能进入同一目标口。
- 假设 C：目标口拒绝的是三格高度。
  - 修正：`bridge_merge_upper_only_single_mouth_block` 的二格 footprint 也被拒绝，说明关键是连接 footprint 超出口宽，而不只是“三格”这个长度。
- 假设 D：只要有合并就永远失败。
  - 反证：`bridge_merge_triple_mouth_pass` 打开三格口宽后，合并刚体可以整体推进并覆盖目标。

## 运行结果摘录

- `bridge_merge_single_mouth_block`：首步合法，事件为 `push_object:crate#1, box_to_sticky:n1, sticky_merge:n1`；第二步 `right` 为 `force_blocked`。局部图 complete，181 states。
- `no_endpoints_single_mouth_pass`：首步只有 `box_to_sticky:n1`，第二步 `move_sticky_rigid` 合法，单格 sticky 覆盖目标。局部图 complete，416 states。
- `bridge_merge_triple_mouth_pass`：首步合并，第二步整体推进合法，三格 sticky 覆盖中格目标并通过上下开口。局部图 complete，1330 states；return search 为 exhausted，不能当作不可回返。
- `bridge_merge_upper_only_single_mouth_block`：首步合并成二格 footprint，第二步 `right` 为 `force_blocked`。局部图 complete，328 states。

## 解释修正

最初容易把这轮写成“B/S 生成 sticky 后目标口消费 sticky”。这个解释太粗。更准确的结构变量是：

`crate 跨线位置 + 既有 sticky 端点邻接图 -> 新 sticky component 的 footprint -> 目标口宽消费这个 footprint`

目标口不是在消费 `box_to_sticky` 事件名，也不是消费 sticky 材质本身；它消费的是桥格合并后生成的连接 footprint。无端点时是单格工具，可以通过；一个端点时是二格刚体，会被单格口拒绝；两个端点时是三格刚体，只有三格口宽才能通过。

## 弱结论

- 本轮证明了桥格合并是 `B/S 绑定债` 的一个有效邻接图旋钮：设计侧可以用既有端点决定新 sticky 是否成为桥、桥接几个端点、输出几格 footprint。
- 本轮也证明了一个极小 consumption probe：目标口宽会消费桥接后的 footprint，而不是只展示事件 witness。
- 本轮还没有证明它应该成为独立顶层结构族；它与现有 “B/S 绑定债：箱资源生成刚体 footprint” 的 producer / consumer 接口重合度很高。

## 下一轮建议

- 横向端点桥接：把上下端点换成左右端点，测试同一桥债是否被侧向墙齿消费。
- 桥格解绑定：桥接后用固定 B/S 切割或移动边界刷子把桥格切回 crate，验证“合并债 -> 解债”的 recipe 骨架。
- 双目标口：让上下端点各自对准目标，比较桥接前后是否从两个可分配端点变成一个必须整体处理的 footprint。
- 回返口串接：把桥接输出接到 “刚体黏块 + 墙口” 回返谱系，测试目标口消费以外的 consumer。
