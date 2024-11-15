import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import axios from 'axios';
import FormInput from '../components/FormInput';

export default function AddCarro() {
    const navigate = useNavigate(); // Criando o redirecionador
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [anoFab, setAnoFab] = useState('');
    const [chassi, setChassi] = useState('');
    const [documentoId, setDocumentoId] = useState(null);
    const [km, setKm] = useState('');
    const [carroTipo, setCarroTipo] = useState('');
    const [filialId, setFilialId] = useState('');
    const [valorDiaria, setValorDiaria] = useState('');
    const [documentoCarroId, setDocumentoCarroId] = useState('');
    const [erro, setErro] = useState('');

    const handleDocumentoSubmit = async (e) => {
        e.preventDefault();
        if (!placa || !modelo || !anoFab || !chassi) {
            setErro("Todos os campos do documento são obrigatórios.");
            return;
        }
        try {
            const documentoResponse = await axios.post('http://localhost:8080/api/documento-carro', {
                anoFab,
                chassi,
                modelo,
                placa,
            });
            if (documentoResponse.status === 201) {
                alert('Documento registrado com sucesso! Agora registre o carro.');
                setDocumentoId(true);
                setPlaca('');
                setModelo('');
                setAnoFab('');
                setChassi('');
                setErro('');
            }
        } catch (error) {
            setErro(error.response?.data?.message || 'Erro ao adicionar documento.');
        }
    };

    const handleCarroSubmit = async (e) => {
        e.preventDefault();
        if (!km || !carroTipo || !filialId || !valorDiaria || !documentoCarroId) {
            setErro("Todos os campos do carro são obrigatórios.");
            return;
        }
        try {
            const newCar = {
                km: parseInt(km),
                carroTipo,
                valorDiaria: parseFloat(valorDiaria),
                filialId: parseInt(filialId),
                documentoCarroId: parseInt(documentoCarroId),
            };
            const carroResponse = await axios.post('http://localhost:8080/api/carro', newCar);
            if (carroResponse.status === 201) {
                alert('Carro adicionado com sucesso!');
                navigate('/listcarro'); // Redirecionando para a página de listagem
            }
        } catch (error) {
            setErro(error.response?.data?.message || 'Erro ao adicionar carro.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Adicionar Carro</h2>
            {!documentoId ? (
                <form onSubmit={handleDocumentoSubmit}>
                    <h3>Dados do Documento</h3>
                    <FormInput id="ano_fab" label="Ano de Fabricação" type="number" value={anoFab} onChange={(e) => setAnoFab(e.target.value)} required />
                    <FormInput id="chassi" label="Chassi" value={chassi} onChange={(e) => setChassi(e.target.value)} required />
                    <FormInput id="placa" label="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
                    <FormInput id="modelo" label="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                    {erro && <div className="alert alert-danger mt-3">{erro}</div>}
                    <button type="submit" className="btn btn-primary btn-lg mt-3">Registrar Documento</button>
                </form>
            ) : (
                <form onSubmit={handleCarroSubmit}>
                    <h3>Dados do Carro</h3>
                    <FormInput id="km" label="Quilometragem" type="number" value={km} onChange={(e) => setKm(e.target.value)} required />
                    <FormInput id="carro_tipo" label="Tipo de Carro" value={carroTipo} onChange={(e) => setCarroTipo(e.target.value)} required />
                    <FormInput id="valor_diaria" label="Valor da Diária" type="number" value={valorDiaria} onChange={(e) => setValorDiaria(e.target.value)} required />
                    <FormInput id="filial_id" label="Código da Filial" value={filialId} onChange={(e) => setFilialId(e.target.value)} required />
                    <FormInput id="documento_carro_id" label="ID do Documento do Carro" type="number" value={documentoCarroId} onChange={(e) => setDocumentoCarroId(e.target.value)} required />
                    {erro && <div className="alert alert-danger mt-3">{erro}</div>}
                    <button type="submit" className="btn btn-primary btn-lg mt-3">Registrar Carro</button>
                </form>
            )}
        </div>
    );
}
