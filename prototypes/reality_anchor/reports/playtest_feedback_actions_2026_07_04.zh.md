# 人测反馈处理记录：2026-07-04

## 来源

- 反馈文件：`prototypes/reality_anchor/playtest_reviews.yml`
- 处理者：Codex
- 范围：Reality Anchor 临时 playable 候选

## 决策

### RA_EXP_2026_07_04_SOFT_HANDOFF_v3

- 人测状态：`ready_for_archive`
- 人类评分：审美 4 / 难度 4
- 处理：已归档为 `RA_CAND_0002`
- 归档文件：
  - `prototypes/reality_anchor/design_archive/candidates/RA_CAND_0002.md`
  - `prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_soft_handoff.md`
- 理由：用户指出该关充分利用要素，并通过“拉动黏块”打破玩家对 P/L 锚点只能单向移动的预期，洞见较强。

### RA_EXP_2026_07_04_COMPACT_CHAIN_v1

- 人测状态：`reject`
- 处理：打回并移出临时 playable 队列
- 理由：用户指出部分黏块没有作用，部分只是流程中恰好变黏并粘在一起，没有消费黏块性质；不满足更强的结构必要性判据。

### RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2

- 人测状态：`needs_revision`
- 处理：由 `RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3` 取代
- 修改：把作用不清的左下材料格替换为墙。
- 探针结果：墙替换版仍保持 19 步可解且完整图搜索通过，因此原材料格不应再用自然语言辩护。

### RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2

- 人测状态：`reject`
- 处理：打回并移出临时 playable 队列
- 理由：用户指出黏块没有功能必要性。返回最优解虽然包含 `box_to_sticky`、`sticky_merge` 和 sticky 刚体移动，但若把黏块换成简单箱，只是多推几步；这说明黏箱转化只是执行捷径，不是必要结构。
- 证据修正：此前 ordinary-box analog 太窄，只证明我构造的某个替代版无解，没有排除用户指出的“普通箱等价但多推几步”的替代路线。

### RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2

- 人测状态：`reject`
- 处理：打回并移出临时 playable 队列
- 理由：用户指出同类失败模式。固定 P/L 影响了路线，但黏性整体仍没有承担不可替代的结构工作；换成简单箱是更长执行，而不是根本不可解。
- 证据修正：后续固定锚点候选需要比“事件必经 + 一个无黏 analog”更强的反事实，要专门攻击普通箱是否能通过额外腾挪替代。

### RA_EXP_2026_07_04_PHASE_FERRY_v8

- 人测状态：`needs_revision`
- 处理：标记为需要修改并移出临时 playable 队列
- 理由：当前证据能证明事件使用，但不能证明黏块具有结构必要性；不能把用户反馈解释掉。该关需要重做，或补一个能证明普通箱替代失败的结构证据。

## 处理后的临时队列

- `RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3`

clean archive 条目由 `design_archive/index.yml` 管理；打回、被取代和待修改但未接受的条目不保留在临时 playable 队列中。

## 第二批反馈处理：固定锚点过渡关与 DUAL_LOCKSTEP

### RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5

- 人测状态：`needs_revision`
- 人类反馈：右侧空间冗余，除此之外算是前期有趣小关。
- 处理：由 `RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6` 取代，并进入临时 playable。
- 修改：封掉右侧冗余尾部空间，保留原来的固定 P/L、可移动 B/S、竖向 sticky pair 先整体上提再 sticky_to_box 分裂的核心结构。
- 工具结果：
  - v6：完整图通过，9 步可解。
  - 普通双箱 analog：完整无解。
  - fixed-anchor probe：所有胜路都需要 B/S shift、pull、material normalization；P/L 无可达位移。
  - core4 event probe：所有胜路都需要 B/S shift、pull、sticky_to_box、sticky rigid movement。
- 处理结论：作为 compact transition 候选保留；不声明归档评分。

### RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2

