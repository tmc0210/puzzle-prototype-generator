# ICE_EXP_META_2026_07_01_round5_d6_cross_debt_proposal_ready_with_caveats

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round5_d6_cross_debt_proposal_ready_with_caveats
prototype: ice_slide_escape
terminal_state: accepted
candidate_id: ICE_CAND_0024
review_integrity: human_review
archive_eligibility: human_review
human_final_status: accepted
```

## Brief

本轮继续尝试更强的 meta 关。目标不是功能性 connector，而是：

- base A->B 至少达到中后期 application / challenge-lite。
- meta C->D 是更后期 compact reinterpretation application。
- base 与 meta 逻辑链不同。
- 尽量强的要素复用和空间复用；但跨时间复用不能倒灌成 base 或 meta 单流程复杂度。

硬性路由门：

```yaml
reject_if:
  - any A/B/C/D start can solve to a non-A/B/C/D edge goal
  - any A or B start can solve to C or D
must_report:
  - every A/B/C/D start to every edge goal
```

## Archive Taste Context

只使用带人类评语的 archive candidate 做 taste calibration；未复用其 layout、几何、
因果链、路线、对象摆放或入口出口关系。

```yaml
used:
  ICE_CAND_0012:
    role: positive_with_caveats
    lesson: 清晰链和强复用可接受，但“看见冰推最远”本身缺洞见。
  ICE_CAND_0019:
    role: positive_reference
    lesson: 延迟 hidden stopper 能把显然开锁转化为非局部回读。
  ICE_CAND_0020:
    role: overclaim_calibration
    lesson: base/meta 各自是简单 witness 时，跨时间复用不能拔高单流程复杂度。
  ICE_CAND_0022:
    role: meta_calibration
    lesson: 功能性扎实 meta 可接受；轻 base 与低污染本身是中性选择，优点在于二者和前期生态位恰好匹配。
```

## Family Attempts

### family_1: v1 d5 wall debt revisit

```text
##################
##################
#######.##########
####.IG.#.....*..#
####.#G.#.....I..#
####.#..######I..#
####.II*######...#
##......########.#
#..#############..
```

Result: review_1 held.

Base A->B:

```text
[7,6]* up d4 -> [7,3], creating [7,6] debt
[5,3] right d1 -> [6,3]
[6,6] up d2 -> [6,4]
[5,6] right d2 -> [7,6]
```

Meta C->D:

```text
[14,3]* left d5/restart -> [6,3]
[14,4] left d5/restart -> [6,4]
[14,5] up d2 -> [14,3]
```

review_1 critic attack:

- meta 太短，像两条平行 d5 delivery 加本地回填。
- 右侧局部子题过强，空间复用不足。
- cross-time reuse 真实，但不能把 base/meta 单流程复杂度抬高。

### designer_action_1: v2 d6 cross debt revisit

Change: 把 v1 的平行 d5 delivery 改为 d6+ 破墙、restart、进入左侧共享空间、
再返回右侧回填 target debt。保留 base 的 d4 target-debt/refill，但让 meta 第一推
同时承担破墙、远端填 [6,3]、制造 [15,3] debt、打开跨空间通路。

Final proposal layout:

```text
##################
##################
#######.##########
####.IG.#......*.#
####.#G.#######..#
####.#....#####I.#
####.II*#.#####..#
##........######.#
#..#############..
```

Interfaces:

```yaml
A: [1, 8]
B: [2, 8]
C: [16, 8]
D: [17, 8]
base_instance:
  player_start: [1, 8]
  player_goal: [2, 8]
meta_instance:
  player_start: [16, 8]
  player_goal: [17, 8]
```

Base A->B:

```text
[7,6]* up d4 rebound -> [7,3], creating [7,6] target debt
[5,3] right d1 using [7,3]/[6,3] local structure -> [6,3]
[6,6] up d2 using [6,3] as stopper -> [6,4]
[5,6] right d2 -> [7,6], repaying the target debt
```

Meta C->D:

```text
[15,3]* left d6+ destroys wall [8,3], slide-restarts, uses [5,3] as stopper -> [6,3],
  creating [15,3] target debt and opening the cross-space route
