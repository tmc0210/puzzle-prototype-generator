# worker_round54_lshape fresh claim

```yaml
worker_scope: round54_lshape_only
prototype: prototypes/ice_slide_escape
reviewer_called: false
critic_called: false
claim_last_review_default: true
family: l_shape_d6_restart_to_cross_axis_stopper
freshness_policy: 不从 v5 小修开始；只借用失败结论，不复用 v5 的 C 竖井与 base 可达域共用结构。
```

## 设计目标

本分支直接构造 L 形骨架：

- meta 中 `ice_destroy_group_d6_plus` / `slide_restart_after_group` 之后，projectile 不停在同轴钥匙线上。
- restart 产物必须进入另一轴，成为后续垂直或横向动作的 stopper / 反弹障碍。
- 这个 stopper 必须被后续目标回封或 D 门动作消费；若只打开 D 接近角后纯走路，视为失败。
- base A->B 使用 d6 前或更早知识，优先 required `ice_rebound_d4`。
- A/B/C/D 全分离且 edge 合法。
- 所有 targets 初始有冰，且目标初始覆盖参与封路矛盾；这只作为结构事实，不作为审美自评理由。

## 硬约束

- base A->B 完整可达扫描不得命中：
  - `ice_pass_through_d5`
  - `slide_restart_after_group`
  - `ice_destroy_group_d6_plus`
- meta C->D 所有胜路必须 required：
  - `ice_destroy_group_d6_plus`
  - `slide_restart_after_group`
- meta 优先同时 required `ice_rebound_d4` 或另一个早期事件。
- 偏好 1-2 targets、2-4 ice。
- 避免三个重复 target debt / spare 补位冰。
- 本 worker 不调用 evidence reviewer / puzzle critic。

## 成败判据

合格草案至少需要同时满足：

- solver 找到 base 与 meta 解；
- base no-late 完整扫描通过；
- meta required d6/restart 完整扫描通过；
- trace 中 d6/restart 产物换轴后被再次推动，或作为另一个冰/目标的 stopper 被后续推理消费；
- edge scan 无明显 A/B 到 D 或 C/D 到 B 的非预期逃逸。

若找不到草案，失败摘要必须说明最小几何矛盾，而不是只列随机搜索失败。
