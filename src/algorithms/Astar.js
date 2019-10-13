function Astar(grid, startNode, finishNode) {
  // primary function: return the visited nodes in an array
  // in the order they were visited
  // secondary function: prepare parameter for path finding

  // openSet contains nodes to be visited
  // closedSet contains nodes already visited (this is the array that gets returned for the visualization)
  var openSet = [];
  var closedSet = [];
  startNode.distance = 0;
  openSet.push(startNode);
  const dirs = [1, 0, -1, 0, 1];
  while (!!openSet.length) {
    openSet.sort((a, b) => a.fScore - b.fScore);
    const curNode = openSet.shift();
    if (curNode === finishNode) {
      return closedSet;
    } else {
      const {col, row} = curNode;
      curNode.isVisited = true;
      closedSet.push(curNode);
      var i = 0;
      var j = 1;
      while (j < dirs.length) {
        var x = col + dirs[i];
        var y = row + dirs[j];
        if (
          x < grid[0].length &&
          x >= 0 &&
          y < grid.length &&
          y >= 0 &&
          !grid[y][x].isVisited &&
          !grid[y][x].isWall
        ) {
          const contNode = grid[y][x];
          const tempDistance = curNode.distance + 1;
          if (tempDistance < contNode.distance) {
            // update distance and shortest path
            contNode.distance = tempDistance;
            contNode.previousNode = curNode;
            contNode.fScore =
              contNode.distance + heuristics(contNode, finishNode);
            if (!openSet.includes(contNode)) openSet.push(contNode);
          }
        }
        j++;
        i++;
      }
    }
  }
  // if the openSet is empty and end target has not been reached
  // there is no viable path
  return closedSet;
}

function heuristics(node, finishNode) {
  // this is a simple estimation of the euclidean distance
  // between the current node and the finish node
  const {col, row} = node;
  const fCol = finishNode.col;
  const fRow = finishNode.row;
  const comp1 = col - fCol;
  const comp2 = row - fRow;
  return Math.sqrt(Math.pow(comp1, 2) + Math.pow(comp2, 2));
}

export default Astar;
