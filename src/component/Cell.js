import React, { useContext } from 'react';

import { GameSceneContext } from '../contexts/GameSceneContext';

import { cellSize } from '../utils/Utils';
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
    if (props.name < 0) {
      return 'transparent';
    }
    return Colors.orange;
  }

  return (
    <div style={{
      ...styles.root,
      backgroundColor: getBackgroundColor(),
      border: `${props.name < 0 ? 0 : 1}px solid white`
    }}
    >
      <img style={styles.cellImg} src={props.name >= 0 ? require('../assets/cell_icons/' + props.name + '.png') : null} />
    </div>
  );
}

Cell.defaultProps = {
  name: '0'
};

const styles = {
  root: {
    maxWidth: cellSize.width,
    maxHeight: cellSize.height,
    width: cellSize.width,
    height: cellSize.height,
    boxSizing: 'border-box'
  },
  cellImg: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
};

export default Cell;
