import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
  };

  const handleClaim = async () => {
    if (!selectedUser) {
      setMessage('Please select a user first!');
      return;
    }
  
    const res = await axios.post('http://localhost:5000/claim', { userId: selectedUser });
    const { updatedUsers, points } = res.data;
  
  
    const selectedUserName = users.find(user => user._id === selectedUser)?.name;
    setUsers(updatedUsers);
    setMessage(`${selectedUserName} claimed ${points} points!`);

    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  return (
    <div className="container">
      <h1>User Leaderboard</h1>
      <div className="user-selection">
        <select onChange={e => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="" disabled>Select a user</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <button onClick={handleClaim}>Claim Points</button>
      </div>
      
      {message && <p className="message">{message}</p>}

      {/* <h2>Leaderboard</h2> */}
      <ul className="leaderboard">
        {users.map((user, index) => (
          <li key={user._id}>
            {index + 1}. {user.name} - {user.totalPoints} points
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
