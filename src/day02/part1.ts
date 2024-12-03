// Advent of Code - Day 2 - Part One

import { CubeGame } from "./cube-game";

export function part1(input: string): number {
  const games = input.split('\n');
  let result = 0;
  games.forEach((game) => {
    const cubeGame = new CubeGame(game);
    if (cubeGame.validGame()) {
      result += cubeGame.id;
    }
  });

  return result;
}