- 人测状态：`needs_revision`
- 人类反馈：右侧空间冗余，下方小结构有趣，适合前中期机制引入。
- 处理：由 `RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3` 取代，并进入临时 playable。
- 修改：压缩右侧空间，保留固定 P/L 的 pull-side 语法、B/S 一次移动、C 变 sticky 后与 M 合体再整体落双目标。
- 工具结果：
  - v3：完整图通过，7 步可解。
  - 初始普通箱 analog：完整无解。
  - postmerge 普通箱 analog：完整无解。
  - fixed-anchor probe：所有胜路都需要 B/S shift、pull、box_to_sticky、sticky_merge、sticky rigid movement；P/L 无可达位移。
- 处理结论：作为 sidecar conversion 教学候选保留；不声明高难。

### RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2

- 人测状态：`needs_revision`
- 人类反馈：步骤单一，作为教学和机制引入可以保留；空间冗余略多。
- 处理：由 `RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3` 取代，并进入临时 playable。
- 修改：压缩右侧/上侧空间，保留固定 B/S 材料边界、P/L 一次 access switch、C 通过固定边界变 sticky 并与 M 合体后上推覆盖双目标。
- 工具结果：
  - v3：完整图通过，8 步可解。
  - 初始普通箱 analog：完整无解。
  - postmerge 普通箱 analog：完整无解。
  - fixed-anchor probe：所有胜路都需要 P/L shift、fixed B/S material effect、box_to_sticky、sticky_merge、sticky rigid movement；B/S 无可达位移。
- 处理结论：作为 fixed B/S 教学/机制引入候选保留；不声明高难。

### RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3

- 人测状态：`needs_revision`
- 人类反馈：堆叠锚点和箱子链在 P/L 推侧触及远端目标的结构有趣，但右下角箱子和空格是否必要需要说明或修改。
- 处理：不为旧 v3 辩护；由 `RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4` 取代，并进入临时 playable。
- 反事实结果：
  - 右下 M 改墙：仍 19 步可解，说明旧右下 M 不必要。
  - 右下 M 和右侧孤立空格都改墙：仍 19 步可解，说明这些空格也不必要。
  - 删除整条下排：完整无解。
  - 只留左侧一个下方缓冲格：完整无解。
  - 只留右侧一个下方缓冲格：完整无解。
  - 只留两个必要下方缓冲格：完整可解，成为 v4。
- 工具结果：
  - v4：完整图通过，19 步可解。
  - event probe：所有胜路都需要 P/L shift、B/S shift、pull、material normalization、sticky_merge、sticky rigid movement。
- 处理结论：右下 M 和冗余空格已删除；剩余两个下方空格有共同结构必要性，作为 v4 候选保留。

## 第二批处理后的临时队列

- `RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6`
- `RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3`
- `RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3`
- `RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4`

独立 evidence reviewer 与 puzzle critic 均已对四个新版给出 `proposal_ready_with_caveats` / `required_action:none`。四个新版可作为完整流程合格的 human-pending 待玩候选；不归档、不声明数值评分。

## 第三批反馈处理：待玩列表归档与打回

### RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6

- 人测状态：`ready_for_archive`
- 人类评分：审美 3 / 难度 2
- 处理：已归档为 `RA_CAND_0003`
- 理由：用户确认它是“教学使用箱黏锚点分离黏块”的简单可用教学关。归档定位为可用下界/简单练习，不声明高难。

### RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3

- 人测状态：`ready_for_archive`
- 人类评分：审美 4 / 难度 3
- 处理：已归档为 `RA_CAND_0004`
- 理由：用户确认下方利用推拉和黏块性质反复腾挪的结构较有趣；同时指出上方推箱黏锚点顺序与下方操作顺序弱耦合，因此定位为刚引入锚点可推拉事实时的过渡关。

### RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3

- 人测状态：`needs_revision`
- 处理：标记为 `rejected`，从临时 playable 队列移除，不归档。
- 理由：用户指出可移动 P/L 的作用主要是“开局挪开”，之后关卡退化成 push-world 操作，没有形成 Reality Anchor 的特色结构。该条不做自然语言辩护，后续需要重做或另起结构。

### RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4

