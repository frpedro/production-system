import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import RawMaterialsList from './components/RawMaterials/RawMaterialsList';
import ProductsList from './components/Products/ProductsList';
import ProductionSuggestions from './components/Production/ProductionSuggestions';
import './App.css';

function App() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
          <span className={`hamburger ${navOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav className={`navbar ${navOpen ? 'open' : ''}`}>
          <h1>Sistema de Produção</h1>
          <ul>
            <li><NavLink to="/raw-materials" className={({isActive}) => isActive ? 'active' : ''} onClick={closeNav}>Matérias-primas</NavLink></li>
            <li><NavLink to="/products" className={({isActive}) => isActive ? 'active' : ''} onClick={closeNav}>Produtos</NavLink></li>
            <li><NavLink to="/production" className={({isActive}) => isActive ? 'active' : ''} onClick={closeNav}>Produção</NavLink></li>
          </ul>
        </nav>
        
        <MainContent navOpen={navOpen} closeNav={closeNav} />
      </div>
    </Router>
  );
}

function MainContent({ navOpen, closeNav }) {
  return (
    <>
      {navOpen && <div className="nav-overlay" onClick={closeNav}></div>}

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/raw-materials" element={<RawMaterialsList />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/production" element={<ProductionSuggestions />} />
        </Routes>
      </div>
    </>
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

