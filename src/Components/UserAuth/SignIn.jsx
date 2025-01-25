import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Client-side email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://my-web-production-10ef.up.railway.app/user/login", {
        email,
        password,
      });

      console.log("User signed in with:", response.data);
      setError('');  // Reset the error on successful login

      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      // Redirect to home page
      navigate('/'); // Adjust based on your routes
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid email or password.";
      setError(errorMessage);  // Show the error message on failure
      console.error("Sign-in error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 w-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">User Sign In</h2>

        {/* Error message */}
        {error && <p role="alert" className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignIn} className="space-y-6">
          {/* Email Input */}
          <Input
            isClearable
            type="email"
            label="Email"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500"
            aria-label="Email"
            required
          />

          {/* Password Input */}
          <Input
            isClearable
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="bordered"
            placeholder="Enter your password"
            className="w-full bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500"
            aria-label="Password"
            required
          />

          {/* Sign In Button */}
          <Button
            type="submit"
            radius="full"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Link to Sign Up page */}
          <div className="text-center mt-4">
            <Link to="/user/signup">
              <Button
                radius="full"
                className="w-full bg-green-300 text-black shadow-lg hover:shadow-2xl transition-shadow duration-300 mt-2"
              >
                Don't have an account? Sign Up
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
