// Advent of Code - Day 8 - Part Two

import { leastCommonMultiple } from "../utils";

export function part2(input: string): number {
  const lines = input.split('\n');
  const instructions = lines[0];

  const startNodes: Array<string> = [];
  const nodeMap: Map<string, [string, string]> = new Map();
  for(let i = 2; i < lines.length; i++) {
    const node = lines[i].substring(0, lines[i].indexOf('=') - 1);
    const left = lines[i].substring(lines[i].indexOf('(') + 1, lines[i].indexOf('(') + 4);
    const right = lines[i].substring(lines[i].indexOf(', ') + 2, lines[i].indexOf(', ') + 5);
    if(node.endsWith('A')) {
      startNodes.push(node);
    }
    nodeMap.set(node, [left, right]);
  }
  
  const endValues: number[] =[];
  startNodes.forEach((node) => {
    let curIndex = 0;
    let foundNode = false;
    let count = 0;
    let curNode = nodeMap.get(node);
    while(!foundNode) {
      const instruction = instructions.charAt(curIndex);
      let nextNode;
      if (curNode) {
        if(instruction === 'L') {
          nextNode = curNode[0];
        } else {
          nextNode = curNode[1];
        }
        
        curIndex++;
        curNode = nodeMap.get(nextNode);
        count++;
        if(curIndex === instructions.length) {
          curIndex = 0;
        }

        if(nextNode.endsWith('Z')) {
          foundNode = true;
        }
      }
    }
    endValues.push(count);
  });

  // once we have all the values per start node, we need to calculate the least common multiple of all the numbers.
  return endValues.reduce(leastCommonMultiple);
}
