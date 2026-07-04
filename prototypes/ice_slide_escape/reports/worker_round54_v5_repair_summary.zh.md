# worker round54 v5 repair summary

## 结论

- 推荐版本: `worker_round54_v5_repair_v5_standable_D_door_layout.txt`
- A/B/C/D: A=[0,6], B=[7,0], C=[10,0], D=[0,10]
- 四点状态: 全分离、全在 edge、全可作为合法起点。
- 所有 targets 初始有冰: 是，targets 为 [4,6] 与 [9,6]，均为 `*`。
- 是否可送主 controller: 可以作为 repair candidate 交主 controller；本 worker 未调用 reviewer / critic。

## Layout

```text
#######.##.##
#######.##I##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*....*.##
#...#.....###
######.##.###
######.##...#
.#..........#
#############
#############
```

## Base No-Late Compare

- 命令口径: `compare-starts-layout`, start A=[0,6], goal B=[7,0]。
- 结果: pass。
- cost: 19。
- required winning: `ice_rebound_d4`，完整搜索未发现缺少 required 的胜路，explored=846。
- forbidden reachable: `ice_pass_through_d5`, `slide_restart_after_group`, `ice_destroy_group_d6_plus`。
- forbidden reachable hits: none。
- reachable scan: complete, states=847, legal transitions=2050。
- 返回解核心: T1 右推借 T2 d4 反弹，然后从右侧把 T1 d4 回封，之后到 B。

## Meta Required Compare

- 命令口径: `compare-starts-layout`, start C=[10,0], goal D=[0,10]。
- 结果: pass。
- cost: 34。
- required winning: `ice_destroy_group_d6_plus`, `slide_restart_after_group`, `ice_rebound_d4`。
- 完整搜索未发现缺少 required 的胜路，explored=3122。
- reachable scan: complete, states=3040, legal transitions=7311。
- 返回解核心:
  1. C 下推非目标冰，`ice_pass_through_d5:len2 + slide_restart_after_group`，产物落到 row10；x10,y7/y8 保留为玩家挡墙。
  2. 从 x10,y6 推 T2 左移，借 T1 形成 `ice_rebound_d4`，打开 x9 竖向通道。
  3. 经 x9 通道到 row10，从右侧推动 d6 产物向左，触发 `ice_destroy_group_d6_plus:len1 + slide_restart_after_group`，破坏 [1,10] 的 D 门。
  4. 回到 T2 左侧，将 T2 右推 `ice_rebound_d4` 回封到 [9,6]，再走到 D。

## Edge Scan

- 文件: `worker_round54_v5_repair_v5_edge_scan.md/json`
- scanned edge goals: 48。
- start validity: A/B/C/D 全 valid。
- hit counts: `target_pair=2`, `ignored_internal_reverse=1`。
- risky pairs: 0。
- target pairs:
  - A [0,6] -> B [7,0], cost=19。
  - C [10,0] -> D [0,10], cost=34。
- ignored internal reverse:
  - C [10,0] -> B [7,0], cost=21，按 C/D->A/B policy ignored。
- 未发现 A/B->C、A/B->D、外部 edge escape 或其他 non-ignored internal pair。

## 设计备注

- 这版不是对 v5 随机加墙删墙，而是结构性错开：把 C/d5-restart 产物发射器移到 x10 顶端；旧 B 点改成 x7 顶边出口；D 改为 standable edge，实际门放在 [1,10]。
- 修复点一: base 可达域无法到达 T2 右侧和 d6 产物门位，因此 base no-late 的完整可达扫描不再泄漏 d5/restart/d6+。
- 修复点二: meta 无法直接到产物右侧；必须先移动 T2 才能经 x9 通道消费 d6 产物，之后还必须回封 T2 才能满足 win。
