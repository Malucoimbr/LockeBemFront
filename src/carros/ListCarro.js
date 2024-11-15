import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListCars() {
    const [carros, setCarros] = useState([]);
    const [error, setError] = useState('');
  
    useEffect(() => {
      loadCarros();
    }, []);
  
    const loadCarros = async () => {
      try {
        const result = await axios.get("http://localhost:8080/api/carro"); 
      console.log(result.data);
        setCarros(result.data);
      } catch (err) {
        setError('Erro ao carregar carros');
        console.error(err);
      }
    };
    
    const deleteCarros = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/api/carro/${id}`);  // Aqui foi corrigido para usar car.id
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
        <h2>Lista de Carros</h2>
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
                <td>
                  <Link to={`/viewcarros/${carro.id}`} className="btn btn-info">Ver</Link>
                  <Link to={`/editcarros/${carro.id}`} className="btn btn-outline-primary mx-2">Editar</Link>
                  <button onClick={() => deleteCarros(carro.id)} className="btn btn-danger mx-2">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }