# Designer Action: L11 relay-cut v1 human feedback

level_id: RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1
status: rejected
action: remove_from_playable

## 人类反馈

这关被打回。虽然工具指标显示 `box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid` 等事件必要，但这些事件没有形成有效谜题语义：黏块拼接是顺手触发的无意义现象，箱子变黏后被黏在角落里，没有再作为“被转化后的对象”被移动或消费。

## 设计结论

不能把“事件出现且全胜路必要”直接等同于“黏箱转化有效”。本槽位后续候选必须满足更强标准：

- 切割下来的箱子需要真的被拆出并挪作它用，或承担目标/通路/阻挡等后续职责。
- 新黏上的黏块需要改变可达性、刚体结构、可推动形状、拉动把手或其他后续操作条件。
- 如果转化只让玩家分别把箱子和黏块推进两个目标，即使事件 probe 通过，也视为 witness 而非合格应用题。

## 已执行

- `levels.yml` 中该关状态改为 `rejected`。
- `playable_levels.yml` 中移除该关。
- 第十一关槽位回到未完成状态，下一轮优先重做。
