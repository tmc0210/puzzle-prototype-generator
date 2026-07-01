# 边界接口扫描：ICE_EXP_META_2026_07_02_round19_v7_ABCD

- 布局：prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt
- 方法：逐个指定接口对求解，并对每个接口起点枚举全部可站立边界终点。
- 接口：A=[1,0]，B=[0,2]，C=[7,7]，D=[8,5]。
- 几何：A/B 不再相邻；Manhattan(A,B)=3。

| 起点 | 可达边界终点 | 非接口命中 | 跨组命中 |
| --- | --- | --- | --- |
| A [1,0] | [1,0], [0,2] | 无 | 无 |
| B [0,2] | [1,0], [0,2] | 无 | 无 |
| C [7,7] | [1,0], [0,2], [8,5], [7,7] | 无 | [1,0], [0,2] |
| D [8,5] | 无 | 无 | 无 |

```yaml
all_pair_solves_complete_under_budget: true
interface_points:
  A: [1, 0]
  B: [0, 2]
  C: [7, 7]
  D: [8, 5]
interface_to_non_interface_solved: []
AB_to_CD_solved: []
ignored_internal_reverse_pairs:
  - C->A
  - C->B
selected_interface_return_pairs_disclosed:
  - B->A
risky_internal_non_target_pairs_requiring_revision: []
```

同一运行时探针得到的指定接口对最短解：

| 接口对 | 可解 | Cost | 推冰数 | 事件摘要 |
| --- | --- | ---: | ---: | --- |
| A->B | 是 | 5 | 1 | push_ice, ice_rebound_d4 |
| A->C | 否 | n/a | n/a | 无 |
| A->D | 否 | n/a | n/a | 无 |
| B->A | 是 | 5 | 1 | push_ice, ice_rebound_d4 |
| B->C | 否 | n/a | n/a | 无 |
| B->D | 否 | n/a | n/a | 无 |
| C->A | 是 | 17 | 2 | push_ice, ice_destroyed_d3, ice_rebound_d4 |
| C->B | 是 | 16 | 2 | push_ice, ice_destroyed_d3, ice_rebound_d4 |
| C->D | 是 | 31 | 5 | push_ice, ice_destroyed_d3, ice_rebound_d4, ice_stop_short:d1 |
| D->A | 否 | n/a | n/a | 无 |
| D->B | 否 | n/a | n/a | 无 |
| D->C | 否 | n/a | n/a | 无 |

风险说明：

```text
v7 在分离 A/B 入口的同时保留了 v6 对接口策略的修复。
A/B->C/D 仍不可解，且没有出现非接口边界终点。
C->A/B 仍可解，但只按本轮人工修正的反向文档错误策略记录；
本轮 verdict_effect 为 none。
B->A 作为同 base 组选定接口返回对披露，沿用 ICE_CAND_0022 /
ICE_CAND_0024 的归档扫描惯例；它不是需要打回的 A/B->C/D 类问题。
```
