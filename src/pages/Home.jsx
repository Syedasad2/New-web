import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 text-black min-h-screen flex flex-col items-center justify-center w-screen space-y-4">
      <h1 className="text-4xl font-bold text-center animate__animated animate__fadeIn">
        Welcome to the Homepage!
      </h1>
      <p className="text-xl text-center animate__animated animate__fadeIn animate__delay-1s">
        This is a simple homepage built using React and animated with CSS.
      </p>
      <Link
        to="/user/signin"
        className="text-xl text-blue-500 mt-4 animate__animated animate__fadeIn animate__delay-2s hover:text-blue-700 transition-colors duration-300"
      >
        Sign In
      </Link>
    </div>
  );
};

export default HomePage;
