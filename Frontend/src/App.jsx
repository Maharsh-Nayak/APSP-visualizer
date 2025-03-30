import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing.jsx";   // Your main page
import Visu from "./components/visu.jsx";                 // Your visu.jsx component
import FB from "./components/feedback.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/visualize" element={<Visu />} />
        <Route path="/feedback" element={<FB />} />
      </Routes>
    </Router>
  );
};

export default App;
