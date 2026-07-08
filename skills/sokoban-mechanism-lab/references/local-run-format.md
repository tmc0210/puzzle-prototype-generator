# Local Run Format

`mechanism-lab-run` 接受 YAML 或 JSON：

```yaml
runId: local_probe_01
title: "可选标题"
notes: "本轮探索意图"
defaults:
  maxExploreDepth: 14
  maxReturnDepth: 24
  maxStates: 20000
  maxTransitions: 80000
cases:
  - id: "case_a"
    family: "local_structure_family"
    variant: "variant_a"
    changed_variable: "相对对照变体改动的结构旋钮"
    contrast_with: "case_b"
    notes: "输入接口 / 输出接口 / 最小 consumer 的简短说明"
    layout: |
      #####
      #@..#
      #####
    actions: ["right"]
```

每个 case 可以覆盖 defaults：

- `maxExploreDepth`：从初始状态枚举局部状态图的深度。
- `maxReturnDepth`：从最终状态搜索回初始 key 的深度。
- `maxStates` / `maxTransitions`：状态图预算。
- `disabledRules` / `disabledBranches`：runtime 支持时用于反事实。
- `win`：覆盖原型默认胜利条件。
- `family`：结构族 id。相邻变体用同一个 family。
- `variant`：该 case 在结构族中的变体名。
- `changed_variable` / `changedVariable`：相对对照 case 改了哪个结构旋钮。
- `contrast_with` / `contrastWith`：对照 case id，可以是字符串或字符串数组。
- `question`：兼容旧 run 的可选字段。新材料默认不要使用它组织 topic；若必须保留，应写成结构对照说明，不写二元问法或发生什么问法。

运行：

```bash
tsx src/cli.ts mechanism-lab-run prototypes/<mechanic_id> cases.yml --run-id local_probe_01 --write
```

写入：

```text
prototypes/<mechanic_id>/mechanism_lab/runs/<run_id>/
  cases.json
  results.json
  report.md
```

`report.md` 给人读；`results.json` 给后续 explorer / curator 继续读取。若 case 写了 `family`，报告会额外生成结构族摘要。`explorer_notes.md` 和 `proposed_families.md` 由 explorer 在读取硬事实后补齐，不是 `mechanism-lab-run --write` 的自动输出。

`returnToInitial.status=exhausted` 只表示预算不足，不能当作不可回返证据。需要提高 `maxReturnDepth` 或降低结论强度。

## Loop 附加文件

在 `mechanism_loop` 中，默认使用单 agent 线性 run 目录：

```text
prototypes/<mechanic_id>/mechanism_lab/runs/<run_id>/
  brief.md
  cases.yml
  cases.json
  results.json
  report.md
  explorer_notes.md
  proposed_families.md
  curator_decision.md
```

只有用户明确要求并行分派时，才使用 round + topic 子目录：

```text
prototypes/<mechanic_id>/mechanism_lab/runs/<round_id>/
  round_manifest.md
  topics/<topic_id>/
    brief.md
    cases.yml
    cases.json
    results.json
    report.md
    explorer_notes.md
    proposed_families.md
  curator_synthesis.md
  curator_decision.md
```

默认线性循环中，`brief.md` 在运行 explorer 前写入，作为任务包；`curator_decision.md` 记录 `promote`、`merge`、`supplement`、`defer` 或 `relabel` 的裁决，以及对 `lexicon.md`、`lexicon_index.md`、`backlog.md` 的更新。并行 round 中，`round_manifest.md` 只记录各设计空间切片的边界、共用 source boundary 和不要读取项；`curator_synthesis.md` 在所有 topic 完成后写入，用来合并重复、冲突和弱结论。每个 topic 仍必须写成“输入 -> 产物 -> 最小 consumer”的设计空间切片。

这些流程文件不是 `mechanism-lab-run --write` 的输出；不要要求用户在 prompt 中复述它们的内容。

Topic brief 应包含建议顺手比较项。Explorer 完成后要在 `explorer_notes.md` 或 `proposed_families.md` 中写清结论范围校准：

- 已支撑：哪些变体、对象或状态已经能支撑当前语料。
- 未覆盖导致的结论收窄：哪些未跑、等价、不适用、patch 隔离不了，或已经变成另一个题材。
- 不应入库：哪些只是孤例、预算不足、没有 consumption probe，或尚未转成可用结构材料。
- 是否打开了新设计空间或新组合接口：普通未覆盖变体只收窄本条语料，不直接写成下一轮 backlog。
