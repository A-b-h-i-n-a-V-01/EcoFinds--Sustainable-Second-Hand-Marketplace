import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UiverseButton from '../components/UiverseButton';

const SignUpPage: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    
    // In a real app, you might check if the email is already in use.
    signUp(username, email);
    navigate('/');
  };
  
  const isFormValid = username && email && password && confirmPassword && password === confirmPassword;

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-e-gray-dark border border-e-gray-dark p-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold font-serif text-e-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-e-gray">
            Join EcoFinds today!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-4">
              <input 
                name="username" 
                type="text" 
                autoComplete="username"
                required 
                className="bg-transparent relative block w-full px-3 py-3 border border-e-gray-dark placeholder-e-gray text-e-white focus:outline-none focus:border-e-gold sm:text-sm transition" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
               <input 
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
                name="password" 
                type="password" 
                autoComplete="new-password"
                required 
                className="bg-transparent relative block w-full px-3 py-3 border border-e-gray-dark placeholder-e-gray text-e-white focus:outline-none focus:border-e-gold sm:text-sm transition" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
               <input 
                name="confirm-password" 
                type="password" 
                autoComplete="new-password"
                required 
                className="bg-transparent relative block w-full px-3 py-3 border border-e-gray-dark placeholder-e-gray text-e-white focus:outline-none focus:border-e-gold sm:text-sm transition" 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 p-3" role="alert">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div>
            <UiverseButton type="submit" variant="primary" className="w-full" disabled={!isFormValid}>
              Sign Up
            </UiverseButton>
          </div>
          <p className="text-center text-sm text-e-gray">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-e-gold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;