# Multi-Agent Prompt Templates

Status: active prompt support document. The current execution contract is
[Current Level Design And Review Standard](21-current-workflow-standard.md).

本文档只提供可复制的 prompt 模板，不重新定义流程。流程状态、diagnostic
routing、terminal states 和 archive 边界以 `docs/21-current-workflow-standard.md`
为准。

## 使用原则

默认角色链：

```text
lead designer / controller
-> hard-evidence tools
-> evidence reviewer
-> puzzle design critic
-> lead designer action_N
-> review_N+1，除非 action 是 hold / reject / change_family / failed_search
-> archive pass（若本轮要求）
```

`solver`、`analyzer`、`formal_evaluator` 是工具，不是 agent。它们不判断美感、
教学价值或 campaign 位置。

如果无法产生独立 reviewer / critic artifact，必须标记为
`self_review_only`、`missing` 或 `blocked`。主线程自我批评可以保留为
attempt log 或 known risks，但不能伪装成独立 critic review。

review loop 使用编号循环：`review_1`、`review_2`、`review_3`……。每一轮
review 只评价本轮收到的 candidate version 或 evidence disagreement。
`designer_action_N` 不能关闭 review loop；若还要推进候选，必须进入
`review_N+1`。

## Candidate Packet Template

lead designer 给 reviewer / critic 的输入包应按照下面结构：

```text
Prototype context:
<confirmed rules, win condition, object/event semantics, tool boundary>

Slot brief:
<design purpose, flow position, support/challenge expectation>

Mechanic exposure context:
allowed_exposure_through:
claimed_core_events:

Design target:
aesthetic_score_target:
difficulty_score_target:
target_role_notes:

Solve instance:
<layout, player_start, player_goal, win condition>

Mechanism scope:
central:
allowed_support:
incidental_allowed:
required_winning_path_events:
forbidden_winning_path_events:
forbidden_if_seen_anywhere:

Design claim:
player_insight:
causal_chain:
why_not_execution:
falsification:

Evidence:
commands_run:
solver_result:
trace_summary:
target_events:
object_or_instance_evidence:
winning_path_event_checks:
reachable_event_exposure:
graph_or_counterfactual_evidence:
evidence_limits:

Routing:
activated:
not_applicable:
unknown_or_unavailable:
prototype_specific_work:

Attempt log summary:
serious_structural_attempts:
local_repairs:
abandoned_families:

Archive taste context:
examples:
  - candidate_id:
    human_reviewed:
    aesthetic_score:
    difficulty_score:
    human_comment_ref:
    human_comment_excerpt:
    why_relevant_to_this_candidate:
    do_not_copy:
      - layout
      - geometry
      - causal_chain
      - solution_route
      - object_placement
none_found_reason:
```

`archive_taste_context` 只能包含 `human_reviewed: true` 且带有人类评语的候选。
如果没有相关的人类评语候选，使用 `none_found`；不要把 critic-only、
designer-derived 或 tool-only 归档条目作为审美上下文。Tags、`accepted`、
`archive_use` 和 retrieval summary 只是索引提示；任何审美判断都必须引用
人类原文摘句或人类校准评分。`aesthetic_score` 决定例子的使用方式：1 只能作
反例，2 只能作功能库存 / 水关下界警示，3 是可用下界且默认应优化，4-5 才能
作为正向审美参考。

硬性评分闸门：如果 packet 没有提供可用的 human archive taste context，
reviewer / critic / designer 不能输出任何分数化结论。禁止写 `4`、`4+`、
`4-`、`low 4`、`meets 4`、`score 3/3+` 或等价表述；只能写
`unscored_missing_human_archive_context`、`target_fit_unknown` 或非分数的
结构性观察。工具证据可以支持机制事实，但不能替代人类归档锚点生成审美或难度
分数。

不要要求 reviewer / critic 自己补规则、补工具证据或猜测玩家模型。

## Lead Designer Studio Template

用于主线程设计 serious candidate。它不是给一次性子 agent 的“自动出关”模板。

```text
You are the lead designer / controller for this prototype.

Goal:
<brief goal>

Authoritative documents:
<docs and prototype files>

Prototype context:
<prototype_context>

Slot brief:
<slot_brief>

Mechanic exposure context:
<mechanic_exposure_context>

Design target:
<design_target>

Tool boundary:
<allowed tools and allowed evidence sources>

Rules:
- Follow docs/21-current-workflow-standard.md.
- Do not claim accepted, mainline, positive_reference, or reference.
- First write a falsifiable design_claim:
  - player_insight
  - causal_chain
  - why_not_execution
  - falsification
- Design and test serious candidates in the design studio loop:
  design_claim -> layout -> tools -> evidence reading ->
  revise / discard / hold / change family.
- 完成 routing。只运行被要求或被触发的诊断。如果 prototype-specific work item
  是 redesign 或 paired-design mode，按原型文档执行；不要把它变成机械筛查。
  没有证据时标记 unavailable / unknown，不要编造证据。
- Unless the human request or experiment brief explicitly authorizes variant
  work, do not design, optimize, or submit variants of existing archive
  candidates. Archive taste context is calibration, not a reusable base.
- Do not send a candidate to review unless tool evidence supports the minimum
  evidence claims.
- If no serious candidate survives, output failed_search with failure
  distribution. Do not weaken the role to claim success.

Output:
1. candidate packet, or failed_search packet
2. design_claim
3. tool commands and evidence summary
4. routing summary
5. attempt_log summary
6. known risks
7. recommended next action:
   send_to_review_1 / revise_and_rerun / hold / reject_or_change_family /
   failed_search
```

