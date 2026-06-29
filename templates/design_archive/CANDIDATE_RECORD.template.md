# Candidate: CANDIDATE_ID

```yaml
candidate_id: CANDIDATE_ID
prototype: MECHANIC_ID
experiment_id: EXPERIMENT_ID
source:
  designer: llm
  evidence_reviewer: unknown
  puzzle_critic: unknown
  archive_pass_executor: llm_designer | controller | human | script
status: unknown
search_ledger_status: unknown
review_loop_state: unknown
archive_eligibility: unknown
review_integrity: unknown
motifs: []
archive_use: []
```

Process integrity:

```yaml
process_integrity:
  design_packet: missing
  tool_evidence: missing
  evidence_reviewer_artifact: missing
  puzzle_critic_artifact: missing
  designer_actions_after_review: missing
  post_revision_evidence_rerun: not_needed
  latest_review_iteration: null
  latest_candidate_version_reviewed: null
  open_required_action_after_latest_review: unknown
  designer_action_after_latest_review: missing | present | not_needed
  review_after_designer_action: missing | present | blocked | not_needed
  review_integrity: missing
  review_loop_state: unknown
  unresolved_core_attacks: []
  archive_eligibility: raw_run_only
  notes: ""
```

## Experiment Brief

Paste or link the experiment brief here.

## Layout

Solve instance:

```yaml
player_start: null
player_goal: null
win_condition: null
```

Layout:

```text
PASTE_LAYOUT_HERE
```

## Designer Claim

Player insight:

```text
玩家必须理解什么。不要写事件序列。
```

Causal chain:

```text
1. ...
2. ...
3. ...
```

Why this is not execution:

```text
说明为什么玩家不能只靠最近可操作物、顺序执行、走廊推进或重复同一操作过关。
这是可被 critic 攻击的设计辩护，不是口号。
```

Falsification:

```text
什么证据、玩家读法、反事实或 critic 攻击会把这个 claim 降级为 witness、
simple application、held material 或 reject。
```

Claimed highlights:

```text
- ...
```

Known risks:

```text
- ...
```

## Exploration Log

探索记录不是质量证明，也不使用硬性 family / variant / critic 数量。它只记录有
代表性的结构方向、局部修补、失败原因和为什么当前候选值得进入 review loop。
除非人类请求或实验 brief 明确授权，候选不得作为已有 archive candidate 的变体
进入 proposal 流程。

```yaml
exploration_goal: null
quality_guard: critic_loop
attempt_log_status: unknown
run_level_log_ref: null
status_rationale: ""
```

如果本轮有 run-level exploration log，本节只保存与该候选相关的 attempts，并在
`run_level_log_ref` 或 `status_rationale` 中说明关系。

尝试记录：

```yaml
attempts:
  - attempt_id: A001
    family_iteration: F001
    hypothesis_family: ""
    why_not_archive_variant: ""
    candidate_or_sketch_ref: ""
    structural_delta: ""
    intended_player_logic: ""
    expected_core_responsibility: ""
    validation_summary: ""
    critic_or_self_attack: ""
    repair_or_abandon_reason: ""
    evidence_refs: []
```

进入证据流程的候选：

```text
说明为什么是这个候选，而不是被放弃的草图，进入工具证据和 review loop。
```

放弃或暂存的草图：

```text
- ...
```

## Tool Evidence

Commands:

```text
PASTE_COMMANDS_HERE
```

Summary:

```text
PASTE_SOLVER_ANALYZER_SUMMARY_HERE
```

Report refs:

```text
- ...
```

## Start Position Refinement

Required for application / challenge candidates. If not applicable, explain why.

Chosen start:

```yaml
player_start: null
reason: PASTE_REASON_HERE
```

Candidate starts considered:

```yaml
starts:
  - player_start: null
    legal: true
    shortest_solution_delta: unknown
    initial_scc_size: unknown
    initial_exit_source_distances: unknown
    initial_win_exit_source_distances: unknown
    dead_exits_before_first_win_exit: unknown
    first_step_legal_events: []
    core_chain_preserved: unknown
    notes: ""
```

Comparison summary:

```text
Explain why the chosen start best fits the candidate's intended role, opening
comfort, reading order, and core causal chain. If the start remains narrow or
forced, record that as a caveat.
```

## 原型专属工作记录

如果原型没有声明专属工作，本节标记为 not_applicable。不要默认填写
meta-interface、重访、大地图接口或跨关入口字段。

Work summary：

```yaml
work_name: not_applicable
work_kind: diagnostic | redesign_stage | not_applicable
applicability: not_applicable
authority_refs: []
classification: not_applicable
evidence_refs: []
risks: []
```

如果原型文档明确声明 meta-interface / meta-reinterpretation 是本原型
redesign_stage，可使用下面的记录格式；否则删除或保留为空。它记录的是基于
base candidate 的再设计提案，不是边缘枚举检查。

