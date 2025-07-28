import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5002/api/auth/login', { username, password });
      setUser(res.data);
      setError('');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const styles = {
    container: {
      maxWidth: 400,
      margin: '100px auto',
      padding: '2rem',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#333'
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '1rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '1rem'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer'
    },
    error: {
      marginTop: '1rem',
      color: 'red',
      textAlign: 'center'
    }
  };

  return (
    <form onSubmit={handleLogin} style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <input
        type="text"
        placeholder="Home Number"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Login</button>
      {error && <div style={styles.error}>{error}</div>}
    </form>
  );
}

export default Login;
