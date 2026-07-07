# 结构族草案：ra_struct_sticky_split_pocket_01

## sticky_split_endpoint_pocket_consumption

结构族名称：
`sticky_split_endpoint_pocket_consumption`，中文名建议为“固定 B/S 断桥：sticky split 端点目标袋”。

局部问题：
C 形 sticky 刚体跨过固定 B/S 边界后，如果左柱被切回 crate、右侧上下端点被分裂成两个 sticky 组件，上端点是否能被单格目标袋单独消费？

结构旋钮：

- B/S 边界位置：切过 C 形左柱 / 更靠左保留整体 sticky。
- 连接形状：C 形刚体 / 预先分离的上下端点。
- 消费站位：上端点下方是否可站。
- 消费面：上方目标袋只接收上端点，不接收整个 C 形 footprint。

变体谱：

```text
C 形被切断，上端点进目标：
########
###.G..#
###.MM@#
#...M..#
#...MM.#
#..BS..#
########

C 形未切断，同动作被整体 footprint 阻断：
########
###.G..#
###.MM@#
#...M..#
#...MM.#
#.BS...#
########

切断成功，但站位通路关闭：
########
###.G..#
###.MM@#
#...M#.#
#...MM.#
#..BS..#
########

端点预先分离，表现类似切断输出：
########
###.G..#
###.MM@#
#......#
#...MM.#
#..BS..#
########
```

共同解释：
这组结构不是“出现 `sticky_split`”这么简单。有效输出是：一个原本共享 footprint 的 C 形刚体，被固定 B/S 边界切断成“左侧 crate 桥 + 右侧两个独立 sticky 端点”。上方目标袋消费端点独立性：切断后或预先分离时，上端点可单独上推；未切断时，同一上推动作会被整体 footprint 和玩家站位冲突阻断。

输入条件：

- 起始有 C 形 sticky footprint：上端点、左柱桥、下端点正交连接。
- 固定 B/S anchor 的边界可切过左柱，使推后左柱在 box side、右端点在 sticky side。
- 玩家能先从右侧横推 footprint，再绕到上端点下方。
- 上方目标袋能接收单格 sticky，上端点下方站位可被打开或关闭。

输出状态：

- `sticky_split:n1`：一个原 sticky 来源被分成两个 sticky 组件。
- 左柱变为 crate 桥，留下空间债或阻塞债。
- 上端点成为可单独推动的 sticky 组件，可覆盖目标。
- 未切断时仍是 C 形刚体，端点目标袋不能单独消费。

自然消费方式：

- 接目标回填：上端点进目标，下端点或 crate 桥留下后续债。
- 接双端点分配：切断后上下端点可分别进入不同消费口。
- 接刚体墙口：把未切断 C 形作为反例，或把切断后的端点作为小 footprint 输入。
- 接固定 B/S 切割：从二连 `C+M` 扩展到多组件 split。

常见 shortcut：

- 没有下方站位时，`sticky_split` 只是事件 witness，无法被目标袋消费。
- 如果 C 形一开始就不是连接的，成功只能证明“独立端点可消费”，不能证明切断动作必要。
- 如果目标袋改成能容纳整个 footprint，未切断反例可能消失。
- 左柱 crate 桥如果被忽略，后续可能留下未处理债务。

推荐 probe：

- 禁用 `box_sticky_normalize`，确认 `sticky_split:n1` 消失后上端点不能单独进入目标袋。
- 添加下端点目标袋，测试切断后上下端点是否能分别消费。
- 把左柱 crate 桥接入单格通道或墙口，验证 crate 桥债是否能形成第二段消费。

组合例句：
`B/S 绑定债 -> 固定边界断桥 -> 端点目标袋`：玩家先生成一个连接 footprint，再把它推过固定 B/S 边界断开；目标袋消费上端点，下端点或 crate 桥成为下一段输入。这是 recipe 级骨架，不是完整关卡设计。

建议 curator 决策：
`promote`。本轮有 4 个近邻变体，包含正例、反例、站位边界与预先分离对照；并且目标袋实际消费了切断输出的端点独立性。它与“固定 B/S 切割：C+M 尾巴与单格目标袋”相邻，但输出接口不同：这里的主体是 `sticky_split` 造成的多组件端点分配，而不是二连块的左格可分离。

不应进入 lexicon 的 case：
没有单独剔除的 case；四个 case 都服务于同一结构族。`returnToInitial.status=exhausted` 不进入结论。

证据标签：
`runtime_observed`, `bounded_graph`, `graph_complete`, `consumption_probe`。

证据来源：
`run=ra_struct_sticky_split_pocket_01`, `cases=split_cshape_upper_pocket_pass,unsplit_cshape_upper_pocket_block,split_cshape_no_stand_block,pre_split_endpoints_upper_pocket_pass`。
