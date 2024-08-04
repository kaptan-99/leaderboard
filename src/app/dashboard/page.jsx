// src/app/dashboard/page.jsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logout from '../components/logout';

const Dashboard = () => {
  const [user, setUser] = useState({ name: '', role: '' });
  const router = useRouter();

  useEffect(() => {
    // Retrieve user data from localStorage
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    if (name && role) {
      setUser({ name, role });
    } else {
      // Redirect to login if user data is not available
      router.push('/login');
    }
  }, [router]);

  const getRoleSpecificContent = () => {
    switch (user.role) {
      case 'admin':
        return <p>Welcome, {user.name}! You are an Admin.</p>;
      case 'sm':
        return <p>Welcome, {user.name}! You are a Sales Manager.</p>;
      case 'vm':
        return <p>Welcome, {user.name}! You are a Visual Merchandiser.</p>;
      default:
        return <p>Welcome, {user.name}! Your role is not recognized.</p>;
    }
  };

  return (
    <div className="dashboard-container p-6 h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {getRoleSpecificContent()}
      <Logout /> {/* Use the Logout component here */}
    </div>
  );
};

export default Dashboard;
