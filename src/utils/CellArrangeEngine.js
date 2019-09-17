function getCellArray(width, height) {
  const cells = [];
  for (let i = 0; i < height; i++) {
    cells.push([]);
    for (let j = 0; j < width; j++) {
      cells[i].push(Math.floor(Math.random() * 16));
    }
  }

  // stack contains {row: index, column: index}
  const stack = [];

  // TODO: Optimize algorithm for difficulty level and guarantee path

  return cells;
}

export default getCellArray;
