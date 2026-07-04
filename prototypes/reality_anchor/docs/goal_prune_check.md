# Reality Anchor 无效目标剔除检查

状态：`reality_anchor` 原型专属的 archive cleanup / pre-archive 检查。它不是通用 Sokoban 规则，也不写入通用 design review skill。

## 目标

Reality Anchor 的目标格本质上是通关限制。随机生成、搜索或人工压缩时，容易出现一些“在完成关键目标时顺路覆盖”的目标。这类目标在极高复杂度关卡中可以作为引导，但当前 Reality Anchor 归档难度不需要用它们提高可读性。

若一个目标删除后不影响当前解法，也不产生非预期解或核心机制绕过，应移除该目标，并同步更新 archive record。

## 何时运行

- 候选准备进入 clean archive 前。
- 人类要求清理已归档 Reality Anchor 关卡时。
- 一个关卡有两个或更多目标，且某些目标可能只是把手、长链、锚点或材料移动时顺路覆盖。

## 判定流程

对每个目标单独做删除反事实：

```text
原 layout
-> 删除一个目标 overlay，保留其底层对象或地面
-> 求最短解
-> 完整展开可达图
-> 检查 expected_trace 是否仍合法且最终胜利
-> 检查归档 claim 中的核心事件组是否仍为所有胜路必经
```

删除 overlay 的字符规则：

```text
G -> .
* -> C
m -> M
+ -> @
```

## 可删除条件

只有同时满足以下条件时，目标才可删：

- 原关至少还有另一个目标。
- 删除后最短解存在，且最短成本不低于原关。
- 删除后完整图搜索为 `complete`。
- 原 `expected_trace` 在删目标版本中仍合法并最终胜利。
- 核心事件组探针为 `complete`，且不存在缺少核心事件组的胜利路径。
- 若多个相邻目标单删都通过，必须继续测试组合删除；只能删到剩余目标仍能阻止绕过为止。

## 必须保留条件

任一条件成立时保留目标：

- 删除后最短成本下降。
- 删除后出现缺少核心事件的 winning bypass。
- 删除后原 expected trace 不再通关。
- 完整图或事件探针超预算，结论为 `unknown`。
- 该目标是唯一目标。
- 人类 brief 明确要求保留引导目标，并且 packet 中把它标为 intentional guidance，而不是结构必要目标。

## 输出形状

```yaml
goal_prune_check:
  status: clean | pruned | kept_with_unknown | skipped
  targets_checked:
    - target: [x, y]
      action: remove | keep
      reason: ""
      cost_delta: "old->new"
      graph_status: complete | exhausted
      expected_trace_win: true | false
      core_event_bypass: none | "missing group list"
  removed_targets:
    - [x, y]
  retained_targets:
    - [x, y]
  evidence_refs:
    - prototypes/reality_anchor/reports/...
```

若实际删除了目标，必须同步更新：

- `prototypes/reality_anchor/levels.yml`
- 对应 `design_archive/candidates/*.md`
- `design_archive/index.yml` 的 retrieval summary / motifs
- 相关 experiment 记录
- playable export 或其它面向游玩的派生产物
