import React from 'react';

import { gameSceneSize } from '../utils/Utils';

import Cell from './Cell';


function GameScene() {
  function createCellRowwidth(width) {
    return Array(width).fill(<Cell />);
  }

  function createCellArray(height) {
    return Array(height).fill(
      <div style={styles.cellRow}>
        {createCellRowwidth(16)}
      </div>
    );
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
