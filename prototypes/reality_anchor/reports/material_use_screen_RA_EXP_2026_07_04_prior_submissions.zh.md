# Material Use Screen: Prior Reality Anchor Submissions

筛选标准：箱/黏变化不能只是事件名或视觉换名，必须被后续差异消费，例如变黏后合并/刚体移动、变箱后覆盖目标或改变路径/结构、拆散/重组导致后续动作可行等。2026-07-04 用户补充的更强判据：不能只是搜索最优解里发生转化；若把黏块替换成普通箱后仍只是多推几步，则黏块只是在省操作，不构成有效黏箱转化。

## 确认真用上

### RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3

- 判定：真用上。
- 依据：返回解 step 21 触发 `box_to_sticky + sticky_merge`，step 22 立即推动合并后的 sticky；event probe 证明 `material_normalization`、`sticky_merge`、`sticky_rigid_move` 均为全胜路必要事件组。
- 备注：消费点偏后段；证据不证明具体对象实例唯一性。

### RA_EXP_2026_07_04_SOFT_HANDOFF_v3

- 判定：真用上，并已人评归档。
- 依据：step 8 `sticky_to_box` 改变局面；step 10 `box_to_sticky:n2 + sticky_merge` 重组材料；step 13 sticky 刚体/force chain 收束并伴随 `sticky_to_box:n2`。event probe 六组核心事件均无 winning bypass。
- 人评补强：用户认为关卡充分利用要素，并用拉动黏块打破“推拉锚点只能被单向移动”的假设，审美 4 / 难度 4。

### RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3

- 判定：v2 的修订候选，暂按待复核处理。
- 依据：v2 用户指出左下材料格作用不清；墙替换探针证明该格不是必要结构。v3 将其替换成墙后仍保持 19 步可解和完整图搜索，减少误导性 ballast。
- 备注：这是修正后临时候选，不等同于人评归档。

## 需修改或需额外说明

### RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2

- 判定：撤回合格候选，reject_do_not_archive。
- 原先依据：core4 event probe 证明所有胜路都包含 `anchor_boundary_shift:box_sticky`、`box_to_sticky`、`sticky_merge` 和 `move_sticky_rigid`；普通箱 analog 在我构造的同墙形替代版中无解。
- 用户反馈后的处理：人测指出若把黏块换成两个简单箱，只是多推几步，黏块并未作为必要结构，而是在省走路。这个反馈击中了 packet 的证据边界：原 analog 只证明一个特定删锚/替代版无解，没有证明“简单箱替代不会以多推几步完成”。因此从 playable 移除，不归档，不再作为正向样本。

### RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2

- 判定：撤回合格候选，reject_do_not_archive。
- 原先依据：fixed-anchor probe 证明 P/L 固定，且所有胜路包含 B/S 位移、pull、`box_to_sticky`、`sticky_merge`、`move_sticky_rigid`；普通箱 analog 在我构造的同墙形替代版中无解。
- 用户反馈后的处理：人测指出黏块换成两个简单箱后仍只是多推两步，固定 P/L 并没有让黏性结构成为不可替代的约束。该关同样从 playable 移除，不归档，不再作为中期固定锚点过渡关候选。

### RA_EXP_2026_07_04_PHASE_FERRY_v8

- 判定：needs_revision。
- 原先依据：左目标链里 step 6 `sticky_to_box` 后目标由箱状态承接；右侧链 step 15 `box_to_sticky` 后通过 sticky delivery 收束；event probe 对 `material_normalization`、`sticky_merge`、`sticky_rigid_move` 均无 bypass。
- 用户反馈后的处理：该证据仍停留在事件/最优路径层级，不能充分说明黏块不是“恰好拼接的箱子”。暂不归档、不保留为当前临时候选；需要重做或补一个能证明普通箱替代会失败的结构证据。

## 不计为真用上 / 已打回或未提交

- `RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1`
- `RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2`
- `RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2`
- `RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2`
- `RA_EXP_2026_07_04_COMPACT_CHAIN_v1`
- `RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1`
- `RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1`
- `RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1`

这组在新标准下被打回：虽有箱/黏事件或锚点事件，但变化差异没有被后续结构充分消费。特别是 `FIXED_BS_STICKY_HANDLE_v1` 与 `FIXED_PL_VERTICAL_PAIR_v2`，用户复核指出黏块并没有作为不可替代结构发挥作用；如果把黏块换成两个普通箱，解法只是多推几步，说明黏性只是在压缩操作量，不是解空间约束本身。

`COMPACT_CHAIN_v1` 的用户反馈同类：有些黏块没有存在意义，有些只是在流程中变为黏块并恰好粘在一起，没有展示黏性结构必要性。因此从“确认真用上”撤回并打回。

## 中间失败族，不作为提交计入

- `RA_EXP_2026_07_04_FIXED_PL_STICKY_PULL_v1`
- `RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v1` 到 `v4`
- `RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v1`
- `RA_EXP_2026_07_04_FIXED_BS_VERTICAL_PAIR_v1`
- `RA_EXP_2026_07_04_FIXED_BS_VERTICAL_LOCK_v1` / `v2`

这些版本有些返回解看起来消费材料，但 all-solution probe 找到绕过，或固定锚点未功能性使用，或 B/S/P/L 可直接盖目标替代材料链，因此不纳入“真用上”的提交列表。
