# Candle Sokoban Prototype Notes

Question: does the runtime state and settlement order remain correct when driven
through the retained ASCII conformance probes?

Verdict: mechanically verified; campaign and human playtest not started.

2026-07-23 design correction: burn progress belongs to one board-level
countdown, not individual candles. The runtime state now stores
`globalBurnCycle` and `globalBurnCountdown`; the seven probes cover countdown
progress without fire and simultaneous shortening of multiple lit candles.

Keep only validated rule and state-model decisions when this throwaway prototype
is deleted or absorbed.
