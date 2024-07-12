import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface ImcRecord {
    id: number;
    height: number;
    weight: number;
    imc: number;
    classification: string;
    createdAt: string;
}

const ImcListByStudent: React.FC = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const [imcRecords, setImcRecords] = useState<ImcRecord[]>([]);

    useEffect(() => {
        if (studentId) {
            axios.get(`/api/imcs/${studentId}`)
                .then(response => setImcRecords(response.data))
                .catch(error => console.error('Erro ao carregar IMCs:', error));
        }
    }, [studentId]);

    return (
        <div>
            <h1>IMCs do Aluno</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Altura (m)</th>
                        <th>Peso (kg)</th>
                        <th>IMC</th>
                        <th>Classificação</th>
                        <th>Data de Criação</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {imcRecords.map(imc => (
                        <tr key={imc.id}>
                            <td>{imc.id}</td>
                            <td>{imc.height}</td>
                            <td>{imc.weight}</td>
                            <td>{imc.imc.toFixed(2)}</td>
                            <td>{imc.classification}</td>
                            <td>{new Date(imc.createdAt).toLocaleDateString()}</td>
                            <td><a href={`/imc/edit/${imc.id}`}>Alterar</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ImcListByStudent;
