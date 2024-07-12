import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Student {
    id: number;
    firstName: string;
    lastName: string;
}

const ImcForm: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [studentId, setStudentId] = useState<number | undefined>(undefined);
    const [height, setHeight] = useState<number | undefined>(undefined);
    const [weight, setWeight] = useState<number | undefined>(undefined);
    const [message, setMessage] = useState('');

    useEffect(() => {
    
        axios.get('/api/students')
            .then(response => setStudents(response.data))
            .catch(error => console.error('Erro ao carregar alunos:', error));
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (studentId === undefined || height === undefined || weight === undefined) {
            setMessage('Todos os campos são obrigatórios.');
            return;
        }

        try {
            await axios.post('/api/imc', { studentId, height, weight });
            setMessage('IMC cadastrado com sucesso!');
        } catch (error: any) {
            setMessage(error.response?.data?.Message || 'Erro ao cadastrar IMC.');
        }
    };

    return (
        <div>
            <h1>Cadastro de IMC</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="studentId">Aluno:</label>
                    <select
                        id="studentId"
                        value={studentId || ''}
                        onChange={(e) => setStudentId(Number(e.target.value))}
                        required
                    >
                        <option value="">Selecione um aluno</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.firstName} {student.lastName}
                            </option>
                        ))}
                    </select>
                </div>
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
                <button type="submit">Cadastrar IMC</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default ImcForm;
