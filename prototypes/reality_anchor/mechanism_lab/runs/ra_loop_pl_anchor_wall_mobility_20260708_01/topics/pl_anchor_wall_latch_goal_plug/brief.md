# Explorer Brief: pl_anchor_wall_latch_goal_plug

- prototype: `reality_anchor`
- topic: P/L anchor 作为墙口门闩和目标塞子的推拉可动性。
- seed_source: 用户要求结合墙进一步考察推拉锚点；现有语料较少把 P/L anchor 当二格门闩 / 目标占位物。
- scope: P/L anchor 本体在一格/二格墙口、门洞、目标格附近被 push/pull，移动后打开/堵住通道或覆盖/释放目标。
- exclusions: 不设计完整关卡；不把胜利条件当主要成果；箱子只可作为可选下游 consumer。
- source_boundary: 可读本 brief、本轮 manifest、Reality Anchor runtime / mechanics、runner、`P/L 横向把手` 和 `P/L 长轴墙廊` 条目。
- do_not_repeat: 不要只证明 anchor target-covering；要比较墙口宽度、锚点半格位置、回返把手和 shortcut。
- compare_checklist:
  - 一格墙口：anchor 移动前堵口，移动后开口或反过来。
  - 二格墙口：宽度过大导致 shortcut 或门闩失效。
  - 目标塞子：P/L 半格覆盖目标，移动后释放/覆盖；对照目标少一格或墙口错位。
  - push 进入墙口 vs pull 抽出墙口。
- budget: 5-8 cases；至少包含一个宽度 shortcut 或过窄 `force_blocked` 反例。
- success_criterion: 能证明 P/L anchor 的二格 footprint 被墙口 / 目标消费，而不是只是可移动物体。
- output_contract: 输出完整 runner 与语料草案；若只得到目标覆盖 witness，没有墙口消费，则 `defer`。
