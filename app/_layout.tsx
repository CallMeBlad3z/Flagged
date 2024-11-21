// _layout.tsx

import { View, StyleSheet } from "react-native";
import { Stack, Link } from "expo-router";
import { Button } from "react-native";
import { SelectedCountriesProvider, useSelectedCountries } from "./components/api/SelectedCountriesContext";
import { Ionicons, AntDesign } from "@expo/vector-icons";


function HeaderSaveButton() {
  const { saveSelectedCountries } = useSelectedCountries();

  const handleSave = async () => {
    await saveSelectedCountries();
    alert('Selections saved!');
  };

  return (
    <Button
      title="Save"
      color="#007BFF"
      onPress={handleSave}
    />
  );
}

export default function RootLayout() {
  return (
      <SelectedCountriesProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{
              title: 'Flagged.',
              headerTitleStyle: {
                fontFamily: 'BonaNova-Bold',
                fontSize: 24,
              },
              headerRight: () => (
                <View style={styles.navbar}>
                  <Link style={styles.navLink} href="/settings">
                    <View style={styles.iconWrapper}>
                      <Ionicons name="settings" size={24} color="black" />
                    </View>
                  </Link>
                  <Link style={styles.navLink} href="countrylist">
                    <View style={styles.iconWrapper}>
                      <AntDesign name="plus" size={24} color="black" />
                    </View>
                  </Link>
                </View>
              ),
            }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{
              title: 'Settings',
              headerTitleStyle: {
                fontFamily: 'BonaNova-Bold',
                fontSize: 24,
              },
              }}
            />
          <Stack.Screen
            name="countrylist"
            options={{
              title: 'Country List',
              headerTitleStyle: {
                fontFamily: 'BonaNova-Bold',
                fontSize: 24,
              },
              headerRight: () => <HeaderSaveButton />,
            }}
          />
        </Stack>
      </SelectedCountriesProvider>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  navLink: {
    marginLeft: 15,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
});