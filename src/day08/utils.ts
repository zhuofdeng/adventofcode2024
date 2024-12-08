export const nodeIsOutsideGrid = (node: number[], grid: string[][]): boolean => {
    return (node[0] < 0 || node[0] >= grid.length || node[1] < 0 || node[1] >= grid[0].length);
}

export const addUniqueNode = (nodes: number[][], node: number[]): void => {
    if (!nodes.some(n => n[0] === node[0] && n[1] === node[1])) {
        nodes.push(node);
    }
}