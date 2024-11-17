import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

  return (
    <div className="container">
      <div className="py-4"></div>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <h2 className="text-center my-4">Lista de Seguros</h2>
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
              <td className="d-flex justify-content-center">
                {/* Botões com ícones para as ações */}
                <Link to={`/editseguro/${seguro.id}`} className="btn btn-outline-warning mx-2">
                  <FaEdit size={18} /> <span className="d-none d-sm-inline">Editar</span>
                </Link>
                <button onClick={() => deleteSeguro(seguro.id)} className="btn btn-outline-danger mx-2">
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
