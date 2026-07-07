# Experiment: RA_CURR_2026_07_05_box_sticky_curriculum

```yaml
experiment_id: RA_CURR_2026_07_05_box_sticky_curriculum
prototype: reality_anchor
status: accepted_partial
selected_candidates:
  - RA_CAND_0012
  - RA_CAND_0013
  - RA_CAND_0014
  - RA_CAND_0016
source_candidate_versions:
  - RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2
  - RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1
  - RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3
  - RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3
human_final_status: accepted_partial
archive_eligibility: clean_archive
```

## Summary

本记录保存当前课程中 B/S 的短教学与 timing witness：

- `L07_FIXED_BS_STICKY_RIGID_v2`：两格 sticky 先拼接再作为刚体移动，是“黏块会拼接并一起移动”的极短 witness。
- `L09_FIXED_BS_CUT_v1`：竖向 sticky 跨过固定 B/S 后上格变箱，随后切出的箱子被单独推上目标，是固定 B/S 切割的极短 witness。
- `L08_FIXED_BS_JOIN_v3`：普通箱跨过固定 B/S 转为 sticky，并与下方 sticky 拼接后作为刚体覆盖目标，是固定 B/S 拼接转化 witness。
- `L10_MOVABLE_BS_TIMED_JOIN_CUT_v3`：可移动 B/S 的强引导合并再切割教学，要求先 sticky_merge，再移动 B/S 切割并用 sticky 刚体收束。

前三者人类最终评价均为审美 2 / 难度 1；L10 v3 为审美 3 / 难度 2。归档用途是机制教学下界、critic/designer 校准；它们不应被当作高密度挑战或高审美样本。

## Key Refs

- `prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2_review2.zh.md`
- `prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_review1.zh.md`
- `prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_review3.zh.md`
- `prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_review2.zh.md`
