import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const UserLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://my-web-production-10ef.up.railway.app/users/login",
        user
      );
      alert("Login successful!");
      // Assuming you store the user token for authentication in localStorage or cookies
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Replace history.push with navigate
    } catch (error) {
      alert("Error during login!");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-screen">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-8">
          User Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              Login
            </button>
          </div>
        </form>

        {/* Optional: Add a "Forgot Password" or "Sign Up" link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
