// app/components/api/SelectedCountriesContext.tsx

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as FileSystem from 'expo-file-system';
import CountryDataFetcher from './CountryDataFetcher';

interface CountryData {
  name: string;
  code: string;
  continent: string;
}

interface SelectedCountriesContextProps {
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  savedSelectedCountries: string[];
  saveSelectedCountries: () => Promise<void>;
  countryData: CountryData[];
}

const SelectedCountriesContext = createContext<SelectedCountriesContextProps | undefined>(undefined);

interface SelectedCountriesProviderProps {
  children: ReactNode;
}

const selectedCountriesFilePath = `${FileSystem.documentDirectory}selectedCountries.json`; // Stores the selected countries locally
const countryDataFilePath = `${FileSystem.documentDirectory}countryData.json`;             // Stores the api countries locally

export const SelectedCountriesProvider = ({ children }: SelectedCountriesProviderProps) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);           // State to store the selected countries
  const [savedSelectedCountries, setSavedSelectedCountries] = useState<string[]>([]); // State to store the saved selected countries
  const [countryData, setCountryData] = useState<CountryData[]>([]);                  // State to store the country data

  // Load saved selected countries and country data from file on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const selectedCountriesFileInfo = await FileSystem.getInfoAsync(selectedCountriesFilePath); // Check if the file exists
        if (selectedCountriesFileInfo.exists) {
          const fileContents = await FileSystem.readAsStringAsync(selectedCountriesFilePath);
          const storedCountries = JSON.parse(fileContents);
          setSavedSelectedCountries(storedCountries); // Set the saved selected countries
          setSelectedCountries(storedCountries);      // Loads the selected countries from the file, upon app restart
        }
        
        // Load the country data
        const countryDataFileInfo = await FileSystem.getInfoAsync(countryDataFilePath);
        if (countryDataFileInfo.exists) { 
          const fileContents = await FileSystem.readAsStringAsync(countryDataFilePath);
          const storedCountryData = JSON.parse(fileContents);
          setCountryData(storedCountryData);
          //console.log('Loaded country data from file:', storedCountryData);   // Debug log
        } else {
          const data = await CountryDataFetcher(); // Fetch the country data
          setCountryData(data);
          await FileSystem.writeAsStringAsync(countryDataFilePath, JSON.stringify(data)); // Save the country data to a file
          //console.log('Fetched and saved country data:', data);   // Debug log
        }
      } catch (error) {
        console.error('Error reading saved data from file:', error);
      }
    };
    loadSavedData();
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
      value={{ selectedCountries, setSelectedCountries, savedSelectedCountries, saveSelectedCountries, countryData }}
    >
      {children}
    </SelectedCountriesContext.Provider>
  );
};

// Custom hook to use the selected countries context
export const useSelectedCountries = () => {
  const context = useContext(SelectedCountriesContext);
  if (!context) {
    throw new Error('useSelectedCountries must be used within a SelectedCountriesProvider');
  }
  return context;
};