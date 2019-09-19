import React, { useContext } from 'react';

import { GameSceneContext } from '../contexts/GameSceneContext';

import { cellSize } from '../utils/Utils';
import { Direction, getDirection, findPath, findCellIndex } from '../utils/CellArrangeEngine';
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
    const lines = [];
    if (props.cellInfo != null) {
      const cellIndex = findCellIndex(props.cellInfo, context.path);
      if (cellIndex >= 0) {
        getDirection(cellIndex, context.path).forEach(direction => {
          switch (direction) {
            case Direction.Right:
              lines.push(<line x1={50 - strokeWidth / 2}
                y1={50}
                x2="100"
                y2={50}
                stroke={strokeColor}
                strokeWidth={strokeWidth} />
              );
              break;
            case Direction.Up:
              lines.push(<line x1={50}
                y1={50}
                x2={50}
                y2="0"
                stroke={strokeColor}
                strokeWidth={strokeWidth} />
              );
              break;
            case Direction.Down:
              lines.push(<line x1={50}
                y1={50}
                x2={50}
                y2="100"
                stroke={strokeColor}
                strokeWidth={strokeWidth} />
              );
              break;
            default:
              lines.push(<line x1={50 + strokeWidth / 2}
                y1={50}
                x2="0"
                y2={50}
                stroke={strokeColor}
                strokeWidth={strokeWidth} />
              );
          }
        });
        return (
          <svg viewBox="0 0 100 100">
            {lines}
          </svg>
        );
      }
    }
    return null;
  }

  function getPathCellPosition() {
    if (props.cellInfo != null) {
      return {
        top: props.cellInfo.row * cellSize.width,
        left: props.cellInfo.column * cellSize.height
      };
    }
    return {
      top: 0,
      left: 0
    };
  }

  function cellClickHandler() {
    if (props.cellInfo != null && context.cellNameArray[props.cellInfo.row][props.cellInfo.column] >= 0) {
      if (context.selections.length < 1) {
        context.selections.push(props.cellInfo);
        setContext({
          ...context,
          selections: context.selections,
          path: []
        });
      } else if (context.selections.length < 2) {
        context.selections.push(props.cellInfo);
        const start = context.selections[0];
        const end = context.selections[1];
        const path = findPath(start, end, context.cellNameArray);
        if (path.length > 1) {
          context.cellNameArray[start.row][start.column] = -1;
          context.cellNameArray[end.row][end.column] = -1;
          setContext({
            ...context,
            cellNameArray: context.cellNameArray,
            selections: [],
            path,
          });
        } else {
          setContext({
            ...context,
            selections: []
          });
        }
      }
    }
  }

  return (
    <div style={{ ...styles.root, ...getPathCellPosition() }}
      onClick={cellClickHandler}
    >
      {createPath()}
    </div>
  );
}

const styles = {
  root: {
    width: cellSize.width,
    height: cellSize.height,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
};

export default PathCell;
