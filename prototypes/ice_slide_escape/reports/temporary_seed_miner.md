# Temporary Seed Miner Report: ice_slide_escape

Status: heuristic mined evidence. These are not accepted levels, slots, or quality verdicts.
Score note: ranking scores are search preferences, not mechanism quality judgments.
Maturity: curated_miner.


## Run

- Generated at: 2026-07-01T00:34:12.250Z
- Seed: 677703113
- Preset: deep
- Iterations: 400
- Search space: ice_slide_escape curated miner v4: expanded row witnesses, 2D capsule rooms with distinct exits, and design-surface ranking hints
- Budgets: maxStates=12000, maxDepth=100, graphMaxStates=12000, maxInstances=3000
- Filters: minScore=5, maxFindings=30
- Objective: cli_weights
- Objective weights: heterogeneous_push_roles=120, mixed_mechanic_chain=120, two_dimensional_structure=50, multi_push_chain=80, pass_through_d5=60, destroy_moving_ice_d3=50, rebound_d4=50, destroy_group_d6_plus=20, row_probe=-80

## Stats

- Generated: 400
- Solve instances: 2295
- Full analyses: 167
- Prefiltered unsolved: 2128
- Invalid: 0
- Unsolved: 2128
- Solved: 167
- Complete graph: 126
- Complete agency: 126
- Kept before limit: 95
- Kept: 30

## Tag Counts

- boundary_disappear: 16
- branching_win_dag: 20
- destroy_group_d6_plus: 5
- destroy_moving_ice_d3: 4
- distinct_edge_goal: 30
- heterogeneous_push_roles: 26
- ice_blocks_ice_no_chain_push: 19
- mixed_mechanic_chain: 17
- multi_push_chain: 30
- pass_through_d5: 2
- push_ice: 30
- rebound_d4: 30
- restart_after_group: 1
- short_stop_d1_d2: 9
- two_dimensional_structure: 30

## Findings

### MF_0235_s10_0_g9_6: rankingPriorScore 581

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=235
- Score breakdown: base=101, objective=480, final=581, objective=cli_weights
- Solve instance: s10_0_g9_6, start=[10, 0], goal=[9, 6]
- Tags: push_ice, short_stop_d1_d2, rebound_d4, pass_through_d5, restart_after_group, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, heterogeneous_push_roles
- Solution: cost=19, explored=265
- Inputs: down left left left left left down down left down right up right right right right down down down
- Events: walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk
- Event counts: walk=17, push_ice=2, ice_blocks_ice_no_chain_push=1, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_stop_short:d1=1, ice_rebound_d4=1
- Graph: status=complete, states=546, transitions=1288, wins=2
- SCC: shape=one_win_continuation_per_scc, count=15, irreversible=1, forcedPrefix=1
- Initial SCC: states=3, out=1, winOut=1, deadOut=0
- Win DAG: branching=0, merging=0

Layout:

```text
##########@#
#.I.....I..#
#.###.######
#..........#
####.I..G.##
#...I...#..#
#########.##
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
##########S#
#.I.....I..#
#.###.######
#..........#
####.I..G.##
#...I...#..#
#########X##
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, short_stop_d1_d2, rebound_d4, pass_through_d5, restart_after_group, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0103_s2_0_g8_5: rankingPriorScore 571

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=103
- Score breakdown: base=101, objective=470, final=571, objective=cli_weights
- Solve instance: s2_0_g8_5, start=[2, 0], goal=[8, 5]
- Tags: push_ice, destroy_moving_ice_d3, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=25, explored=1905
- Inputs: down down down right down down right right right up up left left left left left down right down right right right right right right
- Events: walk walk walk walk walk walk walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_boundary_disappear:d1 walk
- Event counts: walk=22, push_ice=3, ice_destroyed_d3=1, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=1, ice_boundary_disappear:d1=1
- Graph: status=complete, states=2607, transitions=8247, wins=2
- SCC: shape=branching_win_dag, count=71, irreversible=2, forcedPrefix=0
- Initial SCC: states=32, out=6, winOut=2, deadOut=4
- Win DAG: branching=3, merging=4

Layout:

```text
##@######
#.......#
#........
#.......#
#.I..GII#
##.....I.
#########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
##S######
#.......#
#........
#.......#
#.I..GII#
##.....IX
#########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, destroy_moving_ice_d3, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0343_s10_3_g4_0: rankingPriorScore 564

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=343
- Score breakdown: base=94, objective=470, final=564, objective=cli_weights
- Solve instance: s10_3_g4_0, start=[10, 3], goal=[4, 0]
- Tags: push_ice, destroy_moving_ice_d3, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=13, explored=490
- Inputs: left left left left left left left up left up right right up
- Events: walk walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk
- Event counts: walk=11, push_ice=2, ice_destroyed_d3=1, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=1
- Graph: status=complete, states=5763, transitions=17192, wins=28
- SCC: shape=branching_win_dag, count=166, irreversible=2, forcedPrefix=0
- Initial SCC: states=23, out=7, winOut=4, deadOut=3
- Win DAG: branching=7, merging=18

