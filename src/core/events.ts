export function eventType(event: string): string {
  return event.split(":", 1)[0] ?? event;
}

export function eventMatchesPattern(event: string, pattern: string): boolean {
  return event === pattern || (!pattern.includes(":") && eventType(event) === pattern);
}

export function eventsMatchPattern(events: string[], pattern: string): boolean {
  return events.some((event) => eventMatchesPattern(event, pattern));
}

export function coversEventPatterns(
  events: string[],
  requiredPatterns: string[],
  forbiddenPatterns: string[],
): boolean {
  return (
    requiredPatterns.every((pattern) => eventsMatchPattern(events, pattern)) &&
    forbiddenPatterns.every((pattern) => !eventsMatchPattern(events, pattern))
  );
}
