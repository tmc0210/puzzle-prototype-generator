# Mechanism Lab Brief: ra_loop_pl_single_crate_goal_piston_lock_20260708_01

- prototype: `reality_anchor`
- design_space: 单箱 P/L 活塞把 crate 推入目标 -> 若后续必须回撤则目标被拉出 -> 顺序锁 consumer
- seed_source: 用户指出单箱活塞大多退化，但当伸出位是目标时，目标必须最后达成，否则回撤会撤销覆盖。
- source_boundary: 只读取当前 `lexicon.md` / `lexicon_index.md` / 当前 run；旧活塞 run 仅作 provenance 参照，不读取关卡 archive / review / sampler profile。
- structure_spectrum:
  - 狭窄 P/L 单箱活塞，`right` 推入目标作为最后动作。
  - 同一结构 `right,left`，被迫回撤时把 crate 拉出目标。
  - 开放侧路中 `right,down` 可离开而不拉出 crate，说明锁依赖“必须回撤”。
  - 目标偏一格，`right` 不产生临时覆盖，说明目标必须落在伸出位。
- do_not_repeat: 不再证明单箱 `right,left` 可以回初态；本轮只看目标覆盖被回撤动作撤销。
- success_criterion: 至少观察到一个 case 中第一手覆盖目标、第二手 pull 撤销覆盖；并有侧路 / 目标偏位对照，证明这不是普通单箱 push 目标 witness。
- output_contract: 输出 `cases.yml`、runtime 结果、`explorer_notes.md`、`proposed_families.md`、`curator_decision.md`，并按 curator 流程 supplement 到 `P/L 边界交接`。

