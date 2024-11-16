import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Data da Multa</th>
            <th scope="col">Tipo de Infração</th>
            <th scope="col">Valor da Multa</th>
            <th scope="col">ID do Contrato</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {multas.map((multa) => (
            <tr key={multa.id}>
              <th scope="row">{multa.id}</th>
              <td>{multa.dataMulta}</td>
              <td>{multa.tipoInfracao}</td>
              <td>{multa.valorMulta}</td>
              <td>{multa.contratoId}</td>
              <td>
                <Link className="btn btn-primary mx-2" to={`/viewmulta/${multa.id}`}>Ver</Link>
                <Link className="btn btn-outline-primary mx-2" to={`/editMulta/${multa.id}`}>Editar</Link>
                <button className="btn btn-danger mx-2" onClick={() => deleteMulta(multa.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
