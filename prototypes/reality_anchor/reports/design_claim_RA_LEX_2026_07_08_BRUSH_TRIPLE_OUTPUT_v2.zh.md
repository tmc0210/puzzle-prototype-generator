# Design Claim: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2

candidate: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2
prototype: reality_anchor
status: review_candidate

## Layout

```text
#############
######.G#####
#####@C.MM###
#####.....G##
#####...G####
#####.BS..###
#############
```

## 设计语料来源

本候选只读取并使用 `prototypes/reality_anchor/mechanism_lab/lexicon.md`，未读取同目录 `runs/` 内容。

使用的 lexicon 语料：

- `B/S 绑定债：箱资源生成刚体 footprint`
  - 用法：开局把单个 C 推过当前 B/S 边界，和右侧 MM 合并成横向 `MMM`。玩家需要主动生成三格刚体 footprint，而不是把三个目标分别当成普通箱子处理。
- `B/S 移动边界刷产物：远程生成与门口消费`
  - 用法：玩家随后推动 B/S anchor 右移两格，让边界连续扫过远处 `MMM`，把它刷成 `CMM` 再刷成 `CCM`。刷产物被三个目标口消费：上方 C、下方 C、右侧 M。
- `固定 B/S 切割：C+M 尾巴与单格目标袋` 的尾债思想
  - 用法：不复用固定尾巴版式，而是借用“切出的 C 必须被目标口消费，剩余 sticky 尾巴仍有责任”的设计原则。
- `刚体黏块 + 墙口：footprint / 目标口消费`
  - 用法：初次 `MMM` 下移和末端 M 右推都要求玩家理解 sticky 刚体整体运动；右侧目标口消费剩余 M 尾巴，而不是只作为路径长度税。

## 玩家洞见

玩家要读出一条材料链：

1. 开局 C 不是单独去占目标，而是被推过边界变成第三个 sticky 单元，补成 `MMM`。
2. `MMM` 先被整体下移，放到 B/S anchor 的刷线附近。
3. 连续推动 B/S 右移两次，把同一个三格 footprint 切成两个可分配 C 和一个 sticky 尾巴。
4. 两个 C 分别回填上、下目标；剩余 M 必须再作为 sticky 刚体推到右侧目标。

这不是固定 B/S cut-tail 的复刻：关键动作由可移动 B/S anchor 的两次刷线完成，输出是 `CCM` 三产物分配，而不是单次固定边界切出 `C+M` 后收尾。

## 硬证据摘要

- 主图完整搜索：`layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2.md`
  - found: yes
  - shortest cost/depth: 17
  - graph status: complete
  - reachable states: 5140
  - legal transitions: 14372
  - winning states: 4
- 返回解：
  - `right up right down left down down left down right right up up up right down right`
  - 关键事件：`box_to_sticky`, `sticky_merge`, `move_sticky_rigid`, `anchor_boundary_shift:box_sticky`, `sticky_to_box`
- 核心事件探针：`event_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_core5.md`
  - complete/no bypass for `box_to_sticky`
  - complete/no bypass for `sticky_merge`
  - complete/no bypass for `move_sticky_rigid`
  - complete/no bypass for `anchor_boundary_shift:box_sticky`
  - complete/no bypass for `sticky_to_box`
- 计数探针：
  - `anchor_boundary_shift:box_sticky >= 2`: complete/no bypass below count
  - `sticky_to_box >= 2`: complete/no bypass below count
  - `move_sticky_rigid >= 2`: complete/no bypass below count

## 不主张的内容

- 不主张 `force_chain` 是核心事件；本候选主解没有 `force_chain`。
- 不主张所有胜路都必须先 `sticky_merge` 再出现任何 `sticky_to_box`。顺序探针 `order_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_cut_before_merge.md` 找到了一条长胜路，能先发生一次早期 `sticky_to_box`，再进入主合并/刷线链。
- 不主张对象实例级全路线唯一性；证据层级是事件组必要性、计数必要性、返回解快照和删目标反事实。

## 评分姿态

- 难度：目标为 >=3。依据是三段材料读法、两次移动边界刷产物、三产物分配和完整图的有限分支，不靠路线长度硬撑。
- 审美：目标为强 3，争取 4。v2 相比 v1 去掉了左侧冗余空间，版面更紧；但开局第一推仍相当可读，不应自行声称稳定 4+。
