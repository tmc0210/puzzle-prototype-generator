# worker_round50 v8 structural offset 失败报告

```yaml
task: "v8 target-debt 骨架结构性修补"
source_layout: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_layout.txt
representative_failure_layout: prototypes/ice_slide_escape/reports/worker_round50_v8_structural_offset_left_face_seal_failure.txt
base: "A=[0,5] -> B=[10,10]"
meta: "C=[10,10] -> D=[22,5]"
status: failed_no_candidate_submitted
```

## 结论

本轮没有找到满足全部约束的结构性变体，因此不提交候选。

最核心的冲突是：

- 如果 base 能制造“左目标已补 / 仍有左目标 projectile、右目标欠债、左发射面可达”的局部态，它就能提前从 `x4,y5` 右推左目标冰，触发 `ice_destroy_group_d6_plus + slide_restart_after_group` 打开右墙组。
- 如果用整列墙或墙带封掉左发射面，base strict 可以变干净；但 meta 的目标债务链也被剪断，因为 meta 正是依赖同一个左目标 projectile 和同一个左发射面来打开右墙。

这不是“再补一个 stop 小室”能解决的问题；右侧独立小室方向已经被本 brief 排除，本报告也没有采用该方向。

## 代表性失败布局

该布局用墙带封 `x4,y6` 与 `x4,y8`，代表“封左发射面”的结构修补方向：

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
#####.###..############
####II###I..###########
#####......############
####**...#.############
##########.############
```

结果：

- base strict 通过：A->B 可解，cost 29；完整可达图不命中 `ice_destroy_group_d6_plus / ice_pass_through_d5 / slide_restart_after_group`。
- meta 失败：C->D 不可解，complete graph 1395 states，0 wins。

## v8 污染复核

原 v8 的 meta 目标债务链成立：

- C->D cost 47。
- 返回解包含 `ice_destroyed_d3`、`ice_rebound_d4`、`ice_destroy_group_d6_plus:len2`、`slide_restart_after_group`、`ice_stop_short:d2`。
- 读法是：先破坏右目标，保留左目标作为 projectile；打开左发射面；再用左目标冰 d6 打开右墙；最后用下层资源补回目标。

原 v8 的 base 胜利路径也干净，但完整可达图不干净：

- A->B cost 29。
- base winning-only gate 通过。
- base strict reachable gate 失败，命中 `ice_destroy_group_d6_plus:len2`，同时可达事件计数中还有 `ice_pass_through_d5:*` 与 `slide_restart_after_group`。

最短污染见证显示，base 可以先误用右补债冰，再回到左发射面：

```yaml
d5_witness:
  action: left
  depth: 14
  events: [push_ice, "ice_pass_through_d5:len4", ice_boundary_disappear_after_group]
  interpretation: "右补债冰被移到 row8 后，从右向左误推，暴露 d5/pass-through 污染。"
d6_witness:
  action: right
  depth: 23
  events: [push_ice, "ice_destroy_group_d6_plus:len2", slide_restart_after_group, "ice_boundary_disappear:d8"]
  before_shape: "player at x4,y5; left target ice/projectile at x5,y5; right target is debt at x9,y5"
  interpretation: "这正是 meta 需要的左目标 projectile d6 局部态，只是被 base 提前制造。"
