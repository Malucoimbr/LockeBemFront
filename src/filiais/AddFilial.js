import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddFilial() {
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [rua, setRua] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cnpj, setCnpj] = useState('');  
    const [error, setError] = useState(''); 

    const navigate = useNavigate(); 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newFilial = {
            cidade,
            estado,
            nome,
            numero,
            rua,
            telefone,
            cnpj,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/filial', newFilial);
            
            setCidade('');
            setEstado('');
            setNome('');
            setNumero('');
            setRua('');
            setTelefone('');
            setError('');
            setCnpj('');

            navigate('/listfilial');  
        } catch (error) {
         
            if (error.response) {
         
                setError(error.response.data || "Erro desconhecido ao adicionar filial.");
            } else if (error.request) {
          
                setError("Erro ao enviar a requisição para o servidor.");
            } else {
       
                setError("Erro inesperado.");
            }
            
        }
    };


    const checkFilialCodeExists = async (codigo) => {
        try {
          
            const response = await axios.get(`http://localhost:8080/api/filial/codigo/${codigo}`);
            return response.data; 
        } catch (error) {
            console.error("Erro ao verificar o código da filial:", error);
            return false; 
        }
    };

    console.log(cnpj); 

    return (
        <div>
            <h2>Adicionar Filial</h2>
            <form onSubmit={handleSubmit}>
             
                   
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cidade" className="form-label">Cidade</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="cnpj" className="form-label">CNPJ</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cnpj"
                        value={cnpj}  
                        onChange={(e) => setCnpj(e.target.value)}  
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <input
                        type="text"
                        className="form-control"
                        id="estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="numero" className="form-label">Número</label>
                    <input
                        type="text"
                        className="form-control"
                        id="numero"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rua" className="form-label">Rua</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rua"
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefone" className="form-label">Telefone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn btn-primary">Adicionar Filial</button>
            </form>
        </div>
    );
}
