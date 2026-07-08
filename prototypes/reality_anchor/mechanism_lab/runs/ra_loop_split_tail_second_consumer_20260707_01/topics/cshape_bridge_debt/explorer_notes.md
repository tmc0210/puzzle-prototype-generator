# Explorer Notes: cshape_bridge_debt

## 执行边界

- 角色：explorer。
- topic：C 形固定 B/S 断桥后，左柱 crate 桥债能否接入单格通道、墙口或回返格作为第二段 consumer。
- run_id：`ra_loop_split_tail_second_consumer_20260707_01_cshape_bridge_debt`
- runner：使用 `npx tsx src/cli.ts mechanism-lab-run ... --write` 成功生成本目录 runner 产物。
- 注意：`returnToInitial.status=exhausted` 未被当作不可回返证据；这里只使用动作回放、最终动作表和 bounded graph complete 的局部差异。

## 候选结构族草图

1. `cshape_bridge_single_cell_mouth`：C 形断桥后，左柱中格 crate 被单格墙口接收；未切断 C 形被上下墙齿阻断。
2. `cshape_bridge_width_shortcut`：把墙口从单格放宽到三格，未切断 C 形也能整体进入，桥债差异被绕过。
3. `cshape_bridge_stand_gate`：切断事件发生，但通往桥债施力格的站位门关闭，只剩事件 witness。
4. `pre_split_endpoint_no_bridge`：端点预分离但没有左柱桥债，同动作变成 walk，不能证明 bridge consumer。
5. `bridge_then_upper_endpoint_order`：先消费左柱桥债，再把上端点推入目标袋，测试顺序是否干扰。
6. `upper_endpoint_then_bridge_order`：先完成上端点目标袋，再回到左柱桥债墙口，测试端点消费后的回返路径。
7. `bridge_return_cell_blocker`：左柱 crate 进入回返格后，决定玩家是否还能回到端点施力位。
8. `bridge_channel_width_spectrum`：同一 C 形输出接 1 格 / 2 格宽通道，比较 crate 债是否仍被约束。

本轮实际执行第 1 个结构族，并用第 2、3、4 个作为同一 patch 的近邻反例 / shortcut。

## 已执行 cases

| case | 角色 | 关键结果 |
| --- | --- | --- |
| `split_bridge_narrow_mouth_pass` | 正例 | 第一步 `sticky_to_box:n3,sticky_split:n1` 产生左柱 crate 桥；最后一步 `left` 为 `push_object:crate#2`，中格 crate 进入单格墙口。 |
| `unsplit_cshape_narrow_mouth_block` | 未切断反例 | 同一动作串最后一步 `left` 为 illegal，reason=`force_blocked`；整体 C 形 footprint 被上下墙齿挡住。 |
| `pre_split_endpoint_no_bridge_walk` | 预分离无桥债反例 | 同一位置没有中格 bridge debt；最后一步 `left` 是 `walk`，因此不能证明桥债消费。 |
| `unsplit_cshape_wide_mouth_shortcut` | 过宽 shortcut | 打开上下墙齿后，未切断 C 形同动作合法，并在宽口内再被边界切开；该成功不隔离“已生成的左柱 crate 桥债”。 |
| `split_bridge_stand_gate_event_only` | 站位门关闭 | 第一步仍有 `sticky_to_box:n3,sticky_split:n1`，但第二步 `down` 为 `destination_blocked`；只能作事件 witness，不应入库为 family。 |

## 关键观察

`split_bridge_narrow_mouth_pass` 的第二段消费不是端点进目标，也不是 `sticky_split` 事件名。动作回放显示，C 形被切断后留下的左柱 crate 中格成为独立可推对象；单格墙口只接收这个 crate。未切断对照保持 connected sticky footprint，同一施力会试图整体移动 C 形，上下端点同时撞墙，得到 `force_blocked`。这隔离出“左柱 crate 桥债被单格墙口消费”的差异。

预分离端点对照说明：端点独立性本身不足以证明桥债消费。没有左柱桥债时，同一最后动作退化为玩家走入空格，观察点从 `push_object:crate#2` 消失。

过宽口对照说明：如果二段 consumer 宽到允许完整 C 形进入，未切断反例会变成成功，随后可能在更左侧再次被 B/S 边界切开。这是 shortcut，不应把成功归因给“已断桥后的 crate 桥债”。

站位门关闭对照说明：即使第一步发生 `sticky_to_box:n3` 和 `sticky_split:n1`，玩家无法到达桥债施力格时，结构只证明事件可发生，不证明第二段 consumer。

## Topic coverage

- 切断 C 形后 crate 桥债进入二段 consumer：已覆盖，`split_bridge_narrow_mouth_pass`。
- 未切断 C 形同动作失败或表现不同：已覆盖，`unsplit_cshape_narrow_mouth_block`。
- 预分离端点但没有桥债：已覆盖，`pre_split_endpoint_no_bridge_walk`。
- 桥债通道 / 回返格过宽导致 shortcut：已覆盖，`unsplit_cshape_wide_mouth_shortcut`。
- 站位门关闭导致只剩事件 witness：已覆盖，`split_bridge_stand_gate_event_only`。

## 收口判断

证据支持一个窄口 supplement：`固定 B/S 断桥` 不只输出端点独立性，也输出可被二段墙口消费的左柱 crate 桥债。当前 run 尚未把“上端点目标袋完成”与“桥债墙口消费”串成同一解题顺序，因此建议先作为 existing lexicon entry 的补强 probe，而不是单独新 family。
