// lib/parsePageRange.ts

export function parsePageRange(input: string): number[] {
  const result = new Set<number>();

  input.split(",").forEach((part) => {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map((n) => parseInt(n.trim()));

      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          result.add(i);
        }
      }
    } else {
      const num = parseInt(part.trim());

      if (!isNaN(num)) result.add(num);
    }
  });

  return Array.from(result).sort((a, b) => a - b);
}
