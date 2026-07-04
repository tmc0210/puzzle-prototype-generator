# Design Claim: RA_EXP_2026_07_04_PHASE_FERRY_v6

```yaml
candidate_id: RA_EXP_2026_07_04_PHASE_FERRY_v6
prototype: reality_anchor
role: challenge
archive_lineage_policy:
  default: fresh_required
  candidate_relation: fresh
  authorized_archive_variant_work:
    enabled: false
  nearest_clean_archive_context:
    positive_anchor: RA_CAND_0001
    use: taste calibration only
    negative_anchor_none_found: true
score_claim_allowed: false
```

## Layout

```text
########
#..#..G#
##GMLP.#
#.BS.M.#
#C..@.##
########
```

## Player Insight

玩家要读出一个极小空间里的“相位渡运”：左侧目标不是把一个箱子直接推上去，
而是先把黏块推过 P/L 和 B/S 的交界，合并后再被 B/S 转成箱来覆盖；右上目标
则要求玩家重新移动两个锚点，让剩余黏块在正确侧保持刚体并被送上目标。

## Causal Chain

1. 开局先借 P/L 的位置推动右侧黏块，触发 `anchor_boundary_shift:push_pull` 与 `move_sticky_rigid`。
2. 黏块被推向左侧黏块并触发 `sticky_merge`，形成后续可被切分/转相位的材料。
3. 合并体继续左推，部分跨入 box side，触发 `sticky_to_box`，左目标被转出的 crate 覆盖。
4. 中段通过 pull P/L 和 pull B/S 重置两个边界，B/S 再次触发 material normalization。
5. P/L 与 B/S 在中下方同列/邻近处被 force chain 联动移动，改变终局施力区域。
6. 中部 crate 被 pull 到 sticky side，触发 `box_to_sticky`，留下可被最后推送的黏块。
7. 末段多次移动 P/L 后，玩家把黏块推到右上目标完成胜利。

## Why Not Execution

这不是单纯按最近可推物执行的路线：两个目标分别消费同一组材料的两种状态。
左目标需要先 merge 再转箱，右目标需要保留/再生成 sticky 刚体并在 P/L 调整后送达。
底部左侧 `C` 是结构 ballast：不声称它是主动机制亮点，但 v7 去掉它后出现
`sticky_merge` 绕过，因此它用于封住非合并胜路。

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
```

## Falsification

- 若六组 central event probe 中任一组存在 winning bypass，则核心 claim 失败。
- 若 critic 认为底部 ballast crate 的存在读成任意堵路，而不是 compact state-shaping，需要降级或改图。
- 若 critic 认为 P/L 的末段移动只是连续操作 padding，而不是为右上目标重新设定施力侧，需要 revise。
- 若发现该布局/因果链复用 RA_CAND_0001 或 DUAL_LOCKSTEP_v2 的主要结构，应 reject/change family。
