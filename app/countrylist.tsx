import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CountryDataFetcher from './components/api/CountryDataFetcher';
import CountryFlag from 'react-native-country-flag';
import { useSelectedCountries } from './components/api/SelectedCountriesContext';

interface CountryData {
  name: string;
  code: string;
}

export default function CountryList() {
  const [data, setData] = useState<CountryData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CountryData[]>([]);
  const { selectedCountries, setSelectedCountries } = useSelectedCountries();

  useEffect(() => {
    const fetchData = async () => {
      const countries = await CountryDataFetcher();
      setData(countries);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);

  const handleSelect = (country: CountryData) => {
    setSelectedCountries((prevSelectedCountries) =>
      prevSelectedCountries.includes(country.code)
        ? prevSelectedCountries.filter((code) => code !== country.code)
        : [...prevSelectedCountries, country.code]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a country"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={styles.countryItem}>
            <CountryFlag isoCode={item.code} size={32} />
            <Text style={styles.countryName}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.selectButton}>
              {selectedCountries.includes(item.code) && <View style={styles.innerCircle} />}
            </TouchableOpacity>
          </View>
        )}
      />
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
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  countryName: {
    flex: 1,
    marginLeft: 10,
  },
  selectButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'grey',
  },
});