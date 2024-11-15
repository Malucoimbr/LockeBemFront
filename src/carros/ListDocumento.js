import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocumentos();
  }, []);

  const loadDocumentos = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/documento-carro');
      console.log(result.data);
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
      <h2>Lista de Documentos de Carro</h2>
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
              <td>
                <Link
                  to={`/viewdocumento/${documento.id}`}
                  className="btn btn-info"
                >
                  Ver
                </Link>
                <Link
                  to={`/editdocumento/${documento.id}`}
                  className="btn btn-outline-primary mx-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteDocumento(documento.id)}
                  className="btn btn-danger mx-2"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
