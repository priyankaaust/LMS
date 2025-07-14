import { useEffect, useState } from 'react';
import API from '../api';
import './UserLoans.css';

function UserLoans() {
  const [loans, setLoans] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('issueDate');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await API.get('/loans/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching loan history');
    }
  };

  const handleReturn = async (loanId) => {
    try {
      await API.put(`/loans/return/${loanId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Book returned successfully');
      fetchLoans();
    } catch (err) {
      console.error(err);
      alert('Error returning book');
    }
  };

  const filteredLoans = loans.filter((loan) => {
    if (filter === 'returned') return !!loan.returnDate;
    if (filter === 'notReturned') return !loan.returnDate;
    return true;
  });

  const sortedLoans = filteredLoans.sort((a, b) => {
    const dateA = new Date(a[sortBy]);
    const dateB = new Date(b[sortBy]);
    return dateB - dateA;
  });

  return (
    <div className="loan-history-page">
      <h2>📄 My Loan History</h2>

      <div className="loan-controls">
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="returned">Returned</option>
            <option value="notReturned">Not Returned</option>
          </select>
        </label>

        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="issueDate">Issue Date</option>
            <option value="dueDate">Due Date</option>
            <option value="returnDate">Return Date</option>
          </select>
        </label>
      </div>

      <div className="loan-grid">
        {sortedLoans.map((loan) => (
          <div className="loan-card" key={loan._id}>
            <img
              src={
                loan.book?.coverImageUrl
                  ? `http://localhost:5000${loan.book.coverImageUrl}`
                  : '/default-book.png'
              }
              alt={loan.book?.title || 'Unknown Book'}
              className="loan-book-image"
            />
            <h4>{loan.book?.title || 'Unknown Book'}</h4>
            <p><strong>Due:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
            {loan.returnDate ? (
              <p>✅ Returned on {new Date(loan.returnDate).toLocaleDateString()}<br />
                💰 Fine: ${loan.fineAmount?.$numberDecimal || '0.00'}</p>
            ) : (
              <>
                <p>🔁 Not returned</p>
                <button onClick={() => handleReturn(loan._id)}>Return</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserLoans;