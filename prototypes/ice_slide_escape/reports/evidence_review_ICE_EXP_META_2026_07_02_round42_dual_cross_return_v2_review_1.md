# Evidence Review: ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2

```yaml
review_iteration: review_1
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2
review_input_type: candidate_version
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
```

## 审查范围

本审查只判断候选包列出的公开机器证据是否支持硬事实、机制范围与返回解 key event 声明；不评价审美、好玩程度、难度分、campaign 位置或归档口味分数。未写入 packet 的隐藏约束不作为反证或审美理由；若存在隐含目标封路，本轮只按未提交事实忽略。

已读取材料：

- `skills/sokoban-evidence-reviewer/SKILL.md`
- `skills/sokoban-evidence-reviewer/references/evidence-reviewer-template.md`
- `skills/sokoban-evidence-reviewer/references/scc-graph-reading.md`
- `skills/sokoban-evidence-reviewer/references/source-map.md`
- `prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml`
- `prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2.zh.md`
- 候选包列出的 layout、interface_edges、base/meta analysis、base_no_late、meta_required、interface_goal_A、interface_goal_B 证据文件。

## 硬证据核对

```yaml
supported_claims:
  layout_and_interface_coordinates:
    status: supported
    evidence:
      - layout text matches the packet layout.
      - interface_edges reports edge_floor_cells exactly [0,6] and [23,6].
      - interface_edges reports unexpected_edge_floor_cells: [].
      - declared interface points match the packet: A=[0,6], B=[23,6], C=[23,6], D=[0,6].
    limit:
      - This is public interface-edge evidence only; it is not a hidden aesthetic constraint.

  base_and_meta_start_goal:
    status: supported
    evidence:
      - base analysis initial state places player at [0,6] with explicit goal [23,6].
      - meta analysis initial state places player at [23,6] with explicit goal [0,6].
      - interface_goal_B confirms [0,6]->[23,6] cost 39 and [23,6]->[23,6] cost 0.
      - interface_goal_A confirms [23,6]->[0,6] cost 47 and [0,6]->[0,6] cost 0.

  returned_solution_costs_and_event_counts:
    status: supported_for_returned_shortest_solutions
    evidence:
      - base shortest solution found yes, cost 39, depth 39.
      - base returned event counts: walk=34, push_ice=5, ice_rebound_d4=4, ice_destroyed_d3=1.
      - meta shortest solution found yes, cost 47, depth 47.
      - meta returned event counts: walk=42, push_ice=5, ice_rebound_d4=4, ice_destroyed_d3=1.
    limit:
      - These counts are returned/shortest-solution facts. The provided all-solution gates prove required ice_rebound_d4, not exact all-winning-path counts of 5 pushes, 4 d4, or 1 d3.

  complete_graph_facts:
    status: supported
    evidence:
      - base graph status complete, reachable_states=5111, legal_transitions=12656, winning_states=1.
      - meta graph status complete, reachable_states=7119, legal_transitions=17612, winning_states=2.
      - base agency status complete, compressed_regions=106, solution_commitments=5, forced viable/optimal prefix=2/5.
      - meta agency status complete, compressed_regions=156, solution_commitments=5, forced viable/optimal prefix=1/5.
    graph_reading:
      graph_fact: complete graph for the checked explicit start/goal instances
      neutral_meaning: graph-dependent event gates and reachable scans are not budget-exhausted for these instances
      player_facing_interpretation: supports hard event/exposure checks, but does not by itself prove puzzle quality or per-object necessity
      verdict_effect: supports hard evidence claims with scope caveats

  scc_graph_facts:
    status: supported
    evidence:
      - base SCC shape is one_win_continuation_per_scc with sccs=53, winReachable=3, forcedWinPrefix=2/2.
      - meta SCC shape is branching_win_dag with sccs=91, winReachable=9, forcedWinPrefix=0/1.
    limit:
      - SCC facts support the packet's stated graph diagnostics only as graph facts; they are not quality verdicts.

  base_required_d4_and_no_late_gate:
    status: supported
    evidence:
      - mechanic_exposure_sequence.yml places ice_destroyed_d3 before ice_rebound_d4 and places ice_pass_through_d5, slide_restart_after_group, and ice_destroy_group_d6_plus after d4.
      - base_no_late declares Required winning-path events: ice_rebound_d4.
      - base_no_late reports missing required winning events not found; complete search; explored=5716.
      - base_no_late declares forbidden reachable events ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus.
      - base_no_late complete reachable scan reports Forbidden reachable hits: none.
      - base_no_late reachable event counts include walk, push_ice, ice_rebound_d4, ice_stop_short:d1, push_ice_failed, ice_destroyed_d3, ice_blocks_ice_no_chain_push, ice_stop_short:d2; no d5/restart/d6 hits are reported.

  meta_required_d4_gate:
    status: supported
    evidence:
      - meta_required declares Required winning-path events: ice_rebound_d4.
      - meta_required reports missing required winning events not found; complete search; explored=7342.
      - meta graph for the checked start is complete with states=7119 and wins=2.
    limit:
      - meta_allowed_exposure_through is all_known, so no late-event forbidden reachable gate is needed for the packet's meta exposure claim.

  interface_pair_policy:
    status: supported_for_declared_policy
    evidence:
      - interface_edges reports only [0,6] and [23,6] as edge floor cells, with unexpected_edge_floor_cells: [].
      - interface_goal_A checks goal [0,6] from starts [0,6] and [23,6]: self-pair cost 0 and C->D cost 47.
      - interface_goal_B checks goal [23,6] from starts [0,6] and [23,6]: A->B cost 39 and self-pair cost 0.
      - Since no outside edge floor cell exists in interface_edges, the stated risky class "any edge goal outside [0,6] or [23,6]" has no public edge cell to instantiate.
    limit:
      - This supports the explicit A/B interface scans and pair policy facts. It does not create an any-edge win claim.
```

