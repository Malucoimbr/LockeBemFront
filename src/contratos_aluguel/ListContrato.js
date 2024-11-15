import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function ListContrato() {
  const [contratos, setContratos] = useState([]);
  const [clientes, setClientes] = useState({});
  const [carros, setCarros] = useState({});
  const [seguros, setSeguros] = useState({});
  const [funcionarios, setFuncionarios] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    loadContratos();
    loadClientes();
    loadCarros();
    loadSeguros();
    loadFuncionarios();
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
        map[carro.id] = carro.modelo;
        return map;
      }, {});
      setCarros(carroMap);
    } catch (err) {
      setError('Erro ao carregar carros');
      console.error(err);
    }
  };

  // Função para carregar os seguros
  const loadSeguros = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/seguro");
      const seguroMap = result.data.reduce((map, seguro) => {
        map[seguro.id] = seguro.tipo;
        return map;
      }, {});
      setSeguros(seguroMap);
    } catch (err) {
      setError('Erro ao carregar seguros');
      console.error(err);
    }
  };

  // Função para carregar os funcionários
  const loadFuncionarios = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/funcionario");
      const funcionarioMap = result.data.reduce((map, funcionario) => {
        map[funcionario.id] = funcionario.nome;
        return map;
      }, {});
      setFuncionarios(funcionarioMap);
    } catch (err) {
      setError('Erro ao carregar funcionários');
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
            <th scope="col">Cliente</th>
            <th scope="col">Carro Id</th>
            <th scope="col">Seguro Id</th>
            <th scope="col">Funcionario Id</th>
            <th scope="col">Valor Pago</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {contratos.map((contrato) => (
            <tr key={contrato.id}>
              <th scope="row">{contrato.id}</th>
              <td>{clientes[contrato.clienteId] || "Nome não encontrado"}</td>
              <td>{contrato.carroId} </td>
              <td>{contrato.seguroId}</td>
              <td>{contrato.funcionarioId}</td>
              <td>{contrato.valorPago}</td>
              <td>
                <div className="d-flex justify-content-between">
                  <Link className="btn btn-primary mx-2" to={`/viewcontrato/${contrato.id}`}>Ver</Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editcontrato/${contrato.id}`}>Editar</Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteContrato(contrato.id)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
