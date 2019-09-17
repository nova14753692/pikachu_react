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

  // stack contains {row: index, column: index}
  const stack = [];

  // TODO: Optimize algorithm for difficulty level and guarantee path

  return cells;
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
 * @returns {boolean} True if left cell is in available, false otherwise
 */
function checkLeft(cell, cells) {
  return cell.column - 1 >= 0 && cells[cell.column - 1] > -1;
}

/**
 * Check right cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @returns {boolean} True if right cell is in available, false otherwise
 */
function checkRight(cell, cells) {
  return cell.column + 1 < cells[0].length >= 0 && cells[cell.column + 1] > -1;
}

/**
 * Check top cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @returns {boolean} True if top cell is in available, false otherwise
 */
function checkTop(cell, cells) {
  return cell.row - 1 >= 0 && cells[cell.row - 1] > -1;
}

/**
 * Check bottom cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @returns {boolean} True if bottom cell is in available, false otherwise
 */
function checkBottom(cell, cells) {
  return cell.row + 1 < cells.length && cells[cell.row + 1] > -1;
}

/**
 * Get left cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @returns {object} leftCell Left cell
 * @returns {object} leftCell.row Left cell row index
 * @returns {object} leftCell.column Left cell column index
 */
function getLeft(cell, cells) {
  return {
    row: cell.row,
    column: checkLeft(cell, cells) ? cell.column - 1 : null
  };
}

/**
 * Get right cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @returns {object} rightCell Right cell
 * @returns {object} rightCell.row Right cell row index
 * @returns {object} rightCell.column Right cell column index
 */
function getRight(cell, cells) {
  return {
    row: cell.row,
    column: checkRight(cell, cells) ? cell.column + 1 : null
  };
}

/**
 * Get top cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @returns {object} topCell Top cell
 * @returns {object} topCell.row Top cell row index
 * @returns {object} topCell.column Top cell column index
 */
function getTop(cell, cells) {
  return {
    row: checkTop(cell, cells) ? cell.row - 1 : null,
    column: cell.column
  };
}

/**
 * Get Bottom cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {Array.<number>} cells Cell array
 * @returns {object} BottomCell Bottom cell
 * @returns {object} BottomCell.row Bottom cell row index
 * @returns {object} BottomCell.column Bottom cell column index
 */
function getBottom(cell, cells) {
  return {
    row: checkBottom(cell, cells) ? cell.row + 1 : null,
    column: cell.column
  };
}

/**
 * Get all open adjacent cells from start cell
 * @param {object} start Starting cell
 * @param {object} start.row Starting cell row index
 * @param {object} start.column Starting cell column index
 * @param {Array.<number>} cells Cell array
 * @returns {Array.<number>} adjacentCells Adjacent cells
 */
function getAvailableAdjacentCells(start, cells) {
  const adjacentCells = [];
  if (checkLeft(start, cells)) {
    adjacentCells.push(getLeft(start, cells));
  }
  if (checkRight(start, cells)) {
    adjacentCells.push(getRight(start, cells));
  }
  if (checkTop(start, cells)) {
    adjacentCells.push(getTop(start, cells));
  }
  if (checkBottom(start, cells)) {
    adjacentCells.push(getBottom(start, cells));
  }
  return adjacentCells;
}

export function compareCells(cell1, cell2) {
  return cell1.row === cell2.row && cell1.column === cell2.column;
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
 * @returns {boolean} True if the path is valid, false otherwise
 */
export function findPath(start, end, cells) {
  //BFS algo
  const queue = [start];
  const discovered = [start];
  const path = [];
  while (queue.length > 0) {
    let currentCell = queue.shift();
    if (compareCells(currentCell, end)) {
      path.push(currentCell);
      return path;
    }
    const adjacentCells = getAvailableAdjacentCells(currentCell, cells);
    for (let i = 0; i < adjacentCells.length; i++) {
      if (discovered.some(cell => compareCells(cell, adjacentCells[i]))) {
        discovered.push(adjacentCells[i]);
        path.push(adjacentCells[i]);
        queue.push(adjacentCells[i]);
      }
    }
  }
  return path;
}
