// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const nodesToBeVisited = [startNode];
  while (!!nodesToBeVisited.length) {
    sortNodesByDistance(nodesToBeVisited);
    const closestNode = nodesToBeVisited.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateNodesToBeVisited(closestNode, nodesToBeVisited, grid);
  }
}

function sortNodesByDistance(nodesToBeVisited) {
  nodesToBeVisited.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNodesToBeVisited(node, nodesToBeVisited, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(
    node,
    nodesToBeVisited,
    grid,
  );
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
    nodesToBeVisited.push(neighbor);
  }
}

function getUnvisitedNeighbors(node, nodesToBeVisited, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0 && !nodesToBeVisited.includes(grid[row - 1][col]))
    neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1 && !nodesToBeVisited.includes(grid[row + 1][col]))
    neighbors.push(grid[row + 1][col]);
  if (col > 0 && !nodesToBeVisited.includes(grid[row][col - 1]))
    neighbors.push(grid[row][col - 1]);
  if (
    col < grid[0].length - 1 &&
    !nodesToBeVisited.includes(grid[row][col + 1])
  )
    neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

export {dijkstra, getNodesInShortestPathOrder};
