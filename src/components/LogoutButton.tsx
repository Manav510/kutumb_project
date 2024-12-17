import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearStorage } from '../utils/storage';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    clearStorage();
    
    // Redirect to login page
    navigate('/');
  };

  return (
    <button 
      onClick={handleLogout}
      className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${className}`}
    >
      Logout
    </button>
  );
};