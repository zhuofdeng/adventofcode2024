// Advent of Code - Day 2 - Part Two

import { CubeGame } from "./cube-game";

export function part2(input: string): number {
  const games = input.split('\n');
  let result = 0;
  games.forEach((game) => {
    const cubeGame = new CubeGame(game);
    result += cubeGame.totalCount;
  });
  return result;
}
