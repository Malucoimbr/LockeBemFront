import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

export default function EditCar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [carro, setCarro] = useState({
        km: '',
        carroTipo: '',
        filialId: '',
        valorDiaria: '',
        documentoCarroId: '',
    });

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    // Variável para armazenar os dados iniciais
    const [initialCarro, setInitialCarro] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/carro/${id}`)
        .then(response => {
          console.log(response.data);  // Verifique os dados retornados
          setCarro(response.data);
          setInitialCarro(response.data);
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
        if (!carro.km || carro.km <= 0) errors.km = 'Quilometragem é obrigatória e deve ser maior que zero.';
        if (!carro.carroTipo) errors.carroTipo = 'Tipo de carro é obrigatório.';
        if (!carro.filialId) errors.filialId = 'Código da filial é obrigatório.';
        if (!carro.valorDiaria || carro.valorDiaria <= 0) errors.valorDiaria = 'O valor da diária é obrigatório e deve ser maior que zero.';
        if (!carro.documentoCarroId) errors.documentoCarroId = 'Documento do carro é obrigatório.';
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccessMessage('');
    
        try {
            await axios.put(`http://localhost:8080/api/carro/${id}`, carro);
            setSuccessMessage('Carro atualizado com sucesso!');
            navigate('/listcarro');
        } catch (error) {
            console.error('Erro ao atualizar o carro!', error);
            setError('Erro ao atualizar o carro.');
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="container">
            <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Editar Carro</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
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
                        className={`form-control ${validationErrors.carroTipo ? 'is-invalid' : ''}`}
                        id="tipo_carro"
                        name="carroTipo"
                        value={carro.carroTipo}
                        onChange={handleChange}
                    />
                    {validationErrors.carroTipo && <div className="invalid-feedback">{validationErrors.carroTipo}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="filialId" className="form-label">Código da Filial</label>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.filialId ? 'is-invalid' : ''}`}
                        id="filialId"
                        name="filialId"
                        value={carro.filialId}
                        onChange={handleChange}
                    />
                    {validationErrors.filialId && <div className="invalid-feedback">{validationErrors.filialId}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="valorDiaria" className="form-label">Valor da diária</label>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.valorDiaria ? 'is-invalid' : ''}`}
                        id="valorDiaria"
                        name="valorDiaria"
                        value={carro.valorDiaria}
                        onChange={handleChange}
                    />
                    {validationErrors.valorDiaria && <div className="invalid-feedback">{validationErrors.valorDiaria}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="documentoCarroId" className="form-label">Documento do Carro</label>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.documentoCarroId ? 'is-invalid' : ''}`}
                        id="documentoCarroId"
                        name="documentoCarroId"
                        value={carro.documentoCarroId}
                        onChange={handleChange}
                    />
                    {validationErrors.documentoCarroId && <div className="invalid-feedback">{validationErrors.documentoCarroId}</div>}
                </div>

                <div className="d-flex justify-content-between mt-4">
                <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
    Atualizar
</button>

            <Link className="btn btn-outline-danger d-flex align-items-center" to="/listcarro" style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginLeft: '10px',
              padding: '6px 12px',
              fontSize: '1rem'
            }}>
                <FaTimes style={{ marginRight: '8px', fontSize: '1.2rem' }} />
                Cancelar
              </Link>
            </div>

            </form>
        </div>
        </div>
        </div>
    );
}
