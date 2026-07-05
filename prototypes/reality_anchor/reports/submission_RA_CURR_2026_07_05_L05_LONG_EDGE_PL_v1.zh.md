# 合格候选简报：RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1

槽位：第五关 / P/L 长边同向推拉应用

## ASCII View

```text
##########
#PL@G#####
#........#
#.CG#.CG.#
##########
```

## 解法步骤

```text
right down left left left up right down left down right up right right right right right down right
```

事件摘要：

- step 1：从 L 侧把水平 P/L 向右拉一步。
- step 7：绕到 P 侧后把同一个 P/L 向右推一步，覆盖顶部目标。
- step 11：左下普通箱被推入目标。
- step 19：右下普通箱被拉入目标。

## 关键 Snapshot

起始：

```text
##########
#PL@G#####
#........#
#.CG#.CG.#
##########
```

step 1 后，P/L 已被水平向右拉：

```text
##########
#.PL+#####
#........#
#.CG#.CG.#
##########
```

step 7 前，玩家绕到 P/L 左侧准备同向推动：

```text
##########
#@PLG#####
#........#
#.CG#.CG.#
##########
```

step 7 后，P/L 水平向右推并覆盖顶部目标：

```text
##########
#.@PL#####
#........#
#.CG#.CG.#
##########
```

step 11 后，左下目标由普通箱 push 覆盖：

```text
##########
#..PL#####
#........#
#.@*#.CG.#
##########
```

终局：

```text
##########
#..PL#####
#........#
#..*#..*@#
##########
```

## 工具证据

- `layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1.md`：shortest 19，complete graph 243 states。
- `event_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_instance_core.md`：complete/no bypass；所有胜路需要 P/L pull、P/L push、左箱 push、右箱 pull。
- `direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_direction_core.md`：complete/no bypass；所有胜路需要 P/L 水平向右 pull 和水平向右 push。
- goal-prune 三个删除反事实均产生降步或核心事件 bypass，因此三个目标都保留。

## Critic 结论摘要

- Evidence reviewer：`supports_with_caveats`，`proposal_ready_with_caveats`，`required_action:none`。
- Puzzle critic：`supports_with_noncore_caveats`，`proposal_ready_with_caveats`，`required_action:none`。
- 主要 caveat：非胜路中可达竖向 P/L 位移，因此表述应限制为“胜路必需水平同向长边推拉”，不要说“垂直交互被完全禁止”。结构偏三段 witness，但适合作为第五关待玩候选。
