export const increasingOrDecreasing = (level: Array<number>): Boolean => {
    if (level.length < 2) {
        return false;
    }
      
    let increasing = true;
    let decreasing = true;
    
    for (let i = 1; i < level.length; i++) {
        if (level[i] > level[i - 1]) {
            decreasing = false;
        } else if (level[i] < level[i - 1]) {
            increasing = false;
        }
    }
    
    if (increasing || decreasing) {
        return true;
    }
    else {
        return false;
    }
}

export const isLevelSafe = (level: Array<number>): Boolean => {
    if(increasingOrDecreasing(level)) {
        for(let i = 0; i < level.length - 1; i++) {
            const diff = Math.abs(level[i] - level[i+1])
            if ( diff > 3 || diff === 0) {
                return false;
            }
        }

        return true;
    }

    return false;
}

const spliceNoMutate = (myArray: Array<number>, indexToRemove: number) => {
    return myArray.slice(0,indexToRemove).concat(myArray.slice(indexToRemove+1));
}


export const isLevelSafePart2 = (level: Array<number>): Boolean => {
    if (isLevelSafe(level) === false) {
        for(let i = 0; i < level.length; i++) {
            const newLevel = spliceNoMutate(level, i);
            if (isLevelSafe(newLevel)) {
                return true;
            }
        }

        return false;
    }

    return true;
}