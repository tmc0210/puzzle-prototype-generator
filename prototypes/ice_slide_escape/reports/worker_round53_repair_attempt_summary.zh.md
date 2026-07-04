# worker_round53 v4 修复尝试摘要

本轮目标是沿 `worker_round53_v4` 修两个 caveat，而不是重新随机找草案：

1. D 必须处在 d6-only 空间；A->D / B->D 不可解，或至少不能 walk-only。
2. meta 的 d6 产物或破坏结果必须改写 d4 门核，特别是 `[2,3]` 左反弹障碍不能继续只是静态墙，避免 C->D 只是 d6 开入口后复做 base。

本轮没有找到合格 v5/v6。下面两个 worker probe 是有用几何素材，但均未达候选门槛。

## probe 1：`worker_round53_probe_shaft_layout.txt`

```text
############
#..#......I.
##.#########
.#I.*....###
....#......#
##..#.......
##..#.....##
#####.######
#####.######
```

意图：

- 把 `[2,3]` 从静态墙改成冰障碍。
- C 的 d6 打开上方后，尝试让 C 必须通过 `[2,3]` 竖井，从而移动/复位这枚障碍冰。

结果：

- A `[0,4]` -> B `[5,8]` 可解，cost 19，仍是两次 d4；但初始区域多了死分支。
- C `[11,1]` -> D `[11,5]` 完整搜索不可解。
- 手动 replay 显示关键矛盾：若从 `[2,2]` 把 `[2,3]` 往下推，当前距离会触发 `ice_destroyed_d3`，左反弹障碍消失；若改成 d1/d2 停住，又很难同时让 d6 产物重新占据 `[2,3]`，因为产物或站位会互相堵住。

## probe 2：`worker_round53_probe_two_target_layout.txt`

```text
##..########
##.#......I.
##..########
##*.*....###
....#......#
#####.......
#####......#
#####.######
#####.######
```

意图：

- 把 `[2,3]` 进一步改成目标冰：base 中它是左反弹障碍；meta 中先把中央目标 `[4,3]` 右推成 target debt，再把 `[2,3]` 目标冰下移到 `[2,4]` 作 stopper，最后从上方用 d6 产物落回 `[2,3]`，使 d6 产物替代原 rebound obstacle。

已跑命令与关键结果：

```text
npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape - --id worker_round53_probe_two_target_base --player-start "0,4" --player-goal "5,8" --max-states 120000 --graph-max-states 120000
```

- A `[0,4]` -> B `[5,8]` 可解，cost 19，两次 `ice_rebound_d4`。

```text
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_probe_two_target_layout.txt --id worker_round53_probe_two_target_base_no_late --player-goal "5,8" --starts "0,4" --required-winning-events ice_rebound_d4 --forbidden-reachable-events ice_pass_through_d5,slide_restart_after_group,ice_destroy_group_d6_plus --max-states 200000 --graph-max-states 200000
```

- fail：base 可达图完整，但命中 forbidden reachable `ice_pass_through_d5:len2`。

```text
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_probe_two_target_layout.txt --id worker_round53_probe_two_target_meta_required_D_top --player-goal "2,0" --starts "11,1" --required-winning-events ice_destroy_group_d6_plus,slide_restart_after_group,ice_rebound_d4 --max-states 200000 --graph-max-states 200000
```

- fail：C `[11,1]` -> D `[2,0]` 有 cost 10 的短胜路，只用初始 d6 + walk，缺少 required `ice_rebound_d4`。

```text
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_probe_two_target_layout.txt --id worker_round53_probe_two_target_pair_goal_D_top --player-goal "2,0" --starts "0,4" "5,8" "11,1" "2,0" --max-states 200000 --graph-max-states 200000
```

- fail：A `[0,4]` -> D `[2,0]` cost 8 walk-only；B `[5,8]` -> D 不可解；C->D 是 d6 后 walk；D 自身零步。

手动 replay 结论：

- 预期链条中，d6 产物确实可以从上方落回 `[2,3]`，替代原左反弹障碍。
- 但中央目标左推回封后，玩家被留在右侧；若 D 设在上方替换站位，回封后回不到 D。
- 若 D 设在上方替换站位，回封前又太早可达，导致 C->D 缺 d4。
- 若 D 设回右侧，则还需要一个只由 meta 产生、base 不可触发的右侧 D 开门动作。

## 最小几何矛盾

当前 v4 骨架里存在一个三向拉扯：

- `[2,3]` 要作为 base 的左 d4 反弹障碍，且 base 不得能触发 d5/d6。
- meta 若让 d6 产物替代 `[2,3]`，上方必须有一个站位把 d6 产物向下推；这个站位若在边缘，就会天然变成过早 D 或 external escape。
- 中央目标回封后，玩家位于右侧；因此最终 D 最自然应在右侧。但右侧 D 若初始开放，B->D walk-only；若封住，又需要一个只由 meta 产生、base 不可触发的 D 开门动作。

因此下一步最小结构约束应是：

1. 把 d6 产物替代 `[2,3]` 的“上方站位”内移，不能是 edge cell。
2. D 应保留在右侧/右下，因为最终回封中央目标后玩家在右侧。
3. 右侧 D 开门应由 meta-only 产生的第二状态完成，理想上使用 `[2,3]` 原目标冰下移后的旧冰，或另一个只在 meta 目标债阶段才可释放的冰；不能使用 base 右侧可直接触发的静态 d6 launcher。
4. 若继续沿这个 family，可能需要整体下移一行：让 d6 产物停在 `[2,2]`、内部站位在 `[2,1]`，从而避免上方替换站位成为 D/edge escape。

未调用 independent reviewer / critic；本文件只是 worker 修复记录。
