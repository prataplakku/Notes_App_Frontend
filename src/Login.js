import React, { useState } from 'react';

function Login({ setNotes, setIsLoggedIn, setUsername }) {
    const [username, setLocalUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            setUsername(username);
            setNotes(data.notes);
            setIsLoggedIn(true);
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" onChange={e => setLocalUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin} style={{
                            marginLeft: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }} >Login</button>
        </div>
    );
}

export default Login;
