import { buildValidPairsMap, findInvalidOrderMidpoint, isValidSequence } from "./utils";

// Advent of Code - Day 5 - Part Two
export function part2(input: string): number {
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
        if (!isValid) {
            // If invalid, find the midpoint of the invalid order directly
            const midpoint = findInvalidOrderMidpoint(validPairsMap, pageNumbers);
            result += midpoint;
        }
    });

    return result;
}