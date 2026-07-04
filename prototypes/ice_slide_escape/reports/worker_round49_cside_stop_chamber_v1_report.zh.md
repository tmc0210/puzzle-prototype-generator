# worker_round49 C 侧短停小室探针报告

```yaml
prototype: ice_slide_escape
candidate: worker_round49_cside_stop_chamber_v1
base: "A=[0,5] -> B=[11,10]"
meta: "C=[22,5] -> D=[19,10]"
status: pass_as_probe
```

## 布局

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##......I.
#####.###..#########.##
####II#.#I..########.##
####.......#######.I.##
####**.##..########.###
##########..#######.###
```

## 结构说明

这个版本保留 v20 的 base 主结构和 C 侧独立 projectile，但在右侧增加一个 C-only 短停小室，并把 meta 终点改为底边 `D=[19,10]`。

- base 从 `A=[0,5]` 到 `B=[11,10]` 仍走原来的双目标债务链。
- base 无法接触右侧小室：`x13/x14,y5` 墙组不被 base 打开，因此完整可达图不暴露 `d6/d5/restart`。
- meta 从 `C=[22,5]` 首推左侧 projectile，先触发 `ice_destroy_group_d6_plus + slide_restart_after_group + ice_destroyed_d3` 打开 `x13/x14,y5`。
- meta 随后进入右侧小室，在 `x20,y8` 站位把 `x19,y8` 的冰左推到 `x18,y8`，触发 `ice_stop_short:d1`，再到底边 `D=[19,10]`。

## compare 证据

### base strict

命令：

```powershell
@'
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##......I.
#####.###..#########.##
####II#.#I..########.##
####.......#######.I.##
####**.##..########.###
##########..#######.###
'@ | npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id worker_round49_cside_stop_chamber_v1_base_strict --player-goal "11,10" --starts "0,5" --required-winning-events ice_destroyed_d3,ice_stop_short --forbidden-winning-events ice_destroy_group_d6_plus,ice_pass_through_d5,slide_restart_after_group --forbidden-reachable-events ice_destroy_group_d6_plus,ice_pass_through_d5,slide_restart_after_group --max-states 120000 --graph-max-states 120000 --max-depth 180
```

结果摘要：

- `machineGate: pass`
- 可解：yes，cost `30`
- 返回解事件覆盖 `ice_destroyed_d3` 与 `ice_stop_short`
- forbidden winning hits: none
- forbidden reachable hits: none
- graph complete：`states=641`, `wins=1`
- 缺少 required 或触发 forbidden 的胜利路径：未找到，完整搜索 `explored=640`
- 可达事件扫描 complete：`ice_destroy_group_d6_plus / ice_pass_through_d5 / slide_restart_after_group` 均未命中

### meta required

命令：

```powershell
@'
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##......I.
#####.###..#########.##
####II#.#I..########.##
####.......#######.I.##
####**.##..########.###
##########..#######.###
'@ | npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id worker_round49_cside_stop_chamber_v1_meta_required_D1910 --player-goal "19,10" --starts "22,5" --required-winning-events ice_destroy_group_d6_plus,ice_destroyed_d3,ice_stop_short --max-states 120000 --graph-max-states 120000 --max-depth 180
```

结果摘要：

- `machineGate: pass`
- 可解：yes，cost `8`
- D 明确为 `D=[19,10]`
- 返回解 inputs：`left left down down down left down down`
- 返回解事件：`push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk push_ice ice_stop_short:d1 walk walk`
- graph complete：`states=3907`, `wins=9`
- 缺少 required 的胜利路径：未找到，完整搜索 `explored=3898`
- 缺少 required 或触发 forbidden 的胜利路径：未找到，完整搜索 `explored=3898`

## explain 证据

base explain：

- 最短解 cost `30`
- 事件计数：`walk=26`, `push_ice=4`, `ice_destroyed_d3=2`, `ice_stop_short:d2=2`
- 关键非步行节点仍是：
  - step 5：右推左上目标冰，`ice_destroyed_d3`
  - step 9：右推右上目标冰，`ice_destroyed_d3`
  - step 15：上推下层冰回补右上目标，`ice_stop_short:d2`
  - step 21：上推下层冰回补左上目标，`ice_stop_short:d2`

meta explain：

- 最短解 cost `8`
- 事件计数：`push_ice=2`, `ice_destroy_group_d6_plus:len2=1`, `slide_restart_after_group=1`, `ice_destroyed_d3=1`, `ice_stop_short:d1=1`
- step 1：从 C 左推 projectile，打开右墙组并触发 `d6 + d3`
- step 6：在右侧小室左推冰块，触发 `ice_stop_short:d1`

## 目标债务增强尝试

我也试了把右侧小室的挡路冰改成目标冰，并在下方放 C-only 回补冰，希望 meta 必须先制造目标债再回补。该方向没有作为候选采用：

- base strict 仍 pass。
- meta 到 `D=[19,10]` fail：存在 cost `8` 的胜利路径只走 `d6+d3` 后从 `x20` 竖向旁路直达 D，不触发 `ice_stop_short`。

因此本提交选择硬 gate 更干净的 v1。它解决 v20 的主要问题：meta 不再在首推后直接走到底部 B，而是必须进入 C-only 小室完成短停；但它还不是“meta 也触碰目标债务”的最终审美版。

## 结论

`worker_round49_cside_stop_chamber_v1` 是一个更好的 decoupled C-side projectile 探针：

- 保住 base strict reachable，不暴露 late events。
- meta 使用明确的新 edge 终点 `D=[19,10]`。
- meta 全部胜利路径都必须覆盖 `ice_destroy_group_d6_plus + ice_destroyed_d3 + ice_stop_short`。
- 右侧小室让 v20 的“首推后纯步行到底部”被打断。

剩余不足：meta 的 required stop 来自 C-only 小室，不是目标债务回补；如果继续推进，下一步应在右侧小室里做无旁路的目标债闭环，而不是回到左侧共享目标 projectile。
