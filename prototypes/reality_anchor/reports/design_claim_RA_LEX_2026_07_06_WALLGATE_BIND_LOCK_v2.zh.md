# Fresh Design Claim: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2

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
revision_note: "v1 的低位目标经 invalid_goal_prune 判定冗余；v2 删除该目标，只保留右目标与中段目标。"
```

## 设计目标

本 family 不再追求固定 B/S cut / release，而是用两格高的小房间做一个双 anchor 绑定锁：

1. 开局 B/S 与 sticky 的右推动作把 B/S 边界、crate 和 sticky 位置同时改写，形成第一层承诺。
2. P/L 被 pull/push 重排，作为横向站位门，允许玩家进入后续 sticky 与 B/S 的操作侧。
3. 中段 sticky 刚体必须被拉动并发生 sticky_merge；这个 merge 不是视觉副作用，而是所有胜路必经。
4. 末端 B/S 连续右移后，crate 必须被 pull 进 sticky side，`box_to_sticky` 才能完成右目标覆盖。

## 可攻击 Claim

```yaml
player_insight:
  - "玩家需要把 P/L 当成站位门来重排入口，而不是只把它看作规则标签。"
  - "sticky_merge 先把下方目标链收束；之后 crate 才能作为最后资源被绑定到 sticky side。"
  - "两个目标分担两个失败模式：中段目标阻止只做末端 B/S+crate，右目标阻止只做短 sticky 覆盖。"
causal_chain:
  - "开局：推动 sticky/B/S 链，触发 B/S 位移与 sticky rigid move。"
  - "门控：P/L 被 pull/push，改变可达站位与后续操作侧。"
  - "收束：sticky 刚体被拉动并 sticky_merge，承担中段目标责任。"
  - "绑定：B/S 末端右移后，crate 被 pull 下，box_to_sticky 完成右目标覆盖。"
why_not_execution:
  - "core6 probe 完整证明 push_pull_shift、box_sticky_shift、pull_event、box_to_sticky、sticky_rigid、sticky_merge 全胜路必经。"
  - "order probe 完整证明 box_to_sticky 不会早于 sticky_merge；末端绑定发生在 sticky 收束之后。"
  - "删右目标后 22->3 且绕过四个核心组；删中段目标后 22->8 且绕过 P/L shift、sticky rigid、sticky_merge。"
falsification:
  - "存在缺少任一 core6 事件组的胜路，核心 claim 失败。"
  - "存在 box_to_sticky 早于 sticky_merge 的胜路，'先收束再绑定' claim 失败。"
  - "critic 若认为主要只是 forced-script execution 或路线硬化，而不是紧凑状态消费，应降级或重做。"
```
