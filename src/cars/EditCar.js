import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditCar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState({
        placa: '',
        modelo: '',
        marca: '',
        ano: '',
        cor: '',
        filialId: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/carro/${id}`)
            .then(response => {
                setCar(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar o carro!', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/carro/${id}`, car);
            alert('Carro atualizado com sucesso!');
            navigate('/listcars');
        } catch (error) {
            console.error('Erro ao atualizar o carro!', error);
        }
    };

    return (
        <div>
            <h2>Editar Carro</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="placa" className="form-label">Placa</label>
                    <input
                        type="text"
                        className="form-control"
                        id="placa"
                        name="placa"
                        value={car.placa}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="modelo" className="form-label">Modelo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="modelo"
                        name="modelo"
                        value={car.modelo}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <input
                        type="text"
                        className="form-control"
                        id="marca"
                        name="marca"
                        value={car.marca}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ano" className="form-label">Ano</label>
                    <input
                        type="number"
                        className="form-control"
                        id="ano"
                        name="ano"
                        value={car.ano}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cor" className="form-label">Cor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cor"
                        name="cor"
                        value={car.cor}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="filialId" className="form-label">ID da Filial</label>
                    <input
                        type="number"
                        className="form-control"
                        id="filialId"
                        name="filialId"
                        value={car.filialId}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
            </form>
        </div>
    );
}
