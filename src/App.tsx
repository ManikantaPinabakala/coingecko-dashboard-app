import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Markets from "./pages/Markets";
import Trending from "./pages/Trending";

import "./App.css";

function App() {
  return (
    <Router>
      <nav className="flex justify-center items-center space-x-8 p-4 bg-gray-100 rounded-lg shadow-sm">
        <Link
          to="/markets"
          className="text-lg text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Markets
        </Link>
        <Link
          to="/trending"
          className="text-lg text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Trending
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/markets" replace />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </Router>
  );
}

export default App;
