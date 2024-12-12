// Advent of Code - Day 10 - Part One
import { findConnectingNodes, findTrailNodes, getTrailScoreUniq } from "./utils";

export function part1(input: string): number {
  const map = input.split('\n').map(row => row.split('').map(Number));

  const trails = findTrailNodes(map);
  findConnectingNodes(map, trails);
  
  let result = 0;
  trails.forEach(trail => {
    const score = getTrailScoreUniq(trail);
    result += score;
  });
  return result;
}
