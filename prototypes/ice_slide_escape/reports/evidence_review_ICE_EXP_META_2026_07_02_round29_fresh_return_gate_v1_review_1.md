# Evidence Review: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1

```yaml
review_iteration: 1
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1
review_input_type: candidate_version
reviewer_role: independent_evidence_reviewer
verdict: supports_claim
review_loop_state: proposal_ready
required_action: none
```

## fact_findings

- 已读取并按 `skills/sokoban-evidence-reviewer/SKILL.md` 与 `skills/sokoban-design-review-loop/references/evidence-reviewer-template.md` 执行；本审查只核查事实、证据引用、机制范围、接口策略和 latest/forbidden 探针，不评价审美、好玩度、难度目标是否达标。
- 布局文件 `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_layout.txt` 与 packet 中布局一致；尺寸为 21x12。
- 初始目标/冰事实成立：布局中只有 5 个 `*`，坐标为 `[4,3]`, `[11,3]`, `[1,6]`, `[9,7]`, `[16,7]`；没有额外 `I`，没有裸 `G`。因此“所有 target 初始都有 ice”和“所有 ice 都在 target 上”都由布局字符支持。
- 边缘格事实成立：可站立 edge floor 只有 `[0,3]` 与 `[20,3]`，与 packet 的 A/D 与 B/C 重叠接口声明一致；未发现声明外 edge floor。
- 初始目标冰封路事实有额外复核支持：把 `*` 当作冰阻挡时，A->B 与 B->A 均不可纯步行连通；把 `*` 当作可站地板时，两方向均可连通。因此“初始已占目标的冰构成路径锁”这个事实前提成立。
- base solve 证据一致：`layout_analysis_..._base.md/json` 显示 `[0,3] -> [20,3]` found=true, cost=34, depth=34, events 为 walk=30, push_ice=4, ice_rebound_d4=4；graph status=complete, reachable states=109808, legal transitions=243352, winning states=1。
- meta solve 证据一致：`layout_analysis_..._meta.md/json` 显示 `[20,3] -> [0,3]` found=true, cost=46, depth=46, events 为 walk=40, push_ice=6, ice_rebound_d4=6；graph status=complete, reachable states=109808, legal transitions=243352, winning states=1。
- `claimed_core_events` 由返回解 trace 支持：base 与 meta 的返回解都包含 `push_ice` 与 `ice_rebound_d4`；关键快照展示每次 d4 借出/归还目标冰的状态变化。
- base latest required 成立：复跑 `compare-starts-layout` 后，`[0,3] -> [20,3]` 机器闸门 pass；缺少 `ice_rebound_d4` 的胜利路径未找到，完整搜索 explored=109830；reachable scan complete，forbidden hits none，事件计数包含 walk=235280, push_ice=8072, ice_stop_short:d1=4592, push_ice_failed=9344, ice_rebound_d4=3480。
- base forbidden exposure 排除成立：复跑结果未命中 `ice_pass_through_d5`, `slide_restart_after_group`, `ice_destroy_group_d6_plus`, `ice_boundary_disappear`。按 `mechanic_exposure_sequence.yml`，这足以支持 base 窗口内 latest reachable knowledge 为 `ice_rebound_d4`，且该事件在所有胜利路径中必经。
- meta required d4 事实也成立：复跑 `compare-starts-layout` 后，`[20,3] -> [0,3]` 机器闸门 pass；缺少 `ice_rebound_d4` 的胜利路径未找到，完整搜索 explored=109848；reachable scan complete，forbidden hits none。
- interface pair policy 事实门通过：`ICE_EXP_META_..._interface_edges.md` 报告只有两个物理 edge points `[0,3]` 与 `[20,3]`；目标 pair `[0,3]->[20,3]` cost=34 与 `[20,3]->[0,3]` cost=46 均可解；A=D 与 B=C 造成的 A->D、C->B 为同格 self pair，因所有 target 初始已被 ice 覆盖，按 solver contract 零步胜利合法，且 packet 已将其标为 `verdict_effect: none`。在重叠接口解释下，没有 distinct internal non-target pair 或外部 edge escape 被证据显示出来。

## blocking_issues

- 无。当前证据足以支持 packet 的事实声明、required/forbidden 探针、base latest required 声明、初始 target/ice 声明与重叠接口事实声明。

## nonblocking_notes

- `layout_analysis` 报告中的 `Target Event Checks` 显示 detector 未配置；这不阻断本审查，因为 all-solution required 结论来自 `start_comparison_..._required_latest` 报告与本次复跑，而不是来自 explain 报告的 target detector 段落。
- SCC/graph 事实仅作为完整性和搜索边界证据使用，不作为质量判断使用。
- 本审查不支持或否定 `classification_claim: meaningful_reinterpretation`、审美分、难度分、以及 B=C / D=A return pattern 是否“有趣”；这些属于 puzzle critic 范围。
- 没有 instance-level object participation 报告，因此证据支持事件模式、初始占位和 returned-trace 状态变化，不单独证明每一个具体冰块的 per-object necessity。

## scc_graph_interpretation

```yaml
- graph_fact: "base/meta graph status complete; reachable states=109808; winning states=1"
  neutral_meaning: "在给定预算 300000 内，相关 solve instance 的状态图已完整枚举，胜利状态数量为 1。"
  player_facing_interpretation: ""
  verdict_effect: none
- graph_fact: "compare-starts missing-required probes complete and found=false"
  neutral_meaning: "未找到缺少 ice_rebound_d4 的胜利路径，且搜索完整。"
  player_facing_interpretation: ""
  verdict_effect: none
- graph_fact: "reachable event scans complete and forbidden_hits=[]"
  neutral_meaning: "在完整可达扫描中，没有发现声明的 forbidden 后期事件。"
  player_facing_interpretation: ""
  verdict_effect: none
```

## evidence_limits

- 工具证据可以支持 `player_insight` 的前提：目标已被冰占据、这些冰也是通路锁、胜利路径必须借助 d4 借/还。但它不能单独证明玩家会产生该洞见。
- packet 的 archive/fresh lineage 声明不是本次机械复跑能完全证明的事实；本审查未发现与布局证据冲突的地方，但不把 lineage 当作工具可证结论。
- meta 默认可用全部知识；本候选 meta 实际返回解与复跑扫描只显示 d4 范围内事件。这是事实上更低暴露，不构成 evidence blocker。

## questions_for_designer

- 无必须回答的问题。
