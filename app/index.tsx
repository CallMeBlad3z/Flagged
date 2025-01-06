// app/index.tsx

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapComponent from './components/map';
import ProgressBar from './components/progressbar';
import { useSelectedCountries } from './components/api/SelectedCountriesContext';
import CountryDataFetcher from './components/api/CountryDataFetcher';
import TermsOfService from './components/TermsOfService';
import Onboarding from './components/onboarding';

interface CountryData {
  name: string;
  code: string;
  continent: string;
}

export default function Index() {
  const [data, setData] = useState([]);
  const { savedSelectedCountries } = useSelectedCountries();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    // Check if the terms have been accepted
    const checkTermsAccepted = async () => {
      const accepted = await AsyncStorage.getItem('termsAccepted');
      setTermsAccepted(accepted === 'true');
    };

    // Check if the app has been launched before
    const checkHasLaunched = async () => {
      const launched = await AsyncStorage.getItem('hasLaunched');
      setHasLaunched(launched === 'true');
    };

    // Fetch the country data when the component mounts
    const fetchData = async () => {
      const apiData = await CountryDataFetcher();
      //console.log('Fetched data:', apiData); // Debug log
      setData(apiData);
    };

    checkTermsAccepted();
    checkHasLaunched();
    fetchData();
  }, []);

  // Handle the terms acceptance
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
  };

  // Handle the onboarding completion
  const handleFinishOnboarding = () => {
    setHasLaunched(true);
    setOnboardingCompleted(true);
  };

  // Function to reset the termsAccepted flag (for debugging)
  /*const handleReset = async () => {
    setTermsAccepted(false);
    setHasLaunched(false);
    setOnboardingCompleted(false);
  };*/

  // Display the onboarding screen if the app has not been launched before
  if (!hasLaunched) {
    return <Onboarding onFinish={handleFinishOnboarding} />;
  }

  // Display the terms of service if they have not been accepted yet
  if (!termsAccepted && onboardingCompleted) {
    return <TermsOfService onAccept={handleAcceptTerms} />;
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
      <ScrollView style={styles.scrollView}>
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
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 6,
    marginVertical: 6,
    marginHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'BonaNova-Bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});