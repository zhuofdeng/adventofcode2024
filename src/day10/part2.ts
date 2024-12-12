// Advent of Code - Day 10 - Part Two
import { findConnectingNodes, findTrailNodes, getTrailScore } from "./utils";

export function part2(input: string): number {
  const map = input.split('\n').map(row => row.split('').map(Number));

  const trails = findTrailNodes(map);
  findConnectingNodes(map, trails);
  
  let result = 0;
  trails.forEach(trail => {
    const score = getTrailScore(trail);
    result += score;
  });
  return result;
}
