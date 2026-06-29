# 实验运行 Prompt 模板

状态：实验性模板，用于启动一次人类引导的单关设计归档实验。

用途：调度 `docs/21` 的设计 / 证据 / review 循环，并在结束时按归档合约保存
proposal、held material、rejected candidate 或 failed search。本文不复制细节规范；
细节规范以被引用文档为准。

## Prompt

```text
请阅读并遵守以下文档：

docs/21-current-workflow-standard.md
docs/20-multi-agent-prompt-templates.md
docs/30-scc-graph-diagnostic-reading.md
docs/29-design-archive-contract.md
templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md
templates/design_archive/ARCHIVE_PASS_PROMPT.md
templates/design_archive/CANDIDATE_RECORD.template.md

<prototype_required_docs>
<experiment_brief_path>
<archive_index_path>

权威边界：

1. 规则事实、工具输出、solver trace、runtime 行为是机制事实的权威来源。
2. docs/21-current-workflow-standard.md 是设计 studio loop、review loop 和
   terminal states 的权威来源。
3. docs/20-multi-agent-prompt-templates.md 是 reviewer / critic 上下文和输出形
   状的权威来源。
4. docs/30-scc-graph-diagnostic-reading.md 是 SCC / graph 诊断事实如何进入
   质量判断的权威来源。
5. docs/29-design-archive-contract.md 和 templates/design_archive/* 是归档记录、
   流程完整性和 clean archive 入档边界的权威来源。
6. <prototype_required_docs> 是该原型局部设计纪律、审美偏好、特殊流程的权威
   来源。
7. <experiment_brief_path> 是本轮实验目标、机制范围、探索方向和限制的权威来源。
8. 本 prompt 只负责调度运行。若它和上面文档冲突，必须暂停、指出冲突，并按更
   具体的权威文档执行。

任务：

按 <experiment_brief_path> 探索 <prototype_id> 的本轮设计方向，最多提交
<candidate_count> 个 proposal 给人类设计师审查。

不要把本任务理解为“必须产出 <candidate_count> 个 accepted candidate”。如果没有
候选达到 proposal_ready / proposal_ready_with_caveats，输出 failed_search 和
failure distribution，不要降格提交教学关、witness 关、简单 application 关或填表
式伪候选。

本轮实验目标：

<human_experiment_goal>

候选探索方向：

<candidate_sequence>

运行原则：

1. 不要把流程执行成固定流水线。不要预设草稿、探索、证据、critic、起点、扩展、
   最终判断和归档会自动依次通过。
2. 正确流程是嵌套编号循环：

   ```text
   外层设计家族循环:
     family_iteration_1 -> candidate_version_1 -> tools/evidence
     如果该 family 无法满足 brief，放弃它并开始 family_iteration_2

   内层 review-modify 循环:
     candidate_version_1 -> review_1
     review_1 攻击 -> designer_action_1
     designer_action_1 产出 candidate_version_2、evidence_disagreement_2、
       hold、reject、change_family 或 failed_search
     candidate_version_2 / evidence_disagreement_2 -> review_2
     review_2 攻击 -> designer_action_2
     ...
     重复，直到最新材料上的最新 review 达到 terminal state

   Archive Pass:
     记录 terminal state；不得升级状态
   ```

3. Critic 之后没有“继续下一个阶段”，也没有固定二审。`review_N` 之后只有：
   - structural / claim / start / mechanism-scope revision + rerun evidence +
     review_N+1
   - evidence_disagreement for review_N+1
   - downgrade_or_hold
   - reject_or_change_family
   - failed_search
   Designer action 不能关闭 review loop。
4. LLM designer 不能自行宣布 accepted、mainline、positive_reference 或 reference。
   除非 <archive_status_policy> 明确授权，否则最终只能使用：
   - proposal_ready
   - proposal_ready_with_caveats
   - held_proposal
   - rejected_candidate
   - failed_search
   - structural_redesign_needed
5. Start-position refinement、edge-goal diagnostics 等是按 routing 调用的证据
   诊断；prototype-specific redesign stage 不是机械筛查。若原型声明
   meta-interface / meta-reinterpretation 是 redesign stage，它应基于已有
   base candidate 做再设计、优化或变体提案，而不是枚举边缘入口出口。
6. 除非人类请求或 <experiment_brief_path> 明确授权变体、修补、强化、延展、
   remix 或基于某个 archive candidate 继续设计，不得设计、优化或提交已有
   archive candidate 的变体。archive taste context 只用于审美和失败模式校准，
   不是可复用 base。

Exploration Log：

- 本模板不使用硬性 family 数、硬性 variant 数或硬性 critic 数来保证质量。
- studio loop 中应保留轻量 exploration log：记录有代表性的结构方向、局部修补、
  放弃原因、工具证据和 critic 攻击。
- exploration log 是设计记忆，不是质量证明。尝试很多次不能让候选通过；尝试很
  少次也不能让坏候选通过。
- 候选质量由工具证据、diagnostic routing、evidence reviewer、puzzle critic 和
  review loop 状态转移保证。
- 如果没有 proposal-ready 候选，输出 failed_search 和 failure distribution，
  不要用“尝试次数不足/足够”包装结论。

Archive Taste Context：

- 如果实验 brief 要求参考 archive examples，`archive_taste_context` 只能包含带
  人类评语的 clean archive candidate。
- 没有人类评语的 prior candidate 可以作为普通 exploration / prior attempt
  context 记录，但不能作为审美正例、审美反例、human taste calibration、
  critic_calibration 或 designer_claim_calibration。
- 如果没有相关且带人类评语的 archive 条目，写 `none_found`，不要用
  critic-only / designer-derived / tool-only 归档条目补位。

Design Studio Loop 要求：

每个 serious candidate 必须先有结构化 design_claim：

```yaml
design_claim:
  player_insight: ""
  causal_chain: ""
  why_not_execution: ""
  falsification: ""
