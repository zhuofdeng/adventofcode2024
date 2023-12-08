export const greatestCommonDenominator = (a: number, b: number): number => a ? greatestCommonDenominator(b % a, a) : b;

export const leastCommonMultiple = (a: number, b: number) => a * b / greatestCommonDenominator(a, b);