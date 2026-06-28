# New Mechanic Implementation Playbook

Status: operational standard for bringing up a newly confirmed mechanism.

本文档回答一个具体问题：

```text
拿到一套新机制并完成 preflight 确认后，
需要先实现哪些工程能力，才能开始可靠的 designer 测试？
```

这里的 designer 测试指：

```text
跳过尚未打通的 knowledge / curriculum 推导，
直接用 scratch layouts、solver、analyzer、playable 和 reviewer loop
测试“这个新机制是否能生成可解释、可验证、可继续设计的关卡”。
```

跳过 knowledge 是临时测试策略，不是长期验收策略。accepted campaign 仍然需要
player model、knowledge / curriculum、level specs、evaluator gate 和人工/LLM 设计审查接回。

如果机制还没有经过语义确认，不应进入本文档的实现阶段。先执行
[Mechanic Disambiguation And ASCII Probes](28-mechanic-disambiguation-and-ascii-probes.md)：
把用户的零散机制描述转成 confirmed mechanic packet。

## Phase 0: Confirmed Mechanic Packet

进入实现前必须有一个可执行的 confirmed packet：

```text
raw user brief preserved without invented rules
ASCII probe decisions for ambiguous semantics
confirmed player-facing win condition
confirmed world topology: grid / no-grid, walls / no-walls, floor / no-floor, bounds
confirmed controlled actor model, including whether a player exists
confirmed object vocabulary and glyphs
confirmed inputs and action costs
confirmed interaction order / priority
confirmed edge cases that affect state transition
confirmed object instance / relation semantics
confirmed central vs boundary-only mechanisms
known open questions and what they block
```

如果 open question 会影响 runtime、state key、solver soundness 或目标关卡结构，不应继续做 serious
designer 测试。只能做明确标注的 toy probe。

典型 blocker 包括：

```text
portal destination semantics
who / what can enter portals
push / pull / drag / blocked behavior for boxes
object occupancy and collision
whether objects can move into each other
whether mechanisms can affect same-type instances
win timing and player-facing win condition
multi-instance identity and relation semantics
```

## Phase 1: Runtime Adapter MVP

每个新机制必须先实现一个 runtime adapter。

最低接口：

```text
createRuntime(mechanic)
parseLevel(level)
renderState(state)
step(mechanic, state, action, options)
replay(mechanic, initialState, actions, options)
isWin(state, winCondition)
isEventWin(events, winCondition)
```

最低质量要求：

```text
state key includes every future-relevant field
actions enumerates all relevant player inputs
step emits scoped events for important rule branches
illegal-but-observable probe events are represented deliberately
counterfactual options can disable rules / branches when declared
multi-instance events include enough instance or relation evidence for trace-level analysis
```

Adapter 实现不需要先完成 knowledge / curriculum，但必须足够支撑 solver 和 layout analyzer。

## Phase 2: Designer-Evidence Tools

runtime adapter 完成后，应立刻跟进以下工具。这些是可靠 designer 测试的硬依赖。

```text
solve:
  find a winning path or report complete / exhausted.

explain-layout:
  analyze a scratch layout without requiring it to be a final campaign level.

trace replay:
  replay expected/probe traces and report per-step events.

key snapshots:
  show before/after state for every nontrivial event.

graph analyzer:
  enumerate reachable graph when budget permits and mark exhausted as unknown.

agency / SCC analyzer:
  expose reversible regions, irreversible commitments, branches, bypass risks, and forced prefixes.

counterfactual / bypass checks:
  answer narrowly scoped “does this event/state change matter in this candidate?” questions.
```

这些工具必须使用同一个 runtime adapter。不能让 solver、playable、exporter 各自复刻规则。

## Phase 3: Playable And Visual Debugging

新机制确认后，应该尽快有一个可玩输出。优先级如下：

```text
runtime-backed web playable:
  preferred first debug surface because it calls the same adapter as solver/analyzer.

PuzzleScript Next exporter:
  expected share/play output for the prototype, but may trail the runtime-backed playable
  when mechanics are hard to compile faithfully.
```

