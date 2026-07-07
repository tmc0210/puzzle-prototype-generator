# Candidate Packet: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2 / review_2

candidate_version: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2
review_iteration: review_2
prototype: reality_anchor

## Revision Brief

人类反馈要求确认 v1 右上黏块和上方空格的作用，无作用则删除；随后补充建议如果右上可删，起点也可左移并整体删最右。反事实显示最右活动列可删并保持原核心链；但三个局部起点左移版本均完整无解。因此 v2 采用可证安全的裁最右活动列方案，不声明起点局部左移成立。

## Solve Instance

```text
########
##MG.M@#
#.M.M..#
#BSLP#.#
#.G..#.#
########
```

## Design Claim

player_insight:
  top_goal 仍然必须先覆盖、再腾空、最终回填；B/S 与 P/L 共同制造材料和站位责任反转。
revision_claim:
  右上远端活动列不是核心责任；删除后保持同一 27 步主解、核心事件必经性和 target-vacate 必经性。
falsification:
  若存在缺少 core7 任一事件组的胜路，或 top_goal 不经历 covered -> uncovered -> covered 的胜路，则 v2 claim 失败。

## Evidence

solver_result:
  found: true
  cost: 27
  inputs: `down left left down left right up up left right down right right up left left down down left up right down up left down right up`
graph:
  status: complete
  reachable_states: 449
  legal_transitions: 975
  winning_states: 1
core7:
  artifact: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2_trimcol_core7.md
  combined: complete, found_bypass=false
  required_groups:
    - push_pull_shift
    - box_sticky_shift
    - pull_event
    - box_to_sticky
    - sticky_to_box
    - sticky_rigid
    - sticky_merge
target_vacate:
  artifact: prototypes/reality_anchor/reports/target_vacate_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2_trimcol_target_vacate.md
  target: [3, 1]
  result: complete, found_bypass=false
left_start_attempts:
  - layout: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2_leftstart_layout.txt
    result: complete no-win, 173 reachable states
  - layout: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2_shift_handle_layout.txt
    result: complete no-win, 33 reachable states
  - layout: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2_leftstart_handle_right_layout.txt
    result: complete no-win, 156 reachable states
evidence_limits:
  - 不声明唯一输入序列。
  - 不声明对象身份级必要性。
  - 不声明起点可通过局部修改左移；该建议需要更大结构重做。

## Artifact Refs

- prototypes/reality_anchor/reports/designer_action_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_human_feedback.zh.md
- prototypes/reality_anchor/reports/RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2_trimcol_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2_trimcol.md
- prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2_trimcol_core7.md
- prototypes/reality_anchor/reports/target_vacate_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2_trimcol_target_vacate.md
