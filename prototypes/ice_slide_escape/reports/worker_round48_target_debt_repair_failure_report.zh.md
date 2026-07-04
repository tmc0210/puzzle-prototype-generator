# worker_round48 目标债务链结构修复失败报告

结论：本轮未找到满足全部目标的候选布局，因此没有写 `worker_round48_*.txt` 候选关卡文件。  
推荐暂不采用 v12/v14 同一左目标 d6 语法的局部修补方案；需要扩大结构改动，把“base 左目标补债入口”和“meta 内部 d6 准备入口”解耦。

## 目标

- base `A=[0,5] -> B=[11,10]`：需要 `d3 + d2/stop` 的双目标债务链。
- base 完整可达图：不能暴露 `ice_destroy_group_d6_plus` / `ice_pass_through_d5` / `slide_restart_after_group`。
- meta `C=[10,10] -> D=[22,5]`：需要 `d6 + d3 + stop`，且 B != C。
- 尽量共享左/右目标债务结构，但明确避免 v8/v12 类 B=C 或 base 可达 meta d6 暴露。

## 已知骨架复核

### v12：base/meta 都有形，但 base 完整可达泄露

布局：

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

证据摘要：

- base `A -> B`：可解，cost 30，双目标债务链成立。
- meta `C -> D`：可解，cost 47，包含内部 `ice_destroy_group_d6_plus` 与 `d3/stop`。
- base strict compare：失败。完整可达图暴露 `ice_destroy_group_d6_plus:len2`、`ice_pass_through_d5:len12`、`slide_restart_after_group`。

关键泄露：

base 先补回左上 `x5` target 后，仍能从下侧回到 `row5 x4` 推脸；此时右目标已空、左目标已补，局部态等价于 meta 触发内部 d6 前的态，于是 base 也能把左目标向右横推触发 d6。

### v14：base 干净，但 meta 死

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

证据摘要：

- base `A -> B`：可解，双目标债务链仍成立，完整可达图不暴露 late events。
- meta `C -> D`：不可解，complete graph 0 wins。

解释：

封住 `row6 x4` 后，base 无法在左补后回到 `row5 x4`，所以 late d6 泄露消失；但 meta 也失去通过 `x4` 竖列准备 d4/d6 的能力。

## 本轮局部修复尝试

### 尝试 1：row7/row8 侧桥顺序门

意图：保留 v12 的左目标 d6，但让 meta 从 C 侧经侧桥进入左区准备 d4/d6，同时希望 base 左补后不能复用。

测试布局：

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####II...I..###########
####...#...############
####**.##..############
##########..###########
```

代表命令：

```powershell
@'
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####II...I..###########
####...#...############
####**.##..############
##########..###########
'@ | npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id worker_round48_side_bridge_probe_meta --player-goal "22,5" --starts "10,10" --required-winning-events ice_destroy_group_d6_plus --required-winning-events ice_destroy_group_d3 --required-winning-events stop_short --max-states 120000 --graph-max-states 120000 --max-depth 140
```

```powershell
@'
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####II...I..###########
####...#...############
####**.##..############
##########..###########
'@ | npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id worker_round48_side_bridge_probe_base_strict --player-goal "11,10" --starts "0,5" --forbidden-reachable-events ice_destroy_group_d6_plus --forbidden-reachable-events ice_pass_through_d5 --forbidden-reachable-events slide_restart_after_group --max-states 120000 --graph-max-states 120000 --max-depth 140
```

结果：

- meta required pass，cost 47，完整图很大，约 30503 states。
- base strict fail，且 base 被侧桥打穿成 cost 16 低成本旁路。
- base 完整可达暴露大量 late events，包括 `ice_destroy_group_d6_plus:len11/len2`、`ice_pass_through_d5:len11/len12/len4`、`slide_restart_after_group`。

判定：失败。侧桥把 meta 入口给出来的同时，也给 base 打开了更强旁路，不是可局部收敛的方向。

### 尝试 2：用 `x5,y8` 冰占住左补债站位

意图：阻止 base 在右目标未处理时先站到 `x5,y8` 补左目标，从而切断 v12 泄露；观察 meta 是否还能从 C 侧处理。

测试布局：

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####II#.#I..###########
####.I.....############
####**.##..############
##########..###########
```

