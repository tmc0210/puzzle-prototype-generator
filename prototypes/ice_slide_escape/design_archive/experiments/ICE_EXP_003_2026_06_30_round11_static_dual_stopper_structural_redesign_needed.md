# Experiment Run: ICE_EXP_003 round11 static dual stopper

```yaml
run_id: ICE_EXP_003_2026_06_30_round11_static_dual_stopper_structural_redesign_needed
experiment_id: ICE_EXP_003_all_knowledge_endgame_capstone
prototype: ice_slide_escape
terminal_state: structural_redesign_needed
structural_redesign_needed_candidates:
  - ICE_CAND_0018
review_integrity: independent_review
human_review: pending
```

## Context

本轮在 `ICE_CAND_0017` 被 critic 打回后继续。0017 的主要失败是 C 虽然先
服务 E、再成为 final A 的 d5:len3 材料，但 D/E 仍像右侧局部模块输出材料
token，且开头 target-eject 仍然自然触发。

新假设是取消开头 target-eject，并让 C 完全不移动：C 作为静态结构同时承担
E 的第二 stopper 和 A 最终 d5:len3 的第一障碍。D 也承担双重职责：先作为 E
的第一 stopper，再牺牲打开 edge goal。

## Submitted Version

```yaml
candidate_version: ICE_CAND_0018_v3_static_c_dual_stopper
player_start: [0, 9]
player_goal: [15, 2]
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0018_scratch_v3_static_c_dual_stopper.txt
trace_ref: prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0018_v3_static_c_dual_stopper.md
```

```text
################
#.GG.##I.....I.#
#.#..#.*.......#
#..###...#######
#..###..########
#..###.I########
#..###..########
#..###.#########
#.I....#########
...#############
################
```

## Evidence

```yaml
layout_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0018_v3_static_c_dual_stopper.md
  result: pass
  graph_status: complete
  reachable_states: 6962
  winning_states: 1
  shortest_cost: 34
  push_count: 5
required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0018_v3_precise_required_probe.md
  result: pass
  graph_status: complete
  reachable_states: 6962
  winning_states: 1
  missing_required_win: not_found_complete_search
all_edge_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0018_v3_all_edge_starts.md
  result: pass
  checked_edge_starts:
    - [0, 9]
```

## Review Loop

```yaml
review_1:
  candidate_version_reviewed: ICE_CAND_0018_v3_static_c_dual_stopper
  evidence_reviewer:
    verdict: caveated_pass
    review_loop_state: proposal_ready_with_caveats
    required_action: preserve_event_family_caveat
    summary: >
      Evidence supports the declared [0,9]->[15,2] instance, 34-input
      5-push returned trace, complete graph at 6962 states, 1 winning state,
      no complete-search winning path missing the declared required event
      families, and only [0,9] in the all-edge-start report. Caveat: the
      reports do not provide instance-level object participation, so the
      A/B/C/D/E roles are trace-level labels; required-event evidence proves
      event-family necessity, not object-level all-path uniqueness.
  design_critic:
    verdict: structural_redesign_needed
    review_loop_state: structural_redesign_needed
    required_action: change_structure_family
    summary: >
      0018 is cleaner than 0017: it removes the natural target-eject opening,
      preserves C as a static dual-use structure, and makes D first serve as
      E's stopper before opening the edge goal. However the solve still reads
      as B -> E -> D -> E -> A, a compressed linear opening chain. C's value is
      mostly passive preservation, D/E remains local, and the 5-push density is
      not enough to create a nonlocal high-difficulty insight.
  loop_result: structural_redesign_needed
```

## Terminal Notes

Do not continue this branch by simply adding more links after A or before B.
The next structure should make an early local convenience actively threaten a
future global resource, or make a later remote A/B condition determine the
timing of a D/E action. The key target is not longer dependency length, but a
player-facing conflict where the locally obvious move must be rejected because
of a later reinterpretation.
