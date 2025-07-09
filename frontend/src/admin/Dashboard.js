import { Link } from 'react-router-dom';
import './Admin.css';

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <h1>📚 Library Admin Dashboard</h1>
      <div className="admin-menu">
        <Link to="/admin/books"><button>Manage Books</button></Link>
        <Link to="/admin/users"><button>Manage Users</button></Link>
        <Link to="/admin/loans"><button>Borrow/Return Records</button></Link>
        <Link to="/admin/reports"><button>Reports</button></Link>
      </div>
    </div>
  );
}

export default Dashboard;
