import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListSeguro() {
  const [seguros, setSeguros] = useState([]);
  const [erro, setErro] = useState('');

  // Carregar os seguros
  useEffect(() => {
    loadSeguros();
  }, []);

  const loadSeguros = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/seguro');
      setSeguros(result.data);
    } catch (error) {
      setErro('Erro ao carregar seguros');
      console.error(error);
    }
  };

  // Função para excluir seguro
  const deleteSeguro = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/seguro/${id}`);
      loadSeguros();
    } catch (error) {
      setErro('Erro ao excluir seguro');
      console.error(error);
    }
  };

  // O return precisa estar dentro da função do componente
  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">Lista de Seguros</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <table className="table border shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cobertura</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {seguros.map((seguro) => (
            <tr key={seguro.id}>
              <td>{seguro.id}</td>
              <td>{seguro.cobertura}</td>
              <td>
                <Link to={`/editseguro/${seguro.id}`} className="btn btn-primary mx-2">Editar</Link>
                <button onClick={() => deleteSeguro(seguro.id)} className="btn btn-danger mx-2">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
