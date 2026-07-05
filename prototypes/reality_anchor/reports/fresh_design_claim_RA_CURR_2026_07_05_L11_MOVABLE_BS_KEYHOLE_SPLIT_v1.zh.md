# Fresh Design Claim: RA_CURR_2026_07_05_L11_MOVABLE_BS_KEYHOLE_SPLIT_v1

## Slot

- 原型：Reality Anchor
- 槽位：第十一关
- 约束：无 P/L；B/S 可推动；需要比第十关更复杂的箱黏拼接/切割应用；玩家需要考虑推动 B/S 的时机。
- lineage：fresh_required。不得复用已有关卡的布局骨架、对象角色、接口位置或求解因果链。

## Player Insight

玩家需要先把一个普通箱变成黏块并拼接成一个可横向带动的黏结构；这个黏结构能完成普通箱做不到的侧向搬运。随后玩家再移动 B/S，把结构的一部分切回普通箱，让切下来的单格箱进入窄通道或钥匙孔位置；如果不切割，黏结构太大或带错附属块，无法完成该支路。

## Causal Chain

1. 普通箱先在 B/S 移动前被推动到 S 侧，触发 `box_to_sticky` 与 `sticky_merge`。
2. 合并后的黏结构必须作为刚体移动，完成普通箱横向并带/齐位做不到的目标支路。
3. 中后段才推动 B/S，触发 `anchor_boundary_shift:box_sticky` 并把黏结构的一部分切为普通箱，产生 `sticky_to_box`/必要时 `sticky_split`。
4. 切出的普通箱随后被独立推动，用于覆盖一个黏结构不能直接覆盖或会被形状卡住的目标。
5. 至少一个目标由剩余黏结构/刚体移动承担，至少一个目标由切出的普通箱承担。

## Why Not Execution

这不是“触发过转换就算用上”。若把黏块替换成普通箱仍只是多推几步，或切出的普通箱没有独立后续用途，或 B/S 一开局就是唯一动作，本族失败。B/S 的移动应该发生在已有普通箱/黏结构准备好之后，且移动时机改变后会破坏可解性或产生缺核心事件绕行。

## Required Events

- `anchor_boundary_shift:box_sticky`
- `box_to_sticky`
- `sticky_merge`
- `sticky_to_box`
- `move_sticky_rigid`
- `push_object:crate#N`，且至少一次发生在第一次 `sticky_to_box` 之后

## Forbidden / Falsification

- 存在不推动普通箱的胜路。
- 存在不触发 `box_to_sticky`/`sticky_merge`/`sticky_to_box`/`move_sticky_rigid` 任一核心事件的胜路。
- 存在 B/S 在拼接前移动仍可获胜的胜路，除非该胜路之后仍明确重建同等结构并使用切割后的普通箱。
- 删掉某个目标后出现缺核心事件或显著降成本的胜路，说明该目标不是无效 goal，而是必须保留；反之应移除无效 goal。

## Tool Questions

- 最短解是否先有普通箱/黏结构准备，再移动 B/S？
- 所有胜路是否都需要普通箱推动、`box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid`？
- 切割后的普通箱是否在 trace 中继续被推动并承担目标？
- 删除单个目标是否会释放缺核心事件的绕行，还是该目标只是顺路子目标？
