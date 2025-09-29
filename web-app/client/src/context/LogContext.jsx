// src/context/LogContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create a Context for the logs
const LogContext = createContext();

// Custom hook to use the log context
export const useLogs = () => {
  return useContext(LogContext);
};

// Provider component to wrap your app and provide log state
export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
};
