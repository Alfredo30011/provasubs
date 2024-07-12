import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImcForm from './components/ImcForm';
import ImcList from './components/ImcList';
import ImcListByStudent from './components/ImcListByStudent';
import EditImc from './components/EditImc';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ImcForm />} />
                <Route path="/imc-list" element={<ImcList />} />
                <Route path="/imc/edit/:id" element={<EditImc />} />
                <Route path="/imcs/student/:studentId" element={<ImcListByStudent />} />
            </Routes>
        </Router>
    );
};



const App: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/register', { firstName, lastName });
            setMessage('Aluno cadastrado com sucesso!');
        } catch (error: any) {
            setMessage(error.response?.data?.Message || 'Erro ao cadastrar aluno.');
        }
    };

    return (
        <div>
            <h1>Cadastro de Aluno</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">Nome:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Sobrenome:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            <p>{message}</p>
        </div>
    );

    
};

export default App;

const App: React.FC = () => {
    return (
        <div>
            <h1>Cadastro de Aluno</h1>
            {/* Outras funcionalidades do App */}
            <ImcForm />
        </div>
    );

    
};


