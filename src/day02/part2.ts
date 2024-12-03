// Advent of Code - Day 2 - Part Two

import { isLevelSafePart2 } from "./utils";

export function part2(input: string): number {
  const reports = input.split('\n').map((levels) => levels.split(' ').map((v) => parseInt(v)));

  let result = 0;
  reports.forEach(level => {
    if (isLevelSafePart2(level)) {
      result += 1;
    }
  });
  return result;
}
