# 实验运行：ICE_EXP_META round1 meta gate

```yaml
run_id: ICE_EXP_META_2026_06_30_round1_meta_gate_proposal_ready_with_caveats
prototype: ice_slide_escape
date: 2026-06-30
terminal_state: proposal_ready_with_caveats
proposal_candidates:
  - ICE_CAND_0020
review_integrity: independent_review
archive_eligibility: human_pending
```

## 结果

本轮产出 `ICE_CAND_0020_v1_meta_gate`。这是一个以 meta reinterpretation
为核心的 proposal：基础实例 `A->B` 是较浅的 early application；重访实例
`C->D` 使用同一重置布局，把 base 中的近端冰从“被推到 target 的主资源”
重读为右侧远冰 d5/d6 后的 stopper。

本轮没有声称 accepted、mainline、positive_reference 或 human taste reference。
最终状态来自 `review_1` 的独立 evidence reviewer 与 puzzle critic；二者均返回
`required_action: none`，因此 archive pass 只记录
`proposal_ready_with_caveats`。

候选记录：

```text
prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0020.md
```

## Proposal 简表

```yaml
candidate_id: ICE_CAND_0020
version: v1_meta_gate
interfaces:
  A: [0, 2]
  B: [0, 4]
  C: [13, 2]
  D: [13, 4]
base_instance:
  start: [0, 2]
  goal: [0, 4]
meta_instance:
  start: [13, 2]
  goal: [13, 4]
win_condition: ice_slide_escape_explicit_goal
```

```text
##############
##############
..IG#.....I...
#.########.###
..IG#......I..
##########...#
##############
```

## 设计声明

```yaml
player_insight: >
  Base 刻意较轻：玩家从 A 侧读取两块近端冰的 d1 short-stop target fill。
  Meta 从 C 侧复用同两条 target lane，但近端冰不再是被推动的主资源，而是
  右侧远冰的 stopper。第一下 meta push 是 d5 pass-through，同时腾出 x10
  通道，让玩家能进入下方远冰的右侧；第二下 meta push 是 d6 destruction
  后 restart。
causal_chain: >
  A->B：推 [2,2] 向右，d1 停在 [3,2]；走到下方 lane，推 [2,4] 向右，
  d1 停在 [3,4]，然后到达 B。
  C->D：推 [10,2] 向左，d5 穿过 [4,2] 后 restart，借 [2,2] 停在 [3,2]，
  同时清出 x10 通道；随后站到 [12,4]，推 [11,4] 向左，d6 摧毁 [4,4] 后
  restart，借 [2,4] 停在 [3,4]，然后到达 D。
why_not_execution: >
  Base 本轮允许较浅，但 C->D 不是纯接口 clone：推动对象、距离规则、路线含义
  和对象角色都改变，同时复用相同 targets、stoppers、walls 和 lanes。第一下
  meta push 还具有后续被消费的通路打开职责。
falsification: >
  若 A/B 可解到 C/D，或 ABCD 任一选点可解到非 ABCD edge，reject。
  若 C->D 存在不触发 d5、d6、restart、ice-block short stop 的胜路，claim
  失败。若第一下 meta push 的通路打开职责只是叙述而未被 trace 消费，则需
  修改或降级。
```

## 机制范围

```yaml
central:
  base:
    - two d1 short-stop target fills
  meta:
    - d5 pass-through plus restart and ice-block d1 stop
    - first meta push clears the x10 passage for later access
    - d6 destroy-group plus restart and ice-block d1 stop
    - base near-side ice reinterpreted as stopper material
support:
  - explicit edge start/goal contract
  - target coverage win condition
incidental:
  - short walking between lane commitments
forbidden_in_declared_winning_solutions:
  - ice_destroyed_d3
  - ice_rebound_d4
  - ice_boundary_disappear
  - ice_boundary_disappear_after_group
must_report_if_seen_anywhere:
  - ABCD_to_non_ABCD_edge_solve
  - A_or_B_to_C_or_D_solve
```

## 证据

