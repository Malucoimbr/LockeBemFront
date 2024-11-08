import React, { useState } from 'react';
import axios from 'axios';

export default function AddCar() {
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [ano, setAno] = useState('');
    const [cor, setCor] = useState('');
    const [filialId, setFilialId] = useState('');
    const [error, setError] = useState(''); // Para armazenar mensagens de erro

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Enviar o objeto carro com a filial incluindo o ID
        const newCar = {
            placa,
            modelo,
            marca,
            ano,
            cor,
            filial: {
                id: filialId // Enviando o ID da filial
            }
        };
    
        try {
            // A URL agora deve ser apenas "/carro", já que estamos enviando o objeto completo
            const response = await axios.post('http://localhost:8080/carro', newCar);
            alert('Carro adicionado com sucesso!');
        } catch (error) {
            console.error("Erro completo:", error);
            setError(error.response?.data?.message || 'Erro ao adicionar carro!');
        }
    };

    return (
        <div>
            <h2>Adicionar Carro</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="placa" className="form-label">Placa</label>
                    <input
                        type="text"
                        className="form-control"
                        id="placa"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="modelo" className="form-label">Modelo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="modelo"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <input
                        type="text"
                        className="form-control"
                        id="marca"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ano" className="form-label">Ano</label>
                    <input
                        type="number"
                        className="form-control"
                        id="ano"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cor" className="form-label">Cor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cor"
                        value={cor}
                        onChange={(e) => setCor(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="filialId" className="form-label">ID da Filial</label>
                    <input
                        type="number"
                        className="form-control"
                        id="filialId"
                        value={filialId}
                        onChange={(e) => setFilialId(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Adicionar Carro</button>
            </form>
        </div>
    );
}
