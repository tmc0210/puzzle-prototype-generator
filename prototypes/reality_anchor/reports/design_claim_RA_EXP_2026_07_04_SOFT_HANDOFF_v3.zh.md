# Revised Design Claim: RA_EXP_2026_07_04_SOFT_HANDOFF_v3

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_SOFT_HANDOFF_v3
family: soft_handoff_interlock
revision_from: RA_EXP_2026_07_04_SOFT_HANDOFF_v2_review_1
designer_action_source: designer_action_RA_EXP_2026_07_04_SOFT_HANDOFF_v2_review_1.zh.md
archive_lineage_policy:
  default: fresh_required
  candidate_relation: revised_from:RA_EXP_2026_07_04_SOFT_HANDOFF_v2
  why_allowed: >
    这是同一 fresh family 内按 independent critic 的 structural_revision 要求继续，
    不是 archive 变体工作。仍不使用 RA_CAND_0001 的布局、对象角色或因果链。
role: challenge
score_claim_allowed: false
allowed_exposure_through: all_current_reality_anchor_runtime_rules
```

## Revision Target

保留“比 PHASE_FERRY_v8 低一档”的目标，但把 v2 的线性 guided-application 风险降下去：

- 开局纯走位应更短，或走位本身要承担入口选择/死路压力。
- `P/L` 不能只在尾部作为目标覆盖按钮；它应在 `B/S` 换相前或换相过程中参与。
- `B/S` 生成材料后，至少还有一次由 `P/L` 状态解释的收束或转向。
- 解长目标约 12-20 步；允许短链，但必须有至少两个可感知的机制承诺节点。

## Player Insight

玩家需要看出两个锚点构成一个互锁 handoff：先处理 `P/L` 才能把对象或角色带到正确推/拉侧；随后移动 `B/S` 改变材料；最后用前面改变过的推/拉侧完成目标覆盖。相比 v2，不是“B/S 做完一切，P/L 尾部收账”，而是 `P/L` 需要解释 `B/S` 为什么能被正确使用。

## Selected Layout

```text
#########
####C@..#
###G.G..#
####PL.M#
####..BS#
#########
```

## Specific Read

本版把 v2 的横向入口长走位压成小通道，并让 `P/L` 在第一个机制承诺中就移动：

- 先向上拉 `P/L`，使上排 crate 的拉动和中排目标区形成同一条通道。
- crate 被拉到右侧后，玩家再借 pull-side 把右侧 `M` 拉回箱侧，形成一个可继续交接的箱/黏材料债务。
- 中段再次移动 `P/L` 后，玩家拉动 `B/S`，两个材料在目标走廊中变成 sticky 并合并。
- 末段推/拉 `P/L` 与 sticky 刚体，最终形成 `P/L + sticky` 的目标覆盖。`P/L` 不再只是最后一格按钮，而是前、中、末段都改变局面。

## Causal Chain

1. 初始可见操作点不应直接给出完整执行链；玩家必须先改变 `P/L` 或利用 `P/L` 侧切换。
2. `P/L` 的移动/侧切换让 `B/S` 或待换相对象进入可操作关系。
3. `B/S` 移动触发材料归一化，产生 sticky 刚体移动或其他目标覆盖材料。
4. 最后收束应消费两类锚点结果，而不是只消费其中一类。

## Required / Preferred Evidence

```yaml
hard_required_if_claimed:
  - all-solution push_pull_anchor_shift
  - all-solution box_sticky_anchor_shift
  - all-solution pull_event
  - all-solution material_normalization
  - all-solution sticky_rigid_move
  - all-solution sticky_merge
preferred:
  - returned solution has P/L shift before final two moves
  - returned solution has non-walk event density higher than v2
not_claimed:
  - unique_solution
  - object identity across all winning paths
```

## Falsification

- 若最短解仍表现为长走位后单线执行，critic 攻击成立，需放弃或降级。
- 若 `P/L` 只在最后一两步出现，不能作为本 revised claim 的候选。
- 若 B/S 或 P/L 任一锚点全胜路可绕过，claim 失败。
- 若完整图无法穷尽，则不进入合格候选。
