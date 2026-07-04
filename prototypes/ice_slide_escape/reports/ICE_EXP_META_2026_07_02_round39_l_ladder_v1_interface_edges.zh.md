# 接口与静态封锁摘要：ICE_EXP_META_2026_07_02_round39_l_ladder_v1

## 布局

```text
#######.############
#######.############
#######.############
....###.############
###.*....###########
####......##########
#######.############
#######..###########
########*.##########
########..##########
########....########
########..#.*....###
########..##........
#########.##########
#########.##########
```

## 声明接口

```yaml
A: [0, 3]
B: [9, 14]
C: [7, 0]
D: [19, 12]
target_pairs:
  base: A->B
  meta: C->D
```

## 静态扫描

静态扫描把 `#` 与初始冰视为 blocker，不运行任何推冰。

```yaml
board: { width: 20, height: 15 }
target_ice_cells:
  - [4, 4]
  - [8, 8]
  - [12, 11]
ice_count: 3
target_count: 3
extra_off_target_ice_count: 0
edge_floor_cells:
  - [7, 0]
  - [0, 3]
  - [19, 12]
  - [9, 14]
external_edge_floor_cells_outside_declared_interfaces: []
static_with_ice_blockers:
  A_to_B: { found: false, visited: 5 }
  C_to_D: { found: false, visited: 17 }
  A_to_C: { found: false, visited: 5 }
  C_to_B: { found: false, visited: 17 }
  A_to_D: { found: false, visited: 5 }
  B_to_D: { found: false, visited: 14 }
```

## 动态接口诊断

证据文件：

- `start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_interface_goal_A.md`
- `start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_interface_goal_B.md`
- `start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_interface_goal_C.md`
- `start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_interface_goal_D.md`

```yaml
goal_A_[0,3]:
  A_to_A: { solved: true, cost: 0, verdict_effect: none_self_pair }
  C_to_A: { solved: false, verdict_effect: none_ignored_reverse }
  B_to_A: { solved: false, verdict_effect: none }
  D_to_A: { solved: false, verdict_effect: none_ignored_reverse }
goal_B_[9,14]:
  A_to_B: { solved: true, cost: 28, verdict_effect: target_pair_base }
  C_to_B: { solved: true, cost: 20, verdict_effect: none_ignored_reverse }
  B_to_B: { solved: true, cost: 0, verdict_effect: none_self_pair }
  D_to_B: { solved: false, verdict_effect: none_ignored_reverse }
goal_C_[7,0]:
  A_to_C: { solved: true, cost: 16, verdict_effect: risk_internal_non_target_pair }
  C_to_C: { solved: true, cost: 0, verdict_effect: none_self_pair }
  B_to_C: { solved: false, verdict_effect: none }
  D_to_C: { solved: false, verdict_effect: none }
goal_D_[19,12]:
  A_to_D: { solved: true, cost: 42, verdict_effect: risk_internal_non_target_pair }
  C_to_D: { solved: true, cost: 34, verdict_effect: target_pair_meta }
  B_to_D: { solved: true, cost: 20, verdict_effect: risk_internal_non_target_pair }
  D_to_D: { solved: true, cost: 0, verdict_effect: none_self_pair }
```

## 接口结论

本候选没有声明接口外的边缘出口。目标 pair `A->B` 与 `C->D` 均完整可解。
主要 caveat 是内部非目标 pair：`A->C` 会在完成左横门后返回顶部 C，`A->D`
会继续完成三门并到 D，`B->D` 会从 base 出口重读右横门。这些都是 A/B/C/D
内部 pair，不是外部 edge leak；critic 应判断它们是否抢走目标阅读。
