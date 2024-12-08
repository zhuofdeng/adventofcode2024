// Advent of Code - Day 5 - Part One

import { buildValidPairsMap, isValidSequence } from "./utils";


export function part1(input: string): number {
  const [rulesSection, pagesSection] = input.split('\n\n');
  const rules = rulesSection.split('\n');
  const pages = pagesSection.split('\n');
  const rulesSet = new Set(rules);  // Optimized rule lookup
  const validPairsMap = buildValidPairsMap(rulesSet);  // Build valid pairs map for fast lookup
  let result = 0;

  pages.forEach((page) => {
    const pageNumbers = page.split(',').map(Number);

    // Check if the pages are valid
    let isValid = isValidSequence(validPairsMap, pageNumbers);

    if(isValid) {
      result += (pageNumbers[Math.floor(pageNumbers.length / 2)]);
    }
  })

  
  return result;
}
