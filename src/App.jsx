import { Routes, Route } from 'react-router-dom';
import Frontpage from './pages/Frontpage.jsx';
import ModePage from './pages/ModePage.jsx';
import ClassicSetup from './pages/ClassicSetup.jsx';
import ClassicGame from './pages/ClassicGame.jsx';
import AdvancedGame from './pages/AdvancedGame.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-center p-4">
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/mode" element={<ModePage />} />
        <Route path="/classic/setup" element={<ClassicSetup />} />
        <Route path="/classic/game" element={<ClassicGame />} />
        <Route path="/advanced" element={<AdvancedGame />} />
      </Routes>
    </div>
  );
}
