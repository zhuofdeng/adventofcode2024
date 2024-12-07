export const isValidPair = (rules: string[], pagePair: number[]): boolean => {
    let isValid = rules.indexOf(`${pagePair[0]}|${pagePair[1]}`) !== -1;
    return isValid;
}

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
}

// Memoization to cache results of subproblems
const memo: Map<string, number[] | null> = new Map();

// Optimized check for valid pairs
export const isValidPair2 = (validPairsMap: Map<number, Set<number>>, pair: number[]): boolean => {
    const [left, right] = pair;
    return validPairsMap.get(left)?.has(right) ?? false;
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

// Backtracking with pruning and memoization
export const findInvalidOrder = (
    validPairsMap: Map<number, Set<number>>,
    pages: number[],
    current: number[] = [],
    used: Set<number> = new Set()
): number[] | undefined | null => {
    const key = current.join(','); // Memoization key
    if (memo.has(key)) {
        return memo.get(key); // Return cached result if already computed
    }

    if (current.length === pages.length) {
        // Validate pairs in the current order
        for (let i = 0; i < current.length - 1; i++) {
            if (isValidPair2(validPairsMap, [current[i], current[i + 1]])) {
                memo.set(key, null); // Cache invalid result
                return null;
            }
        }
        memo.set(key, current); // Cache valid result
        return current;
    }

    for (let i = 0; i < pages.length; i++) {
        if (!used.has(pages[i])) {
            used.add(pages[i]);
            current.push(pages[i]);

            const invalidOrder = findInvalidOrder(validPairsMap, pages, current, used);
            if (invalidOrder) return invalidOrder;

            current.pop();
            used.delete(pages[i]);
        }
    }

    memo.set(key, null); // Cache invalid result
    return null; // No valid order found
};
