import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from './layout/NavBar';
import Home from './pages/Home';
import Users from './pages/Users';  // Importando a página Users
import Cars from './pages/Cars';  
import Filiais from './pages/Filiais';  // Importando a página Filiais
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import ListUser from './users/ListUser';
import AddCar from './cars/AddCar';
import ListCar from './cars/ListCar';
import AddFilial from './filiais/AddFilial';  // Importando a página AddFilial
import ListFilial from './filiais/ListFilial';  // Importando a página ListFiliais
import EditFilial from './filiais/EditFilial';  // Importando a página EditFilial
import ViewFilial from './filiais/ViewFilial';  // Importando a página ViewFilial

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/cars" element={<Cars />} />
          <Route exact path="/filiais" element={<Filiais />} />
          <Route exact path="/addcar" element={<AddCar />} />
          <Route exact path="/listcars" element={<ListCar />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/listusers" element={<ListUser />} />
          <Route exact path="/addfilial" element={<AddFilial />} />
          <Route exact path="/listfilial" element={<ListFilial />} />
          {/* Alterando para usar :id ao invés de :codigofilial */}
          <Route exact path="/editfilial/:id" element={<EditFilial />} />  
          <Route exact path="/viewfilial/:id" element={<ViewFilial />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
