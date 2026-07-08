# Design Claim: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1

## 目标

基于 lexicon 组合一个新候选，不复用 archive 布局骨架：`P/L 长轴棘轮` 驱动 `B/S 移动边界刷子`，但把 v2 的单格尾目标改成三格横条的 `C+MM` 产物选择。玩家必须只使用一次可继续推进的棘轮 stroke；第二次 stroke 会把输出过刷成 `CC+M`，失去右侧双目标需要的二连 sticky footprint。

## 核心链

```text
###########
#.PLBS..###
#@.###...##
#...#MMmG.#
#....G###.#
#.........#
###########
```

- 第一 stroke：顶部 P/L force-chain 推动 B/S 一格，远处 `MMm` 被刷成 `CMm`。
- 下目标：左侧 `C` 被下拉进单格目标，证明刷子输出的可分配 crate 半边。
- 右目标：剩余 `Mm` 必须作为二连 sticky 被整体右拉，才能同时覆盖 `mG` 双目标。
- 错误 stroke：若玩家继续推第二次，状态变成 `CCmG`；计划用完整反事实证明该过刷状态无胜路。

## 证伪条件

- 存在胜路缺少 P/L+B/S force-chain shift，则棘轮刷子 claim 失败。
- 存在胜路缺少 `sticky_to_box`，则 `C+MM` 输出 claim 失败。
- 存在胜路缺少 crate pull，则左侧 `C` 消费 claim 失败。
- 存在胜路缺少 sticky pull / sticky rigid movement，则右侧二连目标口消费 claim 失败。
- 存在两次或更多 `anchor_boundary_shift:box_sticky` 的胜路，则“一次 stroke 选择”claim 失败。
- 删除下目标或右侧双目标后若仍保留相同责任链，则目标冗余。

## 使用的设计语料

- `P/L 长轴墙廊：L 端余量棘轮`：顶部走廊保留两格余量，第一格是正确 stroke，第二格是可见但错误的过刷 stroke。
- `B/S 移动边界刷产物：远程生成与门口消费`：P/L force-chain 远程移动 B/S，刷三格 sticky footprint。
- `固定 B/S 切割：C+M 尾巴与单格目标袋` 的扩展建议：从 `C+M` 扩到 `C+MM`，左 crate 被单格袋消费，右 sticky 尾债继续保留。
- `刚体黏块 + 墙口 / 目标口消费`：右侧 `mG` 双目标口消费二连 sticky footprint；单格 sticky 或过刷后的 `CC+M` 不能完成该消费。
