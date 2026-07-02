# Evidence Review: ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1

```yaml
review_iteration: 1
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1
review_input_type: candidate_version
reviewer_role: independent evidence reviewer
verdict: supports_claim
review_loop_state: proposal_ready
required_action: none
```

## Review Scope

本 review 只核查 packet 的事实声明、证据引用、解图、required/forbidden 探针、interface pair policy 分类、初始 ice/target 关系，以及 base/latest required 是否成立。不评价审美、趣味、难度评分或 `meaningful_reinterpretation` 的玩家侧质量；这些属于 puzzle critic 范围。

已读取并遵循：

- `skills/sokoban-evidence-reviewer/SKILL.md`
- `skills/sokoban-design-review-loop/references/evidence-reviewer-template.md`
- `skills/sokoban-design-review-loop/references/scc-graph-reading.md`
- `prototypes/ice_slide_escape/docs/rules.md`
- `prototypes/ice_slide_escape/docs/solver_contract.md`
- `prototypes/ice_slide_escape/docs/meta_interfaces.md`
- `prototypes/ice_slide_escape/docs/design_directives.md`
- `prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml`

核查对象：

- `prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1.md`
- packet 引用的 layout、base/meta analysis、base/meta required/latest、interface edge reports
- reviewer 独立复跑的 base/meta required/latest 探针和 A/B/C/D interface pair 探针

## fact_findings

### Layout And Initial Objects

- layout 为 28x22 矩形，未发现行宽不一致。
- 初始 `*` 坐标为 `[4,5]`, `[11,5]`, `[18,5]`, `[9,15]`, `[16,15]`, `[23,15]`，与 packet 的六个目标冰一致。
- 未发现普通 `I`，未发现裸 `G`。因此“所有 ice/boxes 初始都在 target 上”成立，且没有 extra ice。
- 边缘可站立格只有 `[0,5]`, `[27,5]`, `[27,15]`, `[0,15]`，分别对应 A/B/C/D；未发现 A/B/C/D 之外的边缘 floor。
- A->B 上方直线路径被 `[4,5]`, `[11,5]`, `[18,5]` 的目标冰封住；C->D 下方直线路径被 `[23,15]`, `[16,15]`, `[9,15]` 的目标冰封住。该事实支持 packet 对“目标上初始有冰但也封路”的基本事实声明。

### Base Instance A->B

- `layout_analysis_..._base.md` 支持 A `[0,5]` 到 B `[27,5]` 可解：cost 47，depth 47，events 为 `walk=41`, `push_ice=6`, `ice_rebound_d4=6`。
- base graph 状态为 complete：reachable states 1717，legal transitions 3740，winning states 1，预算 maxStates 100000，未出现 exhausted。
- agency/SCC 事实与 packet 摘要一致：compressed regions 85，solution irreversible steps 6，winSubgraph `branching_win_dag`，forcedWinPrefix `1/6`。
- `start_comparison_..._base_required_latest.md` 支持 base 的 required winning gate：缺少 `ice_rebound_d4` 的胜利路径未找到，完整搜索 explored=1716。
- base 可达事件扫描 complete：reachable states 1717，legal transitions 3740，forbidden reachable hits none，事件计数只列出 `walk`, `push_ice`, `ice_rebound_d4`, `ice_stop_short:d1`, `push_ice_failed`。
- reviewer 独立复跑时额外把 `ice_boundary_disappear` 加入 forbidden reachable events，结果仍为 pass，complete，forbidden hits none。因此按 exposure sequence，base 可达事件中 d4 之后的 listed events 未被触发；base 中可达的最后期 listed knowledge 为 `ice_rebound_d4`，且该事件在所有胜利路径中必经。

### Meta Instance C->D

- `layout_analysis_..._meta.md` 支持 C `[27,15]` 到 D `[0,15]` 可解：cost 47，depth 47，events 为 `walk=41`, `push_ice=6`, `ice_rebound_d4=6`。
- meta graph 状态为 complete：reachable states 1717，legal transitions 3740，winning states 1，预算 maxStates 100000，未出现 exhausted。
- agency/SCC 事实与 packet 摘要一致：compressed regions 85，solution irreversible steps 6，winSubgraph `branching_win_dag`，forcedWinPrefix `1/6`。
- `start_comparison_..._meta_required_latest.md` 支持 meta 的 required winning gate：缺少 `ice_rebound_d4` 的胜利路径未找到，完整搜索 explored=1716。
- reviewer 独立复跑 meta required/latest 时额外加入 `ice_boundary_disappear` forbidden reachable event，结果仍为 pass，complete，forbidden hits none。meta 默认可用全部知识，因此该更严格复核不是必要门槛，但支持 packet 对 meta 实际事件范围的事实声明。

