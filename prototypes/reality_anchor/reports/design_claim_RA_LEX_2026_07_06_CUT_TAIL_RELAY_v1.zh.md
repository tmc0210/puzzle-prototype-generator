# Fresh Design Claim: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1

```yaml
prototype: reality_anchor
candidate_family: lexicon_cut_tail_relay
archive_lineage_policy: fresh_required
authorized_archive_variant_work: false
source_lexicon:
  - "B/S 解绑定债：用边界切割回收箱子资源"
  - "刚体黏块推进后的回返谱系"
  - "B/S 绑定债：从可分配箱子到形状化黏块（作为可能路线与局部 payoff，不声明所有胜路必经 sticky_merge）"
target_role: "后段 Reality Anchor 高目标候选；目标 difficulty >= 4、aesthetic >= 4，追求 4~5 分。"
```

## 设计目标

本轮不从 archive candidate、旧 run 或旧布局派生。候选目标是用 lexicon 语料组合出一条“切割尾债接力”：

1. 玩家要先把普通箱送入 sticky side，使它暂时失去普通箱自由度，成为可被刚体/黏性系统携带的材料。
2. 多格黏性刚体先在下层作为形状债移动，承担两个下层目标的最终覆盖压力；玩家不能只把一个普通箱推到上目标就结束。
3. 随后玩家把黏性竖条上推跨过 B/S 边界，触发 `sticky_to_box`，只回收顶格为普通箱，下面两格 sticky 继续留在下层目标。
4. 被回收的普通箱还必须继续被推送到上目标；切割不是胜利动画，而是制造最后一个可分配资源。

## 可攻击 Claim

```yaml
player_insight:
  - "玩家需要把普通箱先变成 sticky 材料，再把它切回普通箱；资源不是单向变换，而是先负债再回收。"
  - "下层两个目标要求保留 sticky 尾巴；若只追求把黏块切成箱子，会破坏下层覆盖。"
  - "回收出的 crate 仍需在 box side 推送到远端上目标，因此 `sticky_to_box` 是中段资源释放，不是终局一步。"
causal_chain:
  - "前段：移动 sticky 竖条/尾债，给后续下层覆盖和切割位置做准备。"
  - "中段：把 crate#1 推入 sticky side，触发 box_to_sticky，使普通箱暂时进入黏性材料链。"
  - "后段：将三格竖向 sticky 债务推到切割列，上推跨 B/S 边界，触发 sticky_to_box；下方 sticky 尾巴保留两个目标。"
  - "终段：释放出的 crate 在 box side 继续右推，覆盖上目标。"
why_not_execution:
  - "全胜路必须触发 box_to_sticky；否则普通箱没有先进入材料债。"
  - "全胜路必须触发 move_sticky_rigid；否则下层多格 sticky 债没有作为刚体被消费。"
  - "全胜路必须触发 sticky_to_box；否则没有回收普通箱资源。"
  - "全胜路必须在 sticky_to_box 之后仍有 crate push；否则切割没有被重新消费。"
  - "sticky_merge 出现在 returned trace 中，是可取的局部 payoff，但当前候选不把它声明为所有胜路必经。"
falsification:
  - "若存在不触发 box_to_sticky、move_sticky_rigid 或 sticky_to_box 的胜路，核心 claim 失败。"
  - "若存在 sticky_to_box 后不再 push crate 的胜路，'回收资源继续消费' claim 失败。"
  - "若删除任一目标后仍保留同等成本且不产生 missing-core-event bypass，该目标应删或重做。"
  - "若 critic 判断主要难度来自开放空间长走位，而不是切割尾债与资源回收，应降级或重做。"
```

## 计划证据问题

- solver 是否找到可复现胜路，且 trace 展示 box_to_sticky、sticky 刚体移动、sticky_to_box、post-cut crate push。
- all-solution group probe 是否证明 `box_to_sticky`、`move_sticky_rigid`、`sticky_to_box`、`push_object:crate#1` 必经。
- order/post-cut probe 是否证明不存在“先切割后才 box_to_sticky”的胜路，以及不存在切割后不再推 crate 的胜路。
- 多目标按 Reality Anchor `invalid_goal_prune` 做删除反事实；三个目标必须分别约束上目标 crate、下层 sticky 尾巴和核心事件链。
- graph complete / SCC facts 只作 evidence，不当作审美或难度 pass。
