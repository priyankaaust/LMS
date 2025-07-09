import { Link } from 'react-router-dom';
import './Home.css'; // optional for styles

function Home() {
  return (
    <div className="home-container">
      <h1>📚 Welcome to the Library Management System</h1>
      <p>Manage books, users, and borrowing — all in one place.</p>
      
      <div className="home-buttons">
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
