import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListCars() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/carro')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar os carros!', error);
            });
    }, []);

    return (
        <div>
            <h2>Lista de Carros</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Ano</th>
                        <th>Cor</th>
                        <th>Filial</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car.id}>
                            <td>{car.placa}</td>
                            <td>{car.modelo}</td>
                            <td>{car.marca}</td>
                            <td>{car.ano}</td>
                            <td>{car.cor}</td>
                            <td>{car.filial?.nome || 'N/A'}</td>
                            <td>
                                <button className="btn btn-info">Ver</button>
                                <button className="btn btn-warning">Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
