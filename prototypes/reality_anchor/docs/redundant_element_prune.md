# Reality Anchor 冗余要素剔除流程

状态：`reality_anchor` 原型专属的提交前检查 / feedback-routed revision 检查。它不是通用 Sokoban 规则；但一旦 Reality Anchor handoff 声明并触发它，必须在提交给人类查看或加入待玩列表前执行并记录结果；它不进入 reviewer / critic packet。

## 目标

剔除不承担结构责任、审美责任、机制责任的冗余要素。这里的要素包括目标、可动物体、普通空地、外墙厚度和轮廓残留。

本流程不把“未出现在最短解中”直接等同于冗余。一个要素可以不在 returned trace 中出现，但仍可能阻止 bypass、表达推/拉站位命题、限制对象路线、提供 opening comfort、提供审美或设计价值，或作为完整图中的必要约束。

## 固定顺序

按下面顺序处理，不能反过来：

```text
1. goal_prune
2. object_remove_prune
3. object_wallify_prune
4. space_prune
5. wall_outline_prune
```

原因：

- 目标先处理。否则一个初始压在目标上的对象可能只是在覆盖无效目标，形成目标和对象的循环引用。
- 对象先于空地处理。否则对象删除后新出现的 pocket / deadend 会漏掉。
- 墙和轮廓最后处理。否则外框裁剪可能掩盖目标、对象和空地责任。

## 通用硬门槛

任何删除、墙化或裁剪版本都必须至少满足：

- 原解完全不变，不新增bypass
- opening comfort 不变坏：例如 first irreversible commitment 不提前、initial SCC 不退化到与关卡定位冲突的贴脸承诺；
- 若有关卡专属目标义务，例如 target-vacate，必须重新验证。

任一硬门槛失败时，该要素不能通过本流程删除；结论为 `keep` 或 `unknown`。

## 1. Goal Prune

目标剔除按 `prototypes/reality_anchor/docs/goal_prune_check.md` 执行。本流程只规定它必须先跑。

## 2. Object Remove Prune

候选对象：

- 不在 returned trace 中移动；
- 不在 returned trace 中类型转换；
- 不参与 returned trace 的核心事件；
- 初始压在目标上，但该目标已经通过 `goal_prune` 删除或证明不依赖该对象；
- 孤立在角落、边缘或 pocket 中，像材料但没有明确操作责任；
- 人类反馈指出某个箱子、黏块或锚点可能无作用。

反事实动作：

```text
crate / sticky / anchor cell -> floor
object-on-goal -> goal
```

若对象跨多个格，例如锚点或黏块，应按完整对象整体删除，不逐格删除。

可删除条件：

- 通用硬门槛全部满足；
- 删除后没有 missing-core-event winning bypass；
- 删除后没有目标义务 bypass；
- 删除后布局更清楚，且该对象没有可说明的机制命题、设计价值、审美价值。

## 3. Object Wallify Prune

如果 `object_remove_prune` 失败，但对象不移动、不转换、不参与核心事件，继续测试它是否只是静态 blocker。

反事实动作：

```text
object cell -> wall
object-on-goal -> wall，并记录该目标已先经 goal_prune 处理或保留理由
```

若 `wallify` 版本满足通用硬门槛，说明该对象只承担墙的职责。除非 packet 明确说明它的价值，否则应改成墙，避免把静态 blocker 伪装成可操作材料。

结论：

```text
remove pass:
  对象完全冗余，删除。

remove fail, wallify pass:
  对象只是静态 blocker，改墙。

remove fail, wallify fail:
  对象可能承担可移动、可转换、阻断、路线或机制责任，保留或 unknown。
```

## 4. Space Prune

候选空地：

- 普通空地，不是目标、初始对象、机制对象；
- 静态拓扑中 degree <= 1 的 leaf / deadend；
- 单入口 pocket；
- 边缘多出来的一格空洞；
- 人类反馈指出的无用支路。

有保留价值的空地通常至少满足一条：

- 是 expected trace 的玩家站位；
- 提供推/拉方向、等待位、回返位或对象路线；
- 提供基本的活动空间，避免玩家正解的每步操作完全固定
- 提供审美价值，例如局部图案对称性
- 用于隐藏某个关键站位，例如某个关键站位单独开口过于突兀，保留一些不新增bypass的空格以使题目自然
- 提供与关卡定位相符的 opening comfort。

反事实动作：

```text
floor -> wall
```

可删除条件：

- 通用硬门槛全部满足；
- 该格不在 returned trace 的玩家路径或对象路径中；
- static degree 通常 <= 1，或 pocket 整体只有单入口；
- wall-prune 后 first irreversible commitment 不提前；
- wall-prune 后核心链条和目标义务保持；
- lead designer / controller 找不到明确的存在价值。

凸包式扩大通常不主动删除。若一个区域只是房间轮廓的平滑扩大、矩形补完，且不形成 leaf / pocket，默认不作为候选。只有它形成单入口枝杈或无责任 pocket 时才进入 `space_prune`。

## 5. Wall / Outline Prune

候选墙体：

- 外框有两格或更多厚度；
- 已经没有机制阻挡责任的多余外墙；
- 目标、对象、空地剔除后留下的空列 / 空行；
- 人类反馈指出“最右空列”“无用外框”等。

优先做裁剪，而不是把墙改成地面。

反事实动作：

```text
trim empty outer row / column
trim wall-only outer row / column
trim wall-thick border while preserving rectangular layout
```

可裁剪条件：

- 通用硬门槛全部满足；
- 裁剪不改变对象、目标和玩家的相对结构责任；
- 裁剪不改变推/拉、force_blocked、destination_blocked 等机制边界；
- playable / editor 仍能正常读取矩形布局。
- 裁剪不会导致最外圈任意格非墙

## 输出形状

```yaml
redundant_element_prune:
  status: clean | pruned | kept_with_unknown | skipped
  sequence:
    - goal_prune
    - object_remove_prune
    - object_wallify_prune
    - space_prune
    - wall_outline_prune
  candidates_checked:
    - element:
        kind: goal | object | space | wall_outline
        id_or_cell:
      action_tested: remove | wallify | wall_prune | trim
      result: remove | wallify | trim | keep | unknown
      reason: ""
      hard_facts:
        cost_delta: "old->new"
        graph_status: complete | exhausted
        expected_trace_win: true | false
        core_event_bypass: none | "missing group list"
        opening_delta:
        target_obligation_bypass:
      semantic_role: none | structural | blocker_only | read_graph | opening_comfort | unknown
  removed_elements:
    - kind:
      id_or_cell:
  wallified_objects:
    - id_or_cell:
  trimmed_outline:
    - description:
  retained_elements:
    - kind:
      id_or_cell:
      reason:
  evidence_refs:
    - prototypes/reality_anchor/reports/...
```

若实际改动关卡，必须同步更新：

- `prototypes/reality_anchor/levels.yml`
- 候选 packet / reports / 相关 experiment 记录
- `prototypes/reality_anchor/playable_queue.yml` 与 playable export，若该候选已在待玩列表或即将加入待玩列表
- design archive 记录仅在 exact human-reviewed version 被归档或显式替换时更新；人类游玩后发生的裁剪、删除、墙化或轮廓调整必须先作为新版候选重新进待玩列表
