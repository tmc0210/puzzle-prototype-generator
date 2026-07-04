# worker_round53 tight_coupled_core 设计起手

## 范围

- 原型：`ice_slide_escape`
- 模式：`meta_first_design`
- 目标：独立探索一个新的 `round53 tight_coupled_core` 草案，不复用旧 archive 布局、接口、对象角色、求解路线或因果链。
- 输出边界：只写 `prototypes/ice_slide_escape/reports/worker_round53_*` 文件；不写主线 candidate packet / claim / review 文件；不写独立 reviewer / critic 结论。

## 文档约束摘要

- A/B/C/D 必须是四个不同 edge cell。
- A->B 与 C->D 是两个独立 solve instance，不能合并成 any-edge。
- Base 允许 d6 前或更早；完整可达事件扫描不得命中 `ice_pass_through_d5`、`slide_restart_after_group`、`ice_destroy_group_d6_plus`。若使用更早 cutoff，按同一序列收窄。
- Meta 默认可以使用全部知识，允许 d6+/restart。
- 设计起点必须先写 fresh claim，再用 solver/miner/analyzer 验证；archive 只作人类审美校准，不能作结构起点。
- 本轮显式避免把“摧毁目标冰再找最近冰补回去”重复两次以上；每枚冰最好至少承担两个角色。

## Archive 校准摘取

- `ICE_CAND_0037` 人类审美 1：三个重复 target-door/借还步骤拼接，没有 meta 洞见，并有 A->D 外溢。round53 必须避免重复同构目标借还，也必须避免接口外溢。
- `ICE_CAND_0011` 人类审美 1：核心顺序逻辑存在，但大量冗余墙/空地与可删开局步骤严重损害审美。round53 必须压缩空间和冰数，删掉单一补位冰。
- `ICE_CAND_0015` 人类审美 1：机器支持“先破坏正确 target 状态”的链条，但玩家被唯一通路自然带着做，洞见不存在。round53 若使用 target-state 反转，必须让它来自真实读题压力，而不是入口强迫动作。
- `ICE_CAND_0020` 人类审美 2：base/meta 都是简单 witness，只能作为功能 connector，不是审美下界。round53 不能只满足 low-exposure + meta 可解。
- `ICE_CAND_0022` 人类审美 3：meta double-debt 扎实，但空间/要素交融不足，base 视角右侧几乎是摆设。round53 至少要让同一核心区域在 base/meta 都有核心作用。
- `ICE_CAND_0019` 人类审美 4：价值来自延迟隐藏 stopper，第一步无即时目标回报，后续才显出必要性。round53 应追求“先不显眼、后被消费”的非局部职责。
- `ICE_CAND_0024` 人类审美 5：base/meta 强空间复用、强要素复用，base-time lure 和遮蔽共同成立。round53 不复制其布局，但以“同一中间结构被两条流程不同方式消费”为目标。
- `ICE_CAND_0033` 人类审美 5：低难也可因小误导/回访重读成立。round53 不以机制堆叠代替读法变化。
- `ICE_CAND_0034` 人类审美 4：meta 中一个动作扰乱下方结构，形成新解而非复刻 base。round53 应把 meta 的破坏性动作设计成改写共享结构，而非附加右侧门。
- `ICE_CAND_0035` 人类审美 5 但不可模板化：B/C 同格价值依赖 return-pressure wrapper。本轮 A/B/C/D 全分离，不借 same-cell 加分。

## Fresh design claim

### Player insight

Base 视角下，玩家先把一个“看似只是挡路/目标占位”的核心目标冰转化为短停或 d3 牺牲后的结构材料；这一步不能只是最近补位。Meta 视角下，同一核心区域被 d6+/restart 重新解释：后期破坏性动作必须改写一个 base 使用过的 stopper /门 /目标关系，并迫使玩家用不同对象角色完成同一组目标。

### Causal chain target

理想骨架：

1. 所有目标初始都有冰，且这些目标冰封住 A->B 与 C->D 的直达路线。
2. Base 只用 d1/d2/d3/d4 或 boundary 以内事件：至少一块目标冰必须离开“正确状态”，但它随后承担 blocker/stopper/通路释放中的第二职责；补回目标只出现一次，且补位冰还必须承担后续 stopper 或路线解锁职责。
3. Meta 用 d6+/restart 破坏同一共享核心中的墙/冰组，改变 base 中某个目标冰或 stopper 的意义；meta 不是重复“破坏目标冰 -> 就近补冰”，而是先通过 d6 消耗/打开共享结构，再让一个已被 base 读过的对象角色翻转。
4. 每枚核心冰至少有两个角色：target occupant + door、filler + stopper、projectile + path opener、destructible group member + route blocker 等。

### Why not execution

- 玩家不能按“看到冰就推、看到空目标就补”线性执行获胜；至少一个推冰动作必须在当下没有即时 target 奖励，后续才显出必要性。
- 目标债最多作为一个环节，不能成为重复三次的主节奏。
- A/B/C/D 分离后，出口不能靠同格回访或 shortcut 获得审美；必须靠共享结构重读成立。

### Required / forbidden events

- Base required target：至少要求 `ice_stop_short` 或 `ice_destroyed_d3` / `ice_rebound_d4` 中的一个非平凡事件；若可行，避免 base d4+d3 简单串联。
- Base forbidden reachable：`ice_pass_through_d5`、`slide_restart_after_group`、`ice_destroy_group_d6_plus`。
- Meta required target：`ice_destroy_group_d6_plus` 与 `slide_restart_after_group` 优先；允许配合 d3/d2/d4，但不能只靠 d6 打开独立门。

### Falsification

- 若 base 或 meta 任一路径主要由两个以上同构“破坏目标冰再找最近冰补回去”组成，则放弃。
- 若某枚冰只有单一补位职责且删去不改变核心读法，则视为冗余，放弃或重写。
- 若 C->D 只是从另一侧执行 base 的同一顺序链，或 A/B/C/D 任一起点可解到接口外边缘 goal，草案不进入候选。
- 若 base 完整可达事件扫描命中 d5/restart/d6+，草案不进入候选。

## 几何探索方向

- 优先尝试 9x9 到 14x10 的紧结构，少量中墙错位，不用长走廊填空间。
- 目标数控制在 2-4；冰数控制在 3-5，避免每个目标配一个就近 spare。
- 先构造共享中核，再布 A/B/C/D；接口全部分离，避免 B/D 或 B/C 同格。
- ban 非预期优先使用整列/整圈墙和结构错位，而不是随机单墙修补。
