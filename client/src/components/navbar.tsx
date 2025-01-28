'use client';

import Link from "next/link";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa"; // Profile Icon
import { motion } from "framer-motion"; // Optional for animations

interface AuthenticatedUser {
  picture?: string; // Optional in case the user doesn't have a picture
  given_name?: string;
  email?: string;
}

export default function Navbar() {
  const { getUser, isAuthenticated } = useKindeBrowserClient();
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu visibility

  useEffect(() => {
    if (isAuthenticated) {
      const currentUser = getUser() as AuthenticatedUser;
      setAuthenticatedUser(currentUser);
    }
  }, [isAuthenticated, getUser]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-gray-800 text-white w-full shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16 px-6 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/art.jpg"
            alt="Logo"
            className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-200 ease-in-out"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-8 ml-24">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/aboutUs" },
            { name: "Contact", path: "/contactUs" },
            { name: "Start Drawing", path: "/canvas", title: "Want to draw alone? Don't worry, we have personalized canvas for you." },
          ].map((link, index) => (
            <li key={index}>
              <Link
                href={link.path}
                className="text-sm text-gray-300 hover:text-blue-400 transition-colors duration-300"
                title={link.title}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Button */}
        <div className="hidden lg:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <button className="px-6 py-3 text-gray-200 border border-gray-600 rounded-xl transition-all hover:bg-gray-600 hover:border-gray-500 hover:text-white focus:outline-none transform hover:scale-105">
                <LogoutLink>Log Out</LogoutLink>
              </button>
              <Link href="/profile" className="flex items-center space-x-2 text-gray-200 hover:text-blue-400">
                {authenticatedUser?.picture ? (
                  <img
                    src={authenticatedUser.picture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-6 h-6" />
                )}
              </Link>
            </>
          ) : (
            <button className="px-6 py-3 text-gray-200 border border-gray-600 rounded-xl transition-all hover:bg-gray-600 hover:border-gray-500 hover:text-white focus:outline-none transform hover:scale-105">
              <LoginLink>Log In</LoginLink>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          type="button"
          className="lg:hidden"
          aria-label="Toggle mobile menu"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-gray-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="lg:hidden bg-gray-700 text-white overflow-hidden shadow-md"
        >
          <ul className="flex flex-col space-y-4 p-6">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/aboutUs" },
              { name: "Contact", path: "/contactUs" },
              { name: "Start Drawing", path: "/canvas", title: "Want to draw alone? Don't worry, we have personalized canvas for you." },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  title={link.title}
                  onClick={() => setMenuOpen(false)} // Close menu on navigation
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              {isAuthenticated ? (
                <LogoutLink>
                  <span
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                  >
                    Log Out
                  </span>
                </LogoutLink>
              ) : (
                <LoginLink>
                  <span
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                  >
                    Log In
                  </span>
                </LoginLink>
              )}
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
