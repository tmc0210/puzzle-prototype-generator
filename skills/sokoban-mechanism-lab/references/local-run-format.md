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
    question: "比较性问题"
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
  explorer_notes.md
  proposed_families.md
```

`report.md` 给人读；`results.json` 给后续 explorer / curator 继续读取。若 case 写了 `family`，报告会额外生成结构族摘要。

`returnToInitial.status=exhausted` 只表示预算不足，不能当作不可回返证据。需要提高 `maxReturnDepth` 或降低结论强度。

## Loop round 附加文件

在 `mechanism_loop` 中，run 目录还应包含两个由 agent 管理的流程文件：

```text
prototypes/<mechanic_id>/mechanism_lab/runs/<run_id>/
  brief.md
  curator_decision.md
```

`brief.md` 在运行 explorer 前由 controller / curator 写入，作为 subagent 的标准任务包。`curator_decision.md` 在 explorer 完成后由 curator 写入，记录 `promote`、`merge`、`supplement` 或 `defer` 的裁决，以及对 `lexicon.md`、`lexicon_index.md`、`backlog.md` 的更新。

这两个文件不是 `mechanism-lab-run --write` 的输出；不要要求用户在 prompt 中复述它们的内容。
