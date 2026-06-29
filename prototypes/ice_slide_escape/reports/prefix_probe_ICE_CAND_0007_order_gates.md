# ICE_CAND_0007 order-gate prefix probes

Layout instance: start [0,10], goal [11,0]. Complete continuation searches use
maxStates=200000.

## d6_first

- Intended wrong order: push main ice before creating d4/d5 stoppers.
- Prefix inputs: up up up up up up up up right
- Prefix legal: true
- Prefix events: walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_pass_through_d5:len2 ice_boundary_disappear_after_group

Prefix state:

```text
###########.#####
#######....I..G.#
.@..........G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
................#
#################
#################
```

- Continuation found: no
- Search status: complete
- Explored states: 1202
- Reason: search complete

## d5_before_d4

- Intended wrong order: push vertical ice before the top d4 stopper exists.
- Prefix inputs: right right right right right right right right right right right right right right up
- Prefix legal: true
- Prefix events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2

Prefix state:

```text
###########.#####
#######....I..*.#
.I......##..G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######@##
................#
#################
#################
```

- Continuation found: no
- Search status: complete
- Explored states: 1302
- Reason: search complete

## d4_then_d6_before_d5

- Intended wrong order: create top d4 target ice, then push main ice before the d5-produced stopper exists.
- Prefix inputs: right right right right right right right up up up up up up up up up right right right right left left left left down down down down down down down down down left left left left left left left up up up up up up up up right
- Prefix legal: true
- Prefix events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_pass_through_d5:len2 ice_boundary_disappear_after_group

Prefix state:

```text
###########.#####
#######.......*.#
.@..........G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
................#
#################
#################
```

- Continuation found: no
- Search status: complete
- Explored states: 283
- Reason: search complete
