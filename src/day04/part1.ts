// Advent of Code - Day 4 - Part One

import { countPatterns } from "./utils";

export function part1(input: string): number {
  const grid = input.split('\n');

  return countPatterns(grid, ['XMAS', 'SAMX']);
}