```

studio loop 中应自由迭代，不需要给每个草图填完整 candidate record。但每个进入
review loop 的候选必须至少有：

- intended_role
- candidate_mode
- design_claim
- solve instance / win condition
- player_start / player_goal，或该原型等价的显式求解参数
- mechanism_scope 预期：central / allowed_support / incidental / forbidden /
  report-only
- layout
- tool commands / evidence summary / evidence_refs
- start-position 诊断，若该角色或原型需要
- prototype-specific work 结论，若 brief 或原型明确要求；若原型文档或 brief
  声明它是 redesign_stage，应按该原型流程判断是否提出 redesign variant，并说
  明 base 是否值得打磨、是否重跑证据
- 失败尝试摘要：哪些修改、删减、换 family 或工具证据导致放弃

如果工具证据不支持 design_claim，必须在 studio loop 中 revise、downgrade、
discard 或 change family；不要把弱 claim 包装后送 review。

Review Loop 要求：

- evidence reviewer 判断证据是否支持 design_claim。
- puzzle critic 攻击 player_insight、why_not_execution、role fit 和结构审美。
- reviewer / critic 输出必须包含 docs/20 所定义的 review_loop_state 和
  required_action，并标明 review_iteration 与 candidate_version_reviewed。
- 如果 required_action 不是 none，review_loop_state 不能是 proposal_ready 或
  proposal_ready_with_caveats。
- reviewer / critic 若使用 SCC / graph 事实作为攻击或背书，必须遵守
  docs/30-scc-graph-diagnostic-reading.md，写清：
  `graph_fact -> neutral_meaning -> player_facing_interpretation ->
  verdict_effect`。缺少 player-facing interpretation 时，verdict_effect 必须是
  `none`。
- 如果无法产生独立 reviewer / critic artifact，必须标记：

  ```yaml
  review_integrity: missing | blocked | self_review_only
  terminal_state: held_proposal | failed_search | rejected_candidate
  ```

- `self_review_only` 不能满足 critic review。
- 如果 critic state 是 `revise_required`，必须结构修改、重跑证据，并把新版本
  交给下一轮 review。
- 如果 critic state 是 `held_proposal` 或 `rejected_candidate`，designer 不能用
  final decision 把它升级成 proposal_ready / accepted。
- evidence_disagreement 只适用于 critic 漏看或误读已有具体证据。它必须交给下
  一轮 review，不能作为 designer 自己关闭 review loop 的动作。
- 如果 designer 接受一个核心攻击，却没有结构修改、降级处理、reject/change
  family，或没有把证据异议交给下一轮 review，review loop 未闭合。

Prototype-Specific Work：

- 只有 <prototype_required_docs> 或 <experiment_brief_path> 明确声明时，才执行
  prototype-specific work。
- prototype-specific work 可能是 diagnostic，也可能是 redesign_stage。不要把
  redesign_stage 当成工具筛查。
- 如果某个原型文档或 experiment brief 声明 meta-interface /
  meta-reinterpretation 是本原型的 redesign_stage，则按该原型流程执行。若该
  流程基于 base candidate，正确流程是：先确认 A->B 作为 base candidate 有保
  留价值；再尝试小改动或重读形成 C->D；若推荐变体，必须重新验证 A->B 和
  C->D，并记录 chain_delta、shared_structure、latent payoff、non-target
  pairs 和证据边界。
- redesign 的存在不会自动提升候选质量。若 C->D 只是入口/出口变化、走路路线变
  化或同一链路复述，应按原型文档降级为 interface_clone / connectivity note /
  risk。弱 base candidate 不能靠 meta redesign 挽救。

Archive Pass：

- archive pass 只记录 terminal state，不能升级 terminal state。
- 候选记录必须写入 process_integrity、review_integrity、review_loop_state 和
  archive_eligibility。
- human comments 为空时标记 pending / empty。
- archive pass derived metadata 只能作为检索与导航元数据。
- 不创建 <forbidden_files>。
- 如果 terminal state 是 failed_search，可以保存 run ledger / failure
  distribution；不要创建伪 accepted candidate。

归档状态限制：

<archive_status_policy>

最后回复：

1. terminal state 总览：
   - proposal_ready / proposal_ready_with_caveats / held_proposal /
     rejected_candidate / failed_search / structural_redesign_needed
2. 最多 <candidate_count> 个 proposal 简表；若没有，明确写 none。
3. 每个 proposal 的 design_claim：
   - player_insight
   - causal_chain
   - why_not_execution
   - falsification
4. 每个 proposal 的 reviewer / critic review_loop_state 和 required_action。
5. 每个 proposal 是否满足 central mechanism 核心约束。
6. 每个 proposal 是否触发 / 可能触发 forbidden 或 report-only 机制。
7. 每个 proposal 的 start-position refinement 结论，若适用。
8. 每个 proposal 的 prototype-specific work 结论，若适用；若无，写
   not_applicable；若是 redesign_stage，说明是否提出推荐变体。
9. exploration log 摘要：有哪些有代表性的失败方向和结构修正。
10. 哪些候选最值得人类设计师优先看，以及为什么仍只是 proposal。
11. 哪些目标没有完成；若没有 proposal_ready，给出 failure distribution。
12. 已写入的 archive / ledger 文件路径。
```

## 占位符说明

`<prototype_required_docs>` 应列出该原型的规则、solver、designer contract、设计指令，以及原型专属工作文档（如果有）。不要把这些文档的细节复制进 prompt。

`<candidate_sequence>` 应分别描述每个候选或 family 的探索方向，让 designer 保持串行推进。

`<archive_status_policy>` 用来限制本轮实验可使用的归档状态。默认应禁止 LLM designer 直接使用 `accepted`、`positive_reference`、`reference` 或 `mainline`。

`<forbidden_files>` 通常包括本轮实验不允许创建或修改的上游知识、课程、关卡规格文件。
