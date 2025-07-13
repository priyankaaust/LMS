import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserLayout from './pages/UserLayout';
import './App.css';
import UserBooks from './pages/Books';
import UserLoans from './pages/Loans';
import UserReports from './pages/Reports';


import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/Dashboard';
import Books from './admin/Books';
import Users from './admin/Users';
import Loans from './admin/Loans';
import Reports from './admin/Reports';

// Simple protected route for admin
function RequireAdmin({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded.role !== 'admin') return <Navigate to="/dashboard" replace />;
    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
}

function RequireUser({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
}


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div>404 Not Found</div>} />

        {/* Protected admin routes */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          {/* ✅ These routes will render inside AdminLayout */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="users" element={<Users />} />
          <Route path="loans" element={<Loans />} />
          <Route path="reports" element={<Reports />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <RequireUser>
              <UserLayout />
            </RequireUser>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />  {/* 👈 NEW */}
          <Route path="books" element={<UserBooks />} />
          <Route path="loans" element={<UserLoans />} />
          <Route path="reports" element={<UserReports />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
