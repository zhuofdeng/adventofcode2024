import { findMultiplicationPairs } from "./utils";

// Advent of Code - Day 3 - Part One
export function part1(input: string): number {
  let sum = 0;

  
  const multiplicationPairs = findMultiplicationPairs(input);
  // once we have all the symbols and their location, we can find the numbers that are adjent.
  multiplicationPairs.forEach((pair) => {
    sum += (pair.x * pair.y);
  });
  return sum;
}