### Required/Forbidden Probe Discipline

- packet 的 base `allowed_exposure_through: ice_rebound_d4` 与 `mechanic_exposure_sequence.yml` 中 d4 rebound 位置一致。
- packet 引用的 base required/latest 探针证明两件事：所有胜利路径需要 `ice_rebound_d4`，完整可达扫描未命中 `ice_pass_through_d5`, `slide_restart_after_group`, `ice_destroy_group_d6_plus`。
- packet 原始 forbidden list 未显式列出 d4 之后的 `ice_boundary_disappear`，但原始完整事件计数未出现该事件，且 reviewer 复跑将它列入 forbidden 后仍无命中。因此这不是 blocking issue。

### Interface Pair Policy

- interface 报告和 reviewer 复跑一致支持以下分类：
  - target pairs: A->B solved cost 47；C->D solved cost 47。
  - risky internal non-target pairs: A->C, A->D, B->C, B->D 均 unsolved。
  - ignored internal reverse pairs: C->A, C->B, D->A, D->B 均 unsolved，且按 policy `verdict_effect: none`。
  - self pairs: A->A, B->B, C->C, D->D 均为 zero-step solved；规则允许初始全目标覆盖时同起终点零步胜利，且 packet 正确标为无 verdict effect。
- 因布局边缘 floor 只有 A/B/C/D，packet 的 `external_edge_escape_checks: no edge floor outside A/B/C/D exists` 成立。

## supported_claims

- `targets are overlays`、`* means target occupied by ice`、显式 edge goal win 的规则上下文与 prototype 文档一致。
- all ice initially on targets 成立；没有 extra ice。
- base A->B 与 meta C->D 都有返回解，且返回解核心事件均为 6 次 `push_ice` + 6 次 `ice_rebound_d4`。
- base/latest required 成立：base 可达窗口内 d4 是最后期已触发 listed knowledge，d4 在所有胜利路径中必经，且 d4 之后 listed events 未可达触发。
- packet 的 graph completeness 摘要成立：base/meta 图均 complete，不是 exhausted。
- packet 的 interface pair policy 分类成立；没有外部 edge escape，也没有未忽略的内部非目标 pair 可解。

## unsupported_or_overclaimed

- 未发现需要阻塞的事实性 overclaim。
- `player_insight`, `why_not_execution_only`, `classification_claim: meaningful_reinterpretation`, aesthetic target 和 difficulty target 不是工具证据可直接证明的事实；本 review 不把这些作为已证明质量结论，也不据此扣阻塞。它们应交给 puzzle critic 判断。
- 工具报告显示 returned solution 的关键 snapshots 支持目标冰被借出再归还；但没有 instance-level object participation 或 per-object necessity detector。因此“每个目标在所有胜利路径中都必须被借出并归还”若被解读为 all-solution per-object claim，则当前证据没有单独证明。packet 当前的强制门槛是 all-solution `ice_rebound_d4`，该门槛已成立。

## evidence_limits

- graph 与 reachable scan 的结论依赖当前 CLI 语义和 maxStates 100000；相关报告均 complete，未发现预算耗尽。
- interface 证据覆盖 A/B/C/D 四个声明接口和所有实际边缘 floor；因为布局没有其它边缘 floor，外部 edge escape 事实可由布局解析直接确认。
- evidence reviewer 不判断“镜像 debt chain 是否足够有 meta 重读价值”或“是否达到 4/5 难度与审美目标”。

## blocking_issues

无。

## nonblocking_notes

- 为了让 packet 自身更严整，建议下一版把 `ice_boundary_disappear` 也列入 base `forbidden_if_seen_anywhere`，因为 exposure sequence 中它位于 `ice_rebound_d4` 之后。本 review 已独立复跑并确认加入后仍通过，所以不要求返工。
- `No instance-level object participation was reported` 是证据粒度限制，不影响本轮 central gate；若后续要声称每个具体冰块或目标在所有解中都有同一对象级义务，需要新增对象级 detector 或专门探针。

## questions_for_designer

无事实阻塞问题。
