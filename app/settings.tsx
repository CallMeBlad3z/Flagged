import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";

//const { width } = Dimensions.get("window");

export default function Settings() {
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txtAppVersionTitle}>App Version:</Text>
          <Text style={styles.txtAppVersion}>1.0.0</Text>
        </View>
        <TouchableOpacity style={styles.listButton}>
          <Text style={styles.buttonText}>About the app</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listButton}>
          <Text style={styles.buttonText}>Attributions</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <Link href="reportbugs" asChild>
          <TouchableOpacity style={styles.listButton}>
            <Text style={styles.buttonText}>Report a Bug</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.listButton}>
          <Text style={styles.buttonText}>Theme: Light</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Support</Text>
        </View>
        <TouchableOpacity style={styles.listButton}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listButton}>
          <Text style={styles.buttonText}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listButton}>
          <Text style={styles.buttonText}>Contact Us</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingVertical: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: 'BonaNova-Bold',
    fontSize: 22,
  },
  txtAppVersionTitle: {
    fontFamily: 'SourceSans3-Medium',
    fontSize: 16,
    marginLeft: 15,
  },
  txtAppVersion: {
    fontFamily: 'SourceSans3-Medium',
    fontSize: 16,
    color: "#000",
    marginRight: 15,
  },
  listContainer: {
    marginHorizontal: 15,
  },
  listButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //width: width * 1,
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  buttonText: {
    fontFamily: 'SourceSans3-Medium',
    fontSize: 16,
    color: "#000",
  },
  txtContainer: {
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});