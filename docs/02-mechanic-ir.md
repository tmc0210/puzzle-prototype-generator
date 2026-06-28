# 机制 IR

机制 IR 是项目的机制真相。它不是另一个 PuzzleScript，而是一份可执行的机制说明书。

## 目标

机制 IR 要同时服务四件事：

```text
给 Codex 理解机制
给 runtime 执行机制
给知识生成器提取规则分支
给 PuzzleScript Next exporter 生成可玩原型
```

## 基本结构

一份机制文件可以包含：

```yaml
id: pull_portal_fallback
title: Pull-only crates with blocked portal fallback

objects: {}
inputs: {}
rules: []
win: {}
optimizations: {}
```

## 对象层

对象定义需要包含符号、层、trait 和变量。

```yaml
objects:
  player:
    glyph: "@"
    layer: actor

  crate:
    glyph: "C"
    layer: solid
    traits: [pullable, blocks_portal]

  wall:
    glyph: "#"
    layer: terrain
    traits: [solid]

  portal:
    glyph: "P"
    layer: device
    traits: [enterable, pushable]
    vars:
      group: color
```

如果对象允许多个实例，机制 IR 还必须声明多实例身份策略。详见 `docs/19-multi-instance-object-model.md`。

```yaml
objects:
  crate:
    glyph: "C"
    layer: solid
    traits: [pullable]
    object_instance_model:
      multiplicity: many
      identity_policy: indistinguishable
      visible_distinction: none
      semantic_distinction: none

  portal:
    glyphs: ["A", "B", "D", "E"]
    layer: device
    traits: [enterable]
    object_instance_model:
      multiplicity: many
      identity_policy: relational
      visible_distinction: glyph
      semantic_distinction: relation_membership
```

不要把多实例对象建成临时特例。例如“箱子数组”“传送门 A/B 字段”“红蓝角色字段”都应是 runtime adapter 的实现细节；机制 IR 层应先表达 object type、instance policy 和 relation。

## 关系层

多个对象之间若存在配对、分组、绑定、互斥激活或控制关系，必须显式建模。

```yaml
relations:
  - id: portal_pair_ab
    type: symmetric_pair
    relation_type: portal_pair
    members: [portal#A, portal#B]

  - id: active_actor
    type: singleton_selection
    domain: actor
    value: actor#red
```

关系如果影响未来规则、输入解释或胜利条件，就属于状态完整性的一部分，必须进入 state hash。

## 输入层

输入不一定只是移动。方向键也可能有完全不同语义。

```yaml
inputs:
  left:
    intent: move
    dir: left
  right:
    intent: move
    dir: right
  up:
    intent: rotate_gravity
    amount: -90
  space:
    intent: shoot
```

## 规则层

规则需要暴露触发、条件、分支、效果、事件和设计标记。

```yaml
rules:
  - id: enter_portal
    trigger:
      input: move
    when:
      player_moves_into: portal
    branches:
      - id: normal_teleport
        when:
          paired_portal_exit_is: empty
        effect:
          teleport_player_to_paired_portal: true
        emits: [portal_enter, portal_teleport]

      - id: blocked_exit_push_entrance
        when:
          paired_portal_exit_is: blocked
          entrance_portal_destination_is: empty
        effect:
          push_entered_portal: input.dir
        emits: [portal_enter, portal_exit_blocked, portal_fallback_push]
        teaches: [K_blocked_portal_pushes_entrance]
```

## 事件层

每次状态转移都要产生事件日志。知识验证、评分、回放和调试都依赖事件。

事件例子：

```text
pull_crate
push_crate_failed
portal_enter
portal_teleport
portal_exit_blocked
portal_fallback_push
gravity_rotated
nested_board_entered
```

多实例原型中，事件应尽量携带参与对象或关系。早期可以用字符串实例事件，长期应迁移到结构化事件。

```text
pull_crate:crate#1
portal_teleport:A->B
switch_toggle:switch#red
```

更完整的形状：

```ts
{
  type: "pull",
  actor: "player#1",
  object: "crate#2",
  from: [3, 2],
  to: [4, 2],
  rule: "pull_single_crate"
}
```

知识 detector 可以写泛化模式，但 runtime trace 应保留实例证据。

## Effect Summary

为了判断优化是否安全，每条规则应提供保守的 effect summary。

```yaml
effects:
  reads: [player.position, crate.position]
  writes: [player.position, crate.position]
  emits: [pull_crate]
  locality: local
  reversible: conditional
```

优化器不会自动证明任意规则安全，只根据这些摘要做保守检查。

## 优化前提

每个优化都应有前提声明。

```yaml
optimizations:
  reachability_macro:
    requires:
      - no_side_effect_rules_on_player_travel
      - player_orientation_irrelevant_or_tracked
      - travel_cost_can_be_summarized
```

检查结果分为：

```text
PASS: 可以用于证明型搜索
FAIL: 禁用
UNKNOWN: 默认禁用，除非人工 override
```

## 反事实模型

知识必要性需要反事实求解。机制 IR 应允许禁用或替换某个规则分支。

```yaml
counterfactuals:
  without_blocked_portal_push:
    disable_branches:
      - enter_portal.blocked_exit_push_entrance
```

## 状态完整性

所有会影响未来规则判断的内容都必须进入状态 hash：

- 对象位置。
- 对象变量。
- 玩家朝向。
- 所在子世界。
- 全局变量。
- 门、开关、计时器、重力方向。
- 传送门配对。
- 对象实例身份策略和会影响规则的实例变量。
- 多对象关系，例如 active actor、开关绑定、门锁绑定。
- 嵌套关卡内部状态。
- 历史标记和消耗品。
