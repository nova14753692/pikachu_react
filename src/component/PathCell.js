import React, { useContext } from 'react';

import { GameSceneContext } from '../contexts/GameSceneContext';

import { gameSceneSize } from '../utils/Utils';
import { Direction, compareCells, getDirection } from '../utils/CellArrangeEngine';
import Colors from '../utils/Colors';

/**
 * Cell component
 * @param {object} props Cell props
 * @param {object} props.cellInfo Cell info
 */
function PathCell(props) {
  const [context, setContext] = useContext(GameSceneContext);

  function createPath() {
    const strokeWidth = 5;
    const strokeColor = 'green';
    switch (getPathDirection()) {
      case Direction.Right:
        return (
          <svg viewBox="0 0 100 100">
            <line x1="50"
              y1={50 - strokeWidth / 2}
              x2="100"
              y2={50 - strokeWidth / 2}
              stroke={strokeColor}
              strokeWidth={strokeWidth} />
          </svg>
        );
      case Direction.Up:
        return (
          <svg viewBox="0 0 100 100">
            <line x1={50 - strokeWidth / 2}
              y1="50"
              x2={50 - strokeWidth / 2}
              y2="0"
              stroke={strokeColor}
              strokeWidth={strokeWidth} />
          </svg>
        );
      case Direction.Down:
        return (
          <svg viewBox="0 0 100 100">
            <line x1={50 - strokeWidth / 2}
              y1="50"
              x2={50 - strokeWidth / 2}
              y2="0"
              stroke={strokeColor}
              strokeWidth={strokeWidth} />
          </svg>
        );
      case Direction.Left:
        return (
          <svg viewBox="0 0 100 100">
            <line x1="50"
              y1={50 - strokeWidth / 2}
              x2="0"
              y2={50 - strokeWidth / 2}
              stroke={strokeColor}
              strokeWidth={strokeWidth} />
          </svg>
        );
      default:
        return null;
    }
  }

  function getPathDirection() {
    if (props.cellInfo != null) {
      for (let i = 0; i < context.path.length; i++) {
        if (compareCells(props.cellInfo, context.path[i])) {
          return getDirection(props.cellInfo, context.path[i]);
        }
      }
    }
    return null;
  }

  return (
    <div style={styles.root}>
      {createPath()}
    </div>
  );
}

const styles = {
  root: {
    top: -1,
    left: -1,
    width: gameSceneSize.width / 16 + 1,
    height: gameSceneSize.height / 8 + 1,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
};

export default PathCell;
