import React, {useContext} from 'react';

import { GameSceneContext } from '../contexts/GameSceneContext';

import { gameSceneSize } from '../utils/Utils';
import { getCell } from '../utils/CellArrangeEngine';

import Cell from './Cell';
import PathCell from './PathCell';


function GameScene() {
  const [context, setContext] = useContext(GameSceneContext);

  function createCellRowWidth(rowIndex, width) {
    const row = [];
    for (let i = 0; i < width + 2; i++) {
      row.push(<Cell name={context.cellNameArray[rowIndex][i]} cellInfo={getCell(rowIndex, i)} />);
    }
    return row;
  }

  function createCellArray(height) {
    const cellArray = [];
    for (let i = 0; i < height + 2; i++) {
      cellArray.push(
        <div style={styles.cellRow}>
          {createCellRowWidth(i, 16)}
        </div>
      );
    }
    return cellArray;
  }

  function createPathCellRowWidth(rowIndex, width) {
    const row = [];
    for (let i = 0; i < width + 2; i++) {
      row.push(<PathCell cellInfo={getCell(rowIndex, i)} />);
    }
    return row;
  }

  function createPathCellArray(height) {
    const cellArray = [];
    for (let i = 0; i < height + 2; i++) {
      cellArray.push(
        <div style={styles.cellRow}>
          {createPathCellRowWidth(i, 16)}
        </div>
      );
    }
    return cellArray;
  }

  return (
      <div style={styles.root}>
        {createCellArray(8)}
        {createPathCellArray(8)}
      </div>
  );
}

const styles = {
  root: {
    width: gameSceneSize.width,
    height: gameSceneSize.height,
    backgroundColor: 'black',
    border: '2px solid white',
    position: 'relative',
    display: 'table'
  },
  cellRow: {
    display: 'flex',
  }
};

export default GameScene;
