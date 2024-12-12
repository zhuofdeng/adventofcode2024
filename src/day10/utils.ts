interface PathNode {
    node: number;
    index: [number, number];
    children: PathNode[];
  }
  
  export const findTrailNodes = (map: number[][]): PathNode[] => {
    const trails: PathNode[] = [];
    map.forEach((row, rowIndex) => {
      row.forEach((node, colIndex) => {
        if (node === 0) {
          const trail: PathNode = {
            node,
            index: [rowIndex, colIndex],
            children: []
          };
          trails.push(trail);
        }
      });
    });
    return trails;
  };
  
  const getConnectingNode = (map: number[][], x: number, y: number, node: number): PathNode[] => {
    const connectingNodes: PathNode[] = [];
    const directions = [
      [0, -1], // left
      [0, 1],  // right
      [-1, 0], // up
      [1, 0]   // down
    ];
  
    directions.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (
        newX >= 0 && newX < map.length &&
        newY >= 0 && newY < map[0].length &&
        map[newX][newY] === node + 1
      ) {
        const childNode: PathNode = {
          node: map[newX][newY],
          index: [newX, newY],
          children: []
        };
        childNode.children = getConnectingNode(map, newX, newY, childNode.node);
        connectingNodes.push(childNode);
      }
    });
  
    return connectingNodes;
  };
  
  export const findConnectingNodes = (map: number[][], trails: PathNode[]) => {
    trails.forEach(trail => {
      const [x, y] = trail.index;
      trail.children = getConnectingNode(map, x, y, trail.node);
    });
  };
  
  export const getTrailScoreUniq = (node: PathNode): number => {
    let score = 0;
    const queue: PathNode[] = [node];
    const visited = new Set<string>();

    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (currentNode) {
        const key = `${currentNode.index[0]},${currentNode.index[1]}`;
        if (!visited.has(key)) {
            visited.add(key);
            if (currentNode.node === 9) {
            score++;
            }
            queue.push(...currentNode.children);
        }
        }
    }

    return score;
  }

  export const getTrailScore = (node: PathNode): number => {
    let score = 0;
    const queue: PathNode[] = [node];

    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (currentNode) {
            if (currentNode.node === 9) {
                score++;
            }
            queue.push(...currentNode.children);
        }
    }

    return score;
  }