Layout:

```text
####.######
#..I..G.I.#
#...#......
##...I....@
#...I......
###########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
####X######
#..I..G.I.#
#...#......
##...I....S
#...I......
###########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, destroy_moving_ice_d3, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0223_s8_4_g0_5: rankingPriorScore 556

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=223
- Score breakdown: base=116, objective=440, final=556, objective=cli_weights
- Solve instance: s8_4_g0_5, start=[8, 4], goal=[0, 5]
- Tags: push_ice, short_stop_d1_d2, rebound_d4, destroy_group_d6_plus, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=33, explored=2044
- Inputs: left left up up right down left left left left left up right right right right up right down down right down left left left left left left left left down right left
- Events: walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk
- Event counts: walk=27, push_ice=6, ice_stop_short:d2=2, ice_rebound_d4=2, ice_stop_short:d1=1, ice_blocks_ice_no_chain_push=1, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1
- Graph: status=complete, states=2125, transitions=6482, wins=1
- SCC: shape=branching_win_dag, count=60, irreversible=6, forcedPrefix=0
- Initial SCC: states=34, out=7, winOut=2, deadOut=5
- Win DAG: branching=1, merging=1

Layout:

```text
#######.#
#........
#..I....#
##.....I.
#.......@
.I..G.#.#
#########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
#######.#
#........
#..I....#
##.....I.
#.......S
XI..G.#.#
#########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, short_stop_d1_d2, rebound_d4, destroy_group_d6_plus, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0139_s5_0_g0_4: rankingPriorScore 552

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=139
- Score breakdown: base=112, objective=440, final=552, objective=cli_weights
- Solve instance: s5_0_g0_4, start=[5, 0], goal=[0, 4]
- Tags: push_ice, short_stop_d1_d2, rebound_d4, destroy_group_d6_plus, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=31, explored=2054
- Inputs: down right right right right down up left left left left left down down left down right right right up right right down left left left left left left left left
- Events: walk walk walk push_ice ice_stop_short:d2 walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk
- Event counts: walk=27, push_ice=4, ice_stop_short:d2=2, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=1, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1
- Graph: status=complete, states=2547, transitions=7083, wins=5
- SCC: shape=branching_win_dag, count=79, irreversible=4, forcedPrefix=0
- Initial SCC: states=34, out=7, winOut=2, deadOut=5
- Win DAG: branching=4, merging=6

Layout:

```text
#####@######
#..#....I..#
.....#...I.#
#.#..#.....#
#...I.....##
############
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
#####S######
#..#....I..#
.....#...I.#
#.#..#.....#
X...I.....##
############
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, short_stop_d1_d2, rebound_d4, destroy_group_d6_plus, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0287_s6_0_g0_3: rankingPriorScore 551

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=287
- Score breakdown: base=81, objective=470, final=551, objective=cli_weights
- Solve instance: s6_0_g0_3, start=[6, 0], goal=[0, 3]
- Tags: push_ice, destroy_moving_ice_d3, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, heterogeneous_push_roles
- Solution: cost=13, explored=867
- Inputs: down left down left left down right up left left left down left
- Events: walk walk push_ice ice_destroyed_d3 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk
- Event counts: walk=11, push_ice=2, ice_destroyed_d3=1, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=1
- Graph: status=complete, states=2580, transitions=6772, wins=15
- SCC: shape=one_win_continuation_per_scc, count=69, irreversible=1, forcedPrefix=0
- Initial SCC: states=56, out=7, winOut=0, deadOut=0
- Win DAG: branching=0, merging=4

Layout:

```text
######@####
#..I.....I#
#....I...##
..#.I..G.I#
#####.#####
#...#.....#
###########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
######S####
#..I.....I#
#....I...##
X.#.I..G.I#
#####.#####
#...#.....#
###########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, destroy_moving_ice_d3, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0191_s2_6_g11_5: rankingPriorScore 548

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=191
- Score breakdown: base=78, objective=470, final=548, objective=cli_weights
- Solve instance: s2_6_g11_5, start=[2, 6], goal=[11, 5]
- Tags: push_ice, destroy_moving_ice_d3, rebound_d4, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=20, explored=508
- Inputs: up right right right up right up up left left down right down down right right right right right right
- Events: walk walk push_ice ice_boundary_disappear:d7 walk walk walk walk walk push_ice ice_destroyed_d3 walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk
- Event counts: walk=17, push_ice=3, ice_boundary_disappear:d7=1, ice_destroyed_d3=1, ice_rebound_d4=1
- Graph: status=complete, states=1161, transitions=3130, wins=5
- SCC: shape=branching_win_dag, count=30, irreversible=3, forcedPrefix=1
- Initial SCC: states=6, out=1, winOut=1, deadOut=0
- Win DAG: branching=1, merging=1

