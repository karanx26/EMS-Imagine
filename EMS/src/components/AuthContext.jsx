import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem('isLoggedIn'));

  const login = () => {
    setIsLoggedIn(true);
    window.localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    window.localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
