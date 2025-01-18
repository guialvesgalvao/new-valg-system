/**
 * Delay for a specified amount of time.
 * @param ms  - Time to wait in milliseconds.
 * @returns A promise that resolves after the specified time.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
