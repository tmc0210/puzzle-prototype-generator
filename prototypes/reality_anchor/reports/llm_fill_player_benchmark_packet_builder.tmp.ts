import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { replayInputSequence } from "../../../src/workflows/inputSequenceReplay.js";

const prototypeRoot = path.resolve("prototypes/reality_anchor");
const outputRoot = path.join(
  prototypeRoot,
  "reports",
  "llm_fill_player_benchmark_20260714_tmp",
);
const candidateRoot = path.join(prototypeRoot, "design_archive", "candidates");

const course = [
  "0007", "0008", "0009", "0010", "0015", "0011", "0012",
  "0013", "0014", "0018", "0020", "0003", "0004", "0016",
  "0023", "0022", "0001", "0002", "0005", "0028", "0026", "0025",
];

const targetIds = ["0006", "0025", "0030", "0032"];

const actionOverrides: Record<string, string[]> = {
  "0006": "down up right right down left down left left up right left down right down left up up right right right up left right down left left left up right down left down down right up right up left left".split(" "),
  "0030": "down right right up left left up left down left left down right right up up up up up right right down right up left left left down down right up left up right right".split(" "),
};

const rules = `# Reality Anchor 玩家规则

- 胜利：所有目标都被箱子、黏块或任意锚点格覆盖；玩家站在目标上不算覆盖。
- P/L 是推拉锚点：P 侧为推世界，L 侧为拉世界；没有 P/L 时全图默认推世界。
- B/S 是箱黏锚点：B 侧为箱世界，S 侧为黏世界；没有 B/S 时全图默认箱世界。
- 两类锚点各自最多一个，可以共存并独立判定。锚点是可平移、不可旋转的 1x2 或 2x1 刚体。
- 推和拉都对一个物体实例施力，力可沿运动方向传给其他可推动物体。
- 玩家与本次受力对象闭包同时平移；玩家旧格会腾空，允许刚体或被拉对象进入。
- 拉世界中只直接拉玩家身后一格的相邻物体；若受力闭包会同步移开，则它当前占据的玩家目标格不阻挡动作。
- 黏块是四邻接刚体；相邻黏块自动合并。跨入箱世界的格子变成独立箱子，剩余黏格按连通块分裂。
- 任意刚体的一部分被墙、边界或不可移动结构挡住时，整次动作失败且状态不变。

图例：# 墙；. 地面；@ 玩家；C 箱子；M 黏格；G 目标；P/L 推拉锚点；B/S 箱黏锚点；* 箱子在目标；m 黏格在目标；+ 玩家在目标。锚点覆盖目标时仍显示锚点字母，目标位置始终以该关初始谜面为准。
`;

type PacketLevel = {
  candidateId: string;
  sourceId: string;
  layout: string;
  actions: string[];
  snapshots: string[];
  finalWin: boolean;
  legalThroughStep: number;
};

