// Advent of Code - Day 12 - Part One

const calculateCombinations = (spring: string, record: Array<number>): number => {
  let sum = 0;
  return sum;
}

export function part1(input: string): number {
  let sum = 0;

  const lines = input.split('\n');

  lines.forEach((v) => {
    const spring = v.split(' ')[0];
    const record = v.split(' ')[1].split(',').map(Number)

    sum += calculateCombinations(spring, record);
  })
  return sum;
}
