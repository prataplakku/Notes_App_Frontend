import React, { useState } from 'react';

// Helper function for formatting the timestamp
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();  
};

function Notes({ notes, setNotes, username }) {
    const [newNote, setNewNote] = useState('');

    const addNote = async () => {
        if (newNote.trim() === '') {
            alert('Note cannot be empty. Please write something before adding.');
            return;
        }
        const response = await fetch('http://localhost:8000/api/add_note/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, note: newNote })
        });

        const data = await response.json();
        if (response.ok) {
            setNotes(prevNotes => [...prevNotes, data.note]);  
            alert(data.message || 'Note added successfully');
            setNewNote('');
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            <h2>Hello {username} </h2>
            <h2>Your Notes:</h2>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        {note.content} (Created at: {formatTimestamp(note.timestamp)})
                    </li>
                ))}
            </ul>
            <input 
                type="text" 
                placeholder="New note" 
                value={newNote}
                onChange={e => setNewNote(e.target.value)} 
            />
            <button onClick={addNote} style={{
                            marginLeft: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>Add Note</button>
        </div>
    );
}

export default Notes;
