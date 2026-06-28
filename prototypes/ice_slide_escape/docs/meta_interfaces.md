# Ice Slide Escape Meta Interfaces

Status: future-facing design note. This is not part of the current single-level
runtime implementation.

`ice_slide_escape` is currently designed and verified one rectangular level at a
time. The long-term project may connect many rectangular levels into one large
map. In that larger structure, edge cells become interfaces between levels.

This document records that future direction so single-level designers can leave
useful hooks without changing the current runtime rules.

## Current Scope

Current implementation scope:

```yaml
implemented_now:
  - single rectangular level runtime
  - single-level solver instances
  - explicit edge start and explicit edge goal per solve request
  - designer evidence for one level at a time

not_implemented_now:
  - cross-level movement
  - global overworld state
  - routing between multiple rectangles
  - correspondence rules between two connected level edges
  - persistent multi-level target state
```

The single-level solver still receives one concrete start and one concrete goal
for each solve request. However, the level itself does not own a single fixed
start or a single fixed exit. Tools may enumerate many `(edge_start, edge_goal)`
pairs and report them as separate problem instances.

## Long-Term Big-Map Model

The future big map is expected to be made from multiple rectangular levels.
Level edges may connect to corresponding positions in neighboring levels.

Conceptually:

```text
Level A right edge cell (x=max, y=k)
connects to
Level B left edge cell (x=0, y=k)
```

The exact coordinate mapping, persistence model, and global routing rules are
future scope. Current documents should not invent those details.

The intended high-level behavior is:

```yaml
future_cross_level_transition:
  precondition:
    - current_level_targets_are_satisfied
    - player_attempts_to_move_outward_from_an_edge_cell
    - connected_destination_cell_exists
    - connected_destination_cell_is_empty_or_otherwise_enterable
  effect:
    - player_enters_connected_level_at_corresponding_edge_position
```

Hidden routes may also exist when an edge wall is destroyed by ice before the
player reaches that edge.

## Edge Interface Types

An edge interface is an edge cell that may matter for future cross-level
composition.

Recommended labels:

```yaml
edge_interface_types:
  obvious_exit:
    meaning: visible or clearly guided route for the normal solution

  optional_exit:
    meaning: additional reachable edge route that gives a distinct valid solve

  hidden_destructible_exit:
    meaning: edge wall or blocked edge route that can be opened by ice destruction

  return_only_entry:
    meaning: not reachable from the current level's normal start, but useful as
      a future entry when the player arrives from another connected level
```

These labels are designer-facing claims. They are not new runtime objects.

## Meta Interface Pass

After a normal single-level candidate already works, a designer may run a
meta-interface pass.

The pass asks:

```text
1. Which edge cells are already meaningful exits?
2. Which edge walls could be opened by the existing ice-destruction rules?
3. Which edge cells could be made empty without breaking the original solution?
4. Which edge cells are unreachable from the current start, but could make good
   return-only entries from another level?
5. Which modifications create extra solutions, and are those solutions
   interesting rather than bypasses?
```

For each proposed interface, record:

```yaml
meta_interface_candidate:
  cell: [x, y]
  type: obvious_exit | optional_exit | hidden_destructible_exit | return_only_entry
  expected_access:
    from_current_level: reachable | unreachable | requires_target_completion | requires_ice_destruction
    from_connected_level: unknown | intended_future_entry
  evidence:
    preserves_original_solution: true | false | unknown
    adds_distinct_solution: true | false | unknown
    creates_bypass: true | false | unknown
  notes: string
```

## Composition Opportunities

Useful meta-interface patterns include:

```yaml
patterns:
  preserve_main_route_add_hidden_exit:
    description: keep the normal start/exit solve, but add an edge wall that can
      be destroyed only by a later or harder route.

  unreachable_return_entry:
    description: leave an edge cell unreachable from the normal start so another
      level can later send the player back into this map at a new position.

  multi_exit_difficulty_split:
    description: allow several exits from one solved level, with each exit
      requiring a meaningfully different route or difficulty.

  retrofit_existing_level:
    description: take a finished conventional level and test small edge edits
      that create future interfaces while preserving the accepted solution.
```

The designer must not assume that every extra edge route is good. A route that
skips the intended target/ice interaction is a bypass unless the level's role is
explicitly revised.

## Solver And Review Expectations

For current tools, meta-interface exploration should be represented as multiple
single-level solve instances:

```yaml
solve_instances:
  - start: [0, 2]
    goal: [8, 2]
    claim: normal_route
  - start: [0, 2]
    goal: [4, 0]
    claim: optional_exit
  - start: [8, 4]
    goal: [8, 2]
    claim: return_route_from_future_level
```

Each instance keeps its own evidence. Do not combine them into one "any edge"
solve proof.

Reviewer questions:

```text
- Does the interface preserve the original accepted solution?
- Does it add a distinct solution, and is that solution desirable?
- Does it allow the player to ignore the core target/ice obligation?
- If the interface is return-only, is it actually unreachable from the current
  ordinary start?
- If the interface is hidden/destructible, does ice destruction meaningfully
  enable it instead of making it incidental?
```

