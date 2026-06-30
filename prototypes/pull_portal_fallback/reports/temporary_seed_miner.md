# Temporary Seed Miner Report: pull_portal_fallback

Status: raw mined evidence. These are not accepted levels, slots, or quality verdicts.

## Run

- Generated at: 2026-06-27T20:56:54.236Z
- Seed: 18422
- Iterations: 40
- Search space: mixed small-board probes with scatter, pull-biased, fallback-biased, and multi-pair-biased candidates
- Budgets: maxStates=25000, maxDepth=90, graphMaxStates=25000
- Filters: minScore=15, maxFindings=8

## Stats

- Generated: 40
- Invalid: 0
- Unsolved: 2
- Solved: 36
- Complete graph: 34
- Complete agency: 34
- Kept before limit: 27
- Kept: 8

## Tag Counts

- branching_win_dag: 6
- crate_blocks_exit: 1
- fallback_push: 4
- mixed_events: 7
- multi_instance_participation: 2
- multi_irreversible_chain: 2
- normal_teleport: 4
- open_initial_scc: 8
- portal_blocks_exit: 2
- pull: 3

## Findings

### MF_0022: score 81

- Source: scatter, seed=18422, index=22
- Tags: pull, normal_teleport, fallback_push, crate_blocks_exit, multi_instance_participation, open_initial_scc, mixed_events
- Solution: cost=8, explored=41
- Inputs: down down left left left up left down
- Events: walk walk walk walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B portal_enter:A portal_teleport:A->B pull_crate:crate#1 walk
- Event counts: walk=5, portal_enter:B=1, portal_exit_blocked:B->A=1, portal_exit_blocked_by_crate:crate#1=1, portal_fallback_push:B=1, portal_enter:A=1, portal_teleport:A->B=1, pull_crate:crate#1=1
- Graph: status=complete, states=1832, transitions=4218, wins=98
- SCC: shape=one_win_continuation_per_scc, count=66, irreversible=1, forcedPrefix=0
- Initial SCC: states=80, out=18, winOut=0, deadOut=0
- Win DAG: branching=0, merging=28

Layout:

```text
#########
#....#@.#
#..CAC..#
#G.B....#
#########
```

Object participation:

- crate/blocked_portal_exit via portal_exit_blocked_by_crate: distinct=1, instances=crate#1
- crate/moved via pull_crate: distinct=1, instances=crate#1
- portal/entered via portal_enter: distinct=2, instances=A, B
- portal/moved via portal_fallback_push: distinct=1, instances=B

Interpretation prompts:

- Rewrite as a seed / combination / insight before using it in any slot.
- Inspect whether the fallback state change is later consumed or merely witnessed.
- Potential seed-combination material: normal transport and fallback exception both appear.
- Potential multi-instance material: check whether distinct instances are coupled or just repeated.

### MF_0029: score 77

- Source: scatter, seed=18422, index=29
- Tags: pull, normal_teleport, multi_instance_participation, branching_win_dag, multi_irreversible_chain, open_initial_scc, mixed_events
- Solution: cost=11, explored=43
- Inputs: down down left down down right down down left up right
- Events: walk walk portal_enter:D portal_teleport:D->E pull_crate:crate#2 pull_crate:crate#2 portal_enter:D portal_teleport:D->E walk walk portal_enter:D portal_teleport:D->E pull_crate:crate#2 pull_crate:crate#1
- Event counts: walk=4, portal_enter:D=3, portal_teleport:D->E=3, pull_crate:crate#2=3, pull_crate:crate#1=1
- Graph: status=complete, states=1499, transitions=3067, wins=86
- SCC: shape=branching_win_dag, count=213, irreversible=4, forcedPrefix=2
- Initial SCC: states=11, out=1, winOut=1, deadOut=0
- Win DAG: branching=24, merging=30

Layout:

```text
#######
#CCGAB#
##.E@.#
#.....#
##.D..#
#######
```

Object participation:

- crate/moved via pull_crate: distinct=2, instances=crate#1, crate#2
- portal/entered via portal_enter: distinct=1, instances=D

Interpretation prompts:

- Rewrite as a seed / combination / insight before using it in any slot.
- Potential multi-instance material: check whether distinct instances are coupled or just repeated.
- SCC win DAG has local ordering freedom; inspect whether that freedom is meaningful.

### MF_0006: score 56

- Source: two_pair_gate, seed=18422, index=6
- Tags: fallback_push, portal_blocks_exit, branching_win_dag, open_initial_scc, mixed_events
- Solution: cost=3, explored=15
- Inputs: left left down
- Events: portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:E portal_fallback_push:A walk walk
- Event counts: portal_enter:A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_portal:E=1, portal_fallback_push:A=1, walk=2
- Graph: status=complete, states=13379, transitions=36033, wins=698
- SCC: shape=branching_win_dag, count=573, irreversible=1, forcedPrefix=0
- Initial SCC: states=18, out=3, winOut=0, deadOut=0
- Win DAG: branching=6, merging=263

Layout:

```text
########
#......#
#.D.A@.#
##EBG#.#
#......#
########
```

Object participation:

- portal/entered via portal_enter: distinct=1, instances=A
- portal/moved via portal_fallback_push: distinct=1, instances=A

Interpretation prompts:

