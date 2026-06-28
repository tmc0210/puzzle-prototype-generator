# 项目范围与引擎选择

## 项目定位

本项目面向硬核逻辑解谜玩家，关注机制推演、规则例外、状态空间结构和关卡教学曲线。美术不是第一优先级，甚至可以长期保持低保真表达。

项目要提供的是“生成各种推箱类逻辑解谜原型的能力”，不是单一推箱子原型。

## 为什么不把 PuzzleScript 作为核心真相

PuzzleScript 和 PuzzleScript Next 很适合快速制作 tile-based puzzle 原型，但项目需要支持更加诡异的规则：

- 每个方向键效果不同。
- 玩家只能拉箱子，不能推。
- 传送门出口堵塞时触发 fallback 行为。
- 关卡之中还有关卡。
- 重力方向不断变化。
- 对象、规则、输入和空间关系都可能成为谜题核心。

这些机制可以尝试导出到 PuzzleScript Next，但不应该让任意 PuzzleScript 源码成为求解器和知识系统的唯一依据。否则自动验证、评分、反事实求解和知识提取都会变得脆弱。

## 第一阶段选择

第一阶段采用：

```text
核心机制 IR + 自研 runtime/solver/evaluator + PuzzleScript Next 导出
```

PuzzleScript Next 的职责：

- 快速试玩。
- 分享原型。
- 作为 Codex 可读写的轻量文本目标。
- 保留生成器规则与可玩规则之间的可视反馈。

机制 IR 的职责：

- 表达真实状态转移。
- 支持求解器模拟。
- 支持知识提取。
- 支持反事实模型。
- 支持评分器解释。
- 为 PuzzleScript Next exporter 提供来源。

## Plus 与 Next 的定位

PuzzleScript Plus 更偏实用增强 fork，包含求解器、关卡选择、鼠标控制、自定义 sprite size 等功能。

PuzzleScript Next 更适合作为主输出目标，因为它整合了 Plus 和 Pattern:Script 等方向，并提供 tags、mappings、solver、visual debugger 等更适合生成器使用的能力。

第一阶段以 PuzzleScript Next 为导出目标，必要时约束在一个较保守的子集内。

## 非目标

第一阶段不追求：

- Godot 或完整商业级游戏工程。
- 高保真美术资源。
- 任意 PuzzleScript 源码的完整反向理解。
- 大型复杂关卡的完全证明。
- 通用游戏 AI 或任意规则语言的自动证明。

