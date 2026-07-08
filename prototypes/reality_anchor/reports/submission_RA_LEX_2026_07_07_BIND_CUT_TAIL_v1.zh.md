# 合格候选简报：RA_LEX_2026_07_07_BIND_CUT_TAIL_v1

槽位：Reality Anchor 中后段 B/S application / lexicon 组合验证  
状态：`proposal_ready_with_caveats`，`review_integrity: independent_review`，`archive_eligibility: human_pending`

## ASCII View

```text
##########
#@.#G#...#
#.CC....G#
####....##
#...BS...#
##########
```

## 解法步骤

```text
down right right right down right right right up left down left left up right right right
```

事件摘要：

- step 2-4：两个箱子被连续右推，依次经历 `CC -> C+M -> MM`；step 4 触发第二次 `box_to_sticky` 与 `sticky_merge`。
- step 10：从右侧反推 `MM`，触发 `sticky_to_box`，输出 `C+M`。
- step 14：切出的 C 进入上方单格目标袋。
- step 15-17：剩余 M 尾巴作为刚体推进到右侧目标。

## 工具证据

- `layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1.md`：shortest cost 17，graph complete，2654 states，7018 transitions，4 winning states。
- `event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_core5.md`：complete/no bypass；所有胜路都需要 `force_chain`、`box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid`。
- `event_count_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_box_to_sticky_min2_box_to_sticky_min2.md`：complete/no bypass；所有胜路至少两次 `box_to_sticky`。
- `order_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_cut_before_merge.md`：complete/no violation；没有 `sticky_to_box` 早于 `sticky_merge` 的胜路。
- 删 top_goal：成本 17 -> 6，并出现 missing `sticky_to_box` 的胜路，说明上目标负责迫使切割。
- 删 tail_goal：成本 17 -> 14，核心事件仍必经，但省掉 M 尾巴最后三步刚体推进，说明右目标负责消费尾部输出。
- 本轮复跑 verify：`solve` 仍为 17 步；`explain-level` 仍为 graph complete 2654 states / 7018 transitions；`event_probe_*_core5_verify`、`event_count_*_verify`、`order_probe_*_verify` 均 complete 且无绕过/顺序违规。
- `npm run check`、`npx tsx src/cli.ts evaluate prototypes/reality_anchor`、`npx tsx src/playable/exportPlayable.ts prototypes/reality_anchor`：通过。

## Review 结论摘要

- Review 1 evidence reviewer：`supports_with_caveats`，`proposal_ready_with_caveats`，`required_action: none`。
- Review 1 puzzle critic：`supports_with_noncore_caveats`，`proposal_ready_with_caveats`，`required_action: none`。
- Subagent review 2 evidence reviewer：`supports_with_caveats`，`proposal_ready_with_caveats`，`required_action: none`。
- Subagent review 2 puzzle critic：`supports_with_noncore_caveats`，`proposal_ready_with_caveats`，`required_action: none`。
- 评分口径：支持 `difficulty >=3` 与 `aesthetic >=3`，但不支持声称 4。主要 caveat 是前三次推进较强 forced/scripted，tail_goal 的三次右推是必要的尾部消费，但玩家侧新信息较少。

## Review Artifact

- `candidate_packet_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_review1.zh.md`
- `evidence_review_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_review_1.md`
- `puzzle_critic_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_review_1.md`
- `evidence_review_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_review_2_subagent.md`
- `puzzle_critic_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_review_2_subagent.md`
- `designer_action_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_review_1.zh.md`

## 本次使用的设计语料

- `mechanism_lab/lexicon.md` 的「B/S 绑定债：箱资源生成刚体 footprint」：用于让两个箱子跨边界后先生成 `MM` 横条，而不是停在早期 `C+M`。
- `mechanism_lab/lexicon.md` 的「固定 B/S 切割：C+M 尾巴与单格目标袋」：用于让 `MM` 回切成 `C+M`，由 C 覆盖上目标并留下 M 尾巴。
- `mechanism_lab/lexicon.md` 的「刚体黏块 + 墙口：反向施力格谱系 / 目标口消费」：用于让 M 尾巴作为刚体输出被右目标消费。

未读取 `prototypes/reality_anchor/mechanism_lab/runs`。额外补的衔接逻辑是：通过墙格门和目标分责，把“绑定成刚体”和“切回 C+M”做成同一条材料责任链，而不是孤立事件 witness。

## Caveat

这是合格强 3 候选，不是 4 分提交。若要继续追 4，需要让 `C+M` 阶段先呈现一个更明确的“看似可行但失败”的玩家计划，使继续合并成 `MM` 成为主动洞见，而不是开局顺推。
