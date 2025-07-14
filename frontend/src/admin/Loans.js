// src/pages/AdminLoans.js
import { useEffect, useState } from 'react';
import API from '../api';
import './AdminLoans.css';

function AdminLoans() {
  const [loans, setLoans] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchUser, setSearchUser] = useState('');

  const token = localStorage.getItem('token');

  const fetchLoans = async () => {
    try {
      const res = await API.get('/loans', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load loans.');
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleReturn = async (id) => {
    try {
      await API.put(`/loans/return/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLoans(); // Refresh after return
    } catch (err) {
      alert(err.response?.data?.error || 'Error returning book');
    }
  };

  const filteredLoans = loans.filter((loan) => {
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'returned' && loan.returnDate) ||
      (filterStatus === 'notReturned' && !loan.returnDate);

    const matchUser =
      loan.user?.username.toLowerCase().includes(searchUser.toLowerCase());

    return matchStatus && matchUser;
  });

  return (
    <div className="admin-loans-page">
      <h2>📚 All Loan Transactions (Admin)</h2>

      {/* Filter Controls */}
      <div className="filters">
      <div className="filter-group">
        <label htmlFor="searchUser">🔍 Search by Username:</label>
        <input
          id="searchUser"
          type="text"
          placeholder="e.g. john_doe"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="statusFilter">📂 Filter by Status:</label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="returned">Returned</option>
          <option value="notReturned">Not Returned</option>
        </select>
      </div>
    </div>


      <div className="loan-grid">
        {filteredLoans.map((loan) => (
          <div className="loan-card" key={loan._id}>
            <img
              src={
                loan.book?.coverImageUrl
                  ? `http://localhost:5000${loan.book.coverImageUrl}`
                  : '/default-book.png'
              }
              alt={loan.book?.title || 'Book'}
              className="loan-book-image"
            />
            <h4>{loan.book?.title}</h4>
            <p><strong>User:</strong> {loan.user?.username}</p>
            <p><strong>Due Date:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
            <p>
              {loan.returnDate ? (
                <>
                  ✅ Returned on {new Date(loan.returnDate).toLocaleDateString()} | Fine: ${loan.fineAmount?.$numberDecimal}
                </>
              ) : (
                <>
                  🔁 Not Returned<br />
                  <button onClick={() => handleReturn(loan._id)}>Return</button>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminLoans;

