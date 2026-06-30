# Target 移除探针：ICE_CAND_0019

本报告检查 ICE_CAND_0019 的四个 target 是否可以移除，目标是降低显然性而不破坏核心逻辑链。

原 v3：

```text
################
#...GGGI.....I.#
#.#.#..I######.#
#..#...*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#...I..#########
........########
################
```

## 结论

```yaml
recommended_change:
  remove_target: [4, 1]
  keep_targets:
    - [5, 1]
    - [6, 1]
    - [7, 3]
```

推荐 v4：

```text
################
#....GGI.....I.#
#.#.#..I######.#
#..#...*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#...I..#########
........########
################
```

## 分 target 判断

### 移除 [4,1]

判断：可以，且推荐。

证据：

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0019_scratch_v4_remove_left_hint_target.txt
solution:
  found: true
  cost: 43
  pushes: 6
graph:
  status: complete
  states: 50528
  transitions: 140744
  wins: 1
required_event_probe:
  start: [0, 9]
  required_events_covered: true
  uncovered_required_win: not_found_complete_search
all_edge_starts:
  checked_starts: [[0, 9]]
object_fact_probe:
  status: complete
  augmented_states_explored: 69306
  win_masks: ["111111"]
  missing_core_fact_win: not_found_complete_search
```

设计读法：这枚 target 原先把第一推直接标成“填左上目标”，太像提示。删掉后，第一推仍然必须把下方冰移到 `[4,1]`，但它的功能变成隐藏的 stopper：后续右上冰 A 左推时必须靠它停在 `[5,1]`。这更符合“不要让第一步过于显然”的目标。

### 移除 [5,1]

判断：不推荐。

证据：机器上仍可解，最优解仍为 43 步 / 6 推，完整图仍为 1 个胜局。但 `[5,1]` 是 A 的最终落点，也是 A/F 关系的核心可读事实之一。删掉它后，A 不再负责填 target，只剩下“为 F 和 C 的时序服务”的通道/stopper 编排，设计重心会变虚。

### 移除 [6,1]

判断：不能删。

证据：这等价于已废弃的 v2 方向。v2 虽然仍有 43 步 / 6 推解，但完整图有 7 个胜局，并且对象事实 caveat 没有闭合：A 可以被牺牲，F 后续仍可能替代填 `[5,1]`。v3 添加 `[6,1]` 正是为了关闭这条绕法。

### 移除 [7,3]

判断：不能删。

证据：

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0019_scratch_probe_remove_d_target.txt
solution:
  found: true
  cost: 39
  pushes: 5
graph:
  status: complete
  states: 50528
  transitions: 140744
  wins: 32
```

删掉 `[7,3]` 后，E 的预定位和 C 的最终回填都不再必要；解法退化为 B、D、A、F 后把 C 向下推毁即可。这直接摧毁了右侧“先开门、再回填”的关键结构。

## 建议读法

采用 v4 后，关键链应改写为：

1. B：下方冰先上推到 `[4,1]`，表面不填 target，实为 A 的隐藏 stopper。
2. E：下方中冰上推到 `[7,4]`，作为 C 的延迟 stopper。
3. D：`[7,3]` 右推，打开右边缘出口，同时清空稍后必须回填的 target。
4. A：右上冰左推，利用 B 停在 `[5,1]`。
5. F：`[7,1]` 再左推到 `[6,1]`。
6. C：`[7,2]` 最后下推回 `[7,3]`，靠 E 停住。
