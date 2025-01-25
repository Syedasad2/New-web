import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // For navigation after successful sign-up

const AdminSignUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // To show loading indicator
  const navigate = useNavigate();  // For redirecting after sign-up

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!fullname || !email || !password || !profilePic) {
      setError('All fields are required');
      return;
    }

    setLoading(true);  // Show loading when the API request is in progress
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePic', profilePic);

    try {
      // Send POST request to the backend to create the admin
      const response = await axios.post('http://localhost:4000/admin/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // If sign-up is successful, navigate to the admin login page or dashboard
      alert('Admin created successfully!');
      navigate('/admin/signin');  // Redirect to sign-in page after successful sign-up
    } catch (error) {
      // Handle any errors that occur during the sign-up process
      setError(error.response ? error.response.data.message : 'Something went wrong');
    } finally {
      setLoading(false);  // Hide loading when the request is completed
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 w-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Admin Sign Up</h2>

        {/* Error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Input */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Profile Picture Input */}
          <div>
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-black rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignUp;
