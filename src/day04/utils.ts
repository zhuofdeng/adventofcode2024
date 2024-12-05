export const countPatterns = (grid: string[], patterns: string[]): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    const isMatch = (x: number, y: number, dx: number, dy: number, pattern: string): boolean => {
        for (let i = 0; i < pattern.length; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (nx < 0 || nx >= rows || ny < 0 || ny >= cols || grid[nx][ny] !== pattern[i]) {
                return false;
            }
        }
        return true;
    };

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            for (const pattern of patterns) {
                // Check in 4 unique directions only (avoid reverse counts)
                const directions = [
                    [0, 1],  // Right
                    [1, 0],  // Down
                    [1, 1],  // Down-Right (Diagonal)
                    [1, -1]  // Down-Left (Diagonal)
                ];
                for (const [dx, dy] of directions) {
                    if (isMatch(x, y, dx, dy, pattern)) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
}

export const countCrossPattern = (grid: string[], patterns: string[]): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    const isMatch = (x: number, y: number, directions: number[][]): boolean => {
        let text = '';
        for(let i = 0; i < directions.length; i++) {
            text+= grid[x+directions[i][0]][y+directions[i][1]];
        }
        
        const leftCross = text.slice(0, 3);
        const rightCross = text.slice(3);
        return ((leftCross === 'MAS' || leftCross === 'SAM') && (rightCross === 'MAS' || rightCross === 'SAM'));
    };

    for (let x = 1; x < rows- 1; x++) {
        for (let y = 1; y < cols - 1; y++) {
            if (grid[x][y] === 'A') {
                const directions = [
                    [-1, -1],  // Up-Left
                    [0, 0], 
                    [1, 1],  // Down-Right (Diagonal)
                    [-1, 1],  // Up-Right
                    [0, 0], 
                    [1, -1]  // Down-Left (Diagonal)
                ];
                if (isMatch(x, y, directions)) {
                    count++;
                }
            }
        }
    }

    return count;
}


