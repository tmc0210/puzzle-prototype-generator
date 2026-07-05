# Fresh Design Claim: RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1

本候选服务于 `prototypes/reality_anchor/docs/关卡规划.md` 的第九关槽位：固定 B/S，无 P/L，实际用箱黏转化完成切割。

本设计不是从已归档关卡或已拒绝候选改写而来。它使用固定 B/S 水平材料边界：玩家先把竖向黏块上推到边界，上半格进入 B 侧后转为箱子，下半格留在 S 侧；随后玩家绕到箱子左侧，将这个切割出的箱子单独推到目标。

## Layout

```text
########
########
##B..G##
##S..###
###.M###
####M###
####@###
########
```

## 核心主张

- 无 P/L；默认 push world。
- B/S 固定，所有可达状态中没有 B/S anchor shift。
- 所有胜路都必须包含 `sticky_to_box`、`move_sticky_rigid` 和 `push_object:crate#1`。
- 切割不是装饰：初始没有箱子，`push_object:crate#1` 只能发生在黏块上半格跨入 B 侧转箱之后；目标只能由这个切割出的箱子单独推入。

## Goal Prune

单目标关卡，`invalid_goal_prune` skipped；不存在可删除的额外目标。
