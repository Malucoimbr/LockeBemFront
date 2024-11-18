import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import Home from '../pages/Home'


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/financeiro">Financeiro</Link></li>
        <li><Link to="/rh">RH</Link></li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="layout-container">
        {/* Barra de navegação */}
        <Navbar />

        {/* Conteúdo principal */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/rh" element={<RH />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
