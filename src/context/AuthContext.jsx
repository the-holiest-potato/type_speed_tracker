import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testHistory, setTestHistory] = useState([]);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Load history for this specific user
      const historyKey = `history_${parsedUser.email}`;
      const storedHistory = localStorage.getItem(historyKey);
      if (storedHistory) {
        setTestHistory(JSON.parse(storedHistory));
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Load history
    const historyKey = `history_${userData.email}`;
    const storedHistory = localStorage.getItem(historyKey);
    setTestHistory(storedHistory ? JSON.parse(storedHistory) : []);
  };

  const logout = () => {
    setUser(null);
    setTestHistory([]);
    localStorage.removeItem('user');
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setTestHistory([]);
  };

  const addTestResult = (result) => {
    if (!user) return;
    
    const newResult = {
      ...result,
      id: Date.now(),
      date: new Date().toISOString()
    };
    
    const updatedHistory = [newResult, ...testHistory];
    setTestHistory(updatedHistory);
    
    const historyKey = `history_${user.email}`;
    localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, testHistory, addTestResult }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
