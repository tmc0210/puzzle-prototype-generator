# worker_round46_order_gate_debug_report

```yaml
prototype: ice_slide_escape
date: 2026-07-03
focus:
  - round45 scratch_v6_double_anchor
  - round45 scratch_v7_order_gate
recommended_layout: prototypes/ice_slide_escape/reports/worker_round46_order_gate_scratch_v2_layout.txt
status: recommend_v2_as_small_structural_repair
```

## 结论

本轮最好的小范围修复是 `worker_round46_order_gate_scratch_v2_layout.txt`：

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####II#.#I..###########
####.......############
####**.##..############
##########.############
```

它从 v7 的顺序门方向回收局部结构，但在 row7 加断点，阻止 A 从左侧把 row7 走成横向旁路。它不是完整的“右补债资源作为通往左补债/侧口的顺序门”：为了堵住 A，row7 被切断，meta 最短解仍采用 v6 风格的下侧小室进入与内部 d6。若强保 row7 开口，A 旁路会立即回来。

## 取证摘要

| scratch | base A=[0,5] -> B=[10,10] | meta C=[10,10] -> D=[22,5] | 评价 |
| --- | --- | --- | --- |
| v1 | yes, cost 29, 双目标债 + 双 d2 补回 | yes, cost 47, 内部 d6 + 补回 | 可用，但图更大：base 4989 states / meta 13410 states |
| v2 | yes, cost 29, required gate pass | yes, cost 47, required gate pass | 推荐；base 3251 states / meta 9045 states |
| v3 | yes, cost 15，但缺少目标债链 | yes, cost 47 | 失败：row7/row8 仍给 A 简单侧袋旁路 |
| v4 | yes, cost 29 | no | 失败：封左锚/入口会杀掉 meta，且仍未消掉 base 可达 d6 |

v2 的 `compare-starts-layout` 结果：

- `worker_round46_order_gate_scratch_v2_base_required`: pass。
  - required winning events: `ice_destroyed_d3`, `ice_stop_short`
  - forbidden winning events: `ice_destroy_group_d6_plus`, `ice_pass_through_d5`
  - 未找到缺 required 的胜利路径，未找到触发 d6/d5 的胜利路径。
- `worker_round46_order_gate_scratch_v2_meta_required`: pass。
  - required winning events: `ice_destroy_group_d6_plus`, `ice_destroyed_d3`, `ice_stop_short`
  - 未找到缺 required 的胜利路径。
- `worker_round46_order_gate_scratch_v2_base_no_d6_reachable`: fail。
  - base 完整可达图仍命中 `ice_destroy_group_d6_plus:len2`。
  - 但该 d6 不在胜利路径上；base required gate 证明没有 d6/d5 winning bypass。

## v2 结构读法

base 保留目标债链：

1. A 从左侧推 [5,5] 目标冰，`ice_destroyed_d3`，制造左目标债。
2. 再推 [9,5] 目标冰，`ice_destroyed_d3`，制造右目标债。
3. 从下侧小室把右补债冰上推，`ice_stop_short:d2`，补回右目标。
4. 再把左补债冰上推，`ice_stop_short:d2`，补回左目标。
5. 所有目标补回后到 B=[10,10]。

meta 保留内部 d6：

1. C 进入同一小室，先左推右目标冰，制造目标债。
2. 在左侧用冰做一次 `ice_rebound_d4`，形成内部站位/锚。
3. 从同一 row5 小室右推目标冰，触发 `ice_destroy_group_d6_plus:len2`，打开右墙组。
4. d6 后仍需要两次 `ice_stop_short:d2` 补回目标，然后走到 D=[22,5]。

这条 meta 不是右侧外接长炮；d6 发生在目标债小室内部，打开的是 row5 右墙。

## 失败探针

### v3：保留顺序门开口会重开旁路

`worker_round46_order_gate_scratch_v3_layout.txt` 让 row7 保留较多横向连通，只在 x8 做断点，并打开 row8 桥：

- meta 仍可解，cost 47；
- base 变成 cost 15；
- `base_required` fail：存在缺少 `ice_destroyed_d3` 的胜利路径。

这复现了 v7 的核心问题：只要 A 能从左侧进入 row7/row8 横桥，目标债链就会被绕掉。

### v4：封左锚会杀 meta

`worker_round46_order_gate_scratch_v4_layout.txt` 把左侧 x4 的入口/锚位封掉：

- base 仍可解并通过 required gate；
- meta C->D 不可解；
- base 完整可达仍有 `ice_destroy_group_d6_plus:len2`，所以这不是有效的无 d6 暴露修法。

## 关于 base 完整可达 d6

本轮没有做到“base 完整可达不触发 `ice_destroy_group_d6_plus`”。v2 的最短 d6 暴露可在 base 胜利前触发，但它不是胜利路径；`compare-starts-layout` 已证明没有触发 d6/d5 的 A->B 胜利路径。

局部原因是 B=C，且 meta 所需的内部 d6 装置与 base 的目标补回后状态共享同一小室。只用 row7/row8/row9 的 2-4 格修补，很难同时让 C 可触发内部 d6、又让 A 在到达 B 前完全摸不到同一 d6 站位。本轮可确认的是：阻断 row7 横向旁路可保 base 读法；彻底封内部 d6 材料会破坏 meta。

## 产生的文件

- `prototypes/ice_slide_escape/reports/worker_round46_order_gate_scratch_v1_layout.txt`
- `prototypes/ice_slide_escape/reports/worker_round46_order_gate_scratch_v2_layout.txt`
- `prototypes/ice_slide_escape/reports/worker_round46_order_gate_scratch_v3_layout.txt`
- `prototypes/ice_slide_escape/reports/worker_round46_order_gate_scratch_v4_layout.txt`
- `prototypes/ice_slide_escape/reports/layout_analysis_worker_round46_order_gate_scratch_v*_base.md/json`
- `prototypes/ice_slide_escape/reports/layout_analysis_worker_round46_order_gate_scratch_v*_meta.md/json`
- `prototypes/ice_slide_escape/reports/start_comparison_worker_round46_order_gate_scratch_v*_*.md/json`

## 推荐

推荐把 v2 作为 round46 的小范围结构修复基线。若下一轮继续追求真正的“右补债资源顺序门”，不要再单纯打开 row7；需要让右资源开门只对 C 侧可操作，或者让 A 进入该门之前必须已经完成双目标债。当前 v7 式 row7 横门会直接给 A 侧袋旁路。
