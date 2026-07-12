# Evidence Reviewer Template

## 任务

判断已提供证据是否支持 candidate packet 设计说明中的机械前提、机制范围和硬声明。不要评价好玩、审美、难度目标、玩家问题显著性或 campaign placement。

## 检查项

- `claimed_core_events` 是否被 trace events / object facts 支持。
- Winning-path event gate 与 reachable exposure gate 是否分清。
- 如果 packet / brief 声明 `allowed_exposure_through` 或机制暴露窗口，是否使用 prototype `mechanic_exposure_sequence.yml` 或 packet 提供的等价 sequence：later events 需要由完整 reachable scan 排除；claimed latest exposed event 需要由 all-solution required gate 证明在所有胜利路径中必经。缺少完整 reachable scan、缺少 all-solution gate，或存在 missing-required winning path 时，结论为 `unknown` 或 `does_not_support_claim`。
- 若 `allowed_exposure_through` 指向的末端 stage 没有 `new_events`，是否从该 stage 向前选择最后一个 `new_events` 非空的 stage，并将其中由 candidate 声明且经 all-solution required gate 支持的 event 作为 claimed latest exposed event。
- 当 `player_reasoning` 包含两个或更多 reasoning units 时，同一个 claimed latest exposed event 是否还在 canonical optimal trace 中至少有一次 occurrence 落入支持第二个或更后 reasoning unit 的 operation segment；若全部 occurrence 都只落入第一个 reasoning unit，写入 `unsupported_or_overclaimed` 并输出 `does_not_support_claim`。真正的单 reasoning unit 与 `simple_level_design` 为 `not_applicable`。
- 是否独立复核 candidate 的 `latest_exposure_timing_check`，而非采信 designer 自填的 stage、event、occurrence 或 status。时序门失败时，`unsupported_or_overclaimed.issue` 是否写明派生出的 latest event stage、claimed latest exposed event、canonical optimal trace 中的全部 occurrence steps、各 step 映射到的 reasoning unit，以及 `required_but_frontloaded` 结论；不得只写“发生过早”或“时序不满足”。
- `supports_with_caveats` 不得保留不被证据支持的 central mechanism / exposure claim；这类问题必须要求 revise claim、补证据或 reject/change family。
- `forbidden_if_seen_anywhere` 是否依赖完整可达扫描；扫描未完成则为 `unknown`。
- Event pattern、event instance、object participation、per-object necessity 是否混淆。
- Returned trace 是否被误写成 all-solution / complete graph 证明。
- Graph exhausted 时，依赖完整图的 claim 是否降级为 `unknown`；
  `unique_within_budget` 只表示声明预算内的送审资格，不得冒充完整图结论。
- `solution_uniqueness.result` 是否严格属于 `unique_complete`、
  `unique_within_budget`、`equivalent_variants_only`。
- 该结果是否与引用的完整图、预算搜索、换序等价证据或已知 exact bypass 明显
  冲突。Reviewer 不重跑工具、不枚举解族，也不继续寻找更多 bypass。
- 非法值、缺失引用或明显证据冲突必须写入 `unsupported_or_overclaimed`，输出
  `does_not_support_claim` 且 `required_action` 不能为 `none`；不得降级为
  `supports_with_caveats` 或 `unknown`。
- `simple_level_design` 的目标状态、canonical operation、机制反馈和完成反馈是否与 exact trace 一致。
- `player_reasoning` 的 state / input / trace 引用、operation segments、`replayed_attempt` 的非空输入、结果状态、`concrete_outcome` 与 trace partition 是否机械成立。
- Tool evidence 是否被过度解释为玩家推理价值或 puzzle quality。
- `calibrated_trace_metrics` 是否被错误当作 evidence：它只供 puzzle critic 阅读，evidence reviewer 不评价其权重、分数或审美含义。

## 输出

```yaml
review_iteration:
candidate_version_reviewed:
review_input_type: candidate_version | evidence_disagreement | revised_design | other
verdict: supports_claim | supports_with_caveats | does_not_support_claim | unknown
review_loop_state: proposal_ready | proposal_ready_with_caveats | revise_required | held_proposal | rejected_candidate
required_action: none | evidence_disagreement_for_next_review | structural_revision | downgrade_or_hold | reject_or_change_family
supported_claims:
  - target_ref:
    evidence_basis:
unsupported_or_overclaimed:
  - target_ref:
    issue:
evidence_limits:
questions_for_designer:
```

如果 `required_action` 不是 `none`，`review_loop_state` 不能是 `proposal_ready` 或 `proposal_ready_with_caveats`。
