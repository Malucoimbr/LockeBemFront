import React, { useState } from 'react';
import axios from 'axios';


export default function AddSeguro() {
    const [id, setId] = useState('');
    const [cobertura, setCobertura] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const novoSeguro = { id, cobertura };

        try {
            console.log('Enviando novo seguro:', novoSeguro);
            const resposta = await axios.post('http://localhost:8080/api/seguro', novoSeguro);
            alert('Seguro adicionado com sucesso!');
            setErro('');
            setId('');
            setCobertura('');
        } catch (error) {
            console.error("Erro ao adicionar o seguro:", error);
            const mensagemErro = error.response?.data?.error || 'Erro ao adicionar o seguro!';
            setErro(mensagemErro);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Adicionar Seguro</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                  
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="cobertura">Cobertura</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cobertura"
                                value={cobertura}
                                onChange={(e) => setCobertura(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                {erro && <div className="alert alert-danger mt-3">{erro}</div>}
                <button type="submit" className="btn btn-primary btn-lg mt-3">Adicionar Seguro</button>
            </form>
        </div>
    );
}
