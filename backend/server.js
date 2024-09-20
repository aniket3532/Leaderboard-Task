const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv');

const User = require('./model/user');

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
require('./dbConnection');

// Seed users into the database (Only for running the first time)

// const seedUsers = async () => {
//   const users = [
//     'Rahul', 'Kamal', 'Sanaki', 'John', 'Mary', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve'
//   ];
//   await User.deleteMany({});
//   users.forEach(async name => {
//     await User.create({ name });
//   });
// };

// seedUsers();


// API to get all users
app.get('/users', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});


// API to claim points for a user
app.post('/claim', async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;
  
  // Update user points
  const user = await User.findById(userId);
  user.totalPoints += points;
  await user.save();

  // Respond with updated user and points
  const updatedUsers = await User.find().sort({ totalPoints: -1 });
  res.json({ updatedUsers, points });
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
