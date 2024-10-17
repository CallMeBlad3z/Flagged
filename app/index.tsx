import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Navbar from "./components/navbar"; // Import the Navbar component

// The Index component is the main component of the app
export default function Index() {
  interface PopulationData {
    date: string;
    value: number;
  }

  const [data, setData] = useState<PopulationData[]>([]);

  useEffect(() => {
    // Fetch data from the Nest.js API
    fetch("http://localhost:3000/world-bank/population/BR")
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data); // Log the response
        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <View>
      <Text>globePal</Text>
      {data.map((item, index) => (
        <Text key={index}>{`Year: ${item.date}, Population: ${item.value}`}</Text>
      ))}
    </View>
  );
}