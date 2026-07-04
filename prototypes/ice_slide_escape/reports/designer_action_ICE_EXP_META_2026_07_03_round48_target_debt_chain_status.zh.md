# designer_action: round48 target-debt chain status

```yaml
prototype: ice_slide_escape
date: 2026-07-03
review_loop_state: structural_redesign_needed
review_integrity: independent_worker_probe
archive_eligibility: raw_run_only
required_action: reject_or_change_family
```

## 本轮目标

- meta-first 双流程设计。
- base A->B 目标知识窗口：d6 前或更早；本轮按 strict reachable no d6/d5/restart 尝试。
- meta C->D 默认可用全部知识，需要后期破坏性机制作为核心。
- 玩家侧目标：构造“为了到终点必须推开目标冰；为了补回又必须破坏另一个目标冰”的目标债务链，而不是 d4 锁 + d3 门的拼接。

## 关键版本

### 0035-like 旁支变体

文件：

- `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round43_0035_like_star_variant_layout.txt`
- `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round43_0035_like_star_variant_notes.md`

状态：保留为旁支参考，不作为本轮合格候选。它可以给用户看，但不能作为当前 target-debt strict 候选提交。

### worker_round47 v1 hard-gate fallback

文件：

- `prototypes/ice_slide_escape/reports/worker_round47_non_BC_internal_d6_v1_right_slot.txt`
- `prototypes/ice_slide_escape/reports/worker_round47_non_BC_internal_d6_report.zh.md`

布局：

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

证据：

- Base A=[0,5] -> B=[11,10]：pass，cost 20，完整图 545 states，无 d6/d5/restart。
- Meta C=[10,10] -> D=[22,5]：pass，cost 45，required d6+d3+stop。

判定：硬证据最干净，但 base 更像“单目标债 + blocker 消耗”，不足以回应本轮用户要求的紧缩目标债务链。只能作为 fallback probe，不能当作满意提交。

### v14 base-clean target-debt probe

文件：

- `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round47_non_BC_internal_d6_v14_left_refill_no_repush_probe.txt`

布局：

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
#####.###..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

证据：

- Base A=[0,5] -> B=[11,10]：pass，cost 30，双目标债务链成立；完整可达图无 d6/d5/restart。
- Meta C=[10,10] -> D=[22,5]：fail，0 wins。

判定：证明“封 row6 x4 后 base 可严格清理”；同时证明该封口会杀死 meta 的 x4/d6 准备线。

### v17/v19 ordered-debt probes

文件：

- `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v17_probe.txt`
- `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v19_lower_key_connected_probe.txt`

v17 证据：

- Base A=[0,5] -> B=[11,10]：可解，cost 32；winning paths clean，required d3+stop 覆盖。
- Base strict reachable：fail；完整可达仍有 `ice_destroy_group_d6_plus:len2` 与 `slide_restart_after_group`。
- Meta C=[10,10] -> D=[22,5]：pass，cost 49；required d6+d3+stop。

v19 证据：

- Base A=[0,5] -> B=[11,10]：可解，cost 32；winning paths clean，required d3+stop 覆盖。
- Base strict reachable：fail；完整可达仍有 `ice_destroy_group_d6_plus:len2` 与 `slide_restart_after_group`。
- Meta C=[10,10] -> D=[22,5]：pass，cost 51；required d6+d3+stop。

判定：这两个版本最接近用户要求的目标债务链和 meta 破坏链，但不满足 strict base knowledge gate。失败 witness 都来自同一个核心矛盾：base 可以构造“右目标空、左目标已补、玩家回到 row5 x4”的局部态，于是左目标冰变成 meta d6 projectile。

## 独立 worker 结论

Mill 写入：

- `prototypes/ice_slide_escape/reports/worker_round48_target_debt_repair_failure_report.zh.md`

独立结论：不推荐继续在 v12/v14 同一左目标 d6 语法上做单格补丁。当前结构把 base 左目标补债入口和 meta d6 推脸入口绑定得太紧；v14 封口能清 base，但也杀 meta；侧桥和占位修复都会重新泄露或杀死 meta。

## 设计结论

本轮不提交合格候选。可保留：

- `worker_round47 v1`：hard-gate-clean fallback，但 target-debt 审美不足。
- `v17`：winning-clean 的目标债务 + meta d6 形态，适合作为下一轮 redesign 素材，但不能按本轮 strict gate 提交。
- `0035-like star variant`：可给用户查看的旁支变体。

下一轮应 change family：

1. 从 v14 的 base-clean 出发，另造 C-only/meta-only d6 资源，不再让左目标同时承担 base refill 和 meta projectile。
2. 或从 worker_round47 v1 出发，在非 d6 线补一个独立第二目标债务，而不是把 x5 普通冰改成目标冰。
