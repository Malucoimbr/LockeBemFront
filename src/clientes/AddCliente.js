import React, { useState } from 'react';
import axios from 'axios';

const FormInput = ({ id, label, value, onChange, type = "text", required = false }) => (
    <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}</label>
        <input
            type={type}
            className="form-control"
            id={id}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

export default function AdicionarCliente() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [bairro, setBairro] = useState('');
    const [rg, setRg] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [telefone, setTelefone] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const novoCliente = {
            rg,
            nome,
            email,
            telefone,
            rua,
            bairro,
          
            numero
        };
    
        try {
            const resposta = await axios.post('http://localhost:8080/api/cliente', novoCliente);
            alert('Cliente adicionado com sucesso!');
            setErro('');
            setNome('');
            setEmail('');
            setBairro('');
        
            setRg('');
            setRua('');
            setTelefone('');
        } catch (error) {
            console.error("Erro ao adicionar o cliente:", error);
            if (error.response) {
                setErro(error.response.data || 'Erro ao adicionar o cliente!');
            } else {
                setErro('Erro desconhecido!');
            }
        }
    };
    

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Adicionar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="rg" label="RG" value={rg} onChange={(e) => setRg(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="nome" label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="telefone" label="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormInput id="bairro" label="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput id="rua" label="Rua" value={rua} onChange={(e) => setRua(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                
                    <div className="col-md-6">
                        <FormInput id="numero" label="Numero" value={numero} onChange={(e) => setNumero(e.target.value)} required />
                    </div>
                </div>

                {erro && <div className="alert alert-danger mt-3">{erro}</div>}
                <button type="submit" className="btn btn-primary btn-lg mt-3">Adicionar Cliente</button>
            </form>
        </div>
    );
}
