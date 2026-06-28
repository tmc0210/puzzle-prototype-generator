# Agency Calibration Report 01

Purpose: compare graph-derived agency facts against prior human puzzle-design judgments. This is calibration evidence, not a scoring formula.

## Overview

| Sample | Prior judgment | Graph size raw/scc | Win subgraph | Irrev steps | Forced win prefix | Initial out/win/dead | Win-branch SCCs | Tail | Reading hints |
| --- | --- | ---: | --- | ---: | --- | --- | ---: | ---: | --- |
| hard_chain_trim4 | Positive: compact hard-chain candidate; remove only obvious redundancy. | 1231/43 | branching_win_dag | 9 | 0/9 | 3/3/0 | 8 | 4 | 8 SCC(s) with multiple win continuations; 11 win-reaching merge SCC(s); 4 trailing step(s) after entering winning SCC |
| coupled_pull_d_blocks_b_trim1 | Positive/mixed: beautiful coupled chain, but player-facing agency may be low. | 100/12 | single_win_chain | 3 | 3/3 | 3/1/2 | 0 | 3 | single forced win-reaching irreversible chain; initial SCC has 2 irreversible dead branch(es); 3 trailing step(s) after entering winning SCC |
| two_crate_participation_candidate | Positive/mixed: strong structure; late pull tail may feel incidental. | 95/16 | branching_win_dag | 5 | 0/5 | 2/2/0 | 1 | 3 | 1 SCC(s) with multiple win continuations; 1 win-reaching merge SCC(s); 3 trailing step(s) after entering winning SCC |
| directional_pull_challenge | Positive: complex chain candidate with good structure. | 37/4 | single_win_chain | 3 | 3/3 | 1/1/0 | 0 | 5 | single forced win-reaching irreversible chain; 5 trailing step(s) after entering winning SCC |
| stress_v3_distinct_medium_combination_try3 | Mixed: useful combination candidate, but compare for reuse/linearity. | 45/9 | single_win_chain | 4 | 4/4 | 1/1/0 | 0 | 3 | single forced win-reaching irreversible chain; 3 trailing step(s) after entering winning SCC |
| two_crate_two_lock_chain_try3 | Negative/mixed: mechanically valid, but two locks are too independently repeated. | 64/7 | single_win_chain | 4 | 4/4 | 1/1/0 | 0 | 3 | single forced win-reaching irreversible chain; 3 trailing step(s) after entering winning SCC |
| stress_v3_true_fallback_application | Negative: reads more like discovery than application. | 14/2 | single_win_chain | 1 | 1/1 | 1/1/0 | 0 | 3 | near-discovery irreversible shape; single forced win-reaching irreversible chain; 3 trailing step(s) after entering winning SCC |

## Reading Hints

- Raw/SCC means reachable raw states versus strongly connected components.
- SCC edges are irreversible transitions between mutually reachable state regions.
- `single_win_chain` means the win-reaching SCC subgraph has exactly one win-reaching continuation at each solution SCC.
- `branching_win_dag` means at least one SCC has multiple win-reaching irreversible continuations or merge paths; this is evidence to inspect, not an automatic failure.
- Initial `out/win/dead` means irreversible exits from the initial SCC, exits that can still reach a win, and exits that cannot.
- Tail means inputs after first entering an SCC that already contains a winning state.
- The bidirectional commitment digest below is retained as auxiliary evidence; SCC rows are the primary graph view.

## Per-Sample Details

### hard_chain_trim4

- Prior judgment: Positive: compact hard-chain candidate; remove only obvious redundancy.
- Solver: solved cost=23
- Events: pull_crate:crate#1=4, walk=13, portal_enter:A=3, portal_exit_blocked:A->B=2, portal_exit_blocked_by_wall=2, portal_fallback_push:A=2, portal_enter:B=3, portal_exit_blocked:B->A=3, portal_exit_blocked_by_crate:crate#1=3, portal_fallback_push:B=3, portal_teleport:A->B=1
- SCC shape: 43 SCCs, 70 edges, branching_win_dag, irreversible steps=9
- SCC reading hints: 8 SCC(s) with multiple win continuations; 11 win-reaching merge SCC(s); 4 trailing step(s) after entering winning SCC

