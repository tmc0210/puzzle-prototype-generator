# Fresh Design Claim: RA_LEX_2026_07_06_RATCHET_HANDLE_v1

```yaml
prototype: reality_anchor
candidate_family: lexicon_ratchet_handle
archive_lineage_policy: fresh_required
authorized_archive_variant_work: false
source_lexicon:
  - "P/L 长轴墙廊棘轮"
  - "P/L 横向把手的墙格门"
  - "刚体黏块推进后的回返谱系（仅借用反向施力/回返站位读法；最终布局不使用 B/S 或黏块）"
target_role: "中后段 Reality Anchor 应用候选；目标难度至少常规流程，审美至少可用下界，追求更强。"
```

## 设计目标

本轮不从 archive candidate、report run 或旧布局派生。候选目标是把 lexicon 中两个 P/L 局部结构串成一条玩家侧因果链：

1. 水平 P/L 在长轴墙廊中像棘轮一样消耗 L 端余量；玩家可以把它推到新的分界位置，但不能把这个动作读成普通二格箱的自由往返。
2. 同一个 P/L 后续需要横向墙格门：垂直下推时，P/L 两半格下方必须同时开放；两次右推后的停位才对齐这个双格孔位。
3. 下推后的 P/L 不是终局装饰：它先覆盖左目标并打开通往右目标的路径，随后玩家进入右目标时还会在 pull side 把 P/L 再拉右一格，保持左目标覆盖。
4. 普通箱的职责是末端拉取收束：玩家从右目标向上移动时把下方箱子拉上右目标，完成第二个覆盖。

## 可攻击 Claim

```yaml
player_insight:
  - "P/L 不是单纯可推二格箱；长轴移动会消耗停位容量，不能靠绕行恢复。"
  - "要完成终局，玩家需要先用两次长轴右移对齐下推孔位，再把同一个 P/L 下推到目标层。"
  - "右目标不是单纯走过去等箱子：进入右目标的动作会在 pull side 拉动 P/L 右移，让左目标继续被 P 半格覆盖。"
  - "普通箱不是开局搬运对象，而是 P/L 完成门位与目标保持后才能拉上的终局填料。"
causal_chain:
  - "前段：两次右推让 P/L 从上层横廊进入唯一有效的双格下推停位。"
  - "中段：从上方站位把 P/L 下推到目标层，L 半格覆盖左目标并打开右侧通路。"
  - "后段：穿过 pull-side 门位时拉动 P/L 右移，P 半格保持左目标；随后把 crate#1 拉上右目标。"
why_not_execution:
  - "方向 OR 探针证明所有胜路至少需要一次 P/L 右移和一次 P/L 下移。"
  - "事件计数探针证明少于三次 P/L boundary shift 不能获胜。"
  - "精确事件探针证明所有胜路都需要 pull_object:crate#1。"
  - "删除左目标会释放缺少下移的路线；删除右目标会释放短 P/L-only 路线，说明两个目标约束不同半链。"
falsification:
  - "若存在不移动 P/L 长轴的胜路，claim 失败。"
  - "若存在不触发 P/L 非长轴移动的胜路，claim 失败。"
  - "若存在不拉 crate#1 的胜路，claim 失败。"
  - "若 critic 判断开局两次右推只是显然执行、pull-side 再拉只是自动副作用，则难度或审美应降级。"
```

## 计划证据问题

- solver 是否找到可复现胜路。
- event/directional probe 是否能证明所有胜路都需要 `anchor_boundary_shift:push_pull`，且至少包含两个不同方向的 P/L 位移。
- reachable/graph 是否 complete；若 exhausted，则完整图相关 claim 降级为 unknown。
- 目标剪枝：若多目标中某个只是 side-effect coverage，按 Reality Anchor `invalid_goal_prune` workflow 删除或保留并说明。
