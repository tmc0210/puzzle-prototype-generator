# Evidence Review: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1 / review_1

```yaml
review_iteration: review_1
candidate_version_reviewed: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1
review_input_type: candidate_version
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none

supported_claims:
  - 主解存在且硬事实一致：主分析报告 found=yes, cost=8, depth=8，输入为 down left left up down down up left。
  - required_winning_path_events 的事件组必要性得到支持：core_exact_probe 完整探索 57 states，sticky_split、sticky_to_box、move_sticky_rigid、push_object:sticky#1、push_object:sticky#2、push_object:crate#2 均无 winning bypass。
  - bridge crate 消费得到额外支持：event_count_probe 对 push_object:crate#2 min1 完整探索 57 states，未找到低于 1 次的 winning bypass。
  - 返回 trace 支持候选叙述的因果链：step 3 left 触发 push_object:sticky#1、move_sticky_rigid、sticky_to_box:n3、sticky_split:n1；step 4 up 覆盖上目标；step 6 down 覆盖下目标；step 8 left 触发 push_object:crate#2 并覆盖中心目标。
  - 三个目标非冗余得到反事实支持：删除上目标、中心桥目标、下目标均使最短解从 8 降到 6，并分别移除对应的上端点、crate bridge、下端点消费动作；prune 报告保留三目标的结论由这些完整图支持。
  - 固定 B/S 无移动得到支持：fixed_anchor_probe 的 reachable scan 完整，63 reachable states / 154 transitions，forbiddenHits 为空，未见 anchor_boundary_shift:box_sticky；布局中无 P/L anchor。
  - forbidden_if_seen_anywhere 基本得到支持：fixed_anchor_probe 的完整 reachable event_counts 只列出 walk、move_sticky_rigid、push_object:crate#2、push_object:sticky#1、push_object:sticky#2、sticky_split:n1、sticky_to_box:n3，未列出 anchor_boundary_shift:push_pull、box_to_sticky、sticky_merge、pull_object。
  - SCC/开局表述准确：主图 complete，57 reachable states、132 legal transitions、3 winning states；initial SCC states=3、dist=4、out=1、winOut=1、deadOut=0；solution irreversible path steps=4、forcedWinPrefix=1/4、branchingWinSccs=4、mergingWinSccs=3、handoff scripted=1/4。
  - 开局 buffer 表述准确：主解前两步为 walk 后才切割；wall_y3x6 变体 cost 仍为 8 但第一步即 sticky_to_box/sticky_split，initial SCC 从 3 states 缩为 1 state；wall_y3x5 完整搜索无解。

unsupported_or_overclaimed:
  - 无阻断性 overclaim。
  - `push_object:sticky#1` 不是实例级唯一标签：它同时出现在首次 C 形整体左推切割和上端点上推动作中。因此 core_exact_probe 只能证明该事件模式必经，不能单独证明“上端点第二次 push”在所有胜路中以实例级方式必经；上端点消费目前由返回 trace、目标删除反事实和布局角色共同支持。
  - `player_insight` 与 `why_not_execution` 属于设计解释；工具证据支持其前提，不单独证明玩家会产生该 insight 或美学/难度评分。
  - `allowed_exposure_through: K_runtime_smoke` 不应被解读为正式知识阶段证明；Reality Anchor 的 curriculum/knowledge 文件显示 K_runtime_smoke 是 runtime adapter smoke stub，detector 无 required events，非正式 player-model target。

evidence_limits:
  - analyzer 未报告 returned solution 的 instance-level object participation；本审查只确认事件组、trace 快照、目标反事实和图事实，不确认 all-route object identity uniqueness。
  - 未声明 route uniqueness；证据也不支持唯一输入序列。
  - fixed_anchor_probe 的 default combined winning-path groups 包含 movable_push_pull_shift 与 pull_event；这些在本候选无 P/L、无 pull 语义下是无关默认组。候选包明确只引用 reachable scan 和 fixed_box_sticky_effect，这一处理是恰当的。
  - fixed_anchor_probe 对 forbiddenHits 只显式配置 anchor_boundary_shift:box_sticky；其它 forbidden_if_seen_anywhere 项的 absence 依赖 complete reachable event_counts 的穷尽列表，而非单独 forbiddenHits 字段。
  - K_runtime_smoke detector 未配置，不能作为机制覆盖或质量证据使用。

scc_graph_interpretation:
  graph_fact: "complete graph; initial SCC states=3/out=1/winOut=1/deadOut=0; irreversible path steps=4; forcedWinPrefix=1/4; handoff scripted=1/4; wall_y3x6 first action becomes immediate split"
  neutral_meaning: "第一不可逆切割是唯一可胜进展承诺，但不是初始立即动作；切割后存在小范围可逆站位和若干可胜分支。"
  player_facing_interpretation: "支持候选包关于 compact mechanism assignment、非长路线税、保留右侧开局读秒空间的表述。"
  verdict_effect: caveat

questions_for_designer:
  - 若下一轮要强化 all-route endpoint-consumption claim，建议补一个 `push_object:sticky#1 >= 2` 或位置/对象实例级 probe；当前不是进入下一步的阻断项。
```
