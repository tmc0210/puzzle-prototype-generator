# Design Claim: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1
role: challenge
support_level: none
archive_lineage_policy:
  default: fresh_required
  candidate_relation: fresh
  authorized_archive_variant_work:
    enabled: false
  why_not_archive_variant: >
    候选使用水平 P/L 与水平 B/S 的横向 lockstep 压缩结构，不继承
    RA_CAND_0001 的竖直 P/L + 水平 B/S、上目标黏性把手或下方把手因果链。
```

## Player Insight

```text
玩家要读出两个锚点不是“各做一次”的装饰，而是同一条横向锁步链：
B/S 先把材料相位切成可搬运债务，P/L 再改变可用力学模式；中段必须把黏块/箱
和 B/S 一起推进成可被后续 pull 消费的右侧收束结构，最后再把 P/L 拉下盖住双目标。
```

## Causal Chain

```text
1. 第一手推动 B/S，立刻把一个黏格转为箱，打开右侧材料债务。
2. 推动 P/L 改变横向推/拉分界，否则后续无法进入右侧 pull 收束。
3. 向下推动 B/S 触发 force_chain 和 sticky rigid movement，把中层黏格挤入底部链。
4. 返回最短解在底部推箱，触发 box_to_sticky + sticky_merge，形成三格黏块。
   事件探针显示 sticky_merge 不是全胜路硬门槛，所以它只作为返回解的结构亮点，
   不作为 central all-solution claim。
5. B/S 连续右移，把黏块逐步转成箱并把右目标附近变成可拉/可推的收束形态。
6. pull crate 覆盖中间目标；随后推 crate/B/S 链使 S 覆盖右目标。
7. 最后在 pull 世界中拉 P/L 下移，使 P/L 覆盖左/中双目标并收束。
```

## Why Not Execution

```text
该题的难点不是走廊长度。完整事件组探针证明所有胜路都必须同时经历：
P/L 锚点移动、B/S 锚点移动、pull、材料归一化、sticky rigid movement。
玩家若只把 B/S 当可推挡块、只把 P/L 当终点盖子，或忽略中段材料相位债务，
会得到局部可行动作但无法完成三目标覆盖。
```

## Falsification

```text
- 如果存在胜路绕过 P/L shift、B/S shift、pull、material normalization 或
  sticky rigid movement，则 central mechanism claim 失败。
- 如果 critic 判断玩家主要靠线性执行或最近 affordance，而不需要理解双锚点锁步，
  则后期高难 role claim 失败或需要降级。
- sticky_merge 只允许写成返回最短解事件和审美亮点；不能写成全胜路必要事件。
```

## Evidence Summary

```yaml
solver:
  cost: 19
  explored_states: 708
  inputs: right up right down left down down right left up right right right up left down right up down
graph:
  status: complete
  reachable_states: 2453
  winning_states: 174
  sccs: 186
  solution_irreversible_steps: 6
event_probe_core:
  status: complete
  found_bypass: false
  required_groups:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
    - sticky_rigid_move
event_probe_full:
  sticky_merge: bypass exists; not a central all-solution claim
```
