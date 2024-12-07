// Advent of Code - Day 6 - Part Two

export function part2(input: string): number {
  const lines = input.split('\n');
  let currentDirection = 1;
  const DIRECTIONS = [
    [0, -1], // Left
    [-1, 0], // Up
    [0, 1],  // Right
    [1, 0],  // Down
  ];

  let startingIndex = [0, 0];
  
  // Find the starting position ('^')
  lines.forEach((line, idx) => {
    if (line.indexOf('^') !== -1) {
      startingIndex = [idx, line.indexOf('^')];
    }
  });
  
  // Function to simulate guard movement with an optional extra obstacle
  const simulateWithObstacle = (obstacleRow: number, obstacleCol: number) => {
    let guardRow = startingIndex[0],
      guardCol = startingIndex[1],
      guardDir = currentDirection;
    const visited = new Set();
    visited.add(`${guardRow},${guardCol},${guardDir}`);
  
    while (true) {
      const [dr, dc] = DIRECTIONS[guardDir];
      const nextRow = guardRow + dr;
      const nextCol = guardCol + dc;
  
      // Check if the next position is outside the grid
      if (nextRow < 0 || nextRow >= lines.length || nextCol < 0 || nextCol >= lines[0].length) {
        return false; // Guard exits the grid
      }
  
      // Treat the additional obstacle as if it's a `#`
      const nextCell =
        nextRow === obstacleRow && nextCol === obstacleCol
          ? "#"
          : lines[nextRow][nextCol];
      if (nextCell === "#") {
        // Obstacle ahead, turn right
        guardDir = (guardDir + 1) % DIRECTIONS.length;
      } else {
        // Move forward
        guardRow = nextRow;
        guardCol = nextCol;
      }
  
      const state = `${guardRow},${guardCol},${guardDir}`;
      if (visited.has(state)) {
        return true; // Loop detected
      }
      visited.add(state);
    }
  };
  
  // Count valid positions for the new obstruction
  let validPositions = 0;
  
  for (let r = 0; r < lines.length; r++) {
    for (let c = 0; c < lines[0].length; c++) {
      // Skip positions that are not empty or are the starting position
      if (lines[r][c] === "#" || lines[r][c] === '^') {
        continue;
      }
  
      // Simulate guard movement with an obstacle at (r, c)
      if (simulateWithObstacle(r, c)) {
        validPositions++;
      }
    }
  }

  return validPositions;
}
