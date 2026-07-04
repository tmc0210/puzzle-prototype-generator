# worker_round54_horizontal fresh claim

```yaml
candidate_family: round54_horizontal_direct_rewrite
prototype: ice_slide_escape
mode: meta_first_design
archive_lineage_policy: fresh_required
family_scope: >
  只探索“横向 d6+/restart 直接改写 T1/T2 门核”的小结构。archive 只作审美
  校准和失败边界，不复用旧布局、接口、对象角色或主因果链。
artifact_write_policy: >
  本轮只写 prototypes/ice_slide_escape/reports/worker_round54_horizontal_* 文件。
reviewer_critic_policy: do_not_call
```

## 目标

```yaml
interfaces:
  required: [A, B, C, D]
  separation: all_distinct
targets:
  count_preference: 1-2
  initial_state: every target has ice
ice_count_preference: 2-4
avoid:
  - spare_fillers
  - repeated nearest-ice target refill
  - B/D or A/C overlap
  - archive layout variants
base:
  instance: A -> B
  exposure: d6 前或更早
  hard_gate:
    - solvable
    - complete reachable scan has no ice_pass_through_d5
    - complete reachable scan has no slide_restart_after_group
    - complete reachable scan has no ice_destroy_group_d6_plus
meta:
  instance: C -> D
  exposure: full_knowledge
  hard_gate:
    - solvable
    - every winning path requires ice_destroy_group_d6_plus
    - every winning path requires slide_restart_after_group
    - d6 product directly rewrites the T1/T2 door core
```

## 玩家侧假设

base 不是一个补位流水线，而是一个很小的“已完成 target 也是门核”的前期读法：
玩家必须临时改变 T1/T2 附近的目标冰或反弹障碍，让通路/出口成立，同时不能把
所有目标最终弄空。可接受的 base 核心事件为 d1/d2、d3、d4 或 boundary；如果
base 只是在直路上推一个显眼冰到目标，视为失败。

meta 从横向长距离视角进入同一个门核。关键 d6+/restart 不能只是打穿外围墙让
玩家接近 base 推位，而必须至少满足下面之一：

- 横向 d6 销毁 base 使用的反弹障碍，使同一目标冰的角色改变；
- 横向 d6 销毁或替换 T1/T2 上的目标冰，使 base 的“门已封好”状态变成 meta
  必须重新组织的状态；
- 横向 d6 直接改变 D 门状态，同时 d6 的落点/产物继续作为 T1/T2 门核的 stopper、
  阻挡或目标覆盖物被消费。

## 因果链草图

理想结构只有一个压缩门核：

1. T1/T2 初始都有冰，玩家起点到 B/D 的路径被这个已完成目标状态封住。
2. base 从 A 侧用早期事件移动其中一块目标冰或核心 stopper，使 B 通路短暂打开；
   最终同一门核恢复目标满足，不依赖远处 spare 冰。
3. meta 从 C 侧横向发射 d6，直接破坏/替换这组门核中的障碍或目标冰；这一步
   让 base 的局部解释失效。
4. d6 后的产物或缺口继续限制后续动作，迫使玩家用不同于 base 的顺序重建 T1/T2
   或打开 D。

## 反证条件

```yaml
reject_if:
  - A/B/C/D not all distinct
  - any target starts empty
  - base reachable graph sees d5, restart, or d6+
  - meta win exists without d6+ or without restart
  - d6 only opens approach to a base-like route
  - solution needs three copies of "remove target ice, refill with nearest ice"
  - more than four ice blocks are needed for the proposed logic
  - A or B can solve to D in a way that competes with declared C -> D
  - result is mostly interface clone, route shortcut, or simple key gate
```

## 工具问题

```yaml
questions:
  - Can a 1-2 target / 2-4 ice core solve A->B with no late reachable exposure?
  - Can C->D force horizontal d6+/restart while directly rewriting the same core?
  - Do A->D and B->D remain unsolved or clearly non-competing?
  - If not, what is the minimal geometric contradiction?
```
