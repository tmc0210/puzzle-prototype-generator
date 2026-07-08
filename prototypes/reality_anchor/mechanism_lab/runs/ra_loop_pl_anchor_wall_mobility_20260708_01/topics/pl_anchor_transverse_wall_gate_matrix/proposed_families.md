# Proposed Families: pl_anchor_transverse_wall_gate_matrix

## 语料化结果

### Designer 可用装置

`P/L anchor 横/竖把手墙门矩阵`：把 P/L anchor 本体当作一个二格门闩。玩家看似只是在推或拉 anchor，但墙格实际可以分别关闭四层门：

- 玩家前格门：只在 pull 入口上先检查，关闭时给 `destination_blocked`。
- P 半格目标门：anchor 移动后 P 端要占据的目标格，关闭时给 `force_blocked`。
- L 半格目标门：anchor 移动后 L 端要占据的目标格，关闭时给 `force_blocked`。
- 移动后回返门：首步移动成功后，旧把手格附近的反向 pull 前格被墙消费，形成轻量承诺点。

最小形式：

```text
横放 PL，P 侧 push down：

  @
  P L
  p l

p = P 半格目标门；l = L 半格目标门。
任一目标格放墙都会让首步 force_blocked，但它们消费不同半格。
```

```text
横放 PL，L 侧 pull down：

  P L
  p @
    f

f = 玩家前格门，放墙时 destination_blocked。
p = 非接触 P 半格目标门，玩家前格开放后放墙时 force_blocked。
@ = L 半格移动到玩家旧格；直接 pull 中不能独立塞墙。
```

```text
P 侧 push down 后的回返门：

  #      <- 回返 pull 的玩家前格
  . @    <- 玩家走到旧 L 格
  P L    <- 已下移的 anchor

首步已经产生 anchor_boundary_shift:push_pull；墙消费的是后续回返门。
```

```text
竖放 P/L，P 侧横向 push 左右镜像：

右推：        左推：
@ P .        . P @
  L            L

无墙门时两者都移动 anchor，事件与可达图摘要对称。
```

适用变体：

- 横放 `PL`：P 侧 push 下/上；L 侧 pull 下；已有正式条目可合并 pull 上。
- 竖放 `P/L`：P 侧 push 左/右开放镜像。
- 墙格可放在 push 的任一半格目标位、pull 的玩家前格、pull 的非接触半格目标位，或移动后的反向 pull 前格。

输入接口：

- 一个合法的二格 P/L anchor，且玩家能站到 P 侧 push 位或 L 侧 pull 位。
- 目标位附近至少有一个可控墙格，用来指定关闭哪一层门。
- 若测试回返门，首步目标位必须开放，且玩家能走到移动后的旧 L/旧 P 把手格。

输出接口：

- 首步合法：P/L anchor 平移，事件含 `anchor_boundary_shift:push_pull`。
- 玩家前格关闭：首步或回返 pull 给 `destination_blocked`，anchor 不动。
- P/L 半格目标关闭：首步给 `force_blocked`，anchor 不动。
- 回返门关闭：首步已移动 anchor，随后反向把手失败，形成可被后续结构消费的承诺状态。

自然消费方式：

- 墙门分类器：要求玩家识别“这面墙关的是玩家、P 端、L 端，还是移动后回返”。
- 轻量承诺点：首步移动 anchor 后，回返门关闭，玩家需要利用新边界而不能直接撤销。
- 作为移动边界刷子的前置把手：先用矩阵限制 P/L anchor 是否能到达刷线位，再由 B/S 或其他结构消费位移输出。

误用边界：

- 只观察到 `force_blocked` 不够；必须指出是 P 端还是 L 端目标格被墙关闭。
- 把玩家前格门和 footprint 门混写会误导放墙：pull 前格墙是 `destination_blocked`，目标半格墙是 `force_blocked`。
- 直接 L 侧 pull 中，接触的 L 半格目标格是玩家旧格，不能独立放墙；若要关 L 端目标门，应改用 P 侧 push 或另做多步结构。
- 大房间若给出另一个反向把手，会绕过“移动后回返门”。

组合例句：

`P/L 把手墙门 -> 移动边界刷子`：玩家先用 P 侧 push 把 `PL` 下移，但旧 L 格上方的回返门被墙关闭；玩家必须接受新 P/L 边界位置，再用它驱动后续 B/S 刷线，而不能把 anchor 拉回原位重试。

## Family 草案

### 名称

P/L anchor 横/竖把手墙门矩阵

### 机制角色

- active_rule：`push_force` / `pull_force` 对二格 anchor footprint 的目标格检查；pull 中玩家前格检查；移动 anchor 后 `forceModeAt` 重写把手侧并让回返 pull 的前格成为新消费点。
- material_source：P/L anchor 本体；P/L 标签只提供 push/pull half-plane 与二格 footprint。
- consumer：P 半格目标墙、L 半格目标墙、pull 玩家前格墙、移动后回返 pull 前格墙。
- incidental：孤立 `G` 只满足 parser 的目标要求；没有 B/S、crate、sticky 或完整关卡路径参与关键观察点。

### 关键观察点

- `h_p_push_down_p_target_wall` 与 `h_p_push_down_l_target_wall` 的首步都 `force_blocked`，但墙格分别位于 P 半格目标和 L 半格目标；差异不在 runtime reason 字符串，而在被消费的 footprint 半格。
- `h_l_pull_down_front_wall` 在 footprint 检查前 `destination_blocked`；`h_l_pull_down_p_target_wall` 则在前格开放后 `force_blocked`。
- `h_p_push_down_return_front_wall` 先成功移动 anchor 并发出 `anchor_boundary_shift:push_pull`，再在回返 pull 上 `destination_blocked`，证明墙消费的是移动后的回返门。

