# worker_round53 tight_coupled_core 探索摘要

## 结论

找到一个可继续发展的结构草案：`worker_round53_v4`。

它不是正式候选，也没有进入 reviewer / critic。当前定位是：硬证据较干净、核心空间紧、A/B/C/D 全分离，但仍有接口内外溢和 meta d6 钥匙化 caveat，需要下一轮结构修改。

## v4 layout

```text
############
##.#......I.
###.########
..#.*....###
#...#......#
#####.......
#####......#
#####.######
#####.######
```

接口：

```yaml
A: [0, 3]
B: [5, 8]
C: [11, 1]
D: [11, 5]
base: A -> B
meta: C -> D
```

边缘可站点目测/扫描范围内正好是这四个接口，没有 A/B/C/D 之外的 edge floor。

## 核心结构

Base A->B：

- 目标冰 `[4,3]` 初始占据唯一目标，同时封住 A 到 B 的路。
- 玩家先从左侧站到 `[3,3]`，把目标冰右推；它以 d4 rebound 落到 `[7,3]`，目标临时变空，通路打开。
- 玩家绕到右侧 `[8,3]`，再把同一块冰左推；它借 `[2,3]` 墙作 d4 rebound，回到 `[4,3]`。
- 玩家此时留在右侧，目标重新满足，再走到 B。

Meta C->D：

- 先从 C 左推 `[10,1]` 的冰，以 d6+ 摧毁 `[3,1]` 墙，restart 后短停到 `[2,1]`，打开进入同一核心门结构的接近角。
- 接着仍必须完成 `[4,3]` 目标冰的右推 d4 / 左推 d4 回封；否则目标不满足，不能在 D 胜利。
- 最后从右侧走到 D。

## 已跑命令

```powershell
npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_v4_layout.txt --id worker_round53_v4_base --player-start 0,3 --player-goal 5,8 --max-states 80000 --graph-max-states 80000 --write
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_v4_layout.txt --id worker_round53_v4_base_required_no_late --player-goal 5,8 --starts 0,3 --required-winning-events ice_rebound_d4 --forbidden-reachable-events ice_pass_through_d5,slide_restart_after_group,ice_destroy_group_d6_plus --max-states 80000 --graph-max-states 80000 --write
npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_v4_layout.txt --id worker_round53_v4_meta --player-start 11,1 --player-goal 11,5 --max-states 120000 --graph-max-states 120000 --write
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_v4_layout.txt --id worker_round53_v4_meta_required --player-goal 11,5 --starts 11,1 --required-winning-events ice_destroy_group_d6_plus,slide_restart_after_group,ice_rebound_d4 --max-states 120000 --graph-max-states 120000 --write
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_v4_layout.txt --id worker_round53_v4_pair_goal_A --player-goal 0,3 --starts 0,3 5,8 11,1 11,5 --max-states 120000 --graph-max-states 120000 --write
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_v4_layout.txt --id worker_round53_v4_pair_goal_B --player-goal 5,8 --starts 0,3 5,8 11,1 11,5 --max-states 120000 --graph-max-states 120000 --write
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_v4_layout.txt --id worker_round53_v4_pair_goal_C --player-goal 11,1 --starts 0,3 5,8 11,1 11,5 --max-states 120000 --graph-max-states 120000 --write
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/worker_round53_v4_layout.txt --id worker_round53_v4_pair_goal_D --player-goal 11,5 --starts 0,3 5,8 11,1 11,5 --max-states 120000 --graph-max-states 120000 --write
```

CLI 自动生成的 `layout_analysis_worker_round53_*` / `start_comparison_worker_round53_*` 文件已经重命名到 `worker_round53_*` 前缀。

## 证据结果

Base explain：

- 文件：`worker_round53_layout_analysis_v4_base.md/json`
- pass，cost 20，complete graph。
- reachable states 122，winning states 1。
- returned events：`ice_rebound_d4` 两次。
- SCC：solution irreversible steps 2，forcedWinPrefix 2/2。

