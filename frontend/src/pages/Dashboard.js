import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';




function Dashboard() {
  const [data, setData] = useState('');
  const token = localStorage.getItem('token');
  const decoded = JSON.parse(atob(token.split('.')[1]));
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
      {/* <p>{decoded.username}</p> */}
      <h2>📋 Welcome {decoded.username + data}</h2>
      <div className="user-menu">
      <Link to="/dashboard/books"><button>📘 My Books</button></Link>
      <Link to="/dashboard/loans"><button>🔁 My Loans</button></Link>
      <Link to="/dashboard/reports"><button>📊 My Reports</button></Link>
      <button onClick={handleLogout}>🚪 Logout</button>
      </div>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
}

export default Dashboard;