- 人测状态：`ready_for_archive`
- 人类评分：审美 4 / 难度 4
- 处理：已归档为 `RA_CAND_0005`
- 理由：用户确认玩家侧矛盾明显，需要在 push world 触及 pull world 的远目标，从而想到构造黏块加锚点的三格长链；结构有趣，机制利用率高，整体是较好的挑战关。

## 第三批处理后的临时队列

- 无活动待玩候选。

实现上，`playable_levels.yml` 暂保留三个已归档源 ID 作为过滤哨兵，避免空列表被导出器解释为“展示所有未归档关卡”。`design_archive/index.yml` 的 clean archive 条目会把它们从 web playable 的 temporary entries 中过滤掉。

## 第四批反馈处理：当前待玩列表后处理

范围：只处理当前待玩列表中已有明确人类反馈的旧条目；保留其它线程新增的 `L04` / `L05`。

### RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1

- 人测状态：`ready_for_archive`
- 人类评分：审美 2 / 难度 5
- 处理：归档为 `RA_CAND_0006`
- 归档定位：negative example / critic calibration
- 理由：人类明确指出它是已有好关的高复杂度变体，小目标位置改动弱化机制美感并用较差方式增加腾挪难度，仅做反例归档。

### RA_CURR_2026_07_05_L01_INTRO_PUSH_v1

- 人测状态：`ready_for_archive`
- 人类评分：审美 2 / 难度 1
- 处理：归档为 `RA_CAND_0007`
- 归档定位：功能库存 / 第一关 intro witness
- 理由：人类确认它是最基本的无锚点教学关。

### RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1

- 人测状态：`needs_revision`
- 处理：标记为 `rejected`，由 `RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2` 取代。
- 修改：保留上方 push witness；下方箱子左移一格，并封住其上方格和右上格，强制玩家从右侧连续两次拉箱。
- 工具结果：
  - v2：完整图通过，8 步可解。
  - push/pull required probe：完整，无缺少 push 或 pull 的胜路。
  - pull-count probe：完整，无少于 2 次 pull 的胜路。
  - reachable scan：完整，无 P/L 位移或材料事件。
- review_2：独立 evidence reviewer 与 puzzle critic 均为 `proposal_ready_with_caveats` / `required_action:none`。

### RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1

- 人测状态：`needs_revision`
- 处理：标记为 `rejected`，由 `RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2` 取代。
- 修改：同一个箱子先右推两次，再下拉两次；目标左侧补墙，排除一次 pull 后绕回上方再 push 的旁路。
- 工具结果：
  - v2：完整图通过，6 步可解。
  - push/pull required probe：完整，无缺少 push 或 pull 的胜路。
  - push-count / pull-count probes：完整，无少于 2 次 push 或 2 次 pull 的胜路。
  - reachable scan：完整，无 P/L 位移或材料事件。
- review_2：独立 evidence reviewer 与 puzzle critic 均为 `proposal_ready_with_caveats` / `required_action:none`。

## 第四批处理后的临时队列

- `RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2`
- `RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2`
- `RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1`（其它线程新增，未处理）
- `RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1`（其它线程新增，未处理）

## 第五批反馈处理：当前待玩列表后处理

范围：处理本批已有明确人类反馈的 `L02 v2`、`L03 v2`、`L04 v1`、`L05 v1`；保留暂无本批反馈的 `L06`。

### RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2

- 人测状态：`ready_for_archive`
- 人类评分：审美 2 / 难度 1
- 人类评语：简单推拉锚点引入关
- 处理：归档为 `RA_CAND_0008`
- levels 状态：`accepted`
- 队列动作：移出临时待玩列表。

### RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2