Layout:

```text
########
# A    #
#     B#
# @C## #
###### #
#####G #
########
```

SCC irreversible path:

| SCC | Step | Dist | States | Out/win/dead | Next | Forced win |
| --- | ---: | ---: | ---: | --- | --- | --- |
| s0 | 0 | 4 | 12 | 3/3/0 | s1 | no |
| s1 | 1 | 5 | 12 | 1/1/0 | s3 | yes |
| s3 | 4 | 4 | 12 | 2/2/0 | s11 | no |
| s11 | 7 | 3 | 36 | 4/4/0 | s14 | no |
| s14 | 8 | 5 | 8 | 2/1/1 | s15 | yes |
| s15 | 11 | 4 | 4 | 1/1/0 | s16 | yes |
| s16 | 12 | 3 | 3 | 1/1/0 | s17 | yes |
| s17 | 15 | 2 | 205 | 4/1/3 | s22 | yes |
| s22 | 17 | 1 | 220 | 7/4/3 | s28 | no |
| s28 | 19 | 0 | 47 | 2/0/0 | win/end | no |

Bidirectional commitment digest:

| After step | From -> To | Dist | Choices v/d/o | Reading |
| ---: | --- | ---: | --- | --- |
| 0 | r0 -> r1 | 5 | 3/0/1 | multiple viable choices |
| 3 | r1 -> r4 | 6 | 1/0/1 | forced optimal |
| 6 | r4 -> r8 | 5 | 2/0/1 | forced optimal |
| 7 | r8 -> r11 | 4 | 2/0/1 | multiple viable choices |
| 10 | r11 -> r18 | 5 | 1/1/1 | forced optimal |
| 11 | r18 -> r22 | 4 | 1/0/1 | forced optimal |
| 14 | r22 -> r28 | 3 | 1/0/1 | forced optimal |
| 16 | r28 -> r31 | 2 | 3/0/1 | forced optimal |
| 18 | r31 -> r36 | 1 | 3/0/1 | forced optimal |

### coupled_pull_d_blocks_b_trim1

- Prior judgment: Positive/mixed: beautiful coupled chain, but player-facing agency may be low.
- Solver: solved cost=15
- Events: pull_crate:crate#1=1, walk=10, portal_enter:E=1, portal_teleport:E->D=1, portal_enter:D=1, portal_exit_blocked:D->E=1, portal_exit_blocked_by_crate:crate#1=1, portal_fallback_push:D=1, portal_enter:B=1, portal_teleport:B->A=1, portal_enter:A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_portal:D=1, portal_fallback_push:A=1
- SCC shape: 12 SCCs, 12 edges, single_win_chain, irreversible steps=3
- SCC reading hints: single forced win-reaching irreversible chain; initial SCC has 2 irreversible dead branch(es); 3 trailing step(s) after entering winning SCC

Layout:

```text
############
###  #######
#G A #######
### ########
#  B###  ###
# D ###E@###
#  #####C###
############
```

SCC irreversible path:

| SCC | Step | Dist | States | Out/win/dead | Next | Forced win |
| --- | ---: | ---: | ---: | --- | --- | --- |
| s0 | 0 | 3 | 12 | 3/1/2 | s6 | yes |
| s6 | 1 | 2 | 11 | 3/1/2 | s7 | yes |
| s7 | 6 | 1 | 9 | 1/1/0 | s8 | yes |
| s8 | 12 | 0 | 6 | 0/0/0 | win/end | no |

Bidirectional commitment digest:

| After step | From -> To | Dist | Choices v/d/o | Reading |
| ---: | --- | ---: | --- | --- |
| 0 | r0 -> r1 | 3 | 1/2/1 | forced optimal |
| 5 | r1 -> r3 | 2 | 1/2/1 | forced optimal |
| 11 | r3 -> r8 | 1 | 1/0/1 | forced optimal |

### two_crate_participation_candidate