[6,6] up d2 in the shared left space, using [6,3] as stopper -> [6,4]
[15,5] up d2 -> [15,3], repaying the right-side target debt
```

### designer_action_2: v5 notch and side-pocket masking

After human concern that v2's right-side d6 wall break was too telegraphed in
the base view, the layout was locally revised:

```text
##################
##################
#######...########
####.IG.#......*.#
####.#G.#######..#
####.#.....####I.#
####.II*#.#####..#
##........######.#
#..#############..
```

Effect:

- preserves base A->B and meta C->D causal chains;
- masks the d6 wall-break read by making the middle/right contact zone look
  less like a single obvious cannon lane;
- adds a base-time reachability lure: from A, the player can physically reach
  C/D in non-winning states, but C/D are incompatible with target completion.

Evidence:

```yaml
v5_base:
  report: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0024_v5_base_A_to_B.md
  found: true
  cost: 35
  pushes: 4
  graph_status: complete
  reachable_states: 67224
  winning_states: 2
  required_probe: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0024_v5_base_goal_B_required.md
v5_meta:
  report: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0024_v5_meta_C_to_D.md
  found: true
  cost: 47
  pushes: 3
  graph_status: complete
  reachable_states: 44114
  winning_states: 11
  required_probe: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0024_v5_meta_goal_D_required.md
v5_edge_scan:
  report: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0024_v5_ABCD.md
  ABCD_to_non_ABCD: 0
  A_or_B_to_C_or_D: 0
v5_lure_probe:
  report: prototypes/ice_slide_escape/reports/reachability_lure_probe_ICE_CAND_0024_v5_base_A.md
  physically_reaches_C_or_D_without_target_completion: true
  target_filled_C_or_D: false
```

## Design Claim

```yaml
terminal_claim: >
  proposal_ready_with_caveats. ICE_CAND_0024_v2 is worth human designer review
  as a stronger meta proposal than the simple connector family. Claim must be
  kept modest: base is medium application / challenge-lite; meta is compact
  late-game reinterpretation application, not a flashy endgame capstone.
player_insight: >
  Base asks the player to read an initially filled target as temporary debt:
  d4 moves [7,6] away to create a hidden stopper, then the player builds
  [6,3] and [6,4] before repaying [7,6]. Meta asks a different question:
  the right-side target ice is not local filler but a d6 wall breaker that
  rewrites the map, creates [6,3] remotely, and opens the left-side space.
causal_chain: >
  base: d4 target debt -> d1 fill [6,3] -> d2 fill [6,4] -> d2 repay [7,6].
  meta: d6+ destroy [8,3] and fill [6,3] -> use opened cross-space to fill
  [6,4] -> return right and repay [15,3].
why_not_execution: >
  Both flows have complete solver and required-event evidence. The proposal is
  still caveated because meta's insight is front-loaded in the first push and
  objectParticipation does not prove per-object all-solution identity.
falsification: >
  Reject or redesign if A/B/C/D can solve to non-selected edge goals, if A/B
  can solve C/D, if base has a win missing d4/d1/d2 debt chain events, if meta
  has a win missing d6+/restart/d2, or if human review finds the meta still
  reads as a local right-side chore.
```

## Mechanism Scope

```yaml
central:
  - "base [7,6] target debt via d4 rebound to [7,3]"
  - "base [5,3] fills [6,3], then [6,6] fills [6,4], then [5,6] repays [7,6]"
  - "meta [15,3] d6+ destroys [8,3], restarts, and fills [6,3]"
  - "meta uses the opened passage to solve inside the base left-space"
  - "same target [6,3] is filled from different sources across base/meta"
  - "[5,3] changes role: base filler, meta stopper"
support:
  - "[6,6] fills [6,4] in both flows, but meta depends on remote [6,3] setup"
  - "[15,3] is latent target material in base and main d6/debt material in meta"
  - explicit A/B/C/D edge interfaces
incidental:
  - "[7,6] is only a strong causal element in base; in meta it is mainly latent material"
  - A/B same-side return and C/D same-side return variants
```

## Evidence Summary

```yaml
base_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0024_v2_base_A_to_B.md
  found: true
  graph_status: complete
  reachable_states: 18057
  winning_states: 2
  cost: 35
  pushes: 4
  key_events:
    - ice_rebound_d4
    - ice_stop_short:d1
    - ice_stop_short:d2