Layout:

```text
############
#..........#
##...I.....#
#.#..I..G.##
#.###..#####
#...I.......
##@#########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
############
#..........#
##...I.....#
#.#..I..G.##
#.###..#####
#...I......X
##S#########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, destroy_moving_ice_d3, rebound_d4, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0047_s8_6_g0_1: rankingPriorScore 548

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=47
- Score breakdown: base=108, objective=440, final=548, objective=cli_weights
- Solve instance: s8_6_g0_1, start=[8, 6], goal=[0, 1]
- Tags: push_ice, short_stop_d1_d2, rebound_d4, destroy_group_d6_plus, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=31, explored=3632
- Inputs: up left up up left up up left left left left down right right right right right right right right up left left left left left left left left left left
- Events: walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroy_group_d6_plus:len2 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk
- Event counts: walk=28, push_ice=3, ice_rebound_d4=1, ice_stop_short:d1=1, ice_blocks_ice_no_chain_push=1, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear_after_group=1
- Graph: status=complete, states=4144, transitions=11286, wins=1
- SCC: shape=branching_win_dag, count=100, irreversible=3, forcedPrefix=0
- Initial SCC: states=40, out=8, winOut=2, deadOut=6
- Win DAG: branching=2, merging=2

Layout:

```text
############
#.I......I.#
#..........#
##.G..I....#
####.#..####
#.....#....#
##.#####@###
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
############
X.I......I.#
#..........#
##.G..I....#
####.#..####
#.....#....#
##.#####S###
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, short_stop_d1_d2, rebound_d4, destroy_group_d6_plus, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0279_s9_5_g2_5: rankingPriorScore 545

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=279
- Score breakdown: base=65, objective=480, final=545, objective=cli_weights
- Solve instance: s9_5_g2_5, start=[9, 5], goal=[2, 5]
- Tags: push_ice, rebound_d4, pass_through_d5, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=13, explored=401
- Inputs: up left left left left up right down left left left left down
- Events: walk walk push_ice ice_pass_through_d5:len2 ice_boundary_disappear_after_group walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk
- Event counts: walk=11, push_ice=2, ice_pass_through_d5:len2=1, ice_boundary_disappear_after_group=1, ice_rebound_d4=1
- Graph: status=complete, states=1224, transitions=3276, wins=4
- SCC: shape=branching_win_dag, count=37, irreversible=2, forcedPrefix=0
- Initial SCC: states=21, out=5, winOut=4, deadOut=1
- Win DAG: branching=2, merging=6

Layout:

```text
############
#..........#
#######...I.
#.....I..G.#
##.....I...#
##.######@##
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
############
#..........#
#######...I.
#.....I..G.#
##.....I...#
##X######S##
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, pass_through_d5, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0175_s5_0_g0_5: rankingPriorScore 544

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=175
- Score breakdown: base=104, objective=440, final=544, objective=cli_weights
- Solve instance: s5_0_g0_5, start=[5, 0], goal=[0, 5]
- Tags: push_ice, short_stop_d1_d2, rebound_d4, destroy_group_d6_plus, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=24, explored=785
- Inputs: down down left left left up right down down down right right right right right down left left left left left left left left
- Events: walk walk walk push_ice ice_stop_short:d2 walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk
- Event counts: walk=21, push_ice=3, ice_stop_short:d2=1, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=1, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1
- Graph: status=complete, states=1207, transitions=3197, wins=3
- SCC: shape=branching_win_dag, count=40, irreversible=3, forcedPrefix=0
- Initial SCC: states=8, out=2, winOut=2, deadOut=0
- Win DAG: branching=7, merging=8

Layout:

```text
#####@####
#..I..G.I#
#..I...#.#
#.#.######
#........#
#......I.#
#####.####
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
#####S####
#..I..G.I#
#..I...#.#
#.#.######
#........#
X......I.#
#####.####
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, short_stop_d1_d2, rebound_d4, destroy_group_d6_plus, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0138_s8_0_g0_2: rankingPriorScore 535

