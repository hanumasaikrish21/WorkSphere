import React, { createContext, useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ employees: null, admin: null });

  useEffect(() => {
    // Initialize localStorage with default values (optional)
    setLocalStorage(); // This stores the employees and admin data in localStorage (you can call this once at app initialization)

    // Fetch data from localStorage
    const { employees, admin } = getLocalStorage();
    setUserData({ employees, admin });
  }, []);
  
  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
