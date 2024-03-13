import React from "react";
import BreedDetailPage from "./pages/BreedDetailPage";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/breeds/:breedid" element={<BreedDetailPage />} />
    </Routes>
  );
}

export default App;
