# worker28 meta-first 备选候选：trim2

## 布局

```text
#####.#####
#.#.#.#####
#..*..#####
#.....#####
#.....#####
.I...*#####
#..#..#####
#.#...#####
#.III.#####
#..I.I#####
#####.#####
```

坐标采用 `[x,y]`，左上角为 `[0,0]`。

- A: `[0,5]`
- B: `[1,0]`
- C: `[5,0]`
- D: `[4,0]`

目标 pair：

- base: A -> B，即 `[0,5] -> [1,0]`
- meta: C -> D，即 `[5,0] -> [4,0]`

所有目标初始均为 `*`，没有裸 `G`。目标冰位于 `[3,2]` 与 `[5,5]`；二者在视觉上都是“已经满足目标，却同时封住/定义通道与长距离射线”的障碍。

## 设计意图

这个候选不是从 archive、round26、round27 或既有候选微调而来；生成过程只使用当前规则原语，先随机产生新结构，再手工收窄为左入口、顶部双墙出口、中央目标冰锁、下方冰发射器的单一共享结构。

base A->B 的读法是：左侧入口先牺牲入口冰，进入下方冰发射器；通过三次短推把下方冰重新布置到左列，最后用 d6+ 向上摧毁 `[1,0]` 的边缘墙并回到顶部出口。

meta C->D 的读法是：顶部入口不能直接走到 D；玩家从中央目标冰旁绕到下方，先把一块底部冰推出边界腾出发射位，再用另一条向上 d6+ 射线摧毁 `[4,0]` 附近的顶部墙组。它复用同一个下方发射器和中央目标冰遮挡，但入口读法、发射列、前置动作与出口墙不同。

## 运行过的命令

未使用 CLI 的 `--write`，避免生成非 `worker28_` 前缀报告。关键命令如下：

```powershell
@'
<layout>
'@ | npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape - --id worker28_trim2_base --player-start "0,5" --player-goal "1,0" --max-states 50000 --max-depth 120 --graph-max-states 50000
```

```powershell
@'
<layout>
'@ | npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape - --id worker28_trim2_meta --player-start "5,0" --player-goal "4,0" --max-states 50000 --max-depth 120 --graph-max-states 50000
```

```powershell
@'
<layout>
'@ | npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id worker28_trim2_base_required_d6 --player-goal "1,0" --starts "0,5" --required-winning-events ice_destroy_group_d6_plus --max-states 300000 --max-depth 120 --graph-max-states 300000
```

```powershell
@'
<layout>
'@ | npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id worker28_trim2_meta_required_d6 --player-goal "4,0" --starts "5,0" --required-winning-events ice_destroy_group_d6_plus --max-states 300000 --max-depth 120 --graph-max-states 300000
```

另运行了一个 stdin tsx 边缘出口粗扫脚本，用同一布局枚举 `[0,5]` 与 `[5,0]` 到边缘 goal 的可解情况，预算为 `maxStates=30000`、`maxDepth=60`。

## 关键证据摘要

base A->B:

- 可解，shortest cost `20`，depth `20`，explained solver explored `1977`。
- 输入：
  `right down down down down right right up left down left up up up up up up up up up`
- 返回事件：
  `push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3`
  后接三次 `ice_stop_short:d1`，最终
  `ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group`。
- `compare-starts-layout` 的 required-winning d6 检查在 `300000` 状态预算下完整通过：
  `machineGate=pass`，graph complete，reachable states `268820`，wins `70`。
- 缺少 `ice_destroy_group_d6_plus` 的胜利路径：完整搜索未找到，explored `268750`。
- 因此 base 的可达知识里晚期 d6+ 至少在胜利路径义务上成立：所有 base 胜利路径都必须用 d6+。

meta C->D:

- 可解，shortest cost `21`，depth `21`，explained solver explored `4057`。
- 输入：
  `down down down down left down down down right down down left up up up up up up up up up`
- 返回事件：
  先 `ice_boundary_disappear:d1` 腾出底部发射位，再
  `ice_destroy_group_d6_plus:len2 ice_boundary_disappear_after_group` 打开 D。
- required-winning d6 检查返回解覆盖 required event，但 `300000` 状态预算下可达扫描和“缺少 required 的胜利路径”探针仍超预算，结论为 unknown，而非 pass。

共享结构与差异：

- 两条路线共享 `[3,2]`、`[5,5]` 两个目标冰作为静态锁/视觉矛盾，共享下方 `[2..5,8..9]` 的冰发射器。
- base 从左侧先处理入口冰，再把下方冰搬到左列，用 d6+ 打开 B。
- meta 从顶部进入，绕中央目标冰下探，先清掉一个底部冰，再用不同列的 d6+ 打开 D。
- C->D 不是 A->B 的换入口换出口短路；它没有 base 的入口牺牲和三次短推重排，但有自己的“腾发射位 -> 另一列 d6+”逻辑。

## 风险评估

- 最大风险：meta 的 required-winning d6 义务尚未完整证明，`300000` 状态预算仍 exhausted。作为备选可以交给下一轮更强剪枝/更高预算复核。
- 接口风险：边缘粗扫发现 `[0,5]` 还能到 `[4,0]`、`[5,0]`、`[5,10]`；`[5,0]` 也能到 `[1,0]`、`[0,5]`、`[5,10]`。其中 C/D->A/B 类可以按 ignored reverse 处理，但 A->D、A->C、A->bottom 属于真实非目标出口风险。
- 审美风险：base 和 meta 都使用 d6+ 顶部破墙，差异主要来自发射列与前置动作，而不是完全不同的机制家族。它比“两个独立小关拼接”更共享，但可能被 critic 认为同构偏高。
- 难度自评：base `3.5-4`，meta `4`。base 有 5 次推冰和完整 d6 义务；meta 步数长、入口重读明确，但核心推冰次数只有 2。
- 审美自评：`4`。中央 `*` 目标冰作为已经满足却封读法的矛盾成立，下方发射器共享清楚；若能进一步消除非目标出口并证明 meta required，则有机会接近 `4.5`。