async function sourceIdFor(candidateId: string): Promise<string> {
  const file = path.join(candidateRoot, `RA_CAND_${candidateId}.md`);
  const text = await readFile(file, "utf8");
  const match = text.match(/^source_candidate_version:\s*([^\s]+)\s*$/m);
  if (!match) {
    throw new Error(`Missing source_candidate_version for RA_CAND_${candidateId}`);
  }
  return match[1].replace(/^['\"]|['\"]$/g, "");
}

function formatReplay(level: PacketLevel, demoIndex?: number): string {
  const label = demoIndex === undefined
    ? "目标关规范解"
    : `前序演示 P${String(demoIndex).padStart(2, "0")}`;
  const lines = [
    `## ${label}`,
    "",
    "S00",
    "```text",
    level.snapshots[0],
    "```",
    "",
    `动作：${level.actions.join(", ")}`,
  ];
  for (let index = 1; index < level.snapshots.length; index += 1) {
    lines.push(
      "",
      `S${String(index).padStart(2, "0")} — ${level.actions[index - 1]}${index === level.snapshots.length - 1 ? "（完成）" : ""}`,
      "```text",
      level.snapshots[index],
      "```",
    );
  }
  return `${lines.join("\n")}\n`;
}

function formatPrimer(levels: PacketLevel[]): string {
  return `${rules}
# 前序经历

请按给定顺序阅读这些匿名关卡的谜面与规范解。把它们当作你此前亲自学过的关卡即可；不要建立显式知识账本，也不要猜测原始关卡 ID、设计标签或人类评价。

${levels.map((level, index) => formatReplay(level, index + 1)).join("\n")}`;
}

function formatBlind(level: PacketLevel): string {
  return `# 当前匿名目标关

只给谜面，不给解。目标位置以初始谜面中的 G 为准。

\`\`\`text
${level.layout}
\`\`\`
`;
}

async function main(): Promise<void> {
  const pkg = await loadPrototypePackage(prototypeRoot);
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  const allIds = [...new Set([...course, ...targetIds])];
  const packetLevels = new Map<string, PacketLevel>();

  for (const candidateId of allIds) {
    const sourceId = await sourceIdFor(candidateId);
    const level = pkg.levels.levels.find((item) => item.id === sourceId);
    if (!level) {
      throw new Error(`Missing levels.yml entry ${sourceId} for RA_CAND_${candidateId}`);
    }
    const actions = actionOverrides[candidateId] ?? level.expected_trace?.map((step) => step.input);
    if (!actions || actions.length === 0) {
      throw new Error(`Missing actions for RA_CAND_${candidateId}`);
    }
    const winCondition = level.win ?? pkg.mechanic.win;
    const initial = adapter.parseLevel(level);
    const execution = replayInputSequence(
      adapter,
      runtime,
      initial,
      actions,
      { winCondition },
      winCondition,
    );
    if (execution.stoppedAtIllegalAction || !execution.final.isWin) {
      throw new Error(
        `Replay failed for RA_CAND_${candidateId}: legal=${execution.legalThroughStep}/${actions.length} win=${execution.final.isWin}`,
      );
    }
    packetLevels.set(candidateId, {
      candidateId,
      sourceId,
      layout: level.layout,
      actions,
      snapshots: [execution.initial.render, ...execution.steps.map((step) => step.after.render)],
      finalWin: execution.final.isWin,
      legalThroughStep: execution.legalThroughStep,
    });
  }

  await mkdir(outputRoot, { recursive: true });
  const through0001 = course.slice(0, course.indexOf("0001") + 1);
  const through0002 = course.slice(0, course.indexOf("0002") + 1);
  const through0026 = course.slice(0, course.indexOf("0026") + 1);
  const firstFive = course.slice(0, 5);
  const files: Record<string, string> = {
    "rules.md": rules,
    "primer_a.md": formatPrimer(through0001.map((id) => packetLevels.get(id)!)),
    "primer_b.md": formatPrimer(through0002.map((id) => packetLevels.get(id)!)),
    "primer_c.md": formatPrimer(through0026.map((id) => packetLevels.get(id)!)),
    "primer_f.md": formatPrimer(firstFive.map((id) => packetLevels.get(id)!)),
    "condition_a_blind.md": formatBlind(packetLevels.get("0006")!),
    "condition_b_blind.md": formatBlind(packetLevels.get("0006")!),
    "condition_c_blind.md": formatBlind(packetLevels.get("0025")!),
    "condition_d_blind.md": formatBlind(packetLevels.get("0030")!),
    "condition_e_blind.md": formatBlind(packetLevels.get("0032")!),
    "condition_f_blind.md": formatBlind(packetLevels.get("0011")!),
    "condition_a_reveal.md": formatReplay(packetLevels.get("0006")!),
    "condition_b_reveal.md": formatReplay(packetLevels.get("0006")!),
    "condition_c_reveal.md": formatReplay(packetLevels.get("0025")!),
    "condition_d_reveal.md": formatReplay(packetLevels.get("0030")!),
    "condition_e_reveal.md": formatReplay(packetLevels.get("0032")!),
    "condition_f_reveal.md": formatReplay(packetLevels.get("0011")!),
  };
  await Promise.all(
    Object.entries(files).map(([name, content]) => writeFile(path.join(outputRoot, name), content, "utf8")),
  );
  const lessonsRoot = path.join(outputRoot, "lessons");
  await mkdir(lessonsRoot, { recursive: true });
  await Promise.all(
    course.map((id, index) =>
      writeFile(
        path.join(lessonsRoot, `lesson_${String(index + 1).padStart(2, "0")}.md`),
        formatReplay(packetLevels.get(id)!, index + 1),
        "utf8",
      ),
    ),
  );
  const manifest = {
    createdAt: new Date().toISOString(),
    course,
    conditions: {
      A: { primer: through0001, target: "0006" },
      B: { primer: through0002, target: "0006" },
      C: { primer: through0026, target: "0025" },
      D: { primer: through0026, target: "0030" },
      E: { primer: through0026, target: "0032" },
      F: { primer: firstFive, target: "0011" },
    },
    levels: Object.fromEntries(packetLevels),
  };
  await writeFile(path.join(outputRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ outputRoot, files: Object.keys(files), manifestLevels: packetLevels.size }, null, 2));
}

await main();
