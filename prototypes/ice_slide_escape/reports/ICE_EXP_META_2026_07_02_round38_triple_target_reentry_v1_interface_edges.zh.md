# 接口与静态封锁摘要：ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1

## 布局

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##.*....##
####.....###.#.....###.....
###########################
```

## 声明接口

```yaml
A: [0, 3]
B: [26, 5]
C: [11, 0]
D: [26, 5]
target_pairs:
  base: A->B
  meta: C->D
notes:
  - D 与 B 是同一右侧出口格；B->B / D->D 零步 pair 只作接口事实，verdict_effect: none。
  - C 是顶部重入点，不是外部胜利目标。
```

## 静态扫描

```yaml
board: { width: 27, height: 7 }
target_ice_cells:
  - [4, 4]
  - [12, 4]
  - [20, 4]
ice_count: 3
target_count: 3
extra_off_target_ice_count: 0
edge_floor_cells:
  - [11, 0]
  - [0, 3]
  - [26, 5]
external_edge_floor_cells_outside_declared_interfaces: []
```

静态纯走路扫描把 `#` 与初始冰视为 blocker：

```yaml
static_A_to_B_with_ice_blockers: { found: false, visited: 5 }
static_C_to_B_with_ice_blockers: { found: false, visited: 19 }
static_A_to_C_with_ice_blockers: { found: false, visited: 5 }
```

## 动态接口诊断

证据文件：

- `start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_interface_goal_B.md`
- `start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_interface_goal_C.md`

```yaml
goal_B_or_D_[26,5]:
  A_to_B: { solved: true, cost: 44, verdict_effect: target_pair_base }
  C_to_D: { solved: true, cost: 30, verdict_effect: target_pair_meta }
  B_to_B: { solved: true, cost: 0, verdict_effect: none_self_pair }
goal_C_[11,0]:
  A_to_C: { solved: true, cost: 20, verdict_effect: risk_internal_non_target_pair }
  C_to_C: { solved: true, cost: 0, verdict_effect: none_self_pair }
  B_to_C: { solved: false, verdict_effect: none }
```

## 接口结论

本候选没有未声明外部边缘出口。目标 pair `A->B` 与 `C->D` 均完整可解，且 `D=B` 的零步自 pair 不参与质量评分。主要接口 caveat 是 `A->C` 可解：这是声明接口之间的内部非目标 pair，不是外部 edge leak；提交时应显式披露，不能把 C 说成只属于 meta 的不可达秘密入口。
