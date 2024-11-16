import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';

export default function AdicionarManutencao() {
    const [dataMan, setDataMan] = useState('');
    const [tipoMan, setTipoMan] = useState('');
    const [custoMan, setCustoMan] = useState('');
    const [funcionarioId, setFuncionarioId] = useState('');
    const [carroId, setCarroId] = useState('');
    const [erro, setErro] = useState(''); // Adicionando o estado de erro

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const novaManutencao = { 
            dataMan, 
            tipoMan, 
            custoMan, 
            funcionarioId,
            carroId
        };

        try {
            console.log('Enviando nova Manutenção:', novaManutencao);
            const resposta = await axios.post('http://localhost:8080/api/manutencao', novaManutencao);
            alert('Manutenção adicionada com sucesso!');
            setErro(''); // Limpar mensagem de erro
            setDataMan('');
            setTipoMan('');
            setCustoMan('');
            setFuncionarioId('');
            setCarroId('');
        } catch (error) {
            console.error("Erro ao adicionar a manutenção:", error);

            const mensagemErro = error.response?.data?.error || 'Erro ao adicionar a manutenção!';
            setErro(mensagemErro); // Atualizando o estado de erro
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Adicionar Manutenção</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="dataMan" label="Data da Manutenção" type="date" value={dataMan} onChange={(e) => setDataMan(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="tipoMan" label="Tipo de Manutenção" value={tipoMan} onChange={(e) => setTipoMan(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="custoMan" label="Custo da Manutenção" type="number" value={custoMan} onChange={(e) => setCustoMan(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="funcionarioId" label="ID do Funcionário" type="number" value={funcionarioId} onChange={(e) => setFuncionarioId(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="carroId" label="ID do Carro" type="number" value={carroId} onChange={(e) => setCarroId(e.target.value)} required />
                    </div>
                </div>

                {erro && <div className="alert alert-danger mt-3">{erro}</div>} {/* Exibindo erro, caso haja */}
                <button type="submit" className="btn btn-primary btn-lg mt-3">Adicionar Manutenção</button>
            </form>
        </div>
    );
}