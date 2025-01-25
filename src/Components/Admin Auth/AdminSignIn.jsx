import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();  // For redirecting after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    // Client-side validation for email and password
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true); 
      const response = await axios.post('https://my-web-production-10ef.up.railway.app//admin/login', {
        email,
        password,
      });

      // Save token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data

      // Clear error if login is successful
      setError('');
      alert('Logged in successfully!');

      // Redirect to the admin dashboard or other relevant page
      navigate('/home');
    } catch (error) {
      // Handle any error that occurs during the login request
      setError(error.response ? error.response.data.message : 'Something went wrong');
    } finally {
      setLoading(false); // Set loading to false after the API response
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 w-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Admin Sign In</h2>

        {/* Error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300"
            disabled={loading} 
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Button */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            onClick={() => navigate('/admin/signup')}
            className="w-full p-2 bg-gradient-to-r from-green-600 to-green-500 text-black rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
