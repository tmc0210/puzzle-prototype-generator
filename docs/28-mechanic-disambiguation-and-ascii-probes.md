# Mechanic Disambiguation And ASCII Probes

Status: pre-implementation standard.

本文档定义新机制实现前的语义确认流程。它解决的问题是：

```text
用户给出零散机制词汇时，agent 不能把常见游戏直觉当成规则。
在写 runtime / parser / solver / exporter 前，必须把隐藏默认值变成用户可确认的最小 ASCII probe。
```

核心规则：

```text
No noun is a rule.
No genre convention is a rule.
No common Sokoban behavior is a rule.
```

例如用户说“有传送门和箱子”，只能说明出现了两个机制名。它尚未说明：

- 传送门传送谁：玩家、箱子、所有 movable、只有特定对象，还是只作为出口/入口设备。
- 出口位置在哪里：另一扇门所在格、门后一格、按进入方向偏移、按出口朝向偏移，还是固定 marker。
- 箱子如何移动：推、拉、拖拽、远程吸引、只受自动规则影响，或完全不可移动。
- 传送门和箱子如何交互：箱子能否进门、堵门、被门推出、压在门上、改变门状态。
- 世界是否有墙、地板、主角、网格、回合、重力、边界、失败动作、胜利条件。

## Flow

### 1. Capture Raw Brief Without Completing It

先把用户原话记录成 raw brief，不补规则：

```yaml
raw_brief:
  text: "希望游戏有传送门和箱子"
  extracted_terms:
    objects: [portal, box]
    actions: []
    world_assumptions: []
    win_condition: open
```

此时不能生成 `mechanic.yml` 的具体 rules。只能生成待确认项和 probe。

### 2. Build The Unknowns Table

把所有会影响 runtime 的语义拆成决策项：

```text
world model:
  是否是网格？是否有墙？是否有地板？边界外如何处理？是否有主角？

actors and control:
  玩家控制谁？每回合一个输入还是多输入？是否可以没有主角？

objects:
  每个对象是否 solid / movable / enterable / collectible / target / actor？

movement:
  动作如何结算？推、拉、交换、滑动、自动移动、失败动作是否消耗回合？

collision and layering:
  多个对象能否同格？谁阻挡谁？地形和对象是否分层？

mechanism semantics:
  每个机制的正常行为、失败分支、例外分支、优先级。

multi-instance:
  每类对象是否允许多个？实例是否可区分？是否有配对、绑定、分组或 active selection？

win / loss:
  什么算通关？是否每关不同？事件触发能否作为 test fixture win？
```

任何会影响 `step`、`stateKey`、`parseLevel`、`actions`、`isWin` 或 solver soundness 的项，若未确认，状态必须是 `open`。

### 3. Enumerate Interaction Surfaces

不要只问单个机制本身。对所有 in-scope 对象和机制列交互面：

```text
action x object:
  player_move into portal
  player_move into box
  push/pull box, if those actions exist

object x object:
  box enters portal
  box blocks portal exit
  portal moves into box
  portal moves into portal
  box stacked on box, if stacking exists

object x terrain:
  object hits wall
  object leaves board
  object enters void / no floor

mechanism x mechanism:
  teleport plus pushing
  teleport plus gravity
  box movement plus switch/door
  nested level plus teleport

win x transition:
  win checked before or after automatic settlement
  event-win allowed only for fixtures or player-facing levels too
```

The agent should produce an interaction matrix with statuses:

```yaml
interaction_matrix:
  - id: box_into_portal
    status: open
    blocks: [runtime_complete, parser_smoke, solver_soundness]
    needs_probe: true
```

### 4. Convert Guesses Into ASCII Probes

当 agent 有一个合理猜测时，不能直接实现。它应提出一个最小可观测结构：

```text
legend:
  @ player / controlled actor
  C box
  A/B paired portals
  # wall or boundary, if walls are part of the question
  . empty cell, if floor exists

probe:
  before:
    #######
    #@A.B #
    #######

  action:
    right

  possible outcomes:
    A. player appears on B:
       #######
       # A@B #
       #######

    B. player appears one cell beyond B in travel direction:
       #######
       # A B@#
       #######

    C. portal does not affect player:
       #######
       # @AB #
       #######

question:
  Which outcome matches your intended portal rule, or is it something else?
```

