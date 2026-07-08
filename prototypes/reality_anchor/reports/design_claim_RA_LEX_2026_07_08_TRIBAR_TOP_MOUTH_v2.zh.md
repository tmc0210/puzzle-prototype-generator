# Fresh Design Claim: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2

prototype: reality_anchor
candidate_version: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2
candidate_relation: fresh
supersedes_working_claim: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1
archive_lineage_policy: fresh_required

## 本轮目标

- role: challenge / lexicon-composition application
- difficulty_target: 至少 3，追求更高
- aesthetic_target: 强 3 保底，追求 4
- allowed_exposure_through: all_current_reality_anchor_runtime_rules

## 使用的设计语料

来自 `prototypes/reality_anchor/mechanism_lab/lexicon.md`，未读取 `mechanism_lab/runs`：

- `B/S 绑定债：箱资源生成刚体 footprint`：三箱连续跨固定 B/S 边界，逐步把 `CCC` 压成 `MMM` 三格横条。
- `固定 B/S 切割：C+M 尾巴与单格目标袋`：把回推的三格 sticky 横条切成 `C+MM`，左端 C 由单格目标袋消费。
- `刚体黏块 + 墙口/目标口：前沿口宽消费`：切割后的 `MM` 仍是二格刚体，必须向上进入目标口；删除该目标会击穿 `move_sticky_rigid >= 4`。

## Player Insight

玩家不能把早期的 `C+M` 或 `C+MM` 当成终点；必须先把三个箱资源全压到 sticky side，得到三格 `MMM`。回推过固定 B/S 后，`MMM` 被切成 `C+MM`：左端 C 是单格目标袋资源，右侧 `MM` 仍然作为刚体口宽债，需要向上进入目标口。

## Causal Chain

`CCC 初始资源 -> 三次跨边界绑定 -> MMM 三格刚体 -> 回推切成 C+MM -> MM 上塞目标口 -> C 回填单格目标`

两个目标分责：

- 左侧上目标消费切出的 C，并要求玩家在 tail 处理后回到左侧做普通箱回填。
- 右侧上目标消费切出的 sticky tail；删除它会保留主链但把 sticky 刚体移动需求从 4 次降到 3 次。

## Why Not Execution

这不是高开放搜索题，开局三次右推仍然强引导。当前版本的质量主张只到“强 3 / difficulty 3 附近”：洞见在于同一个三格 footprint 被读两次，先作为 `MMM` 刚体，后作为 `C+MM` 的双资源输出。v2 修掉了 v1 的右侧水平尾目标路线税，把 tail 消费改为上方口宽消费；同时剪掉三目标草图中冗余的第二个 sticky 目标。

## Required Events

required_winning_path_events:

- `box_to_sticky`
- `sticky_merge`
- `move_sticky_rigid`
- `sticky_to_box`
- `force_chain`

event_count_claims:

- all winning paths require at least 3 `box_to_sticky` events.
- all winning paths require at least 2 `sticky_merge` events.
- all winning paths require at least 4 `move_sticky_rigid` events.

order_claim:

- no winning path may perform `sticky_to_box` before at least one `sticky_merge`.

## Falsification

Reject / hold if any of these holds:

- a winning path exists without any core event group above;
- a winning path exists with fewer than 3 `box_to_sticky`, fewer than 2 `sticky_merge`, or fewer than 4 `move_sticky_rigid`;
- critic reads the M target as the same endpoint hardening problem as the rejected horizontal tail version;
- critic judges the result as only a lengthened RA_CAND_0018 fixed B/S cut-tail witness, not a strong-3 application;
- complete graph / probes exhaust before answering these claims.
