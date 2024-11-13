import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListContrato() {
  const [contratos, setContratos] = useState([]);
  const [clientes, setClientes] = useState({});
  const [carros, setCarros] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    loadContratos();
    loadClientes();
    loadCarros();
  }, []);

  // Função para carregar os contratos
  const loadContratos = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/contrato-aluguel");
      setContratos(result.data);
    } catch (err) {
      setError('Erro ao carregar contratos');
      console.error(err);
    }
  };

  // Função para carregar os clientes
  const loadClientes = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/cliente");
      const clienteMap = result.data.reduce((map, cliente) => {
        map[cliente.id] = cliente.nome;
        return map;
      }, {});
      setClientes(clienteMap);
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error(err);
    }
  };

  // Função para carregar os carros
  const loadCarros = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/carro");
      const carroMap = result.data.reduce((map, carro) => {
        map[carro.id] = carro.modelo; // Supondo que o nome do carro está na propriedade `nome`
        return map;
      }, {});
      setCarros(carroMap);
    } catch (err) {
      setError('Erro ao carregar carros');
      console.error(err);
    }
  };

  const deleteContrato = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/contrato-aluguel/${id}`);
  
      setError(''); // Limpa o erro ao excluir com sucesso
      loadContratos(); // Recarrega a lista de contratos
    } catch (err) {
      setError('Erro ao excluir contrato. Verifique o console para mais detalhes.');
      console.error("Erro ao tentar excluir o contrato:", err);
    }
  };

  return (
    <div className="container">
      <div className="py-4"></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">Código Contrato</th>
            <th scope="col">Cliente_ID</th>
            <th scope="col">Cliente</th>
            <th scope="col">Carro_ID</th>
            <th scope="col">Modelo</th>
            <th scope="col">Data Início</th>
            <th scope="col">Data Fim</th>
            <th scope="col">Valor Pago</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {contratos.map((contrato) => (
            <tr key={contrato.id}>
              <th scope="row">{contrato.id}</th>
              <td>{contrato.cliente_id}</td>
              <td>{clientes[contrato.cliente_id] || "Nome não encontrado"}</td>
              <td>{contrato.carro_id}</td>
              <td>{carros[contrato.carro_id] || "Nome do carro não encontrado"}</td>
              <td>{new Date(contrato.data_inicio).toLocaleDateString()}</td>
              <td>{new Date(contrato.data_fim).toLocaleDateString()}</td>
              <td>{contrato.valor_pago.toFixed(2)}</td>
              <td>
                <Link className="btn btn-primary mx-2" to={`/viewcontrato/${contrato.id}`}>Ver</Link>
                <Link className="btn btn-outline-primary mx-2" to={`/editcontrato/${contrato.id}`}>Editar</Link>
                <button className="btn btn-danger mx-2" onClick={() => deleteContrato(contrato.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
