import { Position } from "./types";

export const greatestCommonDenominator = (a: number, b: number): number => a ? greatestCommonDenominator(b % a, a) : b;

export const leastCommonMultiple = (a: number, b: number) => a * b / greatestCommonDenominator(a, b);

export const distance = (a: Position, b: Position): number => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);