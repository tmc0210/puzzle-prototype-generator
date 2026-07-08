# Experiment: RA_LEX_2026_07_08_playtest_feedback

```yaml
experiment_id: RA_LEX_2026_07_08_playtest_feedback
prototype: reality_anchor
status: accepted_partial
selected_candidates:
  - RA_CAND_0020
  - RA_CAND_0021
  - RA_CAND_0022
  - RA_CAND_0023
  - RA_CAND_0024
source_candidate_versions:
  - RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1
  - RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2
  - RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim
  - RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim
  - RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim
human_final_status: accepted_partial
archive_eligibility: clean_archive
```

## Summary

本记录保存 2026-07-08 待玩列表中已有反馈的候选后处理：

- `SPLIT_BRIDGE_DUAL_ENDPOINT_v1`：人类评价为简单的大黏块拆分关，审美 3 / 难度 2；价值在几何对称性支撑三个重复分支，归档为固定 B/S sticky split 的强 3 下界样本。
- `RATCHET_SPLIT_TOOTH_v2`：人类评价为还算有趣的常规关，审美 3 / 难度 3；价值在用 P/L 强行推动大黏块的特殊结构，归档为修订后可用样本。
- `PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim`：人类要求删除 v2 右侧冗余外墙后按审美 5 / 难度 4 直接归档；价值在反直觉死角送箱、拉锚点反向送入目标、空间利用率高和短流程强洞见。
- `BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim`：人类评价为审美 3 / 难度 3；核心概念简单且依次处理三个箱子略有重复，但几何紧凑，下推黏块组制造了额外读题混淆，归档为简单应用下界样本。
- `PULL_BRUSH_RETURN_v4_wall_trim`：人类评价为审美 1 / 难度 3；工具证据和 critic 看似支持，但玩家侧只得到推拉腾挪，双锚点和三黏块信号抬高期待却没有相应洞见，归档为 metric/probe blind spot 负向反例。

未进入本归档的反馈处理：

- `BRUSH_TRIPLE_OUTPUT_v2` 收到“过多冗余外墙”反馈，已形成 `RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim`；该修订版在本次复玩后归档为 `RA_CAND_0023`。
- `OVERSHOOT_CUT_DUAL_POCKET_v2` 收到 reject 状态且无文字评语，已从待玩列表移除并标记为 rejected，不作为 clean archive。

## Key Refs

- `prototypes/reality_anchor/reports/candidate_packet_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_review1.zh.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2.md`
- `prototypes/reality_anchor/reports/designer_action_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_human_feedback.zh.md`
- `prototypes/reality_anchor/reports/designer_action_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim_human_feedback.zh.md`
- `prototypes/reality_anchor/reports/candidate_packet_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_review1.zh.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.md`
