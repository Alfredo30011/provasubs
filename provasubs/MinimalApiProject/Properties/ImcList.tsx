import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ImcRecord {
    id: number;
    studentName: string;
    height: number;
    weight: number;
    imc: number;
    classification: string;
    createdAt: string;
}

const ImcList: React.FC = () => {
    const [imcRecords, setImcRecords] = useState<ImcRecord[]>([]);

    useEffect(() => {
        axios.get('/api/imcs')
            .then(response => setImcRecords(response.data))
            .catch(error => console.error('Erro ao carregar IMCs:', error));
    }, []);

    return (
        <div>
            <h1>Lista de IMCs</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do Aluno</th>
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
                            <td>{imc.studentName}</td>
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

export default ImcList;
