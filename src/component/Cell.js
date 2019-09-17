import React, { useContext } from 'react';

import { GameSceneContext } from '../contexts/GameSceneContext';

import { gameSceneSize } from '../utils/Utils';
import { findPath, compareCells } from '../utils/CellArrangeEngine';
import Colors from '../utils/Colors';

/**
 * Cell component
 * @param {object} props Cell props
 * @param {object} props.name Cell name
 * @param {object} props.cellInfo Cell info
 */
function Cell(props) {
  const [context, setContext] = useContext(GameSceneContext);

  function getBackgroundColor() {
    if (props.cellInfo != null && context.selections.some(cell => compareCells(props.cellInfo, cell))) {
      return Colors.lighterOrange;
    }
    return Colors.orange;
  }

  function cellClickHandler() {
    if (props.cellInfo != null) {
      if (context.selections.length < 1) {
        context.selections.push(props.cellInfo);
        setContext({
          ...context,
          selections: context.selections
        });
      } else if (context.selections.length < 2) {
        context.selections.push(props.cellInfo);
        const start = context.selections[0];
        const end = context.selections[1];
        const path = findPath(start, end, context.cellNameArray);
        if (path.length > 0) {
          context.cellNameArray[start.row][start.column] = -1;
          context.cellNameArray[end.row][end.column] = -1;
          setContext({
            ...context,
            cellNameArray: context.cellNameArray
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
    <div
      style={{ ...styles.root, backgroundColor: getBackgroundColor() }}
      onClick={cellClickHandler}
    >
      <img style={styles.cellImg} src={require('../assets/cell_icons/' + props.name + '.png')} />
    </div>
  );
}

Cell.defaultProps = {
  name: '0'
};

const styles = {
  root: {
    width: gameSceneSize.width / 16,
    height: gameSceneSize.height / 8,
    border: '1px solid white',
    boxSizing: 'border-box'
  },
  cellImg: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
};

export default Cell;
