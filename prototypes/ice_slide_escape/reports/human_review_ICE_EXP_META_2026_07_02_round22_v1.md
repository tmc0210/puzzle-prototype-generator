# Human Review: ICE_EXP_META_2026_07_02_round22_v1

```yaml
candidate_id: ICE_EXP_META_2026_07_02_round22_v1
human_review_id: HC_ICE_CAND_0035_001
author: human_designer
status: accepted
aesthetic_score: 5
aesthetic_label: 标杆范例
difficulty_score: 4
difficulty_label: 阶段挑战
difficulty_detail: >
  局部 base A->B 约 2+；显式知道 C->D 目标时 meta 机制约 3；
  在下方死路或等价 return pressure 保障发现性的整体单关体验约 4。
archive_use:
  - human_taste_reference
  - positive_exception
  - abstract_meta_reference
  - do_not_template_geometry
```

## 人类评语

这关是一个意外优秀的带 meta 要素的单关设计，而不是标准两段式 meta-first 模板。B/C 同格意味着玩家从 B 离开后，如果周围地图让他不得不原路返回，刷新后的同一关会被自然重读：首访的出口变成回访入口，base 与 meta 不需要任何知识差，却因为地图语境和目标方向改变产生“一关两用”的效果。这个点非常漂亮，审美可给 5。

但此关不应作为可机械复用的 B=C 模板。它的价值依赖周围地图配合、回返动机、以及同一左下冰组在回访时确实改变角色，是典型的需要但也值得周围关卡主动配合的好关。后续设计不能因为使用同格出入口、死路返回或 D-wall 就获得同等加分。另外，下方地图死路/回返压力不是增加难度，而是降低发现门槛并保证公平性。没有这个 wrapper，玩家可能一辈子不会发现 B=C 的回访读法，这不是高难而是不可见。真正应计入难度的是：在自然回返后，玩家意识到同一单关刷新后还有第二用途，并把旧出口、target 和可破墙 D 重新组织起来。局部 C->D 机制约 3；有良好回返 wrapper 的整体难度约 4。

## 归档解释

```yaml
accepted_as:
  - "带 meta 要素的单关设计"
  - "一关两用 / old-exit-becomes-return-entry 的抽象正例"
not_accepted_as:
  - "标准两段式 meta-first 模板"
  - "B=C 同格接口模板"
  - "D-wall 模板"
  - "死路返回模板"
reusable_lesson:
  - "信息差不是 meta 的必要条件；地图语境和目标方向改变也能让同一结构被重读。"
  - "return pressure 是发现保障和公平性装置，不是加难装置。"
  - "高分来自同一结构在回返后改变意义，不来自同格接口表面形式。"
failure_if_copied:
  - "只有 B=C 或 D-wall，但没有周围地图回返动机。"
  - "没有 return pressure，导致 CD 组变成玩家可能永远略过的不可见结构。"
  - "同一冰组在回访时没有实质角色改变。"
```
