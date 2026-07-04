# 接口与静态封锁：ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1

## 布局

```text
###############.##
###############.##
#...###########.##
..#.*....*....*.##
####I....I....####
##################
##################
##################
```

## 声明接口

```yaml
A: [0, 3]
B: [15, 0]
C: [15, 0]
D: [0, 3]
target_pairs:
  base: A -> B
  meta: C -> D
edge_floor_cells:
  - [15, 0]
  - [0, 3]
```

静态边界扫描没有发现其它可站立边缘格。

## 初始对象检查

```yaml
targets_initially_with_ice:
  - [4, 3]
  - [9, 3]
  - [14, 3]
extra_off_target_ice:
  - [4, 4]
  - [9, 4]
```

每个目标格初始都有冰。两个非目标冰块被声明为支撑/补料材料；这个用法依赖 `docs/rules.md` 中允许目标外额外冰的规则。

## 静态纯走路封锁

纯走路 BFS 把冰视为阻挡，把无冰目标格视为地面。

```yaml
initial_state:
  A_to_B: { found: false, visited: 6 }
  B_to_A: { found: false, visited: 4 }
remove_extra_off_target_ice_only:
  A_to_B: { found: false, visited: 6 }
  B_to_A: { found: false, visited: 4 }
remove_target_ice_only:
  A_to_B: { found: true, length: 20 }
  B_to_A: { found: true, length: 20 }
remove_all_ice:
  A_to_B: { found: true, length: 20 }
  B_to_A: { found: true, length: 20 }
```

解释：`[4,3]`、`[9,3]`、`[14,3]` 三个目标冰块足以在两个方向上封住起点到终点的走廊。只移除两个额外冰块不会打开纯走路路径；移除目标冰会打开 20 步走廊。

## 动态接口扫描引用

```yaml
goal_B_report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_B.md
goal_A_report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_A.md
goal_B_results:
  start_A_to_B: { start: [0, 3], goal: [15, 0], found: true, cost: 44 }
  start_B_to_B: { start: [15, 0], goal: [15, 0], found: true, cost: 0, verdict_effect: none }
goal_A_results:
  start_A_to_A: { start: [0, 3], goal: [0, 3], found: true, cost: 0, verdict_effect: none }
  start_B_to_A: { start: [15, 0], goal: [0, 3], found: true, cost: 42 }
```

自环对只因为 `A=D`、`B=C` 共享物理边缘格而零步成立。它们不参与质量加分或扣分；本候选只声明 `A->B` 与 `C->D`。
