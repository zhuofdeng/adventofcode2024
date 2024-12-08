// Advent of Code - Day 8 - Part Two
import { nodeIsOutsideGrid, addUniqueNode } from "./utils";

export function part2(input: string): number {
  const grid = input.split('\n').map(l => l.split(''));
  const nodes = new Map<string, number[][]>();
  const antinodes: Array<number[]> = [];
  grid.forEach((line, row) => {
    line.forEach((char, col) => {
      if (char !== '.') {
        const node = nodes.get(char);
        if (!node) {
          nodes.set(char, [[row, col]]);
        } else {
          node.push([row, col]);
        }

        addUniqueNode(antinodes, [row, col]);
      }
    })
  });

  nodes.forEach((node) => {
    for (let i = 0; i < node.length; i++) {
      for (let j = i + 1; j < node.length; j++) {
        const [row1, col1] = node[i];
        const [row2, col2] = node[j];
        const rowDiff = row2 - row1;
        const colDiff = col2 - col1;

        // Extend antinodes in both directions until they are outside the grid
        let k = 1;
        while (true) {
          const antinode1 = [row1 - k * rowDiff, col1 - k * colDiff];
          const antinode2 = [row2 + k * rowDiff, col2 + k * colDiff];

          const antinode1Outside = nodeIsOutsideGrid(antinode1, grid);
          const antinode2Outside = nodeIsOutsideGrid(antinode2, grid);

          if (!antinode1Outside) {
            addUniqueNode(antinodes, antinode1);
          }

          if (!antinode2Outside) {
            addUniqueNode(antinodes, antinode2);
          }

          if (antinode1Outside && antinode2Outside) {
            break;
          }

          k++;
        }
      }
    }
  });
  return antinodes.length;
}
