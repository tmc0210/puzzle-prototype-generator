import type { CandidateLevelV2, CandidatesV2Doc, CurriculumV2Package } from "../core/types.js";

export function formatCandidateGalleryV2Markdown(pkg: CurriculumV2Package): string {
  if (!pkg.candidatesV2) {
    throw new Error("candidates_v2.yml not found");
  }

  const specsById = new Map(pkg.levelSpecsV2?.specs.map((spec) => [spec.id, spec]));
  const candidates = pkg.candidatesV2.candidates;
  const factoryGroups = groupBy(candidates, (candidate) => candidate.factory);

  const lines: string[] = [
    `# Candidate Gallery V2: ${pkg.mechanic.id}`,
    "",
    "## Summary",
    "",
    `- Candidates: ${candidates.length}`,
    `- Factories: ${[...factoryGroups.keys()].sort().join(", ") || "none"}`,
    `- Status: ${formatCounts(countBy(candidates.map((candidate) => candidate.status)))}`,
    "",
    "## Structure Variants By Factory",
    "",
    ...[...factoryGroups.entries()].flatMap(([factory, group]) => {
      return [
        `### ${factory}`,
        "",
        `- Candidates: ${group.length}`,
        `- Specs: ${group.map((candidate) => candidate.spec_id).join(", ")}`,
        "",
        ...group.flatMap((candidate) => {
          const spec = specsById.get(candidate.spec_id);
          return formatCandidateThumbnail(candidate, spec?.title);
        }),
      ];
    }),
    "## Candidates",
    "",
    ...candidates.flatMap((candidate) => {
      const spec = specsById.get(candidate.spec_id);
      return formatCandidate(candidate, spec?.title);
    }),
  ];

  return `${lines.join("\n")}\n`;
}

function formatCandidateThumbnail(
  candidate: CandidateLevelV2,
  specTitle: string | undefined,
): string[] {
  return [
    `#### ${candidate.spec_id}${specTitle ? ` (${specTitle})` : ""}`,
    "",
    `- Candidate: ${candidate.id}`,
    `- Motifs: ${candidate.motifs.join(", ")}`,
    "",
    "```text",
    candidate.layout,
    "```",
    "",
    `- Solution trace: ${formatTrace(candidate.solution_trace)}`,
    "",
  ];
}

function formatCandidate(candidate: CandidateLevelV2, specTitle: string | undefined): string[] {
  return [
    `### ${candidate.id}`,
    "",
    `- Spec: ${candidate.spec_id}${specTitle ? ` (${specTitle})` : ""}`,
    `- Status: ${candidate.status}`,
    `- Factory: ${candidate.factory}`,
    `- Motifs: ${candidate.motifs.join(", ")}`,
    `- Seed: ${candidate.seed}`,
    "",
    "```text",
    candidate.layout,
    "```",
    "",
    `- Solution trace: ${formatTrace(candidate.solution_trace)}`,
    `- Probe trace: ${formatTrace(candidate.probe_trace)}`,
    candidate.notes ? `- Notes: ${candidate.notes}` : "- Notes: none",
    "",
  ];
}

function formatTrace(trace: CandidateLevelV2["solution_trace"]): string {
  if (!trace || trace.length === 0) {
    return "none";
  }
  return trace
    .map((step, index) => {
      const events = step.events && step.events.length > 0 ? ` [${step.events.join(", ")}]` : "";
      return `${index + 1}.${step.input}${events}`;
    })
    .join(" -> ");
}

function groupBy<T>(items: T[], getKey: (item: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = getKey(item);
    const group = groups.get(key) ?? [];
    group.push(item);
    groups.set(key, group);
  }
  return groups;
}

function countBy(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

function formatCounts(counts: Map<string, number>): string {
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, count]) => `${key}=${count}`)
    .join(", ");
}
