import React from 'react';

import { gameSceneSize } from '../utils/Utils';

/**
 * Cell component
 * @param {object} props Cell props
 * @param {object} props.name Cell name
 */
function Cell(props) {
  return (
    <div style={styles.root}>
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
    backgroundColor: 'orange',
    border: '1px solid white',
    boxSizing: 'border-box'
  },
  cellImg: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
};

export default Cell;
