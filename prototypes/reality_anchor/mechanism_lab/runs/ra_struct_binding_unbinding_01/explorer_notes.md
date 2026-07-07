# 探索笔记：绑定债与解绑定债的局部结构谱

## 本轮假设

本轮不验证 Reality Anchor 的基础规则。B/S 边界、crate/sticky 归一化、sticky 正交合并、sticky 刚体移动都视为 runtime 公理。

探索目标是把这些公理组织成 designer 可直接使用的局部结构语料：

- **绑定债**：多个可分配 crate 被压成一个 sticky 刚体后，designer 得到的是一个形状化工具/阻塞物，同时失去独立资源。
- **解绑定债**：一个 sticky 刚体被切回 box 侧后，designer 回收 crate 部件；切割线相对 footprint 的位置决定释放出的资源形态。

## 有效比较

### binding_debt_sticky_topology

有效旋钮不是“crate 是否变 sticky”，而是 **crate 邻接图 + 地形余量**。

- `bind_bar_open`：两个相邻 crate 沿施力轴压入 sticky 侧后，最终成为 2 格横条。开放房间中最终四向动作都可用，说明它更像可递送工具，而不是天然锁。
- `bind_l_corner`：在横条基础上晚加入上方 crate，最终形成 L 形 sticky footprint。最终 `up` 为 `force_blocked`，显示 L 形的占角性质会立刻改变局部把手。
- `bind_gap_keeps_parts`：两个 crate 都进入 sticky 侧，但隔一行，最终保留两个独立 sticky 部件。这是关键误用边界：材质转换不等于资源绑定。
- `bind_bar_choke`：同一个 2 格横条放进单行走廊，最终只剩左右轴向处理，回到初始在该小图中 complete 搜索为 no。这说明地形余量决定绑定债是“工具”还是“宽塞”。

### unbinding_debt_resource_release

有效旋钮不是“sticky 是否变 crate”，而是 **切割线覆盖 footprint 的哪一部分**。

- `unbind_head_slice_once`：横条切头后得到 `crate + sticky tail`，designer 可先释放一个部件，同时保留尾部债。
- `unbind_full_bar_twice`：连续两次切割把横条完全拆成两个 crate，是完整资源回收端点。
- `unbind_l_neck`：L 形从颈部切入，一次释放竖向双 crate，同时留下一个 sticky 尾；释放出的资源形态不同于横条切头。
- `unbind_vertical_full_release`：竖条整列从侧面跨界，一次释放为竖向双 crate，不留下 sticky 尾。
- `unbind_parallel_carry`：沿边界方向搬运时保留 sticky 刚体；这不是失败，而是 designer 可用的“调整位置但不解债”边界。

## 被修正的解释

- “边界扫过/跨界会改变材质”不是成果，只是规则读解。
- “sticky 会合并/分裂”不是成果，只是规则读解。
- 本轮真正可用的解释是：**邻接图和切割线把对象资源从“多个可分配部件”改写为“单个形状化工具”，或反向改写。**
- 解绑定组的开放房间变体大多最终四向动作都合法，因此不能声称它们自身制造强动作锁；它们主要提供资源形态语料。若需要顺序压力，应把这些释放形态接到走廊、目标口、P/L 把手或后续 force-chain 上。

## 不建议提交 curator 的弱结论

- 不收录“B/S 边界能把 crate 变 sticky / sticky 变 crate”。
- 不收录“正交 sticky 会合并”。
- 不收录“沿边界移动不会切割”作为独立条目；它只应作为解绑定债的误用边界。
- 不把 `bind_bar_choke` 的 no-return 泛化到所有走廊长度；它只支持这个极小单行构型内的宽塞用法。

## 下一轮建议

- 对绑定债补一组“同一 sticky footprint 接入目标口/门口”的变体，比较横条、L 形、隔行部件在后续消费链中的差异。
- 对解绑定债补一组受限地形：把释放出的 crate 对齐到单格门、双格门、死角旁，观察资源释放是否立刻变成顺序压力。
- 组合 P/L 把手时优先使用本轮的对象拓扑作为输入，不再重新验证 B/S 基础事件。
