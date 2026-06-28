# 实验运行 Prompt 模板

状态：实验性模板，用于启动一次人类引导的单关设计归档实验。

用途：把已有 designer + critic 单关流程串成一次可归档的实验运行。本模板只负责调度流程，不复制细节规范。细节规范以被引用文档为准。

## Prompt

```text
请阅读并遵守以下文档：

docs/21-current-workflow-standard.md
docs/29-design-archive-contract.md
templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md
templates/design_archive/ARCHIVE_PASS_PROMPT.md
templates/design_archive/CANDIDATE_RECORD.template.md

<prototype_required_docs>
<experiment_brief_path>
<archive_index_path>

权威边界：

1. 规则事实、工具输出、solver trace、runtime 行为是机制事实的权威来源。
2. docs/21-current-workflow-standard.md 是 designer + critic 单关流程的权威来源。
3. docs/29-design-archive-contract.md 和 templates/design_archive/* 是归档记录、流程完整性和 clean archive 入档边界的权威来源。
4. <prototype_required_docs> 是该原型局部设计纪律、审美偏好、特殊流程的权威来源。
5. <experiment_brief_path> 是本轮实验目标、候选数量、机制范围和限制的权威来源。
6. 本 prompt 只负责调度运行。若它和上面文档冲突，必须暂停、指出冲突，并按更具体的权威文档执行。

任务：

按 <experiment_brief_path> 串行生成并归档 <candidate_count> 个
<prototype_id> 候选。

本轮实验目标：

<human_experiment_goal>

串行候选目标：

<candidate_sequence>

运行原则：

1. 候选必须串行完成。一个候选完成完整 Candidate Gate Loop 后，才能进入下一个候选。
2. 每个 gate 都必须显式输出：
   - verdict: pass | revise | reject | hold | not_applicable
   - blocking_issues
   - required_next_action
   - evidence_refs
3. verdict 不是 pass 或 not_applicable 时，不得进入下一个 gate，除非 required_next_action 明确允许归档为 hold / rejected / caveated。
4. 如果某个 gate 不适用，必须输出 not_applicable 和原因，不能跳过。
5. 如果发生修改，必须回到 required_next_action 指向的上游 gate，并记录本次失败尝试。
6. 不要把 checklist 重新发明一遍。每个 gate 应引用相应文档中的规范来判断。

Design Search Scope 规则：

- 如果 <experiment_brief_path> 中 `design_search.scope` 是 `experiment_run`，
  必须先完成一次 run-level Design Search Gate，产出整轮 search_ledger、
  search_ledger_status 和 selected candidate queue，然后再按队列串行进入候选
  Gate Loop。候选记录只引用与自身相关的 attempts，但最终结论必须说明整轮预算
  是否达成。
- 如果 `design_search.scope` 是 `candidate`，每个候选必须单独完成 Design
  Search Gate，不得复用另一个候选的预算。
- 如果 `design_search.scope` 是 `family`，必须说明当前候选属于哪个 family，
  以及该 family 的预算是否已消耗完毕。
- 如果 scope 缺失，按 `search_budget_missing` 处理。

Candidate Gate Loop：

Gate A - Draft Gate

目标：产生一个可验证的候选草案，而不是最终成品。

必须使用：
- <experiment_brief_path>
- <prototype_required_docs>
- experiment brief 中的 mechanism_scope

必须输出：
- intended_role
- candidate_mode
- concrete causal_chain
- solve instance / win condition
- player_start / player_goal，或该原型等价的显式求解参数
- central mechanism 的责任，以及该责任在哪里被消费
- allowed_support / incidental / forbidden / report-only 机制预期
- 初始 layout
- gate verdict

Gate B - Design Search Gate

目标：留下可审计的设计搜索账本，证明候选来自声明预算内的探索，而不是第一版
草稿或不可复现的“脑内尝试”。

必须使用：
- docs/21-current-workflow-standard.md 中的设计搜索账本规范
- <experiment_brief_path> 中的 design_search
- <prototype_required_docs> 中的原型局部设计纪律

必须输出：
- search_budget_summary：
  - scope
  - budget_owner
  - goal
  - hypothesis_family_min
  - variant_per_family_min
  - repair_round_min
  - evidence_gate_candidates_min
  - stop_conditions
- exploration_axes：本轮 brief 声明的探索轴；若缺失，标记
  search_budget_missing，不得自行把当前原型经验硬编码为通用流程
- scope_handling：说明 design_search 预算按 experiment_run、candidate 还是
  family 消耗；若为 experiment_run，不要为每个候选重置预算，但每个候选必须
  引用相关 attempts 和整轮覆盖状态
- search_ledger：逐条记录 attempt_id、hypothesis_family、
  candidate_or_sketch_ref、structural_delta、intended_player_logic、
  expected_core_responsibility、validation_summary、critic_or_self_attack、
  repair_or_abandon_reason、evidence_refs
- selected_for_evidence：哪些候选进入后续 Evidence Gate，以及为什么
- discarded_or_held_sketches：没有进入证据流程的草图及放弃原因
- search_ledger_status：
  no_search_evidence | search_budget_missing | under_budget | shallow_search |
  searched_but_unresolved | ready_for_evidence_after_search |
  capability_or_tool_limit
- gate verdict

如果 design_search 缺失，而本轮任务是设计探索、机制价值判断、候选比较或关卡
库填充，required_next_action 必须是补充 brief 或将结果降级为 draft / calibration
material。不得把单个失败草图解释为机制失败、工具失败或 LLM 能力上限。

如果 search_ledger_status 是 no_search_evidence、search_budget_missing、
under_budget 或 shallow_search，只有在人类或 controller 明确允许归档草稿 / 废案 /
校准样本时才能继续；否则 required_next_action 必须是继续搜索或调整 brief。

Gate C - Evidence Gate

目标：用工具证据验证候选声称，不让 designer claim 先于证据。

必须使用：
- docs/21-current-workflow-standard.md 中的 evidence / claim hygiene 要求
- experiment brief 中的 mechanism_scope
- 原型工具、solver、explain、graph / SCC 工具，如果可用

必须输出：
- solvability 证据
- solution trace 或等价求解证据
- central mechanism 事件证据
- forbidden_in_winning_solution 检查结果
- must_report_if_seen_anywhere 检查结果
- bypass / graph / SCC 证据边界
- gate verdict

Gate D - Critic Gate

目标：让 critic 按 docs/21 的单关审查流程攻击候选，而不是只复述 designer 意图。

必须使用：
- docs/21-current-workflow-standard.md 中的 critic / structural probe 要求
- <prototype_required_docs> 中的原型局部设计纪律
- 已有工具证据

必须输出：
- evidence reviewer artifact，若适用
- puzzle critic artifact
- designer response: accept_and_revise | defend_with_evidence | downgrade_or_hold | reject_and_redesign
- 未解决攻击
- review_integrity: independent_review | human_review | self_review_only | missing | blocked
- gate verdict

如果无法产生独立 evidence reviewer / puzzle critic artifact，必须把
review_integrity 标为 blocked 或 missing。designer self-attack 只能记为
self_review_only，不能满足 Critic Gate，也不能计入 `critic_gate_candidates_min`。

Gate E - Start Gate

目标：完成起始位置优化，而不是只记录一个 solver 返回的起点。

必须使用：
- docs/21-current-workflow-standard.md 中的 opening / start-position 相关流程
- templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md 中的 start-position refinement 要求
- 原型工具；如果起点变化影响证据，必须重跑必要工具
- 如果原型提供正式起点比较工具，必须使用正式工具并保存命令/输出；不要只写
  “start comparison script” 这样的不可复现摘要。

必须输出：
- 被比较的 start candidates
- 推荐 start
- 对 opening commitment、核心链条保真、目标机制覆盖、阅读顺序的结论
- 失败或被放弃的 start 及原因
- 起点比较工具的命令、报告路径或完整输出摘要
- gate verdict

如果推荐 start 与 Gate C / Gate D 已验证的实例不同，required_next_action 必须回到
Gate C，并在更新证据后重新经过 Gate D。最终归档只能记录最终实例的证据和攻防。

Gate F - Prototype-specific Extension Gate

目标：执行本原型明确声明的额外设计检查。不要在通用流程中假设每个游戏都有
meta-interface、重访、大地图接口、跨关入口或类似机制。

适用性：
- 只有当 <prototype_required_docs> 或 <experiment_brief_path> 明确声明某个
  prototype-specific extension 时，才执行本 gate。
- 如果原型没有声明额外扩展，本 gate 输出 not_applicable 和原因，不要补写
  meta-interface 字段。
- 如果原型声明了多个扩展，应按原型文档分别执行，并为每个扩展保存证据边界。

必须使用：
- <prototype_required_docs> 中的原型专属扩展规范
- <experiment_brief_path> 中对本轮是否启用扩展的声明
- 当前候选的工具证据和 critic 结论

必须输出：
- extension_name
- applicability: required | optional | not_applicable
- authority_refs：哪份原型文档或 brief 声明了该扩展
- extension_claim：该扩展的具体设计声明
- extension_evidence：需要哪些工具证据、哪些已经完成、哪些未知
- extension_risks：该扩展是否破坏 base candidate 或引入额外风险
- extension_classification：使用原型文档自己的标签；不要在通用模板里发明标签
- gate verdict

如果某个原型把 meta-interface / meta-reinterpretation 声明为专属扩展，则按该
原型文档输出 base/meta solve instances、chain_delta、shared_structure、
non_target_pairs 等字段。若该变体被推荐为可玩的候选版本，而不是设计备注，必
须为相关 solve instances 补充必要工具证据；如果它改变 base candidate 的核心
解法，应回到 Gate C。

Gate G - Final Decision Gate

目标：决定候选归档状态，而不是强行包装成成功候选。

必须使用：
- docs/21-current-workflow-standard.md 的 final review / caveat 纪律
- docs/29-design-archive-contract.md 的 process_integrity / archive_eligibility 规范
- 前面所有 gate 的 verdict
- Gate B 的 search_ledger_status；若候选最终通过所有必要 gate，可在此更新为
  valid_candidate_after_search

必须输出：
- archive_status
- status_rationale
- best claim this candidate can honestly support
- unresolved caveats
- search_ledger_status 及其对结论强度的限制
- process_integrity
- archive_eligibility
- human-review priority
- gate verdict

Gate H - Archive Gate

目标：把候选、证据、攻防、设计逻辑链和空缺的人类评语位置写入归档。

必须使用：
- templates/design_archive/CANDIDATE_RECORD.template.md
- templates/design_archive/ARCHIVE_PASS_PROMPT.md
- docs/29-design-archive-contract.md
- <archive_index_path>

必须执行：
- 保存候选记录到 <candidate_archive_dir>
- 更新 <archive_index_path>
- human comments 为空时标记为 pending / empty
- 写入 Gate B 的 search_ledger、discarded_or_held_sketches，以及 Gate G 确认后的
  最终 search_ledger_status
- 写入 process_integrity 和 archive_eligibility
- archive pass derived metadata 只能作为检索与导航元数据
- 不创建 <forbidden_files>

必须输出：
- archive file path
- index update summary
- gate verdict

归档状态限制：

<archive_status_policy>

最后回复：

1. <candidate_count> 个候选简表。
2. 每个候选的 gate verdict 总览。
3. 整轮或逐候选的 search_ledger_status，以及是否达到 brief 声明的搜索预算。
4. 每个候选是否满足 central mechanism 核心约束。
5. 每个候选是否触发 / 可能触发 forbidden 或 report-only 机制。
6. 每个候选的 start-position refinement 结论。
7. 每个候选的 prototype-specific extension 结论；若无扩展，写 not_applicable。
8. 每个候选的 review_integrity 和 archive_eligibility。
9. 哪个候选最值得人类设计师优先看。
10. 哪些目标没有完成。
11. 已写入的 archive 文件路径。
```

## 占位符说明

`<prototype_required_docs>` 应列出该原型的规则、solver、designer contract、设计指令，以及原型专属扩展文档（如果有）。不要把这些文档的细节复制进 prompt。

`<candidate_sequence>` 应分别描述每个候选的探索方向，让 designer 保持串行推进。

`<archive_status_policy>` 用来限制本轮实验可使用的归档状态，例如是否允许 `positive_reference`、是否必须等待人类评语后才能升格。

`<forbidden_files>` 通常包括本轮实验不允许创建或修改的上游知识、课程、关卡规格文件。
