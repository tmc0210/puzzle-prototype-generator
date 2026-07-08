# Design Claim: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1

```yaml
candidate_version: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1
prototype: reality_anchor
status: evidence_ready_for_review_1
fresh_required: true
abandoned_prior_attempt:
  id: RA_LEX_2026_07_08_PULL_BRUSH_CM_TOOTH_v2
  reason: >
    复核 RA_CAND_0019 后判断过近：同样偏向移动 B/S 刷切产物，再把 C/sticky 输出分别塞入目标；
    玩家侧还存在连续向右拉 B/S 的显然按钮感。因此不提交该方向。
```

## Layout

```text
##########
##PL.#####
###.G#####
#.@CC.G..#
###.....##
##########
```

## Claim

本候选使用固定 `P/L` 边界，而不是移动锚点或 B/S 刷子。玩家在 P 侧只能先把两箱链整体推过边界；这个动作同时打开原 crate 占位下方的绕行入口。进入 L 侧后，同一条箱链必须被拆成两个抽取责任：右端箱横向拉入右目标，剩余左端箱从上方拉入上目标袋。

核心洞见不是“推箱到目标”，而是读出固定 P/L 边界造成的语义翻转：过界后玩家不能再继续推链，只能绕到链端，用 pull 把两个端点分别抽进两个目标。

## Lexicon Sources Used

- `P/L 边界交接：P 侧推链 -> 跨 P/L -> L 侧抽近端 -> 下方口袋打开`：本候选直接使用“P 侧整链推送，L 侧只抽近端”的接口，并把近端抽取扩成双端点分配。
- `P/L pull 抽取把手：前格门、footprint 门与扫带`：右端箱与上端箱的两次 pull 都依赖玩家前格与被拉对象目标格开放，目标袋消费的是 pull 后的玩家旧站位。
- 设计时阅读了 `prototypes/reality_anchor/mechanism_lab/lexicon.md`，没有读取同目录 `mechanism_lab/runs`。

## Evidence Claim Boundary

- 主张所有胜路需要 `push_object`、`force_chain:n2`、`pull_object`，且至少两次 `pull_object`。
- 主张所有胜路的 pull 都发生在 chain push/force-chain 之后。
- 主张 P/L 锚点在完整可达图中不移动，`anchor_boundary_shift:push_pull` 无 reachable hit。
- 不主张唯一输入序列；不主张 crate#1/crate#2 的实例身份在所有路线中都有语义区分。
- 不主张 4 分审美；目标是 strong 3 / difficulty 3，经 critic 校准后再决定是否上调。
