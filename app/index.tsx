import React, { useState } from "react";
import { Text, View } from "react-native";
import Navbar from "./components/Navbar";
import CountryDataFetcher from "./components/CountryDataFetcher";

interface CountryData {
  name: string;
  code: string;
}

export default function Index() {
  const [data, setData] = useState<CountryData[]>([]);

  return (
    <View>
      <Navbar />
      <Text>globePal</Text>
      <CountryDataFetcher onDataFetched={setData} />
      {data.map((item, index) => (
        <Text key={index}>{`Country: ${item.name}, Code: ${item.code}`}</Text>
      ))}
    </View>
  );
}