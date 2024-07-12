import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditImc: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [imc, setImc] = useState<any>(null);
    const [height, setHeight] = useState<number | undefined>(undefined);
    const [weight, setWeight] = useState<number | undefined>(undefined);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`/api/imcs/${id}`)
                .then(response => {
                    const imcData = response.data;
                    setImc(imcData);
                    setHeight(imcData.height);
                    setWeight(imcData.weight);
                })
                .catch(error => console.error('Erro ao carregar IMC:', error));
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (height === undefined || weight === undefined) {
            setMessage('Todos os campos são obrigatórios.');
            return;
        }

        try {
            await axios.put(`/api/imc/${id}`, { height, weight });
            setMessage('IMC atualizado com sucesso!');
            navigate('/imc-list');
        } catch (error: any) {
            setMessage(error.response?.data?.Message || 'Erro ao atualizar IMC.');
        }
    };

    return (
        <div>
            <h1>Alterar IMC</h1>
            {imc ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="height">Altura (m):</label>
                        <input
                            type="number"
                            step="0.01"
                            id="height"
                            value={height || ''}
                            onChange={(e) => setHeight(parseFloat(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="weight">Peso (kg):</label>
                        <input
                            type="number"
                            step="0.1"
                            id="weight"
                            value={weight || ''}
                            onChange={(e) => setWeight(parseFloat(e.target.value))}
                            required
                        />
                    </div>
                    <button type="submit">Salvar</button>
                </form>
            ) : (
                <p>Carregando...</p>
            )}
            <p>{message}</p>
        </div>
    );
};

export default EditImc;
