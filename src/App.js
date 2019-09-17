import React from 'react';

import { GameSceneContextProvider } from './contexts/GameSceneContext';

import GameScene from './component/GameScene';


function App() {
  return (
    <GameSceneContextProvider>
      <div style={styles.root}>
        <GameScene />
      </div>
    </GameSceneContextProvider>
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
