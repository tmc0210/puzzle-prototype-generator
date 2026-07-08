# Designer Action: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2

## 背景

v1 `RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1` 已通过硬证据审查但被 puzzle critic 打回，主要问题是开局 overshoot 过于顺手、return cut 可能像唯一局部动作，以及右侧尾目标删除后只少一步，读作薄路线税。

## 结构修订

v2 保留 lexicon 驱动的核心链：`B/S 绑定债 -> 固定 B/S 切割 -> 窄口/站位消费`。具体修订是把 v1 的右侧尾目标改成第二个上方目标，形成双上袋分配：

```text
########
#..GG###
#@CC...#
###....#
###BS###
########
```

返回解为：

`right right down right right right up left down left up down left up`

关键结构节点：

- `right`：第一箱跨 B/S，得到 `C+M`。
- `right`：继续 overshoot，得到 merged `MM`。
- `left`：从右侧回推，固定 B/S 把 `MM` 切成 `C+M`。
- `up`：先把 `M` 推入右上目标。
- `up`：再把 `C` 推入左上目标。

## 证据结果

- 主图完整：shortest cost 14，reachable states 901，winning states 3。
- 事件探针完整且无 missing-event winning bypass：`box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid`、`force_chain` 均为必经事件组。
- 固定 B/S reachable scan 完整，`anchor_boundary_shift:box_sticky` forbidden hits 为 none。
- 删除左上目标后 cost 11，返回路线退化为 ordinary-crate-heavy shortcut，缺少 sticky_merge / cut-return 链。
- 删除右上目标后 cost 8，返回路线几乎完全退化为普通箱 shortcut。

## 独立复审

- Evidence reviewer：`supports_with_caveats`，`proposal_ready_with_caveats`，`required_action:none`。
- Puzzle critic：`supports_with_noncore_caveats`，`proposal_ready_with_caveats`，`required_action:none`。

保守提交姿态：难度 3+、审美 strong 3 保底；不主张 4 分，因为开局 overshoot 仍较顺手，后半段是清楚的小型双端点分配而非高密度多层耦合。

## 使用的设计语料

- `B/S 绑定债：箱资源生成刚体 footprint`
- `固定 B/S 切割：C+M 尾巴与单格目标袋`
- `刚体黏块 + 墙口：反向施力格谱系`

本轮没有查看 `mechanism_lab/runs`，只从 `mechanism_lab/lexicon.md` 抽取局部设计接口，并补充“第二推同时生成 MM 与打开右侧回切站位”“双上袋分别消费 C/M 两个 endpoint”的衔接逻辑。
