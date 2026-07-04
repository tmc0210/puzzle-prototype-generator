# worker_round54_lshape found v4 summary

```yaml
status: found_hard_gate_baseline
candidate_to_submit: false
reviewer_called: false
critic_called: false
fresh_claim_ref: prototypes/ice_slide_escape/reports/worker_round54_lshape_fresh_claim.zh.md
layout_ref: prototypes/ice_slide_escape/reports/worker_round54_lshape_probe_v4_layout.txt
```

## 接口

```yaml
A: [0, 5]
B: [6, 13]
C: [11, 0]
D: [19, 11]
base: A -> B
meta: C -> D
targets: [[4, 5], [13, 10]]
ice_initial: [[4, 5], [11, 1], [13, 10]]
```

## Layout

```text
###########.########
###########I########
###########.########
###########.########
####.....##.########
..#.*....##.########
....##.####.########
######.####.########
######.#############
######.####..#######
######.####..*....##
######.######.......
######.#############
######.#############
```

## 机器证据

Base:

- `layout_analysis_worker_round54_lshape_v4_base_explain.md/json`
  - A `[0,5]` -> B `[6,13]` solved。
  - cost 22，graph complete，reachable states 90。
  - 返回解包含两次 `ice_rebound_d4`。
- `start_comparison_worker_round54_lshape_v4_base_strict.md/json`
  - machineGate pass。
  - required winning `ice_rebound_d4` pass。
  - forbidden reachable `ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus` 无命中。

Meta:

- `layout_analysis_worker_round54_lshape_v4_meta_explain.md/json`
  - C `[11,0]` -> D `[19,11]` solved。
  - cost 23，graph complete，reachable states 82。
  - 关键 trace：
    - step 1：竖向 d6/restart 后，projectile 停到 `[11,10]`。
    - step 12：T2 从 `[13,10]` 右推到 `[16,10]`，离开目标。
    - step 19：T2 从右侧左推，借 `[11,10]` 的 d6 产物作为冰障碍，触发 `ice_blocks_ice_no_chain_push + ice_rebound_d4`，回封 `[13,10]`。
- `start_comparison_worker_round54_lshape_v4_meta_required.md/json`
  - machineGate pass。
  - required winning `ice_destroy_group_d6_plus, slide_restart_after_group, ice_rebound_d4` 全部 pass。

Edge scan:

- `start_comparison_worker_round54_lshape_v4_pair_goal_A.md/json`
- `start_comparison_worker_round54_lshape_v4_pair_goal_B.md/json`
- `start_comparison_worker_round54_lshape_v4_pair_goal_C.md/json`
- `start_comparison_worker_round54_lshape_v4_pair_goal_D.md/json`

结论：

- A->B 可解，C->D 可解。
- A->D 不可解。
- B->D 不可解。
- C->B 不可解。
- D->B 不可解。
- 其余非自身反向目标也不可解；自身起点到自身目标的 cost 0 只作为 scan 基准出现。

## 设计读法

v4 证明了本轮要求的 L 形部件可以同时满足：

- base 完整可达 no-late；
- meta required d6/restart/d4；
- d6 产物不是一次性 key，而是换轴成为 T2 回封的 stopper；
- A/B/C/D 全分离且 edge scan 干净；
- 两个 target 初始均有冰。

但 v4 不是建议送审的高审美终稿：它靠把 base T1 门和 meta T2/d6 门分成左右两块来消除 base late 泄漏，空间耦合偏弱。它适合作为 hard-gate baseline 或可工作的 L 形机制部件，而不是最终 candidate packet。

## v2/v3 的最小几何矛盾

更紧的 shared-row 版本 v2/v3 审美方向更好：base 的 T1 右推位置正好被 meta 的 d6 产物替换成 T2 回封 stopper。

失败原因也很明确：

- base 为了回封 T1，必须能站到 T1 右侧，也就能站到 T2 左侧。
- T2 被 base 推到右侧后，base 又能从右侧把 T2 往左推。
- 因为 d6 产物还不存在，T2 左推时最近障碍退到 T1，距离变成 d6+，完整可达扫描命中 late。

下一轮如果继续追求高审美，应该保留 v3 的 shared-row 语义，但必须让“站到 T2 右侧回推”只在 d6 之后成立；单纯移动 B 或封 C 发射口不够。
