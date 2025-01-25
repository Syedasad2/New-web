import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';  // Optional for consistent button styling

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user from localStorage when the component mounts
  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));  // Only parse if data exists
        } catch (error) {
          console.error("Error parsing user data from localStorage", error);
          setUser(null); // Reset user if parsing fails
        }
      } else {
        setUser(null);  // If no user is found, reset state
      }
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
    <nav className="bg-white-500 p-4 shadow-lg rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Name or Logo */}
        <Link to="/home" className="text-white text-3xl font-bold hover:text-pink-200 transition-colors">
          My App
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/home" className="text-white hover:text-pink-200 transition-colors">Home</Link>

          {user ? (
            <Button
              onClick={handleSignOut}
              auto
              flat
              color="error"
              className="text-white hover:text-pink-200 transition-colors"
            >
              Logout
            </Button>
          ) : (
            <>
              {/* User Sign In Link
              <Link to="/user/signin">
                <Button
                  auto
                  flat
                  color="gradient"
                  className="text-black hover:text-pink-200 transition-colors"
                >
                  Sign In
                </Button>
              </Link> */}

              {/* Admin Sign In Link */}
              <Link to="/admin/signin">
                <Button
                  auto
                  flat
                  color="gradient"
                  className="text-black hover:text-pink-200 transition-colors"
                >
                   Admin Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
