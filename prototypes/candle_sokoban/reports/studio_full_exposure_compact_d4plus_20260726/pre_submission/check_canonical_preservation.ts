import fs from "node:fs";
import YAML from "yaml";
import {
  isCandleSearchTerminal,
  isWin,
  parseLevel,
  stateKey,
  step,
} from "../../../../../src/prototypes/candle_sokoban/mechanics.ts";

const taskRoot = "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726";
const baselineLayoutRef = `${taskRoot}/candidate/versions/CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_002/layout.txt`;
const replayRef = `${taskRoot}/candidate/versions/CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_002/evidence/canonical_replay.json`;
const variantsRef = `${taskRoot}/pre_submission/redundancy_checks/variants.json`;
const mechanic = YAML.parse(fs.readFileSync("prototypes/candle_sokoban/mechanic.yml", "utf8"));
const baselineLayout = fs.readFileSync(baselineLayoutRef, "utf8").trimEnd();
const replay = JSON.parse(fs.readFileSync(replayRef, "utf8"));
const variants = JSON.parse(fs.readFileSync(variantsRef, "utf8"));

function parse(id: string, layout: string): any {
  return parseLevel({ id, title: id, layout, win: { type: "all_braziers_lit" } } as any);
}

function normalizeTrimmedKey(key: string): string {
  return key.replace(/(\d+),(\d+)/g, (_, x, y) => `${Number(x) + 1},${y}`);
}

function eraseCandleFromKey(key: string, candleId: string): string {
  const [prefix, remainder] = key.split("|C:");
  const [candles, braziers] = remainder.split("|B:");
  const kept = candles.split("|").filter((entry) => !entry.startsWith(`${candleId}:`));
  return `${prefix}|C:${kept.join("|")}|B:${braziers}`;
}

function normalizeTrimmedEvents(events: string[]): string[] {
  return events.map((event) => event.replace(/(\d+),(\d+)/g, (_, x, y) => `${Number(x) + 1},${y}`));
}

const results = [];
for (const variant of variants.variants) {
  const layout = fs.readFileSync(variant.layout_ref, "utf8").trimEnd();
  let baseline = parse("baseline", baselineLayout);
  let mutated;
  let parseError = null;
  try {
    mutated = parse(variant.candidate_id, layout);
  } catch (error) {
    parseError = error instanceof Error ? error.message : String(error);
  }
  const stepChecks: any[] = [];
  let preserved = parseError === null;
  let failureReason = parseError ? `parser_rejected: ${parseError}` : null;
  if (mutated) {
    for (let index = 0; index < replay.inputs.length; index += 1) {
      const input = replay.inputs[index];
      if (isCandleSearchTerminal(mutated)) {
        preserved = false;
        failureReason = `mutated_terminal_before_step_${index + 1}`;
        break;
      }
      const baselineResult = step(mechanic, baseline, input);
      const mutatedResult = step(mechanic, mutated, input);
      const normalizedMutatedKey = mutatedResult.legal
        ? variant.coordinate_projection === "trim_left_x_plus_1_to_reviewed"
          ? normalizeTrimmedKey(stateKey(mutatedResult.state))
          : stateKey(mutatedResult.state)
        : null;
      let baselineKey = baselineResult.legal ? stateKey(baselineResult.state) : null;
      if (baselineKey && variant.kind === "whole_candle") {
        const candleId = variant.candidate_id.split(":")[1];
        baselineKey = eraseCandleFromKey(baselineKey, candleId);
      }
      const normalizedMutatedEvents = variant.coordinate_projection === "trim_left_x_plus_1_to_reviewed"
        ? normalizeTrimmedEvents(mutatedResult.events)
        : mutatedResult.events;
      const check = {
        step: index + 1,
        input,
        legal: mutatedResult.legal,
        events_equal: mutatedResult.legal && JSON.stringify(normalizedMutatedEvents) === JSON.stringify(baselineResult.events),
        state_equal_after_projection: mutatedResult.legal && normalizedMutatedKey === baselineKey,
        mutated_events: mutatedResult.events,
      };
      stepChecks.push(check);
      if (!mutatedResult.legal || !check.events_equal || !check.state_equal_after_projection) {
        preserved = false;
        failureReason = `canonical_diverged_at_step_${index + 1}`;
        break;
      }
      baseline = baselineResult.state;
      mutated = mutatedResult.state;
      if (index < replay.inputs.length - 1 && isWin(mutated)) {
        preserved = false;
        failureReason = `mutated_won_early_at_step_${index + 1}`;
        break;
      }
    }
  }
  const finalWin = mutated ? isWin(mutated) : false;
  if (preserved && !finalWin) {
    preserved = false;
    failureReason = "mutated_not_winning_after_canonical";
  }
  const result = {
    candidate_id: variant.candidate_id,
    operation: variant.operation,
    parse_error: parseError,
    canonical_preserved: preserved,
    failure_reason: failureReason,
    final_win: finalWin,
    checked_steps: stepChecks.length,
    step_checks: stepChecks,
  };
  results.push(result);
  fs.writeFileSync(`${variant.out_dir}/canonical_preservation.json`, `${JSON.stringify(result, null, 2)}\n`);
}

fs.writeFileSync(`${taskRoot}/pre_submission/redundancy_checks/canonical_preservation_summary.json`, `${JSON.stringify({ results }, null, 2)}\n`);
