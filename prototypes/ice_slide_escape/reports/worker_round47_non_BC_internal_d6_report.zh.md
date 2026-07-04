# worker_round47_non_BC_internal_d6 报告

```yaml
prototype: ice_slide_escape
date: 2026-07-03
status: recommend_v1_with_aesthetic_caveat
recommended_layout: prototypes/ice_slide_escape/reports/worker_round47_non_BC_internal_d6_v1_right_slot.txt
recommended_interfaces:
  A: [0, 5]
  B: [11, 10]
  C: [10, 10]
  D: [22, 5]
```

## 结论

推荐 `worker_round47_non_BC_internal_d6_v1_right_slot.txt` 作为 round47 的最好方案。

```text
#######################
#######################
#######################
####.##################
####.##################
.....I...*...##........
####.####..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

它明确避免 v8 的 `B=C`：base 终点是 B=[11,10]，meta 起点是 C=[10,10]。更重要的是，结构上也避免了 v8 的真实泄露原因：row6 的 x5 顶封让 A 无法把左下补债冰上推成左上 projectile，因此 A 的完整可达图摸不到 meta 的内部 d6。

我推荐它作为可继续打磨/送审的 probe，不把它包装成满分候选。审美目标按 4 尝试，实际我会给 3.5 到 4-：role flip 清楚，但 B/C 仍是相邻底槽，base 也更像“单目标债 + blocker 消耗”，不是完整双目标债链。

## 取证摘要

| 版本 | 接口 | base 结果 | meta 结果 | 评价 |
| --- | --- | --- | --- | --- |
| v1 right_slot | A=[0,5], B=[11,10], C=[10,10], D=[22,5] | pass；cost 20；完整图 545 states；无 d6/d5/restart | pass；cost 45；完整图 1904 states；required d6+d3+stop | 推荐 |
| v2 left_slot | A=[0,5], B=[10,10], C=[9,10], D=[22,5] | pass；cost 19；完整图 414 states；无 d6/d5/restart | pass；cost 44；完整图 1463 states；required d6+d3+stop | 备选，但 meta 开局多一个 d1 预处理 |

关键工具文件：

- `layout_analysis_worker_round47_non_BC_internal_d6_v1_base.md/json`
- `layout_analysis_worker_round47_non_BC_internal_d6_v1_meta.md/json`
- `start_comparison_worker_round47_non_BC_internal_d6_v1_base_no_late.md/json`
- `start_comparison_worker_round47_non_BC_internal_d6_v1_meta_required.md/json`
- 对应 v2 的同名前缀报告也已写出。

## v1 读法

base A->B 使用 d3/d2：

1. 左上普通冰在 base 中是 blocker，被推入右目标冰后 d3 消耗。
2. 右目标冰再向右 d3，打开下侧回补通路，并留下右目标债。
3. 右下补债冰上推 d2，补回右目标。
4. 玩家从右底槽到 B=[11,10]。

meta C->D 使用完整知识：

1. 从 C=[10,10] 回入同一区域，先把右目标冰向左推入左上普通冰，制造右目标债。
2. 左侧下冰 d4 rebound 打开站位。
3. 左上普通冰在 meta 中变成 projectile，从内部横向 d6 摧毁 row5 的右墙组，打开 D 方向。
4. 右下补债冰回补目标，再从 D=[22,5] 离开。

角色翻转比较干净：左上冰 base 是一次性 blocker，meta 是 d6 projectile；右墙组 base 是右目标 d3 stopper，meta 是内部 d6 gate；右补债冰 base/meta 都是还债资源，但 meta 中它发生在 d6 改写之后。

## 避免 v8 泄露

v8/round46 的失败不是单纯坐标同名，而是 A 能在 base reachable graph 中制造 meta d6 projectile。v1 用两个动作解决：

- B 与 C 不再同格，避免 `C->B cost 0` 式接口混淆。
- row6 x5 改墙，A 不能把 x5 下侧冰上推到 row5，因此不能在右目标为空时横推出 d6。

`base_no_late` 已证明完整可达图没有 `ice_destroy_group_d6_plus`、`ice_pass_through_d5`、`slide_restart_after_group`。这比 v8 的 winning-only 干净。

## 是否推荐

推荐 v1，推荐语气是“可用的 round47 非 B=C 内部 d6 probe”，不是最终强候选。若下一轮继续提高审美，优先目标不是再挪 B/C，而是把 base 从单右目标债扩成更明确的双债或顺序债，同时保持当前 x5 顶封带来的完整图隔离。
