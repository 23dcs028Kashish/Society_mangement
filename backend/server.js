require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    // Predefined admin user
    const adminUsername = 'H101';
    const adminPassword = 'admin123'; // Change this to a secure password
    const adminRole = 'admin';
    const homeNumber = '101';

    const existingAdmin = await User.findOne({ username: adminUsername });
    if (!existingAdmin) {
      const admin = new User({
        username: adminUsername,
        password: adminPassword,
        role: adminRole,
        homeNumber: homeNumber
      });
      await admin.save();
      console.log('Predefined admin user created:', adminUsername);
    } else {
      console.log('Admin user already exists:', adminUsername);
    }
  })
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 