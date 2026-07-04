# Material Use Screen: Prior Reality Anchor Submissions

筛选标准：箱/黏变化不能只是事件名或视觉换名，必须被后续差异消费，例如变黏后合并/刚体移动、变箱后覆盖目标或改变路径/结构、拆散/重组导致后续动作可行等。

## 确认真用上

### RA_EXP_2026_07_04_COMPACT_CHAIN_v1

- 判定：真用上。
- 依据：返回解 step 2 触发 `box_to_sticky`，随后该材料进入 sticky 刚体移动链；step 15 触发 `sticky_merge`。event probe 对 `material_normalization`、`sticky_merge`、`sticky_rigid_move` 均未找到 winning bypass。
- 备注：P/L 权重较轻，但材料变化本身不是装饰。

### RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3

- 判定：真用上。
- 依据：返回解 step 21 触发 `box_to_sticky + sticky_merge`，step 22 立即推动合并后的 sticky；event probe 证明 `material_normalization`、`sticky_merge`、`sticky_rigid_move` 均为全胜路必要事件组。
- 备注：消费点偏后段；证据不证明具体对象实例唯一性。

### RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2

- 判定：真用上，且是较强材料消费。
- 依据：step 1 `sticky_to_box:n2` 制造箱/黏混合债务；step 3 `box_to_sticky + sticky_merge + move_sticky_rigid`；step 11-13 连续 `sticky_to_box` 形成后续箱链。event probe 六组核心事件均无 winning bypass。
- 备注：连续右推 B/S 有执行感，但不是单纯换名。

### RA_EXP_2026_07_04_PHASE_FERRY_v8

- 判定：真用上。
- 依据：左目标链里 step 6 `sticky_to_box` 后目标由箱状态承接；右侧链 step 15 `box_to_sticky` 后通过 sticky delivery 收束；event probe 对 `material_normalization`、`sticky_merge`、`sticky_rigid_move` 均无 bypass。
- 备注：末段 P/L 连推是非核心 caveat，不影响材料消费成立。

### RA_EXP_2026_07_04_SOFT_HANDOFF_v3

- 判定：真用上。
- 依据：step 8 `sticky_to_box` 改变局面；step 10 `box_to_sticky:n2 + sticky_merge` 重组材料；step 13 sticky 刚体/force chain 收束并伴随 `sticky_to_box:n2`。event probe 六组核心事件均无 winning bypass。
- 备注：短链脚本化风险存在，但材料换相不是孤立事件。

### RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1

- 判定：真用上。
- 依据：step 4 `box_to_sticky + sticky_merge`，step 5 `move_sticky_rigid` 获胜。强材质 fixed-anchor probe 对 `box_to_sticky`、`sticky_merge`、`sticky_rigid_move` 均无 winning bypass，且固定 B/S 不可移动。
- 备注：低难短型过渡关。

### RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2

- 判定：真用上。
- 依据：step 1 固定 P/L 拉动 B/S 并触发 `sticky_to_box`；step 5 `box_to_sticky + sticky_merge` 生成竖向刚体；step 6-7 `move_sticky_rigid` 覆盖竖向双目标。强材质 fixed-anchor probe 六组均无 winning bypass，且固定 P/L 不可移动。
- 备注：开局强制教学式，但符合过渡关。

## 不计为真用上 / 已打回或未提交

- `RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1`
- `RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1`
- `RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1`

这组三个在新标准下被 critic 打回：虽有箱/黏事件或锚点事件，但变化差异没有被后续结构充分消费。

## 中间失败族，不作为提交计入

- `RA_EXP_2026_07_04_FIXED_PL_STICKY_PULL_v1`
- `RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v1` 到 `v4`
- `RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v1`
- `RA_EXP_2026_07_04_FIXED_BS_VERTICAL_PAIR_v1`
- `RA_EXP_2026_07_04_FIXED_BS_VERTICAL_LOCK_v1` / `v2`

这些版本有些返回解看起来消费材料，但 all-solution probe 找到绕过，或固定锚点未功能性使用，或 B/S/P/L 可直接盖目标替代材料链，因此不纳入“真用上”的提交列表。
