// Advent of Code - Day 7 - Part One

import { CardGame } from "./card-game";

export function part1(input: string): number {
  let result = 0;
  const cards = input.split('\n');
  let cardGames: Map<number, Array<CardGame>> = new Map();
  let rank = 1;
  cards.forEach((card) => {
    const game = new CardGame(card);
    const games = cardGames.get(game.typeRank) || [];
    games.push(game);
    cardGames.set(game.typeRank, games);
  });


  cardGames = new Map([...cardGames.entries()].sort());
  for (const [key, value] of cardGames) {
    const sorted = value.sort((a, b) => a.compare(b) ? 1 : -1);
    cardGames.set(key, sorted);
    sorted.forEach((game) => {
      result += game.betAmount * rank;
      rank ++;
    })
  }
  return result;
}
