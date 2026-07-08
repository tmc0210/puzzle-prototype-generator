# Candidate Packet: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - B/S anchor defines box side / sticky side; objects crossing the boundary normalize material during legal move resolution.
    - Sticky cells form orthogonally connected rigid components; material conversion can split one connected component into independent pieces.
    - Crate, sticky, and anchors can cover goals; player standing on a goal does not count.
    - No P/L anchor exists in this candidate.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - push_object:sticky#1 / push_object:sticky#2 are pushes of the two split sticky endpoint components on the returned solution.
    - push_object:crate#2 is the center bridge crate push on the returned solution.
    - sticky_to_box:n3 and sticky_split:n1 are the fixed B/S cut that turns part of the C-shaped sticky into crate and splits the remainder.
    - move_sticky_rigid marks a connected sticky component moving as one rigid body.
  tool_boundary:
    - Runtime adapter, solver, full graph, agency/SCC digest, explain-layout, and local event probes are available.
    - PuzzleScript exporter is not used for this prototype.

slot_brief:
  intended_role: challenge / fresh lexicon-composition candidate
  known_before:
    - K_runtime_smoke
  target:
    - 全新设计并提交合格候选加入试玩列表。
    - 难度至少 3，追求更高。
    - 审美强 3 保底，追求 4 到 5。
    - 本轮测试 designer 使用 mechanism_lab/lexicon.md 的设计语料能力；同目录 runs 不作为设计来源。
  difficulty_or_support_expectation: difficulty 3+ floor; aesthetic strong 3 floor, possible 4- only if critic accepts compact three-output consumption as elegant.

mechanic_exposure_context:
  mechanic_window: full current Reality Anchor runtime
  allowed_exposure_through:
    - K_runtime_smoke
  claimed_core_events:
    - sticky_to_box:n3
    - sticky_split:n1
    - move_sticky_rigid
    - push_object:sticky#1
    - push_object:sticky#2
    - push_object:crate#2

design_target:
  aesthetic_score_target: "strong 3 floor; 4- only if the three-output split-consumption loop is judged more than a tidy witness."
  difficulty_score_target: "3+ floor; pursuit is mechanism reading rather than route tax."
  target_role_notes: >
    Compact challenge built from lexicon vocabulary: a C-shaped sticky footprint is cut by fixed B/S into
    three responsibility objects. The two surviving sticky endpoints and the center crate bridge must each be
    consumed by a different goal.

solve_instance:
  id: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1
  title: Split bridge dual endpoint v1
  layout: |-
    ########
    ####G###
    ###.MM@#
    ##G.M..#
    ###.MM##
    ####G###
    ###BS###
    ########
  player_start: [6, 2]
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - First push the connected C-shaped sticky left across the fixed B/S boundary.
    - The boundary converts the left-side bridge cells into crate and splits the two surviving sticky endpoints apart.
    - The upper endpoint must be pushed upward into the upper pocket goal.
    - The lower endpoint must be pushed downward into the lower pocket goal.
    - The center crate bridge must be pushed left into the center goal, consuming the bridge debt.
  allowed_support:
    - A small right-side stance/read buffer before the first cut.
    - Local reversible walking between the three output consumers.
    - Fixed B/S as semantic boundary only; it does not move.
  incidental_allowed:
    - walk events and equivalent endpoint ordering where evidence does not claim route uniqueness.
  required_winning_path_events:
    - sticky_split
    - sticky_to_box
    - move_sticky_rigid
    - push_object:sticky#1
    - push_object:sticky#2
    - push_object:crate#2
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:box_sticky
    - anchor_boundary_shift:push_pull
    - box_to_sticky
    - sticky_merge
    - pull_object

