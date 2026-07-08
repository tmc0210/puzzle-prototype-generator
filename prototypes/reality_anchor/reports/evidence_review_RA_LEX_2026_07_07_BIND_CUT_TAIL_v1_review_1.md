review_iteration: review_1
candidate_version_reviewed: RA_LEX_2026_07_07_BIND_CUT_TAIL_v1
review_input_type: candidate_version
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
supported_claims:
  - "候选包、布局文件和 layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1.md 使用同一布局：`########## / #@.#G#...# / #.CC....G# / ####....## / #...BS...# / ##########`；prototype README 与 mechanic.yml 支持本包采用的胜利条件、B/S 材料归一化、sticky_merge、sticky 刚体移动和目标覆盖语义。"
  - "layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1.md 报告 shortest solution found=yes、cost=17、graph status=complete、reachable_states=2654、legal_transitions=7018、winning_states=4；该完整图状态支持后续 all-winning-path probe 没有因预算耗尽降级。"
  - "返回最短解事件与 snapshots 支持 candidate 的具体 witness 因果链：第 2-4 步连续 force_chain 推动两个箱子，第 3 步触发第一次 box_to_sticky 得到 C+M，第 4 步触发第二次 box_to_sticky、move_sticky_rigid 与 sticky_merge 得到 MM；第 10 步从右侧反推 sticky 并触发 sticky_to_box 得到 C+M；第 14 步 C 覆盖 top_goal；第 15-17 步 M 尾巴通过 move_sticky_rigid 推进并覆盖 tail_goal。"
  - "event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_core5.md 的 combined probe 为 complete、found bypass=false；force_chain、box_to_sticky、sticky_merge、sticky_to_box、sticky_rigid 五个 individual probes 也均为 complete/no winning bypass。该证据支持所有胜路都需要 force_chain、box_to_sticky、sticky_merge、sticky_to_box 和 move_sticky_rigid 事件组。"
  - "event_count_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_box_to_sticky_min2_box_to_sticky_min2.md 针对 box_to_sticky minimum count=2，结果为 complete、found bypass below count=false；该证据支持所有胜路至少发生两次 box_to_sticky，而不是只依赖返回 trace。"
  - "order_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_cut_before_merge.md 检查 sticky_to_box 是否可能早于 sticky_merge 出现在胜路中，结果为 complete、found violation win=false；结合 core5 probe 已证明 sticky_to_box 与 sticky_merge 在所有胜路必经，支持 winning-route claim 中 sticky_merge 必须早于 sticky_to_box。"
  - "no_top_goal 反事实支持 top_goal 的切割责任：layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_top_goal.md 报告 cost 17->6，返回解直接把 MM 推向右目标；event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_top_goal_core5.md 找到 depth=6 的 winning bypass，missing group=sticky_to_box。该证据支持删除 top_goal 后可跳过切割。"
  - "no_tail_goal 反事实支持 tail_goal 的尾部消费责任：layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_tail_goal.md 报告 cost 17->14，返回解在第 14 步 C 覆盖 top_goal 后即胜利，省去原局第 15-17 步推动 M 尾巴到 tail_goal 的三步 sticky rigid movement。"
  - "candidate packet 明确不声明唯一输入序列、不声明对象实例级身份必要性、不声明 B/S anchor shift 不可达；layout_analysis 也报告 Object Participation 未给出 instance-level participation。因此当前 central mechanism claim 没有把事件组证据过度扩展为对象身份、唯一解或 fixed-anchor/不可达 B/S shift 主张。"
  - "SCC/agency facts 可作为结构背景：主图 status=complete，初始 SCC states=3，forced commitment prefix length=3，forced viable prefix length=3；中性含义是开局前三个 commitment 在胜路中强收束。玩家侧解释只限于 opening 收束 caveat，不作为审美、难度或质量评分。"
unsupported_or_overclaimed:
  - "工具证据支持 player_insight 与 why_not_execution 的机械前提，即事件组必经、两次 box_to_sticky、merge-before-cut、C 覆盖 top_goal 与 M 尾巴覆盖 tail_goal；但不能单独证明真实玩家一定形成该 insight，也不能证明谜题有趣、优雅、难度达到 3/4 或 campaign placement 合格。"
  - "no_tail_goal 证据支持 tail_goal 删除会移除原局最后三步 M 尾巴推进和右侧目标消费；它不证明 tail_goal 独立导致 sticky_merge 或 sticky_to_box 必经，因为 no_tail_goal core5 probe 仍显示五个核心事件在该反事实中也必经。"
  - "box_to_sticky count probe 只支持所有胜路 box_to_sticky >= 2；它不支持所有胜路恰好两次 box_to_sticky，除非另有精确计数证据。"
  - "order probe 只支持不存在 sticky_to_box 早于 sticky_merge 的胜路；它不支持完整事件顺序唯一、空间路径唯一、返回 trace 同构，或 sticky_merge 之后所有事件的相对顺序都固定。"
  - "`allowed_exposure_through` 若被解释为窄 exposure-window 或 knowledge-stage 声明，本轮没有 mechanic_exposure_sequence.yml、等价 sequence 或完整 reachable later-event exclusion 来证明它；本审查仅把它当作 candidate packet 中的机制上下文和 claimed core events 列表。packet 已写明 reachable_event_exposure 不用于 exposure exclusion claim，且 forbidden_if_seen_anywhere 为空。"
  - "fixed-anchor、对象身份、唯一解、B/S shift 不可达等更强主张没有被当前证据支持；但 candidate packet 已明确不声明这些内容，因此不构成当前 central claim 的反证。"
evidence_limits:
  - "本审查只读取候选包、包内列出的 layout_analysis、event_probe、event_count、order_probe、goal deletion counterfactual artifacts，以及 prototype README/mechanic.yml；未运行新 solver、analyzer 或 probe。"
  - "核心 all-winning-path 判断依赖的主图、core5 probe、box_to_sticky count probe 与 order probe 均报告 complete；没有 graph exhausted 或 incomplete scan 导致这些事件必经 claim 降级为 unknown。"
  - "删目标反事实的结论仅限删除 top_goal / tail_goal 后已提供 artifacts 中的最短解、成本变化和 core5 probe；本审查不补写其他反事实，也不外推为所有目标位置调整的结论。"
  - "Event pattern、event instance、object participation 与 per-object necessity 已分开处理：当前证据足以支持事件组级必要性，不足以支持对象实例级身份或每个具体物体在所有胜路中的角色唯一性。"
  - "SCC/graph facts 只在转写为玩家侧解释后作为 caveat 使用；complete graph 支持证据完整性，opening forced-prefix 只说明开局强收束，不构成质量评价。"
questions_for_designer:
  - "若后续要把 `allowed_exposure_through` 升级为窄 exposure/knowledge-stage gate，请提供 mechanic_exposure_sequence.yml 或 packet 内等价 sequence，并给出完整 reachable scan 排除 later events 与 all-solution required gate。"
  - "若后续要声明唯一解、唯一空间路径、完整事件顺序唯一、box_to_sticky 恰好两次、对象实例级身份必要性，或 B/S anchor shift 不可达，需要补相应唯一性、精确计数、对象级或 reachable-exclusion 证据。"
  - "若要把 tail_goal 的责任写得强于“消费 M 尾巴最后推进并增加三步成本”，需要额外反事实或 probe 证明它对更早核心事件、顺序或计数也有独立约束。"
