import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Sidebar from './layout/Sidebar';

import Home from './pages/Home';
import './css/app.css';

import Cars from './pages/Cars';  
import Filiais from './pages/Filiais';  
import Financeiro from './pages/Financeiro';
import RecursosHumanos from './pages/RecursosHumanos';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// cliente
import Clientes from './pages/Clientes';  
import AddCliente from './clientes/AddCliente';
import EditCliente from './clientes/EditCliente';
import ViewCliente from './clientes/ViewCliente';
import ListCliente from './clientes/ListCliente';

// multas
import Multas from './pages/Multas';  
import AddMulta from './multas/AddMulta';
import EditMulta from './multas/EditMulta';
import ViewMulta from './multas/ViewMulta';
import ListMulta from './multas/ListMulta';

// manutenções
import Manutencoes from './pages/Manutencoes';  
import AddManutencao from './manutencoes/AddManutencao';
import EditManutencao from './manutencoes/EditManutencao';
import ViewManutencao from './manutencoes/ViewManutencao';
import ListManutencao from './manutencoes/ListManutencao';

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
import ViewCarro from './carros/ViewCarro';
import ListCarro from './carros/ListCarro';
import AddCarro from './carros/AddCarro';
import ListDocumento from './carros/ListDocumento';
import EditDocumentoCarro from './carros/EditDocumentoCarro';

import Seguros from './pages/Seguros';
import AddSeguro from './seguros/AddSeguro';
import ListSeguro from './seguros/ListSeguro';
import EditSeguro from './seguros/EditSeguro';
// contrato
import Contratos from './pages/Contratos';
import DateSelector from './contratos_aluguel/DateSelector';
import CarList from './contratos_aluguel/CarList';
import ConfirmContract from './contratos_aluguel/ConfirmContract';
import ClientSelector from './contratos_aluguel/ClientSelector';
import ListContrato from './contratos_aluguel/ListContrato';
import ViewContrato from './contratos_aluguel/ViewContrato';
import EditContrato from './contratos_aluguel/EditContrato';
import ViewMantencao from './manutencoes/ViewManutencao';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="layout-container">
          <Sidebar />
        
          <div className="content">
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
              <Route exact path="/editdocumento/:id" element={<EditDocumentoCarro />} />

              {/* filiais */}
              <Route exact path="/addfilial" element={<AddFilial />} />
              <Route exact path="/listfilial" element={<ListFilial />} />      
              <Route exact path="/editfilial/:codigoFilial" element={<EditFilial />} />
              <Route exact path="/viewfilial/:codigoFilial" element={<ViewFilial />} />
              <Route exact path="/filiais" element={<Filiais />} />

              {/* multas */}
              <Route exact path="/multas" element={<Multas />} />
              <Route exact path="/addmulta" element={<AddMulta />} />
              <Route exact path="/editmulta/:id" element={<EditMulta />} />
              <Route exact path="/viewmulta/:id" element={<ViewMulta />} />
              <Route exact path="/listmulta" element={<ListMulta />} />

              {/* manutencoes */}
              <Route exact path="/manutencoes" element={<Manutencoes />} />
              <Route exact path="/addmanutencao" element={<AddManutencao />} />
              <Route exact path="/editmanutencao/:id" element={<EditManutencao />} />
              <Route exact path="/viewmanutencao/:id" element={<ViewMantencao />} />
              <Route exact path="/listmanutencao" element={<ListManutencao />} />
              
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

              <Route path="/dashfinanceiro" element={<Financeiro />} />
              <Route path="/dashrh" element={<RecursosHumanos />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
