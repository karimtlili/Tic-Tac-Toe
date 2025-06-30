import { GameProvider, useGameContext } from "../context/GameContext";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

function SingleBoard({ index, board, onMove }) {
  return (
    <div className="grid grid-cols-3 gap-1 bg-white p-4 rounded-2xl shadow-lg border-4 border-gray-200">
      {board.map((cell, i) => (
        <button
          key={i}
          onClick={() => !cell && onMove(index, i)}
          className="w-16 h-16 text-3xl font-bold rounded-xl bg-gray-50 hover:bg-gray-200 transition-colors duration-200 border-2 border-gray-300"
        >
          <span
            className={
              cell === "X"
                ? "text-red-500"
                : cell === "O"
                ? "text-blue-500"
                : ""
            }
          >
            {cell}
          </span>
        </button>
      ))}
    </div>
  );
}

function GameLogic() {
  const { player1, player2, vsBot } = useGameContext();
  const [boards, setBoards] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(9).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [wins, setWins] = useState({ X: 0, O: 0 });
  const [finishedBoards, setFinishedBoards] = useState(Array(3).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [isDraw, setIsDraw] = useState(false);

  const checkWin = (cells) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c])
        return cells[a];
    }
    return null;
  };

  const handleMove = (boardIndex, cellIndex) => {
    if (finishedBoards[boardIndex] || gameOver) return;

    const newBoards = boards.map((b, i) =>
      i === boardIndex ? [...b] : b.slice()
    );
    const board = newBoards[boardIndex];

    if (board[cellIndex]) return;

    board[cellIndex] = currentPlayer;
    const winner = checkWin(board);

    const newFinishedBoards = [...finishedBoards];
    if (winner) {
      newFinishedBoards[boardIndex] = winner;
      setWins((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    } else if (board.every((cell) => cell !== null)) {
      // Mark board as draw to prevent further moves
      newFinishedBoards[boardIndex] = "D"; // D for Draw
    }

    setBoards(newBoards);
    setFinishedBoards(newFinishedBoards);
    const newPlayer = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(newPlayer);
  };

  // Bot logic (Advanced)
  useEffect(() => {
    if (!vsBot || currentPlayer !== "O" || gameOver) return;

    const moveTimeout = setTimeout(() => {
      const availableMoves = [];

      boards.forEach((board, boardIndex) => {
        if (finishedBoards[boardIndex]) return;
        board.forEach((cell, cellIndex) => {
          if (!cell) availableMoves.push({ boardIndex, cellIndex });
        });
      });

      if (availableMoves.length > 0) {
        const randomMove =
          availableMoves[Math.floor(Math.random() * availableMoves.length)];
        handleMove(randomMove.boardIndex, randomMove.cellIndex);
      }
    }, 700); // slight delay for realism

    return () => clearTimeout(moveTimeout);
  }, [currentPlayer, vsBot, boards, finishedBoards, gameOver]);

  useEffect(() => {
    const xWins = wins["X"];
    const oWins = wins["O"];
    const allBoardsFinished = finishedBoards.every((b) => b !== null);

    if (xWins >= 2 || oWins >= 2) {
      setGameOver(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
    } else if (allBoardsFinished && xWins < 2 && oWins < 2) {
      setGameOver(true);
      setIsDraw(true);
    }
  }, [wins, finishedBoards]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-bold">Advanced Game</h2>
      <p>
        Player X: {player1} | Player O: {vsBot ? "Bot" : player2}
      </p>
      <p className="text-sm">Current Turn: {currentPlayer}</p>

      <div className="flex gap-4 flex-wrap justify-center">
        {boards.map((board, i) => (
          <div
            key={i}
            className={`rounded-xl p-1 transition-all duration-300 ${
              finishedBoards[i] === "X"
                ? "ring-4 ring-red-400"
                : finishedBoards[i] === "O"
                ? "ring-4 ring-blue-400"
                : finishedBoards[i] === "D"
                ? "ring-4 ring-gray-400"
                : "ring-2 ring-gray-200"
            }`}
          >
            <SingleBoard index={i} board={board} onMove={handleMove} />
          </div>
        ))}
      </div>

      {wins["X"] >= 2 && (
        <p className="text-green-600 text-xl">🎉 {player1} (X) wins the match!</p>
      )}
      {wins["O"] >= 2 && (
        <p className="text-blue-600 text-xl">
          🎉 {vsBot ? "Bot" : player2} (O) wins the match!
        </p>
      )}
      {isDraw && <p className="text-gray-600 text-xl">🤝 It's a draw!</p>}
    </div>
  );
}

export default function AdvancedGame({ player1, player2, vsBot }) {
  return (
    <GameProvider player1={player1} player2={player2} vsBot={vsBot}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <GameLogic />
      </div>
    </GameProvider>
  );
}
