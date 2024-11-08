import React, { useState } from 'react';
import axios from 'axios';

export default function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [rg, setRg] = useState('');
    const [street, setStreet] = useState('');
    const [error, setError] = useState(''); // Para armazenar mensagens de erro

  // AddUser.js

const handleSubmit = async (e) => {
    e.preventDefault();

    // Checa se o RG já existe
    const rgExists = await checkRgExists(rg);
    if (rgExists) {
        setError("RG já cadastrado!");
        return;
    }

    const newUser = {
        name,
        email,
        neighborhood,
        city,
        rg,
        street,
    };

    try {
        await axios.post('http://localhost:8080/user', newUser);
        alert('User added successfully!');
        setError(''); // Limpa a mensagem de erro
    } catch (error) {
        // Exibe o erro retornado do backend, como RG já cadastrado
        if (error.response && error.response.status === 400) {
            setError(error.response.data.message);
        } else {
            console.error(error);
            alert('Error adding user!');
        }
    }
};

// Função para verificar se o RG já existe
const checkRgExists = async (rg) => {
    try {
        const response = await axios.get(`http://localhost:8080/user/rg/${rg}`);
        return response.data; // Retorna true ou false com base na existência do RG
    } catch (error) {
        return false; // Se erro, o RG não existe
    }
};


    return (
        <div>
            <h2>Adicionar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="neighborhood" className="form-label">Bairro</label>
                    <input
                        type="text"
                        className="form-control"
                        id="neighborhood"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">Cidade</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rg" className="form-label">RG</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rg"
                        value={rg}
                        onChange={(e) => setRg(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="street" className="form-label">Rua</label>
                    <input
                        type="text"
                        className="form-control"
                        id="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Add User</button>
            </form>
        </div>
    );
}