- 人测状态：`ready_for_archive`
- 人类评分：审美 2 / 难度 2
- 人类评语：简单推拉应用关
- 二次人类反馈：`HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_002` 指出左下区域多余，开局 `下，右，下` 进入的死路过长，不适合第三关。
- 处理：归档为 `RA_CAND_0009`；随后按二次反馈在左下补一格墙，将 `#..#G####` 改为 `#.##G####`，缩短误导死路且保留 6 步主解。
- 证据回归：完整图 130 states / 294 transitions；push/pull required、push>=2、pull>=2、固定锚点/无材料外溢均通过。
- review_3：独立 evidence reviewer 返回 `supports_with_caveats / required_action:none`；独立 puzzle critic 返回 `supports_design_claim / required_action:none`。
- levels 状态：`accepted`
- 队列动作：移出临时待玩列表。

### RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1

- 人测状态：`ready_for_archive`
- 人类评分：审美 3 / 难度 2
- 人类评语：结构简单，逻辑清晰
- 处理：归档为 `RA_CAND_0010`
- levels 状态：`accepted`
- 队列动作：移出临时待玩列表。
- 注意：归档引用最新 `evidence_review ... review_2`，旧 review_1 的证据分歧已由实例级 probe 关闭。

### RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1

- 人测状态：`needs_revision`
- 人类反馈：顶部 P/L、左侧 push、右侧 pull 的顺序锁或因果关系不足，右侧 pull 像拼接上的无关部分。
- 处理：标记为 `rejected`，由 `RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2` 取代。
- 修改：
  - 中层普通箱 pull 改为开路动作，打开下绕通道。
  - 底部普通箱 push 保留为独立目标责任。
  - 顶部 P/L 仍要求同一水平长边的右向 pull 与右向 push。
  - 中层目标保留；删除后会让开路箱替代底部 push 职责，释放缺少 crate_push 的绕过。
- 工具结果：
  - v2：完整图通过，17 步可解，4331 reachable states。
  - direction-aware event probe：完整，无缺少 `anchor_pull_right`、`anchor_push_right`、`crate_pull` 或 `crate_push` 的胜路。
  - P/L shift count probe：完整，无少于 2 次 P/L shift 的胜路。
  - goal-prune：删除 top 目标绕过 `anchor_push_right`；删除 middle 目标绕过普通箱 push/pull 责任；删除 lower 目标绕过 `crate_push`，三目标均保留。
- review_2：独立 evidence reviewer 返回 `supports_with_caveats / required_action:none`；独立 puzzle critic 返回 `proposal_ready_with_caveats / required_action:none`。保持待玩候选，等待人测。

## 第五批处理后的临时队列

- `RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2`
- `RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1`（其它线程新增，暂无本批反馈）

## 第六批反馈处理：规划文档对齐后的待玩列表后处理

范围：处理待玩列表中已有明确反馈的 `L05 v2`、`L06 v1`、`L07 v1`、`L08 v1`；`L09 v1` 暂无反馈，保留。

### RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2

- 人测状态：`needs_revision`
- 人类反馈：开局第一步固定拉锚点不好；P/L 时机应来自中段主动推理，而不是开头或结尾，并需对照关卡规划第五关。
- 处理：标记为 `rejected`，由 `RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3` 取代。
- 修改：右下起点和普通箱入口债务让玩家先处理普通箱；P/L 右拉在第 17 步，P/L 右推在第 27 步，最终仍由普通箱 push 收束。
- 工具结果：v3 34 步可解，完整图 1203 states；direction probe 完整，无缺少 `anchor_pull_right`、`anchor_push_right`、`crate_pull` 或 `crate_push` 的胜路；P/L shift count probe 完整，无少于 2 次 P/L shift 的胜路。
- 注意：该版本修复 P/L 时机问题，但 34 步和早段多次 crate pull 有 padding 风险，等待独立 critic 判断。
- review_3：独立 evidence reviewer 返回 `supports_with_caveats / required_action:none`；独立 puzzle critic 返回 `revise_required / structural_revision`。结论：v3 不进入待玩列表，L05 需要更深 v4 结构重做。

### RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1

