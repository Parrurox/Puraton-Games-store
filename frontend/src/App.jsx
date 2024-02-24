import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowGames from "./pages/ShowGames";
import EditGames from "./pages/EditGames";
import CreateGames from "./pages/CreateGames";
import DeleteGames from "./pages/DeleteGames";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/create" element={<CreateGames />} />
      <Route path="/games/details/:id" element={<ShowGames />} />
      <Route path="/games/edit/:id" element={<EditGames />} />
      <Route path="/games/delete/:id" element={<DeleteGames />} />
    </Routes>
  );
};

export default App;
