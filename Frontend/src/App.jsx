import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing.jsx";   // Your main page
import Visu from "./components/visu.jsx";                 // Your visu.jsx component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/visualize" element={<Visu />} />
      </Routes>
    </Router>
  );
};

export default App;