- Source: ice_mechanic_probe_prior_v1/icebacked_capsule_room, seed=677703113, index=138
- Score breakdown: base=115, objective=420, final=535, objective=cli_weights
- Solve instance: s8_0_g0_2, start=[8, 0], goal=[0, 2]
- Tags: push_ice, short_stop_d1_d2, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=24, explored=4486
- Inputs: down down down left up up left left left left down down down left left up right down right up left left up left
- Events: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk push_ice ice_boundary_disappear:d1 walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk push_ice ice_stop_short:d2 walk walk walk walk
- Event counts: walk=18, push_ice=6, ice_blocks_ice_no_chain_push=4, ice_rebound_d4=2, ice_stop_short:d1=2, ice_boundary_disappear:d1=1, ice_stop_short:d2=1
- Graph: status=complete, states=11570, transitions=32782, wins=3
- SCC: shape=branching_win_dag, count=318, irreversible=6, forcedPrefix=0
- Initial SCC: states=33, out=7, winOut=4, deadOut=3
- Win DAG: branching=9, merging=10

Layout:

```text
#######.@#.#
#I.G..I.....
..#.#......#
#.I.G..I...#
.I...##....#
############
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
#######.S#.#
#I.G..I.....
X.#.#......#
#.I.G..I...#
.I...##....#
############
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, short_stop_d1_d2, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0045_s0_1_g2_5: rankingPriorScore 533

- Source: ice_mechanic_probe_prior_v1/d3_d4_pressure_room, seed=677703113, index=45
- Score breakdown: base=113, objective=420, final=533, objective=cli_weights
- Solve instance: s0_1_g2_5, start=[0, 1], goal=[2, 5]
- Tags: push_ice, short_stop_d1_d2, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=12, explored=771
- Inputs: right right right down left left down left down right right down
- Events: walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk push_ice ice_boundary_disappear:d2 walk push_ice ice_stop_short:d1 walk walk push_ice ice_rebound_d4 walk walk
- Event counts: walk=8, push_ice=4, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=2, ice_boundary_disappear:d2=1, ice_stop_short:d1=1
- Graph: status=complete, states=2772, transitions=7964, wins=4
- SCC: shape=branching_win_dag, count=107, irreversible=4, forcedPrefix=0
- Initial SCC: states=30, out=7, winOut=3, deadOut=4
- Win DAG: branching=15, merging=18

Layout:

```text
##########
@..I..G.I#
..I...#..#
.I...#...#
....G.#..#
##.#######
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
##########
S..I..G.I#
..I...#..#
.I...#...#
....G.#..#
##X#######
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, short_stop_d1_d2, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0334_s8_5_g5_0: rankingPriorScore 518

- Source: ice_mechanic_probe_prior_v1/icebacked_capsule_room, seed=677703113, index=334
- Score breakdown: base=98, objective=420, final=518, objective=cli_weights
- Solve instance: s8_5_g5_0, start=[8, 5], goal=[5, 0]
- Tags: push_ice, short_stop_d1_d2, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=14, explored=631
- Inputs: left left left left left left up up right up right right up up
- Events: walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk push_ice ice_stop_short:d2 walk walk
- Event counts: walk=12, push_ice=2, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=1, ice_stop_short:d2=1
- Graph: status=complete, states=8384, transitions=22156, wins=4
- SCC: shape=branching_win_dag, count=258, irreversible=1, forcedPrefix=0
- Initial SCC: states=60, out=9, winOut=3, deadOut=6
- Win DAG: branching=3, merging=4

Layout:

```text
#####.#I#
#.......#
##...I.G#
##.I..G.I
#..####.#
#.......@
#######.#
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
#####X#I#
#.......#
##...I.G#
##.I..G.I
#..####.#
#.......S
#######.#
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, short_stop_d1_d2, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0030_s6_0_g0_3: rankingPriorScore 514

- Source: ice_mechanic_probe_prior_v1/icebacked_capsule_room, seed=677703113, index=30
- Score breakdown: base=94, objective=420, final=514, objective=cli_weights
- Solve instance: s6_0_g0_3, start=[6, 0], goal=[0, 3]
- Tags: push_ice, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=21, explored=1721
- Inputs: down left left down down down right right up left left up left left left up right down left down left
- Events: walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk push_ice ice_boundary_disappear:d1 walk push_ice ice_rebound_d4 walk walk walk push_ice ice_boundary_disappear:d0
- Event counts: walk=17, push_ice=4, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=2, ice_boundary_disappear:d1=1, ice_boundary_disappear:d0=1
- Graph: status=complete, states=7691, transitions=22192, wins=3
- SCC: shape=branching_win_dag, count=335, irreversible=3, forcedPrefix=0
- Initial SCC: states=40, out=11, winOut=2, deadOut=9
- Win DAG: branching=5, merging=4

Layout:

```text
######@#
#.I..G.#
.I...###
I.G..I.#
.......#
########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
######S#
#.I..G.#
.I...###
X.G..I.#
.......#
########
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

