import { useEffect, useState } from 'react';
import API from '../api';
import './UserLoans.css'; // create for styling

function UserLoans() {
  const [loans, setLoans] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await API.get('/loans/my', {
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Book returned successfully');
      fetchLoans();
    } catch (err) {
      console.error(err);
      alert('Error returning book');
    }
  };

  return (
    <div className="loan-history-page">
      <h2>📄 My Loan History</h2>
      <div className="loan-grid">
        {loans.map((loan) => (
          <div className="loan-card" key={loan._id}>
            <img
              src={`http://localhost:5000${loan.book.coverImageUrl}`}
              alt={loan.book.title}
              className="loan-book-image"
            />
            <h4>{loan.book.title}</h4>
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
