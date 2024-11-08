import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate

export default function AddFilial() {
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [codigoFilial, setCodigoFilial] = useState('');
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [rua, setRua] = useState('');
    const [telefone, setTelefone] = useState('');
    const [error, setError] = useState(''); // Para armazenar mensagens de erro

    const navigate = useNavigate();  // Hook para navegação

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Checa se o código da filial já existe
        const filialCodeExists = await checkFilialCodeExists(codigoFilial);
        if (filialCodeExists) {
            setError("Código da filial já cadastrado!");
            return;
        }

        const newFilial = {
            cidade,
            estado,
            codigoFilial,
            nome,
            numero,
            rua,
            telefone
        };

        try {
            const response = await axios.post('http://localhost:8080/filial', newFilial);
            

            // Limpa os campos após adicionar a filial
            setCidade('');
            setEstado('');
            setCodigoFilial('');
            setNome('');
            setNumero('');
            setRua('');
            setTelefone('');
            setError('');

            // Redireciona para a página de listagem
            navigate('/listfilial');  // Navega para a listagem de filiais

        } catch (error) {
            // Exibe o erro retornado pelo servidor
            if (error.response) {
                // O servidor respondeu com um status de erro
                console.error("Erro de resposta do servidor:", error.response);
                setError(error.response.data.message || "Erro desconhecido ao adicionar filial.");
            } else if (error.request) {
                // A requisição foi feita, mas não houve resposta
                console.error("Erro na requisição:", error.request);
                setError("Erro ao enviar a requisição para o servidor.");
            } else {
                // Outro erro (como falha ao configurar a requisição)
                console.error("Erro inesperado:", error.message);
                setError("Erro inesperado.");
            }
        }
    };

    // Função para verificar se o código da filial já existe
    const checkFilialCodeExists = async (codigoFilial) => {
        try {
            const response = await axios.get(`http://localhost:8080/filial/codigo/${codigoFilial}`);
            return response.data; // Retorna true ou false com base na existência do código
        } catch (error) {
            console.error("Erro ao verificar o código da filial:", error);
            return false; // Se erro, o código não existe
        }
    };

    return (
        <div>
            <h2>Adicionar Filial</h2>
            <form onSubmit={handleSubmit}>
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