### MF_0311_s7_6_g0_3: rankingPriorScore 510

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=311
- Score breakdown: base=90, objective=420, final=510, objective=cli_weights
- Solve instance: s7_6_g0_3, start=[7, 6], goal=[0, 3]
- Tags: push_ice, short_stop_d1_d2, rebound_d4, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=12, explored=472
- Inputs: up up left left left left left left left up right left
- Events: walk push_ice ice_stop_short:d1 walk walk walk walk walk walk push_ice ice_boundary_disappear:d0 walk push_ice ice_rebound_d4 walk
- Event counts: walk=9, push_ice=3, ice_stop_short:d1=1, ice_boundary_disappear:d0=1, ice_rebound_d4=1
- Graph: status=complete, states=4621, transitions=12602, wins=15
- SCC: shape=branching_win_dag, count=159, irreversible=3, forcedPrefix=0
- Initial SCC: states=25, out=9, winOut=6, deadOut=3
- Win DAG: branching=22, merging=36

Layout:

```text
####.####
#....#..#
#..##.###
.I..G.#.#
I......I.
#....I..#
#####.#@#
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
####.####
#....#..#
#..##.###
XI..G.#.#
I......I.
#....I..#
#####.#S#
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, short_stop_d1_d2, rebound_d4, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0059_s0_1_g9_2: rankingPriorScore 507

- Source: ice_mechanic_probe_prior_v1/long_branch_inspiration_room, seed=677703113, index=59
- Score breakdown: base=67, objective=440, final=507, objective=cli_weights
- Solve instance: s0_1_g9_2, start=[0, 1], goal=[9, 2]
- Tags: push_ice, rebound_d4, destroy_group_d6_plus, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=12, explored=1106
- Inputs: right down right down right up right right right right right right
- Events: walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk
- Event counts: walk=10, push_ice=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_rebound_d4=1
- Graph: status=complete, states=7449, transitions=22248, wins=3
- SCC: shape=branching_win_dag, count=265, irreversible=2, forcedPrefix=0
- Initial SCC: states=27, out=10, winOut=4, deadOut=6
- Win DAG: branching=5, merging=6

Layout:

```text
#####.####
@........#
#.I......#
#..I..G.##
##...I.#.#
##########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
#####.####
S........#
#.I......X
#..I..G.##
##...I.#.#
##########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, rebound_d4, destroy_group_d6_plus, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0136_s4_0_g0_2: rankingPriorScore 501

- Source: ice_mechanic_probe_prior_v1/dual_d4_capsule_room, seed=677703113, index=136
- Score breakdown: base=81, objective=420, final=501, objective=cli_weights
- Solve instance: s4_0_g0_2, start=[4, 0], goal=[0, 2]
- Tags: push_ice, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, heterogeneous_push_roles
- Solution: cost=16, explored=2391
- Inputs: down right right down left down down left left left left up right left up left
- Events: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_boundary_disappear:d0
- Event counts: walk=13, push_ice=3, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=2, ice_boundary_disappear:d0=1
- Graph: status=complete, states=6544, transitions=18723, wins=1
- SCC: shape=one_win_continuation_per_scc, count=234, irreversible=1, forcedPrefix=1
- Initial SCC: states=88, out=12, winOut=1, deadOut=11
- Win DAG: branching=0, merging=0

Layout:

```text
####@###
#.##...#
I.G..I.#
#.I..G.#
#......#
##.#####
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
####S###
#.##...#
X.G..I.#
#.I..G.#
#......#
##.#####
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, rebound_d4, boundary_disappear, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, mixed_mechanic_chain, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0206_s0_3_g9_3: rankingPriorScore 383

- Source: ice_mechanic_probe_prior_v1/icebacked_capsule_room, seed=677703113, index=206
- Score breakdown: base=83, objective=300, final=383, objective=cli_weights
- Solve instance: s0_3_g9_3, start=[0, 3], goal=[9, 3]
- Tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=19, explored=1298
- Inputs: right down right right right up right right right up up left right down right right down left right
- Events: walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk
- Event counts: walk=16, push_ice=3, ice_rebound_d4=3, ice_blocks_ice_no_chain_push=2
- Graph: status=complete, states=6678, transitions=17598, wins=9
- SCC: shape=branching_win_dag, count=317, irreversible=3, forcedPrefix=1
- Initial SCC: states=6, out=2, winOut=1, deadOut=1
- Win DAG: branching=8, merging=15

Layout:

```text
##########
#I.G..I..#
#######...
@..I.G..I.
#...I....#
##########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
##########
#I.G..I..#
#######...
S..I.G..IX
#...I....#
##########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0300_s5_5_g5_0: rankingPriorScore 375

