// Advent of Code - Day 8 - Part One

import { nodeIsOutsideGrid, addUniqueNode } from "./utils";

export function part1(input: string): number {
  const grid = input.split('\n').map(l => l.split(''));
  const nodes = new Map<string, number[][]>();
  grid.forEach((line, row) => {
    line.forEach((char, col) => {
      if (char !== '.') {
        const node = nodes.get(char);
        if (!node) {
          nodes.set(char, [[row, col]]);
        } else {
          node.push([row, col]);
        }
      }
    })
  });

  const antinodes: Array<number[]> = [];
  nodes.forEach((node) => {
    for (let i = 0; i < node.length; i++) {
      for (let j = i + 1; j < node.length; j++) {
        const [row1, col1] = node[i];
        const [row2, col2] = node[j];
        const rowDiff = row2 - row1;
        const colDiff = col2 - col1;

        // Calculate antinodes that form a straight line and are equidistant
        const antinode1 = [row1 - rowDiff, col1 - colDiff];
        const antinode2 = [row2 + rowDiff, col2 + colDiff];

        if (!nodeIsOutsideGrid(antinode1, grid)) {
          addUniqueNode(antinodes, antinode1);
        }
        if (!nodeIsOutsideGrid(antinode2, grid)) {
          addUniqueNode(antinodes, antinode2);
        }
      }
    }
  });

  return antinodes.length;
}