# Candidate Generation V2

Status: tool-slice / seed-factory document. The current level-design standard is [Current Level Design And Review Standard](21-current-workflow-standard.md). This file documents the first engineering slice for candidate serialization and seed generation; it is not a complete automatic level designer.

本文档记录第一版候选地图生成 vertical slice。它不是完整自动出题器，而是验证以下链路：

```text
level_specs_v2.yml
-> mechanism-specific seed factories
-> role-specific structure variants
-> candidates_v2.yml
-> trace replay / solver checks
-> evaluate-v2
```

## 核心边界

后续泛化方向已经调整：候选生成器不再被视为主出题器。主线应是 `因果链设计 -> 地图实现 -> solver/graph 验证 -> LLM 精修 -> review -> campaign placement`。本文件中的 seed factory 只提供局部结构和机制 witness，不能自动承担 application / combination / challenge 的设计职责。详见 [Current Level Design And Review Standard](21-current-workflow-standard.md)。

候选生成器当前分为两部分：

```text
通用脚手架:
  CandidateLevelV2 数据格式
  candidates_v2.yml schema
  generate-v2 CLI
  trace replay / solver 生成期检查
  evaluate-v2 候选绑定与 scoped event 检查

机制专用层:
  pull_line
  portal_bridge
  fallback_push_gate
```

这版不声称能从规则自动推出出题结构。它只证明 agent 写出的 seed structure 可以被工程化、批量化、验证化。

同一个 seed factory 可以服务多个 spec，但不能把同一张图无差别复制到不同关卡职责。至少要显式说明它当前只是 minimal witness，还是已经扩展成 discovery / guided application / variation structure。扩展成立的证据不应是“多走了几步”，而应是新增因果依赖。

## CandidateLevelV2

候选关卡必须回指 spec：

```yaml
id: C_LS10_blocked_exit_pushes_entrance_fallback_push_gate_001
spec_id: LS10_blocked_exit_pushes_entrance
factory: fallback_push_gate
motifs: [fallback_push_gate]
layout: |-
  #######
  #   B #
  # A G #
  ##@####
  #######
solution_trace:
  - input: up
    events: [portal_enter, portal_exit_blocked, portal_fallback_push]
```

`solution_trace` 必须 replay 到玩家通关标准。`probe_trace` 可以包含非法但有事件的 probe，例如 blocked portal failure。

## 当前 Seed Structures

### pull_line

用于最小拉箱子 witness。

```text
#####
#C@G#
#####
#####
```

玩家向右移动，前方是 goal，身后是 crate，触发 `pull_crate` 并到达目标。

### portal_bridge

用于最小传送门连接。

```text
#######
#@A#BG#
#######
#######
```

玩家进入 A，B 的方向出口是 goal，触发 `portal_enter + portal_teleport`。

### fallback_push_gate

用于 blocked exit 推动入口门并打开通路。

```text
#######
#   B #
# A G #
##@####
#######
```

玩家向上进入 A。B 的上方出口被墙堵住，A 上方为空，因此入口门被推入上方 alcove，旧位置打开，玩家随后走到 goal。

当前 `LS11_trigger_fallback` 使用同一 factory 的 guided-application 变体：

```text
#########
####B####
#### ####
####A G##
# @  ####
#########
```

玩家先走到入口门下方，再触发 fallback 把 A 推入上方凹槽，随后穿过打开的横向通道。这不是新的机制 seed，而是同一个 seed 的 role-specific expansion。

## 当前结果

`npm run generate:v2` 生成 7 个正式候选，覆盖：

```text
LS01, LS02, LS05, LS06, LS07, LS10, LS11
```

这些候选在生成阶段都通过：

```text
solution/probe trace replay
solver solvability
player_on_goal win standard
```

`evaluate-v2` 中，`winning_solution` 与 `probe_trace` 作用域可以被这批候选实测。`all_winning_paths` 仍需要完整 product graph 证明，当前保持 `unknown` 是预期行为。

边界探针不应进入 `candidates_v2.yml` 的正式候选池。若未来需要单独验证某个不会成为课程目标的边界，应进入独立的 probe fixture schema。

## 下一步

下一步不要马上扩大到所有关卡。优先做三件事：

- 为候选接入完整图 / product graph 的 scoped event proof。
- 写组合 seed structure，例如 `construct_blocked_exit_with_crate`，验证基础结构是否真的可组合。
- 增加 `causal_chain` / `event_signature` 报告字段，让 LLM 可以从 solver trace 中提取和精修链路。
