# Revised Design Claim: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2

```yaml
candidate_version: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2
review_iteration: review_2
source_feedback: HP_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_001
archive_lineage_policy: fresh_required_with_human_feedback_revision
```

## Player Insight

玩家不能把顶部 P/L、底部 push、右侧 pull 当成三个并列清单。中层箱子的 pull 先打开下绕通路；这条通路让玩家抵达左侧完成底部 push，并最终回到 P/L 的 P 侧，把同一个水平 P/L 沿长边向右推到顶部目标。

## Causal Chain

1. 开局从 L 侧向右拉 P/L，使顶部目标仍等待后续 P/L push 覆盖。
2. 玩家下行到中层箱右侧，把中层箱向右拉到中层目标，打开下绕通道。
3. 通过打开的通道进入左下侧，将底部箱向右推到下方目标。
4. 返回顶部左侧后，从 P 侧向右推 P/L，让 P/L 右移覆盖顶部目标。

## Why Not Execution Only

这不是 v1 那种“顶部 P/L + 左箱 push + 右箱 pull”的拼接。普通箱 pull 的产物是路径开启；中层目标还防止这只开路箱继续替代底部 push。普通箱 push 的目标则让玩家必须处理底部箱，而不能只完成开路后回顶部。

## Required Events

- `anchor_pull_right`: `pull_object:push_pull_anchor` 且 P/L 坐标右移。
- `anchor_push_right`: `push_object:push_pull_anchor` 且 P/L 坐标右移。
- `crate_pull`: 任意普通箱发生 `pull_object:crate#N`。
- `crate_push`: 任意普通箱发生 `push_object:crate#N`。

## Forbidden / Non-Claims

- 不声明唯一输入序列。
- 不声明普通箱对象身份唯一；两个普通箱的身份只服务返回解说明。
- 不声明所有 P/L 可达交互都只有右向；核心主张是所有胜路必经右向 P/L pull 与右向 P/L push。
- 不声明完整全序；目标是补足 v1 缺失的因果责任，而不是构造高难单线谜题。

## Falsification

- 若存在缺少 `anchor_pull_right`、`anchor_push_right`、`crate_pull` 或 `crate_push` 的胜路，则核心机制主张失败。
- 若删除任一目标后没有成本下降，也没有核心事件绕过，则该目标应删除。
- 若 critic 仍认为普通箱 pull 只是附加动作而非路径开门，应继续结构修改。
