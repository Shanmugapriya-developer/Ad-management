import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

const roleLinks = {
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/ads', label: 'Manage Ads' },
    { to: '/admin/users', label: 'Manage Users' },
  ],
  theater_owner: [
    { to: '/theater/dashboard', label: 'Dashboard' },
    { to: '/theater/add', label: 'Add Theater' },
    { to: '/theater/list', label: 'View Theaters' },
    { to: '/theater/ads', label: 'View Ads' },
    { to: '/theater/book', label: 'Book Ad' },
    { to: '/theater/bookings', label: 'My Bookings' },
  ],
  reseller: [
    { to: '/reseller/dashboard', label: 'Dashboard' },
    { to: '/reseller/buy', label: 'Buy Ads' },
    { to: '/reseller/sell', label: 'Sell Ads' },
    { to: '/reseller/commission', label: 'Commission' },
  ],
};

function Navbar() {
  const { user, role, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = roleLinks[role] || [];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <img src={logo} alt="Ad Management System" className="brand-logo" />
          <div>
            <strong>Ad Management System</strong>
            <span>Plan, publish and monetize cinema campaigns</span>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <div className="user-badge">
                <span>{user?.name || user?.mobile || 'User'}</span>
                <small>{role.replace('_', ' ')}</small>
              </div>
              <button className="button button-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="button" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
