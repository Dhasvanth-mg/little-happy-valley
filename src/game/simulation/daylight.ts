const CYCLE_SECONDS = 180;

export function daylightAt(seconds: number) {
  const phase = (seconds % CYCLE_SECONDS) / CYCLE_SECONDS;
  return Math.max(0, Math.cos(phase * Math.PI * 2));
}
