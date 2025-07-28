import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword({ user }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/auth/change-password', {
        username: user.username,
        oldPassword,
        newPassword
      });
      setMessage('Password changed successfully');
    } catch (err) {
      setMessage('Error changing password');
    }
  };

  return (
    <form onSubmit={handleChange} style={{ maxWidth: 400, margin: 'auto', marginTop: 40, padding: 24, boxShadow: '0 2px 8px #ccc', borderRadius: 8 }}>
      <h2>Change Password</h2>
      <input type="password" placeholder="Old Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required style={{ width: '100%', marginBottom: 16, padding: 8 }} />
      <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required style={{ width: '100%', marginBottom: 16, padding: 8 }} />
      <button type="submit" style={{ width: '100%', padding: 10 }}>Change Password</button>
      {message && <div style={{marginTop: 12}}>{message}</div>}
    </form>
  );
}

export default ChangePassword; 