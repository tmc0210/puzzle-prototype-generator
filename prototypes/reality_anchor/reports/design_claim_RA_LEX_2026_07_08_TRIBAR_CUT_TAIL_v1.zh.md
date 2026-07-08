# Fresh Design Claim: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1

prototype: reality_anchor
candidate_version: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1
candidate_relation: fresh
supersedes_working_claim: RA_LEX_2026_07_08_L_BIND_RETURN_TOOTH_v1
archive_lineage_policy: fresh_required
authorized_archive_variant_work:
  enabled: false

## 本轮目标

- role: challenge / lexicon-composition application
- difficulty_target: 至少 3，追求 4
- aesthetic_target: 强 3 保底，追求 4
- allowed_exposure_through: all_current_reality_anchor_runtime_rules

## 使用的设计语料

来自 `prototypes/reality_anchor/mechanism_lab/lexicon.md`，未读取 `mechanism_lab/runs`：

- `B/S 绑定债：箱资源生成刚体 footprint`：三箱连续跨固定 B/S 边界，逐格把 `CCC` 压成 `MMM` 三格横条。
- `固定 B/S 切割：C+M 尾巴与单格目标袋`：把回推的 sticky 横条切成 `C+MM`，由单格目标袋消费左端 crate。
- `刚体黏块 + 墙口：反向施力格谱系 / 目标口消费`：切割后保留的 `MM` 二连尾债必须作为刚体整体推进到右侧目标口。

## Player Insight

玩家不能在 `C+M` 阶段急着拿左端 crate 进目标；必须继续把第三个箱资源也压入 sticky side，形成三格 sticky 横条。之后再把横条回推过固定边界，切出 `C+MM`：左端 crate 解决单格目标袋，剩余二连 sticky 尾巴仍要整体推进，覆盖右侧目标。

## Causal Chain

`CCC 初始资源 -> 三次跨边界绑定 -> MMM 三格刚体 -> 回推切成 C+MM -> C 进入左上单格袋 -> MM 二连尾债整体推进覆盖右目标`

两个目标分责：

- 左上目标负责迫使 `sticky_to_box` 切割，并消费切出的 crate。
- 右侧目标负责迫使切割后的二连 sticky 尾债继续移动，而不是让 `sticky_to_box` 后立即结束。

## Why Not Execution

候选的主洞见不是路线长度，而是材料状态的等待时机：

- 只绑定一格或两格时，玩家可以看见 crate 目标袋诱惑，但不能同时满足右侧尾债目标。
- 三格全部绑定后，回推切割给出 `C+MM`，玩家需要重读同一横条的两种职责：左端可分配，右端仍是刚体。
- 二连 sticky 尾债的推进让第三箱资源承担结构责任，而不是只增加一步路。

## Required / Forbidden Events

required_winning_path_events:

- `box_to_sticky`
- `sticky_merge`
- `move_sticky_rigid`
- `sticky_to_box`

event_count_claims:

- all winning paths require at least 3 `box_to_sticky` events.
- all winning paths require at least 2 `sticky_merge` events.

order_claim:

- no winning path may perform `sticky_to_box` before at least one `sticky_merge`.

forbidden_if_seen_anywhere:

- `anchor_boundary_shift:box_sticky` should be unreachable; B/S is fixed.

## Falsification

Reject / change family if any of these holds:

- a winning path exists with fewer than 3 `box_to_sticky` events;
- a winning path exists without `sticky_merge`, `sticky_to_box`, or post-cut sticky rigid movement;
- either target can be removed without lowering core responsibility;
- complete graph / probes exhaust before answering these claims;
- independent critic judges the result to be only a lengthened variant of an existing bind-cut-tail chain with insufficient new player-facing responsibility.
