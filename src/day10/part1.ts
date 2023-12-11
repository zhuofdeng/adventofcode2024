// Advent of Code - Day 10 - Part One
// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.

import { Position } from "../types";

const CHECK_DIRECTION: Record<string, Array<[number, number]>> = {
  '|': [[0, 1],[0, -1]],
  '-': [[1, 0],[-1, 0]],
  'L': [[0, -1], [1, 0]],
  'J': [[-1, 0], [0, -1]],
  '7': [[-1, 0], [0, 1]],
  'F': [[1, 0], [0, 1]],
  'S': [[0, -1],[0, 1],[1, 0], [-1, 0]]
}

const getNextNodePosition = (nodePosition: Position, direction: number[], map: Array<string[]>): Position | null => {
  const nextNodePosition = {x: nodePosition.x + direction[0], y: nodePosition.y + direction[1]}
  if (nextNodePosition.x >= 0 && nextNodePosition.x < map[0].length && nextNodePosition.y >= 0 && nextNodePosition.y < map.length) {
    return nextNodePosition;
  }
  return null;
}

export function part1(input: string): number {
  const map = input.split('\n').map((line) => line.split(''));
  let startPosition: Position = {x: 0, y: 0};
  for(let y = 0; y < map.length; y++) {
    const x = map[y].indexOf('S');
    if (x !== -1) {
      startPosition = {x, y};
      console.log(`start: ${startPosition.x}:${startPosition.y}`)
      break;
    }
  }
  
  let nodeCount = 0;
  let node = map[startPosition.y][startPosition.x];
  let nodePosition = startPosition;
  let foundEndLoop = false;
  while(!foundEndLoop) {
    const nextNodeDirection = CHECK_DIRECTION[node];
    let nextNode;
    map[nodePosition.y][nodePosition.x] = `*`
    nodeCount+=1;
    // map.forEach((line) => {
    //   console.log(line.join(''));
    // })

    // debugger
    let hasValidLink = false;
    for(let n = 0; n < nextNodeDirection.length; n++) {
      // debugger
      const d = nextNodeDirection[n];
      const nextNodePosition = getNextNodePosition(nodePosition, d, map);
      if (nextNodePosition) {
        nextNode = map[nextNodePosition.y][nextNodePosition.x];
        // nothing to find, the next node is not part of the pipes.
        if (Object.keys(CHECK_DIRECTION).includes(nextNode)) {
          const check = [(d[0] === 0? 0 : d[0] * -1), d[1] === 0 ? 0 : d[1] * -1];
          if (CHECK_DIRECTION[nextNode].findIndex(v => v[0] === check[0] && v[1] === check[1]) > -1) {
            node = nextNode;
            nodePosition = nextNodePosition;
            hasValidLink = true;
            break;
          }
        }
      }
    }

    foundEndLoop = !hasValidLink;
  }
  

  // map.forEach((line) => {
  //   console.log(line.join(''));
  // })
  return nodeCount / 2;
}