design_claim:
  player_insight: >
    The C-shaped sticky is not one object to park. It must first be severed by fixed B/S into three outputs:
    two independent sticky endpoints and one center crate bridge. Winning then means assigning each output
    to its own consumer, so the cut is a production step, not just a witnessed event.
  causal_chain:
    - Move into the center/right stance and push the connected C-shape left.
    - Crossing B/S converts the left column to crate and splits the surviving sticky endpoints.
    - Push the upper endpoint into the upper one-cell goal pocket.
    - Push the lower endpoint into the lower one-cell goal pocket.
    - Push the center crate bridge left into the bridge goal.
  why_not_execution: >
    This is not a long-route execution puzzle. The graph is small, but every non-walk action in the returned
    solution creates or consumes one part of the split output. Removing any target shortens the puzzle from
    8 to 6 and removes one output consumer; removing the center handoff stance makes the puzzle unsolved.
  falsification:
    - A winning route without sticky_split or sticky_to_box would refute the fixed B/S severing claim.
    - A winning route without either sticky endpoint push would refute the dual endpoint consumption claim.
    - A winning route without push_object:crate#2 would refute the bridge debt consumption claim.
    - A target deletion that preserves cost and core events would mark that target as redundant.
    - A reachable anchor_boundary_shift:box_sticky would refute the fixed-boundary claim.

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_layout.txt --id RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1 --title "Split bridge dual endpoint v1" --role challenge --support none --targets K_runtime_smoke --write --max-states 300000 --max-depth 80
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_layout.txt RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_core_exact 300000 80 "sticky_split=sticky_split" "sticky_to_box=sticky_to_box" "sticky_rigid=move_sticky_rigid" "top_endpoint_push=push_object:sticky#1" "lower_endpoint_push=push_object:sticky#2" "bridge_crate_push=push_object:crate#2"
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_layout.txt RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_bridge_crate_push_min1 push_object:crate#2 1 300000 80
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_top_goal_layout.txt --id RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_top_goal --title "Split bridge dual endpoint v1 no top goal" --role challenge --write --max-states 300000 --max-depth 80
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_bridge_goal_layout.txt --id RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_bridge_goal --title "Split bridge dual endpoint v1 no bridge goal" --role challenge --write --max-states 300000 --max-depth 80
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_lower_goal_layout.txt --id RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_lower_goal --title "Split bridge dual endpoint v1 no lower goal" --role challenge --write --max-states 300000 --max-depth 80
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_wall_y3x6_layout.txt --id RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_wall_y3x6 --title "Split bridge dual endpoint v1 wall y3x6" --role challenge --write --max-states 300000 --max-depth 80
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_wall_y3x5_layout.txt --id RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_wall_y3x5 --title "Split bridge dual endpoint v1 wall y3x5" --role challenge --write --max-states 300000 --max-depth 80
  solver_result:
    found: true
    cost: 8
    depth: 8
    inputs: down left left up down down up left
    event_counts:
      walk: 4
      push_object:sticky#1: 2
      move_sticky_rigid: 3
      sticky_to_box:n3: 1
      sticky_split:n1: 1
      push_object:sticky#2: 1
      push_object:crate#2: 1
  trace_summary:
    - step_3_left: the connected C-shape crosses fixed B/S, producing sticky_to_box:n3 and sticky_split:n1.
    - step_4_up: upper sticky endpoint is pushed into the upper goal.
    - step_6_down: lower sticky endpoint is pushed into the lower goal.
    - step_8_left: center crate bridge is pushed into the bridge goal.
  target_events:
    K_runtime_smoke:
      detector_configured: false
      returned_solution_covers_detector: true
  object_or_instance_evidence:
    returned_trace_object_participation: analyzer did not report instance-level object participation
    interpretation: claim is about exact event groups and consumed output roles, not all-route object identity.
  winning_path_event_checks:
    core_exact_probe:
      report: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_core_exact.md
      status: complete
      explored_states: 57
      combined_missing_core_bypass: false
      individual_missing_bypass:
        sticky_split: false
        sticky_to_box: false
        sticky_rigid: false
        top_endpoint_push: false
        lower_endpoint_push: false
        bridge_crate_push: false
    bridge_crate_push_min1_probe:
      report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_bridge_crate_push_min1_push_object_crate_2_min1.md
      status: complete
      found_bypass_below_count: false
      explored_states: 57
  reachable_event_exposure:
    full_graph_status: complete
    reachable_states: 57
    legal_transitions: 132
    winning_states: 3
    fixed_anchor_scan:
      report: prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_bs_fixed_scan.md
      status: complete
      reachable_states: 63
      legal_transitions: 154
      forbidden_hits:
        anchor_boundary_shift:box_sticky: none
      reachable_event_counts:
        move_sticky_rigid: 10
        push_object:crate#2: 4
        push_object:sticky#1: 6
        push_object:sticky#2: 4
        sticky_split:n1: 2
        sticky_to_box:n3: 2
        walk: 140
  graph_or_counterfactual_evidence:
    main_graph:
      report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1.md
      status: complete
      reachable_states: 57
      legal_transitions: 132
      winning_states: 3
      initial_region:
        states: 3
        dist: 4
        commitments: 1
        viable_commitments: 1
        dead_commitments: 0
        optimal_commitments: 1
      initial_scc:
        states: 3
        dist: 4
        out: 1
        win_out: 1
        dead_out: 0
      solution_irreversible_path:
        steps: 4
        forced_win_prefix: "1/4"
        branching_win_sccs: 4
        merging_win_sccs: 3
      handoff_scriptiness:
        scripted: "1/4"
        forced_scripted: 0
        max_run: 1
    target_prune:
      status: all_targets_retained
      top_goal:
        cost_delta: "8->6"
        report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_top_goal.md
      bridge_goal:
        cost_delta: "8->6"
        report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_bridge_goal.md
      lower_goal:
        cost_delta: "8->6"
        report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_lower_goal.md
    redundant_element_prune:
      report: prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1.zh.md
      status: pruned
      removed_space_cells:
        - [3, 1]
        - [3, 5]
      retained_space_tests:
        - cell: [6, 3]
          reason: walling preserves cost but turns first action into immediate split; retained for opening comfort.
          report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_wall_y3x6.md
        - cell: [5, 3]
          reason: walling makes the puzzle unsolved.
          report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_wall_y3x5.md
  evidence_limits:
    - Does not claim a unique input sequence.
    - Does not claim all-route object identity beyond exact event groups checked by probes.
    - Fixed-anchor probe default combined winning-path groups include irrelevant pull/P-L expectations; only its reachable scan and fixed B/S material-effect result are cited.
    - Complete graph is used as hard evidence, not as a taste verdict.
    - mechanism_lab/runs is not used as a design source. A broad repository status/search earlier exposed run file paths in terminal output; those contents are excluded from the design claim.

