// Advent of Code - Day 9 - Part One

const predictNextNumber = (values: number[]): number => {
  // if all the values are the same, we can just return the first one.
  if (values.every((value) => value === values[0])) {
    return values[0];
  }

  // now we need to find the next in the sequence.
  const differences = getDifferences(values);
  const next = predictNextNumber(differences);
  return values[values.length-1] + next;
}

const getDifferences = (values: number[]): number[] => {
  const result: number[] = [];

  for(let i = values.length-1; i > 0; i--) {
    result.push(values[i] - values[i-1])
  }
  return result.reverse();
}

export function part1(input: string): number {
  let result = 0;

  const lines = input.split('\n').map((line) => line.split(' ').map(v => parseInt(v)));

  lines.forEach((line) => {
    result += predictNextNumber(line);
  })

  return result;
}
