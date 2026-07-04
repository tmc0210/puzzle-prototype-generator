review_iteration: review_1
candidate_version_reviewed: ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21
review_input_type: candidate_version
verdict: revise_required
review_loop_state: revise_required
required_action: structural_revision
strongest_merits:
  - >
    base 的双目标债务是本 candidate 最好的玩家侧材料：玩家需要先借走两个 target ice
    打开通路，再用下层冰分别补回目标。它不是单纯走到门口按一次钥匙。
  - >
    meta 的 C 腔 stop -> d6 projectile 入口至少有清楚的局部语法：先用短停让出站位，
    再从正确侧推 projectile 破右墙。这个 late-mechanic 入口可读，但目前只够作为待整合材料。
  - >
    C 腔从右侧回接主结构的构想有可继续修的非对称入口材料：它给 meta 一个不同于 A->B
    的观察角度，只是当前还没有把这个角度转化为主结构重读。
archive_taste_context_used:
  - candidate_id: ICE_CAND_0035
    human_aesthetic_score: 5
    human_difficulty_score: 4
    use: >
      正锚点：高分来自旧出口在回返压力下变成入口，以及真实角色变化；不能把“另设入口接回主区”
      当成同等级 meta 价值。
  - candidate_id: ICE_CAND_0034
    human_aesthetic_score: 4
    human_difficulty_score: 2
    use: >
      4 分锚点：meta 必须扰动并改写下层结构，而不是只在旁边触发 late key 后走入同一出口。
  - candidate_id: ICE_CAND_0037
    human_aesthetic_score: 1
    human_difficulty_score: 2
    use: >
      负锚点：重复 target-door stitching 和 tool pass 不能替代真实洞见；本次用它攻击
      “base 债务存在但 meta 没有足够共用主结构”的风险。
score_calibration:
  human_archive_anchors_present: true
  score_claim_allowed: true
  archive_attack_calibration: complete_positive_and_negative_human_anchors
  positive_anchors:
    - >
      ICE_CAND_0035 说明 5 分需要自然回返压力和对象/入口角色变化；v21 的 C 腔 projectile
      目前没有这种 wrapper 或角色反转。
    - >
      ICE_CAND_0034 说明 4 分可以来自紧凑结构被 meta 扰动重写；v21 的 meta 只打开右墙，
      没有重写 base 的双目标债务链。
  lower_bound_or_negative_anchors:
    - >
      ICE_CAND_0037 说明目标债务和 required-event pass 若只是拼接门语法，审美会落到低分。
      v21 base 比 0037 更紧，但 meta 仍有外接钥匙感。
  missing_anchor_effect: none
aesthetic_target_fit: >
  不满足本轮 aesthetic 4 floor。base 的双目标债务有局部美感，但 candidate 的审美 claim
  依赖 meta 把同一主结构重新读出新角色。当前 meta 的玩家侧体验更像：C 腔第一推短停，
  第二推 d6 打开右墙，然后穿过已打开墙体走到 D。它触发了 late mechanism，却没有消费、
  改写或反转 base 的两笔目标债务；右侧 C 腔也没有让玩家回看 base 中已经承担核心责任的对象。
  因此它强于纯证据包，但不足以作为 4 分候选提交。
difficulty_target_fit: >
  不支持完整难度目标。base 可支持 >=2，并可在宽松口径下讨论低 3：四次推冰围绕两个
  target 债务与两次补债展开，状态责任高于纯执行。meta 则不稳到 >=2：graph 摘要和 trace
  都显示关键承诺集中在最初两步，之后主要是走到 D。late d6 事件本身不能把“两步钥匙加走路”
  升级为结构难度；因此“两流程均不低于 2，且至少一条不低于 3”的综合 claim 不能按当前文本通过。
