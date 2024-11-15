import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Cargo</th>
            <th scope="col">Telefone</th>
            <th scope="col">Data Admissão</th>
            <th scope="col">Email</th>
            <th scope="col">Filial ID</th>
            <th scope="col">Supervisor ID</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <th scope="row">{funcionario.id}</th>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.telefone}</td>
              <td>{funcionario.dataAdmissao}</td>
              <td>{funcionario.email}</td>
              <td>{funcionario.filialId}</td>
              <td>{funcionario.supervisorId}</td>
              <td>
                <Link className="btn btn-primary mx-2" to={`/viewfuncionario/${funcionario.id}`}>Ver</Link>
                <Link className="btn btn-outline-primary mx-2" to={`/editfuncionario/${funcionario.id}`}>Editar</Link>
                <button className="btn btn-danger mx-2" onClick={() => deleteFuncionario(funcionario.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
