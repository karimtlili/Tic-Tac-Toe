import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function Frontpage() {
  const navigate = useNavigate();
  const { setVsBot } = useGame();

  const handleModeSelect = (bot) => {
    setVsBot(bot);
    navigate('/mode');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>

      <button
        onClick={() => handleModeSelect(false)}
        className="w-60 py-3 bg-blue-500 text-white text-xl rounded-2xl shadow hover:bg-blue-600 transition"
      >
        VS Player
      </button>

      <button
        onClick={() => handleModeSelect(true)}
        className="w-60 py-3 bg-green-500 text-white text-xl rounded-2xl shadow hover:bg-green-600 transition"
      >
        VS Bot
      </button>

    </div>
  );
}
