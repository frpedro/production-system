import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RawMaterialsList from './components/RawMaterials/RawMaterialsList';
import ProductsList from './components/Products/ProductsList';
import ProductionSuggestions from './components/Production/ProductionSuggestions';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Sistema de Produção</h1>
          <ul>
            <li><Link to="/raw-materials">Matérias-primas</Link></li>
            <li><Link to="/products">Produtos</Link></li>
            <li><Link to="/production">Produção</Link></li>
          </ul>
        </nav>
        
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/raw-materials" element={<RawMaterialsList />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/production" element={<ProductionSuggestions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h2>Bem-vindo ao Sistema de Produção</h2>
      <p>Gerencie seu estoque e otimize a produção</p>
    </div>
  );
}

export default App;