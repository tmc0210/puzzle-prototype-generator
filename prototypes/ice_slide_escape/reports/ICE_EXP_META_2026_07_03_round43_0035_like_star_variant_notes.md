# ICE_EXP_META_2026_07_03_round43_0035_like_star_variant

Designer-side variant note. This is not a fresh candidate packet and should not be
submitted as the current round's reviewer-facing solution.

## Layout

```text
###########
#....#....#
#.#..#....#
#.*..I.####
#I..I....##
#.#####.###
```

Interfaces:

- base: A=[1,5] -> B=[7,5]
- meta: C=[7,5] -> D=[10,4]

Lineage:

- Derived from the ICE_CAND_0035 soft patch geometry.
- The former bare target is filled initially as `*`.

## Evidence Summary

Base flow:

- `layout_analysis_ICE_EXP_META_2026_07_03_round43_0035_like_star_variant_base`
- shortest solution cost 8
- events: `ice_destroyed_d3`, `ice_rebound_d4`, `ice_stop_short:d1`
- graph complete: 3783 reachable states, 14 wins
- early-knowledge gate passed for no d5/restart/d6 reachable events
- d4 is present on the returned shortest solution, but not required for every
  winning path; a cost-10 winning path avoids `ice_rebound_d4`

Meta flow:

- `layout_analysis_ICE_EXP_META_2026_07_03_round43_0035_like_star_variant_meta`
- shortest solution cost 22
- key events: `ice_blocks_ice_no_chain_push`, `ice_boundary_disappear:d1`,
  `ice_destroy_group_d6_plus:len2`
- graph complete: 9948 reachable states, 10 wins
- required-d6 gate passed: no winning path was found without
  `ice_destroy_group_d6_plus`

## Reading

As a variant, this has a decent 0035-like feel: base is immediate and compact,
while meta re-enters the same small patch and uses a stronger full-knowledge
operation to open the right edge. It preserves a little of 0035's "old exit
becomes later instrument" texture without expanding into the L-ladder family.

The weaker part is that the filled target is not the clean causal center of the
variant. The base route is still statically shaped by the other initial ice,
and the base solution has a non-d4 bypass. That makes it useful as an archive
variant or teaching curiosity, but not as the current strict meta-first
submission.

## Recommendation

Keep as a side variant if preserving a `0035-like, target-filled` version is
valuable. Do not promote it as the current main candidate unless it is rebuilt
so the filled target is the actual route blocker and the base reading is less
bypassable.
