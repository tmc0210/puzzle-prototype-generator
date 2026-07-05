# Designer Action: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1 human playtest

```yaml
source_candidate_version: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1
human_comment_id: HP_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_001
action: revise_structure
next_candidate_version: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2
review_loop_state_before: proposal_ready_with_caveats
review_loop_state_after_action: revise_required
```

## Human Feedback

```text
推拉锚点、推左边、拉右边 这三个事情似乎没有形成足够的顺序锁或因果关系。左边两个操作有一点先后关系，但是右边这个拉箱子看着像是纯拼接上来的无关部分，希望能建立更好的因果联系
```

## Action

`L05 v1` 标记为 rejected，不再作为待玩候选。`L05 v2` 重做空间关系：

- 保留 P/L 长边右向 pull + right push 的槽位核心。
- 将普通箱 pull 改成中层开路动作：玩家必须拉开中层箱，才能进入下绕并抵达左侧。
- 保留底部普通箱 push，但用墙形阻止它被 pull 替代。
- 保留中层目标；目标删除探针显示删掉它会让中层箱替代底部 push 职责，从而绕过普通箱 push。

## Evidence To Rerun

- full graph / layout analysis
- direction-aware all-winning-path probe
- P/L shift count probe
- goal-prune counterfactuals for top / middle / lower targets
- independent evidence review and puzzle critic review_2
