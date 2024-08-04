'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const { token, name, role } = data;

      // Store the token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('role', role);

      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      console.error('Login failed:', data.message);
      // Handle login error
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-green-100">
      <div className="login-content page-card bg-white rounded-lg shadow-lg p-6">
        <div className="page-card-head text-center mb-6">
          <img className="app-logo max-w-xs mx-auto" src={process.env.LOGO_MAIN} />
          <h4 className="text-lg font-semibold mt-5">Login to Robin Hood Army</h4>
        </div>
        <form className="form-signin form-login flex flex-col" role="form" onSubmit={handleLogin}>
          <div className="page-card-body mb-6">
            <div className="form-group mb-4">
              <label className="form-label sr-only" htmlFor="login_email">Email</label>
              <div className="email-field relative">
                <input
                  type="text"
                  id="login_email"
                  className="form-control w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label sr-only" htmlFor="login_password">Password</label>
              <div className="password-field relative">
                <input
                  type="password"
                  id="login_password"
                  className="form-control w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="•••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
            <p className="forgot-password-message text-center">
              <a href="#forgot" className="text-blue-600 hover:underline">Forgot Password?</a>
            </p>
          </div>
          <div className="page-card-actions mb-4">
            <button
              className="btn btn-sm btn-primary btn-block btn-login bg-green-500 text-white w-full py-2 rounded-lg"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
