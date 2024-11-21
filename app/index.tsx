// index.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapComponent from './components/map';
import ProgressBar from './components/progressbar';
import { useSelectedCountries } from './components/api/SelectedCountriesContext';
import CountryDataFetcher from './components/api/CountryDataFetcher';

interface CountryData {
  name: string;
  code: string;
  continent: string;
}

export default function Index() {
  const [data, setData] = useState<CountryData[]>([]);
  const { savedSelectedCountries } = useSelectedCountries();

  // Fetch the country data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const apiData = await CountryDataFetcher();
      setData(apiData);
    };

    fetchData();
  }, []);

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

  // Calculate overall progress
  const totalCountries = data.length;
  const selectedCount = savedSelectedCountries.length;
  const overallProgress = totalCountries ? selectedCount / totalCountries : 0;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <MapComponent />
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerText}>How much have you conquered?</Text>

        <View style={styles.card}>
          <ProgressBar label="Overall Progress" progress={overallProgress} />
        </View>

        {continentProgress.map(({ continent, progress }) => (
          <View key={continent} style={styles.card}>
            <ProgressBar label={continent} progress={progress} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 300, // Adjust the height as needed
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    elevation: 5, // Elevation, specific for Android
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'BonaNova-Bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  // Still need to figure out better and softer coloring
});