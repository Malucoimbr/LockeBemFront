// layout/NavBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate(); // Hook para navegação programática

  const redirectToList = () => {
    navigate('/listusers'); // Redireciona para a página de "List Users"
  };

  const redirectAddUser = () => {
    navigate('/adduser'); // Redireciona para a página de "List Users"
  };

  const redirectListCars = () => {
    navigate('/listcars'); // Redireciona para a página de "List Users"
  };

  const redirectAddCar = () => {
    navigate('/addcar'); // Redireciona para a página de "List Users"
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Full Stack Application</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
}
