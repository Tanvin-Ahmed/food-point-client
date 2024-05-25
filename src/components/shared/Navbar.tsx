// Navbar.jsx

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";
import { signInWithGoogle } from "../../firebase/auth/google";
import { appContext } from "../../context/createContext";
import { removeAuthInfo, userInfoFromLocal } from "../../utils/userDetails";
import { MdLogout } from "react-icons/md";
import { LiaCoinsSolid } from "react-icons/lia";
import { AxiosInstance } from "../../libs/axiosInstance";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(appContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setUserInfo(null);
    removeAuthInfo();
  };

  const handleSignIn = async () => {
    await signInWithGoogle();
    const user = userInfoFromLocal();
    const { data } = await AxiosInstance.get(`/users/get/${user?.email}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUserInfo(data);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-b bg-white border-gray-200 shadow-sm fixed top-0 left-0 right-0 w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={"/"} className="flex items-center">
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
          </Link>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-gray-800 hover:text-orange-500">
              Home
            </Link>
            <Link
              to="/all-recipes"
              className="text-gray-800 hover:text-orange-500"
            >
              Recipes
            </Link>

            {userInfo?.email ? (
              <>
                <Link
                  to="/add-recipe"
                  className="text-gray-800 hover:text-orange-500"
                >
                  Add recipes
                </Link>
                <div className="text-gray-800 flex justify-center items-center hover:text-orange-500">
                  <LiaCoinsSolid
                    size={22}
                    className="text-orange-500 :hover:text-white"
                  />{" "}
                  {userInfo?.coins} Coins
                </div>
                <img
                  className="h-8 w-8 rounded-full"
                  src={userInfo?.photoURL}
                  alt="User Avatar"
                />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-gray-800 border-none shadow-inner-lg py-1 px-3 rounded-3xl hover:text-white hover:bg-orange-500 hover:transition-all flex justify-center gap-x-2 items-center"
                >
                  <MdLogout />
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
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
            )}
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
          {userInfo?.email && (
            <div className="mb-4">
              <OptimizedImage
                className="h-8 w-8 rounded-full"
                src={userInfo.photoURL}
                alt="User Avatar"
              />
            </div>
          )}

          <Link
            to="/"
            className="block my-3 text-gray-800 hover:text-orange-600"
          >
            Home
          </Link>
          <Link
            to="/all-recipes"
            className="block my-3 text-gray-800 hover:text-orange-600"
          >
            Recipes
          </Link>

          {userInfo?.email ? (
            <>
              <Link
                to="/add-recipe"
                className="block my-3 text-gray-800 hover:text-orange-600"
              >
                Add Recipe
              </Link>
              <div className="inline-block my-3 text-gray-800 hover:text-orange-600">
                <div className="flex justify-center items-center">
                  <LiaCoinsSolid
                    size={22}
                    className="text-orange-500 :hover:text-white"
                  />{" "}
                  {userInfo?.coins} Coins
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-gray-800 my-3 border-none shadow-inner-lg py-1 px-3 rounded-3xl hover:text-white hover:bg-orange-500 hover:transition-all flex justify-center gap-x-2 items-center"
              >
                <MdLogout />
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleSignIn}
              className="text-gray-800 my-3 border-none shadow-inner-lg py-1 pr-3 rounded-3xl hover:text-white hover:bg-orange-500 hover:transition-all flex justify-center gap-x-2 items-center"
            >
              <OptimizedImage
                height={30}
                width={30}
                src="/images/google-icon.svg"
                alt="google icon"
              />
              <p>Login with Google</p>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