- Source: ice_mechanic_probe_prior_v1/dual_d4_capsule_room, seed=677703113, index=300
- Score breakdown: base=75, objective=300, final=375, objective=cli_weights
- Solve instance: s5_5_g5_0, start=[5, 5], goal=[5, 0]
- Tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=13, explored=436
- Inputs: up right right right right up left left left up left up up
- Events: walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk
- Event counts: walk=11, push_ice=2, ice_rebound_d4=2, ice_blocks_ice_no_chain_push=1
- Graph: status=complete, states=5932, transitions=15690, wins=1
- SCC: shape=branching_win_dag, count=178, irreversible=2, forcedPrefix=0
- Initial SCC: states=33, out=6, winOut=2, deadOut=4
- Win DAG: branching=1, merging=1

Layout:

```text
#####.######
#..#.......#
I.G..I.#####
#..#.G..I..#
#..#.......#
#####@######
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
#####X######
#..#.......#
I.G..I.#####
#..#.G..I..#
#..#.......#
#####S######
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0044_s5_6_g9_4: rankingPriorScore 375

- Source: ice_mechanic_probe_prior_v1/dual_d4_capsule_room, seed=677703113, index=44
- Score breakdown: base=75, objective=300, final=375, objective=cli_weights
- Solve instance: s5_6_g9_4, start=[5, 6], goal=[9, 4]
- Tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=16, explored=578
- Inputs: up up right right up up left right down down down left up right right right
- Events: walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk
- Event counts: walk=14, push_ice=2, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=2
- Graph: status=complete, states=4802, transitions=12690, wins=3
- SCC: shape=branching_win_dag, count=146, irreversible=2, forcedPrefix=0
- Initial SCC: states=33, out=6, winOut=2, deadOut=4
- Win DAG: branching=2, merging=1

Layout:

```text
##########
#...#.#..#
#I.G..I..#
#..##.#..#
#..#......
##.G..I..#
####.@####
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
##########
#...#.#..#
#I.G..I..#
#..##.#..#
#..#.....X
##.G..I..#
####.S####
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0074_s7_4_g1_6: rankingPriorScore 375

- Source: ice_mechanic_probe_prior_v1/icebacked_capsule_room, seed=677703113, index=74
- Score breakdown: base=75, objective=300, final=375, objective=cli_weights
- Solve instance: s7_4_g1_6, start=[7, 4], goal=[1, 6]
- Tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=22, explored=716
- Inputs: left left up up left left left left up right down right right right down down down left left left left down
- Events: walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=20, push_ice=2, ice_rebound_d4=2, ice_blocks_ice_no_chain_push=1
- Graph: status=complete, states=2235, transitions=5948, wins=2
- SCC: shape=branching_win_dag, count=76, irreversible=1, forcedPrefix=0
- Initial SCC: states=56, out=7, winOut=2, deadOut=5
- Win DAG: branching=1, merging=1

Layout:

```text
########
#.I..G.I
#......#
#####..#
#.G..I.@
.......#
#.###.##
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
########
#.I..G.I
#......#
#####..#
#.G..I.S
.......#
#X###.##
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0328_s3_0_g8_1: rankingPriorScore 366

- Source: ice_mechanic_probe_prior_v1/dual_d4_capsule_room, seed=677703113, index=328
- Score breakdown: base=66, objective=300, final=366, objective=cli_weights
- Solve instance: s3_0_g8_1, start=[3, 0], goal=[8, 1]
- Tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, heterogeneous_push_roles
- Solution: cost=20, explored=858
- Inputs: down down left left down right right down right right right right down left up up up up right right
- Events: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk
- Event counts: walk=18, push_ice=2, ice_rebound_d4=2, ice_blocks_ice_no_chain_push=1
- Graph: status=complete, states=1742, transitions=5197, wins=1
- SCC: shape=one_win_continuation_per_scc, count=51, irreversible=1, forcedPrefix=1
- Initial SCC: states=64, out=6, winOut=1, deadOut=5
- Win DAG: branching=0, merging=0

Layout:

```text
###@#####
#........
#.......#
#.I..G.##
#.#.....#
#I.G..I.#
#########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
###S#####
#.......X
#.......#
#.I..G.##
#.#.....#
#I.G..I.#
#########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0296_s11_3_g6_6: rankingPriorScore 366

- Source: ice_mechanic_probe_prior_v1/dual_d4_capsule_room, seed=677703113, index=296
- Score breakdown: base=66, objective=300, final=366, objective=cli_weights
- Solve instance: s11_3_g6_6, start=[11, 3], goal=[6, 6]
- Tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, heterogeneous_push_roles
- Solution: cost=22, explored=2059
- Inputs: left left left left left left left left left left up right up right right down down down down right right down
- Events: walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk
- Event counts: walk=20, push_ice=2, ice_rebound_d4=2, ice_blocks_ice_no_chain_push=1
- Graph: status=complete, states=5681, transitions=17901, wins=2
- SCC: shape=one_win_continuation_per_scc, count=103, irreversible=1, forcedPrefix=1
- Initial SCC: states=96, out=9, winOut=1, deadOut=8
- Win DAG: branching=0, merging=0

