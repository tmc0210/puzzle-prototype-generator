import {
  analyzePullPortalObjectParticipation,
  type ObjectParticipationSummary,
} from "./pull_portal_fallback/objectParticipation.js";

export type { ObjectParticipationSummary };

export function analyzeObjectParticipation(
  mechanicId: string,
  events: string[],
): ObjectParticipationSummary[] {
  if (mechanicId === "pull_portal_fallback") {
    return analyzePullPortalObjectParticipation(events);
  }
  return [];
}