## Returned-route key event 核对

```yaml
supported_returned_route_facts:
  base:
    - step 8 input right has events push_ice, ice_rebound_d4; snapshots support horizontal borrow at left lock coordinate [6,6].
    - step 12 input right has events push_ice, ice_destroyed_d3; snapshots support destroying the connector ice at [9,5].
    - step 15 input left has events push_ice, ice_rebound_d4; snapshots support horizontal repayment at left lock coordinate [6,6].
    - step 26 input right has events push_ice, ice_rebound_d4; snapshots support horizontal borrow at right lock coordinate [16,6].
    - step 33 input left has events push_ice, ice_rebound_d4; snapshots support horizontal repayment at right lock coordinate [16,6].

  meta:
    - step 9 input down has events push_ice, ice_rebound_d4; snapshots support vertical borrow at right lock coordinate [16,6].
    - step 16 input up has events push_ice, ice_rebound_d4; snapshots support vertical repayment at right lock coordinate [16,6].
    - step 27 input left has events push_ice, ice_destroyed_d3; snapshots support destroying the connector ice at [9,5] from the reverse side.
    - step 31 input down has events push_ice, ice_rebound_d4; snapshots support vertical borrow at left lock coordinate [6,6].
    - step 38 input up has events push_ice, ice_rebound_d4; snapshots support vertical repayment at left lock coordinate [6,6].
```

## Claim 卫生

```yaml
unsupported_or_overclaimed:
  - No instance-level object participation was reported in either base or meta analysis.
  - The same-lock role-change claim is supported as returned-route coordinate/snapshot evidence, not as object identity evidence.
  - The current all-solution probes prove ice_rebound_d4 required at event-type level; they do not prove every winning path uses the same exact lock coordinates, object identities, step order, directions, or exact event counts as the returned solution.
  - player_insight, why_not_execution_only, "not suffix repetition", and the stable-4 aesthetic framing are outside machine-evidence verdict scope.
  - The wording that the connector d3 "forces" a state turn is supported by the returned route and graph context only if read as a returned-route mechanism explanation; no separate all-solution required gate for ice_destroyed_d3 or connector-coordinate participation was provided.
```

## Evidence Limits

```yaml
evidence_limits:
  - Target Event Checks inside the base/meta layout analysis reports say detector configured: false; required-event support comes from base_no_late and meta_required, not from those Target Event Checks sections.
  - Returned snapshots are strong evidence for the listed returned-solution key event steps and roles, but not for per-object or all-winning-path necessity.
  - Graph completeness supports the checked graph-dependent gates; it does not convert analyzer output into a quality pass.
  - Meta has no forbidden reachable-event scope because meta_allowed_exposure_through is all_known.
  - Interface evidence covers the declared explicit goal instances and zero-step self-pairs only.
```

## Questions For Designer

```yaml
questions_for_designer:
  - none_required_for_current_hard_evidence_review
  - If a later packet wants all-solution necessity for the connector d3 or exact lock-coordinate roles, add an object/coordinate-aware detector or explicit required-event/required-participation gate.
```

## 结论

```yaml
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
summary: >
  公开机器证据支持候选包的 base/meta 起终点与成本、返回解事件计数、
  complete graph、base d4 required 与 no late reachable gate、meta d4 required gate、
  A/B 接口扫描、edge_floor_cells/unexpected_edge_floor_cells，以及返回解 key event
  step/输入/坐标角色事实。保留的 caveat 是：对象身份、per-object necessity、精确
  all-solution 事件计数和审美判断未由当前证据证明；这些限制无需本轮修改。
```
