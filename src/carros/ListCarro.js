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
        const result = await axios.get("http://localhost:8080/api/carros"); 
        setCarros(result.data);
      } catch (err) {
        setError('Erro ao carregar carros');
        console.error(err);
      }
    };
    
    const deleteCarros = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/api/carros/${id}`);  // Aqui foi corrigido para usar car.id
        loadCarros();
      } catch (err) {
        setError('Erro ao excluir carro');
        console.error(err);
      }
    };

    return (
        <div>
            <h2>Lista de Carros</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Ano de Fabricação</th>
                        <th>Quilometragem</th>
                        <th>Tipo de Carro</th>
                        <th>Código da Filial</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {carros.map(car => (
                        <tr key={car.id}>
                            <td>{car.placa}</td>
                            <td>{car.modelo}</td>
                            <td>{car.anoFab}</td>
                            <td>{car.km}</td>
                            <td>{car.tipoCarro}</td>
                            <td>{car.codigoFilial}</td>
                            <td>
                                <Link to={`/viewcarros/${car.id}`} className="btn btn-info">Ver</Link>
                                <Link to={`/editcarros/${car.id}`} className="btn btn-outline-primary mx-2">Editar</Link>
                                <button onClick={() => deleteCarros(car.id)} className="btn btn-danger mx-2">Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
