import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./pages/Frontpage";
import Mode from "./pages/Mode";
import Classic from "./pages/Classic";
import Advanced from "./pages/Advanced";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/mode" element={<Mode />} />
        <Route path="/classic" element={<Classic />} />
        <Route path="/advanced" element={<Advanced />} />
      </Routes>
    </Router>
  );
}
