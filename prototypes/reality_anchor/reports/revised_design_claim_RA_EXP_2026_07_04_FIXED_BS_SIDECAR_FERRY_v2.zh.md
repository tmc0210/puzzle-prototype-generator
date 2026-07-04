# Revised Design Claim: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2

## 修订来源

v1 的 evidence reviewer 支持硬证据，但 puzzle critic 要求 structural_revision：

- 开局连续四次右推 P/L 像操作税。
- 固定 B/S 的玩家侧角色偏像静态区域标签。
- 玩家可能在执行后才回读“侧挂影子格没有施力面”。

## v2 目标

- 保留侧挂影子格无施力面的强结构：普通箱初始替代和 post-merge 替代都应无解。
- 将 P/L 位移压缩为一次右推：从“重复搬运”改为“切换操作区到 push side”。
- 让 C 的转换窗口直接位于固定 B/S 的 x=5/x=6 边界下方，强化 B/S 固定边界的可见性。

## Player Insight

玩家应读出：P/L 只需要一次位移来允许对右侧把手格施加 push；但真正覆盖左目标的是被固定 B/S 转成 sticky 并合并后的侧挂刚体。左侧影子格没有普通箱可用的向上施力面，不能靠多推几步替代。

## Falsification

- 若仍需要多次同向 P/L 位移作为主要开局动作，reject/revise。
- 若 B/S 在可达图中可移动，reject。
- 若存在不经 P/L 位移、box_to_sticky、sticky_merge 或 sticky rigid movement 的胜路，reject。
- 若普通箱初始替代版或 post-merge 普通箱替代版可解，reject。
