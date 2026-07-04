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
