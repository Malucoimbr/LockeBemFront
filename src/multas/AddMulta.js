import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';

export default function AdicionarMulta() {
    const [dataMulta, setDataMulta] = useState('');
    const [tipoInfracao, setTipoInfracao] = useState('');
    const [valorMulta, setValorMulta] = useState('');
    const [contratoId, setContratoId] = useState('');
    const [erro, setErro] = useState(''); // Adicionando o estado de erro

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const novaMulta = { 
            dataMulta, 
            tipoInfracao, 
            valorMulta, 
            contratoId
        };

        try {
            console.log('Enviando nova Multa:', novaMulta);
            const resposta = await axios.post('http://localhost:8080/api/multa', novaMulta);
            alert('Multa adicionada com sucesso!');
            setErro(''); // Limpar mensagem de erro
            setDataMulta('');
            setTipoInfracao('');
            setValorMulta('');
            setContratoId('');
        } catch (error) {
            console.error("Erro ao adicionar a multa:", error);

            const mensagemErro = error.response?.data?.error || 'Erro ao adicionar a multa!';
            setErro(mensagemErro); // Atualizando o estado de erro
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Adicionar Multa</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="dataMulta" label="Data da Multa" type="date" value={dataMulta} onChange={(e) => setDataMulta(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="tipoInfracao" label="Tipo de Infração" value={tipoInfracao} onChange={(e) => setTipoInfracao(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="valorMulta" label="Valor da Multa" type="number" value={valorMulta} onChange={(e) => setValorMulta(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="contratoId" label="ID do Contrato" type="number" value={contratoId} onChange={(e) => setContratoId(e.target.value)} required />
                    </div>
                </div>

                {erro && <div className="alert alert-danger mt-3">{erro}</div>} {/* Exibindo erro, caso haja */}
                <button type="submit" className="btn btn-primary btn-lg mt-3">Adicionar Multa</button>
            </form>
        </div>
    );
}