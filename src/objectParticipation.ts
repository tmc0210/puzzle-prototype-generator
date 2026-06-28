export type ObjectParticipationSummary = {
  objectType: string;
  role: string;
  eventType: string;
  distinctInstances: string[];
  eventCount: number;
  evidence: "trace_lineage";
  note?: string;
};

type ParsedObjectEvent = {
  objectType: string;
  role: string;
  eventType: string;
  instance: string;
};

export function analyzeObjectParticipation(events: string[]): ObjectParticipationSummary[] {
  const groups = new Map<
    string,
    {
      objectType: string;
      role: string;
      eventType: string;
      instances: Set<string>;
      eventCount: number;
    }
  >();

  for (const event of events) {
    const parsed = parseObjectEvent(event);
    if (!parsed) {
      continue;
    }
    const key = `${parsed.objectType}|${parsed.role}|${parsed.eventType}`;
    const group =
      groups.get(key) ??
      {
        objectType: parsed.objectType,
        role: parsed.role,
        eventType: parsed.eventType,
        instances: new Set<string>(),
        eventCount: 0,
      };
    group.instances.add(parsed.instance);
    group.eventCount += 1;
    groups.set(key, group);
  }

  return Array.from(groups.values())
    .map((group) => ({
      objectType: group.objectType,
      role: group.role,
      eventType: group.eventType,
      distinctInstances: Array.from(group.instances).sort(compareInstanceIds),
      eventCount: group.eventCount,
      evidence: "trace_lineage" as const,
      note:
        group.objectType === "crate"
          ? "Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities."
          : undefined,
    }))
    .sort((a, b) =>
      `${a.objectType}:${a.role}:${a.eventType}`.localeCompare(
        `${b.objectType}:${b.role}:${b.eventType}`,
      ),
    );
}

function parseObjectEvent(event: string): ParsedObjectEvent | undefined {
  const [eventType, payload] = splitEvent(event);
  if (!payload) {
    return undefined;
  }

  if (eventType === "pull_crate" && payload.startsWith("crate#")) {
    return {
      objectType: "crate",
      role: "moved",
      eventType,
      instance: payload,
    };
  }

  if (eventType === "push_crate_failed" && payload.startsWith("crate#")) {
    return {
      objectType: "crate",
      role: "blocked_player_movement",
      eventType,
      instance: payload,
    };
  }

  if (eventType === "portal_exit_blocked_by_crate" && payload.startsWith("crate#")) {
    return {
      objectType: "crate",
      role: "blocked_portal_exit",
      eventType,
      instance: payload,
    };
  }

  if (eventType === "portal_enter") {
    return {
      objectType: "portal",
      role: "entered",
      eventType,
      instance: payload,
    };
  }

  if (eventType === "portal_fallback_push") {
    return {
      objectType: "portal",
      role: "moved",
      eventType,
      instance: payload,
    };
  }

  return undefined;
}

function splitEvent(event: string): [string, string | undefined] {
  const separator = event.indexOf(":");
  if (separator === -1) {
    return [event, undefined];
  }
  return [event.slice(0, separator), event.slice(separator + 1)];
}

function compareInstanceIds(a: string, b: string): number {
  const aNumber = trailingNumber(a);
  const bNumber = trailingNumber(b);
  if (aNumber !== undefined && bNumber !== undefined && a.replace(/\d+$/, "") === b.replace(/\d+$/, "")) {
    return aNumber - bNumber;
  }
  return a.localeCompare(b);
}

function trailingNumber(value: string): number | undefined {
  const match = /(\d+)$/.exec(value);
  return match ? Number(match[1]) : undefined;
}