Base required / no-late：

- 文件：`worker_round53_start_comparison_v4_base_required_no_late.md/json`
- machine gate pass。
- all-winning required `ice_rebound_d4`：完整搜索未找到缺 required 的胜路。
- forbidden reachable：`ice_pass_through_d5`、`slide_restart_after_group`、`ice_destroy_group_d6_plus` 全无命中。
- base 可用知识满足 d6 前或更早；实际返回解只用 d4。

Meta explain：

- 文件：`worker_round53_layout_analysis_v4_meta.md/json`
- pass，cost 24，complete graph。
- reachable states 150，winning states 1。
- returned events：`ice_destroy_group_d6_plus:len1`、`slide_restart_after_group`、`ice_stop_short:d1`、两次 `ice_rebound_d4`。
- SCC：solution irreversible steps 3，forcedWinPrefix 3/3。

Meta required：

- 文件：`worker_round53_start_comparison_v4_meta_required.md/json`
- machine gate pass。
- all-winning required `ice_destroy_group_d6_plus`、`slide_restart_after_group`、`ice_rebound_d4`：完整搜索未找到缺 required 的胜路。

Pair scan：

- 文件：`worker_round53_start_comparison_v4_pair_goal_A/B/C/D.md/json`
- 四个接口全分离，且没有接口外 edge floor。
- 目标 pair 成立：A->B cost 20，C->D cost 24。
- 风险：A->D 可解 cost 19；B->D 可解 cost 9；D->B 可解 cost 9。C->A / C->B 属于反向内部 pair 事实，但当前不是本草案要利用的优点。

## 主要 caveat

- `A->D` 比 `A->B` 还短一格，是正式 meta-interface 候选不能接受的内部非目标 pair 风险。下一步要把 D 放到 meta-only d6 破墙后，或者让 D 的可达依赖一个 base 无法产生的状态。
- `B->D` 和 `D->B` 纯走路可达，说明右下接口太开放；B/D 不能只靠“不同边缘格”区分。
- Meta 的 d6 冰 `[10,1]` 目前主要是钥匙：打开接近角，自己停在 `[2,1]` 后没有被后续消费。它还没有达到“后期破坏性机制改写共享核心关系”的目标。
- Base 和 meta 共享同一 d4 门核是优点，但 meta 在 d6 后仍基本执行 base 的同一二段 d4。若要追求 4/5 审美，下一版应让 d6 产物成为第二次 d4 的新 obstacle / stopper，或让 d6 摧毁原 base obstacle 后用新冰替代它。
- 只有一个目标和两枚冰，密度高但表达上偏“门核练习”。它比 v3 紧，但还不是完整高审美 meta 草案。

## 失败模式记录

- `v1`：base 完全 walk-only 绕路；base 可达还泄露 d5/restart/d6。
- `v2`：base no-late gate 通过，但仍有上层纯走路绕过目标门。
- `v3`：base 成立且 no-late 干净；meta 只有一推 d6 门，过薄。
- `v4`：base/meta 硬证据成立；结构紧；主要失败从可解性转移到接口内外溢和 d6 消费不足。

## 下一步几何约束

- 保留 v4 的“同一目标冰 d4 出门/回封”中核，因为它没有 spare 补位冰，目标冰职责明确：目标占位、门、临时路径释放、最终回封。
- 把 d6 的结果接到中核：理想修改是 d6 摧毁或替换 `[2,3]` 这个 base 静态 rebound obstacle，使 meta 的第二次 d4 依赖 d6 产物，而不是依赖同一个静态墙。
- D 应移到 d6-only 空间中，且不能在 target 已满足的 d6 后立即可达；最好让 D 的最终可达需要“d6 产物 + 目标冰回封”两个条件。
- B/D 右侧通路要错开：可以加一列墙或把 D 整体上移/内缩到 d6 chamber 后，再用一条只在 meta 后打开的短通道出边。
