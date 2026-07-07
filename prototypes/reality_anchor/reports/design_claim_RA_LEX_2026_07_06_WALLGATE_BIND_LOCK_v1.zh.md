# Fresh Design Claim: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v1

```yaml
prototype: reality_anchor
candidate_family: lexicon_wallgate_bind_lock
archive_lineage_policy: fresh_required
authorized_archive_variant_work: false
source_lexicon:
  - "P/L 横向把手的墙格门"
  - "B/S 绑定债：从可分配箱子到形状化黏块"
  - "刚体黏块推进后的回返谱系"
target_role: "Reality Anchor 后段紧凑挑战候选；目标 difficulty >= 4，aesthetic >= 4。"
```

## 设计目标

这条 family 从上一条强制 release 的失败胚子收缩：不再要求 sticky_to_box，而是把目标放在“P/L 站位门让 B/S 绑定债最终成立”上。

目标是一个小空间双 anchor 互锁：

1. P/L 的横向把手移动改变玩家可用站位和 anchor 占位。
2. B/S 的位移与 sticky 刚体移动共同把材料导向目标。
3. 末端 crate 必须被拉入 sticky side，触发 box_to_sticky；这个绑定不是规则演示，而是最后目标覆盖所需的资源拓扑变化。
4. sticky_merge / sticky rigid move 不应只是视觉副作用；它们要成为所有胜路的必要链条或至少由探针明确界定。

## 可攻击 Claim

```yaml
player_insight:
  - "玩家需要先用 P/L 作为横向站位门重排入口，再通过 B/S/黏块推进把空间从局部工具变成材料债。"
  - "普通 crate 的价值在末端不是保持可分配，而是被绑定进 sticky side 来完成覆盖。"
  - "小空间内三目标应让 P/L 位移、B/S 位移、pull 与 sticky 刚体移动互相承担前提。"
causal_chain:
  - "开局 sticky/B/S 互动改变材料边界与下方目标关系。"
  - "P/L 被 pull / push 移动，打开后续站位门。"
  - "sticky 刚体被多次拉动并发生 sticky_merge，形成目标覆盖压力。"
  - "末端 B/S 位移后，crate 被 pull 进 sticky side，box_to_sticky 完成最后覆盖。"
why_not_execution:
  - "全胜路应需要 push_pull_anchor_shift、box_sticky_anchor_shift、pull_object、box_to_sticky、move_sticky_rigid。"
  - "若 sticky_merge 全胜路必经，则它可作为审美核心；若不是，packet 必须降为 returned-trace payoff。"
  - "若任一目标删除后成本不降且核心事件仍必要，则该目标是无效目标，不能提交。"
falsification:
  - "存在缺少 P/L shift、B/S shift、pull、box_to_sticky 或 sticky rigid 的胜路，核心 claim 失败。"
  - "critic 若认为只是 RA_CAND_0005/0002 的双 anchor 清单而非新语料组合，必须重做或降级。"
  - "critic 若认为难度来自路线硬化而不是小空间状态消费，不能提交。"
```
