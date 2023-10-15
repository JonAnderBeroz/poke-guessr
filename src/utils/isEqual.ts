export function isEqual(string: string, compare2: string): boolean {
  return (
    string.localeCompare(compare2, "es", {
      sensitivity: "base",
      ignorePunctuation: true,
    }) === 0
  );
}
