// app/index.tsx

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, AppState, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as FileSystem from 'expo-file-system';
import MapComponent from './components/map';
import ProgressBar from './components/progressbar';
import { useSelectedCountries } from './components/api/SelectedCountriesContext';
import { useTerms } from './components/api/TermsContext';
import CountryDataFetcher from './components/api/CountryDataFetcher';
import TermsOfService from './components/TermsOfService';
import Onboarding from './components/onboarding';
import { initMapbox } from '../mapboxConfig';

interface CountryData {
  name: string;
  code: string;
  continent: string;
}

width = Dimensions.get('window').width;

export default function Index() {
  const [data, setData] = useState([]);
  const { savedSelectedCountries } = useSelectedCountries();
  const { termsAccepted, setTermsAccepted } = useTerms();
  const [hasLaunched, setHasLaunched] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize the app when the component mounts
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        // Initialize Mapbox
        await initMapbox();

        // Check if the terms have been accepted
        const accepted = await AsyncStorage.getItem('termsAccepted');
        setTermsAccepted(accepted === 'true');

        // Check if the app has been launched before
        const launched = await AsyncStorage.getItem('hasLaunched');
        setHasLaunched(launched === 'true');

        // Set loading to false after all checks are done
        setLoading(false);

        // Hide the splash screen
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    initializeApp();
  }, []);

  // Fetch the country data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      //const countryDataFetcherStart = Date.now();
      const apiData = await CountryDataFetcher();
      setData(apiData);
      //console.log('CountryDataFetcher:', Date.now() - countryDataFetcherStart, 'ms');
    };

    fetchData();
  }, []);

  // Save the hasLaunched state when the app is backgrounded
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'background' && !termsAccepted) {
        await AsyncStorage.removeItem('hasLaunched');
      }
    };

    // Add an event listener to handle app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Remove the event listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, [termsAccepted]);

  // Handle the terms acceptance
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
  };

  // Handle the terms refusal
  const handleRefuseTerms = async () => {
    await AsyncStorage.removeItem('hasLaunched');
    setHasLaunched(false);
    setOnboardingCompleted(false);
  };

  // Handle the onboarding completion
  const handleFinishOnboarding = () => {
    setHasLaunched(true);
    setOnboardingCompleted(true);
  };

  // Function to reset the termsAccepted flag (for debugging)
  /*const handleReset = async () => {
    await AsyncStorage.removeItem('termsAccepted');
    await AsyncStorage.removeItem('hasLaunched');
    setTermsAccepted(false);
    setHasLaunched(false);
    setOnboardingCompleted(false);
  };*/

  // Function to delete the local file (for debugging)
  /*const handleDeleteLocalFile = async () => {
    const countryDataFilePath = `${FileSystem.documentDirectory}countryData.json`;
    try {
      await FileSystem.deleteAsync(countryDataFilePath);
      alert('Local file deleted successfully.');
    } catch (error) {
      console.error('Error deleting local file:', error);
      alert('Failed to delete local file.');
    }
  };*/

  // Display a loading indicator while fetching data
  if (loading) {
    return null; // Return null while loading to keep the splash screen visible
  }

  // Display the onboarding screen if the app has not been launched before
  if (!hasLaunched) {
    return <Onboarding onFinish={handleFinishOnboarding} />;
  }

  // Display the terms of service if they have not been accepted yet
  if (!termsAccepted && onboardingCompleted) {
    return <TermsOfService onAccept={handleAcceptTerms} onRefuse={handleRefuseTerms} />;
  }

  // Exclude Antarctica and undefined/null continents
  const continents = Array.from(new Set(data.map(country => country.continent)))
    .filter(continent => continent && continent !== 'Antarctic');

  // Calculate progress per continent using the saved selected countries  
  const continentProgress = continents.map(continent => {
    const countriesInContinent = data.filter(country => country.continent === continent);
    const selectedInContinent = countriesInContinent.filter(country =>
      savedSelectedCountries.includes(country.code)
    );
    const progress = countriesInContinent.length
      ? selectedInContinent.length / countriesInContinent.length
      : 0;
    return {
      continent,
      progress,
    };
  });

  //console.log('Continent progress:', continentProgress); // Debug log

  // Calculate overall progress
  const totalCountries = data.length;
  const selectedCount = savedSelectedCountries.length;
  const overallProgress = totalCountries ? selectedCount / totalCountries : 0;

  return (
    <View style={styles.indexBody}>
      <ScrollView overScrollMode="never">
        <View style={styles.mapContainer}>
          <MapComponent />
        </View>
        <Text style={styles.headerText}>How much have you conquered?</Text>

        <View style={styles.card}>
          <ProgressBar label="Of the world" progress={overallProgress} />
        </View>

        {continentProgress.map(({ continent, progress }) => (
          <View key={continent} style={styles.card}>
            <ProgressBar label={continent} progress={progress} />
          </View>
        ))}
        {/* Button to clear the termsAccepted flag (for debugging) */}
        {/*<Button title="Reset Terms and Onboarding" onPress={handleReset} />*/}
        {/* Button to delete the local file (for debugging) */}
        {/*<Button title="Delete Local File" onPress={handleDeleteLocalFile} /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  indexBody: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mapContainer: {
    height: 300, // Fixed height for the map (needs to be changed)
  },
  card: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 6,
    marginVertical: 6,
    marginHorizontal: width * 0.05, // 5% of the screen width
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'BonaNova-Bold',
    textAlign: 'center',
    marginVertical: width * 0.05, // 25% of the screen width
  },
});