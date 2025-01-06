// app/components/api/TermsContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TermsContext = createContext(null);

export const TermsProvider = ({ children }: { children: ReactNode }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);

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

export const useTerms = () => {
  const context = useContext(TermsContext);
  if (!context) {
    throw new Error('useTerms must be used within a TermsProvider');
  }
  return context;
};