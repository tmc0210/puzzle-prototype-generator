# ICE_EXP_META_2026_07_03_round53_tight_coupled_core_v0 fresh claim

```yaml
candidate_family: tight_coupled_core
prototype: ice_slide_escape
design_mode: meta_first_design
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
```

## 设计目标

- A/B/C/D 四个接口全部分离，不使用 B/D、B/C、D/A 等重合接口。
- 初始目标格均有冰；目标覆盖状态同时构成路径锁，玩家必须主动制造并偿还状态债。
- base 使用 d6 前或更早知识，优先控制在 d3/d4/short-stop 范围；base 完整可达扫描不得命中 d5 pass、restart、d6+。
- meta 默认可使用全部知识，允许 d6+/restart，但必须通过共享结构重读产生价值，而不是右侧局部门。
- 两条流程都不低于难度 2，至少一条达到 3；审美目标为 4 分下界，避免 0037 / 本轮 v38 的低密度重复补位失败。

## Fresh Design Claim

```yaml
player_insight: >
  玩家面对的不是三次同构 target-debt 借还，而是一枚核心目标冰的双重身份：
  它在初始时既是目标覆盖，也是通道门 / stopper。base 必须把它短暂移出目标，
  但这个移动同时预置或保留另一枚冰的后续停止条件；meta 则用后期破坏机制
  改写同一中间结构，使原本的门 / stopper 变成炮弹或被破坏组的一部分。

causal_chain:
  base:
    - "核心目标冰 T 先作为通道门被移开；这一步不能只是最近补位，而要改变另一冰 P 的可停位置。"
    - "P 的移动结果同时偿还 T 或为偿还 T 提供 stopper；P 不是单独补位冰。"
    - "到 B 前只允许一处真正 target debt 偿还；若出现第二、第三个同构偿还步骤，结构失败。"
  meta:
    - "C 侧先触发 d6+/restart 或等价后期破坏，作用于 base 中同一中间结构。"
    - "后期破坏应改变 T/P 的角色关系：例如 T 从门/stopper 变成炮弹障碍、被破坏组成员、或反向止动资源。"
    - "meta 的关键不是再找最近冰补 T，而是利用 T/P 的角色转换解决路径与目标覆盖的矛盾。"

why_not_execution: >
  如果玩家能按“看见目标冰就推走，再从邻近冰补回”的局部套路重复推进，
  本候选失败。每个非墙冰都必须至少有两个玩家可感知角色；只承担补位的冰应删去。
  若 C->D 只是在右侧完成局部 d6 开门后走到出口，或 B/D 等接口重合制造无意义收束，
  本候选失败。

required_or_forbidden_events:
  base_required_winning_events:
    - "ice_destroyed_d3 or ice_rebound_d4 or ice_stop_short, pending concrete layout"
  base_forbidden_if_seen_anywhere:
    - ice_pass_through_d5
    - slide_restart_after_group
    - ice_destroy_group_d6_plus
  meta_required_winning_events:
    - ice_destroy_group_d6_plus
    - slide_restart_after_group
    - "at least one early event reused in a different role, pending concrete layout"

falsification:
  - "存在 A->B 或 C->D 胜利路径，其主要 pushes 是两个以上同构 target-debt 补位步骤，则审美 claim 失败。"
  - "存在 off-target 冰只在 returned solution 中承担单纯补位角色，且不作为门 / stopper / projectile / obstacle，则密度 claim 失败。"
  - "A/B/C/D 任意重合，或同流程出入口相邻导致接口价值主要来自便利收束，则接口 claim 失败。"
  - "base 完整可达扫描命中 d5 pass、restart 或 d6+，则 early-readable claim 失败。"
```

## 本轮工具问题

1. 是否存在 4-6 枚冰以内的布局，让 base/meta 都可解且 A/B/C/D 全分离？
2. base 是否能在完整可达图中排除 d5/restart/d6+？
3. meta 是否必须使用 d6+/restart，并且不是单独右侧局部门？
4. returned trace 中每枚非墙冰是否都能解释为至少两个角色，或者可以被删去？
5. 是否存在外部 edge escape 或未忽略内部 pair 抢走目标读法？
