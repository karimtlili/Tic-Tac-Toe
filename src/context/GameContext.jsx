import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children, player1, player2, vsBot }) {
  const [scores, setScores] = useState({ [player1]: 0, [player2]: 0 });

  return (
    <GameContext.Provider value={{ player1, player2, vsBot, scores, setScores }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
