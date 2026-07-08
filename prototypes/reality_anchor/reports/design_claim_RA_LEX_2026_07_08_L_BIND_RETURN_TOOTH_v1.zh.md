# Fresh Design Claim: RA_LEX_2026_07_08_L_BIND_RETURN_TOOTH_v1

prototype: reality_anchor
candidate_version: RA_LEX_2026_07_08_L_BIND_RETURN_TOOTH_v1
candidate_relation: fresh
archive_lineage_policy: fresh_required
authorized_archive_variant_work:
  enabled: false

## 本轮目标

- role: challenge / lexicon-composition application
- difficulty_target: 至少 3，追求 4；不得靠路线税或目标位置硬化增难
- aesthetic_target: 强 3 保底，追求 4；优先机制密度、要素耦合、清晰玩家矛盾
- allowed_exposure_through: all_current_reality_anchor_runtime_rules
- mechanism_scope: B/S 材料转换、sticky merge、sticky rigid move、sticky_to_box cut；P/L 只在后续需要时作为支持，不作为默认核心

## 使用的设计语料

来自 `prototypes/reality_anchor/mechanism_lab/lexicon.md`，未读取 `mechanism_lab/runs`：

- `B/S 绑定债：箱资源生成刚体 footprint`，特别是三箱晚接入形成 L 形或横条扩展的 footprint 债。
- `固定 B/S 切割：C+M 尾巴与单格目标袋`，把共享 footprint 解成可分配 crate 与 sticky 尾债。
- `刚体黏块 + 墙口：反向施力格谱系`，让 sticky footprint 的形状和回返把手被墙口消费。

## Player Insight

玩家需要把多个箱资源主动压成一个特定 sticky footprint，而不是把每个箱子独立送目标。正确解应让玩家经历：

1. 先把箱子绑定成能被墙口/把手消费的刚体形状；
2. 再把这个 footprint 送回固定 B/S 边界切割，得到一个可单独入袋的 crate 和一个仍要处理的 sticky 尾债；
3. 最后用墙口或目标袋消费 sticky 尾债，证明尾巴不是顺路覆盖或装饰。

## Causal Chain

目标结构链：

`多箱绑定 -> sticky_merge 形成非单格 footprint -> sticky rigid move/回返把手 -> fixed B/S cut 输出 C + sticky tail -> crate 目标袋 + sticky tail 目标口`

至少一个目标必须负责迫使 `sticky_to_box` 切割，至少一个目标必须负责迫使后续 `move_sticky_rigid` 尾债消费。若只有绑定 witness，或切割后尾债不再承担责任，则候选降级或换 family。

## Why Not Execution

候选不能只是“推两三次箱子过线”。玩家侧难点应来自 footprint 选择和后续消费关系：

- 少绑定或过早切割会让目标袋/墙口无法同时满足；
- 只把输出当作普通箱链会缺少 sticky tail 的覆盖或把手；
- 正确路线需要理解材料状态与 footprint 形状的互相约束。

## Required / Forbidden Events

required_winning_path_events:

- `box_to_sticky`
- `sticky_merge`
- `move_sticky_rigid`
- `sticky_to_box`

preferred_required_strength:

- 所有胜路至少一次 `box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid`。
- 若声称三箱 L 形绑定，需额外证明至少两个或三个 box_to_sticky 参与；证据不足时降级为“多箱绑定/横条绑定”。

forbidden_winning_path_events:

- none by default

forbidden_if_seen_anywhere:

- 若使用固定 B/S，`anchor_boundary_shift:box_sticky` 不应可达；若布局改为移动 B/S family，则本 claim 必须修订。

## Falsification

放弃或修订本 claim 的条件：

- solver 找到不需要材料转换或不需要尾债消费的胜路；
- 删除任一目标后核心事件组仍可绕过而成本下降；
- 完整图无法穷尽，导致 required-event 结论未知；
- critic 认为玩家只是按唯一走廊执行，没有 footprint 选择或尾债读图；
- 结构与已有 archive 候选在布局骨架、对象角色和因果链上过近。

## 工具问题

- 是否存在完整图且所有胜路都包含核心四事件组？
- 是否至少两个目标分别约束切割与尾债消费？
- 起点是否有足够 opening comfort，不是第一步被迫进入关键不可逆承诺？
- 是否存在明显冗余目标、对象、口袋或外框可清理？
