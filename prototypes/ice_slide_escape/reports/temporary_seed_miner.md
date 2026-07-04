# Temporary Seed Miner Report: ice_slide_escape

Status: heuristic mined evidence. These are not accepted levels, slots, or quality verdicts.
Score note: ranking scores are search preferences, not mechanism quality judgments.
Maturity: curated_miner.


## Run

- Generated at: 2026-07-03T05:35:55.611Z
- Seed: 5302
- Preset: deep
- Iterations: 6000
- Search space: ice_slide_escape curated miner v4: expanded row witnesses, 2D capsule rooms with distinct exits, and design-surface ranking hints
- Budgets: maxStates=12000, maxDepth=100, graphMaxStates=12000, maxInstances=160, timeBudgetMs=180000
- Filters: minScore=5, maxFindings=20
- Objective: cli_weights
- Objective weights: heterogeneous_push_roles=160, mixed_mechanic_chain=140, stopper_cascade_candidate=120, two_dimensional_structure=30, destroy_group_d6_plus=80, restart_after_group=80, row_probe=-100

## Stats

- Generated: 29
- Solve instances: 160
- Full analyses: 20
- Prefiltered unsolved: 140
- Invalid: 0
- Unsolved: 140
- Solved: 20
- Complete graph: 16
- Complete agency: 16
- Kept before limit: 5
- Kept: 4
- Stop reason: maxInstances budget reached (160)

## Tag Counts

- boundary_disappear: 2
- branching_win_dag: 1
- destroy_group_d6_plus: 2
- destroy_moving_ice_d3: 2
- distinct_edge_goal: 4
- heterogeneous_push_roles: 1
- ice_blocks_ice_no_chain_push: 2
- mixed_mechanic_chain: 4
- multi_push_chain: 1
- pass_through_d5: 1
- push_ice: 4
- rebound_d4: 1
- restart_after_group: 3
- row_probe: 3
- two_dimensional_structure: 1

## Findings

### MF_0026_s0_2_g9_3: rankingPriorScore 426

- Source: ice_mechanic_probe_prior_v1/icebacked_capsule_room, seed=5302, index=26
- Score breakdown: base=96, objective=330, final=426, objective=cli_weights
- Solve instance: s0_2_g9_3, start=[0, 2], goal=[9, 3]
- Tags: push_ice, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=16, explored=537
- Inputs: right down right right right right up right right up left down right right down right
- Events: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk push_ice ice_boundary_disappear:d1 walk push_ice ice_boundary_disappear:d0
- Event counts: walk=12, push_ice=4, ice_blocks_ice_no_chain_push=2, ice_rebound_d4=2, ice_boundary_disappear:d1=1, ice_boundary_disappear:d0=1
- Graph: status=complete, states=4090, transitions=10634, wins=2
- SCC: shape=branching_win_dag, count=118, irreversible=4, forcedPrefix=0
- Initial SCC: states=31, out=8, winOut=3, deadOut=5
- Win DAG: branching=3, merging=3

Layout:

```text
#####.####
#I.G..I..#
@...#...I.
#...I..G.I
#####..###
#........#
##########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
#####.####
#I.G..I..#
S...#...I.
#...I..G.X
#####..###
#........#
##########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0004_s0_0_g1_0: rankingPriorScore 223

- Source: ice_mechanic_probe_prior_v1/d6_destroy_restart_d3_probe, seed=5302, index=4
- Score breakdown: base=23, objective=200, final=223, objective=cli_weights
- Solve instance: s0_0_g1_0, start=[0, 0], goal=[1, 0]
- Tags: push_ice, destroy_moving_ice_d3, destroy_group_d6_plus, restart_after_group, row_probe, distinct_edge_goal, mixed_mechanic_chain
- Solution: cost=1, explored=2
- Inputs: right
- Events: push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_destroyed_d3
- Event counts: push_ice=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_destroyed_d3=1
- Graph: status=complete, states=14, transitions=25, wins=1
- SCC: shape=one_win_continuation_per_scc, count=2, irreversible=1, forcedPrefix=1
- Initial SCC: states=1, out=1, winOut=1, deadOut=0
- Win DAG: branching=0, merging=0

Layout:

```text
@I......##...#
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
SX......##...#
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, destroy_moving_ice_d3, destroy_group_d6_plus, restart_after_group, row_probe, distinct_edge_goal, mixed_mechanic_chain.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- Row probe: use this to calibrate distance semantics, not as layout inspiration.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.

### MF_0022_s0_0_g1_0: rankingPriorScore 220

- Source: ice_mechanic_probe_prior_v1/random_line_probe, seed=5302, index=22
- Score breakdown: base=20, objective=200, final=220, objective=cli_weights
- Solve instance: s0_0_g1_0, start=[0, 0], goal=[1, 0]
- Tags: push_ice, destroy_group_d6_plus, restart_after_group, boundary_disappear, ice_blocks_ice_no_chain_push, row_probe, distinct_edge_goal, mixed_mechanic_chain
- Solution: cost=1, explored=2
- Inputs: right
- Events: push_ice ice_blocks_ice_no_chain_push ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_boundary_disappear:d2
- Event counts: push_ice=1, ice_blocks_ice_no_chain_push=1, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_boundary_disappear:d2=1
- Graph: status=complete, states=12, transitions=21, wins=1
- SCC: shape=one_win_continuation_per_scc, count=2, irreversible=1, forcedPrefix=1
- Initial SCC: states=1, out=1, winOut=1, deadOut=0
- Win DAG: branching=0, merging=0

Layout:

```text
@I......I..
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
SX......I..
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, destroy_group_d6_plus, restart_after_group, boundary_disappear, ice_blocks_ice_no_chain_push, row_probe, distinct_edge_goal, mixed_mechanic_chain.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- Row probe: use this to calibrate distance semantics, not as layout inspiration.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.

### MF_0003_s0_0_g1_0: rankingPriorScore 145

- Source: ice_mechanic_probe_prior_v1/d5_pass_restart_d3_probe, seed=5302, index=3
- Score breakdown: base=25, objective=120, final=145, objective=cli_weights
- Solve instance: s0_0_g1_0, start=[0, 0], goal=[1, 0]
- Tags: push_ice, destroy_moving_ice_d3, pass_through_d5, restart_after_group, row_probe, distinct_edge_goal, mixed_mechanic_chain
- Solution: cost=1, explored=2
- Inputs: right
- Events: push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_destroyed_d3
- Event counts: push_ice=1, ice_pass_through_d5:len2=1, slide_restart_after_group=1, ice_destroyed_d3=1
- Graph: status=complete, states=8, transitions=13, wins=1
- SCC: shape=one_win_continuation_per_scc, count=2, irreversible=1, forcedPrefix=1
- Initial SCC: states=1, out=1, winOut=1, deadOut=0
- Win DAG: branching=0, merging=0

Layout:

```text
@I.....##...#
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
SX.....##...#
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, destroy_moving_ice_d3, pass_through_d5, restart_after_group, row_probe, distinct_edge_goal, mixed_mechanic_chain.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- Row probe: use this to calibrate distance semantics, not as layout inspiration.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