- Rewrite as a seed / combination / insight before using it in any slot.
- Inspect whether the fallback state change is later consumed or merely witnessed.
- SCC win DAG has local ordering freedom; inspect whether that freedom is meaningful.

### MF_0007: score 56

- Source: two_pair_gate, seed=18422, index=7
- Tags: fallback_push, portal_blocks_exit, branching_win_dag, open_initial_scc, mixed_events
- Solution: cost=3, explored=15
- Inputs: right right down
- Events: portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:E portal_fallback_push:A walk walk
- Event counts: portal_enter:A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_portal:E=1, portal_fallback_push:A=1, walk=2
- Graph: status=complete, states=13890, transitions=36360, wins=777
- SCC: shape=branching_win_dag, count=670, irreversible=1, forcedPrefix=0
- Initial SCC: states=17, out=3, winOut=0, deadOut=0
- Win DAG: branching=4, merging=324

Layout:

```text
########
##.....#
#.@A.D.#
#.#GBE##
#......#
########
```

Object participation:

- portal/entered via portal_enter: distinct=1, instances=A
- portal/moved via portal_fallback_push: distinct=1, instances=A

Interpretation prompts:

- Rewrite as a seed / combination / insight before using it in any slot.
- Inspect whether the fallback state change is later consumed or merely witnessed.
- SCC win DAG has local ordering freedom; inspect whether that freedom is meaningful.

### MF_0031: score 47

- Source: fallback_gate, seed=18422, index=31
- Tags: normal_teleport, branching_win_dag, open_initial_scc, mixed_events
- Solution: cost=5, explored=13
- Inputs: up right down left up
- Events: walk walk portal_enter:A portal_teleport:A->B walk walk
- Event counts: walk=4, portal_enter:A=1, portal_teleport:A->B=1
- Graph: status=complete, states=1295, transitions=2899, wins=65
- SCC: shape=branching_win_dag, count=82, irreversible=0, forcedPrefix=0
- Initial SCC: states=12, out=2, winOut=0, deadOut=0
- Win DAG: branching=9, merging=31

Layout:

```text
#######
#....E#
#.@AC.#
#.#GB##
#.D...#
#######
```

Object participation:

- portal/entered via portal_enter: distinct=1, instances=A

Interpretation prompts:

- Rewrite as a seed / combination / insight before using it in any slot.
- SCC win DAG has local ordering freedom; inspect whether that freedom is meaningful.

### MF_0023: score 46

- Source: scatter, seed=18422, index=23
- Tags: pull, branching_win_dag, multi_irreversible_chain, open_initial_scc
- Solution: cost=4, explored=22
- Inputs: down left down left
- Events: walk walk walk pull_crate:crate#1
- Event counts: walk=3, pull_crate:crate#1=1
- Graph: status=complete, states=1017, transitions=2341, wins=19
- SCC: shape=branching_win_dag, count=50, irreversible=2, forcedPrefix=0
- Initial SCC: states=13, out=3, winOut=2, deadOut=1
- Win DAG: branching=3, merging=3

Layout:

```text
######
#....#
#..#.#
#..@.#
#A..##
#G.C##
##CB.#
######
```

Object participation:

- crate/moved via pull_crate: distinct=1, instances=crate#1

Interpretation prompts:

- Rewrite as a seed / combination / insight before using it in any slot.
- SCC win DAG has local ordering freedom; inspect whether that freedom is meaningful.

### MF_0033: score 46

- Source: scatter, seed=18422, index=33
- Tags: normal_teleport, branching_win_dag, open_initial_scc, mixed_events
- Solution: cost=4, explored=13
- Inputs: up right down down
- Events: walk portal_enter:B portal_teleport:B->A walk walk
- Event counts: walk=3, portal_enter:B=1, portal_teleport:B->A=1
- Graph: status=complete, states=3608, transitions=8212, wins=276
- SCC: shape=branching_win_dag, count=257, irreversible=0, forcedPrefix=0
- Initial SCC: states=56, out=3, winOut=0, deadOut=0
- Win DAG: branching=27, merging=83

Layout:

```text
########
#.##CA.#
#E.B...#
#.@C..G#
#..D#..#
########
```

Object participation:

- portal/entered via portal_enter: distinct=1, instances=B

Interpretation prompts:

- Rewrite as a seed / combination / insight before using it in any slot.
- SCC win DAG has local ordering freedom; inspect whether that freedom is meaningful.

### MF_0003: score 43

- Source: fallback_gate, seed=18422, index=3
- Tags: fallback_push, open_initial_scc, mixed_events
- Solution: cost=3, explored=15
- Inputs: left left up
- Events: portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk walk
- Event counts: portal_enter:A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_wall=1, portal_fallback_push:A=1, walk=2
- Graph: status=complete, states=2391, transitions=5608, wins=117
- SCC: shape=one_win_continuation_per_scc, count=77, irreversible=1, forcedPrefix=0
- Initial SCC: states=29, out=2, winOut=0, deadOut=0
- Win DAG: branching=0, merging=24

Layout:

```text
#######
#...C.#
##BG#.#
#..A@.#
#.....#
#######
```

Object participation:

- portal/entered via portal_enter: distinct=1, instances=A
- portal/moved via portal_fallback_push: distinct=1, instances=A

Interpretation prompts:

- Rewrite as a seed / combination / insight before using it in any slot.
- Inspect whether the fallback state change is later consumed or merely witnessed.
