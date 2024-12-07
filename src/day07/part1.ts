// Advent of Code - Day 7 - Part One

const isValid = (result: number, numbers: number[]): boolean => {
  const n = numbers.length;

  // Helper function to evaluate all possible expressions
  const evaluate = (index: number, current: number): boolean => {
    if (index === n) {
      return current === result;
    }

    // Try adding the next number
    if (evaluate(index + 1, current + numbers[index])) {
      return true;
    }

    // Try multiplying the next number
    if (evaluate(index + 1, current * numbers[index])) {
      return true;
    }

    return false;
  };

  // Start the evaluation with the first number
  return evaluate(1, numbers[0]);
}

export function part1(input: string): number {
  let lines = input.split('\n');
  let result = 0;

  lines.forEach((line) => {
    const [sumStr, numbersStr] = line.split(':').map((x) => x.trim());
    const sum = parseInt(sumStr);
    const numbers = numbersStr.split(' ').map(Number);

    if (isValid(sum, numbers)) {
      result += sum;
    }
  });

  return result;
}
