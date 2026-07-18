# 提交人类试玩前清理清单

状态：`ice_slide_escape` 原型专属的提交前清理。

只在版本准备进入人类待玩列表时运行。它处理明确的呈现与冗余问题，不决定
审美等级，也不替代硬证据。

## 边界

- 不为清理偏好破坏已经成立的玩家体验核心、作品身份或 base/meta 共享结构。
- 如果修改 layout、start、goal、win condition 或核心机制使用，建立新版本并重跑证据。
- 如果微调会伤害核心结构，保留原版本，把风险准确写给人类。

## 检查

- 大片无职责的墙或空地；
- 有效结构在整体构图中无理由地偏置；
- 任何没有职责的对象，尤其仅充当普通障碍的冰；
- 几何引导是否过早暴露中后期机制解法；
- 没有准备、阅读、反馈或收束作用的纯走路；
- A/B/C/D 是否使用清楚、尽量不相邻的 edge cells；
- 解题完成后的玩家动线是否需要无意义折返；
- base 视角中的 meta 潜伏元素是否过早泄露后期知识；
- 其它一眼可见、保持同一作品即可改善的问题。

## 输出

```yaml
pre_human_polish_pass:
  status: clean | improved | deferred_to_human | new_version_required
  attempted_tweaks:
    - item:
      action:
      result: kept | reverted | skipped
      reason:
      evidence_rerun_required: true | false
  deferred_notes_for_human: []
```