diagnostic_routing:
  hard_evidence:
    status: done
    items:
      - explain-layout complete graph
      - exact missing-event bypass probe for six core groups
      - bridge crate push count probe
      - final goal prune counterfactuals
      - redundant space prune report
      - fixed B/S reachable forbidden-event scan
  mechanism_scope:
    status: done
    reviewer_focus:
      - exact event groups are intentionally narrow.
      - the central question is whether one B/S cut producing three consumed outputs is enough for challenge-grade beauty.
      - no P/L, no anchor movement, no merge, no pull are claimed.
  claim_hygiene:
    status: done
    caveats:
      - no route uniqueness claim
      - no instance identity uniqueness claim
      - no claim that cost 8 alone proves difficulty
  taste_probes:
    - Is the compact three-output split a strong 3 / low 4 idea, or merely a tidy fixed-B/S witness?
    - Does the center crate bridge goal successfully pay off "tail debt", or feel like an extra target?
    - Does retaining the right-side stance buffer help player readability enough to justify the extra floor cell?
  scc_graph:
    status: triggered
    graph_fact: complete graph; initial SCC states=3, out=1, winOut=1, deadOut=0; solution irreversible path has 4 steps; handoff scriptiness 1/4.
    neutral_meaning: first irreversible cut is forced but not immediate; after cutting, the player has small local ordering/stance choices before consuming outputs.
    player_facing_interpretation: reads as compact mechanism assignment more than open search.
  variant_family:
    status: not_routed
    reason: fresh lexicon composition, not archive variant work.
  start_position:
    status: checked
    evidence: main layout starts with two walk steps before first cut; walling [6,3] would make first action the split and was rejected.
  prototype_specific_work:
    invalid_goal_prune:
      status: done_all_targets_retained
    redundant_element_prune:
      status: done

