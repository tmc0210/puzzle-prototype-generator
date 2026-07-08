# Explorer Brief: pl_anchor_mixed_force_chain_wall

- prototype: `reality_anchor`
- topic: 箱 + P/L anchor 混合力链在墙附近的可动性和边界重写。
- seed_source: 用户指定“推拉锚点”实验不足；当前 `P/L 边界交接` 提到箱 + anchor 混合链仍缺，但本轮主语限定为 P/L anchor 本体。
- scope: crate 和 P/L anchor 进入同一 force chain；墙控制链端、玩家前格或后续边界语义；锚点必须移动。
- exclusions: 不研究多箱链本身；不把普通 crate push/pull 分配写成本 topic 成果；不使用 B/S / sticky。
- source_boundary: 可读本 brief、本轮 manifest、Reality Anchor runtime / mechanics、runner、`P/L 边界交接` 与相关 P/L anchor 条目。
- do_not_repeat: 不要只跑箱链；必须同时出现 `force_chain:n*` 与 `anchor_boundary_shift:push_pull`，或把失败例明确降级为门控反例。
- compare_checklist:
  - P 侧 push crate -> anchor，墙决定整链是否移动。
  - P 侧 push anchor -> crate，比较链顺序是否改变输出。
  - L 侧 pull anchor 与后方 crate 链，前格墙 / 目标格墙如何截断。
  - 锚点移动后，crate 的下一步 push/pull 语义是否改变。
  - 移除 crate 的锚点-only 对照，确认差异来自 mixed chain。
- budget: 5-8 cases；优先小图，状态图必须完整或明确降级。
- success_criterion: 证明混合链可以成为 P/L anchor 的结构用途：墙消费链端，锚点移动重写后续语义。
- output_contract: 写 runner 文件、notes、proposed families；若只是噪声或普通链，建议 `defer` / `relabel`，不要硬升 family。
