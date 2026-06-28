# Design Archive Contract

状态：当前设计归档合约。本文只定义 clean archive 的入档边界、候选记录
完整性、人类评语和检索元数据；不定义关卡设计流程。

## 权威边界

本文不是 designer / critic workflow。

```text
单关设计、证据读取、reviewer outer loop、critic 攻击和 designer 答辩：
  以 docs/21-current-workflow-standard.md 为准。

multi-agent / reviewer prompt 形状：
  以 docs/20-multi-agent-prompt-templates.md 为准。

归档层：
  本文只决定记录是否能进入 clean archive，以及如何保存人类评语和检索元数据。
```

如果本文和 `docs/21` / `docs/20` 对设计或审查流程的要求冲突，按
`docs/21` / `docs/20` 执行。归档层不得把缺失的设计、证据或审查流程补写成
已完成。

## 核心概念

```text
clean archive:
  可被未来 designer / critic 当作正例、反例、审美校准或批评校准的候选库。
  其中可以有设计差的关卡，但不能有流程错产物。

raw run:
  实验过程材料、scratch 尝试、未完成执行、流程错产物或不可复现输出。
  raw run 可以临时留在工作区或单独保存，但不能作为 clean archive 条目被检索
  为设计参考。

candidate record:
  候选的事实来源。layout、solve instance、designer claim、工具证据、review
  artifact、designer response、人类评语和派生元数据都应直接或间接指向它。

archive index:
  检索层。它只能摘要 candidate record，不是事实来源。

archive pass:
  归档落盘步骤。它可以由 controller、LLM designer、人类或脚本执行，但权限
  只限 formatting_and_integrity，不是新的 reviewer、critic 或 judge。
```

不要再引入独立归档模型或归档设计角色。实践中通常由当前 LLM designer /
controller 在完成设计和审查后执行 archive pass。

## Archive Pass 权限

archive pass 可以：

```text
- 检查 candidate record 是否有必要 artifact。
- 保存或整理已有 designer claim、tool evidence、reviewer result、
  critic result、designer response 和 human comments。
- 派生检索标签、retrieval summary 和完整性状态。
- 在流程缺失时降级 archive_eligibility，或拒绝进入 clean archive。
```

archive pass 不可以：

```text
- 补写 critic 或 evidence reviewer。
- 把 self-review 当成 independent review。
- 修改 designer claim 让候选显得更好。
- 根据自己的审美提升 status。
- 用派生摘要覆盖人类评语。
- 把缺失证据、浅搜索、缺 review 的候选包装成 positive reference。
```

## Process Integrity

每个候选进入 clean archive 前，必须有可检查的流程完整性记录：

```yaml
process_integrity:
  design_packet: present | missing
  tool_evidence: present | missing | incomplete | not_applicable
  evidence_reviewer_artifact: present | missing | blocked | not_applicable
  puzzle_critic_artifact: present | missing | blocked | not_applicable
  designer_response_to_review: present | missing | not_needed
  post_revision_evidence_rerun: present | missing | not_needed
  review_integrity: independent_review | human_review | self_review_only | missing | blocked
  archive_eligibility: clean_archive | human_pending | raw_run_only | reject_do_not_archive
  notes: ""
```

`review_integrity` 按 artifact 和 pass 边界判断，不按底层模型名称判断。

```text
independent_review:
  有独立 reviewer / critic artifact。reviewer 接收 candidate packet 和证据，
  输出审查结果；designer 随后逐条回应。

human_review:
  人类设计师直接给出足以替代 reviewer / critic 的审查意见。

self_review_only:
  designer 在同一设计 pass 中写了自我攻击、自我总结或 caveat。它有记录价值，
  但不能满足 critic gate。

missing:
  没有可检查的 review artifact。

blocked:
  controller / designer 认为无法调用独立 reviewer，或授权不清。必须显式记录
  blocked，不得降级解释成“主线程多角色 critic 已完成”。
```