- 人测状态：`needs_revision`
- 人类反馈：左侧反复推箱子再拉出来的矛盾有趣，右侧区域像拼接，建议删除右侧并缩小关卡。
- 处理：标记为 `rejected`，由 `RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2` 取代。
- 修改：删除右箱、右下目标和右侧房间，保留单箱先 push 上目标、再 pull 出来、最后再 push 回去的核心循环。
- 工具结果：v2 23 步可解，完整图 945 states；direction probe 完整，无缺少 `anchor_pull_down`、`anchor_pull_right`、`anchor_push_right`、`crate_pull` 或 `crate_push` 的胜路。
- review_2：独立 evidence reviewer 返回 `supports_with_caveats / required_action:none`；独立 puzzle critic 返回 `supports_design_claim / required_action:none`。

### RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1

- 人测状态：`needs_revision`
- 人类反馈：简单黏块教学关，但 v1 没有体现黏块拼接性质；建议下方黏块右移一格、原位改墙。
- 处理：标记为 `rejected`，由 `RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2` 取代。
- 修改：按反馈右移下方黏块并补墙，第一推触发 `sticky_merge`，第二推使用合并刚体覆盖目标。
- 工具结果：v2 2 步可解，完整图 13 states；core probe 完整，无缺少 `sticky_merge` 或 `move_sticky_rigid` 的胜路；reachable scan 无 P/L/B/S 位移与材料转化。
- review_2：独立 evidence reviewer 返回 `supports_claim / required_action:none`；独立 puzzle critic 返回 `supports_with_noncore_caveats / required_action:none`。

### RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1

- 人测状态：`needs_revision`
- 人类反馈：开局往下一步直通正解不太好，建议将玩家初始位置改到右侧中间。
- 处理：标记为 `rejected`，由 `RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2` 取代。
- 修改：保留原 joining 结构，将玩家起点移到右侧中间，避免第一步直接触发核心转换。
- 工具结果：v2 9 步可解，完整图 186 states；fixed B/S material probe 证明所有胜路需要 `box_to_sticky`、`sticky_merge`、`move_sticky_rigid`，reachable scan 无 B/S 位移。
- review_2：独立 evidence reviewer 返回 `supports_claim / required_action:none`；独立 puzzle critic 返回 `supports_with_noncore_caveats / required_action:none`。

## 第六批处理后的临时队列

- `RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2`
- `RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2`
- `RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2`
- `RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1`（暂无本批反馈）

## 第七批反馈处理：继续清理旧待玩条目

范围：处理待玩列表中已有明确人类反馈的 `L06 v2`、`L07 v2`、`L08 v2`、`L09 v1`；`L10 v2` 与其它线程新增的 `L11 v1` 暂无反馈，保留在待玩列表。

### RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2

- 人测状态：`ready_for_archive`
- 人类评分：审美 4 / 难度 4
- 人类评语：箱子需要被推进目标再拉出需要较强反直觉洞见，在较小空间做出了紧凑的强逻辑关卡
- 处理：归档为 `RA_CAND_0011`
- levels 状态：`accepted`
- 队列动作：移出临时待玩列表。

### RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2

- 人测状态：`ready_for_archive`
- 人类评分：审美 2 / 难度 1
- 人类评语：精简的黏箱机制快速witness
- 处理：归档为 `RA_CAND_0012`
- levels 状态：`accepted`
- 队列动作：移出临时待玩列表。

### RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2

- 人测状态：`needs_revision`
- 人类反馈：直接移除没有被使用的最右空列。
- 处理：标记为 `rejected`，由 `RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3` 取代。
- 修改：删除最右空列，保留右侧中间起点、固定 B/S joining 骨架、箱转黏拼接和合并刚体右推收束。
- 工具结果：v3 9 步可解，完整图 116 states / 274 transitions；fixed B/S material probe 证明所有胜路需要 `box_to_sticky`、`sticky_merge`、`move_sticky_rigid`，reachable scan 无 B/S 位移。
- review_3：独立 evidence reviewer 返回 `supports_claim / required_action:none`；独立 puzzle critic 返回 `supports_with_noncore_caveats / required_action:none`。
- 队列动作：`L08 v3` 加入临时待玩列表，等待人测。

### RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1

