# Soft handoff no-merge lock v1 变体记录

日期：2026-07-05

来源：`RA_EXP_2026_07_04_SOFT_HANDOFF_v3` / `RA_CAND_0002`

用途：按 human request 做一个临时待玩变体，用来检查“删中目标后发现的 40 步无 sticky_merge 解”是否可以被微调为主要路线。此记录不是归档候选提交，也不改动已归档版本。

## Layout

```text
#########
####C@.G#
###G....#
####PL.M#
####..BS#
#########
```

变更：

- 删除原版中间目标：`###G.G..#` -> `###G....#`
- 增加上排右侧目标：`####C@..#` -> `####C@.G#`

## Solver 结论

- 最短解：40 步
- 完整图：complete
- reachable states：2828
- winning states：33
- 最短输入：

```text
down up right right down left down left left up right left down right down left up up right right right up left right down left left left up right down left down down right up right up left left
```

## 核心事件必要性

`event_probe_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_core5` 完整搜索通过：

- 所有胜路都需要 `anchor_boundary_shift:push_pull`
- 所有胜路都需要 `anchor_boundary_shift:box_sticky`
- 所有胜路都需要 `pull_object`
- 所有胜路都需要 `box_to_sticky` 或 `sticky_to_box`
- 所有胜路都需要 `move_sticky_rigid`

## sticky_merge 对照

原始事件历史搜索能找到 42 步的 sticky_merge 胜路，但逐步对齐后确认它不是独立路线：

- 40 步路线在 step 17 后的状态为：

```text
#########
####PL.G#
###G....#
####@CM.#
####.BS.#
#########
```

- 42 步路线在同一状态下插入 `right left`。
- `right` 会推动 crate 与 sticky 发生 `force_chain` / `move_sticky_rigid` / `box_to_sticky` / `sticky_merge`。
- `left` 立刻把结构拉回，触发 `move_sticky_rigid` / `sticky_to_box`。
- 插入两步后，棋盘状态完全回到上面的同一状态；随后路线与 40 步路线逐步相同，只是整体晚 2 步。

因此当前判断是：

- 可以作为“40 步无 sticky_merge 是标准/最短路线”的检查变体。
- raw path 层面存在一个带事件回环的 42 步版本，但按关卡设计语义应视作同一解法骨架，不是新的 bypass。
- 是否替换 `RA_CAND_0002` 仍应由人肉判断目标布置和读法是否优于原归档版本。

## 关键步骤 snapshot

### Step 2：首次移动 P/L 锚点

```text
#########
####C..G#
###G.@..#
####PL.M#
####..BS#
#########
```

输入 `up` 后：

```text
#########
####C@.G#
###GPL..#
####...M#
####..BS#
#########
```

### Step 8：sticky rigid movement + sticky_to_box

```text
#########
####...G#
###GPLC.#
####..@M#
####..BS#
#########
```

输入 `left` 后：

```text
#########
####...G#
###GPLC.#
####.@C.#
####..BS#
#########
```

### Step 16：B/S 锚点左移并触发 box_to_sticky

```text
#########
####PL.G#
###G....#
####.CC.#
####.@BS#
#########
```

输入 `left` 后：

```text
#########
####PL.G#
###G....#
####.CM.#
####@BS.#
#########
```

### Step 35：B/S 锚点回位并触发 sticky_to_box

```text
#########
####..PL#
###G....#
####.CM.#
####@BS.#
#########
```

输入 `right` 后：

```text
#########
####..PL#
###G....#
####.CC.#
####.@BS#
#########
```

### Step 40：终局

```text
#########
####..PL#
###GC@..#
####...M#
####..BS#
#########
```

输入 `left` 后：

```text
#########
####..PL#
###*@...#
####...M#
####..BS#
#########
```

上排右侧目标由最终 P/L 锚点覆盖；左侧目标由 crate 覆盖。
