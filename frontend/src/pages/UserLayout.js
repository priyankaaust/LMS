import { Link, Outlet, useNavigate } from 'react-router-dom';
import './UserLayout.css';

function UserLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="user-layout">
      <aside className="sidebar">
        <h2>📚 My Library</h2>
        <ul>
          <li><Link to="/dashboard/books">📘 Books</Link></li>
          <li><Link to="/dashboard/loans">🔁 Loans</Link></li>
          <li><Link to="/dashboard/reports">📊 Reports</Link></li>
          <li><button onClick={handleLogout}>🚪 Logout</button></li>
        </ul>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
