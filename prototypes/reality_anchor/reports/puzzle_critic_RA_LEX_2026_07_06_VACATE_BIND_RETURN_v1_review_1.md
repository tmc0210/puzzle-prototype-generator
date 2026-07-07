review_iteration: review_1
candidate_version_reviewed: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1
review_input_type: candidate_version
verdict: supports_with_noncore_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
strongest_merits:
  - "本候选确实从上一版的“小型事件脚本”升级到状态责任反转：top_goal [3,1] 的 covered -> uncovered -> covered before win 已由 complete/no-bypass target-vacate probe 支撑。"
  - "core7 probe 完整且无 winning bypass，P/L shift、B/S shift、pull、box_to_sticky、sticky_to_box、sticky rigid move、sticky_merge 都是全胜路必经；这使双 anchor 与 material/shape 链不是单条 trace 的装饰。"
  - "step 10 的第一次覆盖、step 25 的腾空、step 27 的回填形成了玩家可感知的“先完成反而不能停”的目标责任链，接近 RA_CAND_0011 的小空间强逻辑。"
  - "删 low_goal 后退化为 2 步 sticky 速解，删 top_goal 后仍需 core7 但少末两步，说明两个目标的职责不同：low_goal 防止早胜并迫使中段迁移，top_goal 承担最终回填义务。"
archive_taste_context_used:
  - "RA_CAND_0002: 人评审美4/难度4，正向点是拉动黏块打破 P/L 单向移动直觉，机制耦合产生洞见。"
  - "RA_CAND_0005: 人评审美4/难度4，正向点是推世界触及拉世界远目标，玩家矛盾明确，需要构造黏块+B/S 三格长链。"
  - "RA_CAND_0011: 人评审美4/难度4，正向点是箱子先上目标、再拉出、再回填的反直觉状态责任，小空间强逻辑。"
  - "RA_CAND_0006: 人评审美2/难度5，负例是小目标位置改动弱化机制美感，并主要通过腾挪复杂度增难。"
  - "RA_CAND_0013: 人评审美2/难度1，简单固定 B/S cut witness；用于防止把单机制 witness 包装成高难亮点。"
score_calibration:
  human_archive_anchors_present: true
  score_claim_allowed: true
  archive_attack_calibration: "complete_positive_negative_and_lower_bound_human_anchors"
  positive_anchors:
    - "RA_CAND_0002"
    - "RA_CAND_0005"
    - "RA_CAND_0011"
  lower_bound_or_negative_anchors:
    - "RA_CAND_0006"
    - "RA_CAND_0013"
  estimated_score_band:
    aesthetic: "4，带 caveat；不建议预称 5。"
    difficulty: "4，健康挑战；不靠长路线膨胀到 5。"
  calibration_reading: "相对 RA_CAND_0013，本候选多了双 anchor、绑定/解绑定、刚体回返和目标责任反转；相对 RA_CAND_0006，27 步不是主要靠目标位置拉长路线，而是围绕同一资源链的撤销与回填。相对 RA_CAND_0011，反直觉状态责任成立，但对象身份级 claim 不足，因此应以 proposal_ready_with_caveats 提交。"
aesthetic_target_fit: "支持 aesthetic>=4，但只支持谨慎 4。最强美感来自同一目标的第一次覆盖必须被撤销，并且撤销不是额外表演，而是为了让资源继续满足 low_goal 和末段回返。P/L 墙格门、B/S material boundary、sticky_merge 与 rigid return 共同解释为什么早期覆盖不能停留，已经超过事件清单。caveat 是 top_goal 删除只减少最后两步，目标仍有一点检查点气味；提交时应强调 state-level responsibility，不应夸成对象身份级精密终局。"
difficulty_target_fit: "支持 difficulty>=4。最短解 27 步，完整图 739 states / 1626 transitions，compressed regions=99，core7 与 target-vacate 都是全胜路必要；玩家需要识别第一次 top_goal 覆盖是中间债务而非完成。难度不是 RA_CAND_0006 式 40 步腾挪膨胀，也不是 RA_CAND_0013 式 2 步 cut witness。但 forced optimal prefix=11/11 提醒它的最优路高度收束，难度应标为 4 而非 5。"
core_attacks:
  - attack: "目标检查点风险"
    target: "top_goal_and_low_goal_roles"
    reason: "no_top_goal 成本 27->25，core7 仍全胜路必经；这说明 top_goal 不引入核心事件，只增加末段回填义务。no_low_goal 成本 27->2，说明 low_goal 是阻断早胜的强目标。"
    resolution: "不构成 structural_revision：top_goal 的价值不在引入事件，而在 complete target-vacate probe 证明全胜路必须 covered -> uncovered -> covered；low_goal 则迫使资源离开 top_goal 后进入下侧责任区。两者共同制造状态责任反转，而不是分别检查某个事件是否发生。"
    verdict_effect: noncore_caveat
  - attack: "脚本化风险"
    target: "player_agency"
    reason: "agency digest 报告 forced optimal prefix=11/11，说明最优路线在压缩图上全程唯一最优；局部 handoff 仍有 scripted_same_state_handoff。"
    resolution: "不构成 blocking attack：SCC path 为 branching_win_dag，branchingWinSccs=5、mergingWinSccs=2，handoff_scriptiness scripted=4/8、maxRun=2，明显弱于上一版全靠短脚本执行的风险。玩家压力来自识别目标状态债务，而不是单纯按唯一可动按钮前进。"
    verdict_effect: caveat
  - attack: "对象身份级必要性未证明"
    target: "design_claim_precision"
    reason: "packet 明确 analyzer 未提供 instance-level object participation；top_goal 的责任反转只能证明目标覆盖状态变化，不能证明同一对象或某个命名对象必须承担全部责任。"
    resolution: "提交文案需要保持 state-level claim：同一目标的覆盖责任被撤销并回填。不要写成“同一个对象必然先覆盖、被释放、再回填”。"
    verdict_effect: noncore_caveat
  - attack: "是否只是 RA_CAND_0013 cut witness 拉长版"
    target: "archive_fit"
    reason: "候选包含 sticky_to_box / box_to_sticky / sticky_merge，可能被误读为固定 B/S cut witness 的扩写。"
    resolution: "该攻击未成立：本候选需要 P/L shift 与 B/S shift 两个可移动 anchor，且 pull、box_to_sticky、sticky_to_box、sticky_merge、rigid movement 全胜路必经；核心不是切出箱子上目标，而是第一次覆盖必须服务于后续撤销和回返。"
    verdict_effect: positive_support
  - attack: "是否落入 RA_CAND_0006 式增难"
    target: "difficulty_source"
    reason: "low_goal 对早胜的阻断很强，目标位置可能被怀疑是在硬化路线。"
    resolution: "不需要 structural_revision：候选没有用大房间和长腾挪堆出难度，主图只有 27 步且事件密度高；删除 low_goal 的 2 步速解反而说明该目标承担核心结构保护。caveat 是提交时不要把目标反事实说成审美本身，它只是证明目标不是多余。"
    verdict_effect: caveat
