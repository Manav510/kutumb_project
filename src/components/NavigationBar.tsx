import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clearStorage, getUsername } from '../utils/storage';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();
  const username = getUsername();

  const handleLogout = () => {
    clearStorage();
    window.location.href = '/';
  };

  const navItems = [
    { path: '/quotes', label: 'Quote List' },
    { path: '/create-quote', label: 'Create Quote' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 720);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup event listener on component unmount
    };
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarContainer}>
        {/* Username */}
        <div style={styles.usernameContainer}>
          <span style={styles.usernameText}>Welcome, {username}</span>
        </div>

        {/* Navigation Links (Centered) */}
        {!isMobileView && (
          <div style={styles.navLinksContainer}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...styles.navLink,
                  ...(location.pathname === item.path ? styles.activeNavLink : {}),
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Menu Button */}
        <div style={isMobileView ? { ...styles.mobileMenuButton, display: 'block' } : { display: 'none' }}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={styles.menuButton}>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={styles.menuIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={styles.menuIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Logout Button */}
        {!isMobileView && (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && isMobileView && (
        <div style={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.mobileNavLink,
                ...(location.pathname === item.path ? styles.activeNavLink : {}),
              }}
              onClick={() => setIsMenuOpen(false)} // Close the mobile menu on link click
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              handleLogout(); // Handle logout
              setIsMenuOpen(false); // Close the mobile menu after logout
            }}
            style={styles.mobileLogoutButton}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#a3afff',
    padding: '1rem 2rem',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  usernameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  usernameText: {
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  navLinksContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: '500',
    margin: '0 1rem',
    transition: 'color 0.3s ease',
  },
  activeNavLink: {
    color: '#f0f8ff', // Light Sky Blue
    borderBottom: '2px solid #fff',
  },
  mobileMenuButton: {
    display: 'none', // Default state for larger screens
  },
  menuButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  menuIcon: {
    width: '24px',
    height: '24px',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#4682B4', // Deeper Sky Blue
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  mobileNav: {
    backgroundColor: '#a3afff',
    position: 'fixed', // Fixed positioning to overlay the content
    top: '0',
    left: '0',
    width: '250px', // Set width of the drawer
    height: '100%', // Make it full height
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    transform: 'translateX(0)', // Slide in when menu is open
    transition: 'transform 0.3s ease-in-out', // Smooth sliding animation
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#a3afff', // Deeper Sky Blue
    borderRadius: '5px',
    margin: '5px 0',
    transition: 'background 0.3s ease',
  },
  mobileLogoutButton: {
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#4682B4',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background 0.3s ease',
    marginTop: '10px',
  },
};

export default Navbar;
