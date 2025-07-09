const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error(err));


  const User = require('./models/User'); // adjust path if needed
  const bcrypt = require('bcrypt');
  
  async function createAdminUser() {
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10); // default password
      await User.create({
        username: 'admin',
        password: hashedPassword,
        role: 'admin', // ensure role field exists
      });
      console.log('✅ Admin user created: admin / admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  }
  
  // Call it after DB connection
  mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
      console.log('MongoDB connected');
      await createAdminUser(); // 👈 create admin after DB connects
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch(err => console.error(err));
  