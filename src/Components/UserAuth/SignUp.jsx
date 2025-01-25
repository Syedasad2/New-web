import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState(''); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!email || !password || !fullname) {
      setError('Please fill out all fields.');
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simple password validation (at least 6 characters)
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);

      // API call to backend
      const response = await axios.post("https://my-web-production-10ef.up.railway.app/user/register", {
        email,
        password,
        fullname, // send fullname
      });

      console.log("User signed up:", response.data);
      setError('');  // Clear error message

      // Redirect to the SignIn page after successful registration
      navigate('/signin');
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during signup. Please try again.";
      setError(errorMessage);
      console.error("Signup error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 w-screen p-4 pt-10">
      <div className="bg-white p-6 md:p-10 lg:p-12 rounded-lg max-w-md w-full border border-gray-300 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">User Sign Up</h2>

        {/* Error message */}
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Fullname Input */}
          <Input
            isClearable
            type="text"
            label="Full Name"
            variant="bordered"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter your full name"
            className="w-full bg-gray-100 border-gray-300"
            aria-label="Fullname"
            required
          />

          {/* Email Input */}
          <Input
            isClearable
            type="email"
            label="Email"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-gray-100 border-gray-300"
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
            className="w-full bg-gray-100 border-gray-300"
            aria-label="Password"
            required
          />

          {/* Sign Up Button */}
          <Button
            type="submit"
            radius="full"
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          {/* Link to Sign In */}
          <div className="text-center mt-4">
            <Link to="/signin">
              <Button
                radius="full"
                className="w-full bg-blue-300 text-black shadow-lg hover:shadow-2xl transition-shadow duration-300 mt-2"
              >
                Already have an account? Sign In
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