```yaml
base_A_to_B:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0020_v1_base_A_to_B.md
  result: solved
  cost: 8
  reachable_states: 24
  winning_states: 1
  graph_status: complete
  events:
    - ice_stop_short:d1
    - ice_stop_short:d1
meta_C_to_D:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0020_v1_meta_C_to_D.md
  result: solved
  cost: 12
  reachable_states: 69
  winning_states: 1
  graph_status: complete
  required_events:
    - ice_pass_through_d5:len1
    - ice_destroy_group_d6_plus:len1
    - slide_restart_after_group
    - ice_blocks_ice_no_chain_push
    - ice_stop_short:d1
base_required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0020_v1_base_goal_B_ABCD.md
  result: complete
  no_base_win_missing_required_or_with_forbidden: true
meta_required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0020_v1_meta_goal_D_ABCD.md
  result: complete
  no_meta_win_missing_required_or_with_forbidden: true
edge_pair_scan:
  ref: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0020_v1_ABCD.md
  ABCD_to_non_ABCD_edge: none_solved
  A_or_B_to_C_or_D: none_solved
```

证据边界：

```text
工具没有报告 instance-level object participation。因此“近端冰作为 stopper”
是从 event snapshots 和坐标读出的事实，不是持久对象身份追踪结论。
本轮没有为 x10 通道单独运行反事实；trace 与第一推后可达路径支持该角色，
所以正式 claim 只写 trace-supported，不写 object-fact necessity。
```

## SCC / Graph 读法

```yaml
- graph_fact: >
    base A->B complete graph: reachable states=24, winning states=1,
    initial SCC states=5, out=2, winOut=2, deadOut=0, winSubgraph=branching_win_dag.
  neutral_meaning: >
    Base 有两个可胜利 opening commitments，且没有 opening dead commitment。
  player_facing_interpretation: >
    两个近端 target fill 是可交换顺序的轻 application，而不是强脚本。
  verdict_effect: merit
- graph_fact: >
    meta C->D complete graph: reachable states=69, winning states=1,
    forcedWinPrefix=2/2, one_win_continuation_per_scc，且 complete required
    probe 没有找到缺 d5/d6/restart/ice-block/d1 的胜路。
  neutral_meaning: >
    Meta 胜路必须经过两个声明的不可逆机制提交。
  player_facing_interpretation: >
    C->D 不是 walk route，也不是 d1-only base replay；它需要后期规则重读。
  verdict_effect: merit
- graph_fact: >
    meta 第二个 SCC states=21, out=2, winOut=1, deadOut=1，handoff reading
    为 has_reposition_room。
  neutral_meaning: >
    第一下 meta push 后存在较大的可逆区域和一个失败 commitment。
  player_facing_interpretation: >
    第一下 push 创建了实际 reposition 空间，玩家需要到达下方远冰站位，
    不是同格连续执行。
  verdict_effect: merit
- graph_fact: >
    C->C 可解，使用同一 d5->d6 chain，cost=16；C->D cost=12。
  neutral_meaning: >
    C 有另一个声明接口内的同链路完成。
  player_facing_interpretation: >
    这不触发硬边缘 reject，且比 C->D 更长，但限制“C 侧唯一出口”的表述。
  verdict_effect: caveat
```

## Routing 结果

```yaml
diagnostic_routing:
  hard_evidence:
    status: complete
  mechanism_scope:
    status: complete
  claim_hygiene:
    status: complete_with_caveats
  scc_graph:
    status: triggered
    reason: application/challenge/meta claim plus brief-required reachability
  variant_family:
    status: light
    result: fresh
    reason: archive only used for human-comment-backed taste calibration
  start_position:
    status: triggered
    result: explicit A/B/C/D pair scan plus all-edge goal scan
  prototype_specific_work:
    kind: redesign_stage
    status: triggered
    result: meaningful_reinterpretation_with_caveats
```

## Meta 重读

```yaml
meta_reinterpretation_candidate:
  base_candidate_status: promising
  redesign_decision: recommended
  base_instance:
    start: [0, 2]
    goal: [0, 4]
    causal_chain: two near-side d1 target fills
  meta_instance:
    start: [13, 2]
    goal: [13, 4]
    knowledge_scope: all_prototype_knowledge
    causal_chain: d5 far-ice target fill and passage opening, then d6 far-ice target fill
  chain_delta_from_base: >
    Pushed objects switch from near-side ice to far-side ice; near-side ice
    switches from target material to stopper; rule use changes from d1-only
    to d5+d6+restart; route changes from left lane traversal to right-side
    passage unlocking.
  shared_structure:
    - two target lanes at [3,2] and [3,4]
    - near-side ice at [2,2] and [2,4]
    - obstacle walls at [4,2] and [4,4]
    - far-side ice at [10,2] and [11,4]
  latent_elements_from_base:
    - element: right-side far ice
      base_reading: incidental / unreachable from A->B
      meta_payoff: primary pushed resources in C->D
    - element: near-side ice after base-style reading
      base_reading: target-fill material
      meta_payoff: stopper material for far-side d5/d6
  non_target_pairs:
    - pair: C->C
      result: solved
      risk: selected-interface same-chain variant; not hard reject
    - pair: A/B->C/D
      result: unsolved
      risk: none
  classification: meaningful_reinterpretation
```

