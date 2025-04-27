import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Pokelist from "./pages/Pokelist/Pokelist.tsx";
import App from "./pages/Tictactoe/App.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetailPage from "./pages/PokemonDetails/PokemonDetail.tsx";
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Pokelist />} />
                <Route path="/tictactoe" element={<App />} />
                <Route path="/pokemon/:index" element={<PokemonDetailPage />} />
            </Routes>
        </Router>
    </React.StrictMode>,
  );
}
