// map.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import '@/mapboxConfig'; // Adjust the path as needed

const MapComponent = () => {
  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        styleURL="mapbox://styles/blad3z/cm2tk4cc100f501pk0grxgkt0"
        style={styles.map}
      >
        <MapboxGL.Camera
          zoomLevel={1}
          centerCoordinate={[0, 0]}
        />
      </MapboxGL.MapView>
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