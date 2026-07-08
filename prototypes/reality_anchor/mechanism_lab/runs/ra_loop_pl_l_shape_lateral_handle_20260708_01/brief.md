# Mechanism Lab Brief: ra_loop_pl_l_shape_lateral_handle_20260708_01

- prototype: reality_anchor
- design_space: P/L 边界横向 stroke 推出 L 形 sticky -> 按 L 形朝向生成或关闭正交把手 / 侧向目标格 / 扫带目标格 -> 墙位、站位门或可移动邻物消费这些差异
- seed_source: 用户指定 scope：P/L 活塞结构中，特定 L 形除了原路返回，还可侧向拉动、之后再返回，或推动附近物件；用户进一步指出不同 L 形结构在这里有差异。
- source_boundary: 允许读取当前 Reality Anchor 规则、当前 mechanism_lab lexicon/index/backlog、当前 run；禁止读取 design archive、人类评价、历史候选包、sampler profile、hardcoded layout template 和旧 runs，除非后续核对 provenance 时另行说明。
- structure_spectrum:
  - 下凸在左：同一墙位不挡第一手横向 `right`，但成为侧向 `down pull` 的右臂目标墙。
  - 下凸在右：同一墙位变成第一手横向 `right` 的下凸格目标墙，活塞伸出前即失败。
  - 上凸在左：同一墙位不挡第一手横向 `right`，但成为侧向 `up pull` 的右臂目标墙。
  - 上凸在右：同一墙位变成第一手横向 `right` 的上凸格目标墙。
  - 初始把手封闭，stroke 后打开：初始下方把手格被墙封住；横向 stroke 把 L 形下凸把手移到开放列，生成侧向 pull 把手。
  - 可移动邻物替代墙：同一侧向目标格放 B/S anchor 时，侧向 pull 扫带该 anchor 并覆盖目标。
- do_not_repeat:
  - 不重复证明 sticky L 形可被推 / 拉。
  - 不把开放房间内普通 L 形侧拉写成成果；关键是横向 P/L stroke 生成或改变正交把手 / 目标格。
  - 不把 B/S anchor 当成本轮主机制；它只作为可移动邻物 consumer。
  - 不把 `returnToInitial.status=exhausted` 当作不可回返证据。
- success_criterion: 至少证明同一墙位在不同 L 形朝向中消费不同阶段：第一手行程、侧向 pull 目标格或不消费；并证明一个最小 consumer 已经消费输出，例如侧向把手门或可移动邻物扫带。若只得到普通 L 形可动性，则只保留 explorer note，不建议更新正式 lexicon。
- output_contract: 生成 cases.yml、cases.json、results.json、report.md、explorer_notes.md、proposed_families.md、curator_decision.md；正式 lexicon/index/backlog 不直接修改，若建议更新，先在 curator_decision.md 中列清单等待用户确认。
