# Candle Sokoban 提交前冗余清理

状态：`candle_sokoban` 原型专属的提交前机械规范化。候选已经被接受后运行；它不属于设计修订，不调用 Designer，也不进入 Evidence Reviewer 或 Critic。

## 目标与边界

本流程只处理由固定算法枚举、并能用当前 runtime 完整证明不改变已接受作品的对象或结构区域。候选发现不要求任何角色预先判断“某格有没有机械职责”，也不逐格测试整张地图的所有普通空地；硬证据通过后仍允许因明确的审美或读图价值而保留。

未通过反事实的候选原样保留；证据不足的变换不应用。两种情况都不改变已接受版本。只有已经满足本文全部保持条件的变换才可形成 delivery version。

## 候选发现

对象少而且高 affordance，因此全部枚举；普通空地多，因此只返回最大结构单元。对已接受 layout 按下列顺序各扫描一次；前一类实际清理后，后一类在更新后的 layout 上扫描。

1. `whole_candle`
   - 每根蜡烛都进入整根删为空地的反事实，不按事件数量或 canonical 参与预筛。
   - 多格蜡烛的所有烛身与端帽是一个单元；单格蜡烛也是一个完整单元。
2. `single_brazier`
   - 每个火盆单独进入删为空地的反事实，不把相邻火盆合并成一组。
3. `vacated_object_floor_region`
   - 对象阶段实际删除后，把该完整对象腾出的格组按来源单独送入空地墙化；不得先与相邻普通空地合并。
   - 这保证删除对象产生的新 leaf、pocket 或轮廓缺口不会因并入较大活动区而漏检。
4. `detached_empty_region`
   - 把对象视为实体阻挡后，初始静态可站立图中与玩家分量分离、且不含玩家、蜡烛或火盆的最大普通空地区域。
5. `single_entry_floor_region`
   - 由一个静态入口连接到其余活动区域、内部不含玩家、蜡烛或火盆的最大 leaf、deadend、单入口 pocket 或边缘残余区域。
   - 房间的普通扩宽、矩形补完和多入口活动区不进入候选。
6. `outer_outline_band`
   - 在保留一圈完整外墙后仍可整体裁去的最大外侧空行、空列、墙行、墙列或厚外框带。

自发产生 `ignite`、`shrink` 或 `burn_out` 不能阻止一根蜡烛进入候选；这些事件可能只是对象自己的无效演出。这里没有 ordinary floor 的全画布枚举，也没有候选组合搜索。对象阶段完成后必须在更新后的 layout 上重建空地候选；空地阶段完成后再重建外轮廓候选。

## 固定操作顺序

```text
1. 每根 whole candle -> floor
2. 每个 single brazier -> floor
3. 每个已删除对象腾出的 floor region -> wall
4. detached / single-entry floor region -> wall
5. 在墙化后的当前 layout 上重扫 outer outline band -> trim
```

蜡烛必须整根删除，不得逐段删除。每个火盆独立删除，避免相邻火盆互相掩盖冗余。对象不直接测试替墙：若对象删除通过，它腾出的完整格组会自然进入下一阶段的 floor-to-wall；若删除失败，对象原样保留。裁剪只改变坐标原点，不改变保留元素的相对坐标。

阶段顺序本身是检查的一部分：先删对象，才能看见对象原先遮住的空地冗余；先把冗余空地墙化，才能看见新形成的厚外框；最后才裁墙。

## 对象擦除投影

直接删除蜡烛时，比较对象不是原始事件计数，而是擦除该蜡烛后的作品：从基线状态、边和事件中去掉被测蜡烛自身，以及只读写该蜡烛且不影响其它对象、玩家、胜利或倒数的自发事件，再与删除版比较。

下列情况不能在投影中擦除，因而说明蜡烛有职责：

- 玩家推动或侧滚过它；
- 它点燃、熄灭、遮挡或阻挡了其它蜡烛、火盆或玩家；
- 它在燃尽前的实体占位改变了任何可胜状态、对象路线或倒数时机；
- 它的点燃、缩短或燃尽改变了其它对象的事件时序、胜利时机或核心里程碑。

