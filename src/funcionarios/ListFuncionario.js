import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export default function ListFuncionario() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [error, setError] = useState('');

  // Função para carregar os funcionários
  useEffect(() => {
    loadFuncionarios();
  }, []);

  // Função para carregar os funcionários
  const loadFuncionarios = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/funcionario");
      setFuncionarios(result.data);
    } catch (err) {
      setError('Erro ao carregar funcionários');
      console.error(err);
    }
  };

  // Função para excluir um funcionário pelo id
  const deleteFuncionario = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/funcionario/${id}`);
      loadFuncionarios(); // Recarregar a lista após a exclusão
    } catch (err) {
      setError('Erro ao excluir funcionário');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="py-4"></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center my-4">Lista de Funcionários</h2>
      <table className="table border shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Telefone</th>
            <th>Data Admissão</th>
            <th>Email</th>
            <th>Filial ID</th>
            <th>Supervisor ID</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.id}</td>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.telefone}</td>
              <td>{funcionario.dataAdmissao}</td>
              <td>{funcionario.email}</td>
              <td>{funcionario.filialId}</td>
              <td>{funcionario.supervisorId}</td>
              <td className="d-flex justify-content-center">
                {/* Botões com ícones para as ações */}
                <Link to={`/viewfuncionario/${funcionario.id}`} className="btn btn-outline-info mx-2">
                  <FaEye size={18} /> <span className="d-none d-sm-inline">Ver</span>
                </Link>
                <Link to={`/editfuncionario/${funcionario.id}`} className="btn btn-outline-warning mx-2">
                  <FaEdit size={18} /> <span className="d-none d-sm-inline">Editar</span>
                </Link>
                <button onClick={() => deleteFuncionario(funcionario.id)} className="btn btn-outline-danger mx-2">
                  <FaTrash size={18} /> <span className="d-none d-sm-inline">Excluir</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
