import { useNavigate } from "react-router-dom";

export default function Frontpage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1>
      <button
        onClick={() => navigate("/mode", { state: { vsBot: false } })}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg"
      >
        VS Player
      </button>
      <button
        onClick={() => navigate("/mode", { state: { vsBot: true } })}
        className="bg-green-500 text-white px-6 py-3 rounded-lg"
      >
        VS Bot
      </button>
    </div>
  );
}
