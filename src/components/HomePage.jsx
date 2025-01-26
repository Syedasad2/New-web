import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-10 md:px-16">
      {/* Image Section */}
      <div className="w-full max-w-4xl mb-10">
        <img
          src="https://media.istockphoto.com/id/1346853640/photo/saving-money-concept-man-hand-putting-row-and-coin-write-finance-saving-money-concept-man.jpg?s=612x612&w=0&k=20&c=1I48V9GUU0liAJ-dMA4SW-h5LoejkBTlEZJ-0b_vmXE="
          alt="Saylani Microfinance"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Content Section */}
      <div className="text-center text-gray-800">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Welcome to Saylani Microfinance
        </h1>
        <p className="text-lg mb-10">
          Welcome to Saylani Welfare's Qarze Hasana Program. We provide
          interest-free loans to help you achieve your dreams.
        </p>

        {/* Sign Up Section */}
        <div className="mb-6">
          <p className="text-lg mb-4">New to Saylani Welfare?</p>
          <Link to="/signup">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Login Section */}
        <div>
          <p className="text-lg mb-4">Already a member?</p>
          <Link to="/signin">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
