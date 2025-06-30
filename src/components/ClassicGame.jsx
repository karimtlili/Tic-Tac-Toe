import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

function QuitModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 max-w-full shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4">Quit the game?</h3>
        <div className="flex justify-around mt-6">
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
          >
            Keep playing
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClassicGame({ player1, player2, vsBot }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  const names = {
    X: player1 || "Player 1",
    O: vsBot ? "Bot" : player2 || "Player 2",
  };

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
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

  useEffect(() => {
    if (vsBot && currentPlayer === "O" && !winner) {
      const emptyIndexes = board
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);
      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      const timer = setTimeout(() => handleClick(randomIndex), 500);
      return () => clearTimeout(timer);
    }
  }, [board, currentPlayer, vsBot, winner]);

  useEffect(() => {
    if (winner === "X" || winner === "O") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const [showQuitModal, setShowQuitModal] = useState(false);

  const handleQuitClick = () => setShowQuitModal(true);
  const handleConfirmQuit = () => {
  setShowQuitModal(false);
  navigate("/");
  };
  const handleCancelQuit = () => setShowQuitModal(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4 p-4">
      {/* Quit button top right */}
      <button
        onClick={handleQuitClick}
        className="fixed top-4 right-4 text-4xl font-extrabold text-red-600 hover:text-red-800 transition cursor-pointer select-none z-50"
        title="Quit the game"
        aria-label="Quit the game"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold text-gray-800">Classic Game</h2>
      <p className="text-md">{names.X} (X) vs {names.O} (O)</p>
      {!winner && (
        <p className="text-sm text-gray-600">Current Turn: {currentPlayer}</p>
      )}

      {/* Stylish grid */}
      <div className="p-4 rounded-2xl shadow-lg bg-white border-4 border-gray-200">
        <div className="grid grid-cols-3 gap-1">
          {board.map((cell, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className="w-20 h-20 text-3xl font-bold rounded-xl bg-gray-50 hover:bg-gray-200 transition-colors duration-200 border-2 border-gray-300"
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
      </div>

      {/* Game result */}
      {winner && (
        <div className="mt-4 text-lg font-semibold text-green-600">
          {winner === "Draw"
            ? "🤝 It's a draw!"
            : `🎉 ${names[winner]} (${winner}) wins!`}
        </div>
      )}

      {/* Play Again */}
      {winner && (
        <button
          onClick={resetGame}
          className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition"
        >
          Play Again
        </button>
      )}
      {showQuitModal && (
        <QuitModal
          onConfirm={handleConfirmQuit}
          onCancel={handleCancelQuit}
        />
      )}

    </div>
  );
}
