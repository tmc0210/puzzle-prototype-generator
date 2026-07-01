# ICE_EXP_META_2026_07_01_round4_shared_rebound_crossbar_held_proposal

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round4_shared_rebound_crossbar_held_proposal
prototype: ice_slide_escape
terminal_state: held_proposal
candidate_id: ICE_CAND_0023
review_integrity: independent_review
archive_eligibility: human_pending
```

## Brief

本轮目标是尝试更强的 meta 关：base 流程尽量是游戏中后期较难
application/challenge，meta 流程是更后期 challenge；base/meta 必须有强要素复用，
最好有空间复用；两条逻辑链必须不同，且不能把跨时间复用回灌成 base 或 meta 单
流程自身复杂度。

额外硬门：

```yaml
edge_reachability_gate:
  reject_if:
    - any A/B/C/D start can solve to a non-A/B/C/D edge goal
    - any A or B start can solve to C or D
```

## Archive Taste Context

只使用带人类评语的 archive candidate 做口味校准，未复用其 layout、几何结构、
因果链、路线、对象摆放或入口出口关系。

```yaml
used:
  ICE_CAND_0012:
    role: positive_with_caveats
    lesson: 清晰链和强复用可接受，但“看见冰推最远”缺洞见。
  ICE_CAND_0019:
    role: positive_reference
    lesson: 延迟 hidden stopper 能把显然开锁转化为非局部回读。
  ICE_CAND_0020:
    role: overclaim_calibration
    lesson: base/meta 跨时间复用不能拔高单流程复杂度。
  ICE_CAND_0022:
    role: meta_calibration
    lesson: 功能性扎实 meta 可接受；轻 base 与低污染本身是中性选择，优点在于二者和前期生态位恰好匹配。
```

## Family Attempts

### family_1: shared target crossbar v2

```text
##############
#....#########
..IGI#.....I..
#....#######.#
..IGG#.....I..
###########..#
###########I.#
###########..#
##############
```

Result: review_1 required major revision.

Evidence:

- base A->B complete, 1703 states, 1 winning state, 3 pushes, d1/d2 only.
- meta C->D complete, 260 states, 1 winning state, 4 pushes, required d5/restart passes.
- edge scan passes hard reachability gate.

Critic attack:

- base is still a target-stopper cascade / witness-plus, not the requested mid-late challenge.
- meta is clean but linear.
- cross reuse is strong enough to keep, but cannot rescue base role fit.

### designer_action_1: v4 shared rebound crossbar

Change: replace the base middle target fill with a required d4 rebound from lower-left
material. Preserve meta right-side d5/restart route and cross-target reuse.

Final held layout:

```text
##############
#....#########
..IGI#.....I..
#....#######.#
..IGG#.....I..
#....######..#
#....######I.#
#...I######..#
#....#########
##############
```

Base A->B:

```text
[2,2] right d1 -> [3,2]
[4,7] up d4 rebound using [4,2] -> [4,4]
[2,4] right d1 using [4,4] -> [3,4]
```

Meta C->D:

```text
[11,2] left d5:len2 through [5,2]+[4,2], using [2,2] -> [3,2]
[11,4] left d5:len1 through [5,4], using [2,4] -> [3,4]
[11,6] up d2 -> [11,4]
[11,4] left d5:len1 through [5,4], using [3,4] -> [4,4]
```

### family_1 repair attempt v5

Tried to add a target-debt/refill layer under the lower d4 ice. Solver found a different
route: the new lower ice became the final d4 filler while the supposed target debt stayed
filled. High-budget graph also exceeded 500000 states. Abandoned as claim drift and tool
cost blowup.

## Evidence Summary

```yaml
v4_base:
  report: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0023_v4_base_A_to_B_high.md
  found: true
  cost: 20
  pushes: 3
  graph_status: complete
  reachable_states: 173931
  winning_states: 3
  required_probe:
    report: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0023_v4_base_goal_B_required_high.md
    status: pass
    missing_required_win: none_found_complete
    required:
      - ice_rebound_d4
      - ice_stop_short:d1
