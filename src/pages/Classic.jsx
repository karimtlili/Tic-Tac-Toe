import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClassicGame from "../components/ClassicGame";

export default function Classic() {
  const navigate = useNavigate();
  const location = useLocation();
  const vsBot = location.state?.vsBot ?? false;

  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState(vsBot ? "Bot" : "");
  const [started, setStarted] = useState(false);

  const handleStart = () => setStarted(true);
  const handleBack = () => navigate("/mode");

  if (started) {
    return (
      <ClassicGame
        player1={player1Name || "Player 1"}
        player2={player2Name || (vsBot ? "Bot" : "Player 2")}
        vsBot={vsBot}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 relative">
        <button
          onClick={handleBack}
          className="absolute top-4 right-4 text-red-500 text-xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Classic Mode</h2>
        <div className="mb-6">
          <label className="block mb-2">Player 1</label>
          <input
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2">{vsBot ? "Bot" : "Player 2"}</label>
          <input
            value={player2Name}
            disabled={vsBot}
            onChange={(e) => setPlayer2Name(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>
        <button
          onClick={handleStart}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Start
        </button>
      </div>
    </div>
  );
}
