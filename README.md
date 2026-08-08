# Sokoban-like Logic Puzzle R&D

本项目研究并建设可泛化的类推箱子逻辑解谜能力，覆盖机制语义落地、原型运行时、求解与机械分析、关卡设计、独立审查以及试玩交付。

仓库由共享基础设施、多个机制原型和面向 agent 的设计工具组成。不同分支与原型的成熟度并不相同；具体规则、工具能力和设计状态以对应原型目录中的文档为准。

## 仓库索引

| 路径 | 内容 |
| --- | --- |
| `src/core/` | 与具体机制无关的运行时接口、求解与分析基础能力 |
| `src/prototypes/` | 各原型的机制实现、runtime adapter 与专属工具 |
| `src/playable/`、`src/web/` | runtime-backed 网页试玩与编辑器 |
| `prototypes/<mechanic_id>/` | 原型规则包、关卡数据、设计交接、报告与试玩产物 |
| `.agents/skills/` | 当前分支提供的关卡设计、局部机制探索和独立审查 skills |
| `docs/` | 通用能力规范、当前执行标准与历史 casebook |
| `templates/` | 新机制接入与设计归档模板 |
| `schemas/` | 结构化数据 schema |

## 从哪里开始

开始任务前先读取 [AGENTS.md](AGENTS.md)，明确本轮是在实现特定原型、设计特定原型关卡，还是修改泛化能力。

### 新机制或原型实现

- [Agent Preflight](docs/09-agent-preflight.md)
- [机制语义确认与 ASCII Probe](docs/28-mechanic-disambiguation-and-ascii-probes.md)
- [Runtime Adapter 边界](docs/24-runtime-adapter-boundary.md)
- [新机制实现 Playbook](docs/25-new-mechanic-implementation-playbook.md)
- [工具契约与 Conformance](docs/26-tool-contracts-and-conformance.md)
- [新机制模板](templates/new_mechanic/README.md)

### 特定原型的关卡设计

读取当前分支的 `.agents/skills/`、对应原型的 `README.md`、规则文档与 `docs/design_handoff.yml`。提供当前工作室 skills 的分支中，完整单关设计统一从 `$sokoban-level-design-studio` 启动；其它角色 skills 不作为端到端入口。

### 查阅项目文档

- [文档地图与归档计划](docs/27-document-map-and-archive-plan.md)
- `docs/` 中的通用规范与当前执行标准
- `prototypes/<mechanic_id>/reports/` 中的原型证据和历史产物

历史报告、旧候选和 casebook 用于查证与回归，不代表当前通用流程。原型 runtime 是机械事实权威；工具证据不替代玩家侧设计判断和人类试玩。

## 基础检查

```text
npm install
npm run check
```

其它命令以当前分支的 `package.json` 和对应原型文档为准。
