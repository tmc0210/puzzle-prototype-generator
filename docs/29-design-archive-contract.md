# Design Archive Contract

状态：当前 clean archive 合约。本文只定义归档入口、候选短卡、人类评语和
检索索引；不定义单关创作或作品集流程。

## 权威边界

```text
玩家体验核心、作品身份、baseline、探索分支与人类作品集：
  以 docs/17-experience-core-level-design.md 和 docs/21-level-design-studio-standard.md 为准。

工作室材料与可选硬证据核验形状：
  以 docs/20-level-design-studio-templates.md 为准。

归档层：
  本文只决定哪些材料能进入 clean archive，以及如何用短卡保存人评和检索信息。
```

archive pass 只记录人类已经作出的选择。它不能补写缺失流程，不能把工具事实
改写成审美裁决，也不能替人类打分。

人类试玩状态以 `playtest_reviews.yml` 为准：普通 archive pass 只接收
`ready_for_archive` 的 exact version。`defer` 与 `needs_revision` 不入档；`reject`
只有在人类明确要求保存为负向反例时才可入档，不能由 LLM 自行升级为归档材料。

## Clean Archive 与 Raw Run

```text
clean archive:
  可被未来 designer 当作正例、反例、审美校准或重复边界的候选库。
  其中可以有设计差的关卡，但不能有流程错产物。

raw run:
  实验过程材料、scratch 尝试、未完成执行、流程错产物或可再生工具输出。
  raw run 不进入 clean archive，不作为 human taste calibration。

candidate record:
  候选的短审美校准卡。它保存必要 metadata、layout、核心逻辑、人类评语、
  人类校准分和短检索摘要。

archive index:
  导航层。它只保存路径、状态、分数、标签化检索线索和 retrieval summary；
  candidate record 与人类评语才是归档事实来源。
```

清理 raw run 时只有保留和删除两种选择。不要创建隐藏历史归档、兼容副本或
shadow archive。生成式 reports、旧 run、trace、probe 结果和过程日志默认可
删除或重新生成。

默认排除路径：

```text
prototypes/*/reports/**/*.md
prototypes/*/reports/**/*.json
prototypes/*/reports/**/*.txt
prototypes/*/mechanism_lab/runs/**
```

## 默认读取路径

designer 需要归档校准时，默认先读 archive index 的检索摘要，再按目标
读取少量候选短卡。不要默认全量读取所有 layout、旧 reports 或 mechanism lab
runs。

普通设计校准建议：

```text
- 先读 index。
- 选 1-2 个相关高分 / 正例候选。
- 选 1-2 个相关低分 / 失败 / 下界候选。
- 只有需要防重复或判断人评边界时，才读候选卡里的完整 layout。
```

## Candidate Record 最小内容

候选记录是短卡，不是流程审计报告。默认字段：

```yaml
candidate_id: CANDIDATE_ID
prototype: MECHANIC_ID
source_candidate_version: null
status: unknown
human_final_status: pending
archive_eligibility: human_pending
human_reviewed: false
aesthetic_score: null
difficulty_score: null
allowed_exposure_through: null
human_comment_ids: []
ledger_ref: null
```

主体只保留这些 section：

```text
Layout
Core Logic
Human Verdict
Human Calibration
Retrieval Summary
```

`Core Logic` 写 3-5 行事实链：玩家侧洞见、关键对象关系、反直觉点或失败边界。
它不是证据全文，也不是 designer 的审美作文。

`Retrieval Summary` 写 2-5 行，只服务检索。它必须服从人类评语和人类评分，
不能扩写成新的审美课。

除上述最小字段和五个 section 外，过程材料默认不进入 candidate record：

```text
- 设计循环全文
- designer_action 流水账
- tool commands
- SCC / graph 表
- probe / trace / search report 全文
- algorithm metrics 和图指标
- 大型标签词表或实验目录
```

需要追溯时只保留一个 `ledger_ref`。如果没有稳定 ledger，就保持 `null`，不要
为了可追溯性把 reports 清单粘进短卡。

## Human Comments

人类评语是归档中的最高审美来源。它可以是自由文本，不要求打分。

```yaml
human_comments:
  - id: HC_001
    author: human_designer
    text: >
      原文保留。
```

archive pass 可以整理格式，但不得改写、扩写或替换人类原文。若 retrieval
summary 和人类原文存在张力，保留张力，以人类原文为准。

## Human Calibration

人类评分是审美与难度校准入口。它们是序数轴，不是工具分数，也不是 LLM 自评。

```yaml
human_calibration:
  human_reviewed: true | false
  aesthetic_score: 1 | 2 | 3 | 4 | 5 | null
  difficulty_score: 1 | 2 | 3 | 4 | 5 | null
  allowed_exposure_through: null
  score_source:
    - human_comment_id
```

审美分：

```text
1 反例样本：明显审美负例，例如冗余、拼接、洞见缺失或过度包装。
2 功能库存：流程完整但基本无审美价值；只在功能位、缓冲、水关时取材。
3 可用下界：常规备选；默认应继续优化。
4 亮点候选：有明确审美亮点或解谜洞见，值得学习。
5 标杆范例：模板级参考，具有很高审美校准价值。
```

难度分：

```text
1 教学见证：强引导玩家学习某机制事件或规则现象的最小结构。
2 简单练习：机制简单组合或练习关。
3 常规流程：有一定思考量但不多。
4 阶段挑战：流程中的较难关卡。
5 高难终局：适合支线、后期或终局内容。
```

`allowed_exposure_through` 记录候选允许暴露到的机制阶段。
它不是当前单个原型是否暂时使用该字段的问题；有值时必须保留。

没有人类评语或人类评分的候选不得作为 human taste calibration。标签、status
和 retrieval summary 只能帮助检索；真正的审美引用必须回到人类原文或评分字段。

## Archive Eligibility

```text
clean_archive:
  可作为未来设计参考。可以是正例、反例、held material 或 rejected material，
  但必须有人类评语或足够明确的 clean archive 接收理由。

human_pending:
  暂存候选。可以有结构价值，但没有人类评语时不得作为审美校准来源。

raw_run_only:
  只保留过程价值，不进入 clean archive。默认不被 designer / critic 检索。

reject_do_not_archive:
  流程错产物、误标参考、证据不可复现、与实际输出不一致，或人类明确要求清理。
  应删除。
```

archive pass 可以降级或删除，但不能升级候选质量。缺 review、缺证据、浅搜索、
工具指标漂亮或 LLM 自评积极，都不能把候选变成 positive reference。

## Archive Index

index 只做导航，不做二级报告。推荐 entry：

```yaml
- candidate_id: CANDIDATE_ID
  file: candidates/CANDIDATE_ID.md
  source_candidate_version: null
  status: unknown
  human_final_status: pending
  archive_eligibility: human_pending
  human_reviewed: false
  aesthetic_score: null
  difficulty_score: null
  allowed_exposure_through: null
  motifs: []
  strengths: []
  failure_modes: []
  human_comment_ids: []
  retrieval_summary: >
    Short search summary. Human comments remain in the candidate file.
```

index 不保存：

```text
- 顶层大型标签词表
- 实验目录或 run catalog
- 证据文件清单
- 流程完整性大表
- generated report excerpts
```

## 推荐路径

```text
prototypes/<mechanic_id>/design_archive/
  README.md
  index.yml
  candidates/

templates/design_archive/
```
