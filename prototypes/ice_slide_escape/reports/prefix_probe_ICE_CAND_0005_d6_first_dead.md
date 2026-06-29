# Prefix Probe: ICE_CAND_0005 d6-first dead commitment

Status: local runtime prefix probe. This is not a separate solve instance because
the post-prefix player position is not an edge start. It is evidence for the
designer's claim that pushing the visible main ice before the setup ice loses
the target-covering resource.

## Setup

Base solve instance:

```yaml
player_start: [0, 2]
player_goal: [9, 0]
win_condition: ice_slide_escape_explicit_goal
```

Base layout:

```text
#########.####
#########.####
@I......##.GG#
.###########.#
.#############
.###########.#
.###########.#
.###########.#
.###########.#
.###########.#
.###########I#
.............#
##############
```

Prefix tested:

```text
right
```

## Runtime Result

The prefix is legal.

```text
events: push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_destroyed_d3
```

Rendered state after prefix:

```text
#########.####
#########.####
.@.........GG#
.###########.#
.#############
.###########.#
.###########.#
.###########.#
.###########.#
.###########.#
.###########I#
.............#
##############
```

The main ice is destroyed by the post-restart distance-3 branch before either
target is covered.

## Solver Continuation

Continuation search from the post-prefix runtime state:

```yaml
found: false
exploredStates: 78
searchStatus: complete
reason: search complete
```

## Evidence Boundary

This probe supports the local claim that the visible d6-first commitment is
dead. It does not prove player psychology or all object-specific necessity
beyond this prefix.
