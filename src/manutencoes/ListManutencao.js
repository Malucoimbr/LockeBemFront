import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Data da Manutenção</th>
            <th scope="col">Tipo de Manutenção</th>
            <th scope="col">Custo da Manutenção</th>
            <th scope="col">ID do Funcionário</th>
            <th scope="col">ID do Carro</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {manutencoes.map((manutencao) => (
            <tr key={manutencao.id}>
              <th scope="row">{manutencao.id}</th>
              <td>{manutencao.dataMan}</td>
              <td>{manutencao.tipoMan}</td>
              <td>{manutencao.custoMan}</td>
              <td>{manutencao.funcionarioId}</td>
              <td>{manutencao.carroId}</td>
              <td>
                <Link className="btn btn-primary mx-2" to={`/viewmanutencao/${manutencao.id}`}>Ver</Link>
                <Link className="btn btn-outline-primary mx-2" to={`/editManutencao/${manutencao.id}`}>Editar</Link>
                <button className="btn btn-danger mx-2" onClick={() => deleteManutencao(manutencao.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
