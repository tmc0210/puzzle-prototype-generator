```yaml
review_iteration: 1
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2
review_input_type: candidate_packet
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
```

## 审查立场

本 review 只使用 packet 与其索引的公开证据、以及 packet 明示的 clean human-reviewed archive anchors。未写入 packet 的隐藏额外约束不作为审美加分理由；`A=D` / `B=C` 造成的零步 self-pair 只按 packet 的 pair policy 作为接口事实，既不扣成外溢，也不加成 meta 审美。

已读取材料：

- `prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2.zh.md`
- `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_layout.txt`
- `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_edges.md`
- `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_base.md`
- `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_meta.md`
- `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_base_no_late.md`
- `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_meta_required.md`
- `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_goal_A.md`
- `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_goal_B.md`
- `prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_review_1.md`
- `prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml`
- `prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0015.md`
- `prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0034.md`
- `prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0035.md`
- `prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0037.md`
- 参考上一版 critic：`prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_review_1.md`

## 核心判断

```yaml
strongest_merits:
  - >
    v2 比 v1 的关键增强成立：新增连接冰 [9,5] 的 d3 牺牲，让流程不再只是
    左右两个 target d4 门、再在 meta 中换成上下两个 d4 门。返回解显示 base
    在左锁借出后先清 [9,5]，再偿还左锁；meta 则在右锁竖向借还后，从反向清
    同一个 [9,5]，再进入左锁竖向借还。这个中段动作有实际状态转折作用。
  - >
    同一两处 target/锁位 [6,6]、[16,6] 在返回解中确实被水平/竖向改读：
    base 是 right/left 借还，meta 是 down/up 借还，且顺序反转。它不是纯粹
    靠 A=D / B=C 接口重名制造的幻觉。
  - >
    base 机制窗口通过：base_no_late 完整扫描未命中 ice_pass_through_d5、
    slide_restart_after_group、ice_destroy_group_d6_plus；d3 在 exposure sequence
    中早于 d4，因此 base 仍处于 d6 前窗口。
  - >
    新增 interface_edges 公开证据核验通过：edge_floor_cells 只有 [0,6] 与
    [23,6]，unexpected_edge_floor_cells 为空。该事实只支持接口完整性，不作为
    审美加分。
```

## 重点攻击项

### 审美是否稳 4

结论：低位 4 可以守住，但必须带 caveat；不能上探 5，也不应把“self-pair 同格”或静态封边当成额外审美理由。

v1 不能稳 4 的原因是两个同构 d4 门串接过强，meta 只是把水平门换成竖向门。v2 加入 [9,5] 后，审美读法有了第二层：同一连接冰在两条流程中从相反方向被牺牲，且它插入到锁位借还与跨中段通行之间。base 的左锁不是“借出-立刻偿还”的孤立门，而是借出后必须处理连接冰；meta 也不是 base 后缀，而是右锁竖向处理后再反向清同一连接点。

这足以把它从 ICE_CAND_0037 式“重复 target-door 串接”中拉出来，接近 ICE_CAND_0034 的 4 分锚点：紧凑结构在回访/反向读取时获得新读法。但它仍弱于 ICE_CAND_0035；没有自然 return pressure，也没有更大尺度的一关两用惊喜。审美应记录为“稳定 4 的低端 / proposal_ready_with_caveats”，不是标杆。

### 是否仍像 ICE_CAND_0037 / target-door 重复

不是同等级失败，但相似风险仍是主 caveat。

ICE_CAND_0037 的人类负评核心是多个无洞见 d4 target-door 步骤拼接，并伴随接口外溢。当前候选在接口上没有同类外溢：pair evidence 与 interface_edges 都只支持 `[0,6]`、`[23,6]` 两端点和两个 0 步 self-pair。审美上，当前仍使用两枚 target 锁位与四次 d4 借还，所以 target-door 亲缘关系很明显；不过 v2 的 [9,5] d3 连接牺牲让两个锁不是单纯并列重复，base/meta 的轴向和清理方向也确实改变。它是“target-door 邻近但已被中段状态转折救回来”的案例，而不是 0037 那种三段重复反例。

### meta 是否只是 base 后缀或重复门

不只是 base 后缀，但也不是强 meta 反转。

meta 的返回解顺序是右锁竖向借还、反向 d3 清 [9,5]、左锁竖向借还；base 是左锁水平借出、d3 清 [9,5]、左锁水平偿还、右锁水平借还。顺序、轴向、连接冰的进入方向都变了。这个差异足以支持“同锁位轴向改读”而非“base 的后缀复读”。

caveat 是：工具没有 objectParticipation，也没有 all-solution coordinate gate；所以“同一对象身份必然这样变化”不能超出返回解快照来讲。审美判断也不能靠 complete graph 自动升级，只能靠玩家可见的坐标、方向、连接冰状态来支撑。

### difficulty 是否达标

