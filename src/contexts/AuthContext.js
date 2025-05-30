import React, { createContext, useState, useEffect } from 'react';
import { loginUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Charger l’utilisateur à partir du localStorage au démarrage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    if (data) {
      localStorage.setItem('token', data.token);
      // On stocke aussi les infos utilisateur en localStorage
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
