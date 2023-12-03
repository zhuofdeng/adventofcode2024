export const getNumber = (line: string, index: number, existingNumbers: number[]): number => {
    if (!isNaN(parseInt(line.charAt(index)))) {
      // this is a number, but we have to find the whole number.
      // go left until we reach a symbol
      let left = index;
      let right = index;
      for(left; left >= 0; left--) {
        if (isNaN(parseInt(line.charAt(left)))) {
          break;
        }
      }
  
      // now go right and find the symble
      for(right; right < line.length; right++) {
        if (isNaN(parseInt(line.charAt(right)))) {
          break;
        }
      }
  
      // parse the number, and only count it if it isn't already accounted for.
      const number = parseInt(line.substring(left+1, right));
      if (!existingNumbers.includes(number)) {
        existingNumbers.push(number);
        return number;
      }
      return 0;
  
    }
    return 0;
  }