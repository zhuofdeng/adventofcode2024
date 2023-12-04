// Advent of Code - Day 4 - Part Two

import { ScratchCard } from "./scratchCard";
import { ScratchCardManager } from "./scratchCardManager";

export function part2(input: string): number {
  const scratchCardManager = new ScratchCardManager();
  const cards = input.split('\n');
  cards.forEach((card, index) => {
    const scratchCard = new ScratchCard(card, index);
    scratchCardManager.addOriginalCard(scratchCard);
  });


  return scratchCardManager.getTotalWinningCards();
}
