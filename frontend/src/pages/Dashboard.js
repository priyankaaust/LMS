import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [data, setData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/auth/profile')
      .then(res => setData(res.data.message))
      .catch(() => {
        alert('Please login to access the dashboard.');
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="page-container">
      <h2>📖 Library Dashboard</h2>
      <p>{data}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
