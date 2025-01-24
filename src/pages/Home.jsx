import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center w-screen">
            <h1 className="animate__animated animate__fadeIn">Welcome to the Homepage!</h1>
            <p className="animate__animated animate__fadeIn animate__delay-1s">
                This is a simple homepage built using React and animated with CSS.
            </p>
            <Link to="/Signin" className="animate__animated animate__fadeIn animate__delay-2s text-blue-500 mt-4">
                Sign In
            </Link>
        </div>
    );
};

export default HomePage;
