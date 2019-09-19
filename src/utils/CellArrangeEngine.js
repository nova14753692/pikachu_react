export function getCellArray(width, height, wrapArray = true) {
  const cells = [];
  height += wrapArray ? 2 : 0;
  width += wrapArray ? 2 : 0;
  for (let i = 0; i < height; i++) {
    if (wrapArray && i === 0) {
      cells.push(Array(width).fill(-1));
    } else {
      cells.push([]);
      for (let j = 0; j < width; j++) {
        if (wrapArray && j === 0) {
          cells[i].push(-1);
        } else {
          cells[i].push(Math.floor(Math.random() * 24));
        }
      }
    }
  }
  if (wrapArray) {
    cells[height - 1] = Array(width).fill(-1);
    for (let i = 1; i < height - 1; i++) {
      cells[i][width - 1] = -1;
    }
  }

  // TODO: Optimize algorithm for difficulty level and guarantee path

  return cells;
}

export const Direction = {
  Left: 'Left',
  Right: 'Right',
  Up: 'Up',
  Down: 'Down'
};

export function getDirection(currentCellIndex, path) {
  const currentCell = path[currentCellIndex];
  const prevCell = path[currentCellIndex + 1] == null ? currentCell : path[currentCellIndex + 1];
  const nextCell = path[currentCellIndex - 1] == null ? currentCell : path[currentCellIndex - 1];
  const compareCells = [prevCell, nextCell];
  const directions = [];
  for (let i = 0; i < compareCells.length; i++) {
    if (currentCell.column - 1 === compareCells[i].column) {
      directions.push(Direction.Left);
    } else if (currentCell.column + 1 === compareCells[i].column) {
      directions.push(Direction.Right);
    } else if (currentCell.row - 1 === compareCells[i].row) {
      directions.push(Direction.Up);
    } else if (currentCell.row + 1 === compareCells[i].row) {
      directions.push(Direction.Down);
    }
  }
  return directions;
}

export function getCell(row, column) {
  return { row, column };
}

/**
 * Check left cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @param {number} compareValue Cell value
 * @returns {boolean} True if left cell is in available, false otherwise
 */
function checkLeft(cell, cells, compareValue) {
  return cell.column - 1 >= 0 && (cells[cell.row][cell.column - 1] < 0 ||
    cells[cell.row][cell.column - 1] === compareValue);
}

/**
 * Check right cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @param {number} compareValue Cell value
 * @returns {boolean} True if right cell is in available, false otherwise
 */
function checkRight(cell, cells, compareValue) {
  return cell.column + 1 < cells[0].length && (cells[cell.row][cell.column + 1] < 0 ||
    cells[cell.row][cell.column + 1] === compareValue);
}

/**
 * Check top cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @param {number} compareValue Cell value
 * @returns {boolean} True if top cell is in available, false otherwise
 */
function checkTop(cell, cells, compareValue) {
  return cell.row - 1 >= 0 && (cells[cell.row - 1][cell.column] < 0 ||
    cells[cell.row - 1][cell.column] === compareValue);
}

/**
 * Check bottom cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @param {number} compareValue Cell value
 * @returns {boolean} True if bottom cell is in available, false otherwise
 */
function checkBottom(cell, cells, compareValue) {
  return cell.row + 1 < cells.length && (cells[cell.row + 1][cell.column] < 0 ||
    cells[cell.row + 1][cell.column] === compareValue);
}

/**
 * Get left cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @param {number} compareValue Cell value
 * @returns {object} leftCell Left cell
 * @returns {object} leftCell.row Left cell row index
 * @returns {object} leftCell.column Left cell column index
 */
function getLeft(cell, cells, compareValue) {
  return {
    row: cell.row,
    column: checkLeft(cell, cells, compareValue) ? cell.column - 1 : null
  };
}

/**
 * Get right cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @param {number} compareValue Cell value
 * @returns {object} rightCell Right cell
 * @returns {object} rightCell.row Right cell row index
 * @returns {object} rightCell.column Right cell column index
 */
function getRight(cell, cells, compareValue) {
  return {
    row: cell.row,
    column: checkRight(cell, cells, compareValue) ? cell.column + 1 : null
  };
}

/**
 * Get top cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @param {number} compareValue Cell value
 * @returns {object} topCell Top cell
 * @returns {object} topCell.row Top cell row index
 * @returns {object} topCell.column Top cell column index
 */
