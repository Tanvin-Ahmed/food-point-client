// Navbar.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";
import { signInWithGoogle } from "../../firebase/auth/google";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-b bg-white border-gray-200 shadow-sm fixed w-full z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <OptimizedImage
                className="h-8 w-8"
                src="/images/logo.png"
                alt="Logo"
              />
            </div>
            <div className="ml-3">
              <span className="text-xl font-bold text-gray-800">
                <span className="text-orange-400">Food</span> Point
              </span>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="#" className="text-gray-800 hover:text-orange-500">
              Home
            </Link>
            <Link to="#" className="text-gray-800 hover:text-orange-500">
              recipes
            </Link>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="text-gray-800 border-none shadow-inner-lg py-1 pr-3 rounded-3xl hover:text-white hover:bg-orange-500 hover:transition-all flex justify-center gap-x-2 items-center"
            >
              <OptimizedImage
                height={30}
                width={30}
                src="/images/google-icon.svg"
                alt="google icon"
              />
              <p>Login with Google</p>
            </button>
            <img
              className="h-8 w-8 rounded-full"
              src="/path-to-avatar.jpg"
              alt="User Avatar"
            />
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* mobile nav */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="#" className="block text-gray-800 hover:text-gray-600">
            Home
          </Link>
          <Link to="#" className="block text-gray-800 hover:text-gray-600">
            About
          </Link>
          <Link to="#" className="block text-gray-800 hover:text-gray-600">
            Services
          </Link>
          <Link to="#" className="block text-gray-800 hover:text-gray-600">
            Contact
          </Link>
          <div className="mt-4">
            <OptimizedImage
              className="h-8 w-8 rounded-full"
              src="/images/logo.png"
              alt="User Avatar"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
