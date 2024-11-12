import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput'; 
import { Alert, Button, Container, Row, Col } from 'react-bootstrap'; 

export default function AddContratoAluguel() {
    const [id_cliente, setIdCliente] = useState('');
    const [id_carro, setIdCarro] = useState('');
    const [data_inicio, setDataInicio] = useState('');
    const [data_fim, setDataFim] = useState('');
    const [valor_total, setValorTotal] = useState('');
    const [qtd_dias, setQtdDias] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validando os campos
        if (!id_cliente || !id_carro || !data_inicio || !data_fim || !valor_total || !qtd_dias) {
            setErro('Todos os campos são obrigatórios!');
            return;
        }

        const novoContrato = {
            id_cliente,
            id_carro,
            data_inicio,
            data_fim,
            valor_total,
            qtd_dias
        };

        try {
            const response = await axios.post('http://localhost:8080/api/contratos', novoContrato);
            setSucesso(true);
            setErro('');
            // Limpar os campos após sucesso
            setIdCliente('');
            setIdCarro('');
            setDataInicio('');
            setDataFim('');
            setValorTotal('');
            setQtdDias('');
        } catch (error) {
            setErro('Erro ao adicionar contrato!');
            setSucesso(false);
            console.error(error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Adicionar Contrato de Aluguel</h2>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <FormInput id="id_cliente" label="ID do Cliente" type="number" value={id_cliente} onChange={(e) => setIdCliente(e.target.value)} required />
                    </Col>
                    <Col md={6}>
                        <FormInput id="id_carro" label="ID do Carro" type="number" value={id_carro} onChange={(e) => setIdCarro(e.target.value)} required />
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <FormInput id="data_inicio" label="Data de Início" type="date" value={data_inicio} onChange={(e) => setDataInicio(e.target.value)} required />
                    </Col>
                    <Col md={6}>
                        <FormInput id="data_fim" label="Data de Fim" type="date" value={data_fim} onChange={(e) => setDataFim(e.target.value)} required />
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <FormInput id="valor_total" label="Valor Total" type="number" value={valor_total} onChange={(e) => setValorTotal(e.target.value)} required />
                    </Col>
                    <Col md={6}>
                        <FormInput id="qtd_dias" label="Quantidade de Dias" type="number" value={qtd_dias} onChange={(e) => setQtdDias(e.target.value)} required />
                    </Col>
                </Row>

                {erro && <Alert variant="danger" className="mt-3">{erro}</Alert>}
                {sucesso && <Alert variant="success" className="mt-3">Contrato adicionado com sucesso!</Alert>}

                <Button type="submit" variant="primary" size="lg" className="mt-3">Adicionar Contrato</Button>
            </form>
        </Container>
    );
}
