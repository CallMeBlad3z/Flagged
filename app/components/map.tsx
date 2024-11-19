// components/map.tsx

import { View, StyleSheet } from 'react-native';
import { MapView, Camera } from '@rnmapbox/maps';
import '@/mapboxConfig'; // Adjust the path as needed

const MapComponent = () => {
  return (
    <View style={styles.container}>
      <MapView
        styleURL="mapbox://styles/blad3z/cm3op886700sc01s92a29489b"
        style={styles.map}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        logoEnabled={false} // Disable Mapbox watermark
        attributionEnabled={false} // Disable attribution
      >
        <Camera
          zoomLevel={-4}
          centerCoordinate={[21, -12]}
        />
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