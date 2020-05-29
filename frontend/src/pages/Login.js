import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import api from '../services/api'

import './login.css'

export default function Login ({ history }) {
    
    const [userName, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs', {
            username: userName
        });

        const { _id } = response.data

        history.push(`/devs/${_id}`)
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} >
                <img src={Logo} alt="Tindev" />
                <input 
                    type="text" 
                    placeholder="Usuario do GitHub" 
                    value={userName}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
