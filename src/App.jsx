import React from "react";
import BreedDetailPage from "./pages/BreedDetailPage";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/breeds/:breedId" element={<BreedDetailPage />} />
    </Routes>
  );
}

export default App;
