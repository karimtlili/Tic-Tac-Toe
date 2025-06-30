import { useNavigate, useLocation } from "react-router-dom";

export default function Mode() {
  const navigate = useNavigate();
  const location = useLocation();
  const vsBot = location.state?.vsBot ?? false;

  const goTo = (mode) => {
    navigate(`/${mode}`, { state: { vsBot } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Choose Game Mode</h2>
      <button onClick={() => goTo("classic")} className="bg-purple-500 text-white px-6 py-3 rounded-lg">
        Classic
      </button>
      <button onClick={() => goTo("advanced")} className="bg-yellow-500 text-white px-6 py-3 rounded-lg">
        Advanced
      </button>
      <button onClick={() => navigate("/")} className="fixed top-4 right-4 text-4xl font-extrabold text-red-600 hover:text-red-800 transition cursor-pointer select-none z-50">
        ×
      </button>
    </div>
  );
}