Probe 规则：

- probe 必须最小，最好只观察一个未确认点。
- 如果 probe 用到墙、地板、主角或边界，必须说明这是临时观测结构，不代表机制一定包含这些元素。
- 每个 possible outcome 必须展示 before、action、after 或事件。
- 如果多个未确认点耦合，应拆成多个 probe，而不是用一个大关卡确认全部。
- 用户可以回答“都不是”；agent 必须把这作为新语义，而不是强行贴到最近选项。

### 5. Prioritize Questions By Blocking Power

为避免一次性问爆用户，问题分批，但不能省略 runtime blocker。

第一批必须覆盖：

```text
win condition
controlled actor / input model
world topology and collision model
core object movement
core mechanism normal outcome
core mechanism failure / blocked outcome
multi-instance policy for every object likely to appear more than once
interaction between every pair of in-scope core mechanisms
```

第二批可以覆盖：

```text
edge visual presentation
curriculum focus
PuzzleScript export preference
optional object variants
rare boundary cases explicitly out of scope for the first prototype
```

如果用户希望快速试验，agent 可以建议：

```text
Scope proposal:
  For this prototype, mark portal-into-portal and box-into-box as out_of_scope.
  Implement player + one box + one portal pair only.

Required confirmation:
  This is a temporary scope cut, not a rule assumption.
```

### 6. Produce A Confirmed Mechanic Packet

只有当 runtime-critical items 不再是 `open` 时，才能进入实现。

Packet 最小结构：

```yaml
mechanic_packet:
  raw_brief: ""
  confirmed_world_model: {}
  confirmed_objects: {}
  confirmed_inputs: {}
  confirmed_rules:
    normal: []
    failure: []
    automatic: []
    priority_order: []
  confirmed_interactions: []
  confirmed_multi_instance: []
  confirmed_win_condition: {}
  ascii_probe_decisions:
    - probe_id: portal_player_destination
      chosen_outcome: B
      notes: Player exits one cell beyond paired portal in travel direction.
  out_of_scope:
    - portal_into_portal
  open_questions:
    - id: puzzle_script_export_fidelity
      blocks: [puzzlescript_exporter]
      does_not_block: [runtime_adapter, solver_smoke]
```

Implementation may begin only if every `open_questions[*].blocks` entry avoids:

```text
runtime_adapter
state_key
parser
step
actions
solver_soundness
win_condition
designer_smoke_levels
```

## Prompt Pattern

When the user gives an underspecified mechanism brief, the agent should respond in this shape:

```text
我不能安全地开始实现，因为这些词还不是可执行规则。

我先把当前理解拆成待确认点：
1. ...
2. ...

下面是第一批 runtime blocker probes。

Probe P01: <name>
Legend: ...
Before:
...
Action:
...
Possible outcomes:
A. ...
B. ...
C. ...

请确认每个 probe 的结果，或直接写“都不是，规则是 ...”。
```

Do not ask only abstract questions when an ASCII probe can make the ambiguity observable.

## Example: Portals And Boxes

Raw user brief:

```text
希望游戏有传送门和箱子。
```

The agent must not assume Sokoban push boxes or player teleporting portals.

Minimum first-batch probes:

```text
P01 controlled actor:
  Is there a player/actor on the board, or does the player control boxes/portals directly?

P02 box movement:
  before: #@C #
  action: right
  outcomes:
    A push: # @C#
    B blocked: #@C #
    C pull-only/no effect: #@C #

P03 portal transports player:
  before: #@A B #
  action: right
  outcomes:
    A player enters A and appears on B
    B player appears beyond B
    C player cannot enter A
    D A only affects boxes, not player

P04 box into portal:
  before: #@C A B #
  action: right, if pushing exists
  outcomes:
    A box teleports
    B box blocks/occupies A
    C push is illegal
    D portal is displaced/destroyed/activated

P05 portal into portal / multi-instance:
  If portals are movable or multiple pairs exist, what happens when one portal is moved into
  another portal or when an object exits into an occupied portal cell?
```

Only after these answers exist should the agent write the runtime adapter.
