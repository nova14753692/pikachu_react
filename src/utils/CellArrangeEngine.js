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

  // stack contains {row: index, column: index}
  const stack = [];

  // TODO: Optimize algorithm for difficulty level and guarantee path

  return cells;
}

/**
 * Check left cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @returns {boolean} True if left cell is in range, false otherwise
 */
function checkLeft(cell) {
  return cell.column - 1 >= 0;
}

/**
 * Check right cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {number} width Cell array number of columns
 * @returns {boolean} True if right cell is in range, false otherwise
 */
function checkRight(cell, width) {
  return cell.column + 1 < width >= 0;
}

/**
 * Check top cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @returns {boolean} True if top cell is in range, false otherwise
 */
function checkTop(cell) {
  return cell.row - 1 >= 0;
}

/**
 * Check bottom cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {number} height Cell array number of rows
 * @returns {boolean} True if bottom cell is in range, false otherwise
 */
function checkBottom(cell, height) {
  return cell.row + 1 < height;
}

/**
 * Get left cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @returns {object} leftCell Left cell
 * @returns {object} leftCell.row Left cell row index
 * @returns {object} leftCell.column Left cell column index
 */
function getLeft(cell) {
  return {
    row: cell.row,
    column: checkLeft(cell) ? cell.column - 1 : null
  };
}

/**
 * Get right cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {number} width Cell array number of columns
 * @returns {object} rightCell Right cell
 * @returns {object} rightCell.row Right cell row index
 * @returns {object} rightCell.column Right cell column index
 */
function getRight(cell, width) {
  return {
    row: cell.row,
    column: checkRight(cell, width) ? cell.column + 1 : null
  };
}

/**
 * Get top cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @returns {object} topCell Top cell
 * @returns {object} topCell.row Top cell row index
 * @returns {object} topCell.column Top cell column index
 */
function getTop(cell) {
  return {
    row: checkTop(cell) ? cell.row - 1 : null,
    column: cell.column
  };
}

/**
 * Get Bottom cell
 * @param {object} cell Cell
 * @param {object} cell.row Cell row index
 * @param {object} cell.column Cell column index
 * @param {number} height Cell array number of rows
 * @returns {object} BottomCell Bottom cell
 * @returns {object} BottomCell.row Bottom cell row index
 * @returns {object} BottomCell.column Bottom cell column index
 */
function getBottom(cell, height) {
  return {
    row: checkBottom(cell, height) ? cell.row + 1 : null,
    column: cell.column
  };
}

/**
 * Get all open direction from start cell
 * @param {object} start Starting cell
 * @param {object} start.row Starting cell row index
 * @param {object} start.column Starting cell column index
 * @param {Array.<number>} cells Cell name array
 */
function getStartDirections(start, cells) {
  const startDirections = [];
  if (checkLeft(start)) {
    startDirections.push(getLeft(start));
  }
  if (checkRight(start, cells[0].length)) {
    startDirections.push(getRight(start, cells[0].length));
  }
  if (checkTop(start)) {
    startDirections.push(getTop(start));
  }
  if (checkBottom(start, cells.length)) {
    startDirections.push(getBottom(start, cells.length));
  }
  return startDirections;
}

/**
 * Check if there is a path from start cell to destination cell
 * @param {object} start Starting cell
 * @param {object} start.row Starting cell row index
 * @param {object} start.column Starting cell column index
 * @param {object} end Destination cell
 * @param {object} end.row Destination cell row index 
 * @param {object} end.column Destination cell column index
 * @param {Array.<number>} cells Cell name array
 */
export function checkPath(start, end, cells) {
  const startDirections = getStartDirections(start, cells);
}
