# scratch_round45_internal_debt_rewrite 报告

```yaml
prototype: ice_slide_escape
scratch_id: scratch_round45_internal_debt_rewrite
designer_role: independent_puzzle_designer
status: failed_meta_candidate_but_useful_base_skeleton
main_layout: prototypes/ice_slide_escape/reports/scratch_round45_internal_debt_rewrite_v5_layout.txt
do_not_submit_as_candidate: true
```

## 设计目标

本轮尝试保留 `round44_target_debt_cannon_v2` 中最有价值的 base 语法：

- A->B 必须借出目标冰，造成 target debt；
- 为补回目标，需要使用下方受门控的补债冰；
- 两个目标形成紧凑债链；
- C->D 计划用 d6 改写同一债链，但不能是右侧外接长炮，且 B/D 不能同出口。

同时主动规避：

- L-ladder；
- d4+d3 反向拼接；
- B=D 同物理出口；
- 简单右侧外接 d6 runway。

## 主草稿 v5

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....*...*...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####......#######
##########.#######
```

接口假设：

```yaml
A: [0, 5]
B: [10, 10]
C: [8, 0]
D: [17, 5]
```

## 成立部分：A->B base

证据文件：

- `layout_analysis_scratch_round45_internal_debt_rewrite_v5_base.md`
- `start_comparison_scratch_round45_internal_debt_rewrite_v5_base_no_late.md`

机器事实：

```yaml
base_A_to_B:
  start: [0, 5]
  goal: [10, 10]
  found: true
  cost: 29
  graph: complete
  reachable_states: 1532
  winning_states: 1
  returned_events:
    push_ice: 4
    ice_destroyed_d3: 2
    ice_rebound_d4: 2
  required_gate:
    result: pass
    required_winning_events: [ice_destroyed_d3, ice_rebound_d4]
    missing_required_winning_path: not_found_complete_search
  exposure_gate:
    result: pass
    forbidden_reachable_events:
      - ice_pass_through_d5
      - slide_restart_after_group
      - ice_destroy_group_d6_plus
    forbidden_reachable_hits: none
```

读法上，v5 base 已经实现了目标冰债务链：左目标先右推 d3 撞右目标，右目标再右推 d3 撞墙；随后右下冰、左下冰分别用 d4 回弹补回右目标和左目标，最后到达 B。底廊缩短后，base 完整可达扫描不再提前暴露 d6。

## 失败部分：C->D meta

证据文件：

- `layout_analysis_scratch_round45_internal_debt_rewrite_v5_meta.md`
- `start_comparison_scratch_round45_internal_debt_rewrite_v5_meta_D175_required.md`

机器事实：

```yaml
meta_C_to_D:
  start: [8, 0]
  goal: [17, 5]
  found: false
  graph: complete
  reachable_states: 2307
  winning_states: 0
  required_events: [ice_destroy_group_d6_plus, ice_rebound_d4]
  machine_gate: fail
  reason: explicit_start_goal_unsolved
```

v5 中 C 可以进入两个目标之间，并能解到 B，但那是错误方向：

```yaml
C_to_B_probe:
  file: start_comparison_scratch_round45_internal_debt_rewrite_v5_C_to_B_probe.md
  start: [8, 0]
  goal: [10, 10]
  found: true
  cost: 16
  returned_events:
    ice_destroyed_d3: 1
    ice_rebound_d4: 1
  interpretation: >
    这是复用 base 底部出口的短路线，既不是 D，也没有 d6 改写价值。
```

## 关键失败迭代

### v1/v2

下方房间过开放，A 可以直接下绕到底部出口，或者 meta 用普通下方冰打穿外墙，绕开目标债。结论：补债房不能初始连到 A，且不能给下方普通冰形成外接 d6 横炮。

### v3

base 仍被上层横廊绕过，只需要处理一个目标。结论：y4 不能做横向通廊，只能保留左补债孔、中入口孔、右补债孔。

### v4

base 的胜利路径已经是二目标债链，但完整可达扫描仍能在底廊触发 `ice_destroy_group_d6_plus:len5`。结论：下方补债房的横向长度也会形成隐性 late runway，必须缩短。

v4 的 d6 witness 文件 `layout_analysis_scratch_round45_internal_debt_rewrite_v4_C_d6_witness.md` 说明内部 d6 材料存在，但它发生时两个目标已经空债，资源不足以补回，不能变成 C->D 胜解。

## 结论

本轮没有得到合格 meta-first 候选。最有信息量的产物是 v5：它给出一个干净、紧凑、base 证据完整的二目标债链骨架，同时证明了两个失败边界：

1. 若给 C 足够横向上层通路，A 会偷跑或 base 会提前暴露 d6；
2. 若把 d6 放在下方补债房，容易变成普通冰底部炮，且会和补债资源竞争，导致 C->D 无法在目标补回后离开。

下一轮若继续，应把 d6 改写点放在“右目标被移开后才显露、但 A 无法反向使用”的局部结构里；单纯延长上层或底层走廊都会重现本轮失败。
