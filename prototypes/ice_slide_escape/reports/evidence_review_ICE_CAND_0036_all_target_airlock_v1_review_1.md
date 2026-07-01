review_iteration: review_1
candidate_version_reviewed: ICE_CAND_0036_all_target_airlock_v1
review_input_type: candidate_version
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
supported_claims:
  - "初始布局条件成立：layout 中 `*` 为 6 个，裸 `I` 为 0 个，裸 `G` 为 0 个；因此初始 ice 均在 target 上，且所有 target 初始均被 ice 覆盖。"
  - "start/goal 合法性得到支持：compare-starts JSON 标记 `[0,6]` legalStart=true；winCondition 使用 explicit player_goal `[14,1]`，该格在布局中为边缘地面 `.`，返回解也以该显式终点判胜。"
  - "初始静态步行路径被 target ice 阻断：按 `#` 与 `*` 作为阻挡做静态 BFS，起点 `[0,6]` 只能到达下左室 `[0..5,6]`，不能到达 `[14,1]`。阻断点对应 `[5,5]` 与 `[5,7]` 的 target ice 门。"
  - "存在胜利解：layout_analysis 返回 found=true、cost=43、explored_states=1249；返回 trace 事件计数为 walk=39、push_ice=4、ice_blocks_ice_no_chain_push=4、ice_rebound_d4=4。"
  - "胜利路径 required event 门成立：compare-starts 对 `[0,6]` 的完整搜索未找到缺少 `push_ice`、`ice_rebound_d4` 或 `ice_blocks_ice_no_chain_push` 的胜利路径，searchStatus=complete，exploredStates=2897。"
  - "胜利路径 forbidden event 门成立：完整搜索未找到含 `ice_destroyed_d3`、`ice_boundary_disappear`、`ice_pass_through_d5`、`ice_destroy_group_d6_plus` 或 `slide_restart_after_group` 的胜利路径。"
  - "返回 trace 支持 target-debt airlock 的基本读法：前两次 d4 从 `[5,5]`、`[10,5]` 借走门冰，后两次 d4 将门冰还回 target；四次 snapshot 均含 push_ice、ice obstacle/no-chain 与 d4 rebound。"
unsupported_or_overclaimed:
  - "严格的 LIFO 偿还顺序不成立。除 packet 返回解的“先还右门、再还左门”外，我用 runtime replay 验证了一条同为 cost=43、legal=true、win=true 的路线：开左门、开右门后，先从上侧还左门 `[5,2] -> [5,5]`，再还右门 `[10,2] -> [10,5]`，事件仍为 4 次 push/d4/ice obstacle。因此“还债时必须先还右门，再还左门”应降格为返回 trace 的一种解法，而不是必要机制事实。"
  - "四次 d4 的逐对象必要性未被完整证明。工具证明的是所有胜利路径至少需要出现 `push_ice`、`ice_rebound_d4`、`ice_blocks_ice_no_chain_push`，不是每条胜利路径都必须恰好四次 d4，或必须由指定四个对象分别参与。"
  - "两门逐对象必要性主要由返回 snapshots、布局读法和图摘要间接支持；当前证据没有 object participation，也没有专门的 per-object/all-solution probe。可以说返回解使用两门借还，不能说工具已证明每个门冰在所有胜利路径中都必须以同一对象身份借走并还回。"
  - "图证据不支持唯一执行序列：graph complete 且 winning states=1，但 win subgraph 为 branching_win_dag；第二次开门后的 SCC/region 有 2 个 win-reachable/viable/optimal continuation。"
evidence_limits:
  - "Analyzer output 是证据，不是质量 verdict；本审查不评价审美、难度或 campaign placement。"
  - "K_explicit_edge_goal 没有事件 detector；它支持显式 start/goal 配置和返回解覆盖，但不是事件绕路证明。"
  - "reachable_event_exposure 为 complete，且可达非胜利转移中出现 boundary/d5 类事件计数；因为 candidate 没有设置 forbidden_if_seen_anywhere，这不阻塞胜利路径 claim，但不能声称玩家完全看不到这些事件。"
  - "完整搜索预算在相关报告中未耗尽：graph status complete，reachable states=3052，legal transitions=6430，winning states=1。"
  - "额外 replay 只用于反证严格 LIFO 偿还必要性；它没有改动布局、候选包或分析输出。"
questions_for_designer:
  - "是否将 claim 改写为“返回解展示两门借还；两门都可形成 target-debt airlock”，并移除“必须先还右门再还左门”的必要性措辞？"
  - "若仍要主张逐对象必要性或恰好四次 d4，需要补充 object-aware / all-solution probe；否则建议保留为 caveat。"
