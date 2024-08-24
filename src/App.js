import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Notes from './Notes';

function App() {
    const [notes, setNotes] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(''); 

    // Function to handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setNotes([]);
    };

    return (
        <div className="App">
            {!isLoggedIn ? (
                <>
                    <Register />
                    <Login setNotes={setNotes} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
                </>
            ) : (
                <div>
                    <button onClick={handleLogout} style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }} >Logout</button>
                    <Notes notes={notes} setNotes={setNotes} username={username} />  {}
                </div>
            )}
        </div>
    );
}

export default App;
