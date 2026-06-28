# Document Map And Archive Plan

Status: current documentation governance map.

本文档的目标是把项目文档分清楚，避免三类材料互相污染：

```text
archive / casebook:
  旧 pull_portal_fallback 原型能力测试、中间尝试、实现日志、失败记录、原始报告。

active validation standard:
  当前实际可执行、仍需要继续测试和优化的设计 / 审查 / 验证流程。

generalized capability standard:
  面向未来 Codex skill、prompt、代码模板和新机制实现的稳定规则与模板。
```

原则：

- 未来新机制的 blind test 不应读取 `pull_portal_fallback` 的设计报告、历史关卡、旧课程或 casebook。
- 只有已经沉淀成机制无关 guardrail 的经验才进入通用文档。
- 例子可以来自旧原型，但例子不等于规范；进入 skill/prompt 前应改成占位符或新机制本地例子。
- 新机制 runtime / tools bring-up 可以临时跳过 knowledge，但必须保留 adapter、tool contract、conformance 和 unavailable 标记。

## Recommended Entry Points

### New Mechanic Runtime And Tools

用于“拿到新机制后，先实现 runtime + designer 工具，跳过 knowledge 流程做直接测试”：

```text
README.md
docs/09-agent-preflight.md
docs/28-mechanic-disambiguation-and-ascii-probes.md
docs/24-runtime-adapter-boundary.md
docs/25-new-mechanic-implementation-playbook.md
docs/26-tool-contracts-and-conformance.md
templates/new_mechanic/README.md
templates/new_mechanic/PREFLIGHT_PROMPT.md
templates/new_mechanic/PROMPT.md
```

进入具体关卡设计后再读：

```text
docs/21-current-workflow-standard.md
docs/20-multi-agent-prompt-templates.md
docs/18-validated-level-design-loop.md, as detailed support only
```

### Future Full Skill With Knowledge Restored

用于未来把机制 -> 玩家模型 -> 课程 -> level specs -> 候选设计完整链路恢复并 skill 化：

```text
docs/09-agent-preflight.md
docs/28-mechanic-disambiguation-and-ascii-probes.md
docs/02-mechanic-ir.md
docs/19-multi-instance-object-model.md
docs/12-player-model-ontology.md
docs/13-player-model-derivation.md
docs/14-curriculum-ordering.md
docs/15-level-spec-contract.md
docs/10-generic-solver-evaluator-contract.md
docs/21-current-workflow-standard.md
docs/20-multi-agent-prompt-templates.md
docs/24-runtime-adapter-boundary.md
docs/25-new-mechanic-implementation-playbook.md
docs/26-tool-contracts-and-conformance.md
```

### Pull-Portal Casebook / Regression Memory

只用于理解旧原型、校准反模式、查证历史结论：

```text
docs/07-implementation-notes.md
docs/23-pull-portal-casebook-and-tool-notes.md
prototypes/pull_portal_fallback/reports/README.md
prototypes/pull_portal_fallback/reports/*
```

不要把这些作为新机制设计 prompt 的默认上下文。

## Document Classification

