import { useNavigate } from 'react-router-dom';

export default function ModePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h2 className="text-3xl font-semibold mb-8">Choose Game Mode</h2>

      <button
        onClick={() => navigate('/classic/setup')}
        className="w-60 py-3 bg-purple-500 text-white text-xl rounded-2xl shadow hover:bg-purple-600 transition"
      >
        Classic
      </button>

      <button
        onClick={() => navigate('/advanced')}
        className="w-60 py-3 bg-orange-500 text-white text-xl rounded-2xl shadow hover:bg-orange-600 transition"
      >
        Advanced
      </button>

      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700"
        title="Back to Home"
      >
        ⟲
      </button>
    </div>
  );
}
