// Advent of Code - Day 3 - Part One

import { Position } from "../types";
import { getNumber } from "./utils";

export function part1(input: string): number {
  let sum = 0;
  const symbolPositions = new Array<Position>();

  // go through and find all the symbols and their (x, y)
  const lines = input.split('\n');

  lines.forEach((line, index) => {
    for(let i = 0; i < line.length; i++) {
      const char = line.charAt(i);
      if(isNaN(parseInt(char)) && char !== '.') {
        symbolPositions.push({x: index, y: i});
      }
    }
  });

  symbolPositions.forEach((position) => {
    const numbers: number[] = []
    if (position.x > 0) {
      sum += getNumber(lines[position.x-1], position.y-1, numbers);
      sum += getNumber(lines[position.x-1], position.y, numbers);
      sum += getNumber(lines[position.x-1], position.y+1, numbers);
    }
    if (position.x < lines.length -1) {
      sum += getNumber(lines[position.x + 1], position.y-1, numbers);
      sum += getNumber(lines[position.x + 1], position.y, numbers);
      sum += getNumber(lines[position.x + 1], position.y+1, numbers);
    }
    sum += getNumber(lines[position.x], position.y-1, numbers);
    sum += getNumber(lines[position.x], position.y+1, numbers);
  });
  // once we have all the symbols and their location, we can find the numbers that are adjent.
  return sum;
}