prototype_specific_contracts:
  interface_pair_policy:
    declared_interface_points: []
    target_pairs: []
    ignored_pair_classes: []
    risky_pair_classes: []
  pair_diagnostics:
    ignored_pairs: []
    risky_pairs: []

archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
    authorized_by: null
    candidate_ids: []
    allowed_operations: []
  candidate_relation: fresh
  why_not_archive_variant: >
    Archive entries are used only as human-reviewed taste calibration. The candidate is built from lexicon
    vocabulary around fixed B/S severing, endpoint pockets, and bridge-tail consumption; it does not inherit
    an archive candidate's layout skeleton, route, object roles, or player-side causal chain.

attempt_log:
  serious_structural_attempts:
    - SPLIT_TAIL_TOOTH: showed a clean sticky split plus tail push, but shortest cost 9 and too close to a small witness.
    - bind_before_cut family: rejected because the first cut already reached a C+M state; full binding was not necessary.
    - open C-shape split family: rejected after graph exhaustion / too much irrelevant space.
    - current compact C-shape split: retained after target prune and space prune.
  local_repairs:
    - Added three separate consumers so both endpoint outputs and the bridge crate output are paid off.
    - Removed endpoint-adjacent empty pockets [3,1] and [3,5].
    - Kept [6,3] to prevent immediate first-step cutting and preserve a small opening read.
  abandoned_families:
    - Any family whose cut output was only witnessed and not later consumed.

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0017
      scores: aesthetic 4 / difficulty 5
      human_comment: high-strength endgame using push/pull plus sticky stitching/cutting with high mechanism density and strong coupling.
      relevance: positive upper anchor for dense multi-stage sticky cut usage; this candidate is much smaller and should not inherit that score.
    - candidate_id: RA_CAND_0015
      scores: aesthetic 4 / difficulty 3
      human_comment: concise structure with sufficient mechanism coverage and clear logic chain.
      relevance: positive anchor for compactness with a clear chain rather than route mass.
    - candidate_id: RA_CAND_0018
      scores: aesthetic 3 / difficulty 2
      human_comment: simple fixed B/S cutting transition; aesthetic reaches 3 because a non-obvious return push exists.
      relevance: lower-bound comparison for fixed B/S cut vocabulary; current candidate must beat it by consuming three outputs.
    - candidate_id: RA_CAND_0019
      scores: aesthetic 2 / difficulty 2
      human_comment: moving-anchor cut water level; first push and following pulls are too obvious.
      relevance: negative anchor against mere event witnessing or obvious execution.

claim_last_review:
  mode: not_used
```

## 设计语料使用记录

- `固定 B/S 断桥：sticky split 端点目标袋`：作为主语料，最终布局要求 C 形 sticky 过固定 B/S 后发生 `sticky_to_box:n3` 与 `sticky_split:n1`，并释放上下端点。
- `刚体黏块 + 墙口：单格目标袋消费 connected footprint / 端点独立性`：转化为上下两个一格目标袋；未切开前的 connected footprint 不能分别进入这两个消费者。
- `固定 B/S 切割谱的尾债思想`：把中间转成 crate 的桥段也设置为左侧目标消费者，避免切割只是“见证事件”。
- 设计中补充的衔接逻辑：三个输出采用不同材质 / 方向 / 消费点，上下是 sticky endpoint push，中间是 crate push，形成同一次切割后的责任分配。

## 相关文件

- `prototypes/reality_anchor/reports/design_claim_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1.zh.md`
- `prototypes/reality_anchor/reports/RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_layout.txt`
- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1.md`
- `prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_core_exact.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_bridge_crate_push_min1_push_object_crate_2_min1.md`
- `prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_bs_fixed_scan.md`
- `prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1.zh.md`
