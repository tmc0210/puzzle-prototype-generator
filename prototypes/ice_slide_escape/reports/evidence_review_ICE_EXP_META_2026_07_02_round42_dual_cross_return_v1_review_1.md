# Evidence Review: ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1

```yaml
review_iteration: review_1
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1
review_input_type: candidate_version
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
```

## 审查范围

本审查只判断候选包列出的工具证据是否支持硬事实与机制范围声明；不评价审美、好玩程度、campaign 位置或分数锚点。

已读取材料：

- `skills/sokoban-evidence-reviewer/SKILL.md`
- `skills/sokoban-evidence-reviewer/references/evidence-reviewer-template.md`
- `skills/sokoban-evidence-reviewer/references/scc-graph-reading.md`
- `skills/sokoban-evidence-reviewer/references/source-map.md`
- `prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml`
- `prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1.zh.md`
- 候选包列出的 layout、base/meta analysis、base_no_late、meta_required、interface_goal_A、interface_goal_B 证据文件。

## 硬证据核对

```yaml
supported_claims:
  layout_and_interface_coordinates:
    status: supported
    evidence:
      - layout is 24x14.
      - only edge floor cells in layout are [0,6] and [23,6].
      - targets / initial ice-on-target cells are [6,6] and [16,6].
      - packet interface A=[0,6], B=[23,6], C=[23,6], D=[0,6] matches layout.

  base_and_meta_start_goal:
    status: supported
    evidence:
      - base analysis initial state places player at [0,6], explicit goal [23,6].
      - meta analysis initial state places player at [23,6], explicit goal [0,6].
      - interface_goal_A and interface_goal_B confirm the two explicit goal directions and same-cell self-pairs.

  returned_solution_costs_and_events:
    status: supported
    evidence:
      - base returned shortest solution: found yes, cost 39, events walk=35, push_ice=4, ice_rebound_d4=4.
      - meta returned shortest solution: found yes, cost 47, events walk=43, push_ice=4, ice_rebound_d4=4.

  graph_complete:
    status: supported
    evidence:
      - base graph status complete, reachable_states=3038, legal_transitions=7546, winning_states=1.
      - meta graph status complete, reachable_states=3038, legal_transitions=7546, winning_states=1.
      - base_no_late and meta_required also report complete graph scans for their checked starts.
    graph_reading:
      graph_fact: complete graph with one winning state for each explicit instance
      neutral_meaning: state graph was not budget-exhausted for these starts/goals
      player_facing_interpretation: graph-dependent event-gate and reachable-exposure checks may be used for these instances
      verdict_effect: supports hard event/exposure claims, but does not by itself prove a unique route or per-object necessity

  d4_required_gates:
    status: supported_at_event_type_level
    evidence:
      - base_no_late: missing required winning events ice_rebound_d4 not found; complete search; explored=3164.
      - meta_required: missing required winning events ice_rebound_d4 not found; complete search; explored=3158.
    limit:
      - This proves ice_rebound_d4 is required as an event type on winning paths under the checked instances.
      - It does not prove that every winning path uses the same four returned-solution pushes, same order, same directions, or same object instances.

  base_forbidden_reachable_d5_restart_d6:
    status: supported
    evidence:
      - mechanic_exposure_sequence lists ice_pass_through_d5 and slide_restart_after_group after d4, and ice_destroy_group_d6_plus after that.
      - base_no_late complete reachable scan has forbidden reachable events ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus configured.
      - base_no_late reports Forbidden reachable hits: none.
      - reachable event counts include walk, push_ice, ice_rebound_d4, ice_stop_short:d1, push_ice_failed only.

  interface_pair_policy:
    status: supported_for_declared_policy
    evidence:
      - static layout check finds only two edge floor cells: [0,6] and [23,6].
      - interface_goal_B confirms [0,6]->[23,6] cost 39 and [23,6]->[23,6] cost 0.
      - interface_goal_A confirms [23,6]->[0,6] cost 47 and [0,6]->[0,6] cost 0.
      - no outside edge floor exists in the layout, so the stated risky class "any edge goal outside [0,6] or [23,6]" has no layout cell to instantiate.
    limit:
      - The evidence supports the declared explicit-goal pair policy, not an any-edge win policy.
```

## Returned-route 坐标与对象声明

```yaml
supported_returned_route_facts:
  base:
    - returned solution snapshots show d4 pushes at steps 8, 15, 26, 33.
    - the snapshots support the packet's description of horizontal borrow/repay around the two target/lock coordinates [6,6] and [16,6] for the returned route.
  meta:
    - returned solution snapshots show d4 pushes at steps 9, 16, 31, 38.
    - the snapshots support the packet's description of vertical borrow/repay around the same two target/lock coordinates [16,6] and [6,6] for the returned route.

unsupported_or_overclaimed:
  - No instance-level object participation was reported in either base or meta analysis.
  - The provided all-solution checks are event-type gates for ice_rebound_d4, not object-participation gates.
  - A complete graph plus one winning state does not prove there is only one winning route, nor that every winning route uses the same four pushes, same order, same directions, or the same object instances as the returned solution.
  - Therefore, any claim that upgrades "the returned solution uses the same two coordinates with horizontal vs vertical roles" into "all solutions necessarily use those same objects/coordinates in that role/order" is not supported by the current evidence.
```

## Claim 卫生

```yaml
claim_hygiene:
  supported_if_scoped_as:
    - layout/interface coordinate facts
    - explicit base/meta start-goal facts
    - returned shortest solution cost and returned event counts
    - event-type all-winning-path requirement for ice_rebound_d4
    - base complete reachable absence of d5/restart/d6 forbidden exposure
    - returned-route evidence that the two listed lock coordinates are used horizontally in base and vertically in meta

  not_proven_by_tools:
    - player_insight as a player psychology claim
    - why_not_execution_only as a quality/aesthetic claim
    - "meta is not suffix repetition" as an aesthetic judgment
    - per-object all-solution necessity for the two lock coordinates
    - exact all-solution count of four d4 pushes, unless explicitly scoped to the returned shortest solution
```

## Evidence Limits

```yaml
evidence_limits:
  - Target Event Checks inside the base/meta analysis reports say detector configured: false, so those sections alone cannot support required-event claims; the support comes from base_no_late and meta_required winning-path probes.
  - Returned snapshots are valid evidence for returned-route event instances, but not for all-solution object necessity.
  - Graph completeness supports using reachable scans and winning-path probes for the checked instances; it does not convert graph facts into puzzle-quality evidence.
  - Interface evidence covers only the explicit goal instances and same-cell self-pairs described by the packet.
```

## Questions For Designer

```yaml
questions_for_designer:
  - none_required_for_current_hard_evidence_review
  - If a future packet wants to claim per-object or per-coordinate necessity across all winning paths, add an object/coordinate participation detector or all-solution gate for those exact pushes.
```

## Final Reviewer Note

The candidate's hard evidence supports the declared explicit interfaces, base/meta start-goal setup, returned solve costs/events, complete graph status, event-type d4 required gates, and base forbidden reachable absence through the requested late events. The proposal remains evidence-supported only if the cross-axis same-lock claim is kept as a returned-route/returned-solution coordinate fact rather than upgraded into an all-solution object proof.
