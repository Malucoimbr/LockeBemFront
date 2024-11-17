import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export default function ListCars() {
  const [carros, setCarros] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCarros();
  }, []);

  const loadCarros = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/carro");
      setCarros(result.data);
    } catch (err) {
      setError('Erro ao carregar carros');
      console.error(err);
    }
  };

  const deleteCarros = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/carro/${id}`);
      loadCarros();
    } catch (err) {
      setError('Erro ao excluir carro');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="py-4"></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center my-4">Lista de Carros</h2>
      <table className="table border shadow">
        <thead>
          <tr>
            <th>Quilometragem</th>
            <th>Tipo de Carro</th>
            <th>Código da Filial</th>
            <th>Valor da diária</th>
            <th>Código do Documento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carros.map(carro => (
            <tr key={carro.id}>
              <td>{carro.km}</td>
              <td>{carro.carroTipo}</td>
              <td>{carro.filialId}</td>
              <td>{carro.valorDiaria}</td>
              <td>{carro.documentoCarroId}</td>
              <td className="d-flex justify-content-center">
                {/* Botões com ícones para as ações */}
                <Link to={`/viewcarros/${carro.id}`} className="btn btn-outline-info mx-2">
                  <FaEye size={18} /> <span className="d-none d-sm-inline">Ver</span>
                </Link>
                <Link to={`/editcarros/${carro.id}`} className="btn btn-outline-warning mx-2">
                  <FaEdit size={18} /> <span className="d-none d-sm-inline">Editar</span>
                </Link>
                <button onClick={() => deleteCarros(carro.id)} className="btn btn-outline-danger mx-2">
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
