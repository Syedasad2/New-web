// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user from localStorage when the component mounts
  useEffect(() => {
    const fetchUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    };

    fetchUser();

    // Listen for localStorage changes (e.g., login/logout)
    window.addEventListener('storage', fetchUser);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', fetchUser);
    };
  }, []);

  const handleSignOut = () => {
    // Remove user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/signin'); // Redirect to signin page
  };

  return (
    <nav className="bg-pink-500 p-4 shadow-lg rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Name or Logo */}
        <Link to="/home" className="text-white text-3xl font-bold hover:text-pink-200 transition-colors">
          CuteApp
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/home" className="text-white hover:text-pink-200 transition-colors">Home</Link>

          {user ? (
            <button
              onClick={handleSignOut}
              className="text-white hover:text-pink-200 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link to="/signin" className="text-white hover:text-pink-200 transition-colors">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;