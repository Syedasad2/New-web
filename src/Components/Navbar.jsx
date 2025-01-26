import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user from localStorage and update state
  const fetchUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // Fetch user when component mounts or when localStorage changes
  useEffect(() => {
    fetchUser();
    window.addEventListener("storage", fetchUser); // Listen for localStorage changes
    return () => {
      window.removeEventListener("storage", fetchUser);
    };
  }, []);

  // Handle user logout
  const handleSignOut = async () => {
    try {
      const response = await fetch("https://my-web-production-10ef.up.railway.app/users/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null); // Update state after logout
        navigate("/"); // Navigate to home after logout
      } else {
        alert("Logout failed. Please try again.");
        console.error("Logout failed");
      }
    } catch (error) {
      alert("Error during logout. Please try again.");
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="shadow-md py-4 px-6 w-screen">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-black hover:text-gray-200 transition-all">
          My App
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-black text-lg hover:text-gray-700 transition-all">
            Home
          </Link>

          {user ? (
            <>
              {/* Display User Name if logged in */}
              <span className="text-black text-lg">{user.name}</span>

              {/* Logout Button */}
              <Button
                onClick={handleSignOut}
                auto
                flat
                color="error"
                className="text-black hover:bg-red-700"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* User Sign In Link */}
              <Link to="/signin">
                <Button
                  auto
                  flat
                  color="gradient"
                  className="text-black hover:bg-blue-700"
                >
                  Sign In
                </Button>
              </Link>

              {/* Admin Sign In Link */}
              <Link to="/admin/signin">
                <Button
                  auto
                  flat
                  color="gradient"
                  className="text-black hover:bg-blue-700"
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
