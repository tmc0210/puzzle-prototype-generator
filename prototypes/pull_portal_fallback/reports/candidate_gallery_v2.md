# Candidate Gallery V2: pull_portal_fallback

## Summary

- Candidates: 7
- Factories: fallback_push_gate, portal_bridge, pull_line
- Status: verified=7

## Structure Variants By Factory

### pull_line

- Candidates: 2
- Specs: LS01_pull_discovery, LS02_reposition_crate

#### LS01_pull_discovery (Pull Discovery)

- Candidate: C_LS01_pull_discovery_pull_line_001
- Motifs: pull_line

```text
#####
#C@G#
#####
#####
```

- Solution trace: 1.right [pull_crate]

#### LS02_reposition_crate (Reposition Crate By Pulling)

- Candidate: C_LS02_reposition_crate_pull_open_side_door_001
- Motifs: pull_line, opened_choke, side_bypass_after_pull

```text
#######
###G###
###C  #
###@  #
###   #
#######
```

- Solution trace: 1.down [pull_crate] -> 2.right [walk] -> 3.up [walk] -> 4.up [walk] -> 5.left [walk] -> 6.up [pull_crate]

### portal_bridge

- Candidates: 3
- Specs: LS05_portal_pair, LS06_normal_teleport, LS07_sealed_region_transport

#### LS05_portal_pair (Portal Pair)

- Candidate: C_LS05_portal_pair_portal_bridge_001
- Motifs: portal_bridge

```text
#######
#@A#BG#
#######
#######
```

- Solution trace: 1.right [portal_enter, portal_teleport]

#### LS06_normal_teleport (Normal Teleport)

- Candidate: C_LS06_normal_teleport_portal_bridge_001
- Motifs: portal_bridge

```text
#######
#@A#BG#
#######
#######
```

- Solution trace: 1.right [portal_enter, portal_teleport]

#### LS07_sealed_region_transport (Sealed Region Transport)

- Candidate: C_LS07_sealed_region_transport_sealed_region_transport_001
- Motifs: portal_bridge, sealed_region, post_teleport_navigation

```text
#########
#@A#    #
####  G #
#   B   #
#########
```

- Solution trace: 1.right [portal_enter, portal_teleport] -> 2.up [walk] -> 3.right [walk]

### fallback_push_gate

- Candidates: 2
- Specs: LS10_blocked_exit_pushes_entrance, LS11_trigger_fallback

#### LS10_blocked_exit_pushes_entrance (Blocked Exit Pushes Entrance)

- Candidate: C_LS10_blocked_exit_pushes_entrance_fallback_push_gate_001
- Motifs: fallback_push_gate

```text
#######
#   B #
# A G #
##@####
#######
```

- Solution trace: 1.up [portal_enter, portal_exit_blocked, portal_fallback_push] -> 2.up [walk] -> 3.right [walk] -> 4.right [walk]

#### LS11_trigger_fallback (Trigger Blocked Portal Fallback)

- Candidate: C_LS11_trigger_fallback_approach_and_trigger_fallback_001
- Motifs: fallback_push_gate, approach_from_trigger_side, opened_corridor

```text
#########
####B####
#### ####
####A G##
# @  ####
#########
```

- Solution trace: 1.right [walk] -> 2.right [walk] -> 3.up [portal_enter, portal_exit_blocked, portal_fallback_push] -> 4.up [walk] -> 5.right [walk] -> 6.right [walk]

## Candidates

### C_LS01_pull_discovery_pull_line_001

- Spec: LS01_pull_discovery (Pull Discovery)
- Status: verified
- Factory: pull_line
- Motifs: pull_line
- Seed: 1001

```text
#####
#C@G#
#####
#####
```

- Solution trace: 1.right [pull_crate]
- Probe trace: none
- Notes: Minimal pull witness: the player must move away from the crate onto the goal. generated checks: solution_events=pull_crate; probe_events=none; solver=found cost 1

### C_LS02_reposition_crate_pull_open_side_door_001

- Spec: LS02_reposition_crate (Reposition Crate By Pulling)
- Status: verified
- Factory: pull_line
- Motifs: pull_line, opened_choke, side_bypass_after_pull
- Seed: 1102

