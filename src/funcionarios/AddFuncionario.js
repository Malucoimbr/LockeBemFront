import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';

export default function AdicionarFuncionario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');
    const [dataAdmissao, setDataAdmissao] = useState('');
    const [telefone, setTelefone] = useState('');
    const [filialId, setFilialId] = useState('');
    const [supervisorId, setSupervisorId] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const novoFuncionario = { 
            nome, 
            email, 
            cargo, 
            dataAdmissao: dataAdmissao, 
            telefone, 
            filialId: filialId, 
            supervisorId: supervisorId 
        };

        try {
            console.log('Enviando novo funcionário:', novoFuncionario);
            const resposta = await axios.post('http://localhost:8080/api/funcionario', novoFuncionario);
            alert('Funcionário adicionado com sucesso!');
            setErro('');
            setNome('');
            setEmail('');
            setCargo('');
            setDataAdmissao('');
            setTelefone('');
            setFilialId('');
            setSupervisorId('');
        } catch (error) {
            console.error("Erro ao adicionar o funcionário:", error);

            const mensagemErro = error.response?.data?.error || 'Erro ao adicionar o funcionário!';
            setErro(mensagemErro);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Adicionar Funcionário</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="nome" label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="cargo" label="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="dataAdmissao" label="Data de Admissão" type="date" value={dataAdmissao} onChange={(e) => setDataAdmissao(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="telefone" label="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="filialId" label="Filial ID" type="number" value={filialId} onChange={(e) => setFilialId(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="supervisorId" label="Supervisor ID" type="number" value={supervisorId} onChange={(e) => setSupervisorId(e.target.value)} />
                    </div>
                </div>

                {erro && <div className="alert alert-danger mt-3">{erro}</div>}
                <button type="submit" className="btn btn-primary btn-lg mt-3">Adicionar Funcionário</button>
            </form>
        </div>
    );
}