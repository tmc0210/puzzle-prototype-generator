# Design Claim: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2
role: challenge
support_level: none
revision_from_v1: >
  v1 critic 要求结构修订，主要问题是 sticky_merge 可绕过、repeated B/S 右推
  容易读成 padding。v2 在中段新增一个黏格，使 sticky_merge 进入全胜路必要事件组，
  同时保持 19 步而不走 v2_top_goal 的 34 步长回路。
archive_lineage_policy:
  default: fresh_required
  candidate_relation: fresh
  authorized_archive_variant_work:
    enabled: false
```

## Player Insight

```text
玩家必须把 B/S 当作材料相位闸门，而不是普通可推挡块。开局右推 B/S 会把两个黏格
拆成箱/黏混合债务；如果不先在下方把箱推回 sticky side 并合并，后续右侧 B/S/箱链
无法形成可拉可推的终局结构。P/L 的横向移动与最终 pull-down 共同决定何时可以从
push world 转入 pull 收束。
```

## Causal Chain

```text
1. 右推 B/S：触发 sticky_to_box:n2，制造底部箱/黏混合债务。
2. 下路推箱：触发 box_to_sticky:n1 + sticky_merge:n1，形成必要材料重组。
3. 重新定位并推动 P/L：改变 push/pull 分界，打开后续 pull 收束条件。
4. 下推 B/S：再次通过 force_chain 移动黏块并触发 sticky_merge。
5. 右移 B/S：把合并后的黏块逐步转箱，为右侧目标旁的 crate/B/S 链做准备。
6. pull crate 覆盖中间目标；再推 crate/B/S 链，使 S 覆盖右目标。
7. 最后 pull P/L 下移，使 P/L 覆盖左/中双目标，完成三目标收束。
```

## Why Not Execution

```text
完整事件探针证明所有胜路都必须同时包含：
P/L shift、B/S shift、pull、material normalization、sticky_merge、sticky rigid movement。
v2 不再依赖 returned-route-only 的 sticky_merge；材料合并成为全胜路硬门槛。
图上 forced viable prefix 从 v1 的 3/10 降到 1/10，开局不再主要靠强制脚本推进。
```

## Falsification

```text
- 如果存在胜路绕过 sticky_merge 或任一 central event group，claim 失败。
- 如果 critic 仍认为 B/S 连续右移只是同向 padding，而不是合并材料被逐步转换并消费，
  则 role fit 仍需降级或继续改结构。
- 不声明唯一解、不声明具体对象身份必要性、不声明数值审美/难度。
```

## Evidence Summary

```yaml
solver:
  cost: 19
  explored_states: 1169
  inputs: right down right left up up right down left down right right right up left down right up down
graph:
  status: complete
  reachable_states: 4993
  winning_states: 93
  compressed_regions: 725
  sccs: 390
  solution_irreversible_steps: 6
  forced_win_prefix: 1/6
  forced_viable_prefix: 1/10
event_probe:
  status: complete
  found_bypass: false
  required_groups:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
    - sticky_merge
    - sticky_rigid_move
```