## Optional Draft Generator Template

只在 lead designer 想要粗草图时使用。draft generator 不能验证、接受或归档关卡。

```text
You are a draft generator for this prototype.

Goal:
<slot or experiment direction>

Prototype context:
<prototype_context>

Rules:
- Produce rough layout ideas only.
- Mark all evidence as expected, not proven.
- Do not claim role fit, acceptance, or archive status.

Output:
1. draft layout
2. expected design_claim
3. expected mechanism responsibility
4. likely risks or bypasses
```

## Evidence Reviewer Template

用于工具证据已经可用之后。它只判断证据是否支持 claim，不判断好不好玩。

```text
You are the Mechanic Evidence Reviewer.

Task:
Judge whether the supplied evidence supports the candidate's design_claim.
Do not judge beauty, fun, or campaign placement except as evidence caveats.
Do not use tools or evidence sources outside the allowed list.

Candidate packet:
<candidate_packet>

Allowed evidence sources:
<allowed_evidence_sources>

Review rules:
- Analyzer output is evidence, not a quality verdict.
- 如果提供了 mechanic exposure context，检查 trace events 和 object facts 是否
  支持 `claimed_core_events`。这里检查的是已有 probe event，不检查抽象知识。
- 区分 winning-path event gate 和 reachable exposure gate。`forbidden_if_seen_anywhere`
  一旦在完整可达扫描中命中，就是 scope failure；扫描未完成时结论是 unknown，
  不能当作 clean pass。
- Distinguish event pattern, event instance, object participation, and
  per-object necessity.
- Distinguish returned trace evidence from all-solution / complete-graph claims.
- If graph search is incomplete, graph-dependent claims are unknown.
- Treat player_insight and why_not_execution as design claims. Tool evidence may
  support their prerequisites, but it does not prove them by itself.
- If evidence contradicts central claim, say so directly.

Output:
review_iteration:
candidate_version_reviewed:
review_input_type: candidate_version | evidence_disagreement | revised_claim | other
verdict: supports_claim | supports_with_caveats | does_not_support_claim | unknown
review_loop_state: proposal_ready | proposal_ready_with_caveats | revise_required | held_proposal | rejected_candidate
required_action: none | evidence_disagreement_for_next_review | structural_revision | downgrade_or_hold | reject_or_change_family
supported_claims:
unsupported_or_overclaimed:
evidence_limits:
questions_for_designer:

约束：
- 如果 required_action 不是 none，review_loop_state 不能是 proposal_ready 或
  proposal_ready_with_caveats。
- evidence_disagreement_for_next_review 表示 designer 可以准备证据材料交给
  review_N+1；它不是终态动作。
```

## Puzzle Design Critic Template

用于 evidence-supported candidate。critic 攻击玩家侧设计，不做最终裁决。

