export const isValidPair = (validPairsMap: Map<number, Set<number>>, pair: number[]): boolean => {
    const [left, right] = pair;
    return validPairsMap.get(left)?.has(right) ?? false;
};

export const getPagePairs = (pages: Array<number>): number[][] => {
    const result: number[][] = [];
    for (let i = 0; i < pages.length; i++) {
        for (let j = i + 1; j < pages.length; j++) {
            const left = pages[i];
            const right = pages[j]
            result.push([left, right]);
        }
    }
    return result;
};

export const isValidSequence = (validPairsMap: Map<number, Set<number>>, sequence: number[]): boolean => {
    for (let i = 0; i < sequence.length - 1; i++) {
        if (!isValidPair(validPairsMap, [sequence[i], sequence[i + 1]])) {
            return false;
        }
    }
    return true;
};

// Optimized function to build valid pairs map
export const buildValidPairsMap = (rulesSet: Set<string>): Map<number, Set<number>> => {
    const validPairsMap = new Map<number, Set<number>>();
    rulesSet.forEach((rule) => {
        const [left, right] = rule.split('|').map(Number);
        if (!validPairsMap.has(left)) {
            validPairsMap.set(left, new Set());
        }
        validPairsMap.get(left)?.add(right);
    });
    return validPairsMap;
};

const getValidSequence = (validPairsMap: Map<number, Set<number>>, sequence: number[]): number[] => {
    if (isValidSequence(validPairsMap, sequence)) {
        return sequence;
    }
    for(let i = 0; i < sequence.length - 1; i++) {
        const pair = [sequence[i], sequence[i + 1]];
        if (!isValidPair(validPairsMap, pair)) {
            const temp = sequence[i];
            sequence[i] = sequence[i + 1];
            sequence[i + 1] = temp;
            break;
        }
    }
    return getValidSequence(validPairsMap, sequence);
};

export const findInvalidOrderMidpoint = (
    validPairsMap: Map<number, Set<number>>,
    pages: number[]
): number => {
    
    const validSequence = getValidSequence(validPairsMap, pages);
    const midpoint = validSequence[Math.floor(validSequence.length / 2)];
    return midpoint;
};
