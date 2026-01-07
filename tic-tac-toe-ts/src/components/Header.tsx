import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show back button if not on the home page
  const showBackButton = location.pathname !== '/';

  return (
    <header>
      <nav className="navbar">
        {showBackButton && (
          <button className="back-btn" onClick={() => navigate('/')} aria-label="Go Home">
            ← Home
          </button>
        )}
        <span className="navbar-brand">{title}</span>
      </nav>
    </header>
  );
};

export default Header;