```text
#######
###G###
###C  #
###@  #
###   #
#######
```

- Solution trace: 1.down [pull_crate] -> 2.right [walk] -> 3.up [walk] -> 4.up [walk] -> 5.left [walk] -> 6.up [pull_crate]
- Probe trace: none
- Notes: Guided pull application: the crate starts on the only door to the goal; pulling it opens the door, and the player must route around the moved crate to use the opened path. generated checks: solution_events=pull_crate,walk,walk,walk,walk,pull_crate; probe_events=none; solver=found cost 6

### C_LS05_portal_pair_portal_bridge_001

- Spec: LS05_portal_pair (Portal Pair)
- Status: verified
- Factory: portal_bridge
- Motifs: portal_bridge
- Seed: 2001

```text
#######
#@A#BG#
#######
#######
```

- Solution trace: 1.right [portal_enter, portal_teleport]
- Probe trace: none
- Notes: Minimal portal bridge: the portal pair is the only connection to the goal cell. generated checks: solution_events=portal_enter,portal_teleport; probe_events=none; solver=found cost 1

### C_LS06_normal_teleport_portal_bridge_001

- Spec: LS06_normal_teleport (Normal Teleport)
- Status: verified
- Factory: portal_bridge
- Motifs: portal_bridge
- Seed: 2001

```text
#######
#@A#BG#
#######
#######
```

- Solution trace: 1.right [portal_enter, portal_teleport]
- Probe trace: none
- Notes: Minimal portal bridge: the portal pair is the only connection to the goal cell. generated checks: solution_events=portal_enter,portal_teleport; probe_events=none; solver=found cost 1

### C_LS07_sealed_region_transport_sealed_region_transport_001

- Spec: LS07_sealed_region_transport (Sealed Region Transport)
- Status: verified
- Factory: portal_bridge
- Motifs: portal_bridge, sealed_region, post_teleport_navigation
- Seed: 2107

```text
#########
#@A#    #
####  G #
#   B   #
#########
```

- Solution trace: 1.right [portal_enter, portal_teleport] -> 2.up [walk] -> 3.right [walk]
- Probe trace: none
- Notes: Guided portal application: the start and goal regions are separated by walls; the portal is the only transfer, and the player must navigate inside the target region after teleporting. generated checks: solution_events=portal_enter,portal_teleport,walk,walk; probe_events=none; solver=found cost 3

### C_LS10_blocked_exit_pushes_entrance_fallback_push_gate_001

- Spec: LS10_blocked_exit_pushes_entrance (Blocked Exit Pushes Entrance)
- Status: verified
- Factory: fallback_push_gate
- Motifs: fallback_push_gate
- Seed: 4001

```text
#######
#   B #
# A G #
##@####
#######
```

- Solution trace: 1.up [portal_enter, portal_exit_blocked, portal_fallback_push] -> 2.up [walk] -> 3.right [walk] -> 4.right [walk]
- Probe trace: none
- Notes: Fallback gate: the blocked paired exit pushes the entrance portal into an alcove, opening the path to the goal. generated checks: solution_events=portal_enter,portal_exit_blocked,portal_fallback_push,walk,walk,walk; probe_events=none; solver=found cost 4

### C_LS11_trigger_fallback_approach_and_trigger_fallback_001

- Spec: LS11_trigger_fallback (Trigger Blocked Portal Fallback)
- Status: verified
- Factory: fallback_push_gate
- Motifs: fallback_push_gate, approach_from_trigger_side, opened_corridor
- Seed: 4111

```text
#########
####B####
#### ####
####A G##
# @  ####
#########
```

- Solution trace: 1.right [walk] -> 2.right [walk] -> 3.up [portal_enter, portal_exit_blocked, portal_fallback_push] -> 4.up [walk] -> 5.right [walk] -> 6.right [walk]
- Probe trace: none
- Notes: Guided fallback application: the player must approach the entrance from the trigger side, push it into an alcove, then use the opened corridor to reach the goal. generated checks: solution_events=walk,walk,portal_enter,portal_exit_blocked,portal_fallback_push,walk,walk,walk; probe_events=none; solver=found cost 6

