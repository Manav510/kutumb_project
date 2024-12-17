import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/storage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getToken();
  return token ? <>{children}</> : <Navigate to="/" />;
};