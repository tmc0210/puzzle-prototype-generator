# Fresh Design Claim: RA_CURR_2026_07_05_L11_MOVABLE_BS_TIMED_BAR_SPLIT_v1

```yaml
slot: L11
prototype: reality_anchor
archive_lineage_policy: fresh_required
authorized_archive_variant_work:
  enabled: false
```

## 目标

设计一个新的第十一关候选：无 P/L，可推动 B/S。关卡必须让玩家实际考虑 B/S 的推动时机，而不是开局被迫推动锚点。核心结构应同时包含：

- 普通箱阶段：某个材料必须先作为 C 独立定位；若过早转成 M 并黏合，会造成路径/形状不可行。
- 拼接阶段：随后必须推动 B/S，使多个材料转成 M 并 sticky_merge，形成普通箱无法替代的刚体搬运结构。
- 切割阶段：刚体搬运后必须再推动 B/S，使一部分 M 切回 C，拆下来的普通箱被独立用于目标。

## player_insight

玩家应先看出“现在不能立刻造黏条”：需要把一个普通箱预置到一个窄口/暂存位，保留它的可分离性；等目标矛盾暴露后，再推动 B/S 让它与另一块材料拼成可整体搬运的黏性结构。最后，玩家还要意识到同一个黏性结构完成搬运后必须拆掉，否则会拖动已就位的目标或无法让最后一个普通箱单独落位。

## causal_chain

1. 玩家先移动普通 C，建立后续拼接需要的位置或腾出 B/S 通道。
2. 推动 B/S 改变材料边界，使预置 C 和另一块材料变成相邻 M，并 sticky_merge。
3. 推动合体 M 刚体完成单箱无法完成的搬运/覆盖目标。
4. 再推动 B/S 反向切割，触发 sticky_to_box 或 sticky_split。
5. 推动切出的普通箱覆盖最终目标。

## why_not_execution

这个设计不允许“开局唯一动作就是推 B/S”。如果完整图显示前若干不可逆 commitment 全是 B/S 移动，或者删目标后只剩顺序 cleanup，就应打回。普通箱替代版必须无解，且全胜路必须要求拼接、刚体搬运、切割、切后普通箱使用。B/S 的至少一次关键移动应发生在玩家已有其它可行移动或已完成普通箱预置之后。

## falsification

- 若初始 SCC/region 的唯一胜利 commitment 是连续 B/S 推动并构造全部黏性结构，则失败。
- 若存在不含 box_to_sticky / sticky_merge / move_sticky_rigid / sticky_to_box / crate push 的胜路，则失败。
- 若普通箱替代版可解，则 sticky 结构只是省步数或装饰，失败。
- 若任一目标删除后不降低成本或不移除核心阶段，则目标无效，需要删或重做。
- 若 critic 判断切割只是剩余目标 cleanup，而不是有时机/状态消费差异，则结构需重做。
