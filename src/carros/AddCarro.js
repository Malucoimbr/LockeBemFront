import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput'; 

export default function AddCarro() {
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano_fab, setAnoFab] = useState('');
    const [km, setKm] = useState('');
    const [carroTipo, setCarroTipo] = useState('');
    const [filialId, setFilialId] = useState('');
    const [valor_diaria, setValorDiaria] = useState('');  // Novo estado para valor_diaria
    const [erro, setErro] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCar = {
            placa,
            modelo,
            ano_fab,
            km,
            carroTipo,
            filialId,
            valorDiaria  // Incluindo valor_diaria no objeto
        };

        try {
            const response = await axios.post('http://localhost:8080/api/carro', newCar);
            alert('Carro adicionado com sucesso!');
            setErro('');
            setPlaca('');
            setModelo('');
            setAnoFab('');
            setKm('');
            setCarroTipo('');
            setFilialId('');
            setValorDiaria('');  // Limpando o campo de valor_diaria
        } catch (error) {
            console.error("Erro completo:", error);
            setErro(error.response?.data?.message || 'Erro ao adicionar carro!');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Adicionar Carro</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="placa" label="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="modelo" label="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="ano_fab" label="Ano de Fabricação" type="number" value={ano_fab} onChange={(e) => setAnoFab(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="km" label="Quilometragem" type="number" value={km} onChange={(e) => setKm(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="tipo_carro" label="Tipo de Carro" value={carroTipo} onChange={(e) => setCarroTipo(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="filial_codigo" label="Código da Filial" value={filialId} onChange={(e) => setFilialId(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput 
                            id="valor_diaria" 
                            label="Valor da Diária" 
                            type="number" 
                            value={valorDiaria} 
                            onChange={(e) => setValorDiaria(e.target.value)} 
                            required 
                        />
                    </div>
                </div>

                {erro && <div className="alert alert-danger mt-3">{erro}</div>}
                <button type="submit" className="btn btn-primary btn-lg mt-3">Adicionar Carro</button>
            </form>
        </div>
    );
}
