"use client";
import React, { useState, useEffect } from 'react';
import navbar from '../../data/static/navbar.json';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsMounted(true);
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('token');

    // Update state and redirect to login page
    setUserName('');
    router.push('/login');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <nav className="bg-green-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={`https://robinhoodarmy.com/assets/RHALogo/RHA_Ico.png`} className="h-10" alt="Rha Icon" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {`Rha Leaderboard`}
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
            onClick={toggleSlider}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col rounded-lg md:flex-row md:space-x-8">
              
                
              
              {/* Conditionally render login/logout item */}
              {userName ? (
                <>
                 <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  >
                   Hi!  {userName}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    onClick={handleLogout}
                  >
                    {`Logout`}
                  </a>
                </li>
                </>
              ) : (
                <>
                <li>
                  <Link
                    href={`/`}
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Login
                  </Link>
                </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-white shadow-lg p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <img src={`https://checkin.robinhoodarmy.com/files/324549ef2a7080e.png`} className="h-10" alt="Rha Icon" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {`Rha Leaderboard`}
              </span>
            </Link>
            <ul className="font-medium flex flex-col">
              {navbar.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded dark:text-white"
                    aria-current="page"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {/* Conditionally render login/logout item */}
              {userName ? (
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded dark:text-white"
                    onClick={handleLogout}
                  >
                    {`(${userName}) Logout`}
                  </a>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded dark:text-white"
                    aria-current="page"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="flex-1 bg-black opacity-50" onClick={toggleSlider}></div>
        </div>
      )}
    </>
  );
};

export default Navbar;
