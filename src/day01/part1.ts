// Advent of Code - Day 1 - Part One

export function part1(input: string): number {
  const lines = input.split('\n');
  let result = 0;
  let left:Array<number> = [];
  let right:Array<number> = [];
  lines.forEach((l) => {
    left.push(parseInt(l.split('   ')[0]));
    right.push(parseInt(l.split('   ')[1])); 
  });

  left = left.sort();
  right = right.sort();
  
  for(let i = 0; i < left.length; i++) {
    result += Math.abs(left[i] - right[i])
  }
  return result;
}
