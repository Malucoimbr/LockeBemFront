import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewCar() {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/carro/${id}`)
            .then(response => {
                setCar(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar o carro!', error);
            });
    }, [id]);

    if (!car) {
        return <p>Carro não encontrado.</p>;
    }

    return (
        <div>
            <h2>Detalhes do Carro</h2>
            <ul>
                <li><strong>Placa:</strong> {car.placa}</li>
                <li><strong>Modelo:</strong> {car.modelo}</li>
                <li><strong>Marca:</strong> {car.marca}</li>
                <li><strong>Ano:</strong> {car.ano}</li>
                <li><strong>Cor:</strong> {car.cor}</li>
                <li><strong>Filial:</strong> {car.filial?.nome || 'N/A'}</li>
            </ul>
        </div>
    );
}
