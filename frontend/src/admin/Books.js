import { useState, useEffect } from 'react';
import API from '../api';
import './Books.css';

function Books() {
  const [form, setForm] = useState({
    _id: '',  // keep id for editing
    bookId: '',
    title: '',
    isbn: '',
    author: '',
    genre: '',
    totalCopies: '',
    coverImage: null,
    digitalFile: null
  });
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in form) {
        if (form[key]) {
          data.append(key, form[key]);
        }
      }

      if (isEditing) {
        // Update existing book
        await API.put(`/books/${form._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Book updated!');

      } else {
        // Add new book
        await API.post('/books', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Book added!');
      }

      setForm({
      bookId: '',
      title: '',
      isbn: '',
      author: '',
      genre: '',
      totalCopies: '',
      coverImage: null,
      digitalFile: null
    });

    document.getElementById('coverImage').value = '';
    document.getElementById('digitalFile').value = '';

    setIsEditing(false);
    fetchBooks();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving book');
    }
  };

  const handleEditClick = (book) => {
    setForm({
      _id: book._id,
      bookId: book.bookId,
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      genre: book.genre,
      coverImage: null, // User can upload a new image to replace
      digitalFile: null  // User can upload a new file to replace
    });
    setIsEditing(true);
  };

  const filteredBooks = books.filter(book =>
    [book.title, book.author, book.genre]
      .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="book-container">
      <div className="book-form-panel">
        <h2>{isEditing ? '✏️ Edit Book' : '➕ Add New Book'}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input name="bookId" placeholder="Book ID" value={form.bookId} onChange={handleChange} required />
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
          <input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
          <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
          <input
            type="number"
            placeholder="Total Copies"
            value={form.totalCopies}
            onChange={(e) => setForm({ ...form, totalCopies: e.target.value })}
            required
          />
          <label>📷 Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={(e) => setForm({ ...form, coverImage: e.target.files[0] })}
          />

          <label>📄 Digital File:</label>
          <input
            type="file"
            id="digitalFile"
            accept=".pdf"
            onChange={(e) => setForm({ ...form, digitalFile: e.target.files[0] })}
          />

          <button type="submit">{isEditing ? '💾 Save Changes' : '➕ Add Book'}</button>
          {isEditing && (
            <button type="button" onClick={() => { setIsEditing(false); setForm({ _id: '', bookId: '', title: '', isbn: '', author: '', genre: '', coverImage: null, digitalFile: null }); }}>
              ❌ Cancel
            </button>
          )}
        </form>
      </div>

      <div className="book-list-panel">
        <h2>📚 Book List</h2>
        <input
          type="text"
          placeholder="🔍 Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="book-cards">
          {filteredBooks.map(book => (
            <div key={book._id} className="book-card">
              {book.coverImageUrl && (
                <img src={`http://localhost:3000${book.coverImageUrl}`} alt="cover" />
              )}
              <h4>{book.title}</h4>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              {book.digitalFileUrl && (
                <a href={`http://localhost:3000${book.digitalFileUrl}`} target="_blank" rel="noreferrer">
                  📄 Download File
                </a>
              )}
              <button onClick={() => handleEditClick(book)}>✏️ Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Books;