- Prior judgment: Positive/mixed: strong structure; late pull tail may feel incidental.
- Solver: solved cost=17
- Events: pull_crate:crate#1=1, walk=11, portal_enter:A=2, portal_teleport:A->B=1, pull_crate:crate#2=2, portal_enter:B=1, portal_teleport:B->A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_crate:crate#2=1, portal_fallback_push:A=1
- SCC shape: 16 SCCs, 16 edges, branching_win_dag, irreversible steps=5
- SCC reading hints: 1 SCC(s) with multiple win continuations; 1 win-reaching merge SCC(s); 3 trailing step(s) after entering winning SCC

Layout:

```text
#########
###    ##
#G AC@ ##
### #####
#  B#  ##
#    C ##
#########
```

SCC irreversible path:

| SCC | Step | Dist | States | Out/win/dead | Next | Forced win |
| --- | ---: | ---: | ---: | --- | --- | --- |
| s0 | 0 | 5 | 11 | 2/2/0 | s1 | no |
| s1 | 1 | 4 | 11 | 1/1/0 | s2 | yes |
| s2 | 7 | 3 | 1 | 1/1/0 | s7 | yes |
| s7 | 8 | 2 | 11 | 1/1/0 | s8 | yes |
| s8 | 9 | 1 | 10 | 2/1/1 | s13 | yes |
| s13 | 14 | 0 | 16 | 1/0/0 | win/end | no |

Bidirectional commitment digest:

| After step | From -> To | Dist | Choices v/d/o | Reading |
| ---: | --- | ---: | --- | --- |
| 0 | r0 -> r1 | 5 | 2/0/2 | multiple optimal choices |
| 6 | r1 -> r5 | 4 | 1/0/1 | forced optimal |
| 7 | r5 -> r7 | 3 | 1/0/1 | forced optimal |
| 8 | r7 -> r8 | 2 | 1/0/1 | forced optimal |
| 13 | r8 -> r10 | 1 | 1/1/1 | forced optimal |

### directional_pull_challenge

- Prior judgment: Positive: complex chain candidate with good structure.
- Solver: solved cost=18
- Events: walk=11, portal_enter:A=2, portal_teleport:A->B=2, portal_enter:B=2, portal_teleport:B->A=2, pull_crate:crate#1=3
- SCC shape: 4 SCCs, 3 edges, single_win_chain, irreversible steps=3
- SCC reading hints: single forced win-reaching irreversible chain; 5 trailing step(s) after entering winning SCC

Layout:

```text
###########
####  #####
####  #####
####  #  ##
##@ AC# B #
#### ###  #
####G######
###########
```

SCC irreversible path:

| SCC | Step | Dist | States | Out/win/dead | Next | Forced win |
| --- | ---: | ---: | ---: | --- | --- | --- |
| s0 | 0 | 3 | 11 | 1/1/0 | s1 | yes |
| s1 | 7 | 2 | 10 | 1/1/0 | s2 | yes |
| s2 | 8 | 1 | 10 | 1/1/0 | s3 | yes |
| s3 | 13 | 0 | 6 | 0/0/0 | win/end | no |

Bidirectional commitment digest:

| After step | From -> To | Dist | Choices v/d/o | Reading |
| ---: | --- | ---: | --- | --- |
| 6 | r0 -> r1 | 3 | 1/0/1 | forced optimal |
| 7 | r1 -> r2 | 2 | 1/0/1 | forced optimal |
| 12 | r2 -> r3 | 1 | 1/0/1 | forced optimal |

### stress_v3_distinct_medium_combination_try3

- Prior judgment: Mixed: useful combination candidate, but compare for reuse/linearity.
- Solver: solved cost=14
- Events: walk=9, portal_enter:A=2, portal_teleport:A->B=1, pull_crate:crate#1=2, portal_enter:B=1, portal_teleport:B->A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_crate:crate#1=1, portal_fallback_push:A=1
- SCC shape: 9 SCCs, 8 edges, single_win_chain, irreversible steps=4
- SCC reading hints: single forced win-reaching irreversible chain; 3 trailing step(s) after entering winning SCC

Layout:

```text
#########
###  ####
#G A@####
### #####
#  B#  ##
#    C ##
#########
```

SCC irreversible path:

