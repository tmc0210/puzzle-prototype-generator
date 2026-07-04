# worker_round54_vertical 探索摘要

## 本轮范围

- family A：只探索“竖向 d6 产物内移”。
- 未调用 reviewer / critic。
- 只写入 `prototypes/ice_slide_escape/reports/worker_round54_vertical_*` 文件。
- archive 只用于校准失败模式：重点避开 0037 式“重复补位 + 接口外溢”。

## 当前结论

找到一个硬闸门可用但审美偏薄的草案：`worker_round54_vertical_v2`。

它满足本轮机器条件：

- A/B/C/D 全分离。
- 两个目标，且所有目标初始都有冰。
- 三枚冰：两个目标冰 + 一个竖向 d6 projectile。
- base A->B 完整可达扫描无 d5 / restart / d6+。
- meta C->D 所有胜路需要 d6+ / restart。
- d6 产物不是停住即结束：返回解中它被再次横推，用 d6+ 打开 D 墙。
- A/B 到 D 不可解。

但它还不是我建议送审的高审美候选：meta 不需要触碰目标门核，`meta_required_with_d4` 明确失败。也就是说，v2 是 hard-gate baseline，不是合格候选终稿。

## v2 layout

```text
#######.####
#######I####
#######.####
#######.####
#######.####
#...#....###
..#.*....*##
#...#....###
######.#####
######...###
#.........##
######.#####
######.#####
```

接口：

```yaml
A: [0, 6]
B: [6, 12]
C: [7, 0]
D: [0, 10]
base: A -> B
meta: C -> D
```

结构读法：

- Base：左侧进入，目标冰 `[4,6]` 右推，借目标冰 `[9,6]` 作障碍发生 d4 rebound；玩家穿过目标门到右侧，再从右侧把 `[7,6]` 的冰左推，借 `[2,6]` 墙 d4 回封 `[4,6]`，最后到 B。
- Meta：从 C 竖推 `[7,1]`，d6+ 摧毁 `[7,8]` 墙并 restart，产物停在 `[7,10]`；随后玩家横推该产物向左，以 d6+ 摧毁 D 墙 `[0,10]`，再走到 D。

证据：

- `worker_round54_vertical_start_comparison_v2_base_no_late.md/json`
  - pass，cost 20，complete graph。
  - required winning `ice_rebound_d4` 通过。
  - forbidden reachable `ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus` 无命中。
- `worker_round54_vertical_start_comparison_v2_meta_required.md/json`
  - pass，cost 19，complete graph。
  - required winning `ice_destroy_group_d6_plus, slide_restart_after_group` 通过。
  - 返回解包含首次竖向 d6/restart，以及后续横推 d6 打开 D 墙。
- `worker_round54_vertical_start_comparison_v2_AB_to_D_risk.md/json`
  - A->D 不可解。
  - B->D 不可解。
- `worker_round54_vertical_start_comparison_v2_meta_required_with_d4.md/json`
  - fail；存在缺少 `ice_rebound_d4` 的胜路。
  - 这是 v2 的主要设计问题。

## v1 失败点

`worker_round54_vertical_v1` 的想法是把竖向 d6 产物落到底部再横向开 D，但失败很明确：

- B 初始 walk-only 可达；因为所有目标初始已满足，导致 base 不需要目标门。
- 竖向 d6 线被 base 左侧 d4 反弹墙提前截断，C->D 不可解。
- base 可达扫描命中 d5 / restart / d6+，不满足 early cutoff。

## v3 失败点

`worker_round54_vertical_v3` 是更有价值的耦合方向：让 d6 产物落到 `[11,10]`，作为 meta 中目标冰 `[9,10]` 回封的右侧障碍；base 则用 `[9,10]` 作为 `[4,10]` 的右侧障碍。

它的玩家侧逻辑比 v2 好，因为两个目标冰互相换角色：

- base：T2 是 T1 的右反弹障碍。
- meta：T1 是 T2 的左反弹障碍，d6 产物是 T2 的右反弹障碍。

但当前几何失败：

- D 放在 `[13,0]`，C `[11,0]` 可以直接 walk-only 到 D，meta required 失败。
- base 可达扫描命中 d5 / restart / d6+，说明右侧绕行和竖井之间泄露过多。

最小几何矛盾：

- 为了让 T2 被推左后还能从右侧绕到它左边，需要一个绕行环。
- 这个绕行环如果从 C 侧一开始就开放，会绕过目标门并泄露 late events。
- 下一版必须把绕行入口绑定到“目标冰离开 `[9,10]` 后的空目标位”，而不是在上层常开。

## 下一步设计方向

优先沿 v3 的角色互换骨架继续，而不是扩大 v2：

```text
base: T1 借 T2 作右障碍，完成 d4 出门/回封。
meta: 竖向 d6 产物内移，成为 T2 的右障碍；
      T2 借 T1 作左障碍，再借 d6 产物回封；
      D 放在 T2 回封后玩家所在侧，且由 d6 打开的区域提供出口。
```

具体几何修正：

- 把 C->D 的 D 从 C 同顶边移走，避免 walk-only。
- 将 T2 绕行环拆成延迟入口：只有 T2 离开目标后，玩家才能进入绕行去站到 T2 左侧。
- 避免 row9 一条常开横廊同时服务“绕 T1”和“绕 T2”；这会让 C 侧提前绕过门核。
- d6 产物最好既作为 T2 回封障碍，又在回封后被推开或让出 D 通路，避免 v2 的单纯 D-key 感。

## 文件索引

- `worker_round54_vertical_design_claim.zh.md`
- `worker_round54_vertical_v1_layout.txt`
- `worker_round54_vertical_v2_layout.txt`
- `worker_round54_vertical_v3_layout.txt`
- `worker_round54_vertical_start_comparison_v1_base_no_late.md/json`
- `worker_round54_vertical_start_comparison_v1_meta_required.md/json`
- `worker_round54_vertical_start_comparison_v1_AB_to_D_risk.md/json`
- `worker_round54_vertical_start_comparison_v2_base_no_late.md/json`
- `worker_round54_vertical_start_comparison_v2_meta_required.md/json`
- `worker_round54_vertical_start_comparison_v2_meta_required_with_d4.md/json`
- `worker_round54_vertical_start_comparison_v2_AB_to_D_risk.md/json`
