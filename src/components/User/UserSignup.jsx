import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {
  const [user, setUser] = useState({
    Cnic: '',
    fullname: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages before submitting
    setError('');

    // Basic client-side validation
    if (!user.Cnic || !user.fullname || !user.email || !user.password) {
      setError('All fields (Cnic, fullname, email, password) are required!');
      return;
    }

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(user.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // Send request to backend API
      const response = await axios.post('https://my-web-production-10ef.up.railway.app/users/register', user);

      if (response.status === 201) {
        alert('User registered successfully!');
        navigate('/signin'); // Redirect to login page after successful registration
      }
    } catch (error) {
      if (error.response) {
        // Handle server-side errors (e.g., user already exists or other validation issues)
        setError(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        // Handle no response from server
        setError('No response from server. Please try again later.');
      } else {
        // Handle any unexpected errors
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Registration</h2>

        {/* Display error message if present */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="Cnic"
              value={user.Cnic}
              onChange={handleChange}
              placeholder="CNIC"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-black rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;