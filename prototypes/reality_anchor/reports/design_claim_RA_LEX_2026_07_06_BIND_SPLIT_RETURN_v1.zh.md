# Fresh Design Claim: RA_LEX_2026_07_06_BIND_SPLIT_RETURN_v1

```yaml
prototype: reality_anchor
candidate_family: lexicon_bind_split_return
archive_lineage_policy: fresh_required
authorized_archive_variant_work: false
source_lexicon:
  - "B/S 绑定债：从可分配箱子到形状化黏块"
  - "B/S 解绑定债：用边界切割回收箱子资源"
  - "刚体黏块推进后的回返谱系"
target_role: "后段 Reality Anchor 高目标候选；目标 difficulty >= 4、aesthetic >= 4，追求 4~5 分。"
```

## 设计目标

本轮不从 archive candidate、旧 run 或旧布局派生。候选目标是把三个 lexicon 语料串成同一条资源债逻辑链：

1. 玩家先把可分配普通箱送入 sticky side，使它们正交接触并绑定成一个 footprint 明确的黏性刚体；此时获得形状工具，也失去分别摆放箱子的自由。
2. 该刚体必须先作为工具承担空间责任，例如宽塞、把手、桥接、门闩或目标保持；不能只是被制造出来后立刻切开。
3. 玩家随后用 B/S 边界切割这个刚体，回收至少一个普通箱，同时保留 sticky 尾债或释放出的箱子形状；回收物和残余物都要继续影响终局。
4. 关卡难度不靠长腾挪或目标位置硬化，而靠“先合并才有工具、后切割才有资源、残余仍有债”的状态重读。

## 可攻击 Claim

```yaml
player_insight:
  - "进入 sticky side 的箱子不是简单换名；玩家要把多个箱子绑定成一个刚体工具，并接受资源分配自由被锁住。"
  - "同一个刚体在被切开前必须承担一次非终局职责；过早切割或只把它当目标填料会失败。"
  - "切割不是收尾动画；sticky_to_box 回收出的普通箱与剩余黏块/形状都要被重新消费。"
causal_chain:
  - "前段：普通箱跨 B/S 边界触发 box_to_sticky，并与另一个 sticky/crate 转化物 sticky_merge，形成刚体。"
  - "中段：合并刚体被推进到受限口或把手位，触发 move_sticky_rigid，并承担门/目标/站位职责。"
  - "后段：刚体跨回 box side 或被 B/S 边界扫过，触发 sticky_to_box / sticky_split，释放普通箱资源。"
  - "终段：释放箱子与残余 sticky 分别完成不同目标或空间责任。"
why_not_execution:
  - "如果存在不触发 box_to_sticky 的胜路，绑定债失败。"
  - "如果存在不触发 sticky_merge 或 move_sticky_rigid 的胜路，形状化工具没有成为核心。"
  - "如果存在不触发 sticky_to_box 的胜路，解绑定/回收债失败。"
  - "如果删除任一目标后核心绑定或切割事件可绕过，该目标应删或重做。"
falsification:
  - "全胜路事件探针若不能证明 box_to_sticky、sticky_merge、move_sticky_rigid、sticky_to_box 必经，则不能提交为本 family。"
  - "若 critic 判断难度主要来自反复搬运和目标硬化，而不是绑定-工具-切割-再消费，候选必须结构重做。"
  - "若布局只是 RA_CAND_0004/0014/0013 的拼接延长，fresh family 失败。"
```

## 计划证据问题

- solver 是否找到可复现胜路，且返回 trace 中清楚出现绑定、刚体移动、切割回收。
- event-count / group probe 是否能证明所有胜路必经 `box_to_sticky`、`sticky_merge`、`move_sticky_rigid`、`sticky_to_box`。
- 若使用 B/S 或 P/L 移动，是否需要对应 `anchor_boundary_shift`，且不是只作为无关按钮。
- 多目标时按 Reality Anchor `invalid_goal_prune` 做删除反事实；目标必须阻止核心事件绕过或承担明确读法。
- graph complete / SCC facts 只作 evidence，不当作审美或难度 pass。
