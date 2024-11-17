import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

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

  const loadContratos = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/contrato-aluguel");
      setContratos(result.data);
    } catch (err) {
      setError('Erro ao carregar contratos');
      console.error(err);
    }
  };

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
      setError('');
      loadContratos();
    } catch (err) {
      setError('Erro ao excluir contrato');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="py-4"></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center my-4">Lista de Contratos</h2>
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">Código Contrato</th>
            <th scope="col">Código Cliente</th>
            <th scope="col">Carro Id</th>
            <th scope="col">Seguro Id</th>
            <th scope="col">Valor Pago</th>
            <th scope="col">Data Inicio</th>
            <th scope="col">Data fim</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {contratos.map((contrato) => (
            <tr key={contrato.id}>
              <td>{contrato.id}</td>
              <td>{contrato.clienteId}</td>
              <td>{contrato.carroId}</td>
              <td> {contrato.seguroId}</td>
              <td>{contrato.valorPago}</td>
              <td>{contrato.dataInicio}</td>
              <td>{contrato.dataFim}</td>
              <td className="d-flex justify-content-center">
                {/* Botões com ícones para as ações */}
                <Link to={`/viewcontrato/${contrato.id}`} className="btn btn-outline-info mx-2">
                  <FaEye size={18} /> <span className="d-none d-sm-inline">Ver</span>
                </Link>
                <Link to={`/editcontrato/${contrato.id}`} className="btn btn-outline-warning mx-2">
                  <FaEdit size={18} /> <span className="d-none d-sm-inline">Editar</span>
                </Link>
                <button onClick={() => deleteContrato(contrato.id)} className="btn btn-outline-danger mx-2">
                  <FaTrash size={18} /> <span className="d-none d-sm-inline">Deletar</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
