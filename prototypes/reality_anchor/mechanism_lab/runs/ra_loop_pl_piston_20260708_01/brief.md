# Mechanism Lab Brief: ra_loop_pl_piston_20260708_01

- prototype: reality_anchor
- design_space: P/L 边界上的往复受力体 -> 伸出 / 回撤 / 残余债 / 形状阻塞 -> 墙口、侧齿或单步回撤消费活塞本体差异
- seed_source: 用户指定 scope：P/L 锚点边界上，玩家穿越边界的推动可被紧接一次拉动撤回，或形成活塞结构；用户进一步要求按活塞本体、箱子组、黏块形状和墙阻碍拆变体。
- source_boundary: 允许读取 Reality Anchor 当前规则实现、mechanism_lab 当前 lexicon/index/backlog 和本 run 文件；禁止读取 design archive、人类评价、历史候选包、sampler profile、hardcoded layout template 和旧 runs，除非后续核对 provenance 时另行说明。
- structure_spectrum:
  - 单箱退化标尺：P 侧右推跨界，玩家落到 L 侧后立刻 left pull 精确回初态；若无 consumer，大多只是动作 witness。
  - 箱链近端抽取：`CC` 被 P 侧 right push 整链推进；紧接 L 侧 left pull 只抽近端箱，远端箱留下残余债。
  - 二格 sticky 横条：`MM` 作为刚体活塞 right/left 精确往复；侧齿若不在占格目标内，不消费横条。
  - L 形 sticky + 侧齿：横条增加下凸格后，同一侧齿落到下凸格目标位，首步伸出被 `force_blocked`。
  - L 形 sticky 宽口：移除侧齿后，L 形同样 right/left 往复，证明阻塞来自侧齿消费下凸格。
  - 横条前沿行程墙：二格横条前端目标格加墙，伸出行程本身被拒绝。
- do_not_repeat:
  - 不重复证明 “P 侧能 push / L 侧能 pull”。
  - 不把单箱 right/left 精确回初态写成正式成果。
  - 不把普通 sticky 刚体撞墙写成 B/S 或 P/L 边界新规则；只有当它消费边界往复活塞的本体形状 / 行程输出时才作为本轮语料。
  - 不把 `returnToInitial.status=exhausted` 当作不可回返证据。
- success_criterion: 至少形成一个 runtime-backed 结构谱，说明不同活塞本体在同一 P/L 边界 stroke 中产生不同输出：精确回撤、近端抽取残余债、刚体往复、侧齿分类、行程墙阻塞；并明确哪个墙口 / 侧齿 / 回撤动作消费了这些输出。若只有事件 witness 或缺少 consumer，则仅保留 proposed notes，不更新正式 lexicon。
- output_contract: 生成 cases.yml、cases.json、results.json、report.md、explorer_notes.md、proposed_families.md；如建议更新正式 lexicon/index/backlog，只在 curator_decision.md 中写建议，不直接修改入口文件，等待用户确认。
