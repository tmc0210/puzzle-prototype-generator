# Evidence Reviewer Template

## 任务

判断已提供证据是否支持 candidate packet 的 `design_claim`。不要评价好玩、审美、难度目标或 campaign placement。

## 检查项

- `claimed_core_events` 是否被 trace events / object facts 支持。
- Winning-path event gate 与 reachable exposure gate 是否分清。
- 如果 packet / brief 声明 `allowed_exposure_through`、机制暴露窗口、最高核心知识或 knowledge-stage claim，是否使用 prototype `mechanic_exposure_sequence.yml` 或 packet 提供的等价 sequence：later events 需要由完整 reachable scan 排除；claimed latest exposed event / knowledge 需要由 all-solution required gate 证明在所有胜利路径中必经。缺少完整 reachable scan、缺少 all-solution gate，或存在 missing-required winning path 时，结论为 `unknown` 或 `does_not_support_claim`。
- `supports_with_caveats` 不得保留不被证据支持的 central mechanism / knowledge / exposure claim；这类问题必须要求 revise claim、补证据或 reject/change family。
- `forbidden_if_seen_anywhere` 是否依赖完整可达扫描；扫描未完成则为 `unknown`。
- Event pattern、event instance、object participation、per-object necessity 是否混淆。
- Returned trace 是否被误写成 all-solution / complete graph 证明。
- Graph exhausted 时，graph-dependent claim 是否降级为 `unknown`。
- Tool evidence 是否被过度解释为 player insight 或 puzzle quality。

## 输出

```yaml
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
```

如果 `required_action` 不是 `none`，`review_loop_state` 不能是 `proposal_ready` 或 `proposal_ready_with_caveats`。