Redesign decision：

```yaml
base_candidate_status: solid | promising | weak | rejected | unknown
redesign_decision: skipped_no_base | skipped_no_opportunity | attempted | recommended
reason: ""
```

Base instance：

```yaml
start: null
goal: null
causal_chain: ""
evidence_refs: []
```

Meta instance：

```yaml
start: null
goal: null
knowledge_scope: unknown
causal_chain: ""
evidence_refs: []
```

Chain delta from base：

```text
说明 meta instance 如何把同一结构读成不同解法。如果差异只是“入口不同”或
“出口不同”，应标记为 interface_clone。
```

Shared structure：

```text
- ...
```

Latent elements from base：

```yaml
latent_elements:
  - element: ""
    base_reading: unused | weak_role | impossible_now | incidental | other
    meta_payoff: ""
    risk_if_no_payoff: ""
```

Non-target pairs：

```yaml
non_target_pairs:
  - pair: ""
    result: unknown | unsolved | solved
    risk: none | steals_reading | bypasses_base | confusing | other
    notes: ""
```

Classification：

```yaml
meta_classification: not_applicable
allowed_values:
  - meaningful_reinterpretation
  - interface_clone
  - connectivity_note_only
  - bypass_risk
  - not_applicable
```

## Evidence Reviewer Artifact

如果不适用，说明原因。designer self-review 不能填在这里冒充 reviewer。

```yaml
reviewer_role: evidence_reviewer
artifact_status: missing | present | blocked | not_applicable
context_packet_ref: null
allowed_evidence_sources: []
review_iteration: null
candidate_version_reviewed: null
review_input_type: candidate_version | evidence_disagreement | revised_claim | other
verdict: unknown
review_loop_state: unknown
required_action: none | evidence_disagreement_for_next_review | structural_revision | downgrade_or_hold | reject_or_change_family | unknown
```

Result:

```text
- ...
```

## Puzzle Critic Artifact

如果无法产生独立 critic artifact，标记为 missing / blocked。designer
self-attack 可以记录在设计搜索账本或 known risks 中，但不能满足本节。

```yaml
critic_role: puzzle_design_critic
artifact_status: missing | present | blocked | not_applicable
context_packet_ref: null
allowed_evidence_sources: []
review_iteration: null
candidate_version_reviewed: null
review_input_type: candidate_version | evidence_disagreement | revised_claim | other
verdict: unknown
review_loop_state: unknown
required_action: none | evidence_disagreement_for_next_review | structural_revision | downgrade_or_hold | reject_or_change_family | unknown
```

Attacks:

```text
- ...
```

## Review Iterations

记录每一轮 review 和随后的 designer action。`designer_action_N` 不是终态；
若还要推进候选，必须进入 `review_N+1`。

```yaml
review_iterations:
  - review_iteration: 1
    candidate_version_reviewed: v1
    review_input_type: candidate_version | evidence_disagreement | revised_claim | other
    reviewer_artifact_ref: null
    critic_artifact_ref: null
    review_loop_state: unknown
    required_action: none | evidence_disagreement_for_next_review | structural_revision | downgrade_or_hold | reject_or_change_family | unknown
    open_core_attacks: []
    designer_action:
      action_type: revise_structure | revise_claim | evidence_disagreement_for_next_review | downgrade_or_hold | reject_or_change_family | failed_search | unresolved
      evidence_or_attempt_refs: []
      produces_candidate_version: null
      produces_evidence_disagreement_packet: null
      goes_to_review_iteration: null
      result: ""
```

## Review Loop Closure

```yaml
review_loop_state: unknown
required_next_action: unknown
unresolved_core_attacks: []
latest_review_iteration: null
latest_candidate_version_reviewed: null
latest_review_required_action: unknown
designer_action_after_latest_review: missing | present | not_needed
review_after_designer_action: missing | present | blocked | not_needed
evidence_rerun_after_revision: not_needed
terminal_state_reason: ""
```

## Human Comments

Keep these verbatim.

```yaml
comments:
  - id: HC_001
    author: human_designer
    attached_to:
      - candidate
    text: >
      PASTE_HUMAN_COMMENT_HERE
```

## Archive Pass Derived Metadata

Derived summary:

```text
PASTE_DERIVED_SUMMARY_HERE
```

Derived tags:

```yaml
status: unknown
review_loop_state: unknown
archive_eligibility: unknown
review_integrity: unknown
motifs: []
archive_use: []
strengths: []
failure_modes: []
critic_calibration: []
designer_calibration: []
human_taste_signals: []
```

Retrieval summary:

```text
PASTE_RETRIEVAL_SUMMARY_HERE
```

Unresolved archive questions:

```text
- ...
```
