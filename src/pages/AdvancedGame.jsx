import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const emptyBoard = Array(9).fill(null);

function checkWinner(board) {
  for (const [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (!board.includes(null)) return 'Draw';
  return null;
}

export default function AdvancedGame() {
  const navigate = useNavigate();
  const { player1, player2, vsBot } = useGame();

  const [boards, setBoards] = useState([emptyBoard.slice(), emptyBoard.slice(), emptyBoard.slice()]);
  const [isXTurn, setIsXTurn] = useState(true);
  const [boardWinners, setBoardWinners] = useState([null, null, null]);
  const [gameWinner, setGameWinner] = useState(null);

  const currentPlayer = isXTurn ? player1 : player2;

  const countWins = (symbol) =>
    boardWinners.filter((w) => w === symbol).length;

  const updateGameStatus = (newBoardStates) => {
    const updatedWinners = newBoardStates.map((b) => checkWinner(b));
    setBoardWinners(updatedWinners);

    const xWins = countWins('X');
    const oWins = countWins('O');

    if (xWins >= 2) setGameWinner('X');
    else if (oWins >= 2) setGameWinner('O');
  };

  const handleMove = (boardIndex, cellIndex) => {
    if (gameWinner || boardWinners[boardIndex] || boards[boardIndex][cellIndex]) return;

    const newBoards = boards.map((b, idx) => {
      if (idx !== boardIndex) return b;
      const newBoard = [...b];
      newBoard[cellIndex] = isXTurn ? 'X' : 'O';
      return newBoard;
    });

    setBoards(newBoards);
    setIsXTurn(!isXTurn);
    updateGameStatus(newBoards);
  };

  // Basic bot logic: pick first available spot on any active board
  const botPlay = () => {
    for (let b = 0; b < 3; b++) {
      if (boardWinners[b]) continue;
      const available = boards[b].map((val, i) => (val === null ? i : null)).filter((i) => i !== null);
      if (available.length > 0) {
        const randomIndex = available[Math.floor(Math.random() * available.length)];
        handleMove(b, randomIndex);
        break;
      }
    }
  };

  useEffect(() => {
    if (vsBot && !isXTurn && !gameWinner) {
      const timeout = setTimeout(botPlay, 500);
      return () => clearTimeout(timeout);
    }
  }, [isXTurn, boards, gameWinner]);

  const restart = () => {
    setBoards([emptyBoard.slice(), emptyBoard.slice(), emptyBoard.slice()]);
    setIsXTurn(true);
    setBoardWinners([null, null, null]);
    setGameWinner(null);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-bold mb-2">
        {gameWinner
          ? `${gameWinner === 'X' ? player1 : player2} Wins the Match!`
          : `Turn: ${currentPlayer} (${isXTurn ? 'X' : 'O'})`}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {boards.map((board, boardIndex) => (
          <div key={boardIndex} className="space-y-2">
            <div className="text-lg font-semibold">
              {boardWinners[boardIndex]
                ? boardWinners[boardIndex] === 'Draw'
                  ? 'Draw'
                  : `${boardWinners[boardIndex]} wins`
                : `Board ${boardIndex + 1}`}
            </div>
            <div className="grid grid-cols-3 gap-1">
              {board.map((cell, cellIndex) => (
                <button
                  key={cellIndex}
                  onClick={() => handleMove(boardIndex, cellIndex)}
                  className="w-16 h-16 text-2xl font-bold bg-white border border-gray-400 rounded-md hover:bg-gray-100"
                >
                  {cell}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {gameWinner && (
        <button
          onClick={restart}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
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