Layout:

```text
############
#...I..G.I..
#.I..G.###..
#..........@
#..........#
#..........#
######.#####
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
############
#...I..G.I..
#.I..G.###..
#..........S
#..........#
#..........#
######X#####
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, ice_blocks_ice_no_chain_push, two_dimensional_structure, distinct_edge_goal, multi_push_chain, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0377_s7_0_g10_4: rankingPriorScore 363

- Source: ice_mechanic_probe_prior_v1/d3_d4_pressure_room, seed=677703113, index=377
- Score breakdown: base=63, objective=300, final=363, objective=cli_weights
- Solve instance: s7_0_g10_4, start=[7, 0], goal=[10, 4]
- Tags: push_ice, rebound_d4, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=11, explored=243
- Inputs: down down down left right down left right right right right
- Events: walk walk walk push_ice ice_rebound_d4 walk push_ice ice_boundary_disappear:d1 push_ice ice_rebound_d4 walk walk walk walk
- Event counts: walk=8, push_ice=3, ice_rebound_d4=2, ice_boundary_disappear:d1=1
- Graph: status=complete, states=1342, transitions=3293, wins=2
- SCC: shape=branching_win_dag, count=48, irreversible=3, forcedPrefix=0
- Initial SCC: states=15, out=3, winOut=3, deadOut=0
- Win DAG: branching=7, merging=7

Layout:

```text
####..#@###
#...I.....#
####.##.###
##.G..I...#
##.G..II...
#######.###
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
####..#S###
#...I.....#
####.##.###
##.G..I...#
##.G..II..X
#######.###
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0105_s7_2_g0_1: rankingPriorScore 353

- Source: ice_mechanic_probe_prior_v1/d3_d4_pressure_room, seed=677703113, index=105
- Score breakdown: base=53, objective=300, final=353, objective=cli_weights
- Solve instance: s7_2_g0_1, start=[7, 2], goal=[0, 1]
- Tags: push_ice, rebound_d4, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles
- Solution: cost=8, explored=110
- Inputs: left left up left left left left left
- Events: walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_boundary_disappear:d1 walk
- Event counts: walk=6, push_ice=2, ice_rebound_d4=1, ice_boundary_disappear:d1=1
- Graph: status=complete, states=1062, transitions=3044, wins=2
- SCC: shape=branching_win_dag, count=44, irreversible=2, forcedPrefix=0
- Initial SCC: states=20, out=6, winOut=3, deadOut=3
- Win DAG: branching=4, merging=4

Layout:

```text
####.###
.I....##
#.G..I.@
#......#
.I#...I.
########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
####.###
XI....##
#.G..I.S
#......#
.I#...I.
########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Observed miner tags: push_ice, rebound_d4, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, branching_win_dag, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Branching win DAG: check whether the branch is real player choice or just harmless order freedom.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0221_s11_4_g2_5: rankingPriorScore 340

- Source: ice_mechanic_probe_prior_v1/d3_d4_pressure_room, seed=677703113, index=221
- Score breakdown: base=40, objective=300, final=340, objective=cli_weights
- Solve instance: s11_4_g2_5, start=[11, 4], goal=[2, 5]
- Tags: push_ice, rebound_d4, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, heterogeneous_push_roles
- Solution: cost=20, explored=256
- Inputs: left up left up up right right down left down left left left left left left down left left down
- Events: walk walk walk walk walk push_ice ice_boundary_disappear:d1 walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=18, push_ice=2, ice_boundary_disappear:d1=1, ice_rebound_d4=1
- Graph: status=complete, states=267, transitions=751, wins=1
- SCC: shape=one_win_continuation_per_scc, count=9, irreversible=2, forcedPrefix=2
- Initial SCC: states=27, out=2, winOut=1, deadOut=1
- Win DAG: branching=0, merging=0

Layout:

```text
############
#.....#...I.
######.G..I.
#..........#
#....I#....@
##.#########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
############
#.....#...I.
######.G..I.
#..........#
#....I#....S
##X#########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, boundary_disappear, two_dimensional_structure, distinct_edge_goal, multi_push_chain, heterogeneous_push_roles.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
- Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.

### MF_0076_s0_2_g2_6: rankingPriorScore 223

- Source: ice_mechanic_probe_prior_v1/dual_d4_capsule_room, seed=677703113, index=76
- Score breakdown: base=43, objective=180, final=223, objective=cli_weights
- Solve instance: s0_2_g2_6, start=[0, 2], goal=[2, 6]
- Tags: push_ice, rebound_d4, two_dimensional_structure, distinct_edge_goal, multi_push_chain
- Solution: cost=14, explored=173
- Inputs: right up right right right left down down right down down left left down
- Events: walk walk walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk
- Event counts: walk=12, push_ice=2, ice_rebound_d4=2
- Graph: status=complete, states=605, transitions=1713, wins=1
- SCC: shape=one_win_continuation_per_scc, count=16, irreversible=1, forcedPrefix=1
- Initial SCC: states=62, out=3, winOut=1, deadOut=2
- Win DAG: branching=0, merging=0