- 人测状态：`ready_for_archive`
- 人类评分：审美 2 / 难度 1
- 人类评语：简单黏块切割教学witness
- 处理：归档为 `RA_CAND_0013`
- levels 状态：`accepted`
- 队列动作：移出临时待玩列表。

## 第七批处理后的临时队列

- `RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3`
- `RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2`（暂无本批反馈，保留）
- `RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1`（其它线程新增，暂无本批反馈，保留）

## 第八批反馈处理：L08 归档与 L10 去噪

范围：处理当前待玩列表中已有明确人类反馈的 `L08 v3` 与 `L10 v2`。其它线程加入又移出的条目不在本批反馈范围内。

### RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3

- 人测状态：`ready_for_archive`
- 人类评分：审美 2 / 难度 1
- 人类评语：黏箱用于拼接的教学关
- 处理：归档为 `RA_CAND_0014`
- levels 状态：`accepted`
- 队列动作：移出临时待玩列表。

### RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2

- 人测状态：`needs_revision`
- 人类反馈：大量冗余空间，左侧一大片区域和箱子冗余，右上角空地冗余。
- 处理：标记为 `rejected`，由 `RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3` 取代。
- 修改：删除左下冗余箱并封墙，压缩左侧无用活动列，封掉右上无用空地；保留 13 步核心 witness。
- 工具结果：v3 13 步可解，完整图 178 states / 423 transitions；核心事件 probe 完整，无缺少 `anchor_boundary_shift:box_sticky`、`box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid` 或 `push_object:crate#1` 的胜路；order probe 证明没有 B/S 早于 `sticky_merge` 的胜路；count probe 证明所有胜路至少两次 B/S shift；reachable scan 无 P/L hit。
- review_2：独立 evidence reviewer 返回 `supports_claim / required_action:none`；独立 puzzle critic 返回 `supports_with_noncore_caveats / required_action:none`。
- 队列动作：`L10 v3` 加入临时待玩列表，等待人测。

## 第八批处理后的临时队列

- `RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3`
- `RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1`（其它线程新增，暂无本批反馈，保留）

## 第九批反馈处理：L05/L10 归档与 RA_LEX 去噪

范围：处理当前待玩列表中已有明确反馈的 `L05 v4`、`L10 v3`、`RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1`。

### RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4

- 人测状态：`ready_for_archive`
- 人类评分：审美 4 / 难度 3
- 人类评语：同时要求对锚点和箱子的推拉应用，在简洁结构中实现充分机制覆盖和清晰逻辑链；评分基于它是前期推拉综合应用关。
- 处理：归档为 `RA_CAND_0015`
- levels 状态：`accepted`
- 队列动作：移出临时待玩列表。

### RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3

- 人测状态：`ready_for_archive`
- 人类评分：审美 3 / 难度 2
- 人类评语：强引导的黏块合并再切割教学。
- 处理：归档为 `RA_CAND_0016`
- levels 状态：`accepted`
- 队列动作：移出临时待玩列表。

### RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1

- 人测状态：`needs_revision`
- 人类反馈：确认右上黏块和上方空格的作用，如无作用就删；若右上可删，起点也能左移，然后整体布局删最右。
- 处理：标记为 `rejected`，由 `RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2` 取代。
- 修改：删除最右活动列，移除右上远端黏块和其上方空格；保留顶行把手和起点位置。
- 工具结果：
  - v2：完整图通过，27 步可解，449 reachable states / 975 transitions，低于 v1 的 691 / 1517。
  - core7 probe：完整，无缺少 P/L shift、B/S shift、pull、box_to_sticky、sticky_to_box、sticky rigid movement 或 sticky_merge 的胜路。
  - target-vacate probe：完整，无绕过 top_goal `[3,1]` covered -> uncovered -> covered 的胜路。
  - 三个局部起点左移版本均完整无解，因此本轮不采用起点左移；若坚持左移需要更大结构重做。
- 队列动作：`RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2` 加入临时待玩列表。

## 第九批处理后的临时队列

- `RA_LEX_2026_07_06_VACATE_BIND_RETURN_v2`
