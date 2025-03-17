import React from "react";
import logo from "../assets/logo.png"

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[84vh] bg-gray-100">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img
          src={logo}
          alt="Logo"
          className="w-32"
        />
      </div>

      {/* Message */}
      <h2 className="text-lg lg:text-3xl font-semibold text-gray-800 mb-4 lg:mb-6">
        404 - Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 text-center">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>

      {/* Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="px-6 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
      >
        Go Back to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
