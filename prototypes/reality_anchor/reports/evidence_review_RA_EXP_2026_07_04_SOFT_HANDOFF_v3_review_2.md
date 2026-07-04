review_iteration: review_2
candidate_version_reviewed: RA_EXP_2026_07_04_SOFT_HANDOFF_v3
review_input_type: candidate_version
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
supported_claims:
  - claim: "v3 的 id 与 layout 在 packet、design claim、layout txt、layout/level analysis、event probes、trace 与 levels.yml 中一致。"
    evidence:
      - "candidate packet、design_claim_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.zh.md、RA_EXP_2026_07_04_SOFT_HANDOFF_v3_layout.txt、layout_analysis / level_analysis、event_probe、core6 event_probe、trace 与 levels.yml 均使用 id RA_EXP_2026_07_04_SOFT_HANDOFF_v3。"
      - "所有上述 artifact 的初始 layout 均为：######### / ####C@..# / ###G.G..# / ####PL.M# / ####..BS# / #########。"
      - "levels.yml 条目标题为 Soft handoff v3，role=challenge，status=candidate，targets=[K_runtime_smoke]，layout 与 packet 完全一致。"
    support_level: "supports_claim"
  - claim: "返回解实例支持 packet 所写的 13 步机制链条前提。"
    evidence:
      - "layout_analysis / level_analysis 报告 shortest solution found=yes，cost=13，depth=13，explored_states=356，inputs=down up right right down left down left down left up right left，walk_steps=4。"
      - "trace Step 2: pull_object:push_pull_anchor 与 anchor_boundary_shift:push_pull，支持 P/L 早段移动。"
      - "trace Step 8: pull_object:sticky#1、move_sticky_rigid、sticky_to_box:n1，支持 sticky 刚体移动和材料归一化实例。"
      - "trace Step 10: pull_object:box_sticky_anchor、anchor_boundary_shift:box_sticky、box_to_sticky:n2、sticky_merge:n1，支持 B/S shift、材料归一化和 sticky merge 实例。"
      - "trace Step 11 与 Step 13 均出现 anchor_boundary_shift:push_pull；Step 13 同时出现 pull_object:sticky#1、force_chain:n2、move_sticky_rigid、sticky_to_box:n2，并 win=true。"
    support_level: "支持 returned-solution event instance 与 causal-chain premise；不等同于所有胜路的精确输入顺序。"
  - claim: "core6 all-solution event gates 支持 central 机制组：P/L shift、B/S shift、pull、material_normalization、sticky_merge、sticky_rigid_move。"
    evidence:
      - "event_probe_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_core6.md 的 Combined Probe: Required groups=push_pull_anchor_shift, box_sticky_anchor_shift, pull_event, material_normalization, sticky_rigid_move, sticky_merge；status=complete；found_bypass=false；explored_states=4422。"
      - "core6 individual probes 均为 status=complete、found_bypass=false：push_pull_anchor_shift explored_states=2891；box_sticky_anchor_shift explored_states=2891；pull_event explored_states=2848；material_normalization explored_states=2874；sticky_rigid_move explored_states=2828；sticky_merge explored_states=4254。"
      - "非 core6 event_probe 也对前五组给出 complete / found_bypass=false；sticky_merge 的 all-solution gate 由 core6 probe 补足。"
    support_level: "支持 named event-group all-solution necessity；不支持 exact event instance、object identity、per-target assignment 或 exact route。"
  - claim: "graph complete，graph-dependent event gate / reachability 结论没有 graph exhausted unknown。"
    evidence:
      - "layout_analysis / level_analysis Graph Facts: Status=complete，reachable_states=2828，legal_transitions=6093，event_only_illegal_transitions=0，winning_states=1，budget maxStates=300000。"
      - "Agency Facts: Status=complete，compressed_regions=574，winning_regions=1，reachable_states=2828，legal_transitions=6093。"
    scc_graph_interpretation:
      graph_fact: "graph status complete；agency status complete；winSubgraph=branching_win_dag；forcedWinPrefix=7/9；handoff scriptiness scripted=7/9；after step 8 region has multiple viable choices."
      neutral_meaning: "给定预算内可达图与压缩图枚举完成；胜利方向存在分支/汇合结构，同时返回解中若干不可逆 handoff 段是强制或脚本化的。"
      player_facing_interpretation: ""
      verdict_effect: none
    support_level: "支持证据完整性和 graph-dependent claims 的可用性；SCC / graph facts 在本审查中不是审美、好玩、难度或 role-fit verdict。"
  - claim: "packet 没有把 exact input order、object identity 或 per-target assignment 声明为 all-solution 结论。"
    evidence:
      - "candidate packet mechanism_scope.not_claimed 明确列出 unique_input_sequence、object_instance_identity_across_all_wins、per-target object assignment across all wins。"
      - "candidate packet object_or_instance_evidence 写明 instance_level_participation=not_reported_by_tool，object_identity_claim=not_claimed。"
      - "levels.yml design_notes 写明不声明唯一输入序列或对象实例级必要性。"
    support_level: "claim hygiene 通过；这些未声明项不需要由现有证据证明。"
