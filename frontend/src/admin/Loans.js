// frontend/src/admin/Loans.js
import { useEffect, useState } from 'react';
import API from '../api';

function Loans() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ userId: '', bookId: '', dueDate: '' });
  const [loading, setLoading] = useState(false);

  // Fetch users and books for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        // alert('try');
        const [userRes, bookRes] = await Promise.all([
          API.get('/users'),    // You must have this route in backend
          API.get('/api/books')
        ]);
        alert(userRes);
        setUsers(userRes.data);
        setBooks(bookRes.data);
      } catch (err) {
        alert('Failed to load users/books');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/loans/issue', form);
      alert('✅ Book issued successfully');
      setForm({ userId: '', bookId: '', dueDate: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Issue failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>📖 Issue Book</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          required
        >
          <option value="">👤 Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.username} ({user.role})
            </option>
          ))}
        </select>

        <select
          value={form.bookId}
          onChange={(e) => setForm({ ...form, bookId: e.target.value })}
          required
        >
          <option value="">📚 Select Book</option>
          {books.map(book => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Issuing...' : '📤 Issue Book'}
        </button>
      </form>
    </div>
  );
}

export default Loans;
