# Slot Viability Review 01

Purpose: screen the current `level_specs_v2` slots before running another full design + analyzer + multi-agent review loop.

Conclusion: the early mechanic -> player model -> level spec chain is too loose. Many slots are not independent lesson goals; they are alternate names for object roles already consumed by stronger accepted candidates.

## Accepted / Strong Anchors

Current anchors that should be treated as already consuming several old slots:

- `dry_v2_s01_pull_path_discovery`: pull is necessary to clear/traverse a path.
- `dry_v2_s02_portal_discovery`: portal transport into a separated goal region.
- `dry_v2_s03_side_switch_application`: pull + normal portal side-switch application.
- `stress_v3_same_knowledge_distinct_application`: pull + portal routing in a distinct chain.
- `stress_v3_distinct_medium_combination`: construct remote blocker with C, then exploit fallback to move A as the door to G.
- `dry_v2_s07_reuse_fallback_challenge`: fallback changes the later C-pulling lane; strong advanced combination/challenge.
- `stress_v3_advanced_variant_hard_chain`: repeated fallback pushes and portal movement, but kept as advanced variant because of large state graph and many win states.

## Slot Screening

| Slot | Current Reading | Viability For Next Full Loop |
| --- | --- | --- |
| LS01_pull_discovery | Basic fact / discovery. Covered by S01. | Not useful now. |
| LS02_reposition_crate | Basic pull application. Mostly covered by S01/S03. | Too small unless rebuilding early campaign. |
| LS03_clear_choke | Pull opens path / bottleneck. Covered by S01 shape. | Not useful now. |
| LS04_clear_choke_pattern | Pattern version of LS03. | Collapses into LS03/S01. |
| LS05_portal_pair | Basic portal fact. | Too small. |
| LS06_normal_teleport | Basic portal transport. Covered by S02. | Too small. |
| LS07_sealed_region_transport | Portal into separated region. Covered by S02. | Not independent. |
| LS08_sealed_region_pattern | Pattern version of LS07. | Collapses into S02. |
| LS10_blocked_exit_pushes_entrance | Fallback discovery / witness. | Useful only as fixture, not mainline application. |
| LS11_trigger_fallback | Current wording is too weak; can become witness. | Usable only if rewritten as active fallback application. |
| LS12_construct_blocked_exit | Construct remote blocker with crate. | Consumed by LS15/T03. |
| LS13_remote_blocker_controls_entry | Remote blocker controls entry behavior. | Consumed by LS15/T03. |
| LS14_remote_blocker_pattern | Pattern version of LS12/13. | Consumed by LS15/T03. |
| LS15_construct_then_exploit | Strongly covered by T03 and reviewed as acceptable. | Already accepted. |
| LS16_portal_as_key | A as movable door/key. | Consumed by T03; not independent. |
| LS17_repeated_portal_push | Repeated fallback movement. | Consumed by advanced hard-chain variant. |
| LS18_repeated_push_corridor | Pattern version of LS17. | Consumed by advanced hard-chain variant. |
| LS19_fallback_failure_prediction | Failure boundary / constraint. | Not a standalone mainline slot. Use only as embedded probe or constraint evidence. |
| LS20_push_until_jam | Repeated push plus later jam boundary. | Not clean for the next loop; boundary content should be embedded into a positive challenge, not taught alone. |

## Next Full Loop Candidate

No current `level_specs_v2` slot is cleanly recommended for the next full design loop.

A rewritten version of `LS11_trigger_fallback` is only a hypothesis, not a recommendation:

```text
LS11_active_fallback_application

Player already knows blocked-exit fallback exists.
The level asks the player to actively choose, arrange, or time a fallback push
so that moving the entrance portal changes reachability.
```

Why it was tempting:

- Existing fallback-only candidates mostly collapse into witness/discovery.
- Later accepted levels use fallback inside combinations, but the campaign still lacks a clean active application between discovery and combination.
- It is well suited for the multi-agent loop because reviewers can reject it if the event is merely forced.
- It can use standard `player_on_goal` win condition and normal analyzer evidence.

Why it may be invalid:

- Single-portal, single-fallback structures may not have enough design power to support a clean standalone application.
- If the only successful designs require crate construction, normal teleport routing, repeated fallback movement, or object-role reuse, then the level is already a combination or challenge.
- In that case, `blocked_exit_pushes_entrance` should have:

```yaml
role_viability:
  discovery: yes
  standalone_application: no/maybe
  combination: yes
  challenge_modifier: yes
```

Before attempting this slot, run a viability precheck:

```text
Can a single fallback use create a non-trivial player decision,
without relying on crate construction or a larger multi-mechanic chain?
```

If the answer is no, do not design the level.

Minimum design contract:

```text
required:
  - player_on_goal win condition
  - fallback event is on the winning path
  - fallback moves a portal
  - the moved portal position is later consumed as changed reachability
  - player has at least one plausible non-progressing alternative before the key fallback

forbidden:
  - event_occurs win condition
  - a one-corridor forced witness
  - merely adding walking distance around a witness
  - using crate construction as the main idea, because that belongs to LS15/T03
```

## Backup Slot

No backup slot from the current table is clean enough.

Reason:

- `LS16` is consumed by `LS15/T03`.
- `LS17/LS18` are consumed by the advanced hard-chain family.
- `LS19` is a boundary / constraint item, not a positive player capability that should receive a standalone teaching level.
- `LS20` may become a future challenge pattern, but only if the jam boundary is embedded in a positive goal-directed puzzle. It should not be selected as a clean next loop while the ontology is still unstable.
- `LS11` may also be invalid if single fallback cannot support standalone application.

Boundary constraints may still appear in evidence:

```text
allowed:
  - as a probe trace that explains why an attempted action fails
  - as a risk/constraint inside a larger positive puzzle
  - as reviewer material for fairness and legibility

forbidden:
  - as an event-win level
  - as the sole lesson goal of a mainline level
  - as a renamed "ability" that only means knowing what cannot happen
```

## Process Lesson

Do not let every named ability or pattern become a mainline slot.

Before designing a level for a slot, require:

```text
1. What new player action, structure, or causal dependency does this slot add?
2. Which accepted anchor would otherwise cover it?
3. Why is this not just a renamed object role from that anchor?
4. What would make a reviewer reject the role claim as witness or variant?
5. Is this a positive capability / structure, or only a boundary constraint?
```

If those questions cannot be answered, the slot should be merged, deferred, or converted into a variant tag.

## Practical Result

This prototype may have no remaining clean slot for a design-loop experiment.

That is useful evidence:

- The old level-spec table is over-specified.
- Several named slots are object-role aliases, not independent lesson goals.
- Some mechanisms do not support every role type.
- The next experiment should probably use a fresh mechanism set or explicitly test the ontology-repair process, not force another level out of this table.
