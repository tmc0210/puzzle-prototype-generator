# Explorer Notes: P/L L形缺角活塞：非对称形状谱

## 探索边界

本轮只保留一个规范朝向：玩家初始站在 L 形黏块的缺角里，动作序列固定为 `right, down`。这样把左右/上下镜像从 case 空间中剔除，case 名额用于比较真正改变机制接口的变量。

第一性原理拆分如下：

- 输入接口：P/L 场中，玩家先推 L 形黏块一格；推后玩家侧边出现可立即拉动的黏块邻接面。
- 产物：一次正交拉动把刚推过的 L 形改向位移，形成“推入后立刻侧拉”的短行程活塞。
- 最小 consumer：目标格集合、墙门、B/S anchor 或邻近物体位于第二手正交拉动的扫带中。

## 关键观察

### 1. 缺角不是装饰，而是接口

`base_l_triomino_success` 中，玩家在 3-cell L 的缺角里：

- `right` 推动整块黏块；
- `down` 立即触发 `pull_object:sticky#1, move_sticky_rigid`；
- 最终可以用 `left, up` 两步回到初始。

对照 `bar_no_notch_walk` 把结构改成横条后，同样 `right, down` 的第二手只产生 `walk`。这说明本族的核心不是“任意黏块被推一次后可走开”，而是缺角让玩家在推后仍与黏块保留正交拉动接口。

### 2. 横臂向前延长会扩大目标格集合

`top_arm_right_success` 仍然保留一推即侧拉，但比基础 L 多出一个上横臂外侧目标格。`top_arm_right_target_wall` 在这个新增目标格上放墙后，第一手 `right` 仍合法，第二手 `down` 变成 `force_blocked`。

这给出一个明确设计变量：向前延长横臂不是同构放大，而是会新增第二手正交拉动的门控格。

### 3. 横臂向后延长更像尾巴，不等价于向前延长

`top_arm_left_tail_success` 也能完成 `right, down`，但它的新增 cell 位于推前后方。它改变回撤时的占格和后续空间占用，却不触发 `top_arm_right_target_wall` 那类同一外侧墙门。

因此在正式语料中不能只写“长横臂 L”；需要区分向前长臂和向后尾巴。

### 4. 竖腿向下延长会制造第二手后的低位门

`vertical_leg_down_success` 的 `right, down` 成功，但最终状态的继续 `down` 已经是 `force_blocked`。`vertical_leg_down_low_wall` 在最低目标格加墙后，第二手 `down` 直接非法。

这说明竖腿延长给出的不是横臂那种侧向外侧门，而是沿拉动方向的低位门。它适合做“拉一次可通过，拉深或目标格被占则锁死”的局部结构。

### 5. 扫带可以推动 B/S anchor，形成非空 consumer

`base_target_bs_anchor_swept` 把基础 L 的外部目标格替换成 B/S anchor。第二手 `down` 同时产生：

- `pull_object:sticky#1`
- `force_chain:n2`
- `anchor_boundary_shift:box_sticky`
- `move_sticky_rigid`

最终 B/S anchor 下移并覆盖目标，局部图出现 win state，回到初始需要 12 步。这里不是简单的可逆活塞，而是“短活塞把邻近 anchor 带入新边界位置”的 consumer。

## 负例价值

本轮负例只保留非对称相关负例：

- `bar_no_notch_walk`：证明缺角接口必要。
- `top_arm_right_target_wall`：证明向前横臂新增目标格可作为墙门。
- `vertical_leg_down_low_wall`：证明竖腿新增低位目标格可作为墙门。

没有再使用左右/上下镜像作为证据；镜像只应作为读者可推知的对称闭包。

## 设计语义

本族可以描述为：玩家被预置在 L 形黏块缺口中，第一手推让玩家与黏块同步换位，第二手正交拉利用缺口留下的邻接面，把原来的直线往复活塞扩展成转向活塞。形状差异的核心不是朝向，而是新增 cell 相对“第二手拉动扫带”的位置。

