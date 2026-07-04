# worker_round43_tight_l_ladder_v1 notes

## 结论

这是一个可继续审查的紧缩 meta-first 候选素材，不是最终强推稿。它是 round39 L-ladder 思路的压缩版：删除两行顶部等待走廊后仍保持 base/meta 双实例成立，且不使用 d3 双向门串联，也不触发 base 的 d5/restart/d6 可达暴露。

主要优点是同一中央 target `[8,6]` 在两条流程中承担不同位置责任：base A->B 先处理中央 target 再处理右侧 target；meta C->D 先处理左侧 target 再用中央 target 收束。主要 caveat 是局部动作语法仍是 d4 target-debt 借出/还回，非交换性和“一步改变多个后续可达性”的强度有限，不能按 5 分级结构反转来讲。

## 布局

```text
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

## 接口

```yaml
A: [7, 0]
B: [19, 10]
C: [0, 1]
D: [9, 12]
base_instance: { start: [7, 0], goal: [19, 10] }
meta_instance: { start: [0, 1], goal: [9, 12] }
target_ice_cells:
  - [4, 2]
  - [8, 6]
  - [12, 9]
extra_off_target_ice_count: 0
edge_floor_cells: [[7, 0], [0, 1], [19, 10], [9, 12]]
```

所有 target 初始均为 `*`。四个声明接口是不同格。

## 静态封路检查

按 `#`、`I`、`*` 都作为静态阻挡：

```yaml
A_to_B: { found: false, visited: 15 }
C_to_D: { found: false, visited: 5 }
```

若只把 `*` 当作可移除/可通行而仍阻挡 `#`、`I`：

```yaml
A_to_B_ignore_star: { found: true, visited: 49 }
C_to_D_ignore_star: { found: true, visited: 39 }
```

这说明初始 target ice 确实封住 base A->B，也封住 C->D。此事实只作为硬约束满足情况记录，不作为审美加分。

## 机器证据摘要

base A->B:

```yaml
solve:
  found: true
  cost: 32
  returned_events: { walk: 28, push_ice: 4, ice_rebound_d4: 4 }
graph: { status: complete, reachable_states: 951, winning_states: 1 }
required_d4_gate:
  missing_ice_rebound_d4_winning_path: "not found; complete search; explored=950"
base_forbidden_reachable_scan:
  forbidden_events:
    - ice_pass_through_d5
    - slide_restart_after_group
    - ice_destroy_group_d6_plus
  result: pass
  forbidden_reachable_hits: none
  boundary_seen: false
  reachable_event_counts:
    walk: 2252
    push_ice: 59
    ice_stop_short:d1: 35
    ice_rebound_d4: 24
```

meta C->D:

```yaml
solve:
  found: true
  cost: 28
  returned_events: { walk: 24, push_ice: 4, ice_rebound_d4: 4 }
graph: { status: complete, reachable_states: 2470, winning_states: 1 }
required_d4_gate:
  missing_ice_rebound_d4_winning_path: "not found; complete search; explored=2469"
meta_exposure: full_knowledge
boundary_seen_in_reachable_scan: true
boundary_detail: "ice_boundary_disappear:d2 count=7; returned solution itself has no boundary event"
```

## Pair 备注

edge floor 只有四个声明接口。枚举式启发扫描中可解 pair 包括：

```yaml
target_pairs:
  A_to_B: { cost: 32 }
  C_to_D: { cost: 28 }
risky_internal_non_target_pairs:
  A_to_D: { cost: 18, note: "真实风险；会削弱四接口纯净度" }
ignored_reverse_or_cross_pairs_under_current_policy:
  C_to_A: { cost: 14 }
  C_to_B: { cost: 42 }
  D_to_B: { cost: 20 }
```

A->D 是本素材最明显的接口 caveat。它不像 base/meta 的完整双门流程，但会让顶部入口也能读到底部出口，公开审查时必须披露。

## 审美评估

符合本轮要求的部分：

- 不依赖 `d4 双向锁 + d3 双向门` 串联；布局中没有 d3 connector 作为核心。
- base 知识窗口干净：d5/restart/d6 未在完整可达扫描中出现，boundary 也未出现。
- base/meta 都是 4 次 d4 returned-solution pushes，难度下限不低于 2；meta 的 2470 reachable states / 106 compressed regions 支撑约 3。
- A/B/C/D 不同格，四个 edge floor 都已声明。
- 中央 target `[8,6]` 不是单纯后缀复读：base 中先作为开局门，meta 中作为收束门。

不足与不要过度声称的部分：

- 仍然是 d4 target-debt 门语法，结构变化主要是 first/last 责任互换，不是强对象角色反转。
- 没有证明“一个动作同时改变多个后续可达性”达到强亮点级；较合理的说法只是每次借出 target 同时改变通路和胜利债务。
- A->D 非目标 pair 存在，需作为风险披露。
- 不应把“初始 target 冰封路”本身当作审美优点；它只是本轮硬约束。
