# Designer Correction: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned

candidate_version: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned
supersedes: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned
designer_action: correct_prune_and_keep_out_of_playable
review_loop_state: held_for_redesign_or_re_review
archive_eligibility: not_eligible

## Correction

用户指出右上区域不应按冗余格裁剪。复核后确认：这是正确的。

此前 `v2_space_pruned` 把 `[6,1], [7,1], [8,1]` 墙化，违反了 Reality Anchor 冗余空间裁剪的优先级：应优先裁单连通死角 / 单入口 pocket，而右上区域并不是这种结构。它与右侧目标、主走廊附近空间多点连通，保留它能减少过度线性化。

## Corrected Action

- 右上区域恢复为 floor。
- 仅裁掉 B/S 两侧 side pockets。
- `levels.yml` 中记录改为 `RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned`。
- 该候选仍不加入 `playable_levels.yml`，因为修正版虽然证据干净，但还没有经过新的 independent quality review，也仍有 forced-prefix 风险。

## Corrected Layout

```text
##########
#@.#G#...#
#.CC....G#
####....##
####BS####
##########
```

## Current Evidence Snapshot

- shortest cost 17
- graph complete
- reachable states 397
- legal transitions 982
- winning states 1
- core5 complete/no bypass
- box_to_sticky min2 complete/no bypass
- no cut before merge complete/no violation
- fixed B/S scan: no reachable `anchor_boundary_shift:box_sticky`

## Files

- Corrected prune audit: `prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned.zh.md`
- Corrected layout: `prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_layout.txt`
- Main analysis: `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned.md`
