// Advent of Code - Day 6 - Part One

import { replaceAt } from "./utils";

export function part1(input: string): number {
  const lines = input.split('\n');
  let currentDirection = 1;
  const DIRECTIONS = [
    [0, -1], // Left
    [-1, 0], // Up
    [0, 1],  // Right
    [1, 0],  // Down
  ];

  let startingIndex = [0, 0];
  
  // Find the starting position ('^')
  lines.forEach((line, idx) => {
    if (line.indexOf('^') !== -1) {
      startingIndex = [idx, line.indexOf('^')];
    }
  });

  let exitedMap = false;
  let result = 1;
  let currentPosition = [...startingIndex];

  while (!exitedMap) {
    const nextSpot = [
      currentPosition[0] + DIRECTIONS[currentDirection][0],
      currentPosition[1] + DIRECTIONS[currentDirection][1],
    ];

    // Check if next spot is outside the map
    if (
      nextSpot[0] < 0 ||
      nextSpot[0] >= lines.length ||
      nextSpot[1] < 0 ||
      nextSpot[1] >= lines[0].length
    ) {
      exitedMap = true;
      break;
    }

    // Check for obstacle
    if (lines[nextSpot[0]].charAt(nextSpot[1]) === '#') {
      currentDirection = (currentDirection + 1) % DIRECTIONS.length; // Rotate direction
      continue;
    }

    // Move to next position
    currentPosition = [...nextSpot];

    // Mark the spot as visited and increment result
    if (lines[currentPosition[0]].charAt(currentPosition[1]) !== 'X' && lines[currentPosition[0]].charAt(currentPosition[1]) !== '^') {
      result++;
      lines[currentPosition[0]] = replaceAt(
        lines[currentPosition[0]],
        currentPosition[1],
        'X'
      );
    }
  }

  return result;
}
