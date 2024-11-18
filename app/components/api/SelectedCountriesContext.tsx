import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as FileSystem from 'expo-file-system';

interface SelectedCountriesContextProps {
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  saveSelectedCountries: () => Promise<void>;
}


const SelectedCountriesContext = createContext<SelectedCountriesContextProps | undefined>(undefined);

interface SelectedCountriesProviderProps {
  children: ReactNode;
}

const selectedCountriesFilePath = `${FileSystem.documentDirectory}selectedCountries.json`;

export const SelectedCountriesProvider = ({ children }: SelectedCountriesProviderProps) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  // Load selected countries from file on mount
  useEffect(() => {
    const loadSelectedCountries = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(selectedCountriesFilePath);
        if (fileInfo.exists) {
          const fileContents = await FileSystem.readAsStringAsync(selectedCountriesFilePath);
          const storedCountries = JSON.parse(fileContents);
          setSelectedCountries(storedCountries);
        }
      } catch (error) {
        console.error('Error reading selected countries from file:', error);
      }
    };

    loadSelectedCountries();
  }, []);

  // Remove the automatic save effect
  // useEffect(() => {
  //   const saveSelectedCountries = async () => {
  //     try {
  //       await FileSystem.writeAsStringAsync(
  //         selectedCountriesFilePath,
  //         JSON.stringify(selectedCountries)
  //       );
  //     } catch (error) {
  //       console.error('Error saving selected countries to file:', error);
  //     }
  //   };
  //   saveSelectedCountries();
  // }, [selectedCountries]);

  // Add a function to save selected countries
// Add a function to save selected countries
const saveSelectedCountries = async () => {
  try {
    await FileSystem.writeAsStringAsync(
      selectedCountriesFilePath,
      JSON.stringify(selectedCountries)
    );
    console.log('Selected countries saved.');
    console.log('Saved countries:', selectedCountries);
  } catch (error) {
    console.error('Error saving selected countries to file:', error);
  }
};

  return (
    <SelectedCountriesContext.Provider
      value={{ selectedCountries, setSelectedCountries, saveSelectedCountries }}
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