base_required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0024_v2_base_goal_B_required.md
  result: pass
  missing_required_win: none_found_complete
  required:
    - ice_rebound_d4
    - ice_stop_short:d1
    - ice_stop_short:d2
meta_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0024_v2_meta_C_to_D.md
  found: true
  graph_status: complete
  reachable_states: 41214
  winning_states: 11
  cost: 47
  pushes: 3
  key_events:
    - ice_destroy_group_d6_plus:len1
    - slide_restart_after_group
    - ice_stop_short:d2
meta_required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0024_v2_meta_goal_D_required.md
  result: pass
  missing_required_win: none_found_complete
  required:
    - ice_destroy_group_d6_plus:len1
    - slide_restart_after_group
    - ice_stop_short:d2
count_and_debt_probe:
  ref: prototypes/ice_slide_escape/reports/required_count_debt_probe_ICE_CAND_0024_v2.md
  result: pass_no_bad_win
  caveat: report_summary_does_not_expand_bad_win_predicates
```

## Routing Result

```yaml
edge_pair_scan:
  ref: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0024_v2_ABCD.md
  method: per_start_complete_reachable_graph_edge_goal_record
  edge_goals_checked_per_start: 50
  ABCD_to_non_ABCD_edge: none_solved
  A_or_B_to_C_or_D:
    A_to_C: unsolved
    A_to_D: unsolved
    B_to_C: unsolved
    B_to_D: unsolved
  C_or_D_to_A_or_B:
    C_to_A: unsolved
    C_to_B: unsolved
    D_to_A: unsolved
    D_to_B: unsolved
  selected_interface_pairs_solved:
    A: ["A", "B"]
    B: ["A", "B"]
    C: ["C", "D"]
    D: ["C", "D"]
  verdict_effect: pass_required_reachability_gate
```

Explicit edge reachability:

```text
A [1,8] solves only [1,8] and [2,8]; all other 48 edge goals unsolved.
B [2,8] solves only [1,8] and [2,8]; all other 48 edge goals unsolved.
C [16,8] solves only [16,8] and [17,8]; all other 48 edge goals unsolved.
D [17,8] solves only [16,8] and [17,8]; all other 48 edge goals unsolved.
```

## SCC / Graph Reading

```yaml
graph_interpretations:
  - graph_fact: "base graph complete: 18057 states, 2 wins; solution irreversible steps=4; initial SCC states=24,out=6,winOut=1,deadOut=5; forcedWinPrefix=2/4; scripted=0/4."
    neutral_meaning: "完整图内 base 有 4 个不可逆提交；开局多个提交只有 1 个仍可胜利；前 2 个 win continuation 固定；handoff 有站位空间。"
    player_facing_interpretation: "base 的 d4 debt/rebound 和后续填补不是可绕过装饰，玩家需要读出目标债务链。"
    verdict_effect: "supports medium application / challenge-lite, with caveat that graph alone does not prove high difficulty."
  - graph_fact: "base winSubgraph=branching_win_dag; later SCC has winOut=2."
    neutral_meaning: "后段胜利子图存在可胜分支或汇合。"
    player_facing_interpretation: "核心事件仍必要，但不能声称严格唯一顺序。"
    verdict_effect: "claim must avoid uniqueness overstatement."
  - graph_fact: "meta graph complete: 41214 states, 11 wins; solution irreversible steps=3; initial SCC states=9,out=3,winOut=2,deadOut=1; forcedWinPrefix=0/3; scripted=0/3."
    neutral_meaning: "meta 有 3 个不可逆提交，但可胜 continuation 不唯一，且 winning states 较多。"
    player_facing_interpretation: "meta 不是脚本化输入串，也不是严格唯一锁链；它更像紧凑重读 application。"
    verdict_effect: "supports proposal_ready_with_caveats, not uncaveated high-challenge claim."
  - graph_fact: "edge scan complete for 50 edge goals per A/B/C/D start; ABCD->nonABCD=0 and A/B->C/D=0."
    neutral_meaning: "所选接口没有非目标边缘泄漏。"
    player_facing_interpretation: "base/meta 的边界不会被额外出口污染。"
    verdict_effect: "passes hard reachability gate."
