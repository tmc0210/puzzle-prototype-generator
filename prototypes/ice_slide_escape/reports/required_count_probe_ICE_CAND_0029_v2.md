# Required Count Probe: ICE_CAND_0029_v2

Layout source: `prototypes/ice_slide_escape/reports/ICE_CAND_0029_v2_coupled_vertical_debt_layout.txt`

Method:

- Same `ice_slide_escape` runtime as solver reports.
- Search key is `(state, capped required-event counts)`.
- A counterexample is any winning path whose capped counts do not satisfy the declared minimums.
- Max states: 5,000,000.
- Max depth: 200.

Base A -> B requirements:

- `push_ice >= 2`
- `ice_stop_short:d1 >= 1`
- `ice_stop_short:d2 >= 1`
- `ice_blocks_ice_no_chain_push >= 1`

Result:

- status: `complete_no_missing_required_win`
- visited coverage states: 13,129
- satisfying wins: 1

Meta C -> D requirements:

- `push_ice >= 3`
- `ice_pass_through_d5 >= 1`
- `slide_restart_after_group >= 1`
- `ice_blocks_ice_no_chain_push >= 2`
- `ice_stop_short:d1 >= 1`
- `ice_stop_short:d2 >= 2`

Result:

- status: `complete_no_missing_required_win`
- visited coverage states: 318,734
- satisfying wins: 1

Interpretation:

- Base has no winning bypass missing the two-push local target-debt chain.
- Meta has no winning bypass missing the three-push d5 revisit chain, including the second/third vertical coupled stopper sequence.

