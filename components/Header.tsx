import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import UiverseButton from './UiverseButton';

const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M15.625 5.346a.75.75 0 01.465.706v.013a4.502 4.502 0 01-1.33 2.823 4.5 4.5 0 01-3.76 1.612H10.5v1.25a.75.75 0 01-1.5 0v-1.25H4.375a.75.75 0 010-1.5h4.632c1.455 0 2.68-1.045 2.946-2.433a.75.75 0 01.996-.513 4.48 4.48 0 012.671-1.614A.75.75 0 0115.625 5.346zm-2.82 1.94a2.99 2.99 0 00-2.093-.872H4.375a.75.75 0 000 1.5h6.337a3.001 3.001 0 002.093-5.112.75.75 0 00-.528 1.406 1.5 1.5 0 01-1.05 2.078z" clipRule="evenodd" />
    <path d="M5.5 13.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" />
  </svg>
);

const UserAvatar: React.FC<{ username: string }> = ({ username }) => {
  const initials = username?.charAt(0).toUpperCase() || '?';
  return (
    <div className="w-9 h-9 bg-e-gray-dark border-2 border-e-gray flex items-center justify-center rounded-full font-bold text-e-gold">
      {initials}
    </div>
  );
};

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClasses = "text-e-gray-light hover:text-e-gold px-3 py-2 text-sm font-medium transition-colors duration-200";
  const mobileNavLinkClasses = "block " + navLinkClasses;

  return (
    <header className="bg-e-black/80 backdrop-blur-sm border-b border-e-gray-dark sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-e-white hover:text-e-white transition-colors">
          <LeafIcon className="h-7 w-7 text-e-gold" />
          <span className="font-semibold tracking-wide">EcoFinds</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative text-e-gray hover:text-e-white p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-e-gold text-e-black text-xs flex items-center justify-center font-bold">{cartItems.length}</span>
                )}
              </Link>
              
              {/* Desktop User Menu */}
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(prev => !prev)}>
                  <UserAvatar username={currentUser.username} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-e-gray-darker border border-e-gray-dark py-1 z-50">
                    <Link to="/my-listings" className="block px-4 py-2 text-sm text-e-gray-light hover:bg-e-gray-dark hover:text-e-white" onClick={() => setIsDropdownOpen(false)}>My Listings</Link>
                    <Link to="/history" className="block px-4 py-2 text-sm text-e-gray-light hover:bg-e-gray-dark hover:text-e-white" onClick={() => setIsDropdownOpen(false)}>Purchases</Link>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-e-gray-light hover:bg-e-gray-dark hover:text-e-white" onClick={() => setIsDropdownOpen(false)}>Dashboard</Link>
                    <div className="border-t border-e-gray-dark my-1"></div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-e-danger hover:bg-e-gray-dark">Logout</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
             <div className="hidden md:block">
              <UiverseButton as="link" to="/login" variant="primary">Login</UiverseButton>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-e-gray hover:text-e-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

       {/* Mobile Menu Panel */}
       {menuOpen && (
        <div className="md:hidden bg-e-black/95 py-2 px-4 border-t border-e-gray-dark">
          <div className="flex flex-col gap-2">
            {currentUser ? (
              <>
                <Link to="/my-listings" className={mobileNavLinkClasses} onClick={() => setMenuOpen(false)}>My Listings</Link>
                <Link to="/history" className={mobileNavLinkClasses} onClick={() => setMenuOpen(false)}>Purchases</Link>
                <Link to="/dashboard" className={mobileNavLinkClasses} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <UiverseButton onClick={handleLogout} variant="danger" className="w-full mt-2">Logout</UiverseButton>
              </>
            ) : (
                 <UiverseButton as="link" to="/login" variant="primary" className="w-full text-center" onClick={() => setMenuOpen(false)}>Login</UiverseButton>
            )}
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;