import { useEffect, useState } from "react";

export default function ClassicGame({ player1, player2, vsBot }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const names = {
    X: player1 || "Player 1",
    O: vsBot ? "Bot" : player2 || "Player 2",
  };

  const checkWinner = (b) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];
    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[b1] === b[c]) {
        return b[a];
      }
    }
    return b.includes(null) ? null : "Draw";
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result) setWinner(result);
    else setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  // Bot logic
  useEffect(() => {
    if (vsBot && currentPlayer === "O" && !winner) {
      const emptyIndexes = board
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);
      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      const timer = setTimeout(() => {
        handleClick(randomIndex);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, currentPlayer, vsBot, winner]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4 p-4">
      <h2 className="text-2xl font-bold text-gray-800">Classic Game</h2>
      <p className="text-md">Player X: {names.X} | Player O: {names.O}</p>
      <p className="text-sm text-gray-600">Current Turn: {currentPlayer}</p>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="w-20 h-20 text-2xl font-bold border bg-white hover:bg-gray-100"
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <div className="mt-4 text-lg font-semibold text-green-600">
          {winner === "Draw"
            ? "It's a draw!"
            : `🎉 ${names[winner]} (${winner}) wins!`}
        </div>
      )}
    </div>
  );
}
