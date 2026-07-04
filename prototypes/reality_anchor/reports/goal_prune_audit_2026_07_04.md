# Reality Anchor 无效目标剔除审计：2026-07-04

## 范围

- Prototype: `prototypes/reality_anchor`
- Archive basis: `design_archive/index.yml` 中的 5 个 `clean_archive` 条目
- Workflow: `prototypes/reality_anchor/docs/goal_prune_check.md`
- 注意：这是 Reality Anchor 原型专属 archive cleanup，不写入通用 design review skill。

## 判定门槛

单删某个目标后，只有同时满足以下条件才删除：

- 原 `expected_trace` 仍合法并最终胜利。
- 最短解成本不下降。
- 完整图搜索为 `complete`。
- 核心事件组探针为 `complete`，且不存在缺少核心事件组的胜利路径。
- 若相邻目标单删都通过，继续检查组合删除，只保留能阻止绕过的最小目标集。

## 审计结果

| Candidate | Source | Removed target | Decision | Reason |
| --- | --- | --- | --- | --- |
| `RA_CAND_0001` | `RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3` | none | keep all | 删除任一目标都会降低 22 步成本；上目标删除还产生核心事件绕过。 |
| `RA_CAND_0002` | `RA_EXP_2026_07_04_SOFT_HANDOFF_v3` | none | keep all | 删除左目标降到 2 步并绕过核心事件；删除右目标虽保留 13 步但出现缺少 `sticky_merge` 的胜利路径。 |
| `RA_CAND_0003` | `RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6` | none | keep all | 删除上目标变成 0 步初始胜利；删除下目标降到 7 步并绕过 B/S shift。 |
| `RA_CAND_0004` | `RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3` | `[4, 4]` | pruned | 删除左底目标后仍为 7 步，完整图 complete，expected trace 仍胜利，核心事件仍全胜路必经。删除右底目标会降到 3 步并绕过核心事件。 |
| `RA_CAND_0005` | `RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4` | `[5, 2]` | pruned | 两个相邻上方目标单删任一格都保持 19 步和核心事件必要；组合删除两个上方目标会降到 17 步并绕过 pull，因此保留右侧上方目标 `[6, 2]`，删除左侧重复目标 `[5, 2]`。右端目标 `[9, 3]` 删除会降到 2 步并绕过核心事件。 |

## 更新后的 Layout

### RA_CAND_0004

```text
#########
###@SB.##
#P#..####
#L#.M.C##
####.G###
#########
```

### RA_CAND_0005

```text
###########
###.PL.####
##@BS.G####
###.MM...G#
#####..####
###########
```

## 保留的反事实摘要

```text
RA_CAND_0001 / DUAL_AXIS_LOCK_v3
- Remove G@5,1: cost 22->11, bypass misses B/S shift, pull, material normalization, sticky_merge.
- Remove G@7,3: cost 22->20, core events still required, but difficulty/route constraint weakened.
- Remove G@5,5: cost 22->20, core events still required, but difficulty/route constraint weakened.

RA_CAND_0002 / SOFT_HANDOFF_v3
- Remove G@3,2: cost 13->2, bypass misses B/S shift, material normalization, sticky_merge, sticky rigid move.
- Remove G@5,2: cost 13->13, but a winning path missing sticky_merge exists.

RA_CAND_0003 / FIXED_PL_SPLIT_LIFT_v6
- Remove G@4,2: cost 9->0, initial/zero-cost win.
- Remove m@4,4: cost 9->7, bypass misses B/S shift.

RA_CAND_0004 / FIXED_PL_DOWNPULL_SIDECAR_v3
- Remove G@4,4: cost 7->7, no core-event bypass, expected trace wins. Removed.
- Remove G@5,4: cost 7->3, bypass misses B/S shift, pull, box_to_sticky, sticky_merge.

RA_CAND_0005 / DUAL_LOCKSTEP_v4
- Remove G@5,2: cost 19->19, no core-event bypass, expected trace wins. Removed.
- Remove G@6,2: cost 19->19, no core-event bypass, expected trace wins. Equivalent single deletion, but retained for clearer right-side pull-world target reading.
- Remove both upper targets: cost 19->17, bypass misses pull. Not allowed.
- Remove G@9,3: cost 19->2, bypass misses P/L shift, pull, sticky_merge, sticky rigid move.
```

## 同步修改

- `prototypes/reality_anchor/levels.yml`
- `prototypes/reality_anchor/design_archive/candidates/RA_CAND_0004.md`
- `prototypes/reality_anchor/design_archive/candidates/RA_CAND_0005.md`
- `prototypes/reality_anchor/design_archive/index.yml`
- `prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_fixed_anchor_transitions.md`
- `prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_dual_lockstep.md`
- `prototypes/reality_anchor/docs/design_handoff.yml`
- `prototypes/reality_anchor/docs/goal_prune_check.md`
