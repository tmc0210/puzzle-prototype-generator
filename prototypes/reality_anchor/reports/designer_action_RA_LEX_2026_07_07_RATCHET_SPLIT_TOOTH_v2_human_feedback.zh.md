# Designer Action: RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2

```yaml
source_candidate: RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1
new_candidate: RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2
trigger: human_playtest_feedback
designer_action: revise_structure
review_loop_state: revise_required_for_human_playtest
review_integrity: human_feedback_plus_tool_rerun
archive_eligibility: human_pending
full_independent_review_skipped: true
skip_reason: 人类修改意见明确，改动面为 P/L 起始位置上移；已重跑完整图、核心事件旁路和计数 probe。
```

## 人类反馈

```text
推拉锚点应该可以贴上边，这样误导性会强很多，现在推拉锚点摆中间开局动作有些显然了。
```

## 修改

将 P/L 从中间行上移到上边缘，玩家起点保留在右侧观察位。

```text
##########
###G##LP.#
##..MM..@#
#...M....#
#...MM####
#.BS######
##########
```

## 验证摘要

- `explain-layout` complete：359 reachable states / 919 legal transitions / 2 winning states，与 v1 图规模一致。
- 最短解 17 步，先接近并下拉上边缘 P/L，随后进入原 split-tooth 主干。
- `core6` probe complete/no bypass：所有胜解仍必须包含 P/L pull、P/L shift、force-chain、sticky_to_box、sticky_split、sticky rigid movement。
- P/L shift 计数 probe complete/no bypass below 6。
- sticky rigid 计数 probe complete/no bypass below 3。

## 证据文件

- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2.md`
- `prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2_core6.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2_pl_shift_min6_anchor_boundary_shift_push_pull_min6.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2_rigid_min3_move_sticky_rigid_min3.md`

## 后续状态

v2 替换 v1 回到待玩列表。因为这是明确人类反馈下的几何修订，不在本轮声明为 `proposal_ready` 或 clean archive；待人类复玩后再决定归档、继续修改或重跑完整 review。
