import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

export default function ClassicGame() {
  const navigate = useNavigate();
  const { player1, player2, vsBot } = useGame();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const currentPlayer = isXTurn ? player1 : player2;

  // Basic Bot: picks first available square
  const botMove = () => {
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);
    if (emptyIndices.length === 0) return;
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    handleClick(randomIndex);
  };

  const checkWinner = (newBoard) => {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    if (!newBoard.includes(null)) return 'Draw';
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  useEffect(() => {
    if (vsBot && !isXTurn && !winner) {
      setTimeout(botMove, 500);
    }
  }, [isXTurn, vsBot, board, winner]);

  const restart = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h2 className="text-2xl font-bold">
        {winner ? (
          winner === 'Draw' ? 'It\'s a Draw!' : `${winner === 'X' ? player1 : player2} Wins!`
        ) : (
          `Turn: ${currentPlayer} (${isXTurn ? 'X' : 'O'})`
        )}
      </h2>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="w-20 h-20 text-3xl font-bold bg-white border border-gray-400 rounded-xl hover:bg-gray-100"
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <button
          onClick={restart}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Play Again
        </button>
      )}

      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700"
        title="Exit to Home"
      >
        X
      </button>
    </div>
  );
}
