import path from "node:path";
import { readFileSync } from "node:fs";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = readFileSync(path.resolve(process.argv[2]!), "utf8").trimEnd();
const actions = process.argv.slice(3);
let state = adapter.parseLevel({ id: "trace", title: "trace", layout, win: pkg.mechanic.win });
const rows: unknown[] = [{ step: 0, stateKey: runtime.key(state), board: adapter.renderState(state) }];
for (const [index, action] of actions.entries()) {
  const transition = runtime.step(state, action, { winCondition: pkg.mechanic.win, maxStates: 100_000 });
  rows.push({
    step: index + 1,
    action,
    legal: transition.legal,
    reason: transition.legal ? undefined : transition.reason,
    events: transition.events,
    stateKey: runtime.key(transition.legal ? transition.state : state),
    board: adapter.renderState(transition.legal ? transition.state : state),
    win: transition.legal ? runtime.isWin(transition.state) : runtime.isWin(state),
  });
  if (transition.legal) state = transition.state;
}
console.log(JSON.stringify(rows, null, 2));
