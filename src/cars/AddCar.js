import React, { useState } from 'react';
import axios from 'axios';

export default function AddCar() {
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [anoFab, setAnoFab] = useState('');
    const [km, setKm] = useState('');
    const [tipoCarro, setTipoCarro] = useState('');
    const [codigoFilial, setCodigoFilial] = useState('');
    const [error, setError] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCar = {
            placa,
            modelo,
            anoFab,
            km,
            tipoCarro,
            codigoFilial
        };

        try {
            const response = await axios.post('http://localhost:8080/api/carros', newCar);
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
                    <label htmlFor="anoFab" className="form-label">Ano de Fabricação</label>
                    <input
                        type="number"
                        className="form-control"
                        id="anoFab"
                        value={anoFab}
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
                    <label htmlFor="tipoCarro" className="form-label">Tipo de Carro</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tipoCarro"
                        value={tipoCarro}
                        onChange={(e) => setTipoCarro(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="codigoFilial" className="form-label">Código da Filial</label>
                    <input
                        type="text"
                        className="form-control"
                        id="codigoFilial"
                        value={codigoFilial}
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
