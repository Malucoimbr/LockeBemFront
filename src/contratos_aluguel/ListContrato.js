import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListContrato() {
  const [contratos, setContratos] = useState([]);
  const [clientes, setClientes] = useState({});
  const [error, setError] = useState('');

  // Função para carregar os contratos
  useEffect(() => {
    loadContratos();
    loadClientes();
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
      // Mapeia os clientes em um objeto { idCliente: nomeCliente }
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

  // Função para excluir um contrato
  const deleteContrato = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/contrato-aluguel/${id}`);
      loadContratos();  // Recarregar a lista após a exclusão
    } catch (err) {
      setError('Erro ao excluir contrato');
      console.error(err);
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
            <th scope="col">Cliente ID</th>
            <th scope="col">Cliente</th>
            <th scope="col">Carro ID</th>
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
