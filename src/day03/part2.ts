// Advent of Code - Day 3 - Part Two

import { Position } from "../types";
import { getNumber } from "./utils";

export function part2(input: string): number {
  let sum = 0;
  const symbolPositions = new Array<Position>();

  // go through and find all the symbols and their (x, y)
  const lines = input.split('\n');

  lines.forEach((line, index) => {
    for(let i = 0; i < line.length; i++) {
      const char = line.charAt(i);
      if(isNaN(parseInt(char)) && char === '*') {
        symbolPositions.push({x: index, y: i});
      }
    }
  });

  symbolPositions.forEach((position) => {
    const numbers: number[] = []
    if (position.x > 0) {
      getNumber(lines[position.x-1], position.y-1, numbers);
      getNumber(lines[position.x-1], position.y, numbers);
      getNumber(lines[position.x-1], position.y+1, numbers);
    }
    if (position.x < lines.length -1) {
      getNumber(lines[position.x + 1], position.y-1, numbers);
      getNumber(lines[position.x + 1], position.y, numbers);
      getNumber(lines[position.x + 1], position.y+1, numbers);
    }
    getNumber(lines[position.x], position.y-1, numbers);
    getNumber(lines[position.x], position.y+1, numbers);

    // we only care about a symble that has two connected numbers.
    if (numbers.length === 2) {
      sum += (numbers[0] * numbers[1]);
    }
  });
  
  return sum;
}