```yaml
difficulty_read:
  base:
    supported_lower_bound: ">=2"
    critic_estimate: "2+ 到低 3"
    evidence:
      - cost 39
      - returned pushes 5
      - ice_rebound_d4 4 次
      - ice_destroyed_d3 1 次
      - solution_commitments 5
      - forced_viable_prefix 2/5
      - SCC one_win_continuation_per_scc, forcedWinPrefix 2/2
    caveat: >
      base 的第二个 target 锁仍明显复用第一个水平门语法，因此不宜把 base
      单独说成强 3；但中段 d3 让它超过纯两门练习。
  meta:
    supported_lower_bound: ">=2"
    critic_estimate: "约 3"
    evidence:
      - cost 47
      - returned pushes 5
      - ice_rebound_d4 4 次
      - ice_destroyed_d3 1 次
      - solution_commitments 5
      - forced_viable_prefix 1/5
      - SCC branching_win_dag, winning_states 2
    caveat: >
      meta 分支更多，竖向可达位与反向清连接冰更难读，较稳支撑约 3。
  combined:
    result: "满足 base/meta 均 >=2，且至少 meta 一条 >=3"
    overclaim_to_avoid: "两条都强 3"
```

## SCC / 图事实的玩家侧解释

```yaml
scc_graph_interpretations:
  - graph_fact: >
      base graph complete, reachable_states=5111, winning_states=1;
      base_no_late 未找到缺少 ice_rebound_d4 的胜利路径。
    neutral_meaning: >
      A->B 的显式目标实例被完整搜索，胜解需要 d4 事件类型。
    player_facing_interpretation: >
      玩家必须掌握 d4 借还门语法；这支持难度下界，但不自动证明审美 4。
    verdict_effect: merit
  - graph_fact: >
      base_no_late forbidden reachable hits 为 none，禁项为 d5、restart、d6_plus。
    neutral_meaning: >
      base 可达机制未越过允许窗口；d3 与 d4 均在窗口内。
    player_facing_interpretation: >
      base 不被后期机制噪声污染，满足 d6 前窗口要求。
    verdict_effect: merit
  - graph_fact: >
      meta graph complete, reachable_states=7119, winning_states=2;
      meta_required 未找到缺少 ice_rebound_d4 的胜利路径。
    neutral_meaning: >
      C->D 的显式目标实例同样需要 d4 事件类型，并且存在两个 winning states。
    player_facing_interpretation: >
      meta 有实际竖向 d4 门要求，但不是单线脚本；分支感支持约 3 难度。
    verdict_effect: merit_with_caveat
  - graph_fact: >
      interface_goal_A/B 显示 [0,6]->[0,6] 与 [23,6]->[23,6] cost 0。
    neutral_meaning: >
      A=D 与 B=C 造成同格 self-pair。
    player_facing_interpretation: >
      按 packet pair policy 这是 ignored self-pair，仅证明接口事实；不应加审美分。
    verdict_effect: none
  - graph_fact: >
      interface_edges 报告 edge_floor_cells 为 [0,6]、[23,6]，unexpected_edge_floor_cells: []。
    neutral_meaning: >
      没有额外外边界可站立格。
    player_facing_interpretation: >
      消除了 ICE_CAND_0037 式外部 edge spillover 风险；这是接口合规，不是审美加分。
    verdict_effect: hard_evidence_only
```

## 归档校准

```yaml
archive_taste_context_used:
  ICE_CAND_0015: >
    审美 1、难度 2；机器链条成立仍可能因玩家不需要洞见而降为线性开锁。
    当前候选的连接 d3 与轴向改读比 0015 的“自然被通路触发”更有可见结构意义。
  ICE_CAND_0037: >
    审美 1、难度 2；重复 target-door 串接与接口外溢是负例。当前候选仍有
    target-door 邻近风险，但 v2 的连接冰状态转折和干净 edge 接口避免了同等级失败。
  ICE_CAND_0034: >
    审美 4；meta 回访扰乱/改写同一结构可支撑紧凑 4。当前候选最接近这个锚点，
    但亮点更小，属于 4 的低端。
  ICE_CAND_0035: >
    审美 5、难度 4；旧出口变回访入口依赖自然 return pressure 与角色改变。
    当前没有 world wrapper，不能借 B=C/A=D 或 self-pair 表面形态向 5 分锚点靠拢。
```

## Caveats

```yaml
nonblocking_caveats:
  - >
    连接冰 [9,5] 的 d3 必要性目前由返回解和图上下文支撑；没有单独的 all-solution
    required gate 证明所有胜解都必须以同坐标、同对象、同顺序执行该 d3。
  - >
    同锁位角色变化是返回解坐标/快照事实，不是对象身份证明；objectParticipation
    未报告。
  - >
    审美 4 的成立依赖“轴向改读 + 连接 d3 状态转折”合取判断；如果后续人类评审认为
    [9,5] 只是清路噪声，则会降回 3+ 或 held_proposal。
  - >
    base 可说 >=2、接近低 3；meta 更稳约 3。不要把两条都包装成强 3。
```

## 结论

```yaml
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
summary: >
  本候选通过硬接口、base d6 前窗口、d4 required 和难度下界检查。审美上，v2
  的 [9,5] 连接冰 d3 让结构从 v1 的双 target-door 横/竖复用中脱出：base/meta
  共享两锁与同一连接点，但入口方向、轴向、顺序和中段状态处理均改变。它仍是
  target-door 邻近、低位 4，不是 ICE_CAND_0035 式标杆；但按 packet 目标可作为
  proposal_ready_with_caveats 进入后续人工审查。本轮无需结构性修改。
```