### 局部问题

同一 P/L anchor 本体被横向/竖向把手移动时，哪一个相邻墙格关闭哪一层门？这些墙格是否能从“首步合法性”扩展为“移动后回返被消费”的结构材料？

### 结构旋钮

- anchor 朝向：横放 `PL` / 竖放 `P/L`。
- 施力侧：P 侧 push / L 侧 pull。
- 位移方向：横放上/下；竖放左/右。
- 墙格层：玩家前格 / P 半格目标 / L 半格目标 / 移动后回返前格。
- 是否允许玩家从旧 P/旧 L 格绕到反向把手。

### 变体谱

| case | 变体 | 观察 |
| --- | --- | --- |
| `h_p_push_down_open_return` | 横放 P 侧 push 下，回返开放 | step1/step3 都合法并发出 `anchor_boundary_shift:push_pull`；回到初始搜索 found。 |
| `h_p_push_down_p_target_wall` | P 半格目标墙 | 首步 `force_blocked`；P 端目标门关闭。 |
| `h_p_push_down_l_target_wall` | L 半格目标墙 | 首步 `force_blocked`；L 端目标门关闭。 |
| `h_p_push_down_return_front_wall` | 移动后回返前格墙 | 首步合法，step3 `destination_blocked`；回返门被消费。 |
| `h_p_push_up_open` | 横放 P 侧 push 上 | 正例；上/下开放镜像都能移动 anchor。 |
| `h_l_pull_down_open` | 横放 L 侧 pull 下 | 正例；玩家前格与非接触 P 目标格开放时移动 anchor。 |
| `h_l_pull_down_front_wall` | pull 玩家前格墙 | 首步 `destination_blocked`。 |
| `h_l_pull_down_p_target_wall` | pull 非接触 P 目标墙 | 玩家前格开放后首步 `force_blocked`。 |
| `v_p_push_right_open` | 竖放 P 侧 push 右 | 正例；complete / 230 states。 |
| `v_p_push_left_open` | 竖放 P 侧 push 左 | 正例；与右推事件计数和图规模对称。 |

### 共同解释

P/L anchor 本体移动时，墙门不是按“推”或“拉”粗分，而是按检查顺序和 footprint 半格分层。P 侧 push 没有额外玩家前格门，直接进入二格 footprint 目标检查，因此 P/L 两个目标半格都能被墙独立关闭。L 侧 pull 先要求玩家前格开放；之后接触半格移动到玩家旧格，非接触半格才是可独立塞墙的 footprint 目标门。首步移动后，边界随 anchor 平移，旧把手格可能变成反向 pull 位；这个后续 pull 的前格墙就是移动后回返门。

### 常见 shortcut

- 开太大的侧路会让玩家找到另一个反向把手，削弱回返门。
- 只在目标半格旁边放墙但没有阻断实际目标格，runner 会仍然移动 anchor。
- 用 pull 测“接触半格目标墙”时会失败，因为该格通常是玩家旧格，不能同时是墙。
- 如果目标是证明完整不可回返，不能用 illegal step 后的 `returnToInitial=not_applicable` 或任何 `exhausted` 结果；本轮只声称回返动作门被消费。

### 推荐 probe

- 把 `h_p_push_down_return_front_wall` 接到后续 B/S 移动边界刷子：墙门先迫使 P/L anchor 留在新边界位，再验证刷线产物是否因不能回返而被消费。
- 补竖放 L 侧 pull 左/右：用同样记号分离玩家前格门和非接触 P 半格目标门，确认旋转后 pull 层也对称。

### 建议 curator 决策

`supplement` 到现有 `P/L 横向把手：玩家前格门与锚点 footprint 门`。本轮不是全新机制族；价值在于补齐 P 半格/L 半格目标门的坐标化分类、L 侧 pull down 镜像、P 侧 push up 镜像、竖放左右开放镜像，以及“首步已移动后的回返门”消费证据。

### 不应进入 lexicon 的 case

- 单独的 `v_p_push_right_open` / `v_p_push_left_open` 不应作为新顶层，只是旋转对照。
- 任一首步失败 case 不应脱离矩阵单独写成 `destination_blocked` 或 `force_blocked` 规则复述。

### 结论范围校准

- 已支撑：横放 P 侧上下 push 正例、横放 L 侧下 pull 正例、玩家前格门、P 半格目标门、L 半格目标门、移动后回返门；竖放 P 侧左右 push 开放镜像。
- 未覆盖：竖放 L 侧 pull 左/右完整门层；横放 L 侧 pull up 的新版本；与移动 B/S 边界刷子的 composition probe。
- 不应入库的弱结论：本轮不能声称所有旋转/镜像都完全等价，只能说已跑的竖放 P 侧左右开放 push 等价。
- 是否打开新题材或新结构用途：no；这是现有 P/L 横向把手墙门条目的补强，不需要单独写 backlog 债。

### 证据

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_transverse_wall_gate_matrix`

`cases=h_p_push_down_open_return,h_p_push_down_p_target_wall,h_p_push_down_l_target_wall,h_p_push_down_return_front_wall,h_p_push_up_open,h_l_pull_down_open,h_l_pull_down_front_wall,h_l_pull_down_p_target_wall,v_p_push_right_open,v_p_push_left_open`

`tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`
