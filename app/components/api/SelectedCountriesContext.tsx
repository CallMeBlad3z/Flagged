// app/components/api/SelectedCountriesContext.tsx

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as FileSystem from 'expo-file-system';

interface SelectedCountriesContextProps {
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  savedSelectedCountries: string[];
  saveSelectedCountries: () => Promise<void>;
}

const SelectedCountriesContext = createContext<SelectedCountriesContextProps | undefined>(undefined);

interface SelectedCountriesProviderProps {
  children: ReactNode;
}

const selectedCountriesFilePath = `${FileSystem.documentDirectory}selectedCountries.json`;

export const SelectedCountriesProvider = ({ children }: SelectedCountriesProviderProps) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [savedSelectedCountries, setSavedSelectedCountries] = useState<string[]>([]);

  // Load saved selected countries from file on mount
  useEffect(() => {
    const loadSavedSelectedCountries = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(selectedCountriesFilePath);
        if (fileInfo.exists) {
          const fileContents = await FileSystem.readAsStringAsync(selectedCountriesFilePath);
          const storedCountries = JSON.parse(fileContents);
          setSavedSelectedCountries(storedCountries);
        }
      } catch (error) {
        console.error('Error reading saved selected countries from file:', error);
      }
    };

    loadSavedSelectedCountries();
  }, []);

  // Function to save selected countries
  const saveSelectedCountries = async () => {
    try {
      await FileSystem.writeAsStringAsync(
        selectedCountriesFilePath,
        JSON.stringify(selectedCountries)
      );
      // Update the savedSelectedCountries state
      setSavedSelectedCountries(selectedCountries);
      console.log('Selected countries saved.');
    } catch (error) {
      console.error('Error saving selected countries to file:', error);
    }
  };

  return (
    <SelectedCountriesContext.Provider
      value={{ selectedCountries, setSelectedCountries, savedSelectedCountries, saveSelectedCountries }}
    >
      {children}
    </SelectedCountriesContext.Provider>
  );
};

export const useSelectedCountries = () => {
  const context = useContext(SelectedCountriesContext);
  if (!context) {
    throw new Error('useSelectedCountries must be used within a SelectedCountriesProvider');
  }
  return context;
};