scc_graph_interpretations:
  - graph_fact: "main_graph complete, reachable_states=739, legal_transitions=1626, winning_states=48"
    neutral_meaning: "图规模适中且完整；winning states 不是单点，说明终局并非只有一个僵硬状态。"
    player_facing_interpretation: "玩家有一定局部调整空间，但仍处在紧凑挑战范围内。"
    verdict_effect: positive_support
  - graph_fact: "agency: compressed_regions=99, initial_commitments=2, viable_commitments=1, dead_commitments=1, progress_commitments=1, optimal_commitments=1"
    neutral_meaning: "开局有一个可行推进和一个死提交，正确方向较快被锁定。"
    player_facing_interpretation: "开局不会是开放搜索关；它更像紧凑因果链挑战。"
    verdict_effect: caveat
  - graph_fact: "bidirectional digest: viable prefix=3/11, optimal prefix=11/11, forced viable commitments=7/11"
    neutral_meaning: "全最优路径高度收束，但全胜路不是从头到尾单一 forced viable。"
    player_facing_interpretation: "若按最短解玩会像精密链条；若探索非最优路线，仍有若干可行承诺差异。该读法支持 difficulty 4，但不支持 difficulty 5 或“开放终局”宣传。"
    verdict_effect: caveat
  - graph_fact: "SCC: sccs=62, edges=96, winReachable=15, winning=1, winSubgraph=branching_win_dag"
    neutral_meaning: "不可逆层面有分支和汇合，最终 winning SCC 单一。"
    player_facing_interpretation: "玩家主要是在一条强因果链里处理责任转移，而不是在大空间中做路线优化。"
    verdict_effect: positive_support_with_caveat
  - graph_fact: "handoff_scriptiness: scripted=4/8, trivial=1, forcedScripted=4, maxRun=2"
    neutral_meaning: "约半数不可逆 handoff 呈脚本化，但没有长连续脚本 run。"
    player_facing_interpretation: "脚本风险存在但受控；相较上一版，状态责任反转给这些 handoff 提供了玩家侧理由。"
    verdict_effect: noncore_caveat
  - graph_fact: "no_top_goal: cost 27->25, core7 still complete/no-bypass"
    neutral_meaning: "top_goal 不负责制造核心事件必要性，只负责末段回填义务。"
    player_facing_interpretation: "这是一个有效但较窄的目标职责；它支持 RA_CAND_0011 式状态回填，但不能单独支撑高分。"
    verdict_effect: caveat
  - graph_fact: "no_low_goal: cost 27->2, missing push_pull_shift/box_sticky_shift/pull/box_to_sticky/sticky_to_box; target-vacate bypass found"
    neutral_meaning: "low_goal 是防止早期 top_goal 覆盖直接胜利的关键结构目标。"
    player_facing_interpretation: "low_goal 不是装饰；它迫使玩家继续消费已覆盖 top_goal 的资源，从而产生撤销和回填。"
    verdict_effect: positive_support
noncore_caveats:
  - "不声明唯一输入序列；graph 支持的是核心事件组和目标状态模式必要性。"
  - "不声明对象身份级必要性；应避免写成某个具体 crate/sticky 必然承担同一目标的完整生命周期。"
  - "没有 forbidden reachable scan；packet 也未声明 later-event 排除，提交时不要额外添加排除性强 claim。"
  - "forced optimal prefix=11/11 使它更适合标为紧凑强逻辑挑战，而不是开放高难终局。"
  - "top_goal 的删目标反事实只缩短 2 步；这不是失败，但意味着最终提交应把美感重心放在完整 target-vacate 链，而不是单独说 top_goal 是深层新机制。"
questions_for_designer:
  - "提交文案能否明确写成 state-level responsibility reversal，避免对象身份级过度承诺？"
  - "能否在候选说明或 playtest 指引里强调 step 10 的第一次覆盖是债务而非完成，以便人评更容易看到 RA_CAND_0011 式洞见？"
  - "是否需要补一个轻量 object-participation 或 trace annotation，只作为说明材料，不作为全胜路 claim？"
  - "若后续追求 5 分，能否降低 forced optimal 全程收束，让玩家在中段有一个真实可比较但仍由状态责任排除的计划分叉？"
