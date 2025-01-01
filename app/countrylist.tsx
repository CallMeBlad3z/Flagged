import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import { useSelectedCountries } from './components/api/SelectedCountriesContext';
import CountryButton from './components/countrybutton';

interface CountryData {
  name: string;
  code: string;
}

export default function CountryList() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CountryData[]>([]);
  const { selectedCountries, setSelectedCountries, savedSelectedCountries, countryData } = useSelectedCountries();

  const allSelectedCountries = useMemo(
    () => [...new Set([...savedSelectedCountries, ...selectedCountries])],
    [savedSelectedCountries, selectedCountries]
  );

  useEffect(() => {
    //console.log('Country data:', countryData); // Debug log
    setFilteredData(
      countryData.filter((country: CountryData) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, countryData]);

  const handleSelect = useCallback(
    (country: CountryData) => {
      setSelectedCountries((prevSelectedCountries) =>
        prevSelectedCountries.includes(country.code)
          ? prevSelectedCountries.filter((code) => code !== country.code)
          : [...prevSelectedCountries, country.code]
      );
    },
    [setSelectedCountries]
  );

  const renderItem = useCallback(
    ({ item }: { item: CountryData }) => (
      <CountryButton
        country={item}
        onSelect={handleSelect}
        isSelected={allSelectedCountries.includes(item.code)}
      />
    ),
    [handleSelect, allSelectedCountries]
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a country"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredData.length === 0 ? (
        <Text>No countries found.</Text>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.code}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});