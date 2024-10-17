import React, { useEffect } from "react";

interface CountryData {
  name: string;
  code: string;
}

interface CountryDataFetcherProps {
  onDataFetched: (data: CountryData[]) => void;
}

function CountryDataFetcher({ onDataFetched }: CountryDataFetcherProps) {
  useEffect(() => {
    fetch("http://localhost:3000/world-bank/countries")
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);
        if (Array.isArray(data)) {
          onDataFetched(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [onDataFetched]);

  return null;
}

export default CountryDataFetcher;