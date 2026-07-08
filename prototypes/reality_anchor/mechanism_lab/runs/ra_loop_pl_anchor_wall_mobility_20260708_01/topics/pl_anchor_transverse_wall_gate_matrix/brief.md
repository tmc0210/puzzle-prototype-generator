# Explorer Brief: pl_anchor_transverse_wall_gate_matrix

- prototype: `reality_anchor`
- topic: P/L anchor 横向/竖向把手墙门矩阵。
- seed_source: 用户指定“推拉锚点”实验不足；当前 lexicon 只有少量横向把手墙位。
- scope: 研究 P/L anchor 本体被垂直/水平推拉时，玩家前格门、P 半格目标门、L 半格目标门和移动后回返门如何分离。
- exclusions: 不把 `destination_blocked` / `force_blocked` 写成单独成果；不研究 B/S、sticky 或完整关卡。
- source_boundary: 可读本 brief、本轮 manifest、Reality Anchor runtime / mechanics、runner、`P/L 横向把手` 正式条目和 `lexicon_index.md`。
- do_not_repeat: 不要只复制旧 `p_side_push_down_*` / `l_side_pull_up_*`；要补旋转方向、上/下或左/右对称破缺、以及移动后回返门。
- compare_checklist:
  - 横放 `PL`：P 侧 push 下/上、L 侧 pull 上/下。
  - 竖放 `P/L`：左/右方向上的等价或不等价。
  - 墙位：玩家前格、P 半格目标格、L 半格目标格、移动后反向把手格。
  - 正例必须移动锚点并发出 `anchor_boundary_shift:push_pull`；失败例要明确是哪一类墙门。
- budget: 6-10 cases；优先做能构成矩阵的最小 patch。
- success_criterion: 得到一个墙门分类器：每个墙格关闭的层次不同，且至少一个移动后回返门被消费。
- output_contract: 写 runner 产物、explorer notes、proposed families。草案必须包含局部结构谱图，不能只列覆盖表。
