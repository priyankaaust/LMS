import { useEffect, useState } from 'react';
import API from '../api'; // axios instance with baseURL
import './UserBooks.css'; // optional styling

function UserBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await API.get('/books');
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err);
        alert('Failed to load books.');
      }
    }
    fetchBooks();
  }, []);

  const borrowBook = async (bookId) => {
    const token = localStorage.getItem('token');
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // default due in 2 weeks
  
    try {
      await API.post('/loans/borrow', { bookId, dueDate }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Book borrowed!');
    } catch (err) {
      console.error('Borrow error:', err);
      alert(err.response?.data?.error || 'Error borrowing book');
    }
  };
  
  

  return (
    <div className="user-books-page">
      <h2>📚 Available Books</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img src={`http://localhost:5000${book.coverImageUrl}`} alt={book.title} />
            <h4>{book.title}</h4>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Available:</strong> {book.availableCopies} / {book.totalCopies}</p>
            <button onClick={() => borrowBook(book._id)}>📖 Borrow</button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default UserBooks;