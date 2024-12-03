// Advent of Code - Day 1 - Part One

const findFirstDigit = (code: string): number => {
  for(let i = 0; i < code.length; i++) {
    const digit = parseInt(code[i], 10);
    if (!Number.isNaN(digit)) {
      return digit;
    }
  }

  return 0;
}

const reverseString = (code: string): string => {
  let result = ''
  for(let i = code.length -1; i >= 0; i--) {
    result += code[i];
  }
  return result;
}

export function part1(input: string): number {
  const lines = input.split('\n');
  let result = 0;
  lines.forEach((line) => {
    const firstDigit = findFirstDigit(line);
    const lastDigit = findFirstDigit(reverseString(line));
    const sum = (firstDigit*10) + lastDigit;
    result += sum;
  });

  return result;
}
