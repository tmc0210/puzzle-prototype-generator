# Fresh Design Claim: RA_EXP_2026_07_04_COMPACT_DUAL_MATERIAL_CHAIN_v0

```yaml
prototype: reality_anchor
candidate_family: compact_dual_material_chain
archive_lineage_policy: fresh_required
role: challenge
allowed_exposure_through: all_current_reality_anchor_runtime_rules
target_style: lower-burden late-game challenge candidate
reason_for_family_change: >
  CROSS_LATCH v1/v2 evidence passed but critic required structural_revision because P/L was not player-central enough.
  This family lowers the design claim to a compact dual-anchor material chain.
human_archive_context:
  positive_anchor:
    - RA_CAND_0001
  negative_anchor_none_found: true
score_policy: unscored_missing_negative_human_archive_context
```

## Context Boundary

`RA_CAND_0001` 仍只作为口味校准：机制多样、设计密度高、强耦合、玩家视角矛盾明显。它不授权复用布局、目标关系、对象角色或因果链。CROSS_LATCH v1/v2 只作为失败模式：不要把“事件组必要”误写成“玩家必须读出全局互锁”。

## Player Insight

玩家应读到一个紧凑材料链，而非开放式全局互锁：

- B/S 决定某个对象何时从箱变 sticky 或从 sticky 变箱。
- P/L 决定玩家何时能拉动锚点、材料或箱子进入目标通道。
- 两个锚点都要移动，但 P/L 可以是局部通道债务，不必须成为贯穿全局的主角。
- 关键不是长规划，而是意识到“目标覆盖物不是初始对象身份，而是经过 B/S 改性的材料”。

## Causal Chain To Attempt

1. 短开局让玩家接触其中一个锚点，立刻产生材料或通道变化。
2. 中段必须用另一个锚点改变站位/边界，使材料转换可以被消费。
3. 至少一个目标由改性后的 crate/sticky 覆盖；另一个目标可由锚点或材料收束。
4. 如果有 sticky_merge，它应该出现在目标覆盖前的可见材料整理中，而不是只作为无关事件。
5. 路线希望 12-18 步左右，但允许更短或稍长；走位需要服务重定位，不应成为主要难度。

## Required / Forbidden Claims

Required if submitted:

- 同关有一个 P/L 和一个 B/S，两者都发生 shift。
- 返回解展示 `pull_object`、两类 `anchor_boundary_shift`、`material_normalization`。
- 优先要求 `sticky_merge` 与 `move_sticky_rigid` all-solution 必经；如果某一项无法保住，必须明示降级并让 reviewer/critic 判断。
- 完整图或受限完整 probe 不得留下核心事件 bypass。

Forbidden unless separately proved:

- 不声明唯一解。
- 不声明对象身份、事件顺序或逐目标覆盖身份在所有胜路中固定。
- 不声明 cross-latch / 全局互锁 / 开放规划。
- 不把 graph complete 或 event gate 当作审美优点。

## Falsification Questions

- 是否存在任一锚点不移动的胜路？
- 是否存在没有 material normalization 的胜路？
- sticky_merge / sticky_rigid_move 是否只是返回解装饰而非所有胜路必要？
- critic 是否认为路线仍主要靠局部脚本执行，而材料链读法不清楚？
- 是否能向玩家清楚展示“改性材料覆盖目标”的 payoff？

## Tool Questions

- `explain-layout`：返回解长度、事件计数、图完整性、SCC/scriptiness。
- `probe_dual_axis_candidate.ts`：核心六事件组 all-solution bypass 检查。
- `trace_layout.ts`：生成关键步骤 snapshot，检查材料身份变化和目标覆盖 payoff。

