# Submission: RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1

```yaml
slot: L11
role: movable_box_sticky_applied_cut
status: proposal_ready_with_caveats
review_integrity: independent_review
archive_eligibility: human_pending
```

## ASCII

```text
#########
##....###
##.BS#G.#
##.M.MM.#
#.@#...##
####G####
#########
```

运行时初始归一化：

```text
#########
##....###
##.BS#G.#
##.C.MM.#
#.@#...##
####G####
#########
```

## 解法

```text
up right up left up right down right down down up right down right up
```

15 步。

## 关键快照

Step 2：箱子进入 S 侧，`box_to_sticky + sticky_merge`，形成三连。

```text
#########
##....###
##.BS#G.#
##.@MMM.#
#..#...##
####G####
#########
```

Step 6：第二次推动 B/S，左端被切回普通箱。

```text
#########
##.@BS###
##...#G.#
##..CMM.#
#..#...##
####G####
#########
```

Step 10：切出的普通箱继续下推并覆盖下目标。

```text
#########
##..BS###
##...#G.#
##...MM.#
#..#@..##
####*####
#########
```

Step 15：剩余二连黏块移动到上目标。

```text
#########
##..BS###
##...#mM#
##....@.#
#..#...##
####*####
#########
```

## Critic 摘要

有效 critic 结论为 `supports_with_noncore_caveats / required_action:none`。它认为新版实质修复旧 L11 的核心问题：拼接和切割不再只是事件 witness，切出的普通箱与剩余黏块都有后续应用。主要 caveat 是它更像 L11 常规应用关，B/S 时机是真实顺序门槛但不是深层调度矛盾；不要包装成高难亮点关，也不要声称唯一解或三连刚体后续消费。
