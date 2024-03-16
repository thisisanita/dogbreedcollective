import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import BreedDetailPage from "./pages/BreedDetailPage";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/breeds/:breedId" element={<BreedDetailPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
