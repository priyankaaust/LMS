import { useEffect, useState } from 'react';
import API from '../api';
import './AdminUsers.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const token = localStorage.getItem('token');

  const fetchUsers = () =>
    API.get('/users', { headers: { Authorization: `Bearer ${token}` } })
       .then(res => setUsers(res.data));

  useEffect(() => { fetchUsers(); }, []);

  // ✅ Create new user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users/create', newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ User created');
      setNewUser({ username: '', password: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || 'Error creating user');
    }
  };

  // ✅ Other handlers
  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await API.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  };

  const toggleRole = async (u) => {
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    await API.put(`/users/${u._id}/role`, { role: newRole },
      { headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  };

  const resetPass = async (id) => {
    const res = await API.post(`/users/${id}/reset-password`, {},
      { headers: { Authorization: `Bearer ${token}` } });
    alert(`New password: ${res.data.newPassword}`);
  };

  return (
    <div className="page-container">
      <h2>👥 User Management</h2>

      {/* ✅ New User Form */}
      <form className="create-user-form" onSubmit={createUser}>
        <input
          placeholder="Username"
          required
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          placeholder="Password"
          required
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">➕ Create</button>
      </form>

      <table className="user-table">
        <thead>
          <tr><th>Username</th><th>Role</th><th>Last Login</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '—'}</td>
              <td className="action-buttons">
                <button onClick={() => toggleRole(u)}>
                  {u.role === 'admin' ? 'Make Member' : 'Make Admin'}
                </button>
                <button onClick={() => resetPass(u._id)}>Reset PW</button>
                <button onClick={() => deleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
