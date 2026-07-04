# designer_action: round54 v5 near-miss

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round54_v5_t2_gate_cut
review_loop_state: structural_redesign_needed
review_integrity: missing
archive_eligibility: raw_run_only
decision: reject_or_change_family
reviewer_called: false
critic_called: false
```

## 保留的设计价值

v5 首次把本轮目标里的“二目标角色交换”做成了可解链条：

- base A `[0,6]` -> B `[6,12]`：所有胜路 required `ice_rebound_d4`，且没有 d5 / restart / d6 winning path。
- meta C `[7,0]` -> D `[0,10]`：所有胜路 required `ice_destroy_group_d6_plus`、`slide_restart_after_group`、`ice_rebound_d4`。
- meta trace 中先用竖向 d6 产物打开底部 D 门，再移动 T2 让目标门位开放，最后用 d4 把 T2 回封；不是单纯 d6 key 后走路。

布局：

```text
#######.####
#######I####
#######.####
#######.####
#######.####
#...#......#
..#.*....*.#
#...#...#.##
######.##.##
######..#.##
#.........##
######.#####
######.#####
```

## 硬失败

- base 完整可达扫描命中 `ice_pass_through_d5`、`slide_restart_after_group`、`ice_destroy_group_d6_plus`；这违反 `meta_first_design` 对 base 视角后期机制遮蔽的硬要求。
- edge-goal scan 没有外部 edge escape，但存在未忽略内部非目标 pair：
  - A `[0,6]` -> C `[7,0]` cost 19。
  - B `[6,12]` -> C `[7,0]` cost 13。
- `C -> B` cost 13 已按 prototype policy 归为 ignored internal reverse pair，`verdict_effect: none`。

## 失败根因

v5 把 C 的竖向 d6 井和 base 的 T1 回封绕路共用了 `[7,5]` / `[8,6]` 一带。这样 meta 的好处是强耦合，坏处是 base 在通关路线附近能接触后期竖井和 T2 右侧推位，导致完整可达 late 泄漏与 A/B->C 内部出口。

## 下一步

并行推进两个方向：

- `worker_round54_v5_repair_*`：保留 v5 的 T2 交换链，但把 C 竖井 / T2 右侧站位改成 meta-only，不让 base 完整可达。
- `worker_round54_lshape_*`：换成 L 形 d6 projectile -> 垂直 stopper 结构，避免 d6 井与 base 回封路共用。

v5 不提交 reviewer / critic。
