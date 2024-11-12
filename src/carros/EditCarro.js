import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditCar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [carro, setCarro] = useState({
        placa: '',
        modelo: '',
        ano_fab: '',
        km: '',
        tipo_carro: '',
        Filial_id: ''
    });

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/carro/${id}`)
            .then(response => {
                setCarro(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar o carro!', error);
                setError('Erro ao carregar os dados do carro.');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarro({ ...carro, [name]: value });
    };

    const validateForm = () => {
        let errors = {};
        if (!carro.placa) errors.placa = 'Placa é obrigatória.';
        if (!carro.modelo) errors.modelo = 'Modelo é obrigatório.';
        if (!carro.ano_fab) errors.ano_fab = 'Ano de fabricação é obrigatório.';
        if (!carro.km) errors.km = 'Quilometragem é obrigatória.';
        if (!carro.carroTipo) errors.tipo_carro = 'Tipo de carro é obrigatório.';
        if (!carro.filialId) errors.codigoFilial = 'Código da filial é obrigatório.';
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setValidationErrors({});

        // Validação de campos
        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.put(`http://localhost:8080/api/carro/${id}`, carro);
            alert('Carro atualizado com sucesso!');
            navigate('/listcars');
        } catch (error) {
            console.error('Erro ao atualizar o carro!', error);
            setError('Erro ao atualizar o carro.');
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div>Carregando dados do carro...</div>;
    }

    return (
        <div>
            <h2>Editar Carro</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="placa" className="form-label">Placa</label>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.placa ? 'is-invalid' : ''}`}
                        id="placa"
                        name="placa"
                        value={carro.placa}
                        onChange={handleChange}
                    />
                    {validationErrors.placa && <div className="invalid-feedback">{validationErrors.placa}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="modelo" className="form-label">Modelo</label>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.modelo ? 'is-invalid' : ''}`}
                        id="modelo"
                        name="modelo"
                        value={carro.modelo}
                        onChange={handleChange}
                    />
                    {validationErrors.modelo && <div className="invalid-feedback">{validationErrors.modelo}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="ano_fab" className="form-label">Ano de Fabricação</label>
                    <input
                        type="number"
                        className={`form-control ${validationErrors.ano_fab ? 'is-invalid' : ''}`}
                        id="ano_fab"
                        name="ano_fab"
                        value={carro.ano_fab}
                        onChange={handleChange}
                    />
                    {validationErrors.ano_fab && <div className="invalid-feedback">{validationErrors.ano_fab}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="km" className="form-label">Quilometragem</label>
                    <input
                        type="number"
                        className={`form-control ${validationErrors.km ? 'is-invalid' : ''}`}
                        id="km"
                        name="km"
                        value={carro.km}
                        onChange={handleChange}
                    />
                    {validationErrors.km && <div className="invalid-feedback">{validationErrors.km}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="tipo_carro" className="form-label">Tipo de Carro</label>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.tipo_carro ? 'is-invalid' : ''}`}
                        id="tipo_carro"
                        name="tipo_carro"
                        value={carro.carroTipo}
                        onChange={handleChange}
                    />
                    {validationErrors.tipo_carro && <div className="invalid-feedback">{validationErrors.tipo_carro}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="codigoFilial" className="form-label">Código da Filial</label>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.codigoFilial ? 'is-invalid' : ''}`}
                        id="codigoFilial"
                        name="codigoFilial"
                        value={carro.filialId}
                        onChange={handleChange}
                    />
                    {validationErrors.codigoFilial && <div className="invalid-feedback">{validationErrors.codigoFilial}</div>}
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </form>
        </div>
    );
}
