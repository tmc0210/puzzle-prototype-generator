# Opening Comfort Check: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim

```yaml
opening_comfort_check:
  status: clean_with_caveat
  candidate_start_position: [2, 5]
  role: challenge
  shortest_solution_cost: 34
  initial_scc_size: 3
  initial_region:
    states: 3
    commitments: 1
    viable_commitments: 1
    dead_commitments: 0
    progress_commitments: 1
    optimal_commitments: 1
  initial_exit_source_distances:
    - 2
  initial_win_exit_source_distances:
    - 2
  dead_exits_before_first_win_exit: 0
  first_step_legal_events:
    up:
      legal: true
      events: [walk]
    down:
      legal: false
      reason: destination_blocked
    left:
      legal: false
      reason: destination_blocked
    right:
      legal: false
      reason: pull_world_front_blocked
  after_first_walk:
    position_summary: "玩家上移一格后可以 walk back/down 或向右 walk 继续观察；核心对象动作仍未贴脸触发。"
  whether_core_chain_preserved: true
  caveat: "开局 initial SCC 只有 3 个状态，属于紧凑 challenge 开局；不过第一手不是关键不可逆承诺，正确不可逆出口距离为 2，且没有先于正确出口的 dead irreversible exits。"
  evidence_refs:
    - prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.md
```

结论：开局偏紧，但不属于第一步贴脸关键承诺；作为 challenge 候选可以接受。
