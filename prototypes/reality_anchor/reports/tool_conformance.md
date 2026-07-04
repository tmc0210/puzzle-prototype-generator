# Tool Conformance: reality_anchor

- Generated at: 2026-07-03T18:10:22.754Z
- Status: warning

| Check | Status | Reason |
| --- | --- | --- |
| adapter_registered | pass | Adapter 'reality_anchor' registered. |
| parse_render_smoke | pass | Parsed and rendered 8 smoke levels. |
| expected_trace_replay | pass | Replayed 7 expected traces. |
| sticky_partial_block_illegal | pass | Partial sticky block rejected with state unchanged. |
| solver_smoke | pass | Solved RA_SMOKE_01_PUSH_CHAIN cost=1, inputs=right. |
| graph_smoke | pass | Graph complete; states=6. |
| layout_analyzer_smoke | pass | Analyzed RA_SMOKE_01_PUSH_CHAIN; graph=complete. |
| probe_seed_suite | pass | Marked implemented at maturity 'probe_seed_suite'. prototypes/reality_anchor/levels.yml contains confirmed-rule smoke fixtures. |
| raw_sampler | pass | reality_anchor_raw_sampler_v1 kept 2 replayable finding(s). |
| candidate_seed_factories | unavailable | Maturity 'unavailable'. level_specs_v2-targeted Reality Anchor seed factories have not been authored. |
| temporary_miner | pass | Marked implemented at maturity 'raw_sampler'. Reality Anchor mine is a raw sampler, not a calibrated curated miner. |
| curated_miner | unavailable | Maturity 'unavailable'. Reality Anchor scoring and filtering are not calibrated beyond raw discovery ranking. |
| puzzlescript_exporter | unavailable | Maturity 'unavailable'. PuzzleScript Next export is not implemented for Reality Anchor. |
| puzzlescript_checker | unavailable | Maturity 'unavailable'. PuzzleScript Next check is not implemented for Reality Anchor. |
| runtime_backed_playable | pass | playable/index.html, app.js, data.json, and style.css exist. |