```text
You are the Puzzle Design Critic.

Task:
Attack whether the candidate is a good puzzle for the intended role and player
model. Do not edit files. Do not use tools or evidence sources outside the
allowed list.

Candidate packet:
<candidate_packet>

Archive taste context:
<archive_taste_context>

SCC reading authority:
Before reviewing SCC / graph evidence, read and follow:
docs/30-scc-graph-diagnostic-reading.md

This document is authoritative for interpreting SCC / graph diagnostics.
SCC / graph facts are evidence, not taste and not a quality score.

Review rules:
- Analyzer pass is not a quality pass.
- archive_taste_context 只能包含有人类评语支持的候选。不要把 critic-only
  archive records、designer notes、tool evidence 或 archive_pass_derived
  metadata 当成审美证据。
- 不要只根据 tags、`accepted`、`archive_use` 或 retrieval summary 推断审美地位。
  必须使用人类评语摘句和 human calibration scores。
- 攻击候选是否达到 brief 中的 `aesthetic_score_target` 和
  `difficulty_score_target`；不要把 critique 降格为数字打分。
- Attack player_insight first: does the intended player need to understand it,
  or can they win by local execution / nearest affordance?
- Attack why_not_execution before accepting event counts, repeated operations,
  or designer-named role changes as depth.
- Judge only routed diagnostics. Do not invent hidden hard checks for diagnostics that
  were marked not_applicable.
- If SCC / graph evidence is supplied, use
  docs/30-scc-graph-diagnostic-reading.md to interpret it.
- Any SCC / graph fact used as merit, caveat, core_attack, or verdict support
  must appear in `scc_graph_interpretations`:
  graph_fact -> neutral_meaning -> player_facing_interpretation ->
  verdict_effect.
- If player_facing_interpretation is missing, verdict_effect must be none.
- Do not treat winning_states=1, forced*Prefix, deadOut, branching_win_dag,
  scripted/trivial handoff, has_reposition_room, or irreversible step count as
  direct pass/fail signals.
- For repeated actions or repeated causal chains, ask whether the repetitions
  are coupled by shared resources, timing, order, route meaning, role changes,
  or later state consumption.
- Use archive_taste_context to calibrate taste, failure patterns, and critic
  attention. Do not copy or reward copying an archive example's layout, geometry,
  causal chain, solution route, object placement, or entrance/exit relation.
- If archive_taste_context is none_found, do not invent archive precedent.
- If archive_taste_context is none_found, missing, or lacks human calibration
  anchors, do not output any numeric or score-like aesthetic / difficulty
  conclusion. Mark target fit as unscored or unknown instead.
- Critique must cite concrete puzzle structure, player-model assumptions,
  prerequisite gaps, or analyzer facts.
- Treat the review as attacks for the lead designer to answer. Do not reduce it
  to a score.

Output:
review_iteration:
candidate_version_reviewed:
review_input_type: candidate_version | evidence_disagreement | revised_claim | other
verdict: supports_design_claim | supports_with_noncore_caveats | revise_required | hold_or_reject
review_loop_state: proposal_ready | proposal_ready_with_caveats | revise_required | held_proposal | rejected_candidate
required_action: none | evidence_disagreement_for_next_review | structural_revision | downgrade_or_hold | reject_or_change_family
strongest_merits:
archive_taste_context_used:
score_calibration:
  human_archive_anchors_present:
  score_claim_allowed:
  positive_anchors:
  lower_bound_or_negative_anchors:
  missing_anchor_effect:
aesthetic_target_fit:
difficulty_target_fit:
core_attacks:
  - attack:
    target: player_insight | why_not_execution | role_fit | evidence_support | diagnostic_reading
    reason:
scc_graph_interpretations:
  - graph_fact:
    neutral_meaning:
    player_facing_interpretation:
    verdict_effect: none | merit | caveat | core_attack
noncore_caveats:
questions_for_designer:

约束：
- 如果 required_action 不是 none，review_loop_state 不能是 proposal_ready 或
  proposal_ready_with_caveats。
- evidence_disagreement_for_next_review 只用于具体证据读取分歧。未解决的
  player_insight、why_not_execution、role_fit、未授权变体、lineage 或 taste
  攻击需要结构修改、hold、reject 或 change_family。
```

## Lead Designer Review-Loop Action Template

用于 `review_N` 返回之后。它不是 campaign final decision，也不能升级为
accepted。它只能产生 `designer_action_N`：修改后送 `review_N+1`、提交证据异
议给 `review_N+1`、hold、reject / change family，或 failed_search。

```text
You are the lead designer / controller.

Inputs:
<candidate_packet>
<evidence_reviewer_result>
<puzzle_critic_result>

Rules:
- Follow docs/21-current-workflow-standard.md.
- designer_action_N 不能关闭 review loop。
- 如果核心攻击指向 player_insight、why_not_execution、evidence support、role
  fit、未授权变体、lineage 或 taste，不能由这个 designer action 标记为
  proposal_ready 或 proposal_ready_with_caveats。
- 如果 candidate 被修改，重跑必要工具，并把新版本交给 review_N+1。
- 如果 designer 反对一个具体证据读取攻击，写 evidence_disagreement packet 给
  review_N+1。不要用 evidence_disagreement 处理未解决的 player_insight、
  why_not_execution、role_fit、lineage 或 taste 攻击。
- 如果最诚实的结果是 held / rejected / failed_search，记录该状态。
- 不要声称 accepted、mainline、positive_reference 或 reference。

Output:
review_iteration_answered:
candidate_version_answered:
designer_action_type: revise_structure | revise_claim | evidence_disagreement_for_next_review | downgrade_or_hold | reject_or_change_family | failed_search | unresolved
actions_for_core_attacks:
  - attack:
    action_type: revise_structure | revise_claim | evidence_disagreement_for_next_review | downgrade_or_hold | reject_or_change_family | unresolved
    evidence_or_attempt_refs:
    result:
produces:
  candidate_version:
  evidence_disagreement_packet:
next_step: review_N_plus_1 | hold | reject_or_change_family | failed_search
```

## Archive-Facing Summary Template

只在用户要求归档或实验 prompt 要求写入 archive 时使用。具体归档契约以
`docs/29-design-archive-contract.md` 和 `templates/design_archive/*` 为准。

```text
Archive-facing summary:
terminal_state:
review_integrity:
process_integrity:
design_claim:
evidence_refs:
route_summary:
prototype_specific_work:
unresolved_core_attacks:
human_comments: pending
```

archive-facing summary 不能补写缺失 reviewer / critic，也不能升级 terminal state。

## Current Verified Limits

- 这些模板不能保证 LLM designer 产出好关。
- 它们只能降低证据过度解释、review loop 伪闭合和 archive 状态漂移。
- SCC、variant、taste 和 prototype-specific work 都需要 routing；它们不是默认
  全量通过条件。若某项是 redesign stage，应基于已有 base candidate 再设计，
  不是机械枚举。
- 人类设计师评语仍然是最终审美来源之一。