| Path | Current Role | Category | Action |
| --- | --- | --- | --- |
| `docs/00-prototype-package.md` | 原型包文件职责。 | generalized capability standard | 保留；示例路径应理解为示例，不是新机制默认值。 |
| `docs/01-engine-and-scope.md` | 项目定位与引擎边界。 | generalized capability standard | 保留；适合作为 skill 背景。 |
| `docs/02-mechanic-ir.md` | 机制 IR 结构。 | generalized capability standard | 保留；后续把 pull-portal 示例替换为占位或多机制示例。 |
| `docs/03-knowledge-curriculum.md` | 早期 knowledge / curriculum v1 模型。 | archive / extract | 不作为新 skill 入口；有价值内容应合并进 12-15 后归档。 |
| `docs/04-solver-evaluator.md` | 求解器、状态图、评估器基础。 | generalized capability standard | 保留；与 10/26 有重复，后续可合并为 solver/evaluator 标准。 |
| `docs/05-level-generation-loop.md` | 历史生成器视角。 | archive / casebook | 已标注 historical；只保留词汇和成本直觉，当前流程以 21 为准。 |
| `docs/06-mvp-roadmap.md` | MVP 历史路线图。 | archive / casebook | 归档；不作为当前实现计划。 |
| `docs/07-implementation-notes.md` | pull-portal 实现日志和真实开发记录。 | archive / casebook | 归档；只作历史查证，不进入新机制 prompt。 |
| `docs/08-requirements-decisions.md` | 需求决策与 preflight 清单来源。 | active validation support | 保留；可并入 09 或 future skill preflight。 |
| `docs/09-agent-preflight.md` | 机制确认前置流程。 | generalized capability standard | 保留；新机制 prompt 必读。 |
| `docs/10-generic-solver-evaluator-contract.md` | runtime/solver/evaluator 通用契约。 | generalized capability standard | 保留；新机制 runtime 工具必读。 |
| `docs/11-design-consensus-and-skill-notes.md` | 设计共识与未来 skill 素材池。 | generalized capability support | 保留为素材池；不直接等同最终 skill。 |
| `docs/12-player-model-ontology.md` | 玩家模型轻量本体。 | generalized capability standard | 保留；knowledge 流程恢复时核心输入。 |
| `docs/13-player-model-derivation.md` | 从规则推导玩家模型。 | generalized capability standard | 保留；knowledge 流程恢复时核心输入。 |
| `docs/14-curriculum-ordering.md` | 课程排序规则。 | generalized capability standard | 保留；knowledge 流程恢复时核心输入。 |
| `docs/15-level-spec-contract.md` | curriculum 到 level specs 的契约。 | generalized capability standard | 保留；候选生成和验收连接层。 |
| `docs/16-candidate-generation-v2.md` | 第一版 seed factory / candidates_v2 工具切片。 | archive / extract | 保留 candidates_v2 契约价值；pull-portal seed 结构归档。 |
| `docs/17-causal-chain-level-design.md` | 因果链早期设计记忆。 | archive / support | 作为 18/21 的背景材料；不再作为流程入口。 |
| `docs/18-validated-level-design-loop.md` | 已验证设计循环的详细案例、反模式和 taste notes。 | active validation support | 保留；21 是入口，18 是详细支持和防漂移材料。 |
| `docs/19-multi-instance-object-model.md` | 多实例对象模型。 | generalized capability standard | 保留；新机制 adapter 和 analyzer 设计必读。 |
| `docs/20-multi-agent-prompt-templates.md` | 当前 multi-agent 审查 prompt 模板。 | active validation standard | 保留；未来可直接提取进 skill。 |
| `docs/21-current-workflow-standard.md` | 当前关卡设计与审查主流程。 | active validation standard | 保留；关卡 designer 测试入口。 |
| `docs/22-ruleset-to-seeds-and-slots-draft.md` | ruleset -> initial design plan 的盲测草案。 | draft / incubation | 暂不作为标准；需要用新机制 blind test 验证后再晋升。 |
| `docs/23-pull-portal-casebook-and-tool-notes.md` | pull-portal 专用 casebook 和工具路径。 | archive / casebook | 归档；明确排除 blind tests。 |
| `docs/24-runtime-adapter-boundary.md` | 当前 runtime adapter 工程边界。 | generalized capability standard | 保留；新机制实现必读。 |
| `docs/25-new-mechanic-implementation-playbook.md` | 新机制 runtime + tools bring-up 顺序。 | generalized capability standard | 保留；当前实现标准。 |
| `docs/26-tool-contracts-and-conformance.md` | 工具抽象、输出契约、conformance 方案。 | generalized capability standard | 保留；需要继续落地 schema 和 CLI。 |
| `docs/27-document-map-and-archive-plan.md` | 本文档。 | documentation governance | 保留；每次文档重组后更新。 |
| `docs/28-mechanic-disambiguation-and-ascii-probes.md` | 实现前机制语义确认和 ASCII probe 流程。 | generalized capability standard | 保留；新机制实现前必须先用它确认 runtime-critical 语义。 |

## Template And Prompt Surface

当前真正可执行的 prompt + 模板入口在：

```text
templates/new_mechanic/README.md
templates/new_mechanic/PREFLIGHT_PROMPT.md
templates/new_mechanic/PROMPT.md
templates/new_mechanic/src/*.template.ts
templates/new_mechanic/prototype/*.template.yml
templates/new_mechanic/conformance.template.md
```

它们属于 generalized capability implementation，而不是历史文档。下一步应围绕这些模板继续补：

```text
scaffold command:
  从 mechanic id 复制模板、替换占位符、生成 src/prototypes skeleton。

tool-conformance command:
  产出 reports/tool_conformance.md/json，证明 adapter 和工具输出可用。

schemas:
  layout_analysis_*.json
  temporary_seed_miner.json
  evaluation_v2 machine output
  audit.json
  playable manifest
  PuzzleScript check report
```

## Prototype Reports

`prototypes/pull_portal_fallback/reports/` 整体应视为 archive / casebook。

其中：

```text
reports/README.md
  已经是 archive index，可继续保留。

Current Process References
  可作为反模式校准、流程证据或 regression memory。
  不能作为新机制 prompt 的默认上下文。

Historical Or Negative Runs
  只作为失败模式和 anti-pattern。

Generated Snapshots
  是工具输出快照，不是流程标准。

Raw Analyzer Evidence
  只证明单个布局的分析结果，不证明关卡角色、质量或 campaign placement。
```

未来如果物理归档，建议先移动到：

```text
docs/archive/pull_portal_casebook/
docs/archive/mvp_history/
docs/incubation/
```

但在移动前应先更新所有链接。当前阶段先用本文档固定语义边界，不立即搬文件。

## Practical Cleanup Order

推荐后续整理顺序：

1. 把 README 的文档索引改成“入口路径”，而不是枚举所有历史文件。
2. 将 03/04/12/13/14/15 的 knowledge/player-model 关系去重，形成未来 skill 的最小输入集。
3. 从 16 提取 `CandidateLevelV2` 与 seed factory contract 到 26 和模板，剩余 pull-portal seed 结构归档。
4. 从 18 提取机制无关 guardrails 到 21/20，保留 pull-portal 案例在 casebook。
5. 用一个新机制 blind test 验证 22；通过后再决定是否晋升为 upstream design-plan 标准。
6. 实现 `tool-conformance` 和 scaffold command，使 25/26/templates 从文档标准变成可运行标准。
