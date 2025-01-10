// app/components/api/CountryDataFetcher.tsx

interface CountryData {
  name: string;
  code: string;
  continent: string;
}

const CountryDataFetcher = async (): Promise<CountryData[]> => {
  try {
    const ipAddress = 'your-ip-address'; // Update with your IP address
    const response = await fetch(`http://${ipAddress}:3000/countries`);
    const data = await response.json();

    if (Array.isArray(data)) {
      // Map the API data to include continent
      const countries = data.map((country: any) => ({
        name: country.name,
        code: country.code,
        continent: country.continent,
      }));
      //console.log('Fetched countries:', countries);
      return countries;
    } else {
      console.error('Unexpected response format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default CountryDataFetcher;