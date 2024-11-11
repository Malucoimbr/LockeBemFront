import React, { useState } from 'react';
import axios from 'axios';

export default function AddCarro() {
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano_fab, setAnoFab] = useState('');
    const [km, setKm] = useState('');
    const [tipo_carro, setTipoCarro] = useState('');
    const [Filial_codigo, setCodigoFilial] = useState('');
    const [error, setError] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCar = {
            placa,
            modelo,
            ano_fab,
            km,
            tipo_carro,
            Filial_codigo
        };

        try {
            const response = await axios.post('http://localhost:8080/api/carro', newCar);
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
                    <label htmlFor="ano_fab" className="form-label">Ano de Fabricação</label>
                    <input
                        type="number"
                        className="form-control"
                        id="ano_fab"
                        value={ano_fab}
                        onChange={(e) => setAnoFab(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="km" className="form-label">Quilometragem</label>
                    <input
                        type="number"
                        className="form-control"
                        id="km"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tipo_carro" className="form-label">Tipo de Carro</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tipo_carro"
                        value={tipo_carro}
                        onChange={(e) => setTipoCarro(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="filial_codigo" className="form-label">Código da Filial</label>
                    <input
                        type="text"
                        className="form-control"
                        id="filial_codigo"
                        value={Filial_codigo}
                        onChange={(e) => setCodigoFilial(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Adicionar Carro</button>
            </form>
        </div>
    );
}
