# Evidence Review: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2 / review_1

```yaml
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
review_scope: evidence_only
```

## hard_fact_checks

- 主候选包、`design_claim`、主图 `layout_analysis`、`trace`、核心事件探针、计数探针、order probe、删目标报告与 compact prune 报告均位于指定 reports 目录内；本审查未读取 `mechanism_lab/runs/`，也未修改 playable list 或重启服务器。
- 主图硬事实与候选包一致：`layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2.md` 显示 found=yes、cost/depth=17、graph status=complete、reachable states=5140、legal transitions=14372、winning states=4。
- 返回 trace 支持候选包描述的因果链：step 1 发生 `box_to_sticky:n1` 与 `sticky_merge:n1`，形成 `MMM`；step 4 发生第一次 `move_sticky_rigid`；step 10 与 step 11 分别发生 `anchor_boundary_shift:box_sticky` 和 `sticky_to_box:n1`，形成 `CMM` 与 `CCM`；step 14、16、17 分别完成上方 C、下方 C、右侧 M 目标消费，其中 step 17 是第二次 `move_sticky_rigid`。
- 核心事件探针处理正确：`event_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_core5.md` 的 combined probe 为 `Found bypass: false` 且 `Status: complete`；五个 individual probes 对 `box_to_sticky`、`sticky_merge`、`move_sticky_rigid`、`anchor_boundary_shift:box_sticky`、`sticky_to_box` 均为 complete/no winning bypass。
- 主图计数探针处理正确：`anchor_boundary_shift:box_sticky >= 2`、`sticky_to_box >= 2`、`move_sticky_rigid >= 2` 三个 probe 均为 `Found bypass below count: false` 且 `Status: complete`。这支持候选包的“双刷线、双 sticky_to_box、双 sticky rigid move”必要性主张。
- 负面 order probe 被正确处理：`order_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_cut_before_merge.md` 找到 depth 37 的 violation win，事件序列中存在早期 `sticky_to_box:n1` 先于后续 `sticky_merge:n1`。候选包没有主张“所有胜路都先 merge 后 cut”，并在 explicit_non_claims 与 order_probe_negative_boundary 中把它作为边界条件列出，因此该负面结果没有被忽略。
- 删目标探针与候选包相符：
  - 删除上目标 `[7,1]` 后，shortest cost 仍为 17，但 winning states 从 4 增至 48；对应 `sticky_to_box >= 2` 计数探针找到 count=1 的低计数胜路。候选包把它表述为“全胜路计数门/低计数绕过”，未错误表述为最短成本下降。
  - 删除右目标 `[10,3]` 后，shortest cost 从 17 降到 16；`move_sticky_rigid >= 2` 计数探针找到 count=1 的胜路，支持“右目标消费剩余 sticky tail”的证据主张。
  - 删除下目标 `[8,4]` 后，shortest cost 从 17 降到 16；`sticky_to_box >= 2` 计数探针找到 count=1 的胜路，支持“下目标强制第二次 cut/第二个 C 输出消费”的主张。
- compact prune 报告支持“v2 是 v1 的压缩版本”这一有限主张：v2 cost 仍为 17，reachable states 从 35393 降至 5140，返回事件计数保持不变。报告自身也声明这不是逐格最小性证明。

## overclaim_or_caveats

- 证据支持核心机制必要性和计数必要性，但不支持更强的全路线顺序主张；已有 order probe 证明存在早期 `sticky_to_box` 先于 `sticky_merge` 的长胜路。候选包已正确降格为非主张。
- 上目标的证据是低计数胜路与 winning-state 放宽，不是 shortest-cost delta；候选包当前处理正确，后续摘要不应把它改写成“删上目标会降成本”。
- 证据层级是事件组和事件计数，不是对象实例唯一性；候选包已显式不主张 per-object identity uniqueness。
- compact prune 只支持“相对 v1 更紧且保留事件链”，不支持“所有地板/墙体均已穷尽最小化”；候选包已有相应限制。
- “只使用 lexicon、未读取 runs”的来源声明无法由这些报告独立证明；本审查按用户边界没有读取 `runs/`，只能确认候选包和 `design_claim` 这样陈述。
- 本审查不评价审美、难度或是否应加入 playable list；这里只判断证据是否支撑候选包中的机制主张。

## final_recommendation

证据支持候选包的核心主张，但应保留上述 caveat，因此结论为 `supports_with_caveats`。不需要修包、不需要重跑探针，也不应因负面 order probe 拒绝该包；该负面结果已经被候选包正确收束为非主张边界。建议进入后续 proposal/critic 环节，且后续引用时继续避免把审美、难度或逐格最小性当作本证据审查结论。
