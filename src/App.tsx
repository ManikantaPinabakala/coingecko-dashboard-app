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
      <nav className="mb-5">
        <Link to="/markets" className="mr-3">
          Markets
        </Link>
        <Link to="/trending">Trending</Link>
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