```

## Review Loop

```yaml
review_1:
  candidate_version_reviewed: ICE_CAND_0024_v1_d5_wall_debt_revisit
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      Solver, required events, and edge routing supported v1, but object identity
      claims required caution.
  design_critic:
    verdict: hold_or_reject
    review_loop_state: held_proposal
    required_action: downgrade_or_hold
    summary: >
      v1 meta was too short and parallel: two d5 deliveries plus local refill.
      It did not meet the more aggressive meta brief.
designer_action_1:
  action: structural_revision_to_v2_d6_cross_debt
  summary: >
    Replace parallel d5 meta route with d6+ wall destruction, restart, cross-space
    entry, left-space target fill, and right-side debt repayment.
review_2:
  candidate_version_reviewed: ICE_CAND_0024_v2_d6_cross_debt_revisit
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      Evidence supports solver, required events, graph completeness, and hard
      edge isolation. Caveat: write reuse as positional/role reuse, not object
      identity proof.
  design_critic:
    verdict: accept_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      v2 can be submitted to human review if claim is modest. Base is medium
      application / challenge-lite; meta is compact late-game reinterpretation
      application. Cross-time payoff is the strongest part.
designer_action_2:
  action: revise_to_v5_notch_and_side_pocket
  summary: >
    Mask the base-time d6 read and add a right-side physical reachability lure
    that is incompatible with target completion.
review_3:
  candidate_version_reviewed: ICE_CAND_0024_v5_notch_and_side_pocket
  human_review:
    verdict: accepted
    required_action: none
    summary: >
      Human review accepts v5 as an excellent strong-reuse meta case and
      modification-upgrade example. Both flows are reasonable applications;
      the main value is shared space / element reuse, masked d6, and the
      reachability lure.
```

Critic attacks and accepted caveats:

```yaml
attacks:
  - type: hard_evidence
    text: "objectParticipation is empty; do not claim per-object all-solution identity."
  - type: hard_evidence
    text: "meta has 11 winning states and forcedWinPrefix=0/3; do not claim strict unique order."
  - type: hard_evidence
    text: "required-event probe cannot alone prove [15,5] is the final refill ice in every win."
  - type: taste
    text: "meta insight is front-loaded in the d6 wall-breaking first push."
  - type: taste
    text: "base is stronger than witness, but still challenge-lite rather than high-difficulty."
  - type: taste
    text: "[7,6] is not a strong meta causal material; keep it as incidental in meta."
designer_actions:
  - "submit proposal_ready_with_caveats"
  - "downgrade claim wording"
  - "emphasize [6,3], [5,3], [6,6], and shared left-space reuse"
  - "avoid object-identity and uniqueness overclaims"
```

## Terminal

```yaml
terminal_state: accepted
proposal_ready: true
required_action: none
human_priority: high
reason: >
  Human review accepts ICE_CAND_0024_v5 as an excellent strong-reuse meta case.
  Both independent flows are reasonable applications; the strongest value is
  that v5 shares the middle puzzle space across base/meta, masks the meta d6
  read in base, and turns a physically reachable but target-incompatible right
  route into a future revisit payoff.
```

## Human Review

```yaml
human_comments:
  - id: HC_ICE_CAND_0024_001
    author: human_designer
    status: accepted
    text: >
      极佳的强复用meta案例和修改升档案例。两边流程虽不出彩但都逻辑合理。
      亮点在于1. base流程和meta流程空间复用和要素复用极强，共用中间的
      解谜区域和大量冰，回访时不会认为是两个独立子关拼接硬凑，而是一关两用
      2. base流程时对于meta流程的d6有较好的遮蔽。修改版本前右侧d6作用是
      打穿左右连接通路，这更容易导致玩家在左侧base流程时提前猜到知识
      3. 修改版本右侧结构在base流程时物理可达，但这些路线和base的target
      满足状态不兼容。这一看似可解的诱惑作为伏笔具有极强的未来回访时的
      审美价值。 总的来说，两边独立流程都是合格应用关（右侧流程偏弱但
      无伤大雅），meta部分很强，更有修改后做出的诱惑解法画龙点睛。
status: accepted
```
