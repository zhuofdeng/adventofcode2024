// Advent of Code - Day 4 - Part One

import { ScratchCard } from "./scratchCard";

export function part1(input: string): number {
  let result = 0;
  const cards = input.split('\n');
  cards.forEach((card, index) => {
    const scratchCard = new ScratchCard(card, index);
    result += scratchCard.total;
  })
  return result;
}
