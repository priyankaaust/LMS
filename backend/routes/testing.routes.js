// POST /api/setup-test-user
app.post('/api/setup-test-user', async (req, res) => {
    const { username, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { username },
      { username, password: hashed, role },
      { upsert: true }
    );
    res.sendStatus(200);
  });
  
  // POST /api/setup-test-book
  app.post('/api/setup-test-book', async (req, res) => {
    const { bookId, title, totalCopies } = req.body;
    await Book.findOneAndUpdate(
      { bookId },
      { bookId, title, totalCopies, availableCopies: totalCopies },
      { upsert: true }
    );
    res.sendStatus(200);
  });
  