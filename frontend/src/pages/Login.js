import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ use named import

console.log("🔥 handleSubmit called");


function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  console.log('Decoded =================');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      const token = res.data.token;
      localStorage.setItem('token', token);

      
  
      const decoded = jwtDecode(token); // ⬅️ now works fine
      console.log('Decoded JWT:', decoded);

      if (decoded.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };
  

  return (
    <div className="page-container">
      <h2>🔐 Login to Your Library Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
