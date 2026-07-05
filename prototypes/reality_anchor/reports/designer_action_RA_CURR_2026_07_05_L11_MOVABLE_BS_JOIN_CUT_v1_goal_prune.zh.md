# Designer Action: L11 v1 goal prune

原始 L11 v1 有两个目标，其中上方目标位于 B/S 第二次横移后会顺路覆盖的位置。

删除上方目标后，`layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_JOIN_CUT_v1_no_top_goal.md` 返回同一条 13 步解，核心事件序列不变；`event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_JOIN_CUT_v1_no_top_goal_core.md` 仍然 complete/no bypass，所有胜路仍需要 B/S shift、box_to_sticky、sticky_merge、sticky_to_box、move_sticky_rigid、crate push。

因此上方目标属于“恰好在关键目标链中顺路完成的子目标”，按本原型无效 goal 剔除流程删除。清理后的单目标版本升为 `RA_CURR_2026_07_05_L11_MOVABLE_BS_JOIN_CUT_v2`。
