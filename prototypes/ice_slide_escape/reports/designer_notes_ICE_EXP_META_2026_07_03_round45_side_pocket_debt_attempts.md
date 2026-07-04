# Designer Notes: round45 side-pocket debt attempts

```yaml
date: 2026-07-03
status: exploration_in_progress
purpose: revise round44 target-debt grammar so meta d6 is internal rather than a right-side external runway
```

## Starting Point

`round44_target_debt_cannon_v2` has a useful base grammar:

- left target debt
- right target debt
- lower-right d4 refill
- lower-left d4 refill

It was held because the meta entered through an external right-side d6 runway
and exited through the same bottom edge as base.

## Side-Pocket Direction

New direction:

- Let base keep the two-target debt chain.
- Add a side-pocket path so meta can start from the base exit and trigger d6
  from inside the same chamber.
- Aim for C=[10,10] -> D=[22,5], so the old base exit becomes a return entry
  and the meta opens a distinct right-edge exit.

## Scratch Results

### scratch_v1

```text
#######################
#######################
#######################
####..###.#############
####..###.#############
.....*...*...##........
####..###.#############
####..###...###########
####*I###I..###########
####.......############
##########.############
```

Result:

- base unsolved
- meta unsolved
- replay showed the new row-3 openings accidentally changed the original d4
  refills into d5 pass-through events.

### scratch_v2

```text
#######################
#######################
#######################
####.##################
####..###.#############
.....*...*...##........
####..###.#############
####..###...###########
####*I###I..###########
####.......############
##########.############
```

Result:

- base solved again with the same two-debt chain, cost 29
- meta C=[10,10] -> D=[22,5] unsolved
- event witness found an internal d6 path from the return entry, but the route
  consumes or strands refill resources before debts can be paid.

### scratch_v3

```text
#######################
#######################
#######################
####.##################
####..###.#############
.....*...*...##........
####..###..############
####..###...###########
####*I###I..###########
####.......############
##########.############
```

Result:

- base solved, cost 29
- meta still unsolved
- opening the narrow access toward [10,5] did not by itself make a payable
  return route
- event witness still finds internal d6:
  - C=[10,10] can reach a state where T2 is debt and T1 is fired right with
    `ice_destroy_group_d6_plus`
  - after d6, T1/T2 debts remain and refill resources are not in usable
    positions

## Current Lesson

The side-pocket line is closer to the desired aesthetic than v2 because d6 is
now generated inside the debt chamber. The next missing piece is a post-d6
refill source that is not consumed while preparing the d6 shot.

Do not submit these scratches. Continue by adding or repositioning a resource
whose only plausible role is to repay T1/T2 after the internal d6 shot.
