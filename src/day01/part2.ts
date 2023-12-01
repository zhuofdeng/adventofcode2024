// Advent of Code - Day 1 - Part Two
const NUMBERS: Record<string, number> = {
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9
}

type Match = {
  index: number,
  num: number,
}

const findMatches = (line: string): Array<Match> => {
  const matches = Array<Match>();
  Object.keys(NUMBERS).forEach((num) => {
    let index = line.indexOf(num);
    while (index !== -1) {
      matches.push({index, num: NUMBERS[num]});
      index = line.indexOf(num, index+1);
    }
  });

  matches.sort((a, b) => a.index - b.index);
  return matches;
}

export function part2(input: string): number {
  const lines = input.split('\n');
  let result = 0;
  lines.forEach((line) => {
    const matches = findMatches(line);
    const firstDigit = matches[0].num;
    const lastDigit = matches[matches.length-1].num
    const sum = (firstDigit*10) + lastDigit;
    result += sum;
  });

  return result;
}