# Fresh Design Claim: RA_EXP_2026_07_04_CROSS_LATCH_v0

```yaml
prototype: reality_anchor
candidate_family: cross_latch
archive_lineage_policy: fresh_required
role: challenge
allowed_exposure_through: all_current_reality_anchor_runtime_rules
target_style: compact late-game candidate, slightly lower burden than the hardest prior proposals
human_archive_context:
  positive_anchor:
    - RA_CAND_0001
  negative_anchor_none_found: true
score_policy: unscored_missing_negative_human_archive_context
```

## Context Boundary

本轮只把 `RA_CAND_0001` 的人类评语作为口味校准：机制使用多样、设计密度高、各要素强耦合、玩家视角矛盾明显。它不作为结构起点；不复用其布局、入口、目标位、对象角色或因果链。当前没有 clean human-reviewed 负例或下界样本，因此本轮不输出数值审美或难度判断。

## Player Insight

玩家应读到两个锚点不是顺序按钮，而是交叉闩锁：

- P/L 先改变可 pull 的方向或站位窗口，使玩家能接触到 B/S 或被 B/S 改性的材料。
- B/S 随后改变材料世界，把箱/黏状态变成回程钥匙。
- 回程时，玩家必须再次消费 P/L 或 B/S 的位置变化，把已经改性的材料送到目标，而不是把任一锚点当作一次性门锁。

目标体验是“先开路、再改性、再用改性物回头关门”。难度希望略低于最硬的终局样本：路线可短一些，但每个关键移动都要改变局面。

## Causal Chain To Attempt

1. 初始局面同时有且仅有一个 P/L 和一个 B/S，二者均参与目标覆盖或路径开关。
2. 前段要求至少一次 `anchor_boundary_shift:push_pull`，使 pull-side 的可达窗口改变。
3. 中段要求至少一次 `anchor_boundary_shift:box_sticky`，并触发 `box_to_sticky` 或 `sticky_to_box`。
4. 关键材料必须以 sticky rigid movement 或 sticky merge 的形式被重新组织，形成可见的回程钥匙。
5. 收尾目标覆盖不能只由一个锚点静态挪到目标上完成；至少一个目标应由改性后的 crate/sticky material 覆盖，另一个目标可由锚点或材料覆盖。

## Required / Forbidden Claims

Required if submitted:

- 两个不同锚点各一个：P/L 与 B/S 同关出现并都发生 shift。
- 返回解展示 `pull_object`、两类 `anchor_boundary_shift`、`material_normalization`。
- 若可行，证明 `sticky_merge` 与 `move_sticky_rigid` 也在所有胜路中必经；若不可行，claim 必须降级并由 reviewer 判断是否仍够强。
- 完整图或受限完整 probe 不得留下核心事件 bypass。

Forbidden unless separately proved:

- 不声明唯一解。
- 不声明具体对象身份在所有胜路中必经。
- 不声明每个目标的覆盖对象身份必经。
- 不把纯走位 padding 或最后一推锚点当作核心设计张力。

## Falsification Questions

- 是否存在不移动 P/L 或不移动 B/S 的胜路？
- 是否存在不触发 material normalization 的胜路？
- 是否存在只靠锚点覆盖目标、绕开材料回程钥匙的胜路？
- 是否存在明显更短且只像执行脚本的路线，使“交叉闩锁”读法退化成单线按钮序列？
- 图是否完整；若不完整，哪些 claim 必须降级为 unknown？

## Tool Questions

- `explain-layout`：求解、返回解长度、事件计数、完整图状态、SCC/guided risk。
- `probe_dual_axis_candidate.ts`：对 P/L shift、B/S shift、pull、material normalization、sticky merge、sticky rigid movement 做 all-solution bypass 检查。
- `trace_layout.ts`：生成关键步骤 snapshot，检查玩家视角是否能读到“开路 -> 改性 -> 回程”的相位。