如果候选在 review 后被修改，必须按 `docs/21` 回到必要的 evidence gate。没有
重新验证的修改不能继承旧工具证据和旧 critic 结论。

## Archive Eligibility

归档 eligibility 是流程完整性判断，不是关卡质量评分。

```text
clean_archive:
  流程 artifact 足够完整，可作为未来设计参考。候选可以是 accepted、held、
  rejected 或 negative example。

human_pending:
  流程 artifact 足够完整，但还没有人类评语。可以入档，但必须标记人类评语
  为空，不得把 LLM 派生评价当成人类审美来源。

raw_run_only:
  有过程记录价值，但缺少 clean archive 必需 artifact，例如 self_review_only、
  evidence incomplete、search ledger shallow、review blocked 等。

reject_do_not_archive:
  流程错产物、误标 positive reference、证据不可复现、candidate record 与实际
  输出不一致，或人类明确要求清理。应删除或移出 clean archive。
```

硬性限制：

```text
- review_integrity 为 self_review_only、missing 或 blocked 时，不能标记
  positive_reference、reference、accepted 或 valid_candidate_after_search。
- tool_evidence 为 missing / incomplete 且候选声称通过工具验证时，不能进入
  clean_archive。
- search ledger 缺失或浅时，只能降低结论强度；不能声称已充分探索设计空间。
- archive index 不能把 candidate record 中没有被证据或 review 支持的亮点写成
  检索摘要。
```

## Candidate Record 最小内容

候选记录应包含：

```text
- experiment brief 引用
- layout 和 solve instance
- designer claim、causal chain、claimed highlights、known risks
- design search ledger 或候选相关 ledger slice
- tool commands、evidence summary、report refs
- evidence reviewer artifact，若适用
- puzzle critic artifact，若适用
- designer response to review
- start-position refinement，若角色需要
- prototype-specific extension record，若原型或 brief 明确要求
- process_integrity
- human comments，原文保存
- archive pass derived metadata
```

candidate record 是事实来源。archive index 只保存导航摘要和路径。

## Human Comments

人类评语是归档中的最高审美来源。它可以是自由文本，不要求打分。

```yaml
human_comments:
  - id: HC_001
    author: human_designer
    text: >
      原文保留。
    attached_to:
      - candidate
      - designer_claim
      - critic_attack
      - tool_evidence
```

archive pass 可以从人类评语派生标签，但必须标记为 derived。若派生摘要和人类
原文存在张力，保留张力，不要改写人类评语。

## Derived Metadata

派生元数据只用于检索和 prompt 校准，不是最终审美裁决。

```yaml
archive_pass_derived:
  status: unknown
  archive_use: []
  motifs: []
  strengths: []
  failure_modes: []
  critic_calibration: []
  designer_calibration: []
  human_taste_signals: []
  retrieval_summary: ""
```

派生摘要不得升级 designer claim。若 review artifacts 没有证明某个 claimed
highlight，metadata 应标记为 unverified、claim_underfit 或相关 failure mode。

## Clean Archive 与 Raw Run 的清理

clean archive 必须保持干净。流程错产物不应为了“留下负例”而进入候选库；负例
也必须是流程完整的负例。

可以清理的情况：

```text
- self-review 被误写成 critic review。
- candidate record 标记 positive_reference，但缺独立 review artifact。
- 工具证据来自旧实例，候选修改后没有重跑。
- archive index 摘要和 candidate record / human comments 冲突。
- 人类明确指出该记录来自错误流程，不应作为审美或设计样本。
```

清理可以删除文件，也可以移到不被未来 designer / critic 默认检索的 raw run
位置。若只是设计质量差但流程完整，应保留为 rejected / negative_example，而
不是删除。

## 推荐路径

原型本地 clean archive：

```text
prototypes/<mechanic_id>/design_archive/
  README.md
  index.yml
  experiments/
  candidates/
```

可复用模板：

```text
templates/design_archive/
```
