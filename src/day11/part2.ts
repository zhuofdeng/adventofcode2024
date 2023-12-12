// Advent of Code - Day 11 - Part One

import { Position } from "../types";
import { distance } from "../utils";

const findAllGalexies = (line: string[], yPosition: number): Array<Position> => {
  const galaxies: Array<Position> = [];
  for(let x = 0; x < line.length; x++) {
    if (line[x] === '#') {
      galaxies.push({x, y: yPosition});
    }
  }

  return galaxies;
}


export function part2(input: string): number {
  const map = input.split('\n').map(line => line.split(''));
  let rowsExpanded = 0;
  const columnExpandedInces: number[] = [];
  let galaxies: Array<Position> = [];
  for(let line = 0; line < map.length; line++) {
    if (!map[line].includes('#')) {
      rowsExpanded += 1;
    } else {
      // this line has galaxies, so lets find them all.
      galaxies = galaxies.concat(findAllGalexies(map[line], line + rowsExpanded * (1000000 - 1)));
    }
  }

  for(let c = 0; c < map[0].length; c++) {
    const column = map.map((line) => line[c]);
    if(!column.includes('#')) {
      columnExpandedInces.push(c);
    }
  }

  galaxies.forEach((g) => {
    for(let c = columnExpandedInces.length-1; c >=0; c--) {
      if(columnExpandedInces[c] <= g.x) {
        g.x += (c+1)*(1000000-1);
        break;
      }
    }
  });
  
  let result = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i; j < galaxies.length; j++) {
      result += distance(galaxies[i], galaxies[j]);
    }
  }
  return result;
}
