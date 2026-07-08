```yaml
review_iteration: 1
candidate_version_reviewed: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2
review_input_type: candidate_version
verdict: hold_or_reject
review_loop_state: held_proposal
required_action: downgrade_or_hold
strongest_merits:
  - "v2 把 v1 的水平尾端目标改成上方 target mouth，玩家侧读法比纯水平路线税更干净；`C+MM` 的两个输出类型也比三目标草稿少一些噪声。"
  - "从 `CCC -> MMM -> C+MM` 到 C 与 MM 分别消费的链条短、可见、材料语义一致，适合作为固定 B/S 切割语料的清楚应用。"
archive_taste_context_used:
  - "RA_CAND_0017: 人评审美 4 / 难度 5 的高密度正例；本候选没有同等级的机制耦合、反直觉状态责任或多机制交错。"
  - "RA_CAND_0018: 人评审美 3 / 难度 2 的固定 B/S cut-tail 下界；本候选的主要因果骨架仍最接近这个样本。"
  - "RA_CAND_0019: 人评审美 2 / 难度 2 的显然开局负向校准；本候选的 `down right right right` 有类似的顺路动画风险。"
  - "RA_CAND_0006: 人评审美 2 / 难度 5 的目标硬化负例；本候选的 M target 没有那么重的腾挪税，但仍有 endpoint hardening 风险。"
score_calibration:
  human_archive_anchors_present: true
  score_claim_allowed: true
  archive_attack_calibration: positive_and_negative_anchors_present
  positive_anchors: [RA_CAND_0017]
  lower_bound_or_negative_anchors: [RA_CAND_0018, RA_CAND_0019, RA_CAND_0006]
  missing_anchor_effect: none
aesthetic_target_fit: >
  不支持 strong 3 floor，更不支持 4。v2 的 target mouth 修补让它比被拒的水平尾目标版本干净，
  但主要审美仍是 RA_CAND_0018 的固定 B/S bind-return-cut-tail 结构被拉到三格：第三个箱子增加
  footprint 长度，M mouth 消费更长的 sticky tail，却没有制造新的可读矛盾、状态重读或高密度耦合。
  作为清楚应用可以成立；作为 fresh lexicon-composition challenge 的审美档位不足。
difficulty_target_fit: >
  不支持 difficulty >=3。完整证据说明核心事件必经，但玩家侧难度主要来自按一条显然路线执行：
  开局 `down right right right` 强引导，三箱绑定像顺路推进动画；cut 后 C 与 MM 的上推消费也直接贴着目标。
  no_C / no_M counterfactual 只显示目标增加少量输出消费，不显示玩家必须在多种材料计划之间做结构判断。
core_attacks:
  - attack: "RA_CAND_0018 lineage remains the live attack"
    target: role_fit
    reason: >
      候选没有充分摆脱 RA_CAND_0018 的固定 B/S cut-tail 骨架：推进箱列跨 B/S、merge 成 sticky、从右侧回推切割、
      再把 C 输出和 sticky tail 输出分别喂目标。第三箱把 `CC -> MM` 拉长为 `CCC -> MMM`，但玩家动作语法和
      因果节拍基本不变；在 fresh_required 且未授权 archive variant work 的角色下，这会阻断 challenge / strong 3 提交。
  - attack: "opening `down right right right` makes three-box binding read as animation"
    target: player_insight
    reason: >
      packet 自认开局 strongly guided，main graph 的 initial SCC 也只有一个 win-reaching outgoing commitment。
      玩家从版面上看到的最自然动作就是下去沿箱列向右推三次；三箱变 MMM 更像被关卡轨道播放出来，
      而不是玩家先读出未来 footprint 再主动选择绑定。RA_CAND_0019 的人评说明，证据完整不能抵消过于显然的入口。
  - attack: "M target is a partial repair, not a full replacement for route tax"
    target: why_not_execution
    reason: >
      上方 M mouth 比 v1 的水平尾端目标更好读，但 no_M 只把 cost 从 18 降到 16，并让 move_sticky_rigid 从必需 4
      变成可 3；玩家侧效果主要是一格上推的 tail consumption。它没有迫使玩家在 cut 前规划不同输出形状，
      因此仍有 RA_CAND_0006 式目标位置硬化风险，只是强度较轻。
  - attack: "target deletion evidence is overread for strong 3 / difficulty 3"
    target: diagnostic_reading
    reason: >
      删除 C 或 M 目标都只是降低 post-cut 输出消费强度，完整材料链仍然存在。这个事实可以证明目标不是纯装饰，
      但不能证明目标承担了核心链的因果选择；它支持 modest application，不足以支持 strong 3 或 difficulty floor。
  - attack: "forced viable prefix makes the graph evidence anti-scriptedness, not a merit"
    target: diagnostic_reading
    reason: >
      forced_win_prefix 为 4/6，说明多数不可逆胜利承诺集中在固定前缀；后段存在 branching win SCCs 不能抹掉
      开局到 cut 之前的脚本感。该图事实应压低 role fit，而不是被包装成 tight design。
scc_graph_interpretations:
  - graph_fact: "main graph complete; reachable_states=1387; legal_transitions=3511; winning_states=8"
    neutral_meaning: "状态图完整且胜态数量有限，候选可被审查。"
    player_facing_interpretation: "完整图和少量胜态本身不产生审美或难度；它只排除若干证据旁路。"
    verdict_effect: none
  - graph_fact: "initial_scc states=3, out=1, win_out=1, dead_out=0"
    neutral_meaning: "开局区域只有一个通往胜利区域的外出承诺。"
    player_facing_interpretation: "玩家早期几乎没有有意义选择，`down right right right` 是强制入口。"
    verdict_effect: core_attack
  - graph_fact: "solution_irreversible_path steps=6; forced_win_prefix=4/6"
    neutral_meaning: "六个不可逆胜利承诺中，前四个属于固定胜利前缀。"
    player_facing_interpretation: "主要机制链在玩家形成替代计划前已被脚本化推进；这削弱 player_insight 与 difficulty claim。"
    verdict_effect: core_attack
  - graph_fact: "branching_win_sccs=5; merging_win_sccs=0"
    neutral_meaning: "后段存在若干胜利分支区域，但没有再汇合的胜利 SCC。"
    player_facing_interpretation: "后段可能有局部顺序或走位自由，但不是能弥补固定前缀的结构性选择。"
    verdict_effect: caveat
  - graph_fact: "no_m_goal cost_delta 18->16; no_m_goal allows move_sticky_rigid 3 < 4"
    neutral_meaning: "M target 强制额外 sticky rigid 输出消费，但只增加少量路线责任。"
    player_facing_interpretation: "M mouth 是真实消费点，却更像 cut 后的短尾端要求，不像核心洞见。"
    verdict_effect: core_attack
  - graph_fact: "no_c_goal cost_delta 18->14"
    neutral_meaning: "C target 强制 post-cut C 输出被单独送入上方目标。"
    player_facing_interpretation: "C 输出有职责，但删除它不摧毁 bind-return-cut 主链，说明目标职责偏末端消费。"
    verdict_effect: caveat
noncore_caveats:
  - "不建议发起 evidence_disagreement；packet 的硬证据可以接受，问题是玩家侧解释和目标档位。"
  - "如果降级为固定 B/S cut-tail 的简单应用或教学后段，本候选仍可能有库存价值；当前 role 是 fresh challenge，所以被 hold。"
questions_for_designer:
  - "第三个箱子能否改变 cut 前的计划选择，而不只是把 RA_CAND_0018 的 tail 从一格拉成两格？"
  - "M mouth 能否要求玩家提前保护或塑造 `MM` 输出，而不是 cut 后顺手上推一次？"
```
