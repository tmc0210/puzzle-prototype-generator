# Goal Prune: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2

```yaml
candidate_version: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2
status: clean
targets:
  - name: upper_pull_destination
    coord_xy: [5, 2]
    retained: true
  - name: lower_vacate_recover_target
    coord_xy: [5, 3]
    retained: true
```

## Main

- 主图 complete，20 reachable states / 33 transitions / 1 winning state。
- 最短解 cost 10。
- 返回 trace：先 `push_object + force_chain:n2`，再两次 `pull_object`；下目标先被覆盖、再腾空、最后回填。

## Target Deletions

- 删除上目标 `[5,2]`：complete，cost 从 10 降到 1；第一步整链推送后下目标已覆盖，整个 vacate/recover 债消失。
- 删除下目标 `[5,3]`：complete，cost 从 10 降到 5；只需把箱子上拉到上目标，最后的回填责任消失。

## Interpretation

两个目标不是两个并列端点任务。下目标需要先被第一步覆盖，再被上拉动作主动腾空，最后由剩余箱子横向回填。删除任一目标都会破坏这条共享状态链。
