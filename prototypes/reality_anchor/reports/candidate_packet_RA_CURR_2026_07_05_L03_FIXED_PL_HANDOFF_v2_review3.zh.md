# Candidate Packet: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2 review_3

candidate_version: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2
review_iteration: review_3
prototype: reality_anchor
slot: 第三关 / 固定 P/L handoff 应用
review_reason: post-archive human micro tweak

## Change From Review 2

Human follow-up `HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_002`指出：左下区域多余，开局 `下，右，下` 会进入过长死路；第三关是前期教学关，不需要这种误导。controller 按反馈只补一格墙，将第 5 行从 `#..#G####` 改为 `#.##G####`。

该修改的预期效果：

- 截短左下无机制收益的探索死路。
- 保留同一箱子先 push 两次、再 pull 两次的 6 步主解。
- 不改变固定 P/L、单箱、单目标、第三关应用 witness 身份。

## Prototype Context

confirmed_rules:
  - `P/L` 是相邻二格推拉锚点；位于 `P` 一侧时执行 push，位于 `L` 一侧时执行 pull。
  - 被墙隔离的 P/L 不应在可达图中产生 `anchor_boundary_shift:push_pull`。
  - 无 `B/S` 时全图默认 box world，不应出现材料转换或 sticky 刚体事件。
  - 箱子覆盖全部目标后胜利；玩家站在目标上不算覆盖。

campaign_plan_context:
  - 第三关要求固定 P/L，玩家通过分界线上的小腾挪把同一个箱子移动到目标位置。
  - 第三关需要实际分别用到 push 与 pull 机制，但不需要额外惩罚性死路。

## Solve Instance

```text
#########
#########
#@C..#P##
#....#L##
#.##G####
#....####
#########
```

player_start: [1, 2]
player_goal: null
win_condition: all_targets_covered_by_objects

## Design Claim

player_insight:
  第三关把 v1 的单推单拉 handoff 放大成同一箱子的短距离练习：玩家需要先在 push side 将箱子向右推两格，再切到 pull side 将同一个箱子向下拉两格。推与拉方向不同，目标是熟悉固定 P/L 分界上的位置切换，而不是制造挑战深度。

causal_chain:
  1. 箱子从 push side 起步，向右推两次到目标上方。
  2. 玩家绕到箱子下方的 pull side。
  3. 第一次下拉把箱子带到目标上方一格，玩家站上目标但不胜利。
  4. 第二次下拉把箱子覆盖目标。
  5. 目标左侧墙阻止“一次 pull 后绕回上方再 push”的旁路。
  6. 左下微墙截短开局 `下，右，下` 死路，降低第三关的无收益惩罚。

why_not_execution:
  这是早期应用练习；它比 v1 多了实际重复操作和空间切换，但仍保持短小、低噪声。微调只减少左下无收益探索，不增加新的机制负担。

falsification:
  若存在无需 push、无需 pull、少于两次 push、少于两次 pull、P/L 可移动、或出现 B/S / sticky 材料事件的胜路，则该版本不满足第三关应用 claim。若微墙改变了 6 步主解或引入更强无意义脚本化，也需要重新修改。

## Evidence

commands_run:
  - `npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt --id RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2 --title "Fixed P/L handoff v2" --role mechanic_witness --support medium --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write`
  - `npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_push_pull_required 300000 80 push_event=push_object pull_event=pull_object`
  - `npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2 push_object 2 300000 80`
  - `npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2 pull_object 2 300000 80`
  - `npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2 push_pull 300000 80`

solver_result:
  found: true
  cost: 6
  depth: 6
  inputs: `right right down right down down`
trace_summary:
  - step 1 `right`: `push_object:crate#1`
  - step 2 `right`: `push_object:crate#1`
  - step 5 `down`: `pull_object:crate#1`
  - step 6 `down`: `pull_object:crate#1`

winning_path_event_checks:
  push_pull_required_probe:
    status: complete
    found_bypass_missing_push: false
    found_bypass_missing_pull: false
    explored_states_push_group: 143
    explored_states_pull_group: 130
  push_count_probe:
    status: complete
    found_bypass_below_two_push_events: false
    explored_states: 221
  pull_count_probe:
    status: complete
    found_bypass_below_two_pull_events: false
    explored_states: 132

reachable_event_exposure:
  status: complete
  reachable_states: 130
  legal_transitions: 294
  forbidden_anchor_or_material_hits: none
  event_counts:
    pull_object:crate#1: 10
    push_object:crate#1: 6
    walk: 278

graph_evidence:
  graph_status: complete
  winning_states: 13
  scc_shape: one_win_continuation_per_scc
  scc_solution_irreversible_steps: 2
  scc_handoff_scriptiness: "0/2 scripted handoffs; both phase handoffs have reposition room"
  delta_from_review_2: "reachable states 154 -> 130; legal transitions 385 -> 294; shortest solution and required event claims unchanged."

## Evidence Limits

- No unique route is claimed.
- Object identity is inferred from the returned single-crate trace and supported by the layout having exactly one crate.
- Review 2 independent artifacts predate the micro wall tweak; review 3 should treat the rerun evidence above as current.
- The fixed-anchor probe's material-normalization missing groups are expected because this slot intentionally has no B/S; only `fixed_push_pull_effect` and reachable forbidden-event scan are relevant here.

## Diagnostic Routing

hard_evidence:
  - Verify the post-tweak graph is complete and still supports at least two push and at least two pull events.
  - Verify the fixed P/L did not move and no B/S / sticky events appeared in reachable scan.
player_side:
  - Check whether the one-wall change is a role-fit improvement for the planned third slot by removing a long early dead end.
  - Check that the wall does not undermine the intended small handoff exercise or overclaim challenge depth.

## Archive Taste Context

examples:
  - candidate_id: RA_CAND_0008
    status: accepted
    aesthetic_score: 2
    difficulty_score: 1
    human_comment: 简单推拉锚点引入关
    calibration_use: immediate previous teaching lower bound; simple functional witness is acceptable when it cleanly teaches the slot.
  - candidate_id: RA_CAND_0010
    status: accepted
    aesthetic_score: 3
    difficulty_score: 2
    human_comment: 结构简单，逻辑清晰
    calibration_use: next-slot clarity anchor; early P/L applications should be clean and not inflated by irrelevant dead ends.
  - candidate_id: RA_CAND_0006
    status: accepted_negative_example
    aesthetic_score: 2
    difficulty_score: 5
    human_comment: 小目标位置变化弱化机制美感并抬高路线复杂度
    calibration_use: negative anchor against difficulty inflation through noisy routing.

## Artifact Refs

- prototypes/reality_anchor/docs/关卡规划.md
- prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_human_micro_tweak.zh.md
- prototypes/reality_anchor/reports/revised_design_claim_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_push_pull_required.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_push_object_min2.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_pull_object_min2.md
- prototypes/reality_anchor/reports/fixed_anchor_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.md
- prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.md