v4_meta:
  report: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0023_v4_meta_C_to_D.md
  found: true
  cost: 18
  pushes: 4
  graph_status: complete
  reachable_states: 260
  winning_states: 1
  required_probe:
    report: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0023_v4_meta_goal_D_required.md
    status: pass
    missing_required_win: none_found_complete
    required:
      - ice_pass_through_d5:len2
      - ice_pass_through_d5:len1
      - slide_restart_after_group
      - ice_stop_short:d1
      - ice_stop_short:d2
edge_scan:
  report: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0023_v4_ABCD.md
  method: per_start_complete_reachable_graph_edge_goal_record
  represented_pairs: 176
  solved_pairs: 8
  ABCD_to_non_ABCD: 0
  A_or_B_to_C_or_D: 0
  exhausted_start_graphs: none
```

## SCC / Graph Reading

```yaml
graph_interpretations:
  - graph_fact: "base graph complete: 173931 states, 3 winning states; required probe requires d4 rebound and d1."
    neutral_meaning: "没有发现绕过 d4 rebound 或 d1 short-stop 的胜路。"
    player_facing_interpretation: "玩家必须处理先短停、再借同一 [4,2] 结构做 d4 rebound 的关系。"
    verdict_effect: "supports held; does not prove late-game challenge quality."
  - graph_fact: "meta graph complete: 260 states, 1 winning state; required d5/restart probe passes."
    neutral_meaning: "meta 路线依赖声明的 d5/restart 事件组合。"
    player_facing_interpretation: "玩家会经历干净的右侧重读链，但仍可能觉得顺序线性。"
    verdict_effect: "supports meta robustness with caveat."
  - graph_fact: "edge scan represented 176 start-goal pairs; ABCD->nonABCD=0 and A/B->C/D=0."
    neutral_meaning: "所选接口没有非目标边缘泄漏。"
    player_facing_interpretation: "玩家不会因接口泄漏误读 base/meta 边界。"
    verdict_effect: "passes hard reachability gate."
```

## Review Loop

```yaml
review_1:
  candidate_version_reviewed: ICE_CAND_0023_v2_shared_crossbar
  evidence_reviewer:
    verdict: supports_with_caveats
    required_action: none
    summary: >
      Evidence supports base as a d1/d2 short-stop chain and meta as a d5/restart
      right-side route. Caveat: cross reuse cannot increase base/meta single-flow
      complexity.
  design_critic:
    verdict: weak_reject_for_current_goal
    review_loop_state: needs_revision
    required_action: major_revision
    summary: >
      Strong object reuse, but base remains target-stopper witness-plus and meta
      is too linear for the stated goal.
designer_action_1:
  action: structural_revision_to_v4
  summary: >
    Keep the shared target crossbar and meta route, but make base middle target
    require a d4 rebound from lower-left material.
review_2:
  candidate_version_reviewed: ICE_CAND_0023_v4_shared_rebound_crossbar
  evidence_reviewer:
    verdict: evidence_supports_revised_claim_with_noncore_caveats
    required_action: none
    summary: >
      Evidence supports revised base/meta claim. Base d4 rebound is necessary;
      meta d5/restart route and edge isolation are supported.
  design_critic:
    verdict: held_proposal
    review_loop_state: held_proposal
    required_action:
      - "For proposal_ready, either strengthen base's player-facing nonlocal read or explicitly downgrade to held."
      - "Keep meta linearity caveat."
    summary: >
      v4 is worth human priority because role reuse is real, but base remains
      application-lite and meta remains linear. Terminal state: held_proposal.
```

## Terminal

```yaml
terminal_state: held_proposal
proposal_ready: false
reason: >
  v4 is a useful meta design material and worth human review, but latest critic
  did not allow proposal_ready_with_caveats because base still falls short of
  the requested mid-late hard application/challenge role.
```
