// Advent of Code - Day 6 - Part Two

export function part2(input: string): number {
  const lines = input.split('\n');
  
  const timeDuration = parseInt(lines[0].split(':')[1].split(' ').filter(v => !isNaN(parseInt(v))).join(''));
  const raceDistance = parseInt(lines[1].split(':')[1].split(' ').filter(v => !isNaN(parseInt(v))).join(''));

  let result = 1;
  
    let winCount = 0;
    for(let t = 1; t <= timeDuration; t++) {
      if((timeDuration - t) * t  > raceDistance) {
        winCount++;
      }
    }

    result *= winCount;
  return result;
}
