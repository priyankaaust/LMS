// src/admin/AdminLayout.js

import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './Admin.css';

function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Library Admin</h2>
        <nav>
          <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button>Dashboard</button>
          </NavLink>
          <NavLink to="/admin/books" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button>Books</button>
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button>Users</button>
          </NavLink>
          <NavLink to="/admin/loans" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button>Loans</button>
          </NavLink>
          <NavLink to="/admin/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button>Reports</button>
          </NavLink>
          <button onClick={logout} style={{ marginTop: '30px', backgroundColor: '#c0392b' }}>
            Logout
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
