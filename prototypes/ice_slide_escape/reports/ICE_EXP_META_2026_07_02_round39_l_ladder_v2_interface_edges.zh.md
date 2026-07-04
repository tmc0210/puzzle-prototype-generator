# 接口与静态封锁摘要：ICE_EXP_META_2026_07_02_round39_l_ladder_v2

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
A: [7, 0]
B: [19, 12]
C: [0, 3]
D: [9, 14]
target_pairs:
  base: A->B
  meta: C->D
```

## 静态扫描

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
  A_to_B: { found: false }
  C_to_D: { found: false }
  A_to_D: { found: false }
  C_to_B: { found: false }
```

## 动态接口诊断

证据文件：

- `start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_A.md`
- `start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_B.md`
- `start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_C.md`
- `start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_D.md`

```yaml
goal_A_[7,0]:
  A_to_A: { solved: true, cost: 0, verdict_effect: none_self_pair }
  B_to_A: { solved: false, verdict_effect: none }
  C_to_A: { solved: true, cost: 16, verdict_effect: none_ignored_reverse }
  D_to_A: { solved: false, verdict_effect: none_ignored_reverse }
goal_B_[19,12]:
  A_to_B: { solved: true, cost: 34, verdict_effect: target_pair_base }
  B_to_B: { solved: true, cost: 0, verdict_effect: none_self_pair }
  C_to_B: { solved: true, cost: 42, verdict_effect: none_ignored_reverse }
  D_to_B: { solved: true, cost: 20, verdict_effect: none_ignored_reverse }
goal_C_[0,3]:
  A_to_C: { solved: false, verdict_effect: none }
  B_to_C: { solved: false, verdict_effect: none }
  C_to_C: { solved: true, cost: 0, verdict_effect: none_self_pair }
  D_to_C: { solved: false, verdict_effect: none }
goal_D_[9,14]:
  A_to_D: { solved: true, cost: 20, verdict_effect: risk_internal_non_target_pair }
  B_to_D: { solved: false, verdict_effect: none }
  C_to_D: { solved: true, cost: 28, verdict_effect: target_pair_meta }
  D_to_D: { solved: true, cost: 0, verdict_effect: none_self_pair }
```

## 接口结论

本候选没有声明接口外边缘出口。目标 pair `A->B` 与 `C->D` 均完整可解。
按 `interface_pair_policy`，`C/D->A/B` 反向内部 pair 只记录为
`verdict_effect: none`；剩余主要风险是 `A->D` cost 20，它让 base 入口顶部
也能走到 meta 的底部出口，应由 critic 判断是否削弱目标 pair 阅读。