core_attacks:
  - attack: "meta 的核心洞见太薄。"
    target: player_insight
    reason: >
      玩家需要读出的只是“先短停腾出 projectile 推位，再推 d6 破墙”。这是一段独立 C 腔钥匙语法，
      没有要求玩家理解 base 的左/右目标债务、补债顺序或下层 refill 结构。
  - attack: "meta 没有真正重读或共用主结构。"
    target: role_fit
    reason: >
      d6 后进入主结构并到 D，只说明路线接回同一空间；它没有让 base 中的目标冰、下层补债冰、
      或目标债务链在 meta 中承担新因果角色。按 ICE_CAND_0034/0035 的人评边界，这不足以守住 4。
  - attack: "base 债务足够做局部材料，但不足以替 candidate 偿还 meta 审美债。"
    target: role_fit
    reason: >
      base 的双目标债务比重复门拼接更紧，可保留；但本 slot 是 meta_first_dual_instance_challenge。
      如果 meta 只是旁路 late cannon，base 再干净也只是一个单实例目标债务小题，不能把整体提升到目标角色。
  - attack: "meta 的 why_not_execution 不成立。"
    target: why_not_execution
    reason: >
      meta trace 自述为 2 pushes：C-chamber d1 stop、C projectile d6 group destruction + d3，随后 walk to D。
      这类短前缀脚本主要考执行入口识别，不提供足够后续状态责任、错序风险或共享资源规划。
  - attack: "required-event pass 和 base strict pass 不能当作审美优点。"
    target: diagnostic_reading
    reason: >
      meta required events 只能证明胜路包含 d6、d3、stop；base forbidden scan 只能证明窗口干净。
      这些让 candidate 可审，不证明玩家会获得 4 分级的重读 payoff，也不能补足 meta 难度。
scc_graph_interpretations:
  - graph_fact: "base initial region dist=4; forced viable prefix 2/4; compressed regions=23."
    neutral_meaning: >
      base 的胜路包含多个区域承诺，且前缀有一定强制性；图事实本身只说明路由约束。
    player_facing_interpretation: >
      结合返回 trace，玩家会面对两个目标债务与两个补债动作；这支持 base 作为 >=2、
      低 3 边界材料，但不自动支持整体 aesthetic 4。
    verdict_effect: merit
  - graph_fact: "meta initial region dist=2; forced viable/optimal prefix 2/2; compressed regions=48."
    neutral_meaning: >
      meta 的关键可行/最优承诺集中在最初两步；之后图仍有区域，但 packet 没有显示后续结构性选择。
    player_facing_interpretation: >
      玩家侧读法会集中成 C 腔 stop 和 d6 projectile 两步钥匙，后续缺少主结构再规划。
    verdict_effect: core_attack
  - graph_fact: "meta trace summary: 2 pushes, then walk to D."
    neutral_meaning: >
      返回解中的主动对象操作只有短停与 d6 projectile；抵达目标主要靠通行。
    player_facing_interpretation: >
      late event 是必要的，但必要事件不等于困难或审美；这直接削弱 why_not_execution。
    verdict_effect: core_attack
  - graph_fact: "base reachable event exposure pass: no d6/d5/restart in complete reachable scan."
    neutral_meaning: >
      base 没有越过允许的 pre_d6_or_earlier 机制窗口。
    player_facing_interpretation: >
      这是角色合法性的必要前提；它不提供审美、难度或 meta 重读加分。
    verdict_effect: none
  - graph_fact: "meta required-event check pass: no winning path missing d6+d3+stop."
    neutral_meaning: >
      C->D 胜路都包含声明的事件类别。
    player_facing_interpretation: >
      玩家必然触发这些事件，但事件类别必经仍可能只是局部钥匙脚本；不能证明共享主结构成立。
    verdict_effect: none
noncore_caveats:
  - >
    本 review 不把 lineage 作为核心攻击：packet 声明 fresh family，且 archive context 是人评校准，
    不是授权或继承旧 archive variant 的证据。
  - >
    object-level participation 和 counterfactual model 未报告；这不是本次 hold 的主要原因，
    但它限制了 designer 对“同一对象承担新角色”的后续表述。
  - >
    interface_pair_policy 当前没有报告 risky pair 命中；本 review 的结构攻击不依赖 ignored/reverse pair。
questions_for_designer:
  - "能否让 d6 projectile 直接消费、释放或改写 base 的某一笔 target 债，而不是只开右墙？"
  - "能否让 meta 进入主结构后必须重新安排下层 refill 顺序，形成对 base 双债链的反向或交叉阅读？"
  - "能否减少 C 腔作为独立小钥匙的自足性，让 stop 的作用同时影响主结构中的目标债务状态？"
  - "如果保留 decoupled C-side projectile，能否让它打开的不只是通道，而是改变两个以上后续 affordance？"
