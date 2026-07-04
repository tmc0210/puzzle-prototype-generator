# Design Claim: RA_EXP_2026_07_04_PHASE_FERRY_v8

```yaml
candidate_id: RA_EXP_2026_07_04_PHASE_FERRY_v8
prototype: reality_anchor
role: challenge
review_relation: structural_revision_from_v6_after_critic_review_1
archive_lineage_policy:
  default: fresh_required
  candidate_relation: fresh
  authorized_archive_variant_work:
    enabled: false
score_claim_allowed: false
```

## Layout

```text
########
#..#..G#
##GMLP.#
#.BS.M.#
##..@.##
########
```

## Revision Response

v6 的 critic core attacks 中，底部左侧 `C` 被指出像任意 ballast。v8 将该格改为墙，
让约束变成诚实地形，不再暗示一个可操作但不被消费的箱子。v7 去掉该约束后出现
`sticky_merge` 绕过；v8 保留封堵功能但去掉 movable-clutter 读法。

同时，本版不再声明“两个目标消费同一对象身份或同一材料实例”。改为较窄的玩家侧 claim：
这是一个紧凑双阶段相位 shuttle，左目标要求先 merge 再转箱，右上目标要求 reset 两个锚点后
把 sticky 刚体送达。

## Player Insight

玩家要识别两个阶段共用同一组规则压力，而不是共用同一对象身份：

1. 左目标阶段：先用 P/L 侧的推力移动黏块，触发 `sticky_merge`，再通过 B/S 边界把合并材料的一部分转成箱覆盖左目标。
2. 重置阶段：通过 pull P/L 与 pull B/S 改写两个边界，让中部材料重新进入可操作状态。
3. 右上目标阶段：通过连续 P/L 位置设置，获得把 sticky 刚体推到右上目标的施力侧。

## Causal Chain

1. 开局上推右侧黏块，联动 P/L，触发 P/L 边界变化与 sticky rigid move。
2. 黏块左推后发生 `sticky_merge`。
3. 合并体继续左推跨过 B/S 边界，触发 `sticky_to_box` 并覆盖左目标。
4. 玩家 pull P/L 与 pull B/S，触发两类锚点移动和再次 material normalization。
5. 中段 P/L 与 B/S 被同一次 force chain 联动移动，重新设置右侧收束空间。
6. crate 被 pull 到 sticky side，触发 `box_to_sticky`。
7. 末段 P/L 左移用于把玩家带回正确施力侧；随后 sticky 刚体被送到右上目标。

## Required Events

```yaml
all_winning_paths_required_event_groups:
  - anchor_boundary_shift:push_pull
  - anchor_boundary_shift:box_sticky
  - pull_object
  - material_normalization
  - sticky_merge
  - move_sticky_rigid
returned_solution_support_events:
  - force_chain
  - sticky_to_box
  - box_to_sticky
nonclaims:
  - no unique route claim
  - no per-object identity necessity claim
  - no per-target covering identity claim
  - no numeric aesthetic or difficulty claim
  - no claim that late repeated P/L shifts are independent difficulty
```

## Why Not Execution

工具证明六组 central events 均为全胜路必要；玩家侧 claim 则保持较窄：左目标的
merge-to-box 与右上目标的 sticky delivery 分成两个阶段，但中间必须通过两类锚点的
重置连接。末段 P/L 连续左移不包装成独立难点，只作为右上目标施力侧设置的必要收束。

## Falsification

- 若六组 event group 任一存在 winning bypass，核心机制 claim 失败。
- 若 critic 认为 v8 的墙约束仍读成补丁，结构需继续修。
- 若 critic 认为末段 P/L 索引仍是 core padding，而不是可接受收束 caveat，需继续修。
- 若 critic 认为双阶段 claim 仍靠 returned trace 才成立，需降级或换 family。
