import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export default function ListDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocumentos();
  }, []);

  const loadDocumentos = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/documento-carro');
      setDocumentos(result.data);
    } catch (err) {
      setError('Erro ao carregar documentos');
      console.error(err);
    }
  };

  const deleteDocumento = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/documento-carro/${id}`);
      loadDocumentos();
    } catch (err) {
      setError('Erro ao excluir documento');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="py-4"></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center my-4">Lista dos Documentos dos Carros</h2>
      <table className="table border shadow">
        <thead>
          <tr>
            <th>Código do Documento</th>
            <th>Ano de Fabricação</th>
            <th>Chassi</th>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((documento) => (
            <tr key={documento.id}>
              <td>{documento.id}</td>
              <td>{documento.anoFab}</td>
              <td>{documento.chassi}</td>
              <td>{documento.placa}</td>
              <td>{documento.modelo}</td>
              <td className="d-flex justify-content-center">
                {/* Botões com ícones para as ações */}
                <Link to={`/viewdocumento/${documento.id}`} className="btn btn-outline-info mx-2">
                  <FaEye size={18} /> <span className="d-none d-sm-inline">Ver</span>
                </Link>
                <Link to={`/editdocumento/${documento.id}`} className="btn btn-outline-warning mx-2">
                  <FaEdit size={18} /> <span className="d-none d-sm-inline">Editar</span>
                </Link>
                <button onClick={() => deleteDocumento(documento.id)} className="btn btn-outline-danger mx-2">
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
