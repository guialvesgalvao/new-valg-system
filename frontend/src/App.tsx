import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Header } from "./components/Header";

export default function App() {
  return (
    <div>
        <Router>
      <Header />
      <div style={{height: "90vh"}} className="appBody">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </div>
        </Router>
    </div>
  );
}
