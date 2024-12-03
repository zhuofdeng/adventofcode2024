
export function part2(input: string): number {
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
    let matches: Array<number> = right.filter(r => r === left[i]);
    result += left[i] * matches.length;
  }
  return result;
}