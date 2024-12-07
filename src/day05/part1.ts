// Advent of Code - Day 5 - Part One

import { getPagePairs, isValidPair } from "./utils";


export function part1(input: string): number {
  const [rules, pages] = input.split('\n\n').map((v) => v.split('\n'));
  let result = 0;
  pages.forEach((page) => {
    const pageNumbers = page.split(',').map(v => parseInt(v));
    const pagePairs = getPagePairs(pageNumbers);
    let isValid = true;
    for(let p = 0; p < pagePairs.length; p++) {
      if (isValid) {
        isValid = isValidPair(rules, pagePairs[p]);
      } else {
        break;
      }
    }

    if(isValid) {
      result += (pageNumbers[Math.floor(pageNumbers.length / 2)]);
    }
  })

  
  return result;
}
