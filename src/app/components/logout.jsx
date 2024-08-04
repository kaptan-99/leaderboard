// src/components/Logout.jsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('token');

    // Redirect to login page
    router.push('/login');
  };

  return (
    <button
      className="btn btn-sm btn-primary mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
