import React from 'react';

import GameScene from './component/GameScene';

function App() {
  return (
    <div style={styles.root}>
      <GameScene />
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    minWidth: window.innerWidth,
    minHeight: window.innerHeight,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default App;
