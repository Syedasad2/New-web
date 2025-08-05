import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Clean & simplified function to fetch user
  const fetchUser = () => {
    try {
      const stored = localStorage.getItem("user");
      setUser(
        stored && stored !== "undefined" && stored !== "null"
          ? JSON.parse(stored)
          : null
      );
    } catch (err) {
      console.error("Failed to parse user", err);
      setUser(null);
    }
  };

  // Sync user on mount and on changes (even in same tab)
  useEffect(() => {
    fetchUser();

    const handleUserChange = () => fetchUser();

    window.addEventListener("storage", handleUserChange);
    window.addEventListener("userChanged", handleUserChange); // custom for same-tab

    return () => {
      window.removeEventListener("storage", handleUserChange);
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  // Handle user logout
  const handleSignOut = async () => {
    try {
      const response = await fetch(
        "https://my-web-production-10ef.up.railway.app/users/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        window.dispatchEvent(new Event("userChanged")); // Notify all listeners
        navigate("/");
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
        <Link
          to="/"
          className="text-3xl font-bold text-black hover:text-gray-200 transition-all"
        >
          Microfinance
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="text-black text-lg hover:text-gray-700 transition-all"
          >
            Home
          </Link>

          {user ? (
            <>
              <span className="text-black text-lg">{user.name}</span>
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

              <Link
                to="/About"
                className="text-black text-lg hover:text-gray-700 transition-all"
              >
                About
              </Link>
               <Link
                to="/Contact"
                className="text-black text-lg hover:text-gray-700 transition-all"
              >
                Contact
              </Link>


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
