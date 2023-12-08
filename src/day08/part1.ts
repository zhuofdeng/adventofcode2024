// Advent of Code - Day 8 - Part One

export function part1(input: string): number {
  const lines = input.split('\n');
  const instructions = lines[0];

  let result = 0;
  const nodeMap: Map<string, [string, string]> = new Map();
  for(let i = 2; i < lines.length; i++) {
    const node = lines[i].substring(0, lines[i].indexOf('=') - 1);
    const left = lines[i].substring(lines[i].indexOf('(') + 1, lines[i].indexOf('(') + 4);
    const right = lines[i].substring(lines[i].indexOf(', ') + 2, lines[i].indexOf(', ') + 5)
    //console.log(`node ${node} left ${left} right ${right}`);
    
    nodeMap.set(node, [left, right]);
  }

  let curNode = nodeMap.get('AAA');

  let curIndex = 0;
  let foundNode = false;
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
      result++;
      if(curIndex === instructions.length) {
        curIndex = 0;
      }

      if(nextNode === 'ZZZ') {
        foundNode = true;
      }
    }
  }
  return result;

}
