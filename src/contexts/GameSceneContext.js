import React, { useState } from 'react';

import { getCellArray } from '../utils/CellArrangeEngine';


const GameSceneContext = React.createContext([{}, () => { }]);

const GameSceneContextProvider = (props) => {
  const [state, setState] = useState({
    selections: [],
    cellNameArray: getCellArray(16, 8),
    path: [],
  });

  return (
    <GameSceneContext.Provider value={[state, setState]}>
      {props.children}
    </GameSceneContext.Provider>
  );
}

export { GameSceneContext, GameSceneContextProvider };
