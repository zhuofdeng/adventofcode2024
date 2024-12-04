class MultiplicationPairs {
  public x: number = 0
  public y: number = 0

  constructor(_x: number, _y: number) {
    this.x = _x;
    this.y = _y;
  }
};

export const findMultiplicationPairs = (input: string): Array<MultiplicationPairs> => {
  const searchPattern = /mul\((-?\d+),\s*(-?\d+)\)/g;
  const matches = input.matchAll(searchPattern);
  const multiplicationPairs = new Array<MultiplicationPairs>();
  matches.forEach((match) => {
    multiplicationPairs.push(new MultiplicationPairs(parseInt(match[1]), parseInt(match[2])));
  });
  return multiplicationPairs;
}

export const findMultiplicationPairsFollowsByDo = (input: string): Array<MultiplicationPairs> => {
  const actionPattern = /do\(\)|don't\(\)/g;
  const multPattern = /mul\((-?\d+),\s*(-?\d+)\)/g;

  // Combine and sort matches
  const matches = [...input.matchAll(actionPattern), ...input.matchAll(multPattern)]
    .map(match => ({ text: match[0], index: match.index || 0, groups: match }))
    .sort((a, b) => a.index - b.index);

  const multiplicationPairs: MultiplicationPairs[] = [];
  let takeNext = true;

  for (const match of matches) {
    if (match.text === "do()") {
      takeNext = true;
    } else if (match.text === "don't()") {
      takeNext = false;
    } else if (match.text.startsWith("mul(")) {
      const [_, x, y] = match.groups!;
      if (takeNext) {
        // Take subsequent mul(x, y) only if allowed by 'do()'
        multiplicationPairs.push(new MultiplicationPairs(parseInt(x), parseInt(y)));
      }
    }
  }

  return multiplicationPairs;
};