review_iteration: review_2_subagent_evidence
candidate_version_reviewed: RA_LEX_2026_07_07_BIND_CUT_TAIL_v1
review_input_type: candidate_version
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none

supported_claims:
  - claim: "核心胜路事件组 force_chain / box_to_sticky / sticky_merge / sticky_to_box / move_sticky_rigid 必经"
    support:
      - "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_core5.md: combined probe complete, found bypass=false"
      - "各 individual probe 均 complete 且 no winning bypass found"
    judgment: supported
  - claim: "box_to_sticky >= 2 是胜路必要条件"
    support:
      - "prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_box_to_sticky_min2_box_to_sticky_min2.md: complete, no win below two box_to_sticky events"
    judgment: supported
  - claim: "winning sticky_to_box 必须发生在 sticky_merge 之后"
    support:
      - "prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_cut_before_merge.md: complete, found violation win=false"
    judgment: supported
  - claim: "返回解中的 CC -> C+M -> MM、merge 后反推切回 C+M、C 上 top_goal、M 尾部推进到 tail_goal"
    support:
      - "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1.md: snapshots step 3/4/10/14/15-17 match this returned trace"
    judgment: supported_as_returned_trace
  - claim: "top_goal 对切割责任有结构作用"
    support:
      - "no_top_goal analysis shortest cost 17 -> 6"
      - "no_top_goal core5 probe found bypass missing sticky_to_box with inputs: down right right right right right"
    judgment: supported
  - claim: "tail_goal 对最后尾部推进有结构作用"
    support:
      - "no_tail_goal analysis shortest cost 17 -> 14"
      - "no_tail_goal returned shortest trace stops after top_goal placement and omits original final three right pushes of the sticky tail"
    judgment: supported_with_scope_limit

unsupported_or_overclaimed:
  - "`allowed_exposure_through` 不能作为硬 exposure-window / knowledge-stage 结论通过：未找到 reality_anchor mechanic_exposure_sequence.yml，packet 也未提供等价 sequence；且 fixed-anchor reachable scan 显示 `anchor_boundary_shift:box_sticky` 在可达图中出现。当前 verdict 只接受它作为机制上下文/核心事件列表，而不是 later-event exclusion claim。"
  - "不能声明 fixed B/S anchor 不会移动或不可触发；prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_bs_reachable_shift_scan.md 的 reachable scan complete 且有 99 个 `anchor_boundary_shift:box_sticky` hits。候选包已写明不声明 anchor shift 不可达，因此未构成 active overclaim。"
  - "不能声明唯一解或唯一输入序列；packet 已明确不声明唯一输入序列，现有证据也没有 unique-solution 证明。"
  - "不能声明对象实例级身份必要性；layout analysis 明确未报告 instance-level object participation。候选包已明确不声明对象实例级身份必要性。"
  - "tail_goal 的反事实足以支持“移除尾目标会省掉最后尾部消费段”；但不足以单独证明所有胜路中都由同一个/某个特定 M 实例覆盖 tail_goal，或证明 per-object necessity。"

evidence_limits:
  - "工具证据支持事件门、返回 trace 和两个删目标反事实；不证明 player_insight 或 why_not_execution 的玩家心理成立，只支持其机制前提。"
  - "graph_status=complete 只说明相关可达/探针搜索未预算耗尽；不得转写为质量、审美、难度或好玩结论。"

graph_notes:
  - graph_fact: "base graph complete; reachable_states=2654; legal_transitions=7018; winning_states=4"
    neutral_meaning: "原始布局的图搜索在给定预算内完成，可作为事件 bypass / reachability 证据背景。"
    player_facing_interpretation: "这只说明没有在完整搜索范围内发现缺少核心事件的胜路，不说明关卡质量。"
    verdict_effect: evidence_support_only
  - graph_fact: "SCC/agency reports forced commitment prefix length 3 / forced viable prefix length 3"
    neutral_meaning: "开局前三个进展承诺较收束。"
    player_facing_interpretation: "这是 critic 可讨论的引导/脚本化风险，不攻击工具证据对核心事件 claim 的支持。"
    verdict_effect: none

questions_for_designer:
  - "若后续版本要把 `allowed_exposure_through` 当成正式 exposure gate，请补 mechanic exposure sequence 或等价 sequence，并提供完整 reachable scan 排除 later events。"
  - "若要把 tail_goal 责任升级为 all-winning-path 的材料/对象级结论，请补 target-cover/object participation 或 per-target material necessity 证据。"
