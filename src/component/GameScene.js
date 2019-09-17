import React, {useContext} from 'react';

import { GameSceneContext } from '../contexts/GameSceneContext';

import { gameSceneSize } from '../utils/Utils';
import { getCell } from '../utils/CellArrangeEngine';

import Cell from './Cell';


function GameScene() {
  const [context, setContext] = useContext(GameSceneContext);

  function createCellRowwidth(rowIndex, width) {
    const row = [];
    for (let i = 1; i < width + 1; i++) {
      row.push(<Cell name={context.cellNameArray[rowIndex][i]} cellInfo={getCell(rowIndex, i)} />);
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