代表命令：

```powershell
@'
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####II#.#I..###########
####.I.....############
####**.##..############
##########..###########
'@ | npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id worker_round48_x5y8_blocker_base_strict --player-goal "11,10" --starts "0,5" --forbidden-reachable-events ice_destroy_group_d6_plus --forbidden-reachable-events ice_pass_through_d5 --forbidden-reachable-events slide_restart_after_group --max-states 120000 --graph-max-states 120000 --max-depth 140
```

```powershell
@'
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####II#.#I..###########
####.I.....############
####**.##..############
##########..###########
'@ | npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id worker_round48_x5y8_blocker_meta_required --player-goal "22,5" --starts "10,10" --required-winning-events ice_destroy_group_d6_plus --required-winning-events ice_destroy_group_d3 --required-winning-events stop_short --max-states 120000 --graph-max-states 120000 --max-depth 140
```

结果：

- base 仍可解，cost 30，仍保留目标债务链形状，但多出一次 `stop_short:d1`。
- base strict 仍失败：完整可达暴露 `ice_destroy_group_d6_plus:len2` 与 `slide_restart_after_group`。虽然没有继续暴露 d5，但核心 d6 泄露没有消失。
- meta required fail，complete graph 0 wins。

判定：失败。站位占用没有真正破坏 base 的 late d6 等价局部态，还同时堵死了 meta。

## 核心矛盾

在 v12 的共享左目标 d6 语法中，meta 要求如下局部条件：

- 右侧目标已经被处理或为空。
- 左上 `x5,y5` target 保持或被补回。
- 玩家能站到 `x4,y5` 左侧推脸。
- 横推左目标向右，形成内部 `d6`。

base 的双目标债务链如果允许“先补左，再从下侧回到 `x4/y5` 推脸”，就会构造出同一个局部条件。  
因此，任何保留这套左目标 d6 的修复，都必须至少打破下面两者之一：

- base 能在右目标最终补债前先补左目标。
- base 左补后能回到 `x4,y5` 推脸。

v14 选择打破第二项，所以 base 干净；但 meta 也依赖同一个 `x4` 入口，导致 meta 死。  
侧桥方案重新给 meta 入口，也重新给 base 入口，而且还产生低成本旁路。  
占位方案试图打破第一项，但当前局部尺度下会同时阻断 meta，并且没有完全消除 d6 reachable。

所以，本轮判断不是“还差一个墙位”，而是“左目标补债站位”和“meta d6 推脸站位”在当前 11 行骨架里绑定过紧。

## 下一步结构建议

推荐进入更大一圈的结构改造，而不是继续围绕 v12/v14 做单格修补：

1. **入口解耦**：保留 v14 的 base-clean 封口，把 meta d6 改成另一条 C-only 准备线；不要再让 meta 和 base 左补后共享 `row5 x4` 这个推脸入口。
2. **顺序门外移**：如果仍想共享左目标 d6，必须把“左目标补债站位 `x5,y8`”做成右目标补债之后才可达，而 meta 另有只到 `x4` 不到 `x5` 的入口。当前 row8 横向连通太短，单格门很难区分 `x4,y8` 和 `x5,y8`。
3. **d6 资源分离**：可以接受 worker_round47 v1 的思路，用非目标冰或 meta-only 冰触发内部 d6；再在 base 侧另加第二个目标债务，以补回审美厚度。这样不强迫同一个左目标同时承担 base refill 与 meta d6 projectile 两个相冲突角色。

## 推荐

不推荐采用本轮两个 probe，也不推荐继续在 v12 左目标共享 d6 上做单格补丁。  
推荐以 v14 的 base-clean 作为起点，重做 meta 内部 d6 的资源来源；或者以 worker_round47 v1 的 hard gates 为起点，补一个独立第二目标债务，而不是把 d6 强行绑回左目标。

