import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setNewUserName(user.name);
    setUserRole(user.role);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${editUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName, role: userRole }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
        setEditUser(null);
        setNewUserName('');
        setUserRole('');
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Navigate to the Register page when the button is clicked
  const handleAddUserClick = () => {
    navigate('/register'); // Change this to the correct route for your register page
  };

  return (
    <div>
      <h2 className="centered-heading">User Management</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div>
        <button onClick={handleAddUserClick}>
          Add User
        </button>
      </div>
      
      <table className="user-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user._id}>
                <td>
                  {editUser && editUser._id === user._id ? (
                    <input
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editUser && editUser._id === user._id ? (
                    <select 
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="role-dropdown"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Trainer">Trainer</option>
                      <option value="Employee">Employee</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editUser && editUser._id === user._id ? (
                    <button onClick={handleSaveEdit} className="save-btn">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                  )}
                  <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
