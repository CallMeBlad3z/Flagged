// components/map.tsx

import { View, StyleSheet } from 'react-native';
import { MapView } from '@rnmapbox/maps';
import '@/mapboxConfig'; // Adjust the path as needed

const MapComponent = () => {
  return (
    <View style={styles.container}>
      <MapView
        styleURL="mapbox://styles/blad3z/cm2tk4cc100f501pk0grxgkt0"
        style={styles.map}
      >
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;