## Review Loop

```yaml
review_1:
  candidate_version_reviewed: ICE_CAND_0020_v1_meta_gate
  evidence_reviewer:
    review_integrity: independent_review
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    caveats:
      - no object participation field; stopper claim uses snapshots/coordinates
      - x10 passage opening has trace support, not dedicated counterfactual
      - C->C same-chain selected-interface variant must be disclosed
  puzzle_critic:
    review_integrity: independent_review
    verdict: supports_with_noncore_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    strongest_merits:
      - hard reachability gate is clean
      - base/meta chain_delta is concrete
      - first meta push has target-fill plus route-opening responsibility
      - meta is above connectivity_note_only and not an interface clone
    noncore_caveats:
      - C->D remains somewhat linear
      - visual structure is still two parallel rows
      - base alone is thin
      - object identity is inferred from snapshots
  loop_result: proposal_ready_with_caveats
designer_action_after_review_1:
  action: not_needed
  reason: both independent review artifacts returned required_action none
```

## Archive Taste Context 使用

只使用带人类评语的 archive candidate 做 taste calibration；没有复用其 layout、
几何结构、因果链、路线、对象摆放或入口出口关系。

```yaml
used:
  - candidate_id: ICE_CAND_0012
    human_lesson: clear reuse may still feel like "push visible ice far"
    influence: required C->D to include route-opening reuse
  - candidate_id: ICE_CAND_0015
    human_lesson: forced corridor can erase claimed insight
    influence: kept the linearity caveat explicit
  - candidate_id: ICE_CAND_0019
    human_lesson: delayed hidden stopper payoff strengthens nonlocality
    influence: valued near-side ice becoming stopper material in meta
  - candidate_id: ICE_CAND_0004
    human_lesson: simple repeated stack is weak
    influence: checked that meta uses d5 then d6 with route meaning
```

## Exploration Log 摘要

```yaml
family_iteration_1:
  family_id: parallel_base_rows_right_side_meta
  causal_chain_family: >
    Base sees two near-side d1 fills; meta enters from the far side and uses
    right-side far ice against the same near-side ice as stoppers.
  why_not_archive_variant: >
    The family was not derived from archive layout or route. Archive candidates
    were only used for human-comment-backed taste calibration.
  result: enter_review_loop
attempts:
  - attempt_id: v1_symmetric_two_rows
    result: repair
    reason: >
      C->D solved but the two rows were too independent; first meta push did
      not gate access to the second row.
  - attempt_id: v2_gate_without_access
    result: repair
    reason: >
      Closing the upper-right/lower connection made C->D unsolved.
  - attempt_id: v3_meta_gate
    result: send_to_review
    reason: >
      Added a lower-right bypass below the blocked connector. C->D now requires
      first d5 to vacate [10,2] before reaching the lower far ice, while base
      remains intact.
```

## 流程完整性

```yaml
process_integrity:
  design_packet: present
  tool_evidence: present
  evidence_reviewer_artifact: present
  puzzle_critic_artifact: present
  designer_actions_after_review: not_needed
  post_revision_evidence_rerun: not_needed
  latest_review_iteration: review_1
  latest_candidate_version_reviewed: ICE_CAND_0020_v1_meta_gate
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: not_needed
  review_integrity: independent_review
  review_loop_state: proposal_ready_with_caveats
  unresolved_core_attacks: []
  archive_eligibility: human_pending
```

## 证据引用

```text
- prototypes/ice_slide_escape/reports/ICE_CAND_0020_meta_gate_v1_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0020_v1_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0020_v1_base_A_to_B.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0020_v1_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0020_v1_meta_C_to_D.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0020_v1_base_goal_B_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0020_v1_base_goal_B_ABCD.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0020_v1_meta_goal_D_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0020_v1_meta_goal_D_ABCD.json
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0020_v1_ABCD.md
```