PuzzleScript exporter 不是通用免费能力。每个新机制都需要确认：

```text
which rules can be faithfully exported
which win conditions need a level marker or adapter
which events are solver-only probes and should not become player-facing wins
which mechanics are out of PuzzleScript scope and require runtime-backed playable only
```

如果 exporter 尚未实现，文档和 CLI 必须明确标记 unavailable；不能落回旧机制 exporter。

## Phase 4: Phenomenon Discovery Tools

新机制通常还需要 phenomenon discovery 工具，但它们不应代替 designer。

```text
temporary miner:
  explores small structures, raw events, graph shapes, object participation,
  bypasses, and surprising interactions.

seed factories:
  emit minimal witnesses or controlled structures for known rule facts.

candidate gallery:
  summarizes generated candidates / probes for human inspection.
```

这些工具的角色：

```text
find raw material
calibrate analyzer evidence
discover negative results
surface interaction patterns the designer did not think of
```

它们不能：

```text
accept levels
invent curriculum slots
claim quality
promote mined maps directly into campaign candidates
replace the designer loop
```

如果 miner / seed factories are not implemented for the new mechanism, blind tests must say:

```text
miner findings: unavailable
seed factories: unavailable
```

They must not reuse another mechanism's tools.

## Phase 5: Review Calibration Fixtures

Before serious multi-agent or LLM critic review, create at least:

```text
negative fixture:
  analyzer passes but the design claim overreaches, e.g. witness relabeled as application.

positive fixture:
  a lead-designer-accepted candidate or strong probe for this exact mechanism.
```

Calibration from another prototype is not valid for a new mechanism.

## Minimum Bring-Up Checklist

For direct designer testing, the minimum useful implementation is:

```text
[ ] mechanic.yml reflects confirmed rules and open questions
[ ] runtime adapter registered
[ ] parse/render roundtrip works on scratch layouts
[ ] solve works through adapter
[ ] explain-layout works without old knowledge/curriculum dependency, or uses a declared temporary stub
[ ] graph / SCC / agency reports run through adapter
[ ] trace replay and key snapshots use adapter events
[ ] runtime-backed playable builds
[ ] unsupported exporter / miner / seed factories fail explicitly
```

For a fuller prototype bring-up, add:

```text
[ ] PuzzleScript Next exporter and checker for this mechanism
[ ] temporary miner for this mechanism
[ ] seed factories for confirmed rule facts / probes
[ ] candidate gallery for generated/probed layouts
[ ] reviewer calibration fixtures
[ ] player_model / knowledge / curriculum / level_specs restored when that workflow is ready
```

## Prompt And Code Templates

Use the template kit when bringing up a new mechanism:

```text
templates/new_mechanic/PREFLIGHT_PROMPT.md
templates/new_mechanic/PROMPT.md
templates/new_mechanic/src/*.template.ts
templates/new_mechanic/prototype/*.template.yml
templates/new_mechanic/conformance.template.md
```

The intended workflow is:

```text
1. If the mechanism is underspecified, use PREFLIGHT_PROMPT.md to produce a confirmed packet.
2. Paste PROMPT.md into a fresh Codex thread with that confirmed mechanic packet.
3. Copy and instantiate the code templates into src/.
4. Copy and instantiate the prototype templates into prototypes/<mechanic_id>/.
5. Register the adapter and tool availability.
6. Run conformance checks before serious designer testing.
```

## Current Pull Portal Status

`pull_portal_fallback` currently has:

```text
runtime adapter: yes
solve / evaluate / explain-level: yes
graph / agency reports: yes
runtime-backed playable: yes
PuzzleScript exporter/checker: yes, mechanism-specific
temporary miner: yes, mechanism-specific
seed factories: yes, mechanism-specific
knowledge/curriculum: present but not certified complete
```

The next mechanism should receive the same category of tools as its own adapter-owned surface,
not reuse the pull-portal versions.
