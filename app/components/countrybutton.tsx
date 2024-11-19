// app/components/countrybutton.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CountryFlag from 'react-native-country-flag';

interface CountryData {
  name: string;
  code: string;
}

interface CountryItemProps {
  country: CountryData;
  isSelected: boolean;
  onSelect: (country: CountryData) => void;
}

const CountryItem = ({ country, isSelected, onSelect }: CountryItemProps) => {
  return (
    <View style={styles.countryItem}>
      <CountryFlag isoCode={country.code} size={32} />
      <Text style={styles.countryName}>{country.name}</Text>
      <TouchableOpacity onPress={() => onSelect(country)} style={styles.selectButton}>
        {isSelected && <View style={styles.innerCircle} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
    backgroundColor: 'grey', // Soft selection color
  },
});

export default CountryItem;