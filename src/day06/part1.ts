// Advent of Code - Day 6 - Part One

export function part1(input: string): number {
  const lines = input.split('\n');
  
  const timeDuration = lines[0].split(':')[1].split(' ').filter(v => !isNaN(parseInt(v))).map(t => parseInt(t))
  const raceDistance = lines[1].split(':')[1].split(' ').filter(v => !isNaN(parseInt(v))).map(r => parseInt(r))

  let result = 1;
  for(let i = 0; i < timeDuration.length; i++) {
    const time = timeDuration[i];
    const distance = raceDistance[i];
    let winCount = 0;
    for(let t = 1; t <= time; t++) {
      if((time - t) * t  > distance) {
        winCount++;
      }
    }

    result *= winCount;
  }
  return result;
}
