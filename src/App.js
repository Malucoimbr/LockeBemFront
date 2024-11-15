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

// funcionário
import Funcionarios from './pages/Funcionarios';  
import AddFuncionario from './funcionarios/AddFuncionario';
import EditFuncionario from './funcionarios/EditFuncionario';
import ViewFuncionario from './funcionarios/ViewFuncionario';
import ListFuncionario from './funcionarios/ListFuncionario';

import AddFilial from './filiais/AddFilial';  
import ListFilial from './filiais/ListFilial';  
import EditFilial from './filiais/EditFilial';  
import ViewFilial from './filiais/ViewFilial';  

// carro
import EditCarro from './carros/EditCarro';
import ViewCarro from './carros/ViewCarro'
import ListCarro from './carros/ListCarro';
import AddCarro from './carros/AddCarro';
import ListDocumento from './carros/ListDocumento'

import Seguros from './pages/Seguros'
import AddSeguro from './seguros/AddSeguro'
import ListSeguro from './seguros/ListSeguro';
import EditSeguro from './seguros/EditSeguro';
// contrato
import Contratos from './pages/Contratos';
import DateSelector from './contratos_aluguel/DateSelector'; // Certifique-se de usar o caminho correto
import CarList from './contratos_aluguel/CarList';
import ConfirmContract from './contratos_aluguel/ConfirmContract';
import ClientSelector from './contratos_aluguel/ClientSelector'
import ListContrato from './contratos_aluguel/ListContrato';
import ViewContrato from './contratos_aluguel/ViewContrato';
import EditContrato from './contratos_aluguel/EditContrato';

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
          <Route exact path="/listdocumento" element={<ListDocumento />} />

          {/* filiais */}
          <Route exact path="/addfilial" element={<AddFilial />} />
          <Route exact path="/listfilial" element={<ListFilial />} />      
          <Route exact path="/editfilial/:codigoFilial" element={<EditFilial />} />
          <Route exact path="/viewfilial/:codigoFilial" element={<ViewFilial />} />
          <Route exact path="/filiais" element={<Filiais />} />

          
            {/* funcionários */}
          <Route exact path="/funcionarios" element={<Funcionarios />} />
          <Route exact path="/addfuncionario" element={<AddFuncionario />} />
          <Route exact path="/editfuncionario/:id" element={<EditFuncionario />} />
          <Route exact path="/viewfuncionario/:id" element={<ViewFuncionario />} />
          <Route exact path="/listfuncionario" element={<ListFuncionario />} />


              {/* seguros */}
          <Route exact path="/seguros" element={<Seguros />} />
          <Route exact path="/addseguro" element={<AddSeguro />} />
          <Route exact path="/listseguro" element={<ListSeguro />} />
          <Route exact path="/editseguro/:id" element={<EditSeguro />} />
          

          <Route exact path="/addcontrato" element={<Contratos />} />
          <Route exact path="/dateselector" element={<DateSelector />} />
          <Route exact path="/clienteselector" element={<ClientSelector />} />
          <Route exact path="/confirmcontract" element={<ConfirmContract />} />
          <Route exact path="/listcontrato" element={<ListContrato />} />
          <Route exact path="/viewcontrato/:id" element={<ViewContrato />} />
          <Route exact path="/editcontrato/:id" element={<EditContrato />} />
          <Route path="/car-list" element={<CarList />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
