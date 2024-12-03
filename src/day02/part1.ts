// Advent of Code - Day 2 - Part One

import { isLevelSafe } from "./utils";

export function part1(input: string): number {
  const reports = input.split('\n').map((levels) => levels.split(' ').map((v) => parseInt(v)));

  let result = 0;
  reports.forEach(level => {
    if (isLevelSafe(level)) {
      result += 1;
    }
  });
  
  return result;
}
