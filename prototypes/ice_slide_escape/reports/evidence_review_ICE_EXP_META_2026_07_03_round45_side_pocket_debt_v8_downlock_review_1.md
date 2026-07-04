# ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock 证据审查 1

```yaml
reviewer_role: independent evidence reviewer
review_scope: "只核对 candidate packet 与工作区证据是否互相支持"
source_packet: prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock.zh.md
verdict: supported_with_declared_caveats
evidence_consistency_blockers: []
submission_blocker_if_strict_brief: base_reachable_d6_exposure
required_action: "若当前 brief 要求 base 完整可达图排除 d6，则 hold/redesign；若允许 winning-path-only base gate，则可作为带 caveat 的 probe 继续。"
```

## 审查边界

本审查只判断 packet 与工作区证据是否互相支持。不评价审美、不采纳隐藏要求，也不修改布局。

## 逐项核对

### Layout

结论：支持。

`prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_layout.txt` 与 packet 的 Layout 文本一致：

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####II###I..###########
####.......############
####**...#.############
##########.############
```

### A/B/C/D

结论：支持，且 caveat 已声明。

packet 声明 A=[0,5]、B=[10,10]、C=[10,10]、D=[22,5]。布局中这些坐标均为边缘 floor；B 和 C 是同一个底边物理格。packet 的 `interface_note: B and C are the same physical bottom-edge cell` 与证据一致。

因此该 packet 不是四个互不重合物理接口的声明；它是 A、B/C、D 三个物理接口加一个 B=C 回入 caveat 的声明。packet 已明确承认这一点。

### Base explain-layout

结论：支持。

`layout_analysis_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base.md/json` 支持：

- start=[0,5]，goal=[10,10]
- found=yes，cost=29，graph=complete
- reachable_states=4393，winning_states=4
- 返回解事件计数包含 push_ice=4、ice_destroyed_d3=2、ice_stop_short:d2=2

关键快照也支持 packet 的 base reading：左 target 被推右并欠债，右 target 被推右并欠债，随后两个 lower ice 以 short stop 补回目标，最后从底边 B 离开。

### Meta explain-layout

结论：支持。

`layout_analysis_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_meta.md/json` 支持：

- start=[10,10]，goal=[22,5]
- found=yes，cost=47，graph=complete
- reachable_states=10854，winning_states=2
- 返回解事件计数包含 push_ice=5、ice_destroyed_d3=1、ice_rebound_d4=1、ice_destroy_group_d6_plus:len2=1、slide_restart_after_group=1、ice_stop_short:d2=2

关键快照支持 packet 的 meta reading：先从右侧推右 target 向左制造右 target debt，随后 side ice 触发 d4 rebound，再以左 target ice 向右触发内部 d6 打开右边缘 D，最后补回两个 target。

### Base winning-only gate

结论：支持。

`start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base_winning_only.md/json` 支持 packet 的 winning-only 说法：

- machine gate: pass
- required winning-path events: ice_destroyed_d3, ice_stop_short
- forbidden winning-path events: ice_destroy_group_d6_plus, ice_pass_through_d5
- 未找到缺少 required winning events 的胜利路径
- 未找到触发 forbidden winning events 的胜利路径

注意：同一文件的可达事件计数中确实出现 `ice_destroy_group_d6_plus:len2` 和 `ice_pass_through_d5:*`，但该 probe 没有把它们作为 forbidden reachable events；它只证明 winning-path gate 干净。

### Base reachable exposure caveat

结论：支持，且这是唯一实质提交风险。

`start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base_required.md/json` 支持 packet 的 stricter reachable caveat：

- machine gate: fail
- forbidden reachable events: ice_destroy_group_d6_plus
- forbidden reachable hits: ice_destroy_group_d6_plus:len2
- graph=complete，reachable_states=4393

packet 没有声称 clean forbidden-if-seen-anywhere base exposure gate；相反，它明确写出 complete reachable graph 可触发非胜利 d6。该 caveat 与 `base_winning_only` 的胜利路径排除结果、`base_required` 的完整可达图失败结果互相一致。

### Meta required gates

结论：支持。

`start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_meta_required.md/json` 支持：

- machine gate: pass
- required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short
- start=[10,10] -> goal=[22,5] solved, cost=47
- 未找到缺少 required winning events 的胜利路径

`start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_meta_required_d6_only.md/json` 也支持 meta d6-only required gate pass。

### Interface caveats

结论：支持，但范围有限。

`start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_interface_ABCD_goal_B.md/json` 支持：

- A=[0,5] -> B=[10,10] solved, cost=29
- C=[10,10] -> B=[10,10] solved, cost=0，因为 B=C 同格
- D=[22,5] -> B=[10,10] unsolved

`start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_interface_ABCD_goal_D.md/json` 支持：

- A=[0,5] -> D=[22,5] unsolved
- C=[10,10] -> D=[22,5] solved, cost=47
- D=[22,5] -> D=[22,5] solved, cost=0，因为显式 goal 身份

packet 只把 A->B 和 C->D 作为 declared pairs，并把 C->B、D->D 的 0 成本事实列为 caveats；这与证据一致。上述文件不是全边缘 goal 扫描，因此不能额外证明“不存在 A/B/C/D 到其它边缘的 escape”。packet 也没有提出这个更强声明。

## Blocking Issues

对“packet 与工作区证据是否互相支持”而言：没有发现 blocking contradiction。

对“是否可作为 clean strict submission”而言：存在一个条件性 blocker。base 的完整可达图命中 `ice_destroy_group_d6_plus:len2`，所以若当前 brief 要求 base forbidden-if-seen-anywhere 排除 d6，该版本必须 hold 或 redesign。packet 已经正确承认此点。

## Required Action

- 不需要修改布局来满足本次 evidence review；本审查也未修改布局。
- 保留 packet 中的 base reachable exposure caveat，不要把它升级描述为 clean reachable gate。
- 若 brief 要求 complete base reachable graph 排除 d6：hold/redesign 后再提交。
- 若 brief 只要求 player-facing/winning-path base gate：现有证据支持该 packet 作为带 caveat 的 candidate probe。
