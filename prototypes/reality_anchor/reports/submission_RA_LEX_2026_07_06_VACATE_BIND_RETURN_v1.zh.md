# 合格候选简报：RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1

槽位：Reality Anchor 后段紧凑挑战候选 / lexicon 组合验证

## ASCII View

```text
#########
##MG.M@.#
#.M.M..M#
#BSLP#.##
#.G..#..#
#########
```

## 解法步骤

```text
down left left down left right up up left right down right right up left left down down left up right down up left down right up
```

事件摘要：

- step 3-6：sticky 刚体推进、P/L 墙格门位移、B/S 边界位移与 `sticky_to_box` 共同建立下侧责任链。
- step 10：`box_to_sticky + sticky_merge` 让 top_goal `[3,1]` 第一次被覆盖。
- step 16-19：再次 release/bind 并移动 B/S，使资源继续向 low_goal 侧迁移。
- step 25：low_goal 侧完成时 top_goal 被腾空，证明第一次覆盖只是中间债务。
- step 27：sticky 刚体回返，top_goal 最终回填获胜。

## 工具证据

- `layout_analysis_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1.md`：shortest cost 27，graph complete，691 states，1517 transitions，1 first-win terminal state。
- `event_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_core7_separate.md`：complete/no bypass；所有胜路都需要 P/L shift、B/S shift、pull、`box_to_sticky`、`sticky_to_box`、sticky rigid move、sticky_merge。
- `target_vacate_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_target_vacate.md`：complete/no bypass；所有胜路中 top_goal `[3,1]` 必须经历 covered -> uncovered -> covered before win。
- 目标删除反事实：删 top_goal 后成本 27 -> 25，原 trace 在 step25 已胜，说明它承担最终回填义务；删 low_goal 后成本 27 -> 2，并出现缺少 P/L、B/S、pull 与双向 material conversion 的 bypass，说明它阻止早期 sticky 速解。
- `npm run check`：新增探针后曾通过；最终收尾复跑被当前工作区未跟踪源码 `src/playable/levelCatalog.ts` 的既有类型错误阻塞（`LevelLineage.source` 需要 string，但收到 `string | undefined`），与本候选 artifact/探针无关。

## Review 结论摘要

- Evidence reviewer：`supports_with_caveats`，`proposal_ready_with_caveats`，`required_action: none`。
- Puzzle critic：`supports_with_noncore_caveats`，`proposal_ready_with_caveats`，`required_action: none`。
- 评分口径：critic 支持 aesthetic >=4 与 difficulty >=4，但建议谨慎标 4；不预称 5。主要 caveat 是最优路高度收束，且 top_goal 的删目标反事实只减少末两步，因此提交文案应强调 state-level responsibility reversal，不应声明对象身份级必要性。

## 本次使用的设计语料

- `mechanism_lab/lexicon.md` 的「P/L 横向把手的墙格门」：用于构造下方 P/L 墙格门，让 push/pull 改变站位与可达侧。
- `mechanism_lab/lexicon.md` 的「B/S 绑定债：从可分配箱子到形状化黏块」：用于把可分配 crate 压回 sticky 侧并通过 sticky_merge 形成目标覆盖债。
- `mechanism_lab/lexicon.md` 的「B/S 解绑定债：用边界切割回收箱子资源」：用于中段 `sticky_to_box` 释放资源，使第一次覆盖必须被撤销。
- `mechanism_lab/lexicon.md` 的「刚体黏块推进后的回返谱系」：用于末段 sticky 刚体回返，将被腾空的 top_goal 最终回填。

未读取 `prototypes/reality_anchor/mechanism_lab/runs`。本轮额外补的衔接逻辑是：low_goal 阻止早胜并迫使资源离开 top_goal；top_goal 则要求同一目标完成“第一次覆盖 -> 腾空 -> 最终回填”的状态责任反转。