若一根蜡烛只在玩家与其发生有效交互前自行点燃、缩短和燃尽，擦除后其余作品轨迹与胜解族完全不变，且它没有临时阻碍作用，则它通过直接删除检查。事件很多不构成保留理由。

## 保持条件

每个实际应用的变换必须同时满足：

- layout 仍为矩形且最外圈完整封墙，parser 接受；
- 初始结算仍无静默点火、灭火或点盆；
- 玩家起始格及其相对所有保留对象的位置不变；本流程不搜索、比较或移动起点；
- 原 canonical inputs 全部合法并通关，行动数、全局倒数序列、各保留蜡烛的点燃状态与长度时间线、核心灭火/复燃事件时机完全相同；
- 完整可达图搜索为 `complete`，最短成本不下降；基线与反事实的全部胜解族经对象擦除与坐标投影后双向一致；
- 所有已接受的 required-winning 事件组和对象参与声明继续成立，不出现缺少核心墙灭火、重燃或共享倒数关系的胜路；
- `exposure audit` 为 `complete/pass` 且没有 later-event hit；
- 新增墙在全部可达边上不产生新的灭火、点火、点盆、缩短或来源归因。墙不能借清理之名成为新的灭火资源；
- 删除实体所开放的状态和边不能产生更短胜路、新解族、提前胜利、火源旁路或倒数时机旁路；
- 图差异只允许被删对象自己的可擦除事件、删除候选区域内的无效游走，或增加不通向胜利且不产生新机制事件的失败后游走。

先重放 canonical 与最短解；任一便宜条件失败就保留候选，不再为它展开完整图。只有便宜条件通过时才运行完整图、胜解族、事件必要性与 exposure。该两段式顺序只是节省计算，不改变保持条件。

## 审美保留

硬证据证明某个对象、空地或外轮廓可以清理，只说明它机械上可删，不强迫实际删除。若它承担明确的构图、负空间、对称、读图自然度或局部缺口价值，可以记为 `retained_aesthetic` 并保留；例如为避免轮廓过于僵直而留下一个不产生旁路的小缺口。

审美保留必须写出正面的具体价值，不能用“也许有用”代替证据不足。它不恢复 Designer、不触发 Reviewer 或 Critic，也不把提交前流程变成审美复审。

## Candle 特有判定

- 普通空地改墙不是纯拓扑收缩。因为墙可以遮芯灭火，必须逐边检查新墙接触产生的全部事件；只检查胜解不够。
- 火盆改地面会同时移除实体阻挡和胜利目标，必须拒绝开局胜利、提前胜利或目标义务旁路。只有删除本身通过时，其腾空格才在下一阶段独立测试墙化。
- 蜡烛对共享倒数敏感，但“参加过自己的燃烧结算”不等于有职责。只有无法被对象擦除投影消去的跨对象、路线、时机或胜利影响才要求保留。
- opening comfort 不属于本流程。Candle 的玩家起点和步数共同定义 solve instance，提交前清理固定起点，只验证其未改变。

## 输出

```yaml
redundant_element_prune:
  status: clean | normalized | retained
  candidate_discovery:
    method: candle_redundancy_units_v2
    candidate_units:
      - kind: whole_candle | single_brazier | vacated_object_floor_region | detached_empty_region | single_entry_floor_region | outer_outline_band
        cells: []
  candidates_checked:
    - candidate_unit: ""
      operation: remove | wallify | trim
      result: applied | retained_counterfactual_failed | retained_unproven | retained_aesthetic
      cheap_check: pass | fail
      complete_graph: complete | exhausted | not_run
      canonical_timing_preserved: true | false | unknown
      solution_family_preserved: true | false | unknown
      new_contact_events: []
      exposure_verdict: pass | fail | unknown | not_run
      artifact_refs: []
  delivery_layout_changed: true | false
  preservation_basis: ""
```

`retained_counterfactual_failed`、`retained_unproven` 与 `retained_aesthetic` 都不应用变换。每个 `applied` 单元都必须有完整 artifact；至少一个单元实际应用时记为 `review_preserving_change`，没有单元应用时记为 `unchanged`。
