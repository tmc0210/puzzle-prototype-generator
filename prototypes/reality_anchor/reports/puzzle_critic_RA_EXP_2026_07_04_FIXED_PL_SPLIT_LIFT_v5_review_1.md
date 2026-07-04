review_iteration: review_1
candidate_version_reviewed: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5
review_input_type: candidate_version
verdict: supports_with_noncore_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
strongest_merits:
  - "split-lift 的玩家侧因果线较干净：先让黏连块共同上移，再通过 B/S 边界把上半格转成可单独拉动的箱子，下半格留在目标侧。"
  - "上下目标隔开且上目标侧向封死，使“普通箱子不能替代黏连共同抬升”的结构理由与版面形状基本一致。"
  - "固定 P/L 被放在墙兜中，玩家不需要管理它的位置，但仍通过左侧拉动通道感受到它在全局定义操作侧。"
archive_taste_context_used:
  - candidate_id: RA_CAND_0001
    use: "仅作为正向玩家侧校准：紧凑耦合、要素强耦合、玩家矛盾明显。"
  - candidate_id: RA_CAND_0002
    use: "仅作为正向玩家侧校准：拉动黏块带来洞见，而不是单纯执行。"
score_calibration:
  human_archive_anchors_present: true
  score_claim_allowed: false
  archive_attack_calibration: archive_attack_calibration_incomplete
  positive_anchors:
    - RA_CAND_0001
    - RA_CAND_0002
  lower_bound_or_negative_anchors:
    - negative_anchor_none_found
  missing_anchor_effect: "只有 clean human-reviewed 正向锚点，没有失败或下界人评锚点；本 review 不给审美分、难度分或达标分数判断，只做非分数结构批评。"
aesthetic_target_fit: "target_fit_unknown_without_lower_bound_anchor；从结构上看，候选有紧凑的双锚耦合和清楚的共同抬升后分裂 payoff，但版面极短、通路极窄，玩家体验可能更像一次机制见证，而不是有充分选择压力的完整谜题。"
difficulty_target_fit: "target_fit_unknown_without_lower_bound_anchor；9 input、81 reachable states 和两次主要物体操作指向低/中转场规模。它不适合承载高难度声明；作为 transition/witness 可以成立，但难度主要依赖读懂 split-lift，而不是搜索深度。"
core_attacks: []
scc_graph_interpretations:
  - graph_fact: "original_graph complete; reachable_states=81; winning_states=25; sccs=4; edges=4; winSubgraph=branching_win_dag"
    neutral_meaning: "状态空间很小，图完整，胜利子图不是单一路径，但这些事实本身不等于审美或难度质量。"
    player_facing_interpretation: "玩家预计面对的是一个紧凑转场谜题，而不是长线搜索题；小图支持“可快速理解”的角色，同时也放大短解演示化风险。"
    verdict_effect: caveat
  - graph_fact: "solver_result found=true; cost=9; inputs=down left up left left down down up up"
    neutral_meaning: "返回解很短，核心物体操作集中在一次 B/S 下推和两次上拉。"
    player_facing_interpretation: "如果玩家先执行唯一显眼路线，可能在没有预先形成 player_insight 的情况下完成；洞见更可能发生在回读因果链时。"
    verdict_effect: caveat
  - graph_fact: "custom_core4_event_probe complete; no winning bypass missing B/S shift, pull, sticky_to_box, or sticky rigid movement"
    neutral_meaning: "所有 winning path 都包含候选声明的四类核心事件。"
    player_facing_interpretation: "split-lift 不是可跳过的动画效果；玩家侧胜利确实要消费黏连共同移动和材料分裂。"
    verdict_effect: merit
  - graph_fact: "ordinary_box_analog complete; found=false; reachable_states=33; winning_states=0"
    neutral_meaning: "在这个指定普通箱子替代版本中没有胜利状态。"
    player_facing_interpretation: "why_not_execution 有玩家侧意义：关键差异不是少走几步，而是普通箱子无法完成共同抬升后再分裂的职责。"
    verdict_effect: merit
  - graph_fact: "fixed_anchor_probe_default complete; forbidden_anchor_boundary_shift_push_pull_hits=none"
    neutral_meaning: "P/L 没有可达移动事件。"
    player_facing_interpretation: "这只说明 fixed P/L 合约没有被破坏；它不会自动提升谜题质量。玩家侧价值仍取决于拉动通道是否让固定边界有可读作用。"
    verdict_effect: none
  - graph_fact: "interface_pair_policy declared_interface_points=[], target_pairs=[], ignored_pair_classes=[], risky_pair_classes=[]"
    neutral_meaning: "候选包没有声明需要特殊处理的 pair 类。"
    player_facing_interpretation: "没有 pair-policy 层面的玩家侧 caveat 或加分来源。"
    verdict_effect: none
noncore_caveats:
  - "短解/走廊风险：B/S 下推后基本是走到拉动位并上拉两次，玩家可能通过局部执行碰到解，而不是先解决一个明确的空间矛盾。"
  - "B/S 风险：它在因果上确实决定材料分裂，但交互上只有一次向下设置，容易被感受成开关；候选需要依赖后续 split payoff 来证明它不是普通开门动作。"
  - "split-lift 可读性风险：目标间隔和封边帮助读图，但“上格跨到 B 侧变箱、下格留在目标侧”的精确边界效果可能要试拉后才清楚；这是 transition 角色可接受的学习方式，但不是强预读洞见。"
  - "archive 校准风险：只有 RA_CAND_0001 / RA_CAND_0002 两个正向人评锚点，缺少失败或下界样本，因此不能判断它相对 archive 门槛的分数位置。"
questions_for_designer:
  - "本轮目标是否接受 witness-like transition：让玩家通过一次短执行看见 split-lift，而不是要求先推理出它？"
  - "是否希望 B/S 下推前后有更可见的边界后果，以降低“一次性开关”的感受，同时不重新打开普通箱子绕解？"
  - "如果进入人测，建议重点观察玩家是在执行后回读 split-lift，还是在拉动前已经能从目标间隔和封边预测分裂。"
