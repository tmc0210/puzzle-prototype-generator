# Candle Sokoban

Status: throwaway logic prototype.

## Prototype question

Can one deterministic runtime state model faithfully express rigid candle
movement, per-small-step contact settlement, recursive fire transfer, one global
burn countdown, simultaneous shortening, death priority, and full-state undo while
remaining usable by the repository's generic solver, analyzer, editor, and
runtime-backed playable?

The runtime is authoritative. `levels.yml` contains diagnostic probes, not a
finished campaign.

## ASCII

```text
111r  candle#1, length 4, wick right, unlit
L222  candle#2, length 4, wick left, lit
```

The cap is the final candle body cell. The logical wick occupies the adjacent
cell in the cap direction and is not drawn separately. Digits `1` through `9`
identify different multi-cell candle bodies.

Each level may set `global_burn_cycle` (default `5`). The board owns one
`globalBurnCountdown`; every successful action advances it, even when no candle
is lit. When it advances from `1`, every candle that is lit after movement and
contact settlement shortens simultaneously, then the countdown resets. Igniting,
extinguishing, or reigniting a candle never changes the countdown.

## Run

```text
npm run candle:solve
npm run candle:conformance
npm run candle:playable:build
npm run candle:playable:serve
```

Then open `http://127.0.0.1:4173`.

## Tool status

```text
runtime adapter: implemented
ASCII parser / renderer: implemented
solver / graph / layout analyzer: implemented through generic runtime
runtime-backed playable: implemented through generic playable
probe seed suite: implemented
PuzzleScript exporter/checker: unavailable
temporary miner: unavailable
candidate seed factories: unavailable
```

Knowledge and curriculum files are schema-valid runtime-smoke placeholders only.
