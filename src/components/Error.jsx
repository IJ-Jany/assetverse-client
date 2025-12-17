import React from "react";
import errorimg from "../assets/error.png";
import { Link, useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-6">
      <div className="max-w-xl text-center space-y-6">
        
        <img 
          src={errorimg} 
          alt="Error" 
          className="w-70 md:w-120 lg:w-200 mx-auto drop-shadow-lg"
        />

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
          Oops! <br /> Something went wrong
        </h1>

        <p className="text-gray-600">
          Sorry, the page you are looking for could not be found.
        </p>

  
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">

          <button
            onClick={handleBack}
            className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 hover:scale-105 transition-transform duration-300"
          >
            Go Back
          </button>

          <Link to="/">
            <button className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 hover:scale-105 transition-transform duration-300">
              Go Back Home
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Error;
