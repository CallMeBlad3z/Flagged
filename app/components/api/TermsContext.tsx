// app/components/api/TermsContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the terms context
const TermsContext = createContext(null);

// Provider to manage the terms state
export const TermsProvider = ({ children }: { children: ReactNode }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Check if the terms have been accepted
  useEffect(() => {
    const checkTermsAccepted = async () => {
      const accepted = await AsyncStorage.getItem('termsAccepted');
      setTermsAccepted(accepted === 'true');
    };

    checkTermsAccepted();
  }, []);

  return (
    <TermsContext.Provider value={{ termsAccepted, setTermsAccepted }}>
      {children}
    </TermsContext.Provider>
  );
};

// Hook to access the terms context
export const useTerms = () => {
  const context = useContext(TermsContext);
  if (!context) {
    throw new Error('useTerms must be used within a TermsProvider');
  }
  return context;
};