function getTop(cell, cells, compareValue) {
  return {
    row: checkTop(cell, cells, compareValue) ? cell.row - 1 : null,
    column: cell.column
  };
}

/**
 * Get Bottom cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @param {number} compareValue Cell value
 * @returns {object} BottomCell Bottom cell
 * @returns {object} BottomCell.row Bottom cell row index
 * @returns {object} BottomCell.column Bottom cell column index
 */
function getBottom(cell, cells, compareValue) {
  return {
    row: checkBottom(cell, cells, compareValue) ? cell.row + 1 : null,
    column: cell.column
  };
}

/**
 * Get all open adjacent cells from start cell
 * @param {object} start Starting cell
 * @param {object} start.row Starting cell row index
 * @param {object} start.column Starting cell column index
 * @param {Array.<number>} cells Cell array
 * @param {number} compareValue Cell value
 * @returns {Array.<number>} adjacentCells Adjacent cells
 */
function getAvailableAdjacentCells(start, cells, compareValue) {
  const adjacentCells = [];
  if (checkLeft(start, cells, compareValue)) {
    adjacentCells.push(getLeft(start, cells, compareValue));
  }
  if (checkRight(start, cells, compareValue)) {
    adjacentCells.push(getRight(start, cells, compareValue));
  }
  if (checkTop(start, cells, compareValue)) {
    adjacentCells.push(getTop(start, cells, compareValue));
  }
  if (checkBottom(start, cells, compareValue)) {
    adjacentCells.push(getBottom(start, cells, compareValue));
  }
  return adjacentCells;
}

export function compareCells(cell1, cell2) {
  return cell1.row === cell2.row && cell1.column === cell2.column;
}

export function containsCells(cell, path) {
  return path.some(c => compareCells(c, cell));
}

export function findCellIndex(cell, path) {
  return path.findIndex(c => compareCells(c, cell));
}

export function countTurnSteps(path) {
  
}

/**
 * Find a path from start cell to destination cell
 * @param {object} start Starting cell
 * @param {object} start.row Starting cell row index
 * @param {object} start.column Starting cell column index
 * @param {object} end Destination cell
 * @param {object} end.row Destination cell row index 
 * @param {object} end.column Destination cell column index
 * @param {Array.<number>} cells Cell name array
 * @param {boolean} reverse Return path is reverse if True, False otherwise
 * @param {number} limitStep Limit number of turn steps allow
 * @returns {boolean} True if the path is valid, false otherwise
 */
export function findPath(start, end, cells, reverse = false, limitStep = 3) {
  function findMin(dist, q) {
    let u = null;
    let min = Number.MAX_VALUE;
    for (let i = 0; i < q.length; i++) {
      if (dist[q[i].row][q[i].column] < min) {
        min = dist[q[i].row][q[i].column];
        u = {
          row: q[i].row,
          column: q[i].column,
          index: i
        };
      }
    }
    return u;
  }

  //Dijkstra algo
  function dijkstra() {
    const q = [];
    const prev = [];
    const dist = [];
    for (let i = 0; i < cells.length; i++) {
      dist.push([]);
      prev.push([]);
      for (let j = 0; j < cells[0].length; j++) {
        dist[i][j] = Number.MAX_VALUE - 1;
        prev[i][j] = null;
        q.push({ row: i, column: j });
      }
    }
    dist[start.row][start.column] = 0;
    while (q.length > 0) {
      let u = findMin(dist, q);
      u = u == null ? start : u;
      if (compareCells(u, end)) {
        break;
      }
      q.splice(u.index, 1);
      const neighbors = getAvailableAdjacentCells(u, cells, cells[start.row][start.column]);
      for (let i = 0; i < neighbors.length; i++) {
        const v = neighbors[i];
        if (q.some(cell => compareCells(v, cell))) {
          const alt = dist[u.row][u.column] + 1;
          if (alt < dist[v.row][v.column]) {
            dist[v.row][v.column] = alt;
            prev[v.row][v.column] = u;
          }
        }
      }
    }
    return { dist, prev };
  }

  const path = [];
  const result = dijkstra();
  let u = end;
  if (result.prev[u.row][u.column] != null || compareCells(u, start)) {
    while (u != null) {
      path.push(u);
      u = result.prev[u.row][u.column];
    }
  }

  return path;
}
