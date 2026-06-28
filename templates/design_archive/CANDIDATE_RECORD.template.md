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
  designer_response_to_review: missing
  post_revision_evidence_rerun: not_needed
  review_integrity: missing
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

One sentence:

```text
PASTE_CLAIM_HERE
```

Causal chain:

```text
1. ...
2. ...
3. ...
```

Claimed highlights:

```text
- ...
```

Known risks:

```text
- ...
```

## 设计搜索账本

搜索预算：

```yaml
scope: null
budget_owner: null
goal: null
hypothesis_family_min: null
variant_per_family_min: null
repair_round_min: null
evidence_gate_candidates_min: null
stop_conditions: []
exploration_axes: []
```

账本状态：

```yaml
search_ledger_status: unknown
run_level_search_ref: null
status_rationale: ""
```

如果 `scope: experiment_run`，本节保存与该候选相关的 attempts，并在
`run_level_search_ref` 或 `status_rationale` 中说明整轮搜索覆盖结论。

尝试记录：

```yaml
attempts:
  - attempt_id: A001
    hypothesis_family: ""
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
说明为什么是这个候选，而不是被放弃的草图，进入工具证据和 critic gates。
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

## 原型专属扩展记录

如果原型没有声明专属扩展，本节标记为 not_applicable。不要默认填写
meta-interface、重访、大地图接口或跨关入口字段。

Extension summary：

```yaml
extension_name: not_applicable
applicability: not_applicable
authority_refs: []
classification: not_applicable
evidence_refs: []
risks: []
```

如果原型文档明确声明 meta-interface / meta-reinterpretation 是本原型扩展，可
使用下面的记录格式；否则删除或保留为空。

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
verdict: unknown
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
verdict: unknown
```

Attacks:

```text
- ...
```

## Designer Response

```text
- ...
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