```

## 已试方向摘要

### v8 原骨架

- `explain-layout` base：A=[0,5] -> B=[10,10] solved，cost 29，graph complete，4393 states。
- `explain-layout` meta：C=[10,10] -> D=[22,5] solved，cost 47，graph complete，10854 states。
- `compare-starts-layout` base required/strict：fail，forbidden reachable hits `ice_destroy_group_d6_plus:len2`。
- `compare-starts-layout` meta required：pass，required winning 覆盖 `ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short`。

### 单点墙带尝试

- `x10,y8` 加墙：base 完整图无 late hits，但 A->B 不可解；meta 也不可解。
- `x4,y8` 加墙：A->B 仍可解，但仍命中 `ice_destroy_group_d6_plus + slide_restart_after_group`；meta 不可解。
- `x4,y6` 加墙：A->B 仍可解，但仍命中 `ice_pass_through_d5:len4`；meta 不可解。

### 代表性左发射面封锁

命令摘要：

```powershell
@'
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
#####.###..############
####II###I..###########
#####......############
####**...#.############
##########.############
'@ | npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id worker_round50_v8_structural_offset_left_face_seal_base_strict --player-goal "10,10" --starts "0,5" --required-winning-events ice_destroyed_d3,ice_stop_short --forbidden-winning-events ice_destroy_group_d6_plus,ice_pass_through_d5,slide_restart_after_group --forbidden-reachable-events ice_destroy_group_d6_plus,ice_pass_through_d5,slide_restart_after_group --max-states 120000 --graph-max-states 120000 --max-depth 180
```

摘要：pass；A->B solved cost 29；graph complete 655 states；forbidden reachable hits none。

```powershell
@'
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
#####.###..############
####II###I..###########
#####......############
####**...#.############
##########.############
'@ | npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id worker_round50_v8_structural_offset_left_face_seal_meta_required --player-goal "22,5" --starts "10,10" --required-winning-events ice_destroy_group_d6_plus,ice_destroyed_d3,ice_stop_short --max-states 120000 --graph-max-states 120000 --max-depth 180
```

摘要：fail；C->D unsolved；graph complete 1395 states，wins=0。

```powershell
@'
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
#####.###..############
####II###I..###########
#####......############
####**...#.############
##########.############
'@ | npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape - --id worker_round50_v8_structural_offset_left_face_seal_base_explain --player-start "0,5" --player-goal "10,10" --max-states 120000 --graph-max-states 120000 --max-depth 180
```

摘要：found yes；cost 29；事件为两次 `ice_destroyed_d3` 加两次 `ice_stop_short:d2`；graph complete 655 states。

## 有界结构筛查

为避免继续长时间穷举，我只做了小范围结构筛查，作为排除主要墙带方向的辅助证据：

- 单格墙/地切换：87 个局部变体，0 个同时满足 base strict 与 meta required。
- 两格局部结构切换：3741 个组合；5 个 base strict-clean，但全部 meta `no_meta`。
- 对上述 base-clean 二格组合再加一格补通：425 个组合，0 个恢复 meta 目标债务链。
- 聚焦左发射面、row8 横廊、row6/7 墙带、右墙组与 B/C 竖井的三格切换：16215 个组合；147 个 base-clean，0 个同时保留 meta required。

这些筛查不是提交级证明；它们只说明当前 v8/v7/v21 这一族的“整列墙、墙带、局部错列/平移”方向已经撞到同一个结构矛盾。

## 几何约束冲突

meta 必须满足：

1. 右目标先被破坏，形成右目标 debt。
2. 左目标冰仍可作为 projectile。
3. 玩家能到达左发射面，从 `x4,y5` 右推左目标。
4. 左目标冰向右滑行至少 6 格，摧毁右墙组。
5. 下层资源仍能回补目标。

base 若在完整可达图中也满足 2-4，就会提前看到 late 机制污染。v8 的 base 正是通过误用右补债冰与 row8 横廊，构造出了这个局部态。

封锁左发射面能解决 base 污染，但会同时破坏 meta 的第 3 条；封锁 row8 误用距离能减少 d5/d6 噪音，但常常直接破坏 base 补债路径或 meta 准备路径；打开旁路补回 meta 又会把 base 也放回同一发射面。

因此，本族结构没有找到一个只对 C 可用、对 A 不可用的内部左发射面。若继续推进，建议不要再围绕 v8 的同一左目标 projectile 做局部墙带修补，而是重做 d6 资源来源或把 meta-only 准备线移出 base 可达闭包。
