// Advent of Code - Day 3 - Part Two

import { findMultiplicationPairs, findMultiplicationPairsFollowsByDo } from "./utils";

export function part2(input: string): number {

  let sum = 0;
  const multiplicationPairs = findMultiplicationPairsFollowsByDo(input);
  // once we have all the symbols and their location, we can find the numbers that are adjent.
  multiplicationPairs.forEach((pair) => {
    sum += (pair.x * pair.y);
  });
  return sum;
}
