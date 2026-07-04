# Fresh Design Claim: RA_EXP_2026_07_04_SOFT_HANDOFF_v0

```yaml
prototype: reality_anchor
family: soft_handoff
archive_lineage_policy:
  default: fresh_required
  candidate_relation: fresh
  why_not_archive_variant: >
    本轮只使用 RA_CAND_0001 的人类评语作口味校准，不沿用其竖直/水平正交
    锁、上方封闭 M、下方把手或三目标因果链。目标是另起一个更低难度的
    单线换相结构。
role: challenge
allowed_exposure_through: all_current_reality_anchor_runtime_rules
target_difficulty_intent: >
  比 PHASE_FERRY_v8 更低一档：减少回返、减少多阶段索引，保留双锚组合但让
  玩家主要解决一个先后顺序，而不是维护长程对象身份链。
score_claim_allowed: false
```

## 设计目标

- 同时存在一个 `P/L` 锚点和一个 `B/S` 锚点。
- 核心矛盾是“先把推拉边界调到能移动对象的位置，再把箱/黏边界调到能完成目标覆盖的位置”。
- 至少一条胜利解需要使用两类锚点位移、一次 pull，以及一次材料归一化。
- 若 `sticky_merge` 或 `move_sticky_rigid` 出现，可作为增味或收束，不强行声明为所有胜路必经，除非 probe 支持。
- 不要求唯一解；若存在等价短解，候选仍可接受，只要玩家侧主读法清楚、没有完全绕过双锚交互。

## Player Insight

玩家应当意识到两个锚点不是两道独立门，而是一组顺序开关：`P/L` 决定“我现在能推还是能拉”，`B/S` 决定“被搬运的对象当前是可分离箱子还是刚性黏块”。较低难度版本的洞察只要求玩家看出先后关系，不要求长距离 ferry 或目标身份追踪。

## Causal Chain

1. 初始对象和目标摆位让直接推箱覆盖目标不可行，至少一个目标需要材料状态变化或锚点格参与覆盖。
2. 玩家移动 `P/L`，打开一次 pull 或防止对象被推入死位。
3. 玩家移动 `B/S`，让箱/黏边界切换对象状态，得到可完成的覆盖形态。
4. 最后一两步把对象或锚点送到目标上，形成短收束。

## Why Not Execution

关卡不应只是机械执行一串显眼推箱动作；玩家需要判断哪一个锚点先动。低难度目标意味着允许路线短、允许局部可逆，但不能让任一锚点完全无关，也不能让目标被初始锚点静态覆盖后绕过核心机制。

## Required / Forbidden Events

```yaml
required_winning_path_events_target:
  hard_if_supported_by_probe:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
  optional_or_route_events:
    - sticky_merge
    - sticky_rigid_move
forbidden_winning_path_events:
  - none_declared
forbidden_if_seen_anywhere:
  - runtime_error
```

## Falsification

- 若 solver 找到不移动 `P/L` 或不移动 `B/S` 的胜路，则 claim 失败。
- 若存在完全不触发 pull 的胜路，则“推拉边界先后关系”降级或失败。
- 若存在完全不触发材料归一化的胜路，则“箱/黏边界换相”失败。
- 若最短胜路只有 1-6 步且两锚点只是顺手推过，候选应放弃或改成 mechanic witness，不作为本轮挑战候选。
- 若完整图无法在合理状态数内跑完，本轮不把全胜路必要性作为 hard claim。

## 工具问题

- solver 是否给出 8-18 步左右的标准胜路。
- graph 是否可完整穷尽，所有胜路是否都包含两类锚点位移、pull 和材料归一化。
- trace 中是否能产生清晰的关键步骤 snapshot，便于人类之后归档评估。
