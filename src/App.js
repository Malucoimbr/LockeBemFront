import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from './layout/NavBar';
import Home from './pages/Home';

import Cars from './pages/Cars';  
import Filiais from './pages/Filiais';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// cliente
import Clientes from './pages/Clientes';  
import AddCliente from './clientes/AddCliente';
import EditCliente from './clientes/EditCliente';
import ViewCliente from './clientes/ViewCliente';
import ListCliente from './clientes/ListCliente';



import AddFilial from './filiais/AddFilial';  
import ListFilial from './filiais/ListFilial';  
import EditFilial from './filiais/EditFilial';  
import ViewFilial from './filiais/ViewFilial';  

// carro
import EditCarro from './carros/EditCarro';
import ViewCarro from './carros/ViewCarro'
import ListCarro from './carros/ListCarro';
import AddCarro from './carros/AddCarro';


// contrato
import Contratos from './pages/Contratos';
import DateSelector from './contratos_aluguel/DateSelector'; // Certifique-se de usar o caminho correto
import CarList from './contratos_aluguel/CarList';
import ConfirmContract from './contratos_aluguel/ConfirmContract';
import ClientSelector from './contratos_aluguel/ClientSelector'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* clientes */}
          <Route exact path="/clientes" element={<Clientes />} />
          <Route exact path="/editcliente/:id" element={<EditCliente />} />
          <Route exact path="/viewcliente/:id" element={<ViewCliente />} />
          <Route exact path="/addcliente" element={<AddCliente />} />
          <Route exact path="/listcliente" element={<ListCliente />} />

          {/* carros */}
          <Route exact path="/carros" element={<Cars />} />
          <Route exact path="/addcarro" element={<AddCarro />} />
          <Route exact path="/editcarros/:id" element={<EditCarro />} />
          <Route exact path="/viewcarros/:id" element={<ViewCarro />} />
          <Route exact path="/listcarro" element={<ListCarro />} />

          {/* filiais */}
          <Route exact path="/addfilial" element={<AddFilial />} />
          <Route exact path="/listfilial" element={<ListFilial />} />      
          <Route exact path="/editfilial/:codigoFilial" element={<EditFilial />} />
          <Route exact path="/viewfilial/:codigoFilial" element={<ViewFilial />} />
          <Route exact path="/filiais" element={<Filiais />} />



          <Route exact path="/addcontrato" element={<Contratos />} />
          <Route exact path="/dateselector" element={<DateSelector />} />
          <Route exact path="/clienteselector" element={<ClientSelector />} />
          <Route exact path="/confirmcontract" element={<ConfirmContract />} />
          <Route path="/car-list" element={<CarList />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