| SCC | Step | Dist | States | Out/win/dead | Next | Forced win |
| --- | ---: | ---: | ---: | --- | --- | --- |
| s0 | 0 | 4 | 8 | 1/1/0 | s1 | yes |
| s1 | 4 | 3 | 1 | 1/1/0 | s2 | yes |
| s2 | 5 | 2 | 8 | 1/1/0 | s3 | yes |
| s3 | 6 | 1 | 7 | 2/1/1 | s8 | yes |
| s8 | 11 | 0 | 6 | 0/0/0 | win/end | no |

Bidirectional commitment digest:

| After step | From -> To | Dist | Choices v/d/o | Reading |
| ---: | --- | ---: | --- | --- |
| 3 | r0 -> r1 | 4 | 1/0/1 | forced optimal |
| 4 | r1 -> r2 | 3 | 1/0/1 | forced optimal |
| 5 | r2 -> r3 | 2 | 1/0/1 | forced optimal |
| 10 | r3 -> r5 | 1 | 1/1/1 | forced optimal |

### two_crate_two_lock_chain_try3

- Prior judgment: Negative/mixed: mechanically valid, but two locks are too independently repeated.
- Solver: solved cost=25
- Events: walk=17, portal_enter:D=2, portal_teleport:D->E=1, pull_crate:crate#2=1, portal_enter:E=1, portal_teleport:E->D=1, portal_exit_blocked:D->E=1, portal_exit_blocked_by_crate:crate#2=1, portal_fallback_push:D=1, portal_enter:A=2, portal_teleport:A->B=1, pull_crate:crate#1=1, portal_enter:B=1, portal_teleport:B->A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_crate:crate#1=1, portal_fallback_push:A=1
- SCC shape: 7 SCCs, 6 edges, single_win_chain, irreversible steps=4
- SCC reading hints: single forced win-reaching irreversible chain; 3 trailing step(s) after entering winning SCC

Layout:

```text
###########
###  ##  ##
#G A   D@##
### ### ###
#  B## E###
#   C#  C #
###########
```

SCC irreversible path:

| SCC | Step | Dist | States | Out/win/dead | Next | Forced win |
| --- | ---: | ---: | ---: | --- | --- | --- |
| s0 | 0 | 4 | 6 | 1/1/0 | s1 | yes |
| s1 | 4 | 3 | 5 | 1/1/0 | s2 | yes |
| s2 | 9 | 2 | 14 | 1/1/0 | s3 | yes |
| s3 | 17 | 1 | 13 | 2/1/1 | s6 | yes |
| s6 | 22 | 0 | 12 | 0/0/0 | win/end | no |

Bidirectional commitment digest:

| After step | From -> To | Dist | Choices v/d/o | Reading |
| ---: | --- | ---: | --- | --- |
| 3 | r0 -> r1 | 4 | 1/0/1 | forced optimal |
| 8 | r1 -> r2 | 3 | 1/0/1 | forced optimal |
| 16 | r2 -> r3 | 2 | 1/0/1 | forced optimal |
| 21 | r3 -> r5 | 1 | 1/1/1 | forced optimal |

### stress_v3_true_fallback_application

- Prior judgment: Negative: reads more like discovery than application.
- Solver: solved cost=7
- Events: walk=6, portal_enter:A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_wall=1, portal_fallback_push:A=1
- SCC shape: 2 SCCs, 1 edges, single_win_chain, irreversible steps=1
- SCC reading hints: near-discovery irreversible shape; single forced win-reaching irreversible chain; 3 trailing step(s) after entering winning SCC

Layout:

```text
#########
#@  #####
### ### #
#  A G ##
### ### #
#  B ####
#########
```

SCC irreversible path:

| SCC | Step | Dist | States | Out/win/dead | Next | Forced win |
| --- | ---: | ---: | ---: | --- | --- | --- |
| s0 | 0 | 1 | 4 | 1/1/0 | s1 | yes |
| s1 | 4 | 0 | 10 | 0/0/0 | win/end | no |

Bidirectional commitment digest:

| After step | From -> To | Dist | Choices v/d/o | Reading |
| ---: | --- | ---: | --- | --- |
| 3 | r0 -> r1 | 1 | 1/0/1 | forced optimal |
