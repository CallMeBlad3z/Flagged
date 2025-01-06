// app/components/onboarding.tsx

import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window'); // Get the screen width and height

const Onboarding = ({ onFinish }: { onFinish: () => void }) => {
  const handleFinish = async () => {
    await AsyncStorage.setItem('hasLaunched', 'true');
    onFinish();
  };

  return (
    <ImageBackground 
      source={require('@/assets/images/bg_onboarding.png')} 
      style={styles.background}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/logo_onboarding.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.description}>A simple travel{'\n'}log for the{'\n'}minimalists.</Text>
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>Get Started!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  logo: {
    width: width * 0.65, // 65% of the screen width
    height: undefined,
    aspectRatio: 530 / 130, // Maintain the aspect ratio of the image
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  description: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    fontFamily: 'BonaNova-Regular',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 10, 
    width: width * 0.48, // 48% of the screen width
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'SourceSans3-Bold',
  },
});

export default Onboarding;