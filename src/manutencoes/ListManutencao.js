import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export default function ListManutencao() {
  const [manutencoes, setManutencoes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadManutencoes();
  }, []);

  const loadManutencoes = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/manutencao");
      setManutencoes(result.data);
    } catch (err) {
      setError('Erro ao carregar manutenções');
      console.error(err);
    }
  };

  const deleteManutencao = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/manutencao/${id}`);
      loadManutencoes();
    } catch (err) {
      setError('Erro ao excluir manutenção');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="py-4"></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center my-4">Lista de Manutenções</h2>
      <table className="table border shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data da Manutenção</th>
            <th>Tipo de Manutenção</th>
            <th>Custo da Manutenção</th>
            <th>ID do Funcionário</th>
            <th>ID do Carro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {manutencoes.map((manutencao) => (
            <tr key={manutencao.id}>
              <td>{manutencao.id}</td>
              <td>{manutencao.dataMan}</td>
              <td>{manutencao.tipoMan}</td>
              <td>{manutencao.custoMan}</td>
              <td>{manutencao.funcionarioId}</td>
              <td>{manutencao.carroId}</td>
              <td className="d-flex justify-content-center">
                {/* Botões com ícones para as ações */}
                <Link to={`/viewmanutencao/${manutencao.id}`} className="btn btn-outline-info mx-2">
                  <FaEye size={18} /> <span className="d-none d-sm-inline">Ver</span>
                </Link>
                <Link to={`/editManutencao/${manutencao.id}`} className="btn btn-outline-warning mx-2">
                  <FaEdit size={18} /> <span className="d-none d-sm-inline">Editar</span>
                </Link>
                <button onClick={() => deleteManutencao(manutencao.id)} className="btn btn-outline-danger mx-2">
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
