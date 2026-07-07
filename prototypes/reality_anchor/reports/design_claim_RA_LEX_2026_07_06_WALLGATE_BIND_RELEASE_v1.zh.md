# Fresh Design Claim: RA_LEX_2026_07_06_WALLGATE_BIND_RELEASE_v1

```yaml
prototype: reality_anchor
candidate_family: lexicon_wallgate_bind_release
archive_lineage_policy: fresh_required
authorized_archive_variant_work: false
source_lexicon:
  - "P/L 横向把手的墙格门"
  - "B/S 绑定债：从可分配箱子到形状化黏块"
  - "B/S 解绑定债：用边界切割回收箱子资源"
  - "刚体黏块推进后的回返谱系（作为后续站位/把手约束）"
target_role: "Reality Anchor 后段挑战候选；目标 difficulty >= 4，aesthetic >= 4，追求 4~5。"
```

## 设计目标

上一版 `CUT_TAIL_RELAY` 被 critic 判定为固定 B/S cut witness 的拉长版。本 family 改为双 anchor 互锁：

1. P/L 不是背景世界切换，而是横向把手门：玩家需要通过 pull / P/L shift 改变可达站位或锚点占位。
2. B/S 不是单纯切割线，而是让可分配 crate 变成形状化 sticky 债，再释放成可分配资源。
3. 两者应互相改变意义：P/L 位移让 B/S 材料债可被消费，B/S 绑定/释放反过来提供 P/L 末段目标或把手。
4. 难度应来自资源拓扑重读，而不是长走位、目标硬塞或单一固定 witness 延长。

## 可攻击 Claim

```yaml
player_insight:
  - "玩家必须把 P/L 当成站位门/把手门，而不只是推拉规则标签；锚点位移改变之后 B/S 材料链才可继续。"
  - "crate 需要先失去分配自由，变成 sticky 形状债；之后再通过 B/S 解绑定回收为可分配资源。"
  - "P/L 与 B/S 的事件不能只是并列清单；至少一个关键阶段应让其中一个 anchor 的结果成为另一个 anchor 的前提。"
causal_chain:
  - "前段：通过 P/L pull 或横向把手移动，改变站位/锚点占位。"
  - "中段：触发 B/S 位移或材料规范化，把 crate / sticky 组合成可被刚体消费的形状。"
  - "后段：通过 sticky rigid move、sticky_merge 或 sticky_split/sticky_to_box，把形状债重新释放或递送。"
  - "终段：释放资源或 anchor 占位覆盖目标，体现双 anchor 互锁后的 payoff。"
why_not_execution:
  - "全胜路至少应需要 push_pull_anchor_shift、pull_object、box_sticky_anchor_shift 与 material_normalization。"
  - "若没有 sticky rigid / sticky_merge / sticky_to_box 之一成为全胜路必要事件，说明 B/S 只是名义转换，应降级或重做。"
  - "若走位超过半数且核心事件分散成互不影响的 checklist，说明只是复杂度堆叠。"
falsification:
  - "存在缺少 P/L shift、pull、B/S shift 或材料转换的胜路，则 family claim 失败。"
  - "存在目标删除后成本不降且核心事件仍必要，则目标应删后重审。"
  - "critic 若判断像 RA_CAND_0006 的路线硬化或像 RA_CAND_0013 的 witness 延长，不能提交。"
```

## 计划证据问题

- solver 是否找到 14~30 步内的双 anchor 互锁胜路。
- all-solution probe 是否证明 P/L shift、pull、B/S shift、material normalization 必经。
- sticky rigid / merge / split / sticky_to_box 是否至少一项全胜路必经，并能在 trace 中看到后续消费。
- graph 是否 complete；SCC 只作为拓扑证据，不作为审美结论。
- 多目标版本必须跑 Reality Anchor `invalid_goal_prune`。
