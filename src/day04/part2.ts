import { countCrossPattern } from "./utils";

// Advent of Code - Day 4 - Part Two
export function part2(input: string): number {
  
  const grid = input.split('\n');

  return countCrossPattern(grid, ['MAS', 'SAM']);
}
