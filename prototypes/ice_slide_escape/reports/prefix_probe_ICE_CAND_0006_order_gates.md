# Prefix Probe: ICE_CAND_0006 order gates

Status: local runtime prefix probes. These are not separate solve instances
because some post-prefix player positions are not edge starts. They are local
evidence that the intended d4 -> d5 -> d6 stopper cascade has real order gates.

## Setup

Base solve instance:

```yaml
player_start: [0, 3]
player_goal: [9, 0]
win_condition: ice_slide_escape_explicit_goal
```

Base layout:

```text
#########.####
#######.I..G.#
.I......##GG##
@######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###I##
.######.###.##
.............#
##############
```

## Probe Results

### d6_first

Prefix:

```text
up right
```

Runtime result:

```yaml
legal: true
events:
  - walk
  - push_ice
  - ice_destroy_group_d6_plus:len2
  - slide_restart_after_group
  - ice_stop_short:d2
continuation_found: false
continuation_status: complete
continuation_explored: 601
continuation_reason: search complete
```

Rendered state after prefix:

```text
#########.####
#######.I..G.#
.@........G*##
.######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###I##
.######.###.##
.............#
##############
```

Interpretation: pushing the main d6 ice before building the [11,2] stopper
covers the wrong right target and leaves no complete continuation.

### d5_before_d4

Prefix:

```text
down down down down down down down down right right right right right right right right right right right up up
```

Runtime result:

```yaml
legal: true
events:
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - push_ice
  - ice_pass_through_d5:len1
  - slide_restart_after_group
  - ice_stop_short:d2
continuation_found: false
continuation_status: complete
continuation_explored: 494
continuation_reason: search complete
```

Rendered state after prefix:

```text
#########.####
#######.I..*.#
.I......##GG##
.######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###@##
.######.###.##
.............#
##############
```

Interpretation: without the d4-created [11,1] stopper, the d5 ice stops on
[11,1] instead of [11,2]. That consumes the same cell the upstream d4 step needs
as its final stopper/target, so the full target set cannot be completed.

### d4_then_d6_before_d5

Prefix:

```text
down down down down down down down down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down left left left left left left left up up up up up up up up up right
```

Runtime result:

```yaml
legal: true
events:
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - push_ice
  - ice_rebound_d4
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - push_ice
  - ice_destroy_group_d6_plus:len2
  - slide_restart_after_group
  - ice_stop_short:d2
continuation_found: false
continuation_status: complete
continuation_explored: 250
continuation_reason: search complete
```

Rendered state after prefix:

```text
#########.####
#######....*.#
.@........G*##
.######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###I##
.######.###.##
.............#
##############
```

Interpretation: the d4 stopper alone is insufficient. The d5-created [11,2]
stopper is the missing consumed state needed before the final d6 push.

## Evidence Boundary

These probes support local order-gate claims and the state-consumption reading
for the returned solution. They do not prove player psychology, aesthetic
quality, or an object-specific all-solution certificate beyond the tested
prefixes and complete continuation searches.
