import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export default function ListMulta() {
  const [multas, setMultas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMultas();
  }, []);

  const loadMultas = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/multa");
      setMultas(result.data);
    } catch (err) {
      setError('Erro ao carregar multas');
      console.error(err);
    }
  };

  const deleteMulta = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/multa/${id}`);
      loadMultas();
    } catch (err) {
      setError('Erro ao excluir multa');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="py-4"></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center my-4">Lista de Multas</h2>
      <table className="table border shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data da Multa</th>
            <th>Tipo de Infração</th>
            <th>Valor da Multa</th>
            <th>ID do Contrato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {multas.map((multa) => (
            <tr key={multa.id}>
              <td>{multa.id}</td>
              <td>{multa.dataMulta}</td>
              <td>{multa.tipoInfracao}</td>
              <td>{multa.valorMulta}</td>
              <td>{multa.contratoId}</td>
              <td className="d-flex justify-content-center">
                {/* Botões com ícones para as ações */}
                <Link to={`/viewmulta/${multa.id}`} className="btn btn-outline-info mx-2">
                  <FaEye size={18} /> <span className="d-none d-sm-inline">Ver</span>
                </Link>
                <Link to={`/editMulta/${multa.id}`} className="btn btn-outline-warning mx-2">
                  <FaEdit size={18} /> <span className="d-none d-sm-inline">Editar</span>
                </Link>
                <button onClick={() => deleteMulta(multa.id)} className="btn btn-outline-danger mx-2">
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
