import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UiverseButton from '../components/UiverseButton';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // The login function in AuthContext now handles validation
    const success = login(email, password); 

    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-e-gray-dark border border-e-gray-dark p-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold font-serif text-e-white">
            Welcome Back!
          </h2>
          <p className="mt-2 text-center text-sm text-e-gray">
            Sign in to your account to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email"
                required 
                className="bg-transparent relative block w-full px-3 py-3 border border-e-gray-dark placeholder-e-gray text-e-white focus:outline-none focus:border-e-gold sm:text-sm transition" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password"
                required 
                className="bg-transparent relative block w-full px-3 py-3 border border-e-gray-dark placeholder-e-gray text-e-white focus:outline-none focus:border-e-gold sm:text-sm transition" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 p-3" role="alert">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div>
            <UiverseButton type="submit" variant="primary" className="w-full" disabled={!email || !password}>
              Sign in
            </UiverseButton>
          </div>
           <p className="text-center text-sm text-e-gray">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-e-gold hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-center text-xs text-e-gray">
            Hint: Use <strong className="font-medium text-e-white">jane.doe@example.com</strong> and any password.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;