Layout:

```text
###########
#...I..G.##
@...#######
###.I..G.##
#.........#
#.........#
##.########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
###########
#...I..G.##
S...#######
###.I..G.##
#.........#
#.........#
##X########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, two_dimensional_structure, distinct_edge_goal, multi_push_chain.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.

### MF_0364_s0_4_g8_5: rankingPriorScore 223

- Source: ice_mechanic_probe_prior_v1/dual_d4_capsule_room, seed=677703113, index=364
- Score breakdown: base=43, objective=180, final=223, objective=cli_weights
- Solve instance: s0_4_g8_5, start=[0, 4], goal=[8, 5]
- Tags: push_ice, rebound_d4, two_dimensional_structure, distinct_edge_goal, multi_push_chain
- Solution: cost=15, explored=461
- Inputs: up right up right right right up right down down right down right right down
- Events: walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk
- Event counts: walk=13, push_ice=2, ice_rebound_d4=2
- Graph: status=complete, states=1839, transitions=5329, wins=1
- SCC: shape=one_win_continuation_per_scc, count=44, irreversible=1, forcedPrefix=1
- Initial SCC: states=68, out=4, winOut=1, deadOut=3
- Win DAG: branching=0, merging=0

Layout:

```text
###########
#..#.I..G.#
#..I..G.#.#
..........#
@....#....#
########.##
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
###########
#..#.I..G.#
#..I..G.#.#
..........#
S....#....#
########X##
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, two_dimensional_structure, distinct_edge_goal, multi_push_chain.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.

### MF_0168_s10_1_g1_5: rankingPriorScore 223

- Source: ice_mechanic_probe_prior_v1/dual_d4_capsule_room, seed=677703113, index=168
- Score breakdown: base=43, objective=180, final=223, objective=cli_weights
- Solve instance: s10_1_g1_5, start=[10, 1], goal=[1, 5]
- Tags: push_ice, rebound_d4, two_dimensional_structure, distinct_edge_goal, multi_push_chain
- Solution: cost=17, explored=1391
- Inputs: left left left left left left down right down left down right left left left left down
- Events: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk
- Event counts: walk=15, push_ice=2, ice_rebound_d4=2
- Graph: status=complete, states=6201, transitions=18689, wins=1
- SCC: shape=one_win_continuation_per_scc, count=161, irreversible=1, forcedPrefix=1
- Initial SCC: states=72, out=8, winOut=1, deadOut=7
- Win DAG: branching=0, merging=0

Layout:

```text
########.##
#.........@
#..#.I..G.#
#.........#
#....I..G.#
#.#########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
########.##
#.........S
#..#.I..G.#
#.........#
#....I..G.#
#X#########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, two_dimensional_structure, distinct_edge_goal, multi_push_chain.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.

### MF_0392_s0_1_g8_4: rankingPriorScore 223

- Source: ice_mechanic_probe_prior_v1/dual_d4_capsule_room, seed=677703113, index=392
- Score breakdown: base=43, objective=180, final=223, objective=cli_weights
- Solve instance: s0_1_g8_4, start=[0, 1], goal=[8, 4]
- Tags: push_ice, rebound_d4, two_dimensional_structure, distinct_edge_goal, multi_push_chain
- Solution: cost=17, explored=2111
- Inputs: right down down right right up up right right right down left down down right right right
- Events: walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk
- Event counts: walk=15, push_ice=2, ice_rebound_d4=2
- Graph: status=complete, states=4338, transitions=13641, wins=1
- SCC: shape=one_win_continuation_per_scc, count=115, irreversible=1, forcedPrefix=1
- Initial SCC: states=68, out=9, winOut=1, deadOut=8
- Win DAG: branching=0, merging=0

Layout:

```text
#########
@.......#
#.G..I.##
#..I..G.#
#........
#.......#
#########
```

带起终点标记的布局（S=玩家起点，X=玩家终点，B=起终点同格；原始物件以 Layout 为准）:

```text
#########
S.......#
#.G..I.##
#..I..G.#
#.......X
#.......#
#########
```

Object participation:

- none

Review notes:

- Curated miner finding. Use as designer-review evidence only, not as accepted level material.
- Preferred explicit start/goal pair from the ice sampler profile.
- Observed miner tags: push_ice, rebound_d4, two_dimensional_structure, distinct_edge_goal, multi_push_chain.
- Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.
- 2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.
- Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.
