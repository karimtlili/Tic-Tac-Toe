import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useState, useEffect } from 'react';

export default function ClassicSetup() {
  const navigate = useNavigate();
  const {
    vsBot,
    player1,
    player2,
    setPlayer1,
    setPlayer2,
  } = useGame();

  const [localP1, setLocalP1] = useState(player1);
  const [localP2, setLocalP2] = useState(vsBot ? 'Bot' : player2);

  useEffect(() => {
    if (vsBot) {
      setLocalP2('Bot');
      setPlayer2('Bot');
    }
  }, [vsBot, setPlayer2]);

  const startGame = () => {
    setPlayer1(localP1 || 'Player 1');
    setPlayer2(vsBot ? 'Bot' : localP2 || 'Player 2');
    navigate('/classic/game');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h2 className="text-3xl font-semibold mb-6">Enter Player Names</h2>

      <div className="space-y-3 w-72">
        <input
          type="text"
          placeholder="Player 1"
          value={localP1}
          onChange={(e) => setLocalP1(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder={vsBot ? "Bot" : "Player 2"}
          value={localP2}
          onChange={(e) => setLocalP2(e.target.value)}
          disabled={vsBot}
          className={`w-full px-4 py-2 rounded-xl border ${vsBot ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
        />
      </div>

      <button
        onClick={startGame}
        className="mt-6 w-60 py-3 bg-blue-600 text-white rounded-2xl text-lg hover:bg-blue-700 transition"
      >
        Start Game
      </button>

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