unsupported_or_overclaimed:
  - claim: "player_insight 与 why_not_execution 的玩家侧成立性。"
    review: "工具证据支持其机制前提：返回解中有短链、P/L 多次 shift、B/S shift、pull、材料归一化、sticky_merge 与 sticky rigid movement，并且 core6 event gates 未找到绕过这些事件组的胜路。但工具证据不能单独证明玩家会按 claim 所述方式理解，也不能证明 challenge 角色、难度降低或互锁感的设计价值；这些应留给 critic / human review，而不是 evidence reviewer 直接判定。"
    required_revision: false
  - claim: "若把 causal_chain 中的先后关系读成所有胜路的 exact input order 或 exact event order。"
    review: "trace 与返回解 snapshots 支持该具体解的顺序叙事；core6 all-solution probes 只证明事件组不可绕过，不证明所有胜路都按同一输入序列、同一事件实例或同一事件顺序完成。packet 已明确 not_claimed unique_input_sequence，因此当前写法作为 returned-trace causal-chain premise 可接受；若升级为 all-solution exact order claim，需要补专门证据或降级措辞。"
    required_revision: false
  - claim: "若把 'P/L 与 sticky 合力覆盖两个目标' 读成所有胜路的对象身份或逐目标分配。"
    review: "trace Step 13 的最终状态支持返回解实例中 P/L 与 sticky/材料结果共同完成目标覆盖；但 layout_analysis / level_analysis 均写明 No instance-level object participation was reported，现有 probes 也不是 per-target assignment gates。packet 已声明 object identity 与 per-target assignment 不作为 all-solution claim，因此不构成当前硬证据失败。"
    required_revision: false
  - claim: "material_normalization 的具体方向在所有胜路中固定为某一个方向。"
    review: "返回 trace 同时出现 sticky_to_box 与 box_to_sticky；all-solution gate 使用 box_to_sticky|sticky_to_box 组合，只支持所有胜路需要某种 material_normalization，不支持每条胜路的方向、次数或对象实例完全相同。当前 packet 的 required_winning_path_events 使用组合组，因此无需行动。"
    required_revision: false
evidence_limits:
  - "本审查只读取用户允许的本地 artifacts：candidate packet、design claim、layout txt、layout/level analysis、event probes、core6 event probe、trace、levels.yml、v2 evidence review / critic / designer action；未运行 solver、analyzer、probe、npm、check，也未生成新工具证据。"
  - "event_probe 与 core6 event_probe 是 event-group bypass gates；它们不证明 exact route、exact input order、exact event instance、对象身份连续性或跨胜路逐目标分配。"
  - "返回 trace 是一个 winning solution instance；它可支持 packet 的实例级 causal-chain 描述，但不能独立替代 all-solution 证明。"
  - "layout_analysis / level_analysis 明确未报告 instance-level object participation；对象身份链和目标分配只能作为返回解观察，不能作为 all-solution 结论。"
  - "allowed_exposure_through=all_current_reality_anchor_runtime_rules 是宽 exposure 声明；当前没有窄 knowledge-stage 或 later-mechanic 排除 claim。若后续改成窄暴露窗口，需要 mechanic exposure sequence 或等价完整 reachable scan 与 all-solution gate。"
  - "forbidden_if_seen_anywhere: runtime_error 在已读 trace / analysis / graph 摘要中未出现，且 complete graph 报告 event_only_illegal_transitions=0；但未见单独 runtime_error detector 输出。"
  - "Counterfactuals 为 none_configured；没有反事实模型证据支持替代机制排除，只能依赖 event probes 的 no-bypass 结果。"
  - "SCC / graph facts 只用于证据完整性和结构描述；本审查不评价审美、好玩、难度或 campaign placement。"
questions_for_designer:
  - "none_for_current_evidence_gate"
  - "若设计方希望正式声明 all-solution exact order、对象身份连续性或逐目标对象分配，请补对应对象/目标参与证据；否则继续把这些内容限定为返回 trace 的 causal-chain 描述。"
