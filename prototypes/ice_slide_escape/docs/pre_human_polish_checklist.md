# Pre-Human Polish Checklist

状态：提交给人类查看前的轻量优化清单草稿。它不是 critic 标准，不是 evidence
gate，也不是 reject / failed_search 理由。

## 何时使用

只在候选已经达到 `proposal_ready` / `proposal_ready_with_caveats`，或人类要求
查看当前最好版本前使用。若候选仍在结构设计、证据审查或 critic 打回阶段，不要运行这个清单。

## 总边界

- 不为 polish 偏好破坏已经成立的 base / meta causal chain。
- 不因 polish alone 改变 `review_loop_state`。
- 不把 polish 失败写成 `failed_search`。
- 不把这份清单当成 critic gate 或 evidence reviewer 输入。
- 如果修改 layout、start、goal、win condition 或核心机制使用，必须重跑必要证据。
- 如果微调会伤害核心结构，保留原版本，把该项写给人类。

## Interface Polish

- 最基本的，A/B/C/D 使用互不重合、互不相邻的 edge cells。
- 进一步，同一组 起点终点 尽量不要在同一侧，最好能ABCD分别不同侧，但不强求。如果有同侧，最好稍远一些。
- 更进一步，可以进行一些更激进的尝试（例如微调局部结构而非简单删墙加墙）以实现更合理的玩家动线，例如避免“先去中间区域做题，然后再返回起点附近的终点赶路“，尽量让玩家在解题完成后顺带离开，如果尝试未果可以说明。
- 如果微调接口位置会破坏 shared structure、chain_delta 或核心证据，跳过。

## Meta Readability Polish

- base流程中看到的meta的涉及后期知识的关键元素可以稍微藏一点，避免玩家提前猜到后期知识。例如：base流程声明知识限制在d5前，而meta流程中用到的一个长直道死胡同里有一个d5/d6，即使base流程触发不了、不可达，玩家也可能会看到这个显眼结构而提前猜到长距离推动可能可以破墙/穿墙。

## 输出形状

```yaml
pre_human_polish_pass:
  status: clean | improved | deferred_to_human | returned_to_review
  attempted_tweaks:
    - item:
      action:
      result: kept | reverted | skipped
      reason:
      evidence_rerun_required: true | false
  deferred_notes_for_human:
    - ""
```

`returned_to_review` 只在 polish 尝试实际修改了 layout / start / goal / claim 并需
重新审查时使用；不是因为 polish 偏好本身打回候选。
