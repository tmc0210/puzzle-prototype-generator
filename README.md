# Sokoban-Like Prototype Generator

本项目的目标不是制作某一款推箱子游戏，而是构建一个可复用的逻辑解谜原型生成系统。

设计者可以用自然语言描述一组机制，例如“玩家只能拉箱子，关卡中有成组传送门，传送门出口被堵时会推动入口传送门”。系统应辅助 Codex 将其转化为可玩的 PuzzleScript Next 原型、结构化机制说明、玩家模型、循序渐进关卡组、硬证据报告和待玩作品集。

## 核心循环

```text
机制想法
-> 机制 IR
-> 玩家模型
-> 学习目标排序
-> 课程规划 / 体验种子
-> 后台局部结构语料探索
-> 唯一单关候选
-> 每个 exact version 的独立硬证据与玩家侧质量门
-> 体验核心对齐与同候选修订
-> 原型专属提交前工作流
-> 待玩列表
-> 人类试玩取舍
-> PuzzleScript Next 导出
```

## 第一阶段 MVP

第一阶段先跑通一个小而完整的闭环：

1. 基于 PuzzleScript Next 的快速原型导出。
2. 基于机制 IR 的 step runtime 和求解器。
3. 基于机制分支、事件和反事实模型的玩家模型生成。
4. 基于学习目标排序的关卡规划和候选生成。
5. 使用求解器核验硬事实，由人类试玩选择递进关卡组。

## 基本原则

- 机制 IR 是机制真相，PuzzleScript Next 是试玩和分享输出。
- Codex/LLM 负责提出机制、命名知识、生成草案和解释报告。
- 求解器负责证明可解性、目标知识必要性和核心解结构。
- 工具只核验明确分析范围内的硬事实，不把指标或启发式结果伪装成审美判断。
- 第一阶段优先生成小而紧凑、可以完整分析的教学关和应用关。

## 文档索引

文档分三类维护，完整逐文件归属见：

- [文档地图与归档计划](docs/27-document-map-and-archive-plan.md)

三类边界：

- 通用能力规范：未来可抽象进 skill/plugin 的稳定规则。
- 当前验证标准：实际可执行、仍需继续测试优化的创作 / 硬证据 / 人类试玩流程。
- 归档 / casebook：MVP、`pull_portal_fallback`、旧尝试和中间实验记录。

不要把一次性迁移脚手架、旧格式兼容信息或错误尝试写进通用能力规范；只有已经收敛成 guardrail 的经验才进入通用文档。

常用入口：

- 新机制 runtime + tools bring-up: [Agent Preflight](docs/09-agent-preflight.md), [机制语义确认与 ASCII Probe](docs/28-mechanic-disambiguation-and-ascii-probes.md), [Runtime Adapter 边界](docs/24-runtime-adapter-boundary.md), [新机制实现 Playbook](docs/25-new-mechanic-implementation-playbook.md), [工具契约与 Conformance](docs/26-tool-contracts-and-conformance.md), [新机制 Prompt + 代码模板](templates/new_mechanic/README.md)
- 当前体验核心单关工作室: [玩家体验核心与单关包装方法论](docs/17-experience-core-level-design.md), [关卡设计工作室执行标准](docs/21-level-design-studio-standard.md), [模板索引](docs/20-level-design-studio-templates.md), [`$sokoban-level-design-studio`](.agents/skills/sokoban-level-design-studio/SKILL.md), [`$sokoban-level-designer`](.agents/skills/sokoban-level-designer/SKILL.md), [`$sokoban-mechanism-lab`](.agents/skills/sokoban-mechanism-lab/SKILL.md), [`$sokoban-evidence-reviewer`](.agents/skills/sokoban-evidence-reviewer/SKILL.md), [`$sokoban-puzzle-critic`](.agents/skills/sokoban-puzzle-critic/SKILL.md)
- 人类设计师参与的候选归档实验: [Design Archive Contract](docs/29-design-archive-contract.md), [Design Archive Templates](templates/design_archive/README.md)
- 未来 knowledge / curriculum skill 化: [机制 IR](docs/02-mechanic-ir.md), [多实例对象模型](docs/19-multi-instance-object-model.md), [玩家模型轻量本体](docs/12-player-model-ontology.md), [玩家模型推导流程](docs/13-player-model-derivation.md), [课程排序规范](docs/14-curriculum-ordering.md), [关卡规格契约](docs/15-level-spec-contract.md)
- pull-portal 归档 / casebook: [实现记录](docs/07-implementation-notes.md), [Pull Portal Casebook](docs/23-pull-portal-casebook-and-tool-notes.md), [reports index](prototypes/pull_portal_fallback/reports/README.md)

## 当前草案产物

- [mechanic schema](schemas/mechanic.schema.json)
- [knowledge schema](schemas/knowledge.schema.json)
- [player model schema](schemas/player_model.schema.json)
- [curriculum schema](schemas/curriculum.schema.json)
- [curriculum v2 schema](schemas/curriculum_v2.schema.json)
- [level specs v2 schema](schemas/level_specs_v2.schema.json)
- [levels schema](schemas/levels.schema.json)
- [pull_portal_fallback 示例包](prototypes/pull_portal_fallback/README.md)

## 当前可运行命令

```text
npm run inspect
npm run solve
npm run explain:level -- L20
npm run explain:layout -- path/to/layout.txt scratch
npm run evaluate
npm run evaluate:write
npm run audit
npm run audit:write
npm run curriculum:v2
npm run curriculum:v2:write
npm run level-specs:v2
npm run level-specs:v2:write
npm run playable:build
npm run playable:serve
npm run ps:export
npm run ps:check
npm run validate
```

本地 playable 默认构建 Reality Anchor，也可显式传入 prototype 路径：

```text
npm run playable:build
npm run playable:build -- prototypes/pull_portal_fallback
```

默认构建输出：

[prototypes/reality_anchor/playable/index.html](prototypes/reality_anchor/playable/index.html)

启动后访问：

```text
http://127.0.0.1:4173
```

PuzzleScript Next 导出：

[prototypes/pull_portal_fallback/game.ps](prototypes/pull_portal_fallback/game.ps)

当前 `pull_portal_fallback` 示例包包含 20 个 candidate fixture。它们可用于调试 runtime、solver、graph analyzer 和导出链路，但 certified curriculum coverage 仍是 0/9：只有 `accepted + evaluator pass + 玩家通关标准一致` 的关卡才会计入课程覆盖。

MVP gate 审计报告：

[prototypes/pull_portal_fallback/reports/audit.md](prototypes/pull_portal_fallback/reports/audit.md)

新版课程与关卡规格报告：

[prototypes/pull_portal_fallback/reports/curriculum_v2.md](prototypes/pull_portal_fallback/reports/curriculum_v2.md)

[prototypes/pull_portal_fallback/reports/level_specs_v2.md](prototypes/pull_portal_fallback/reports/level_specs_v2.md)
