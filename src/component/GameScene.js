import React from 'react';

import { gameSceneSize } from '../utils/Utils';
import { getCellArray, checkPath } from '../utils/CellArrangeEngine';

import Cell from './Cell';


function GameScene() {
  const cellNameArray = getCellArray(16, 8);

  function createCellRowwidth(rowIndex, width) {
    const row = [];
    for (let i = 1; i < width + 1; i++) {
      row.push(<Cell name={cellNameArray[rowIndex][i]} />);
    }
    return row;
  }

  function createCellArray(height) {
    const cellArray = [];
    for (let i = 1; i < height + 1; i++) {
      cellArray.push(
        <div style={styles.cellRow}>
          {createCellRowwidth(i, 16)}
        </div>
      );
    }
    return cellArray;
  }

  return (
    <div style={styles.root}>
      {createCellArray(8)}
    </div>
  );
}

const styles = {
  root: {
    width: gameSceneSize.width,
    height: gameSceneSize.height,
    backgroundColor: 'black',
    border: '2px solid white',
  },
  cellRow: {
    display: 'flex',
  }
};

export default GameScene;
