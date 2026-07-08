# 设计声明：RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1

## 候选信息

- 原型：Reality Anchor
- 角色：challenge
- 目标：难度至少 3；审美强 3 保底，争取 4
- 来源：从 `mechanism_lab/lexicon.md` 的设计语料组合得到的新设计，不是 archive 变体

## 布局

```text
##########
###G##...#
##..MMLP@#
#...M....#
#...MM####
#.BS######
##########
```

## 使用的设计语料

- `P/L 长轴墙廊 / L 端余量棘轮`：P/L 不是目标覆盖物，而是先被下移、侧移，再作为有限行程的长轴推杆进入 force-chain。
- `固定 B/S 断桥：sticky split 端点目标袋`：C 形 sticky 被推过固定 B/S 边界后，发生 `sticky_to_box:n3` 与 `sticky_split:n1`，产生独立端点。
- `刚体黏块 + 墙口 / 前沿墙齿目标口`：上方 `G##` 墙齿只允许单格端点被送入目标，阻止玩家用 P/L 自身的 2-cell footprint 直接覆盖目标。
- `B/S 绑定债 / 固定边界切割`：作为局部逻辑衔接语料使用；最终候选保留的是“推杆驱动 -> 断桥切割 -> 端点消费”的链条。

## 玩家洞见

玩家需要先把 P/L 理解为一个可移动的长轴推杆，而不是直接拿去盖目标。P/L 必须先被调整到 C 形 sticky 的右侧，再连续向左推动 sticky 刚体。第二次左推让 C 形 sticky 穿过固定 B/S 边界，sticky 被切成 crate 桥与独立 sticky 端点。最后，上方墙齿只接受这个独立端点，要求玩家把切出的端点保存并送入目标。

## 因果链

1. 开局先通过可逆走位观察上方墙齿和右侧 P/L。
2. 下推 P/L，改变 P/L 的纵向位置。
3. 再把 P/L 向左预定位到 C 形 sticky 的右侧。
4. 第一次 force-chain 左推将整块 C 形 sticky 作为刚体推向 B/S。
5. 第二次 force-chain 左推跨过固定 B/S，触发 `sticky_to_box:n3` 与 `sticky_split:n1`，产生独立上端点。
6. 玩家绕到下方 / 左侧 stance。
7. 最后上推 P/L，P/L 通过 force-chain 把独立端点送进上方墙齿目标。

## 为什么不是纯执行题

完整图搜索显示，任意胜解都必须包含 P/L 边界位移、force-chain、sticky rigid movement、sticky_to_box 与 sticky_split；并且所有胜解都至少需要 5 次 P/L 边界位移和 3 次 sticky rigid movement。目标的 `G##` 墙齿让 P/L 自身不能直接作为答案，玩家必须理解“先切出端点，再用推杆消费端点”的角色转换。图结构也不是第一步脚本：初始 SCC 有 21 个状态、4 条外出 commitment，其中 2 条可达胜利、2 条死亡，压缩后 forced commitment / viable / optimal prefix 均为 0。

## 反证条件

- 存在不含 `sticky_split` 的胜解，则断桥端点声明失效。
- 存在不含 `sticky_to_box` 的胜解，则固定 B/S 切割声明失效。
- 存在少于 5 次 `anchor_boundary_shift:push_pull` 的胜解，则 P/L 长轴棘轮声明被削弱。
- 存在少于 3 次 `move_sticky_rigid` 的胜解，则“推 sticky 刚体并消费端点”的声明被削弱。
- 若目标可由 P/L 自身直接覆盖，或不需要上端点进入墙齿，则核心美感失败。

## 证据摘要

- `layout_analysis_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1.md`：11 步最短解；完整图 359 states / 919 transitions / 2 winning states。
- `event_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_core5.md`：缺失 P/L shift、force_chain、sticky_to_box、sticky_split 或 sticky rigid movement 的胜利旁路均不存在，且搜索 complete。
- `event_count_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_pl_shift_min5_anchor_boundary_shift_push_pull_min5.md`：少于 5 次 P/L shift 的胜利旁路不存在，complete。
- `event_count_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_rigid_min3_move_sticky_rigid_min3.md`：少于 3 次 sticky rigid movement 的胜利旁路不存在，complete。

## 淘汰的近邻草案

较早的 `RATCHET_SPLIT_BRIDGE_v1` 试图保留第二个桥目标；目标删除反事实显示，移除桥目标后成本与核心事件没有实质变化，因此桥目标是冗余装饰。最终候选删除该目标，保留单目标墙齿消费结构。
