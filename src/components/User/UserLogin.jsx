import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UserLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4003/users/login",
        user
      );

      // alert("Login successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message || "Error during login!";
      alert(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-screen">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-8">
          User Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
              } text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
