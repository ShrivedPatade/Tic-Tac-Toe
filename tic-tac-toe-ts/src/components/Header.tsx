import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <header>
    <nav className="navbar">
      <span className="navbar-brand">{title}</span>
    </nav>
  </header>
);

export default Header;