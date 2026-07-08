# Design Claim: RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0

```yaml
candidate_version: RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0
prototype: reality_anchor
role: challenge
status: candidate_pending_review

layout: |-
  ############
  #PL##...####
  #####G#G####
  #####MMM...#
  ####BS@.#..#
  ####.....#.#
  ########...#
  ############

design_goal:
  target_difficulty: "3+；若 critic 接受 staged brush 与 tooth consumption 的读题负担，可视作接近 4"
  target_aesthetic: "强 3 保底；追求 4，但不预设通过"
  relation_to_previous_candidate: >
    不是 RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1 的变体。上一关核心是顶部 stroke-select 与早二刷失败；
    本关核心是移动 B/S 边界分阶段刷切、先下拉 sticky pair 作为 staging，再由墙齿目标口和左侧 crate refill 分别消费输出。

lexicon_material_used:
  - "B/S 移动边界刷产物：边界跨过远处 footprint，输出 C+MM、CM 等不同材质形态。"
  - "固定/移动 B/S 切割的 C+M 尾债接口：可分离 crate 与保留 sticky 尾巴必须分别消费。"
  - "刚体黏块 + 墙齿/目标口：二格 sticky footprint 进入单格齿口时需要整块前沿开放，错误形态会被口型消费或拒绝。"
  - "P/L pull side 作为规则空间支撑：本关没有把 P/L 长轴做成核心谜题，只用它确保玩家处在 pull 世界以驱动 B/S。"

player_insight: >
  开局右拉 B/S 会把上方 MMM 刷成 CMM，但这不是终点。玩家必须读出第二步下拉会同时拉动 sticky pair 并让 B/S 再刷一次，
  形成可后续消费的 CM/单 sticky 配置；随后再通过右侧墙齿目标口消费 sticky，并回到左目标处拉 crate 补位。
  重点不是“按一次按钮”，而是先制造 staged output，再把两个不同目标债务分别偿还。

causal_chain:
  - 第一次右拉 B/S：`MMM -> CMM`，暴露左侧 crate 债与右侧 sticky pair 债。
  - 下拉：sticky pair 被拉下，同时 B/S 边界第二次跨线，产生 staged lower pair；这一步也是 force-chain 节点。
  - 第二次右拉 B/S：下方输出变成 `CM`，保留一个可被墙齿目标口消费的 sticky。
  - 右上绕位后连续上拉 sticky，使右侧目标由 sticky rigid movement 覆盖。
  - 最后回到左目标，拉 crate 覆盖，证明左目标不是装饰。

hard_claims:
  - 所有胜路都需要 B/S 边界切换、force_chain、sticky_to_box、sticky pull、sticky rigid movement、crate pull。
  - 所有胜路都至少需要 3 次 `anchor_boundary_shift:box_sticky`。
  - 所有胜路都至少需要 3 次 `pull_object:sticky#1`。
  - 所有胜路都至少需要 2 次 `sticky_to_box:n1`。
  - 所有胜路都至少需要 2 次 `pull_object:box_sticky_anchor`。
  - 所有胜路都至少需要 1 次 `pull_object:crate#1`。
  - 第二次 B/S 边界切换不能早于第一次 sticky pull；也就是说，玩家不能只连续刷完再收尾，必须先进入 sticky staging。

known_caveats:
  - P/L 在本关是静态规则空间开关，不是主动审美核心；no-P/L 反事实不可解，说明它不能删，但可读性上仍有“静态锚”风险。
  - 主图只有 104 个可达状态，最优路径 18 步，图结构偏紧；agency 显示 forced optimal prefix length 为 7，可能被 critic 判为脚本化。
  - 初始 SCC 只有 1 个状态，开局贴脸进入不可逆动作；这对 challenge 审美是扣分项。
  - 不主张唯一输入序列，不主张达到难度 4，只主张存在可审查的 3+ 机制链候选。
```
