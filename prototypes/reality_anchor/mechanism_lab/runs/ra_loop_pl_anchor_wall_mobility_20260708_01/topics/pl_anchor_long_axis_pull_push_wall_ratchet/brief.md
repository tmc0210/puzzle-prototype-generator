# Explorer Brief: pl_anchor_long_axis_pull_push_wall_ratchet

- prototype: `reality_anchor`
- topic: P/L anchor 长轴墙廊中的 push / pull 驱动、端点余量与回返门。
- seed_source: 用户指定“推拉锚点”实验不足；当前 lexicon 只有 P 侧 push 长轴墙廊基础谱。
- scope: 只研究 P/L anchor 本体在长轴方向被 push 或 pull 时的可动性；墙廊、端点空格、侧廊和回返把手是 consumer。
- exclusions: 不研究普通箱子 / sticky 可动性；不读取 design archive、candidate、critic、人类评价、sampler profile。
- source_boundary: 可读本 brief、本轮 `round_manifest.md`、Reality Anchor `mechanic.yml` / `mechanics.ts` / `runtime.ts`、runner、`P/L 长轴墙廊` 正式条目和 `lexicon_index.md`。
- do_not_repeat: 不要只重复 `long_axis_no_front_cell / one_front_cell / two_front_cells`；必须补 pull 驱动或 push/pull 对照中的新墙位 / 回返差异。
- compare_checklist:
  - P 侧 push：端点余量 0 / 1 / 2，只作为基线和对照。
  - L 侧 pull：玩家前格墙、P 半格目标墙、开放目标、拉后回返墙。
  - 侧廊开放但无反向施力 vs 真正反向把手开放。
  - 首步 legal 后是否出现 `anchor_boundary_shift:push_pull`，最终是否 `graph_complete`。
- budget: 5-8 cases，优先把显然相邻墙位顺手覆盖；不要把同一谱系的普通相邻变体写成 backlog。
- success_criterion: 产出一个长轴锚点墙廊谱：push 与 pull 都有局部图或精确布局、机制角色、I/O、旋钮、误用边界和证据；若 pull 只重复旧 push，则建议 `merge` / `supplement`，不得强行 promote。
- output_contract: 写 `cases.yml`，运行 runner，补 `explorer_notes.md` 和 `proposed_families.md`。proposed 即使建议 supplement，也必须和 promote 项规格对齐。
